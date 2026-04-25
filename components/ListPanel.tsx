import React from 'react';

interface ListPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ListPanel({ handleAddBlock }: ListPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Wyliczenia
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('list', '', 'Lista Punktowana')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full flex items-start gap-3"
      >
        <div className="text-blue-500 font-black text-xl leading-none mt-1 group-hover:scale-125 transition-transform">•</div>
        <div>
          <span className="text-sm font-bold text-white block mb-1">Zwykła Lista (Punktory)</span>
          <span className="text-[10px] text-neutral-400 block leading-tight">Klasyczna wypunktowana lista cech lub korzyści.</span>
        </div>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Procesy i Instrukcje
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('list', 'steps', 'Kroki Procesu')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-emerald-500 group text-left w-full relative overflow-hidden"
      >
        {/* Wizualizacja kroków */}
        <div className="w-full bg-neutral-900 border border-neutral-700 rounded mb-3 p-3 flex flex-col gap-2">
           <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-500 text-black font-bold text-[9px] flex items-center justify-center rounded-full shrink-0">1</div><div className="w-full h-2 bg-neutral-600 rounded-sm"></div></div>
           <div className="flex items-center gap-2"><div className="w-4 h-4 bg-neutral-600 text-black font-bold text-[9px] flex items-center justify-center rounded-full shrink-0">2</div><div className="w-2/3 h-2 bg-neutral-700 rounded-sm"></div></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Kroki Procesu (Timeline)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Lista numeryczna z miejscem na duży nagłówek i mniejszy opis dla każdego punktu.</span>
      </button>

      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Interaktywne
        </span>
      </div>

      <button 
        onClick={() => handleAddBlock('faq', '', 'Zwijane FAQ')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-fuchsia-500 group text-left w-full"
      >
        <div className="w-full bg-neutral-900 border border-neutral-700 rounded mb-3 p-2 flex justify-between items-center group-hover:border-fuchsia-500 transition-colors">
           <div className="w-1/2 h-2 bg-neutral-500 rounded-sm"></div>
           <div className="text-xs text-neutral-500">▼</div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Zwijane FAQ (Akordeon)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Rozwijana odpowiedź ukryta pod klikalnym pytaniem.</span>
      </button>

    </div>
  );
}