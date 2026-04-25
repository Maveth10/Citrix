import React from 'react';

interface GraphicsPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function GraphicsPanel({ handleAddBlock }: GraphicsPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      {/* 1. NAKLEJKI (STICKERS) */}
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Naklejki (Stickers)</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => handleAddBlock('img', 'sticker-sale', 'Naklejka Sale')} 
          className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-red-500 flex flex-col items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-[10px] group-hover:scale-110 transition-transform">SALE</div>
          <span className="text-[10px] font-bold text-neutral-300">Wyprzedaż</span>
        </button>

        <button 
          onClick={() => handleAddBlock('img', 'sticker-new', 'Naklejka New')} 
          className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 flex flex-col items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px] group-hover:scale-110 transition-transform" style={{clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)'}}>NEW</div>
          <span className="text-[10px] font-bold text-neutral-300">Nowość</span>
        </button>
      </div>

      {/* 2. IKONY (ICONS) */}
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Ikony Wektorowe</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => handleAddBlock('img', 'icon-star', 'Ikona Gwiazdka')} 
          className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-yellow-500 flex flex-col items-center gap-2 group"
        >
          <div className="text-2xl text-yellow-400 group-hover:scale-110 transition-transform drop-shadow-md">⭐</div>
          <span className="text-[10px] font-bold text-neutral-300">Gwiazdka</span>
        </button>

        <button 
          onClick={() => handleAddBlock('img', 'icon-heart', 'Ikona Serce')} 
          className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-pink-500 flex flex-col items-center gap-2 group"
        >
          <div className="text-2xl text-pink-500 group-hover:scale-110 transition-transform drop-shadow-md">💖</div>
          <span className="text-[10px] font-bold text-neutral-300">Serce</span>
        </button>
      </div>

      {/* 3. ILUSTRACJE / WEKTORY */}
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Ilustracje</span>
      </div>
      <button 
        onClick={() => handleAddBlock('img', 'vector-chart', 'Wektor Wykres')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full flex items-center gap-4"
      >
        <div className="w-10 h-10 flex items-end justify-between gap-1 group-hover:scale-110 transition-transform shrink-0">
          <div className="w-2.5 h-4 bg-blue-500 rounded-sm"></div>
          <div className="w-2.5 h-7 bg-purple-500 rounded-sm"></div>
          <div className="w-2.5 h-10 bg-indigo-500 rounded-sm"></div>
        </div>
        <div>
          <span className="text-sm font-bold text-white block mb-0.5">Wykres Flat</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Wektorowa ilustracja biznesowa. Posiada tło przezroczyste.</span>
        </div>
      </button>

      {/* 4. KSZTAŁTY PODSTAWOWE (Klasyka) */}
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Proste Kształty (Div)</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => handleAddBlock('shape', 'box', 'Kwadrat')} className="aspect-square bg-[#222] hover:bg-[#2A2A2A] rounded-lg border border-neutral-700 hover:border-blue-500 flex flex-col items-center justify-center gap-2 group">
          <div className="w-6 h-6 bg-blue-500 group-hover:scale-110 transition-transform rounded-sm"></div>
        </button>

        <button onClick={() => handleAddBlock('shape', 'circle', 'Koło')} className="aspect-square bg-[#222] hover:bg-[#2A2A2A] rounded-lg border border-neutral-700 hover:border-pink-500 flex flex-col items-center justify-center gap-2 group">
          <div className="w-6 h-6 bg-pink-500 rounded-full group-hover:scale-110 transition-transform"></div>
        </button>

        <button onClick={() => handleAddBlock('shape', 'line', 'Linia')} className="aspect-square bg-[#222] hover:bg-[#2A2A2A] rounded-lg border border-neutral-700 hover:border-white flex flex-col items-center justify-center gap-2 group">
          <div className="w-8 h-1 bg-white group-hover:scale-110 transition-transform"></div>
        </button>
      </div>

    </div>
  );
}