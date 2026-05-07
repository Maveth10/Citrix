import React, { useState } from 'react';
import HeadingsPanel from './text-panels/HeadingsPanel';
import ParagraphsPanel from './text-panels/ParagraphsPanel';
import InsertsPanel from './text-panels/InsertsPanel';

interface TextPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  const [activeTab, setActiveTab] = useState<'headings' | 'paragraphs' | 'inserts'>('headings');

  const getTabBtnStyle = (tabName: string) => {
    const isActive = activeTab === tabName;
    return `flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest border relative overflow-hidden z-10 ${
      isActive 
        ? 'bg-[color:var(--theme-color)]/10 text-[color:var(--theme-color)] border-[color:var(--theme-color)]/40 rounded-b-none shadow-[inset_0_0_15px_var(--theme-shadow)]' 
        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border-white/5 hover:border-white/20'
    }`;
  };

  return (
    <div className="flex flex-col gap-3 pb-10 relative z-10">
      
      {/* KATEGORIA 1: NAGŁÓWKI */}
      <div className="flex flex-col drop-shadow-lg">
        <button 
          onClick={() => setActiveTab(activeTab === 'headings' ? '' as any : 'headings')}
          className={getTabBtnStyle('headings')}
        >
          <span>Tytuły Główne (H1 & H2)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'headings' ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        </button>
        {activeTab === 'headings' && <HeadingsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: AKAPITY */}
      <div className="flex flex-col drop-shadow-lg">
        <button 
          onClick={() => setActiveTab(activeTab === 'paragraphs' ? '' as any : 'paragraphs')}
          className={getTabBtnStyle('paragraphs')}
        >
          <span>Akapity i Treść (P)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'paragraphs' ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        </button>
        {activeTab === 'paragraphs' && <ParagraphsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 3: WSTAWKI */}
      <div className="flex flex-col drop-shadow-lg">
        <button 
          onClick={() => setActiveTab(activeTab === 'inserts' ? '' as any : 'inserts')}
          className={getTabBtnStyle('inserts')}
        >
          <span>Złożone Wstawki (Alerty)</span>
          <span className="text-lg leading-none transition-transform duration-300" style={{ transform: activeTab === 'inserts' ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        </button>
        {activeTab === 'inserts' && <InsertsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}