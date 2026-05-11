import React, { useState } from 'react';
import PrimaryButtonsPanel from './button-panels/PrimaryButtonsPanel';
import SecondaryButtonsPanel from './button-panels/SecondaryButtonsPanel';
import AnimatedButtonsPanel from './button-panels/AnimatedButtonsPanel';
import BrutalismButtonsPanel from './button-panels/BrutalismButtonsPanel';

interface ButtonPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

// 🔥 Rozszerzamy typ o dwie nowe kategorie!
type TabType = 'primary' | 'secondary' | 'animated' | 'brutalism' | null;

export default function ButtonPanel({ handleAddBlock }: ButtonPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('primary');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GŁÓWNE AKCJE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('primary')} className={getTabStyle('primary')}>
          <span>Główne Akcje (CTA)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'primary' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'primary' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <PrimaryButtonsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: POBOCZNE & SSO */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('secondary')} className={getTabStyle('secondary')}>
          <span>Poboczne & Logowanie</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'secondary' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'secondary' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <SecondaryButtonsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* 🔥 KATEGORIA 3: ANIMOWANE & SHINE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('animated')} className={getTabStyle('animated')}>
          <span>Animowane & Shine ✨</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'animated' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'animated' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <AnimatedButtonsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* 🔥 KATEGORIA 4: NEO-BRUTALIZM & 3D */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('brutalism')} className={getTabStyle('brutalism')}>
          <span>Neo-Brutalizm & 3D 🧱</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'brutalism' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'brutalism' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <BrutalismButtonsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}