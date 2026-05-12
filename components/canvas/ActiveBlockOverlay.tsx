import React, { useRef, useEffect } from 'react';

interface ActiveBlockOverlayProps {
  block: any;
  currentZIndex: number;
  updateActiveBlock: (updates: any, skipHistory?: boolean) => void;
  copiedStyles: any;
  setCopiedStyles?: (styles: any) => void;
  handleDuplicate?: () => void;
  removeActiveBlock?: () => void;
  handleResizeStart: (e: React.MouseEvent, dir: string) => void;
}

export default function ActiveBlockOverlay({
  block, currentZIndex, updateActiveBlock, copiedStyles, setCopiedStyles, handleDuplicate, removeActiveBlock, handleResizeStart
}: ActiveBlockOverlayProps) {
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const updatePosition = () => {
      if (!overlayRef.current || !menuRef.current) return;
      
      const rect = overlayRef.current.getBoundingClientRect();
      const menu = menuRef.current;
      
      if (rect.width === 0) {
        rafId = requestAnimationFrame(updatePosition);
        return;
      }

      // 1. Definiujemy obszar roboczy
      const workspace = document.querySelector('[data-canvas-workspace="true"]') || document.body;
      const wsRect = workspace.getBoundingClientRect();

      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      const OFFSET = 8; // Odstęp od ramki

      // 2. POZYCJA STARTOWA: Nad lewym górnym rogiem (Twoja ulubiona)
      let targetX = rect.left;
      let targetY = rect.top - menuHeight - OFFSET;

      // 3. INTELIGENTNE DOPASOWANIE (Jeśli ucieka poza widok)

      // Jeśli góra plakietki uderza w sufit workspace'a -> wrzuć ją DO ŚRODKA bloku
      if (targetY < wsRect.top + OFFSET) {
        targetY = rect.top + OFFSET;
      }

      // Jeśli lewa strona ucieka -> przesuń w prawo, żeby była widoczna
      if (targetX < wsRect.left + OFFSET) {
        targetX = wsRect.left + OFFSET;
      }

      // Jeśli prawa strona ucieka -> przesuń w lewo
      if (targetX + menuWidth > wsRect.right - OFFSET) {
        targetX = wsRect.right - menuWidth - OFFSET;
      }

      // 4. Błyskawiczny rendering transformacją
      menu.style.transform = `translate(${targetX}px, ${targetY}px)`;

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-[99999]" style={{ border: '2px solid var(--theme-color, #ff4500)' }}>
      
      {/* 💎 DYNAMICZNA PLAKIETKA 💎 */}
      <div 
        ref={menuRef}
        className="fixed top-0 left-0 bg-[#0a0a0c]/95 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-[0_10px_30px_rgba(0,0,0,0.6)] whitespace-nowrap z-[999999] flex items-center gap-3 pointer-events-auto cursor-default border transition-colors duration-200"
        style={{ 
            borderColor: 'color-mix(in srgb, var(--theme-color, #ff4500) 40%, transparent)',
            willChange: 'transform'
        }}
        onDoubleClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { left: '0px', top: '0px' } }, true); }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full shadow-[0_0_8px_var(--theme-color)]" style={{ backgroundColor: 'var(--theme-color, #ff4500)' }}></span>
          <span className="tracking-widest uppercase opacity-90">{block.name}</span>
        </div>

        <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: currentZIndex + 1 } }, true); }} className="hover:text-white text-neutral-400" title="Góra">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"></polyline></svg>
           </button>
           <span className="text-[10px] font-mono text-[var(--theme-color, #ff4500)] w-4 text-center">{currentZIndex}</span>
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: Math.max(0, currentZIndex - 1) } }, true); }} className="hover:text-white text-neutral-400" title="Dół">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
           </button>

           <div className="w-px h-3 bg-white/10 mx-1"></div>
           
           <button onClick={(e) => { e.stopPropagation(); if (setCopiedStyles) setCopiedStyles(block.styles); }} className="hover:text-green-400 text-neutral-400" title="Kopiuj Styl">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
           </button>
           {copiedStyles && (
             <button onClick={(e) => { 
                e.stopPropagation(); 
                const { width, height, minWidth, minHeight, left, top, position, display, flexDirection, flexWrap, gridTemplateColumns, gridTemplateRows, ...safeStyles } = copiedStyles;
                updateActiveBlock({ styles: { ...block.styles, ...safeStyles } }, true); 
              }} className="hover:text-green-400 text-[var(--theme-color, #ff4500)] transition-transform scale-110 shadow-sm" title="Wklej Styl">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
             </button>
           )}

           <div className="w-px h-3 bg-white/10 mx-1"></div>

           <button onClick={(e) => { e.stopPropagation(); if(handleDuplicate) handleDuplicate(); }} className="hover:text-yellow-400 text-neutral-400" title="Duplikuj">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); if(removeActiveBlock) removeActiveBlock(); }} className="hover:text-red-500 text-neutral-400" title="Usuń">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
           </button>
        </div>
      </div>
      
      {/* PUNKTY CHWYTANIA (RESIZE) */}
      <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-nw-resize pointer-events-auto transition-transform hover:scale-150" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-ne-resize pointer-events-auto transition-transform hover:scale-150" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-sw-resize pointer-events-auto transition-transform hover:scale-150" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'sw')} />
      <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-se-resize pointer-events-auto transition-transform hover:scale-150" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'se')} />
      
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-[#0a0a0c] rounded-full shadow-md cursor-n-resize pointer-events-auto transition-transform hover:scale-125" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-[#0a0a0c] rounded-full shadow-md cursor-s-resize pointer-events-auto transition-transform hover:scale-125" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-6 bg-[#0a0a0c] rounded-full shadow-md cursor-w-resize pointer-events-auto transition-transform hover:scale-125" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-6 bg-[#0a0a0c] rounded-full shadow-md cursor-e-resize pointer-events-auto transition-transform hover:scale-125" style={{ border: '2px solid var(--theme-color, #ff4500)' }} onMouseDown={(e) => handleResizeStart(e, 'e')} />
    </div>
  );
}