import React, { useRef, useEffect, useState } from 'react';

export default function ActiveBlockOverlay({
  block, currentZIndex, updateActiveBlock, copiedStyles, setCopiedStyles, handleDuplicate, removeActiveBlock, handleResizeStart
}: any) {
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

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

      // 1. Znajdujemy płótno (Workspace) i obliczamy skalo-zoom
      const workspace = document.querySelector('[data-canvas-workspace="true"]') || document.body;
      const wsRect = workspace.getBoundingClientRect();
      
      // Obliczamy aktualny zoom płótna (żeby plakietka nie malała/rosła głupio)
      const scale = rect.width / overlayRef.current.offsetWidth;

      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      
      // Marginesy w pikselach ekranowych (globalnych)
      const SCREEN_MARGIN = 15;
      const TOP_LIMIT = 75; // Twój TopHeader

      // 2. Kalkulujemy pozycję IDEALNĄ (nad blokiem) w układzie GLOBALNYM
      let globalX = rect.left;
      let globalY = rect.top - (menuHeight * scale) - 10;

      // 3. LOGIKA PRZETRWANIA (CLAMPING) - GLOBALNA
      
      // Blokada LEWO/PRAWO względem krawędzi płótna
      globalX = Math.max(globalX, wsRect.left + SCREEN_MARGIN);
      if (globalX + (menuWidth * scale) > wsRect.right - SCREEN_MARGIN) {
        globalX = wsRect.right - (menuWidth * scale) - SCREEN_MARGIN;
      }

      // Blokada GÓRA (Wskakiwanie do środka)
      const effectiveTopLimit = Math.max(wsRect.top, TOP_LIMIT) + SCREEN_MARGIN;
      if (globalY < effectiveTopLimit) {
        globalY = rect.top + 10; // Wskok do środka bloku
      }

      // 4. KONWERSJA: Z globalnych pikseli na lokalne (wewnątrz skalowanego bloku)
      const localX = (globalX - rect.left) / scale;
      const localY = (globalY - rect.top) / scale;

      // 5. APLIKACJA
      menu.style.transform = `translate(${localX}px, ${localY}px)`;
      
      if (!isReady) setIsReady(true);
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(rafId);
  }, [isReady]);

  return (
    <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-[9999]" style={{ border: '2px solid var(--theme-color, #ff4500)' }}>
      
      {/* 💎 PLAKIETKA - WRÓCIŁA DO ŚRODKA (ABSOLUTE) 💎 */}
      <div 
        ref={menuRef}
        className="absolute top-0 left-0 bg-[#0a0a0c]/95 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-[0_10px_30px_rgba(0,0,0,0.5)] whitespace-nowrap z-[10000] flex items-center gap-3 pointer-events-auto cursor-default border transition-opacity duration-200"
        style={{ 
            borderColor: 'color-mix(in srgb, var(--theme-color, #ff4500) 40%, transparent)',
            opacity: isReady ? 1 : 0,
            left: 0, top: 0 // Pozycją steruje wyłącznie transform w JS
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full shadow-[0_0_8px_var(--theme-color)] animate-pulse" style={{ backgroundColor: 'var(--theme-color, #ff4500)' }}></span>
          <span className="tracking-widest uppercase opacity-90">{block.name}</span>
        </div>

        <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: (block.styles?.zIndex || 1) + 1 } }, true); }} className="hover:text-white text-neutral-400">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"></polyline></svg>
           </button>
           <span className="text-[10px] font-mono text-[var(--theme-color, #ff4500)] w-4 text-center">{block.styles?.zIndex || 1}</span>
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: Math.max(0, (block.styles?.zIndex || 1) - 1) } }, true); }} className="hover:text-white text-neutral-400">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
           </button>
           <div className="w-px h-3 bg-white/10 mx-1"></div>
           <button onClick={(e) => { e.stopPropagation(); if (setCopiedStyles) setCopiedStyles(block.styles); }} className="hover:text-green-400 text-neutral-400">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
           </button>
           {copiedStyles && (
             <button onClick={(e) => { 
                e.stopPropagation(); 
                const { width, height, minWidth, minHeight, left, top, position, display, flexDirection, flexWrap, gridTemplateColumns, gridTemplateRows, ...safeStyles } = copiedStyles;
                updateActiveBlock({ styles: { ...block.styles, ...safeStyles } }, true); 
              }} className="hover:text-green-400 text-[var(--theme-color, #ff4500)] scale-110"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button>
           )}
           <div className="w-px h-3 bg-white/10 mx-1"></div>
           <button onClick={(e) => { e.stopPropagation(); if(handleDuplicate) handleDuplicate(); }} className="hover:text-yellow-400 text-neutral-400"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
           <button onClick={(e) => { e.stopPropagation(); if(removeActiveBlock) removeActiveBlock(); }} className="hover:text-red-500 text-neutral-400"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
        </div>
      </div>
      
      {/* 🕹️ RESIZE HANDLES (Bez zmian) */}
      <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-nw-resize pointer-events-auto border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-ne-resize pointer-events-auto border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-sw-resize pointer-events-auto border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
      <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full shadow-md cursor-se-resize pointer-events-auto border-2 border-[var(--theme-color,#ff4500)]" onMouseDown={(e) => handleResizeStart(e, 'se')} />
    </div>
  );
}