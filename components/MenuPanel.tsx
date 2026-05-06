import React, { useState } from 'react';
import NavbarsPanel from './menu-panels/NavbarsPanel';
import FootersPanel from './menu-panels/FootersPanel';

interface MenuPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function MenuPanel({ handleAddBlock }: MenuPanelProps) {
  const [activeTab, setActiveTab] = useState<'navbars' | 'footers'>('navbars');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: NAVBAR */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'navbars' ? '' as any : 'navbars')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'navbars' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Nawigacja Górna (Navbar)</span>
          <span className="text-lg leading-none">{activeTab === 'navbars' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'navbars' && <NavbarsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: FOOTERY */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'footers' ? '' as any : 'footers')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'footers' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Stopki (Footer)</span>
          <span className="text-lg leading-none">{activeTab === 'footers' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'footers' && <FootersPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}