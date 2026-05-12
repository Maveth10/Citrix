import React, { useRef, useEffect, useState } from 'react';

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let rafId: number;

    const updatePosition = () => {
      if (!overlayRef.current || !menuRef.current) return;
      
      const rect = overlayRef.current.getBoundingClientRect();
      const menu = menuRef.current;
      
      // Zabezpieczenie przed "respieniem" się w lewym górnym rogu (0,0)
      if (rect.width === 0 || rect.top === 0) {
        rafId = requestAnimationFrame(updatePosition);
        return;
      }
      
      if (!isReady) setIsReady(true);

      const workspace = document.querySelector('[data-canvas-workspace="true"]') || document.body;
      const wsRect = workspace.getBoundingClientRect();

      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      
      const MARGIN = 12; // Odstęp od krawędzi płótna
      const HEADER_H = 70; // Wysokość górnego paska

      // 1. POZYCJA IDEALNA (Lewy górny róg, nad blokiem)
      let targetX = rect.left;
      let targetY = rect.top - menuHeight - 8;

      // 2. LOGIKA "JUMP INSIDE" (Góra)
      // Jeśli plakietka uderza w sufit workspace'a lub okna
      if (targetY < Math.max(wsRect.top, HEADER_H) + MARGIN) {
        targetY = rect.top + 8; // Wskocz do środka bloku
        
        // Jeśli blok jest tak mały, że plakietka by wystawała dołem
        if (targetY + menuHeight > rect.bottom - 8) {
          targetY = rect.bottom - menuHeight - 8;
        }
      }

      // 3. LOGIKA POZIOMA (Lewo / Prawo)
      // Pilnuj, żeby nie wyjechała za LEWĄ krawędź płótna
      if (targetX < wsRect.left + MARGIN) {
        targetX = wsRect.left + MARGIN;
      }
      
      // Pilnuj, żeby nie wyjechała za PRAWĄ krawędź płótna
      if (targetX + menuWidth > wsRect.right - MARGIN) {
        targetX = wsRect.right - menuWidth - MARGIN;
      }

      // 4. BEZWZGLĘDNE TRZYMANIE SIĘ BLOKU
      // Nawet jeśli płótno pozwala, nie pozwól plakietce uciec dalej niż krawędź bloku
      // (z marginesem 2px żeby było widać ramkę)
      targetX = Math.max(targetX, rect.left + 2);
      targetX = Math.min(targetX, rect.right - menuWidth - 2);

      // Finalny render
      menu.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      menu.style.opacity = "1";

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(rafId);
  }, [isReady]);

  return (
    <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-[9999]" style={{ border: '2px solid var(--theme-color, #ff4500)' }}>
      
      {/* 💎 INTELIGENTNA PLAKIETKA 💎 */}
      <div 
        ref={menuRef}
        className="fixed top-0 left-0 bg-[#0a0a0c]/95 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap z-[999999] flex items-center gap-3 pointer-events-auto cursor-default border transition-opacity duration-300"
        style={{ 
            borderColor: 'color-mix(in srgb, var(--theme-color, #ff4500) 40%, transparent)',
            willChange: 'transform',
            opacity: isReady ? 1 : 0 // Ukryj dopóki system nie wyliczy pierwszej pozycji
        }}
        onDoubleClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { left: '0px', top: '0px' } }, true); }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full shadow-[0_0_8px_var(--theme-color)] animate-pulse" style={{ backgroundColor: 'var(--theme-color, #ff4500)' }}></span>
          <span className="tracking-widest uppercase opacity-90">{block.name}</span>
        </div>

        <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: currentZIndex + 1 } }, true); }} className="hover:text-white text-neutral-400 transition-colors">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"></polyline></svg>
           </button>
           <span className="text-[10px] font-mono text-[var(--theme-color, #ff4500)] w-4 text-center">{currentZIndex}</span>
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: Math.max(0, currentZIndex - 1) } }, true); }} className="hover:text-white text-neutral-400 transition-colors">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
           </button>

           <div className="w-px h-3 bg-white/10 mx-1"></div>
           
           <button onClick={(e) => { e.stopPropagation(); if (setCopiedStyles) setCopiedStyles(block.styles); }} className="hover:text-green-400 text-neutral-400 transition-colors" title="Kopiuj Styl">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
           </button>
           {copiedStyles && (
             <button onClick={(e) => { 
                e.stopPropagation(); 
                const { width, height, minWidth, minHeight, left, top, position, display, flexDirection, flexWrap, gridTemplateColumns, gridTemplateRows, ...safeStyles } = copiedStyles;
                updateActiveBlock({ styles: { ...block.styles, ...safeStyles } }, true); 
              }} className="hover:text-green-400 text-[var(--theme-color, #ff4500)] transition-colors scale-110 shadow-sm">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
             </button>
           )}

           <div className="w-px h-3 bg-white/10 mx-1"></div>

           <button onClick={(e) => { e.stopPropagation(); if(handleDuplicate) handleDuplicate(); }} className="hover:text-yellow-400 text-neutral-400 transition-colors">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); if(removeActiveBlock) removeActiveBlock(); }} className="hover:text-red-500 text-neutral-400 transition-colors">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
           </button>
        </div>
      </div>
      
      {/* 🕹️ RESIZE HANDLES (BEZ ZMIAN, SZTYWNO W ROGACH) */}
      <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-nw-resize pointer-events-auto transition-transform hover:scale-150 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-ne-resize pointer-events-auto transition-transform hover:scale-150 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-sw-resize pointer-events-auto transition-transform hover:scale-150 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
      <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-se-resize pointer-events-auto transition-transform hover:scale-150 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'se')} />
      
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-[#0a0a0c] rounded-full shadow-md cursor-n-resize pointer-events-auto transition-transform hover:scale-125 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-[#0a0a0c] rounded-full shadow-md cursor-s-resize pointer-events-auto transition-transform hover:scale-125 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-6 bg-[#0a0a0c] rounded-full shadow-md cursor-w-resize pointer-events-auto transition-transform hover:scale-125 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-6 bg-[#0a0a0c] rounded-full shadow-md cursor-e-resize pointer-events-auto transition-transform hover:scale-125 border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'e')} />
    </div>
  );
}