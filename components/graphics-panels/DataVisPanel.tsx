import React from 'react';

const UICard = ({ title, desc, icon, onClick }: { title: string, desc: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="p-3 bg-[#1c1c21] hover:bg-[#25252b] border border-white/5 hover:border-amber-500/40 rounded-xl text-left transition-all w-full flex items-center gap-4 group shadow-sm mb-2"
  >
    <div className="w-10 h-10 rounded-lg bg-[#25252b] group-hover:bg-amber-500/20 group-hover:scale-105 flex items-center justify-center text-xl shrink-0 transition-all border border-white/5">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-xs font-bold text-neutral-200 block mb-0.5">{title}</span>
      <span className="text-[9px] text-neutral-500 block leading-tight">{desc}</span>
    </div>
  </button>
);

export default function DataVisPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5 animate-in slide-in-from-top-2 duration-300">
       <UICard 
         icon="⏱️" 
         title="Dynamiczny Licznik" 
         desc="Animowany licznik rosnący od zera do wybranej liczby (CSS)." 
         onClick={() => handleAddBlock('graphic', 'counter', 'Licznik')} 
       />
       <UICard 
         icon="📊" 
         title="Wykres Słupkowy" 
         desc="Animowane, rosnące słupki idealne do wizualizacji skali." 
         onClick={() => handleAddBlock('graphic', 'bar-chart', 'Wykres')} 
       />
       <UICard 
         icon="🍩" 
         title="Wykres Kołowy (Ring)" 
         desc="Wizualizacja procentowa ładująca się po obwodzie." 
         onClick={() => handleAddBlock('graphic', 'circle-chart', 'Wykres Kołowy')} 
       />
       {/* 🔥 NOWE DO DATA VIS 🔥 */}
       <UICard 
         icon="🔋" 
         title="Pasek Postępu (Progress)" 
         desc="Poziomy, rosnący pasek ładowania dla pojedynczej wartości." 
         onClick={() => handleAddBlock('graphic', 'progress-bar', 'Progress')} 
       />
    </div>
  );
}