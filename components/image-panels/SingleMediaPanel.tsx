import React from 'react';

// Pomocniczy komponent rysujący piękne karty
const UICard = ({ title, desc, icon, onClick }: { title: string, desc: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="p-3 bg-[#1c1c21] hover:bg-[#25252b] border border-white/5 hover:border-emerald-500/40 rounded-xl text-left transition-all w-full flex items-center gap-4 group shadow-sm"
  >
    <div className="w-10 h-10 rounded-lg bg-[#25252b] group-hover:bg-emerald-500/20 group-hover:scale-105 flex items-center justify-center text-xl shrink-0 transition-all border border-white/5">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-xs font-bold text-neutral-200 block mb-0.5">{title}</span>
      <span className="text-[9px] text-neutral-500 block leading-tight">{desc}</span>
    </div>
  </button>
);

export default function SingleMediaPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
       <UICard 
         icon="🖼️" 
         title="Uniwersalny Obraz" 
         desc="Pełna obsługa JPG, PNG, WebP oraz animowanych GIF." 
         onClick={() => handleAddBlock('img', 'classic', 'Obraz')} 
       />
       <UICard 
         icon="✨" 
         title="Zdjęcie Soft (Premium)" 
         desc="Eleganckie zaokrąglenia (24px) i nowoczesny, miękki cień." 
         onClick={() => handleAddBlock('img', 'rounded', 'Obraz Soft')} 
       />
       <UICard 
         icon="👤" 
         title="Avatar (Okrągły)" 
         desc="Proporcja 1:1. Idealny do profili, opinii i cytatów." 
         onClick={() => handleAddBlock('img', 'avatar', 'Avatar')} 
       />
       <UICard 
         icon="📸" 
         title="Retro Polaroid" 
         desc="Stylizowana, biała ramka przypominająca odbitkę." 
         onClick={() => handleAddBlock('img', 'polaroid', 'Polaroid')} 
       />
    </div>
  );
}