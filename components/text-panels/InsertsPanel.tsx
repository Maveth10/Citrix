import React from 'react';

const btnWrapper = "group relative w-full text-left p-4 transition-all duration-300 bg-transparent border-b border-white/5 last:border-b-0 hover:bg-[color:var(--theme-color)]/[0.03] flex items-center gap-4 overflow-hidden";
const activeLine = "absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[color:var(--theme-color)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_var(--theme-color)] rounded-r-full";
const iconBox = "relative w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center shrink-0 group-hover:border-[color:var(--theme-color)]/40 group-hover:bg-[color:var(--theme-color)]/10 transition-all duration-300";

export default function InsertsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col bg-black/10">
      
      <button onClick={() => handleAddBlock('container', 'alert-success', 'Wstawka: Sukces')} className={btnWrapper}>
         <div className={activeLine}></div>
         <div className="relative w-9 h-7 border-l-2 border-emerald-500 bg-emerald-500/10 rounded-r flex shrink-0 group-hover:border-emerald-400 transition-colors">
            <div className="absolute -top-1 left-1 bg-emerald-500 w-3 h-1 rounded-sm"></div>
         </div>
         <div>
           <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Panel Sukcesu</span>
           <span className="text-[10px] text-neutral-500 block leading-tight font-light">Zielony pasek i plakietka.</span>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-warning', 'Wstawka: Uwaga')} className={btnWrapper}>
         <div className={activeLine}></div>
         <div className="relative w-9 h-7 border-l-2 border-amber-500 bg-amber-500/10 rounded-r flex shrink-0 group-hover:border-amber-400 transition-colors">
            <div className="absolute -top-1 left-1 bg-amber-500 w-3 h-1 rounded-sm"></div>
         </div>
         <div>
           <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Panel Ostrzeżenia</span>
           <span className="text-[10px] text-neutral-500 block leading-tight font-light">Musztardowy pasek.</span>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-tip', 'Wstawka: Wskazówka')} className={btnWrapper}>
         <div className={activeLine}></div>
         <div className="relative w-9 h-7 border-l-2 border-blue-500 bg-blue-500/10 rounded-r flex shrink-0 group-hover:border-blue-400 transition-colors">
            <div className="absolute -top-1 left-1 bg-blue-500 w-3 h-1 rounded-sm"></div>
         </div>
         <div>
           <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Panel Info (Tip)</span>
           <span className="text-[10px] text-neutral-500 block leading-tight font-light">Niebieski pasek i plakietka.</span>
         </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'notice-box', 'Złożony Alert')} className={btnWrapper}>
         <div className={activeLine}></div>
         <div className="relative w-9 h-7 border border-red-500/50 bg-red-500/10 rounded shrink-0 group-hover:border-red-400 transition-colors">
            <div className="absolute -top-1 left-1 bg-red-500 w-4 h-1.5 rounded-sm"></div>
         </div>
         <div>
           <span className="text-xs font-semibold text-neutral-200 block mb-0.5 group-hover:text-white transition-colors">Alert z Ramką</span>
           <span className="text-[10px] text-neutral-500 block leading-tight font-light">Pełna ramka, górna plakietka.</span>
         </div>
      </button>

    </div>
  );
}