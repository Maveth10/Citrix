import React from 'react';

const UICard = ({ title, desc, icon, onClick }: { title: string, desc: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="p-3 bg-[#1c1c21] hover:bg-[#25252b] border border-white/5 hover:border-fuchsia-500/40 rounded-xl text-left transition-all w-full flex items-center gap-4 group shadow-sm"
  >
    <div className="w-10 h-10 rounded-lg bg-[#25252b] group-hover:bg-fuchsia-500/20 group-hover:scale-105 flex items-center justify-center text-xl shrink-0 transition-all border border-white/5">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-xs font-bold text-neutral-200 block mb-0.5">{title}</span>
      <span className="text-[9px] text-neutral-500 block leading-tight">{desc}</span>
    </div>
  </button>
);

export default function NotificationsPanel({ handleAddBlock }: { handleAddBlock: any }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-black/20 rounded-b-xl border border-t-0 border-white/5">
       <UICard 
         icon="🍪" 
         title="Cookie Banner" 
         desc="Pływający, ciemny pasek na dole ekranu z prośbą o akceptację ciasteczek." 
         onClick={() => handleAddBlock('popup', 'cookie-banner', 'Cookie Banner')} 
       />
       <UICard 
         icon="🔔" 
         title="Toast Sukcesu" 
         desc="Małe, dyskretne powiadomienie pojawiające się w prawym górnym rogu." 
         onClick={() => handleAddBlock('popup', 'toast-alert', 'Powiadomienie')} 
       />
    </div>
  );
}