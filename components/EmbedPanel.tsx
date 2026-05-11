import React, { useState } from 'react';
import MapsPanel from './embed-panels/MapsPanel';
import CustomCodePanel from './embed-panels/CustomCodePanel';
import AudioPanel from './embed-panels/AudioPanel';

interface EmbedPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'maps' | 'audio' | 'custom' | null;

export default function EmbedPanel({ handleAddBlock }: EmbedPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('maps');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-slate-500/10 text-slate-400 border border-slate-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: MAPY */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('maps')} className={getTabStyle('maps')}>
          <span>Mapy i Lokalizacje</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'maps' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'maps' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <MapsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: AUDIO / PODCASTY */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('audio')} className={getTabStyle('audio')}>
          <span>Audio i Podcasty 🎧</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'audio' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'audio' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <AudioPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 3: CUSTOM CODE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('custom')} className={getTabStyle('custom')}>
          <span>Kod Zewnętrzny (Iframes)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'custom' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'custom' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <CustomCodePanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}