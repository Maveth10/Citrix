import React, { useState } from 'react';
import MapsPanel from './embed-panels/MapsPanel';
import CustomCodePanel from './embed-panels/CustomCodePanel';

interface EmbedPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function EmbedPanel({ handleAddBlock }: EmbedPanelProps) {
  const [activeTab, setActiveTab] = useState<'maps' | 'custom'>('maps');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: MAPY */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'maps' ? '' as any : 'maps')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'maps' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Mapy i Lokalizacje</span>
          <span className="text-lg leading-none">{activeTab === 'maps' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'maps' && <MapsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: CUSTOM CODE */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'custom' ? '' as any : 'custom')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'custom' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Kod Zewnętrzny (Iframes)</span>
          <span className="text-lg leading-none">{activeTab === 'custom' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'custom' && <CustomCodePanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}