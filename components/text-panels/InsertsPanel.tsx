import React from 'react';

export default function InsertsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
      <button onClick={() => handleAddBlock('container', 'alert-success', 'Wstawka: Sukces')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-800 hover:border-emerald-500 text-left w-full flex items-center gap-4 relative group">
         <div className="w-10 h-8 border-l-4 border-emerald-500 bg-emerald-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-emerald-500 w-4 h-1.5 rounded-sm"></div></div>
         <div><span className="text-xs font-bold text-white block">Panel Sukcesu</span><span className="text-[9px] text-neutral-400 block">Zielony pasek i plakietka.</span></div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-warning', 'Wstawka: Uwaga')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-800 hover:border-amber-500 text-left w-full flex items-center gap-4 relative group">
         <div className="w-10 h-8 border-l-4 border-amber-500 bg-amber-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-amber-500 w-4 h-1.5 rounded-sm"></div></div>
         <div><span className="text-xs font-bold text-white block">Panel Ostrzeżenia</span><span className="text-[9px] text-neutral-400 block">Musztardowy pasek.</span></div>
      </button>

      <button onClick={() => handleAddBlock('container', 'alert-tip', 'Wstawka: Wskazówka')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-800 hover:border-blue-500 text-left w-full flex items-center gap-4 relative group">
         <div className="w-10 h-8 border-l-4 border-blue-500 bg-blue-500/20 rounded-r relative shrink-0"><div className="absolute -top-1 left-1 bg-blue-500 w-4 h-1.5 rounded-sm"></div></div>
         <div><span className="text-xs font-bold text-white block">Panel Info</span><span className="text-[9px] text-neutral-400 block">Niebieski pasek i plakietka.</span></div>
      </button>

      <button onClick={() => handleAddBlock('container', 'notice-box', 'Złożony Alert')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-800 hover:border-red-500 text-left w-full flex items-center gap-4 relative group">
         <div className="w-10 h-8 border border-red-500 bg-red-500/20 rounded relative shrink-0"><div className="absolute -top-1.5 left-1 bg-red-500 w-6 h-2 rounded-sm"></div></div>
         <div><span className="text-xs font-bold text-white block mb-0.5">Alert z Ramką</span><span className="text-[9px] text-neutral-400 block leading-tight">Pełna czerwona ramka.</span></div>
      </button>
    </div>
  );
}