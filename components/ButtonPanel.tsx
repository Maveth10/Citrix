import React from 'react';

interface ButtonPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ButtonPanel({ handleAddBlock }: ButtonPanelProps) {
  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* --- GŁÓWNE AKCJE --- */}
      <div className="mt-2 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Główne Akcje (CTA)
        </span>
      </div>
      
      <button 
        onClick={() => handleAddBlock('button', '', 'Pełny kolor')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center justify-center transition border border-neutral-700 hover:border-blue-500 group w-full text-left"
      >
        <span className="bg-white text-black font-bold py-2 px-6 rounded group-hover:scale-105 transition-transform w-full text-center block">
          Pełny Kolor
        </span>
      </button>

      <button 
        onClick={() => handleAddBlock('button', 'outline', 'Tylko Obrys')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center justify-center transition border border-neutral-700 hover:border-blue-500 group w-full text-left"
      >
        <span className="bg-transparent text-white font-bold py-2 px-6 rounded border-2 border-white group-hover:scale-105 transition-transform w-full text-center block">
          Tylko Obrys
        </span>
      </button>

      <button 
        onClick={() => handleAddBlock('button', 'gradient', 'Gradient')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center justify-center transition border border-neutral-700 hover:border-blue-500 group w-full text-left"
      >
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded border-none group-hover:scale-105 transition-transform w-full text-center shadow-lg block">
          Nowoczesny Gradient
        </span>
      </button>

      {/* --- NARZĘDZIA ZASIĘGU --- */}
      <div className="mt-4 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Narzędzia Zasięgu
        </span>
      </div>
      
      <button 
        onClick={() => handleAddBlock('button', 'share', 'Pasek Udostępniania')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center justify-center transition border border-neutral-700 hover:border-blue-500 group w-full text-left"
      >
        <span className="bg-neutral-100 text-black font-bold py-2 px-6 rounded-full group-hover:scale-105 transition-transform w-full flex items-center justify-center gap-2 block">
          <span className="inline-block">🔗</span> Udostępnij
        </span>
      </button>

    </div>
  );
}