import React from 'react';

const btnWrapper = "group relative w-full text-left p-3.5 transition-all duration-300 bg-transparent border-b border-white/5 last:border-b-0 hover:bg-black/40 overflow-hidden flex flex-col";
const activeLine = "absolute left-0 top-0 bottom-0 w-[2px] bg-[color:var(--theme-color)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_var(--theme-color)]";
const dot = "w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[color:var(--theme-color)] group-hover:shadow-[0_0_8px_var(--theme-color)] transition-all duration-300 shrink-0";

export default function InsertsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col">
      <button onClick={() => handleAddBlock('p', 'badge', 'Status Badge')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Status Badge</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Wyróżniona etykietka systemowa.</span>
      </button>

      <button onClick={() => handleAddBlock('p', 'kbd', 'Tactile KBD')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Tactile KBD</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Fizyczny znacznik klawisza klawiatury.</span>
      </button>

      <button onClick={() => handleAddBlock('list', 'pro-checklist', 'Pro Checklist')} className={btnWrapper}>
        <div className={activeLine}></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={dot}></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors">Pro Checklist</span>
        </div>
        <span className="text-[9px] text-neutral-500 leading-tight pl-4 group-hover:text-neutral-400 transition-colors">Lista z wektorowymi znacznikami wyboru.</span>
      </button>

      <div className="w-full h-px bg-white/5 my-1"></div>
      <div className="px-3.5 py-2">
        <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">Powiadomienia HUD</span>
      </div>

      <button onClick={() => handleAddBlock('container', 'alert-success', 'Alert Sukces')} className={btnWrapper}>
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_#10b981]"></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 group-hover:shadow-[0_0_8px_#10b981] transition-all duration-300 shrink-0"></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors uppercase tracking-widest">Success Signal</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'notice-box', 'Alert Ważne')} className={btnWrapper}>
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_#ef4444]"></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_#ef4444] transition-all duration-300 shrink-0"></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-red-400 transition-colors uppercase tracking-widest">Warning Matrix</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-tip', 'Alert Wskazówka')} className={btnWrapper}>
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_#3b82f6]"></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 group-hover:shadow-[0_0_8px_#3b82f6] transition-all duration-300 shrink-0"></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-blue-400 transition-colors uppercase tracking-widest">Guidance Node</span>
        </div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-cosmos', 'Alert Kosmos')} className={btnWrapper}>
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_10px_#a855f7]"></div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-500 group-hover:shadow-[0_0_8px_#a855f7] transition-all duration-300 shrink-0 animate-pulse"></div>
          <span className="text-[11px] font-bold text-neutral-200 group-hover:text-purple-400 transition-colors uppercase tracking-widest">Anomaly Detect</span>
        </div>
      </button>

    </div>
  );
}