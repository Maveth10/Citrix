import React from 'react';

interface LayoutPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function LayoutPanel({ handleAddBlock }: LayoutPanelProps) {
  return (
    <div className="flex flex-col gap-3 pb-10">
      <div className="mt-2 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Formy i Pojemniki
        </span>
      </div>
      
      {/* PUSTE POLE */}
      <button 
        onClick={() => handleAddBlock('container', 'empty', 'Puste Pole')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg border-2 border-dashed border-neutral-700 hover:border-neutral-400 transition group text-left"
      >
        <span className="text-sm font-bold text-white block">Puste Pole</span>
        <span className="text-[10px] text-neutral-500">Standardowa strefa zrzutu</span>
      </button>

      {/* SZKLANA KARTA */}
      <button 
        onClick={() => handleAddBlock('container', 'glass', 'Szklana Karta')} 
        className="p-4 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 rounded-xl border border-white/20 transition group text-left shadow-xl"
      >
        <span className="text-sm font-bold text-white block">✨ Szklana Karta</span>
        <span className="text-[10px] text-blue-300">Efekt Glassmorphism (Blur)</span>
      </button>

      {/* NEONOWY BOX */}
      <button 
        onClick={() => handleAddBlock('container', 'neon', 'Neonowy Box')} 
        className="p-4 bg-black hover:bg-neutral-900 rounded-lg border-2 border-cyan-400 transition group text-left shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      >
        <span className="text-sm font-bold text-cyan-400 block">Neonowy Box</span>
        <span className="text-[10px] text-cyan-700 uppercase font-black">Cyberpunk Style</span>
      </button>

      {/* PIGUŁKA (PILL) */}
      <button 
        onClick={() => handleAddBlock('container', 'pill', 'Pigułka')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-full border border-neutral-700 hover:border-blue-500 transition group text-center"
      >
        <span className="text-sm font-bold text-white block">Pigułka (Pill)</span>
      </button>

      {/* ELEGANCKI CIEŃ */}
      <button 
        onClick={() => handleAddBlock('container', 'shadow-pro', 'Karta Premium')} 
        className="p-4 bg-white rounded-[2rem] transition group text-left shadow-2xl"
      >
        <span className="text-sm font-bold text-black block">Karta Premium</span>
        <span className="text-[10px] text-neutral-400">Głęboki, miękki cień</span>
      </button>

    </div>
  );
}