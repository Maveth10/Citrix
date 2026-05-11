import React, { useState } from 'react';
import BasicLayoutsPanel from './layout-panels/BasicLayoutsPanel';
import PremiumCardsPanel from './layout-panels/PremiumCardsPanel';
import GridsPanel from './layout-panels/GridsPanel';
import SectionsPanel from './layout-panels/SectionsPanel';

interface LayoutPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

// Czysty TypeScript, koniec z "as any"
type TabType = 'basic' | 'premium' | 'grids' | 'sections' | null;

export default function LayoutPanel({ handleAddBlock }: LayoutPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: PODSTAWOWE KONTENERY */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('basic')} className={getTabStyle('basic')}>
          <span>Podstawowe Kontenery</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'basic' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'basic' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <BasicLayoutsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: KARTY PREMIUM */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('premium')} className={getTabStyle('premium')}>
          <span>Karty Premium (Style)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'premium' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'premium' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <PremiumCardsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* 🔥 KATEGORIA 3: BENTO & SIATKI 🔥 */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('grids')} className={getTabStyle('grids')}>
          <span>Bento & Siatki (Grids) 🍱</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'grids' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'grids' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <GridsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* 🔥 KATEGORIA 4: GOTOWE SEKCJE 🔥 */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('sections')} className={getTabStyle('sections')}>
          <span>Gotowe Sekcje 🌍</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'sections' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'sections' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <SectionsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}