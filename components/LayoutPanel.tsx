import React, { useState } from 'react';
import BasicLayoutsPanel from './layout-panels/BasicLayoutsPanel';
import PremiumCardsPanel from './layout-panels/PremiumCardsPanel';

interface LayoutPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function LayoutPanel({ handleAddBlock }: LayoutPanelProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'premium'>('basic');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: PODSTAWOWE KONTENERY */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'basic' ? '' as any : 'basic')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'basic' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Podstawowe Kontenery</span>
          <span className="text-lg leading-none">{activeTab === 'basic' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'basic' && <BasicLayoutsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: KARTY PREMIUM */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'premium' ? '' as any : 'premium')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'premium' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Karty Premium (Style)</span>
          <span className="text-lg leading-none">{activeTab === 'premium' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'premium' && <PremiumCardsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}