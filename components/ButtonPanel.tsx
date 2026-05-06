import React, { useState } from 'react';
import PrimaryButtonsPanel from './button-panels/PrimaryButtonsPanel';
import SecondaryButtonsPanel from './button-panels/SecondaryButtonsPanel';

interface ButtonPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ButtonPanel({ handleAddBlock }: ButtonPanelProps) {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GŁÓWNE AKCJE */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'primary' ? '' as any : 'primary')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'primary' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Główne Akcje (CTA)</span>
          <span className="text-lg leading-none">{activeTab === 'primary' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'primary' && <PrimaryButtonsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: POBOCZNE & SSO */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'secondary' ? '' as any : 'secondary')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'secondary' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Poboczne & Logowanie</span>
          <span className="text-lg leading-none">{activeTab === 'secondary' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'secondary' && <SecondaryButtonsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}