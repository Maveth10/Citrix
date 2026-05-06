import React from 'react';

const btnWrapper = "group relative w-full text-left rounded-xl p-3 transition-all duration-300 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:bg-white/[0.06] hover:border-[color:var(--theme-color)] hover:shadow-lg overflow-hidden flex items-center gap-4";
const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";
const ambientGlow = "absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-[var(--theme-color)] blur-[40px] opacity-0 group-hover:opacity-15 transition-all duration-500 z-0 pointer-events-none";

export default function ParagraphsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-[color:var(--theme-color)]/30 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]">
      
      <button onClick={() => handleAddBlock('p', 'eyebrow', 'Etykieta')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-[10px] font-bold text-[color:var(--theme-color)] tracking-widest uppercase">Zacznij Tutaj (Eyebrow)</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', 'lead', 'Akapit Wiodący')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-sm text-neutral-300 block italic border-l-2 border-[color:var(--theme-color)] pl-3 group-hover:text-white transition-colors">To jest elegancki, markowy akapit tekstu (Lead)...</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', 'quote', 'Cytat')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xs italic text-neutral-400 border-l-2 border-[color:var(--theme-color)] pl-3 block group-hover:text-neutral-300 transition-colors">"Wybitny design to taki, z którego nie można już nic zabrać."</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', '', 'Zwykły Akapit')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xs text-neutral-400 block leading-relaxed group-hover:text-neutral-300 transition-colors">Zwykły, standardowy blok tekstu. Idealny do dłuższych opisów.</span>
        </div>
      </button>

    </div>
  );
}