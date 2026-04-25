import React from 'react';

interface TopHeaderProps {
  canvasZoom: number; setCanvasZoom: (z: number) => void;
  showGrid: boolean; setShowGrid: (s: boolean) => void;
  pageSlug: string; setPageSlug: (s: string) => void;
  handlePublish: () => void;
}

export default function TopHeader({ canvasZoom, setCanvasZoom, showGrid, setShowGrid, pageSlug, setPageSlug, handlePublish }: TopHeaderProps) {
  return (
    <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
      <div className="flex items-center gap-4">
         <div className="flex items-center bg-black rounded border border-neutral-800 text-xs">
           <button onClick={() => setCanvasZoom(Math.max(0.25, canvasZoom - 0.25))} className="px-3 py-1.5 hover:bg-neutral-800 text-neutral-400">−</button>
           <span className="px-2 font-mono w-12 text-center text-white">{Math.round(canvasZoom * 100)}%</span>
           <button onClick={() => setCanvasZoom(Math.min(2, canvasZoom + 0.25))} className="px-3 py-1.5 hover:bg-neutral-800 text-neutral-400">+</button>
         </div>
         <button onClick={() => setShowGrid(!showGrid)} className={`px-3 py-1.5 rounded border text-xs font-bold transition ${showGrid ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black border-neutral-800 text-neutral-400 hover:bg-neutral-800'}`} title="Siatka Architektoniczna">⊞</button>
         <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1.5 rounded outline-none focus:border-blue-500 w-48" placeholder="Adres..." />
      </div>
      <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded transition">ZAPISZ PROJEKT</button>
    </header>
  );
}