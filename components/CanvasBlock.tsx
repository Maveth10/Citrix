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
}

export default function CanvasBlock({ 
  b, activeId, setActiveId, isEditing, setIsEditing, isMediaManagerOpen, setIsMediaManagerOpen, 
  setInteraction, updateActiveBlock, parentId, parentActive, interaction,
  draggedId, setDraggedId, handleDrop, hiddenBlocks = []
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

  const hasMediaBg = b.styles.bgType === 'image' || b.styles.bgType === 'video';
  const bgStyles = { ...b.styles };
  if (b.styles.bgType === 'image') bgStyles.backgroundImage = b.styles.bgImage?.includes('gradient') ? b.styles.bgImage : `url(${b.styles.bgImage})`;
  if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
  
  const containerStyles: any = { 
    ...bgStyles, 
    filter: `blur(${b.styles.filterBlur || 0}px) brightness(${b.styles.filterBrightness ?? 100}%) contrast(${b.styles.filterContrast ?? 100}%)`, 
    mixBlendMode: b.styles.mixBlendMode || 'normal', 
    cursor: isAbsolute && !isEditing && !isMediaManagerOpen ? 'move' : 'default', 
    zIndex: isActive ? 9999 : (b.styles.zIndex || 1),
    transition: isBeingDragged ? 'none' : (b.styles.transition || 'all 0.3s ease'),
    minWidth: 0, minHeight: 0,
    overflow: isActive ? 'visible' : (b.styles.overflow || 'visible'),
    boxShadow: isDragOver ? 'inset 0 4px 0 0 #3b82f6, 0 0 20px rgba(59, 130, 246, 0.3)' : (b.styles.boxShadow || 'none')
  };

  if (b.children) { 
    containerStyles.display = 'flex'; 
    containerStyles.flexDirection = 'column'; 
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
      fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0, 
      overflowY: b.styles.overflowY || 'hidden', overflowX: 'hidden', 
      wordBreak:'break-word', outline: 'none', cursor: (isActive && isEditing) ? 'text' : 'inherit', textShadow: b.styles.textShadow, 
      width: '100%', height: '100%', display: Tag === 'div' ? 'flex' : 'block', alignItems: b.styles.alignItems, justifyContent: b.styles.justifyContent, 
      zIndex: 10, position: 'relative', flex: b.styles.flex || 'auto'
    };

    if (b.styles.WebkitBackgroundClip === 'text') {
      textStyles.backgroundImage = b.styles.backgroundImage;
      textStyles.WebkitBackgroundClip = 'text';
      textStyles.WebkitTextFillColor = 'transparent';
      textStyles.color = 'transparent'; 
      containerStyles.backgroundImage = 'none';
      containerStyles.WebkitBackgroundClip = 'unset';
      containerStyles.WebkitTextFillColor = 'unset';
    }

    if (b.styles.WebkitTextStroke) {
      textStyles.WebkitTextStroke = b.styles.WebkitTextStroke;
      textStyles.color = b.styles.color || 'transparent'; 
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
        
        draggable={!isEditing && !isAbsolute}
        
        onDragStart={(e) => { 
          e.stopPropagation(); 
          if (activeId !== b.id) { setActiveId(b.id); }
          if (setDraggedId) setDraggedId(b.id); 
          
          // FIX V18.64: TEN JEDEN JEBANY KOD RATUJE PRZECIĄGANIE W PRZEGLĄDARKACH.
          // Jeśli nie wrzucisz nic do dataTransfer, przeglądarka anuluje Drag&Drop zanim się zacznie!
          e.dataTransfer.setData('text/plain', b.id.toString());
          e.dataTransfer.effectAllowed = 'move';
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
            if (parentId && !parentActive && !e.ctrlKey && !e.metaKey) { setActiveId(parentId); setIsEditing(false); return; }
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
        className={`group ${!isActive ? 'hover:outline hover:outline-1 hover:outline-blue-400 hover:outline-dashed' : 'cursor-grab active:cursor-grabbing'} ${draggedId === b.id ? 'opacity-50' : ''}`}
      >
        {b.styles.bgType === 'video' && b.styles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={b.styles.bgVideo} />}
        {hasMediaBg && b.styles.bgOverlay && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: b.styles.bgOverlay, zIndex: 1 }}></div>}
        
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
          <div className="w-full h-full text-inherit pointer-events-none z-10 relative flex" style={{ alignItems: b.styles.alignItems || 'center' }}>
            {b.text}
          </div>
        )}
        
        {b.type === 'video' && (
          <div className="w-full h-full relative z-10 overflow-hidden" style={{ borderRadius: b.styles.borderRadius }}>
            {b.src && (b.src.includes('youtube') || b.src.includes('youtu.be') || b.src.includes('vimeo')) ? (
              <iframe className="w-full h-full pointer-events-none" src={getEmbedUrl(b.src)} frameBorder="0" allowFullScreen></iframe>
            ) : (
              <video className="w-full h-full object-cover pointer-events-none" controls src={b.src} />
            )}
            <div className="absolute inset-0 z-20 cursor-pointer"></div>
          </div>
        )}

        {b.type === 'embed' && (
          <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden" style={{ borderRadius: b.styles.borderRadius }}>
             <style dangerouslySetInnerHTML={{__html: `#block-${b.id} iframe { width: 100%; height: 100%; border: none; pointer-events: none; }`}} />
             <div dangerouslySetInnerHTML={{ __html: b.text || '' }} className="w-full h-full pointer-events-none" />
             <div className="absolute inset-0 z-20 cursor-pointer"></div>
          </div>
        )}
        
        {b.type === 'img' && (
          <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: b.styles.borderRadius, position: 'relative', zIndex: 10}} className="group/img">
            <img src={b.src} className={`w-full h-full pointer-events-none transition-all duration-500`} style={{objectFit: b.styles.objectFit, objectPosition: `${b.styles.objectPositionX || 50}% ${b.styles.objectPositionY || 50}%`, transform: `scale(${b.styles.imageScale || 1})`}} />
          </div>
        )}
        
        {b.children && (
          <div className="w-full h-full min-h-[40px] relative pointer-events-none flex flex-col flex-1 overflow-visible" style={{zIndex: 10, borderRadius: 'inherit'}}>
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Upuść elementy</span>}
             <div className="pointer-events-auto w-full h-full relative flex-1" style={{ display: b.styles.display === 'grid' ? 'grid' : 'flex', flexWrap: b.styles.flexWrap || 'wrap', flexDirection: b.styles.display === 'grid' ? undefined : (b.styles.flexDirection || 'column'), gap: b.styles.gap || '20px', gridTemplateColumns: b.styles.gridTemplateColumns, gridTemplateRows: b.styles.gridTemplateRows, alignItems: b.styles.alignItems || 'flex-start', justifyContent: b.styles.justifyContent }}>
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
                     />
                   );
                })}
             </div>
          </div>
        )}

        {isActive && !isEditing && (
          <div className="absolute inset-0 pointer-events-none border-2 border-blue-500 z-[200]">
            <div className="absolute -top-6 left-[-2px] bg-blue-500 text-white text-[9px] px-3 py-1.5 rounded-t font-bold shadow-sm whitespace-nowrap z-[200] flex items-center gap-2 pointer-events-auto cursor-default">
              <span>{b.name}</span>
            </div>
            
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-nw-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-ne-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-sw-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-se-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'se')} />
            
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-n-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'n')} />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-s-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 's')} />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-4 bg-white border-2 border-blue-500 rounded-sm cursor-w-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-4 bg-white border-2 border-blue-500 rounded-sm cursor-e-resize pointer-events-auto hover:bg-blue-500 transition-colors" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          </div>
        )}
      </div>
    </>
  );
}