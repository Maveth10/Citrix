import React from 'react';

interface ImagePanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ImagePanel({ handleAddBlock }: ImagePanelProps) {
  return (
    <div className="flex flex-col gap-2 pb-10">
      
      {/* --- POJEDYNCZE OBRAZY --- */}
      <div className="mt-2 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Pojedyncze Media</span>
      </div>
      
      <button onClick={() => handleAddBlock('img', 'photo', 'Zdjęcie')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border border-neutral-700 hover:border-blue-500 group flex items-center gap-3">
        <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🖼️</div>
        <div>
          <span className="text-sm font-bold text-white block">Zdjęcie klasyczne</span>
          <span className="text-[9px] text-neutral-400">Z obramowaniem i cieniem</span>
        </div>
      </button>
      
      <button onClick={() => handleAddBlock('img', 'transparent', 'Grafika PNG')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border border-neutral-700 hover:border-blue-500 group flex items-center gap-3">
        {/* Szachownica symulująca przezroczystość (typowa dla programów graficznych) */}
        <div className="w-10 h-10 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rVrf2QIAv///wPikEAAMgwBDKkH0A7d3OAAAAAASUVORK5CYII=')] rounded flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-inner">✨</div>
        <div>
          <span className="text-sm font-bold text-white block">Grafika (PNG)</span>
          <span className="text-[9px] text-neutral-400">Wycięte logo lub wektor</span>
        </div>
      </button>

      {/* --- ZŁOŻONE GALERIE --- */}
      <div className="mt-4 mb-1 px-1">
        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Kolekcje i Galerie</span>
      </div>
      
      <button onClick={() => handleAddBlock('grid', 'gallery-grid', 'Siatka Pro')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border border-neutral-700 hover:border-emerald-500 group">
        <span className="text-sm font-bold text-white block mb-1">✨ Siatka z Zoomem</span>
        <span className="text-[10px] text-neutral-500 block leading-tight">Automatyczny układ kafelkowy z efektem powiększania po najechaniu myszką.</span>
      </button>
      
      <button onClick={() => handleAddBlock('carousel', '', 'Karuzela')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg text-left transition border border-neutral-700 hover:border-emerald-500 group">
        <span className="text-sm font-bold text-white block mb-1">🎠 Karuzela (Slider)</span>
        <span className="text-[10px] text-neutral-500 block leading-tight">Przesuwany w poziomie pasek wielu zdjęć połączony z Menedżerem Mediów.</span>
      </button>

    </div>
  );
}