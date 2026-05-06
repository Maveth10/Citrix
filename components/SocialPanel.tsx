import React, { useState } from 'react';
import IconsPanel from './social-panels/IconsPanel';
import CardsPanel from './social-panels/CardsPanel';

interface SocialPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function SocialPanel({ handleAddBlock }: SocialPanelProps) {
  const [activeTab, setActiveTab] = useState<'icons' | 'cards'>('icons');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: PASKI IKON */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'icons' ? '' as any : 'icons')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'icons' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Przyciski i Ikony</span>
          <span className="text-lg leading-none">{activeTab === 'icons' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'icons' && <IconsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: KARTY I OPINIE */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'cards' ? '' as any : 'cards')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'cards' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Social Proof (Dowód słuszności)</span>
          <span className="text-lg leading-none">{activeTab === 'cards' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'cards' && <CardsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}