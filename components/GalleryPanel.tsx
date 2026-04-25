import React from 'react';

interface GalleryPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function GalleryPanel({ handleAddBlock }: GalleryPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Kolekcje Obrazów
        </span>
      </div>

      {/* SIATKA PRO */}
      <button 
        onClick={() => handleAddBlock('grid', 'gallery-grid', 'Siatka Pro')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full"
      >
        {/* Wizualizacja Siatki */}
        <div className="w-full grid grid-cols-3 gap-1 mb-3">
          <div className="aspect-square bg-neutral-700 rounded-sm group-hover:bg-blue-400 transition-colors"></div>
          <div className="aspect-square bg-neutral-700 rounded-sm group-hover:bg-blue-500 transition-colors delay-75"></div>
          <div className="aspect-square bg-neutral-700 rounded-sm group-hover:bg-blue-400 transition-colors delay-100"></div>
          <div className="aspect-square bg-neutral-700 rounded-sm group-hover:bg-blue-500 transition-colors delay-150"></div>
          <div className="aspect-square bg-neutral-700 rounded-sm group-hover:bg-blue-400 transition-colors delay-200"></div>
          <div className="aspect-square bg-neutral-700 rounded-sm group-hover:bg-blue-500 transition-colors delay-300"></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Siatka Zdjęć (Grid)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Idealnie wyrównane kafelki z efektem przybliżenia po najechaniu.</span>
      </button>

      {/* KARUZELA */}
      <button 
        onClick={() => handleAddBlock('carousel', '', 'Karuzela')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 group text-left w-full"
      >
        {/* Wizualizacja Karuzeli */}
        <div className="w-full h-16 bg-neutral-900 border border-neutral-700 rounded mb-3 flex items-center justify-between px-2 group-hover:border-emerald-500 transition-colors relative overflow-hidden">
          <div className="w-4 h-4 bg-neutral-700 rounded-full flex items-center justify-center text-[8px] text-neutral-400">◀</div>
          <div className="w-16 h-10 bg-neutral-600 rounded shadow-lg group-hover:scale-110 transition-transform"></div>
          <div className="w-4 h-4 bg-neutral-700 rounded-full flex items-center justify-center text-[8px] text-neutral-400">▶</div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Karuzela (Slider)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Przesuwana galeria połączona bezpośrednio z dedykowanym Menedżerem Mediów.</span>
      </button>

    </div>
  );
}