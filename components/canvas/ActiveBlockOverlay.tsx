import React from 'react';

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
  block, 
  currentZIndex, 
  updateActiveBlock, 
  copiedStyles, 
  setCopiedStyles, 
  handleDuplicate, 
  removeActiveBlock, 
  handleResizeStart
}: ActiveBlockOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none border-2 border-[#ff4500] z-[200]">
      {/* GŁÓWNA ETYKIETA I NARZĘDZIA */}
      <div className="absolute -top-6 left-[-2px] bg-[#ff4500] text-white text-[9px] px-2 py-1.5 rounded-t font-bold shadow-sm whitespace-nowrap z-[200] flex items-center gap-2 pointer-events-auto cursor-default transition-colors hover:bg-orange-600"
           onDoubleClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { left: '0px', top: '0px' } }, true); }}
           title="Dwuklik: Wyzeruj swobodne przesunięcie"
      >
        <span>{block.name}</span>
        <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-white/30">
           
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: currentZIndex + 1 } }, true); }} className="hover:text-blue-300 transition-colors" title="Warstwa w górę ( ] )">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
           </button>
           <span className="text-[8px] font-mono opacity-80" title="Aktualny Z-Index">{currentZIndex}</span>
           <button onClick={(e) => { e.stopPropagation(); updateActiveBlock({ styles: { zIndex: Math.max(0, currentZIndex - 1) } }, true); }} className="hover:text-blue-300 transition-colors" title="Warstwa w dół ( [ )">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
           </button>

           <div className="w-px h-3 bg-white/30 mx-0.5"></div>
           
           <button onClick={(e) => { e.stopPropagation(); if (setCopiedStyles) setCopiedStyles(block.styles); }} className="hover:text-green-300 transition-colors" title="Skopiuj Design">
             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
           </button>
           {copiedStyles && (
             <button onClick={(e) => { 
                e.stopPropagation(); 
                const { width, height, minWidth, minHeight, left, top, position, display, flexDirection, flexWrap, gridTemplateColumns, gridTemplateRows, ...safeStyles } = copiedStyles;
                updateActiveBlock({ styles: { ...block.styles, ...safeStyles } }, true); 
              }} className="hover:text-green-300 transition-colors" title="Wklej Design">
               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
             </button>
           )}

           <div className="w-px h-3 bg-white/30 mx-0.5"></div>

           <button onClick={(e) => { e.stopPropagation(); if(handleDuplicate) handleDuplicate(); }} className="hover:text-yellow-200 transition-colors" title="Duplikuj (Ctrl+D)">
             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); if(removeActiveBlock) removeActiveBlock(); }} className="hover:text-red-300 transition-colors" title="Usuń (Delete)">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
           </button>
        </div>
      </div>
      
      {/* PUNKTY CHWYTANIA (RESIZE) */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-nw-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-ne-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-sw-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-se-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'se')} />
      
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-n-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-white border-2 border-[#ff4500] rounded-sm cursor-s-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-4 bg-white border-2 border-[#ff4500] rounded-sm cursor-w-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-4 bg-white border-2 border-[#ff4500] rounded-sm cursor-e-resize pointer-events-auto hover:bg-[#ff4500] transition-colors" onMouseDown={(e) => handleResizeStart(e, 'e')} />
    </div>
  );
}