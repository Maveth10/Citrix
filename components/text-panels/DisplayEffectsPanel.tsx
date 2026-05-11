import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function DisplayEffectsPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/5 border-x border-b border-[color:var(--theme-color)]/20 rounded-b-xl border-t-0 animate-in slide-in-from-top-2 duration-300">
      
      {/* 1. Tekst Konturowy */}
      <button 
        onClick={() => handleAddBlock('h1', 'stroke', 'Tekst Konturowy')}
        className="w-full flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group shadow-sm"
      >
        <span 
          className="text-3xl font-black tracking-widest uppercase transition-transform group-hover:scale-105"
          style={{ WebkitTextStroke: '2px var(--theme-color)', color: 'transparent' }}
        >
          KONTUR
        </span>
        <span className="text-[9px] text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-neutral-300">
          Przezroczysty środek
        </span>
      </button>

      {/* 2. Tekst z Gradientem */}
      <button 
        onClick={() => handleAddBlock('h1', 'gradient', 'Tekst Gradientowy')}
        className="w-full flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group shadow-sm"
      >
        <span 
          className="text-3xl font-black tracking-tighter uppercase transition-transform group-hover:scale-105 bg-clip-text text-transparent"
          style={{ 
            backgroundImage: 'linear-gradient(90deg, var(--theme-color), #9333ea)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          GRADIENT
        </span>
        <span className="text-[9px] text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-neutral-300">
          Maska wielokolorowa
        </span>
      </button>

      {/* 3. Neonowy Glow */}
      <button 
        onClick={() => handleAddBlock('h2', 'neon', 'Neonowy Glow')}
        className="w-full flex flex-col items-center justify-center p-4 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group shadow-sm"
      >
        <span 
          className="text-3xl font-bold uppercase transition-transform group-hover:scale-105 text-white"
          style={{ textShadow: '0 0 10px var(--theme-color), 0 0 20px var(--theme-color), 0 0 40px var(--theme-color)' }}
        >
          NEON GLOW
        </span>
        <span className="text-[9px] text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-neutral-300">
          Zaawansowany cień (RGB)
        </span>
      </button>

    </div>
  );
}