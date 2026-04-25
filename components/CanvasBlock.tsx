import React from 'react';

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
}

export default function CanvasBlock({ b, activeId, setActiveId, isEditing, setIsEditing, isMediaManagerOpen, setIsMediaManagerOpen, setInteraction, updateActiveBlock }: CanvasBlockProps) {
  const isActive = activeId === b.id;
  const isAbsolute = b.styles.position === 'absolute' || b.styles.position === 'fixed';
  
  const hasMediaBg = b.styles.bgType === 'image' || b.styles.bgType === 'video';
  const bgStyles = { ...b.styles };
  if (b.styles.bgType === 'image') bgStyles.backgroundImage = b.styles.bgImage?.includes('gradient') ? b.styles.bgImage : `url(${b.styles.bgImage})`;
  if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
  
  const containerStyles: any = { 
    ...bgStyles, 
    filter: `blur(${b.styles.filterBlur || 0}px) brightness(${b.styles.filterBrightness ?? 100}%) contrast(${b.styles.filterContrast ?? 100}%)`, 
    mixBlendMode: b.styles.mixBlendMode || 'normal', 
    cursor: isAbsolute && !isEditing && !isMediaManagerOpen ? 'move' : 'default', 
    zIndex: b.styles.zIndex || 1 
  };

  // Jeśli kontener ma dzieci, odbieramy mu grid/flex z głównego diva, by nie psuł zewnętrznego kształtu
  if (b.children) {
    containerStyles.display = 'flex';
    containerStyles.flexDirection = 'column';
  }

  const renderTextElement = (Tag: keyof JSX.IntrinsicElements) => {
    return (
      <Tag style={{ fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0, overflow:'hidden', wordBreak:'break-word', outline: 'none', cursor: (isActive && isEditing) ? 'text' : 'inherit', textShadow: b.styles.textShadow, width: '100%', height: '100%', display: Tag === 'div' ? 'flex' : 'block', alignItems: b.styles.alignItems, justifyContent: b.styles.justifyContent, zIndex: 10, position: 'relative' }}
        contentEditable={isActive && isEditing} suppressContentEditableWarning={true}
        onDoubleClick={(e: any) => { e.stopPropagation(); setIsEditing(true); }}
        onBlur={(e: any) => { setIsEditing(false); updateActiveBlock({ text: e.currentTarget.innerHTML }); }} dangerouslySetInnerHTML={{ __html: b.text || '' }}
      />
    );
  };

  return (
    <div id={`block-${b.id}`} style={containerStyles} onClick={(e) => { e.stopPropagation(); }} 
      onMouseDown={(e) => { e.stopPropagation(); if (activeId !== b.id) { setActiveId(b.id); setIsEditing(false); } if ((isActive && isEditing) || isMediaManagerOpen) return; if (isAbsolute) setInteraction({ type: 'drag', startX: e.clientX, startY: e.clientY, initialLeft: parseInt(b.styles.left) || 0, initialTop: parseInt(b.styles.top) || 0, initialWidth: 0, initialHeight: 0 }); }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (b.type === 'img' || b.images) {
          setIsMediaManagerOpen(true);
        }
      }}
      className={`group transition-all duration-200 ${isActive ? 'outline outline-2 outline-blue-500 outline-offset-0 z-[100]' : 'hover:outline hover:outline-1 hover:outline-blue-400 hover:outline-dashed'}`}
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
      {b.type === 'video' && <div className="w-full h-full flex items-center justify-center bg-black text-red-500 font-bold border border-neutral-800 pointer-events-none z-10 relative text-4xl">▶</div>}
      {b.type === 'embed' && <div className="w-full h-full flex items-center justify-center text-neutral-500 font-bold border border-neutral-300 pointer-events-none text-center p-4 z-10 relative">⚙️ Kod/iFrame</div>}
      {b.type === 'map' && <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-500 font-bold border border-neutral-300 pointer-events-none z-10 relative">🗺️ Mapa</div>}
      {['input', 'textarea'].includes(b.type) && <div className="w-full h-full flex items-center text-neutral-400 pointer-events-none border border-neutral-300 rounded p-2 bg-neutral-50 z-10 relative">{b.text}</div>}
      
      {b.type === 'img' && (
        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: b.styles.borderRadius, position: 'relative', zIndex: 10}} className="group/img">
          <img src={b.src} className={`w-full h-full pointer-events-none transition-all duration-500`} style={{objectFit: b.styles.objectFit, objectPosition: `${b.styles.objectPositionX || 50}% ${b.styles.objectPositionY || 50}%`, transform: `scale(${b.styles.imageScale || 1})`}} />
        </div>
      )}
      
      {b.type === 'carousel' && b.images && (
        <div className="w-full h-full relative overflow-hidden bg-neutral-100 pointer-events-none z-10">
          <img src={b.images[0]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white font-bold tracking-widest"><span className="text-sm bg-black/60 px-4 py-2 rounded-full">🎠 Galeria ({b.images.length})</span></div>
        </div>
      )}
      
      {b.children && (
        <div className="w-full h-full min-h-[40px] relative pointer-events-none flex-1" style={{zIndex: 10}}>
           {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Upuść elementy</span>}
           
           {/* Prawidłowe zastosowanie Grida. Jeśli kontener ma ustawiony Grid, usuwamy sztywne szerokości z dzieci! */}
           <div className="pointer-events-auto w-full h-full" style={{ 
             display: b.styles.display === 'grid' ? 'grid' : 'flex', 
             flexDirection: b.styles.display === 'grid' ? undefined : (b.styles.flexDirection || 'column'), 
             gap: b.styles.gap || '20px', 
             gridTemplateColumns: b.styles.gridTemplateColumns, 
             gridTemplateRows: b.styles.gridTemplateRows,
             alignItems: b.styles.alignItems, 
             justifyContent: b.styles.justifyContent 
           }}>
              {b.children.map((child: any) => {
                 // Sprytny hack: Jeśli rodzic jest gridem, dziecko ma się rozciągać i nie mieć sztywnych 300px!
                 if (b.styles.display === 'grid') {
                   child.styles.width = '100%';
                 }
                 return (
                   <CanvasBlock 
                     key={child.id} 
                     b={child} 
                     activeId={activeId} 
                     setActiveId={setActiveId} 
                     isEditing={isEditing} 
                     setIsEditing={setIsEditing} 
                     isMediaManagerOpen={isMediaManagerOpen} 
                     setIsMediaManagerOpen={setIsMediaManagerOpen} 
                     setInteraction={setInteraction} 
                     updateActiveBlock={updateActiveBlock} 
                   />
                 );
              })}
           </div>
        </div>
      )}

      {isActive && !isEditing && (
        <>
          <div className="absolute -top-6 left-[-2px] bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-t font-bold shadow-sm whitespace-nowrap z-[200]">{b.name}</div>
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-[200] pointer-events-none" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-[200] pointer-events-none" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-[200] pointer-events-none" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-se-resize z-[200] hover:bg-blue-500 transition-colors" onMouseDown={(e) => { e.stopPropagation(); setInteraction({ type: 'resize', startX: e.clientX, startY: e.clientY, initialLeft: 0, initialTop: 0, initialWidth: e.currentTarget.parentElement?.offsetWidth || 0, initialHeight: e.currentTarget.parentElement?.offsetHeight || 0 }); }} />
        </>
      )}
    </div>
  );
}