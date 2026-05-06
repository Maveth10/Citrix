import React from 'react';

const btnWrapper = "group relative w-full text-left rounded-lg p-3 transition-all duration-300 bg-[#16161a] border border-white/5 hover:bg-white/[0.05] hover:border-[color:var(--theme-color)] hover:shadow-[0_0_15px_var(--theme-shadow)] overflow-hidden flex items-center gap-4";
const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";

export default function HeadingsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-[#0a0a0f]/80 backdrop-blur-md rounded-b-xl border border-t-0 border-[color:var(--theme-color)] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)]">
      
      <button onClick={() => handleAddBlock('h1', 'brand', 'Markowy Tytuł')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
          <span className="text-blue-500 font-black text-lg">H1</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Markowy Tytuł</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Niebieski, mocny akcent.</span>
        </div>
      </button>
      
      <button onClick={() => handleAddBlock('h1', 'gradient', 'Gradient H1')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-lg">H1</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Magiczny Gradient</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Przejście z cyjanu w fiolet.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'outline', 'Outline H1')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
          <span className="font-black text-transparent text-lg" style={{ WebkitTextStroke: '1px white' }}>H1</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Pusty w Środku</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Stylowy obrys tekstu (Stroke).</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'highlight', 'H1 Wyróżnik')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-colors">
          <span className="font-black text-white text-lg relative z-10">H1<span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-400/80 -z-10"></span></span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Kluczowy Wyróżnik</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Tło przypominające marker.</span>
        </div>
      </button>
      
      <div className="w-full h-px bg-white/5 my-1"></div>

      <button onClick={() => handleAddBlock('h2', 'brand', 'Markowy Nagłówek')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
          <span className="text-blue-400 font-bold border-b-2 border-blue-500">H2</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Markowy Nagłówek</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Z dolną linią akcentującą.</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h2', '', 'Zwykły Nagłówek')} className={btnWrapper}>
        <div className={neonEdge}></div>
        <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
          <span className="text-neutral-300 font-bold text-sm">H2</span>
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Zwykły Nagłówek</span>
          <span className="text-[9px] text-neutral-400 block leading-tight">Klasyczny tekst wspomagający.</span>
        </div>
      </button>

    </div>
  );
}