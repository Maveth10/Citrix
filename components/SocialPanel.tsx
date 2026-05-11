import React, { useState } from 'react';
import IconsPanel from './social-panels/IconsPanel';
import CardsPanel from './social-panels/CardsPanel';
import TrustPanel from './social-panels/TrustPanel';

interface SocialPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'icons' | 'cards' | 'trust' | null;

export default function SocialPanel({ handleAddBlock }: SocialPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('cards');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: OPINIE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('cards')} className={getTabStyle('cards')}>
          <span>Karty Opinii (Reviews)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'cards' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'cards' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <CardsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: TRUST BADGES */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('trust')} className={getTabStyle('trust')}>
          <span>Paski Zaufania (Trust)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'trust' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'trust' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <TrustPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 3: IKONY */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('icons')} className={getTabStyle('icons')}>
          <span>Ikony i Udostępnianie</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'icons' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'icons' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <IconsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}