import React from 'react';

const btnWrapper = "group relative w-full text-left p-3.5 transition-all duration-300 bg-transparent border-b border-white/5 last:border-b-0 hover:bg-black/40 overflow-hidden flex flex-col";
const activeLine = "absolute left-0 top-0 bottom-0 w-[2px] bg-[color:var(--theme-color)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_var(--theme-color)]";
const dot = "w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[color:var(--theme-color)] group-hover:shadow-[0_0_8px_var(--theme-color)] transition-all duration-300 shrink-0";

export default function HeadingsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col">
      <button onClick={() => handleAddBlock('h1', 'hero', 'Hero Headline')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Hero Headline</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Masywny, klasyczny tytuł główny.</span>
      </button>

      <button onClick={() => handleAddBlock('h1', 'swiss-minimal', 'Swiss Minimal')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Swiss Minimalist</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Ultranowoczesny, ciasny krój.</span>
      </button>

      <button onClick={() => handleAddBlock('h1', 'holographic', 'Holographic Foil')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Holographic Foil</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Tytuł mieniący się wielokolorowym widmem.</span>
      </button>

      <button onClick={() => handleAddBlock('h1', 'aurora-text', 'Aurora Mesh')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Aurora Mesh</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Płynący, holograficzny gradient w tle.</span>
      </button>

      <button onClick={() => handleAddBlock('h1', 'metallic', 'Metallic Gold')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Metallic Gold</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Złoty, szczotkowany luksusowy gradient.</span>
      </button>

      <div className="w-full h-px bg-white/5 my-1"></div>

      <button onClick={() => handleAddBlock('h2', 'kicker', 'Kicker (Eyebrow)')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Kicker (Eyebrow)</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Drobny, rozstrzelony nadtytuł systemowy.</span>
      </button>
    </div>
  );
}