import React, { useState } from 'react';
import BasicListsPanel from './list-panels/BasicListsPanel';
import PremiumListsPanel from './list-panels/PremiumListsPanel';

interface ListPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ListPanel({ handleAddBlock }: ListPanelProps) {
  const [activeTab, setActiveTab] = useState<'premium' | 'basic'>('premium');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: PREMIUM */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'premium' ? '' as any : 'premium')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'premium' ? 'bg-lime-500/10 text-lime-400 border border-lime-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Listy Pro i FAQ</span>
          <span className="text-lg leading-none">{activeTab === 'premium' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'premium' && <PremiumListsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: BASIC */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'basic' ? '' as any : 'basic')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'basic' ? 'bg-lime-500/10 text-lime-400 border border-lime-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Klasyczne (UL/OL)</span>
          <span className="text-lg leading-none">{activeTab === 'basic' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'basic' && <BasicListsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}