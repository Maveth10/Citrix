import React, { useState } from 'react';
import StreamingPanel from './video-panels/StreamingPanel';
import DirectVideoPanel from './video-panels/DirectVideoPanel';

interface VideoPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'streaming' | 'direct' | null;

export default function VideoPanel({ handleAddBlock }: VideoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('streaming');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: STREAMING */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('streaming')} className={getTabStyle('streaming')}>
          <span>Serwisy Streamingowe</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'streaming' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'streaming' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <StreamingPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: PLIKI I TŁA */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('direct')} className={getTabStyle('direct')}>
          <span>Pliki Wideo i Tła</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'direct' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'direct' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <DirectVideoPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}