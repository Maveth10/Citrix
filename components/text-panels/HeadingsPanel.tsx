import React from 'react';

const btnWrapper = "group relative w-full text-left p-4 transition-all duration-300 bg-transparent border-b border-white/5 last:border-b-0 hover:bg-black/40 flex items-center gap-4 overflow-hidden";
const activeLine = "absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[color:var(--theme-color)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_var(--theme-color)] rounded-r-full";
const iconBox = "relative w-9 h-9 rounded-lg bg-black/40 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center shrink-0 group-hover:border-[color:var(--theme-color)]/40 group-hover:bg-[color:var(--theme-color)]/10 transition-all duration-300";

export default function HeadingsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    // Zwiększone przyciemnienie tła pod listą (bg-[#050508]/60)
    <div className="flex flex-col bg-[#050508]/60 backdrop-blur-sm">
      
      <button onClick={() => handleAddBlock('h1', 'brand', 'Markowy Tytuł')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text-blue-500 font-bold text-sm">H1</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Markowy Tytuł</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Niebieski, mocny akcent.</span>
        </div>
      </button>
      
      <button onClick={() => handleAddBlock('h1', 'gradient', 'Gradient H1')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-sm">H1</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Magiczny Gradient</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Przejście z cyjanu w fiolet.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'outline', 'Outline H1')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="font-bold text-transparent text-sm" style={{ WebkitTextStroke: '1px white' }}>H1</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Pusty w Środku</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Stylowy obrys tekstu (Stroke).</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'highlight', 'H1 Wyróżnik')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="font-bold text-white text-sm relative z-10">H1<span className="absolute bottom-0.5 left-0 w-full h-1.5 bg-yellow-400/80 -z-10"></span></span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Kluczowy Wyróżnik</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Tło przypominające marker.</span>
        </div>
      </button>
      
      <div className="w-full h-px bg-white/5"></div>

      <button onClick={() => handleAddBlock('h2', 'brand', 'Markowy Nagłówek')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text-blue-400 font-medium text-xs border-b border-blue-500">H2</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Markowy Nagłówek</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Z dolną linią akcentującą.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h2', '', 'Zwykły Nagłówek')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className={iconBox}><span className="text-neutral-400 font-medium text-xs">H2</span></div>
        <div>
          <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Zwykły Nagłówek</span>
          <span className="text-[10px] text-neutral-500 block leading-tight font-light">Klasyczny tekst wspomagający.</span>
        </div>
      </button>

    </div>
  );
}