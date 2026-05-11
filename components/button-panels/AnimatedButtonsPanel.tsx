import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function AnimatedButtonsPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/5 border-x border-b border-[color:var(--theme-color)]/20 rounded-b-xl border-t-0">
      
      {/* 1. Shine (Przechodzący Błysk) */}
      <button 
        onClick={() => handleAddBlock('button', 'btn-shine', 'Przycisk Shine')}
        className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-violet-500/50 hover:bg-white/5 transition-all group overflow-hidden relative"
      >
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center mr-3 text-xl">✨</div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Shine (Błysk)</span>
           <span className="text-[9px] text-neutral-500">Elegancki efekt przejścia światła</span>
        </div>
      </button>

      {/* 2. Magiczna Ramka (Border Glow) */}
      <button 
        onClick={() => handleAddBlock('button', 'btn-glow', 'Przycisk Glow')}
        className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-violet-500/50 hover:bg-white/5 transition-all group"
      >
        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center mr-3 text-xl relative overflow-hidden">
          <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin"></div>
          <div className="absolute inset-[2px] bg-[#0a0a0c] rounded-md flex items-center justify-center">🌀</div>
        </div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Magic Border</span>
           <span className="text-[9px] text-neutral-500">Kręcący się neonowy gradient na krawędzi</span>
        </div>
      </button>

      {/* 3. Puls (Bicie Serca) */}
      <button 
        onClick={() => handleAddBlock('button', 'btn-pulse', 'Przycisk Puls')}
        className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-violet-500/50 hover:bg-white/5 transition-all group"
      >
        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center mr-3 text-xl group-hover:animate-pulse shadow-[0_0_15px_var(--theme-color)]">
          💓
        </div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Pulse (Pulsowanie)</span>
           <span className="text-[9px] text-neutral-500">Kuszący przycisk z oddychającym cieniem</span>
        </div>
      </button>

    </div>
  );
}