import React from 'react';

const btnWrapper = "group relative w-full text-left rounded-lg p-3 transition-all duration-300 bg-[#16161a] border border-white/5 hover:bg-white/[0.05] hover:border-[color:var(--theme-color)] hover:shadow-[0_0_15px_var(--theme-shadow)] overflow-hidden flex items-center gap-4";
const neonEdge = "absolute right-0 top-0 bottom-0 w-[3px] bg-[var(--theme-color)] shadow-[0_0_15px_var(--theme-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20";

export default function InsertsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-[#0a0a0f]/80 backdrop-blur-md rounded-b-xl border border-t-0 border-[color:var(--theme-color)] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)]">
      
      <button onClick={() => handleAddBlock('container', 'alert-success', 'Wstawka: Sukces')} className={btnWrapper}>
         <div className={neonEdge}></div>
         <div className="w-10 h-8 border-l-4 border-emerald-500 bg-emerald-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-emerald-500 w-4 h-1.5 rounded-sm shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div></div>
         <div>
           <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Panel Sukcesu</span>
           <span className="text-[9px] text-neutral-400 block leading-tight">Zielony pasek i plakietka.</span>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-warning', 'Wstawka: Uwaga')} className={btnWrapper}>
         <div className={neonEdge}></div>
         <div className="w-10 h-8 border-l-4 border-amber-500 bg-amber-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-amber-500 w-4 h-1.5 rounded-sm shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div></div>
         <div>
           <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Panel Ostrzeżenia</span>
           <span className="text-[9px] text-neutral-400 block leading-tight">Musztardowy pasek.</span>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-tip', 'Wstawka: Wskazówka')} className={btnWrapper}>
         <div className={neonEdge}></div>
         <div className="w-10 h-8 border-l-4 border-blue-500 bg-blue-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-blue-500 w-4 h-1.5 rounded-sm shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div></div>
         <div>
           <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Panel Info (Tip)</span>
           <span className="text-[9px] text-neutral-400 block leading-tight">Niebieski pasek i plakietka.</span>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'notice-box', 'Złożony Alert')} className={btnWrapper}>
         <div className={neonEdge}></div>
         <div className="w-10 h-8 border border-red-500 bg-red-500/20 rounded relative shrink-0"><div className="absolute -top-1.5 left-1 bg-red-500 w-6 h-2 rounded-sm shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div></div>
         <div>
           <span className="text-xs font-bold text-white block mb-0.5 group-hover:text-[color:var(--theme-color)] transition-colors">Alert z Ramką</span>
           <span className="text-[9px] text-neutral-400 block leading-tight">Pełna czerwona ramka.</span>
         </div>
      </button>

    </div>
  );
}