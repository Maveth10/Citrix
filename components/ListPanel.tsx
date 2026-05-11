import React, { useState } from 'react';
import BasicListsPanel from './list-panels/BasicListsPanel';
import PremiumListsPanel from './list-panels/PremiumListsPanel';

interface ListPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'premium' | 'basic' | null;

export default function ListPanel({ handleAddBlock }: ListPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('premium');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-lime-500/10 text-lime-400 border border-lime-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: PREMIUM */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('premium')} className={getTabStyle('premium')}>
          <span>Listy Pro i FAQ</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'premium' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'premium' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <PremiumListsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: BASIC */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('basic')} className={getTabStyle('basic')}>
          <span>Klasyczne (UL/OL)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'basic' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'basic' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <BasicListsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}