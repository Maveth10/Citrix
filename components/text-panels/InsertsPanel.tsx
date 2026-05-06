import React from 'react';

const btnWrapper = "group relative w-full text-left rounded-xl p-3 transition-all duration-300 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:bg-white/[0.06] hover:border-[color:var(--theme-color)] hover:shadow-lg overflow-hidden flex items-center gap-4";
const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";
const ambientGlow = "absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-[var(--theme-color)] blur-[40px] opacity-0 group-hover:opacity-15 transition-all duration-500 z-0 pointer-events-none";

export default function InsertsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-[color:var(--theme-color)]/30 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]">
      
      <button onClick={() => handleAddBlock('container', 'alert-success', 'Wstawka: Sukces')} className={btnWrapper}>
         <div className={ambientGlow}></div><div className={neonEdge}></div>
         <div className="relative z-10 flex items-center gap-4 w-full">
           <div className="w-10 h-8 border-l-4 border-emerald-500 bg-emerald-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-emerald-500 w-4 h-1.5 rounded-sm shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div></div>
           <div>
             <span className="text-xs font-bold text-white block group-hover:text-emerald-400 transition-colors">Panel Sukcesu</span>
             <span className="text-[9px] text-neutral-400 block">Zielony pasek i plakietka.</span>
           </div>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-warning', 'Wstawka: Uwaga')} className={btnWrapper}>
         <div className={ambientGlow}></div><div className={neonEdge}></div>
         <div className="relative z-10 flex items-center gap-4 w-full">
           <div className="w-10 h-8 border-l-4 border-amber-500 bg-amber-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-amber-500 w-4 h-1.5 rounded-sm shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div></div>
           <div>
             <span className="text-xs font-bold text-white block group-hover:text-amber-400 transition-colors">Panel Ostrzeżenia</span>
             <span className="text-[9px] text-neutral-400 block">Musztardowy pasek.</span>
           </div>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-tip', 'Wstawka: Wskazówka')} className={btnWrapper}>
         <div className={ambientGlow}></div><div className={neonEdge}></div>
         <div className="relative z-10 flex items-center gap-4 w-full">
           <div className="w-10 h-8 border-l-4 border-blue-500 bg-blue-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-blue-500 w-4 h-1.5 rounded-sm shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div></div>
           <div>
             <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition-colors">Panel Info (Tip)</span>
             <span className="text-[9px] text-neutral-400 block">Niebieski pasek i plakietka.</span>
           </div>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'notice-box', 'Złożony Alert')} className={btnWrapper}>
         <div className={ambientGlow}></div><div className={neonEdge}></div>
         <div className="relative z-10 flex items-center gap-4 w-full">
           <div className="w-10 h-8 border border-red-500 bg-red-500/20 rounded relative shrink-0"><div className="absolute -top-1.5 left-1 bg-red-500 w-6 h-2 rounded-sm shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div></div>
           <div>
             <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-red-500 transition-colors">Alert z Ramką</span>
             <span className="text-[9px] text-neutral-400 block leading-tight">Pełna czerwona ramka z górną plakietką.</span>
           </div>
         </div>
      </button>

    </div>
  );
}