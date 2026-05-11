import React, { useState } from 'react';
import BasicFieldsPanel from './form-panels/BasicFieldsPanel';
import ReadyFormsPanel from './form-panels/ReadyFormsPanel';

interface FormPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

type TabType = 'ready' | 'basic' | null;

export default function FormPanel({ handleAddBlock }: FormPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ready');

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const getTabStyle = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
      isActive 
        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-b-none' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GOTOWE FORMULARZE */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('ready')} className={getTabStyle('ready')}>
          <span>Gotowe Zestawy (Lead Gen)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'ready' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'ready' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <ReadyFormsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

      {/* KATEGORIA 2: POJEDYNCZE POLA */}
      <div className="flex flex-col drop-shadow-lg">
        <button onClick={() => toggleTab('basic')} className={getTabStyle('basic')}>
          <span>Pojedyncze Pola Input</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'basic' ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▾</span>
        </button>
        {activeTab === 'basic' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <BasicFieldsPanel handleAddBlock={handleAddBlock} />
          </div>
        )}
      </div>

    </div>
  );
}