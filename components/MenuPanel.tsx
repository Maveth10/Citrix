import React, { useState } from 'react';
import NavbarsPanel from './menu-panels/NavbarsPanel';
import FootersPanel from './menu-panels/FootersPanel';

interface MenuPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'navbars' | 'footers' | null;

export default function MenuPanel({ handleAddBlock }: MenuPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('navbars');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: NAVBAR */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('navbars')} className={getTabStyle('navbars')}>
          <span>Nawigacja Górna (Navbar)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'navbars' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'navbars' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <NavbarsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: FOOTERY */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('footers')} className={getTabStyle('footers')}>
          <span>Stopki (Footer)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'footers' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'footers' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <FootersPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}