import React, { useState } from 'react';
import BasicFieldsPanel from './form-panels/BasicFieldsPanel';
import ReadyFormsPanel from './form-panels/ReadyFormsPanel';

interface FormPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function FormPanel({ handleAddBlock }: FormPanelProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'ready'>('ready');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: GOTOWE FORMULARZE */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'ready' ? '' as any : 'ready')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'ready' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Gotowe Zestawy (Lead Gen)</span>
          <span className="text-lg leading-none">{activeTab === 'ready' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'ready' && <ReadyFormsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: POJEDYNCZE POLA */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'basic' ? '' as any : 'basic')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'basic' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Pojedyncze Pola Input</span>
          <span className="text-lg leading-none">{activeTab === 'basic' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'basic' && <BasicFieldsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}