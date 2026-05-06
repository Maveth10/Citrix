import React from 'react';

const btnWrapper = "group relative w-full text-left rounded-xl p-3 transition-all duration-300 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:bg-white/[0.06] hover:border-[color:var(--theme-color)] hover:shadow-lg overflow-hidden flex items-center gap-4";
const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";
const ambientGlow = "absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-[var(--theme-color)] blur-[40px] opacity-0 group-hover:opacity-15 transition-all duration-500 z-0 pointer-events-none";

export default function HeadingsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-[color:var(--theme-color)]/30 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]">
      
      <button onClick={() => handleAddBlock('h1', 'brand', 'Markowy Tytuł')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xl font-black text-blue-500 block uppercase tracking-tighter leading-none group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] transition-all">Markowy Tytuł</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'gradient', 'Gradient H1')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all">Magiczny Gradient</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'outline', 'Outline H1')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xl font-black leading-none text-transparent tracking-tight transition-colors group-hover:text-white/10" style={{ WebkitTextStroke: '1px white' }}>Pusty w Środku</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', 'highlight', 'H1 Wyróżnik')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xl font-black leading-none text-white tracking-tight">Kluczowy <span style={{ background: 'linear-gradient(120deg, rgba(253,224,71,0.8) 0%, rgba(253,224,71,0.8) 100%) no-repeat', backgroundSize: '100% 35%', backgroundPosition: '0 90%' }}>Wyróżnik</span></span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h1', '', 'Zwykły Tytuł')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-xl font-bold text-white block tracking-tight leading-none">Zwykły Tytuł</span>
        </div>
      </button>

      <div className="w-full h-px bg-white/5 my-1"></div>

      <button onClick={() => handleAddBlock('h2', 'brand', 'Markowy Nagłówek')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-sm font-bold text-white block border-b-2 border-[color:var(--theme-color)] pb-1 w-max">Markowy Nagłówek</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('h2', '', 'Zwykły Nagłówek')} className={btnWrapper}>
        <div className={ambientGlow}></div><div className={neonEdge}></div>
        <div className="relative z-10 w-full">
          <span className="text-sm font-bold text-neutral-300 group-hover:text-white block transition-colors">Zwykły Nagłówek</span>
        </div>
      </button>
    </div>
  );
}