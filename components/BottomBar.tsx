import React from 'react';

interface BottomBarProps {
  blocks: any[];
  activeId: number | null;
  setActiveId: (id: number | null) => void;
}

export default function BottomBar({ blocks, activeId, setActiveId }: BottomBarProps) {
  // Funkcja szukająca ścieżki od korzenia do zaznaczonego elementu
  const getBreadcrumbs = (arr: any[], targetId: number | null, currentPath: any[] = []): any[] | null => {
    if (!targetId) return [];
    for (const b of arr) {
      const newPath = [...currentPath, b];
      if (b.id === targetId) return newPath;
      if (b.children) {
        const found = getBreadcrumbs(b.children, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  };

  const path = getBreadcrumbs(blocks, activeId) || [];

  return (
    // KLUCZOWE: Usunięte twarde bg-[#0a0a0a] i border-black. 
    // Daliśmy bg-transparent i border-white/5, by szkło z page.tsx prześwitywało.
    <div className="h-8 bg-transparent border-t border-white/5 flex items-center justify-between px-4 text-[10px] text-neutral-400 z-[300] relative w-full shrink-0">
      
      {/* ŚCIEŻKA DOM (BREADCRUMBS) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveId(null)} 
          className={`hover:text-white transition flex items-center gap-1 ${!activeId ? 'text-[#ff4500] font-bold drop-shadow-[0_0_5px_rgba(255,69,0,0.5)]' : ''}`}
        >
          🌍 Płótno
        </button>
        
        {path.map((b, i) => (
          <React.Fragment key={b.id}>
            <span className="text-neutral-600">/</span>
            <button 
              onClick={() => setActiveId(b.id)} 
              className={`hover:text-white transition truncate max-w-[120px] ${i === path.length - 1 ? 'text-[#ff4500] font-bold drop-shadow-[0_0_5px_rgba(255,69,0,0.5)]' : ''}`}
              title={b.name}
            >
              {b.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* STATUS SYSTEMU */}
      <div className="flex items-center gap-4 shrink-0 ml-4 font-mono">
        <div className="flex items-center gap-1.5" title="Silnik Renderujący">
          <span className="text-[8px] opacity-70">DOM:</span>
          <span className="text-white">{blocks.length} nodes</span>
        </div>
        <div className="w-px h-3 bg-white/10"></div>
        <div className="flex items-center gap-1.5" title="Supabase Database">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981] animate-pulse"></div>
          <span className="text-emerald-500 font-bold">Online</span>
        </div>
      </div>

    </div>
  );
}