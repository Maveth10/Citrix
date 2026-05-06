import React from 'react';

const btnWrapper = "group relative w-full text-left rounded-lg p-3 transition-all duration-300 bg-[#16161a] border border-white/5 hover:bg-white/[0.05] hover:border-[color:var(--theme-color)] hover:shadow-[0_0_15px_var(--theme-shadow)] overflow-hidden flex items-center gap-4";
const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";

export default function ParagraphsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-[#0a0a0f]/80 backdrop-blur-md rounded-b-xl border border-t-0 border-[color:var(--theme-color)] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)]">
      
      <button onClick={() => handleAddBlock('p', 'eyebrow', 'Etykieta')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-[color:var(--theme-color)]/10 border border-[color:var(--theme-color)]/20 flex items-center justify-center shrink-0 group-hover:bg-[color:var(--theme-color)]/20 transition-colors">
          <span className="text-[color:var(--theme-color)] font-bold text-[8px] uppercase tracking-widest">Eye</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Etykieta (Eyebrow)</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Drobny nadtytuł sekcji.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', 'lead', 'Akapit Wiodący')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
          <span className="text-neutral-300 text-lg italic font-serif border-l-2 border-[color:var(--theme-color)] pl-1">¶</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Akapit Wiodący (Lead)</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Większy tekst wprowadzający.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', 'quote', 'Cytat')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
          <span className="text-neutral-400 text-xl font-serif">"</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Wyróżnienie (Cytat)</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Z boczną ramką. Idealne na opinie.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('p', '', 'Zwykły Akapit')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
          <span className="text-neutral-500 text-base">≡</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Zwykły Akapit</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Standardowy blok tekstu.</span>
        </div>
      </button>

    </div>
  );
}