import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  blockType?: string; // 🔥 NOWOŚĆ: Typ klikniętego bloku
  onClose: () => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
  onCopyStyles: () => void;
  onPasteStyles: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onQuickAction?: (actionName: string) => void; // 🔥 NOWOŚĆ: Funkcja do szybkich akcji
  hasCopiedStyles: boolean;
}

export default function ContextMenu({
  x, y, blockType, onClose, onLayerUp, onLayerDown, onCopyStyles, onPasteStyles, onDuplicate, onRemove, onQuickAction, hasCopiedStyles
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Powiększyłem nieco zabezpieczenie menuY ze względu na nowe, dynamiczne przyciski
  const menuX = Math.min(x, typeof window !== 'undefined' ? window.innerWidth - 220 : x);
  const menuY = Math.min(y, typeof window !== 'undefined' ? window.innerHeight - 350 : y);

  const handleAction = (action: string) => {
    if (onQuickAction) onQuickAction(action);
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className="fixed z-[9999999] w-[220px] bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] py-2 flex flex-col animate-in fade-in zoom-in-95 duration-150"
      style={{ top: menuY, left: menuX }}
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {/* SEKCJA 1: SZYBKIE AKCJE (KONTEKSTOWE) */}
      {(blockType === 'img' || blockType === 'video' || blockType === 'container' || blockType === 'section') && (
        <>
          <div className="px-3 pb-1 mb-1 border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#00f2ff]">
            Szybkie Akcje
          </div>
          
          {(blockType === 'img' || blockType === 'video') && (
            <button onClick={() => handleAction('fill-100')} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-[#00f2ff]/20 hover:text-[#00f2ff] transition-colors flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              Rozciągnij (Fill)
            </button>
          )}

          {(blockType === 'container' || blockType === 'section') && (
            <button onClick={() => handleAction('center-all')} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-[#00f2ff]/20 hover:text-[#00f2ff] transition-colors flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
              Wyśrodkuj zawartość
            </button>
          )}

          <div className="w-full h-px bg-white/5 my-1"></div>
        </>
      )}

      {/* SEKCJA 2: OPCJE WARSTWY */}
      <div className="px-3 pb-1 mb-1 border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
        Opcje Warstwy
      </div>

      <button onClick={() => { onLayerUp(); onClose(); }} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-[#ff4500]/20 hover:text-[#ff4500] transition-colors flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        Przenieś wyżej <span className="ml-auto text-neutral-600 text-[10px] font-mono">]</span>
      </button>
      <button onClick={() => { onLayerDown(); onClose(); }} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-[#ff4500]/20 hover:text-[#ff4500] transition-colors flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        Przenieś niżej <span className="ml-auto text-neutral-600 text-[10px] font-mono">[</span>
      </button>

      <div className="w-full h-px bg-white/5 my-2"></div>

      <button onClick={() => { onCopyStyles(); onClose(); }} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-green-500/20 hover:text-green-400 transition-colors flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        Kopiuj Wygląd
      </button>
      
      <button 
        onClick={() => { if(hasCopiedStyles) { onPasteStyles(); onClose(); } }} 
        className={`w-full text-left px-4 py-2 text-xs flex items-center gap-3 transition-colors ${hasCopiedStyles ? 'text-white hover:bg-green-500/20 hover:text-green-400' : 'text-neutral-600 cursor-not-allowed'}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
        Wklej Wygląd
      </button>

      <div className="w-full h-px bg-white/5 my-2"></div>

      {/* SEKCJA 3: AKCJE KRYTYCZNE */}
      <button onClick={() => handleAction('hide-mobile')} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-purple-500/20 hover:text-purple-400 transition-colors flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        Ukryj na Mobile
      </button>

      <button onClick={() => { onDuplicate(); onClose(); }} className="w-full text-left px-4 py-2 text-xs text-white hover:bg-blue-500/20 hover:text-blue-400 transition-colors flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        Duplikuj <span className="ml-auto text-neutral-600 text-[10px] font-mono">^D</span>
      </button>
      
      <button onClick={() => { onRemove(); onClose(); }} className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        Usuń <span className="ml-auto text-red-900/50 text-[10px] font-mono">DEL</span>
      </button>

    </div>
  );
}