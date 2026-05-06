import React, { useState } from 'react';
import StreamingPanel from './video-panels/StreamingPanel';
import DirectVideoPanel from './video-panels/DirectVideoPanel';

interface VideoPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function VideoPanel({ handleAddBlock }: VideoPanelProps) {
  const [activeTab, setActiveTab] = useState<'streaming' | 'direct'>('streaming');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: STREAMING */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'streaming' ? '' as any : 'streaming')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'streaming' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Serwisy Streamingowe</span>
          <span className="text-lg leading-none">{activeTab === 'streaming' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'streaming' && <StreamingPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: PLIKI I TŁA */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'direct' ? '' as any : 'direct')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'direct' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Pliki Wideo i Tła</span>
          <span className="text-lg leading-none">{activeTab === 'direct' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'direct' && <DirectVideoPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}