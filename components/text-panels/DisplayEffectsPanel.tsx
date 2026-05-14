import React from 'react';

const btnWrapper = "group relative w-full text-left p-3.5 transition-all duration-300 bg-transparent border-b border-white/5 last:border-b-0 hover:bg-black/40 overflow-hidden flex flex-col";
const activeLine = "absolute left-0 top-0 bottom-0 w-[2px] bg-[color:var(--theme-color)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_var(--theme-color)]";
const dot = "w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[color:var(--theme-color)] group-hover:shadow-[0_0_8px_var(--theme-color)] transition-all duration-300 shrink-0";

export default function DisplayEffectsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col">
      <button onClick={() => handleAddBlock('h1', 'outline', 'Holographic Blueprint')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Holographic Blueprint</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Wektorowy obrys z pustym rdzeniem.</span>
      </button>

      <button onClick={() => handleAddBlock('h1', 'blackmirror', 'Signal Interference')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Signal Interference</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Szum radiacyjny i cyfrowe zakłócenia CRT.</span>
      </button>

      <button onClick={() => handleAddBlock('h2', 'flicker-neon', 'Plasma Tube')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Plasma Tube</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Niestabilne wyładowania świetlówki neonowej.</span>
      </button>

      <button onClick={() => handleAddBlock('h1', 'masked-liquid', 'Liquid Interface')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Liquid Interface</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Tekst wypełniony organiczną symulacją płynu.</span>
      </button>
    </div>
  );
}