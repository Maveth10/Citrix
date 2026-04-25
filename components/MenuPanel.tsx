import React from 'react';

interface MenuPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function MenuPanel({ handleAddBlock }: MenuPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Nawigacja Strony
        </span>
      </div>

      {/* MENU POZIOME */}
      <button 
        onClick={() => handleAddBlock('menu', 'horizontal', 'Menu Poziome')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full"
      >
        <div className="w-full h-8 bg-neutral-900 border border-neutral-700 rounded mb-3 flex items-center justify-center gap-3 px-2 group-hover:border-blue-500 transition-colors shadow-inner">
          <div className="w-6 h-1.5 bg-neutral-500 rounded-sm"></div>
          <div className="w-6 h-1.5 bg-neutral-500 rounded-sm"></div>
          <div className="w-6 h-1.5 bg-neutral-500 rounded-sm"></div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Poziome (Navbar)</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Klasyczny pasek nawigacji, idealny na górę ekranu komputera.</span>
      </button>

      {/* MENU PIONOWE */}
      <button 
        onClick={() => handleAddBlock('menu', 'vertical', 'Menu Pionowe')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full flex gap-4 items-center"
      >
        <div className="w-12 h-20 bg-neutral-900 border border-neutral-700 rounded flex flex-col items-center justify-center gap-2 py-2 group-hover:border-blue-500 transition-colors shrink-0 shadow-inner">
          <div className="w-6 h-1.5 bg-neutral-500 rounded-sm"></div>
          <div className="w-6 h-1.5 bg-neutral-500 rounded-sm"></div>
          <div className="w-6 h-1.5 bg-neutral-500 rounded-sm"></div>
        </div>
        <div>
          <span className="text-sm font-bold text-white block mb-1">Pionowe (Sidebar)</span>
          <span className="text-[10px] text-neutral-400 block leading-tight">Menu boczne, stosowane najczęściej w panelach administracyjnych.</span>
        </div>
      </button>

      {/* MENU HAMBURGER */}
      <button 
        onClick={() => handleAddBlock('menu', 'hamburger', 'Menu Hamburger')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 rounded flex items-center justify-center text-2xl text-neutral-400 group-hover:text-blue-400 group-hover:border-blue-500 transition-colors shadow-inner shrink-0">
          ☰
        </div>
        <div>
          <span className="text-sm font-bold text-white block mb-1">Hamburger Menu</span>
          <span className="text-[10px] text-neutral-400 block leading-tight">Skondensowana ikona nawigacyjna, niezbędna na urządzeniach mobilnych.</span>
        </div>
      </button>

    </div>
  );
}