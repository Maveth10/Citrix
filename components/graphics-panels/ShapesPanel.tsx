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

export default function ShapesPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5 animate-in slide-in-from-top-2 duration-300">
       <UICard 
         icon="🟦" 
         title="Podstawowy Kwadrat" 
         desc="Prosta figura geometryczna jako baza." 
         onClick={() => handleAddBlock('shape', 'box', 'Kwadrat')} 
       />
       <UICard 
         icon="🔵" 
         title="Podstawowe Koło" 
         desc="Okrągła figura geometryczna." 
         onClick={() => handleAddBlock('shape', 'circle', 'Koło')} 
       />
       {/* 🔥 NOWE DO SHAPES 🔥 */}
       <UICard 
         icon="➖" 
         title="Elegancki Dzielnik (Line)" 
         desc="Pozioma, gradientowa linia do oddzielania sekcji." 
         onClick={() => handleAddBlock('shape', 'divider', 'Linia')} 
       />
       <UICard 
         icon="✨" 
         title="Rozmyta Aurora" 
         desc="Miękka kula gradientowa do nakładania filtrów i mrocznych teł." 
         onClick={() => handleAddBlock('shape', 'aurora', 'Aurora')} 
       />
       <UICard 
         icon="⠿" 
         title="Siatka Kropek (Pattern)" 
         desc="Delikatny, półprzezroczysty pattern kropkowany w tle." 
         onClick={() => handleAddBlock('shape', 'dots-grid', 'Siatka')} 
       />
    </div>
  );
}