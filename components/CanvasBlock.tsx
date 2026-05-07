import React, { useEffect, useState } from 'react';

interface CanvasBlockProps {
  b: any;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  isMediaManagerOpen: boolean;
  setIsMediaManagerOpen: (val: boolean) => void;
  setInteraction: (val: any) => void;
  updateActiveBlock: (updates: any) => void;
  parentId?: number;
  parentActive?: boolean;
  interaction?: any; 
  draggedId?: number | null;
  setDraggedId?: (id: number | null) => void;
  handleDrop?: (sourceId: number, targetId: number, type?: 'before'|'inline') => void;
  hiddenBlocks?: number[];
  viewport?: 'desktop' | 'tablet' | 'mobile'; // DODANO PROP
}

export default function CanvasBlock({ 
  b, activeId, setActiveId, isEditing, setIsEditing, isMediaManagerOpen, setIsMediaManagerOpen, 
  setInteraction, updateActiveBlock, parentId, parentActive, interaction,
  draggedId, setDraggedId, handleDrop, hiddenBlocks = [], viewport = 'desktop'
}: CanvasBlockProps) {
  
  if (hiddenBlocks.includes(b.id)) return null;

  const isActive = activeId === b.id;
  const isAbsolute = b.styles.position === 'absolute' || b.styles.position === 'fixed';
  const isBeingDragged = interaction?.type === 'drag' && isActive;
  
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  useEffect(() => {
    if (b.entranceAnim && b.entranceAnim !== 'none' && !isActive) { setShouldAnimate(true); }
  }, [b.entranceAnim, isActive]);

  // ==========================================
  // 🚀 SILNIK AUTO-RWD (Nondestructive RWD)
  // ==========================================
  const applyRWD = (baseStyles: any, blockName: string, viewportState: string) => {
    if (viewportState === 'desktop') return baseStyles;
    
    // Tworzymy kopię, by nie uszkodzić oryginalnego JSON-a w bazie
    const s = { ...baseStyles };

    if (viewportState === 'mobile') {
      // 1. Zwijanie siatek do 1 kolumny
      if (s.display === 'grid') s.gridTemplateColumns = 'minmax(20px, 1fr)';
      
      // 2. Zwijanie flexboxów z poziomu na pion
      if (s.display === 'flex' && s.flexDirection !== 'column' && !blockName?.includes('NAV')) {
        s.flexDirection = 'column';
        s.alignItems = 'center';
      }
      
      // 3. Rozpychanie uciętych klocków
      if (typeof s.width === 'string' && s.width.endsWith('%') && parseFloat(s.width) < 100) {
        s.width = '100%';
      }
      
      // 4. Skalowanie gigantycznej typografii
      if (typeof s.fontSize === 'string' && s.fontSize.endsWith('px')) {
        const size = parseInt(s.fontSize);
        if (size >= 36) s.fontSize = `${Math.max(28, Math.round(size * 0.65))}px`;
        else if (size > 18) s.fontSize = `${Math.round(size * 0.85)}px`;
      }
      
      // 5. Redukcja marnowanego miejsca (paddingów)
      if (typeof s.padding === 'string') {
        if (s.padding === '40px' || s.padding === '60px' || s.padding.includes('60px')) {
          s.padding = '20px';
        }
      }
    }

    if (viewportState === 'tablet') {
      // 1. Redukcja Gridów 3 i 4 na 2 kolumny
      if (s.display === 'grid' && typeof s.gridTemplateColumns === 'string') {
        if (s.gridTemplateColumns.includes('3') || s.gridTemplateColumns.includes('4')) {
          s.gridTemplateColumns = 'repeat(2, minmax(20px, 1fr))';
        }
      }
      // 2. Średnie skalowanie fontów
      if (typeof s.fontSize === 'string' && s.fontSize.endsWith('px')) {
        const size = parseInt(s.fontSize);
        if (size > 40) s.fontSize = `${Math.max(32, Math.round(size * 0.8))}px`;
      }
    }

    return s;
  };

  // Generujemy responsywne style w locie
  const currentStyles = applyRWD(b.styles, b.name || '', viewport);

  const hasMediaBg = currentStyles.bgType === 'image' || currentStyles.bgType === 'video';
  const bgStyles = { ...currentStyles };
  if (currentStyles.bgType === 'image') bgStyles.backgroundImage = currentStyles.bgImage?.includes('gradient') ? currentStyles.bgImage : `url(${currentStyles.bgImage})`;
  if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
  
  const containerStyles: any = { 
    ...bgStyles, 
    filter: `blur(${currentStyles.filterBlur || 0}px) brightness(${currentStyles.filterBrightness ?? 100}%) contrast(${currentStyles.filterContrast ?? 100}%)`, 
    mixBlendMode: currentStyles.mixBlendMode || 'normal', 
    cursor: isAbsolute && !isEditing && !isMediaManagerOpen ? 'move' : 'default', 
    zIndex: isActive ? 9999 : (currentStyles.zIndex || 1),
    transition: isBeingDragged ? 'none' : (currentStyles.transition || 'all 0.3s ease'),
    minWidth: currentStyles.minWidth !== undefined ? currentStyles.minWidth : 0, 
    minHeight: currentStyles.minHeight !== undefined ? currentStyles.minHeight : 0,
    overflow: isActive ? 'visible' : (currentStyles.overflow || 'visible'),
    boxShadow: isDragOver ? 'inset 0 4px 0 0 #ff4500, 0 0 20px rgba(255, 69, 0, 0.3)' : (currentStyles.boxShadow || 'none')
  };

  if (b.children) { 
    containerStyles.display = currentStyles.display || 'flex'; 
    if (containerStyles.display === 'flex') containerStyles.flexDirection = currentStyles.flexDirection || 'column'; 
  }

  const hover = b.hoverStyles || {};
  const hasHover = hover.scale || hover.translateY || hover.backgroundColor;
  
  if (shouldAnimate) {
    if (b.entranceAnim === 'fade-in') containerStyles.animation = `fadeIn 0.8s ease-out forwards`;
    if (b.entranceAnim === 'slide-up') containerStyles.animation = `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
    if (b.entranceAnim === 'zoom-in') containerStyles.animation = `zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/').split('&')[0];
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    if (url.includes('vimeo.com/')) return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    return url;
  };

  const handleResizeStart = (e: React.MouseEvent, dir: string) => {
    e.stopPropagation();
    e.preventDefault(); 
    const el = document.getElementById(`block-${b.id}`);
    const compStyle = el ? window.getComputedStyle(el) : null;
    setInteraction({ 
      type: 'resize', dir, 
      startX: e.pageX, startY: e.pageY, 
      initialLeft: el?.offsetLeft || 0, initialTop: el?.offsetTop || 0, 
      initialWidth: el?.offsetWidth || 0, initialHeight: el?.offsetHeight || 0,
      initialMarginLeft: compStyle ? parseFloat(compStyle.marginLeft) || 0 : 0,
      initialMarginTop: compStyle ? parseFloat(compStyle.marginTop) || 0 : 0
    });
  };

  const renderTextElement = (Tag: keyof JSX.IntrinsicElements) => {
    const textStyles: any = { 
      fontSize: currentStyles.fontSize || 'inherit', 
      fontWeight: currentStyles.fontWeight || 'inherit', 
      color: currentStyles.color || 'inherit', 
      textAlign: currentStyles.textAlign, 
      lineHeight: currentStyles.lineHeight || 'inherit', 
      letterSpacing: currentStyles.letterSpacing || 'inherit',
      textTransform: currentStyles.textTransform || 'none',
      margin: 0, 
      overflowY: currentStyles.overflowY || 'hidden', overflowX: 'hidden', 
      wordBreak:'break-word', outline: 'none', cursor: (isActive && isEditing) ? 'text' : 'inherit', textShadow: currentStyles.textShadow, 
      width: '100%', height: '100%', display: Tag === 'div' ? 'flex' : 'block', alignItems: currentStyles.alignItems, justifyContent: currentStyles.justifyContent, 
      zIndex: 10, position: 'relative', flex: currentStyles.flex || 'auto'
    };

    if (currentStyles.WebkitBackgroundClip === 'text') {
      textStyles.backgroundImage = currentStyles.backgroundImage;
      textStyles.WebkitBackgroundClip = 'text';
      textStyles.WebkitTextFillColor = 'transparent';
      textStyles.color = 'transparent'; 
      containerStyles.backgroundImage = 'none';
      containerStyles.WebkitBackgroundClip = 'unset';
      containerStyles.WebkitTextFillColor = 'unset';
    }

    if (currentStyles.WebkitTextStroke) {
      textStyles.WebkitTextStroke = currentStyles.WebkitTextStroke;
      textStyles.color = currentStyles.color || 'transparent'; 
      containerStyles.WebkitTextStroke = 'unset';
    }

    return (
      <Tag style={textStyles}
        contentEditable={isActive && isEditing} suppressContentEditableWarning={true}
        onDoubleClick={(e: any) => { e.stopPropagation(); setIsEditing(true); }}
        onBlur={(e: any) => { setIsEditing(false); updateActiveBlock({ text: e.currentTarget.innerHTML }); }} dangerouslySetInnerHTML={{ __html: b.text || '' }}
      />
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        #block-${b.id} { transition: ${isBeingDragged ? 'none !important' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease'}; }
        ${hasHover ? `#block-${b.id}:hover { transform: scale(${hover.scale || 1}) translateY(${hover.translateY || 0}px) !important; ${hover.backgroundColor ? `background-color: ${hover.backgroundColor} !important;` : ''} z-index: 50 !important; }` : ''}
        #block-${b.id} ::-webkit-scrollbar { width: 6px; }
        #block-${b.id} ::-webkit-scrollbar-track { background: transparent; }
        #block-${b.id} ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        #block-${b.id} ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
      `}} />

      <div id={`block-${b.id}`} style={containerStyles} 
        
        draggable={isActive && !isEditing && !isAbsolute}
        
        onDragStart={(e) => { 
          e.stopPropagation(); 
          e.dataTransfer.setData('text/plain', b.id.toString());
          e.dataTransfer.effectAllowed = 'move';
          setTimeout(() => { if (setDraggedId) setDraggedId(b.id); }, 10);
        }}
        onDragEnd={(e) => { 
          e.stopPropagation();
          if (setDraggedId) setDraggedId(null); 
        }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { 
          e.preventDefault(); e.stopPropagation(); setIsDragOver(false); 
          if (draggedId && handleDrop) { handleDrop(draggedId, b.id); }
          if (setDraggedId) setDraggedId(null);
        }}

        onClick={(e) => { e.stopPropagation(); }} 
        onMouseDown={(e) => { 
          e.stopPropagation(); 
          
          if (activeId !== b.id) { 
            if (parentId && !parentActive && !e.ctrlKey && !e.metaKey) { 
              setActiveId(parentId); setIsEditing(false); return; 
            }
            setActiveId(b.id); setIsEditing(false); 
          } 
          
          if ((isActive && isEditing) || isMediaManagerOpen) return; 
          
          if (isAbsolute) {
            const el = document.getElementById(`block-${b.id}`);
            const currentLeft = el ? el.offsetLeft : 0; const currentTop = el ? el.offsetTop : 0;
            setInteraction({ type: 'drag', startX: e.pageX, startY: e.pageY, initialLeft: currentLeft, initialTop: currentTop, initialWidth: el?.offsetWidth || 0, initialHeight: el?.offsetHeight || 0 });
          }
        }}
        onDoubleClick={(e) => { e.stopPropagation(); if (b.type === 'img' || b.images) { setIsMediaManagerOpen(true); } }}
        className={`group ${!isActive ? 'hover:outline hover:outline-1 hover:outline-[#ff4500]/50 hover:outline-dashed' : 'cursor-grab active:cursor-grabbing'} ${draggedId === b.id ? 'opacity-50' : ''}`}
      >
        {currentStyles.bgType === 'video' && currentStyles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={currentStyles.bgVideo} />}
        {hasMediaBg && currentStyles.bgOverlay && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: currentStyles.bgOverlay, zIndex: 1 }}></div>}
        
        {b.type === 'ribbon' && b.ribbonItems && (
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', height: '100%', zIndex: 10, position: 'relative', pointerEvents:'none' }}>
             {[1, 2].map(group => (
               <div key={group} style={{ display: 'flex', flexShrink: 0, minWidth: '100%', justifyContent: 'space-around', animation: 'scroll-marquee 15s linear infinite' }}>
                 {b.ribbonItems!.map((item: any, i: number) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 30px' }}>
                     {item.type === 'img' ? <img src={item.value} style={{ height: '1.2em', objectFit: 'contain' }} /> : <span style={{fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit'}} dangerouslySetInnerHTML={{ __html: item.value }}/>}
                   </div>
                 ))}
               </div>
             ))}
          </div>
        )}

        {['h1', 'h2', 'marquee'].includes(b.type) && renderTextElement('h1')}
        {b.type === 'p' && renderTextElement('p')}
        {['list', 'faq', 'button', 'social', 'alert'].includes(b.type) && renderTextElement('div')}
        {b.type === 'menu' && renderTextElement('nav')}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}}></div>}
        {b.type === 'graphic' && <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}} dangerouslySetInnerHTML={{ __html: b.text || '' }}></div>}
        
        {['input', 'textarea'].includes(b.type) && (
          <div className="w-full h-full text-inherit pointer-events-none z-10 relative flex" style={{ alignItems: currentStyles.alignItems || 'center' }}>
            {b.text}
          </div>
        )}
        
        {b.type === 'video' && (
          <div className="w-full h-full relative z-10 overflow-hidden" style={{ borderRadius: currentStyles.borderRadius }}>
            {b.src && (b.src.includes('youtube') || b.src.includes('youtu.be') || b.src.includes('vimeo')) ? (
              <iframe className="w-full h-full pointer-events-none" src={getEmbedUrl(b.src)} frameBorder="0" allowFullScreen></iframe>
            ) : (
              <video className="w-full h-full object-cover pointer-events-none" controls src={b.src} />
            )}
            <div className="absolute inset-0 z-20 cursor-pointer"></div>
          </div>
        )}

        {b.type === 'embed' && (
          <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden" style={{ borderRadius: currentStyles.borderRadius }}>
             <style dangerouslySetInnerHTML={{__html: `#block-${b.id} iframe { width: 100%; height: 100%; border: none; pointer-events: none; }`}} />
             <div dangerouslySetInnerHTML={{ __html: b.text || '' }} className="w-full h-full pointer-events-none" />
             <div className="absolute inset-0 z-20 cursor-pointer"></div>
          </div>
        )}
        
        {b.type === 'img' && (
          <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: currentStyles.borderRadius, position: 'relative', zIndex: 10}} className="group/img">
            <img src={b.src} className={`w-full h-full pointer-events-none transition-all duration-500`} style={{objectFit: currentStyles.objectFit, objectPosition: `${currentStyles.objectPositionX || 50}% ${currentStyles.objectPositionY || 50}%`, transform: `scale(${currentStyles.imageScale || 1})`}} />
          </div>
        )}
        
        {/* REKURSJA: Przekazujemy viewport niżej! */}
        {b.children && (
          <div className="w-full h-full min-h-[40px] relative pointer-events-none flex flex-col flex-1 overflow-visible" style={{zIndex: 10, borderRadius: 'inherit'}}>
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Upuść elementy</span>}
             <div className="pointer-events-auto w-full h-full relative flex-1" style={{ display: currentStyles.display === 'grid' ? 'grid' : 'flex', flexWrap: currentStyles.flexWrap || 'wrap', flexDirection: currentStyles.display === 'grid' ? undefined : (currentStyles.flexDirection || 'column'), gap: currentStyles.gap || '20px', gridTemplateColumns: currentStyles.gridTemplateColumns, gridTemplateRows: currentStyles.gridTemplateRows, alignItems: currentStyles.alignItems || 'flex-start', justifyContent: currentStyles.justifyContent }}>
                {b.children.map((child: any) => {
                   return (
                     <CanvasBlock 
                       key={child.id} b={child} activeId={activeId} setActiveId={setActiveId} 
                       isEditing={isEditing} setIsEditing={setIsEditing} 
                       isMediaManagerOpen={isMediaManagerOpen} setIsMediaManagerOpen={setIsMediaManagerOpen} 
                       setInteraction={setInteraction} updateActiveBlock={updateActiveBlock} 
                       parentId={b.id} parentActive={isActive} interaction={interaction}
                       draggedId={draggedId} setDraggedId={setDraggedId} handleDrop={handleDrop}
                       hiddenBlocks={hiddenBlocks}
                       viewport={viewport} // <--- REKURSJA
                     />
                   );
                })}
             </div>
          </div>
        )}

        {isActive && !isEditing && (
          <div className="absolute inset-0 pointer-events-none border-2 border-[#ff4500] z-[200]">
            <div className="absolute -top-6 left-[-2px] bg-[#ff4500] text-white text-[9px] px-3 py-1.5 rounded-t font-bold shadow-sm whitespace-nowrap z-[200] flex items-center gap-2 pointer-events-auto cursor-default">
              <span>{b.name}</span>
            </div>
            
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-nw-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-ne-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-sw-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-se-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'se')} />
            
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-n-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'n')} />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-s-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 's')} />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-4 bg-white border-2 border-[#ff4500] rounded-sm cursor-w-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-4 bg-white border-2 border-[#ff4500] rounded-sm cursor-e-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          </div>
        )}
      </div>
    </>
  );
}