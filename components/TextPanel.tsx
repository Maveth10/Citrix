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
    return `flex items-center justify-between p-4 transition-all duration-500 font-medium text-[10px] uppercase tracking-[0.2em] border-b relative overflow-hidden z-10 ${
      isActive 
        ? 'bg-gradient-to-r from-/10 to-transparent text-white border-/30' 
        : 'bg-transparent text-neutral-500 hover:text-neutral-300 border-white/5 hover:bg-white/'
    }`;
  };

  return (
    <div className="flex flex-col pb-10 relative z-10">
      
      {/* KATEGORIA 1 */}
      <div className="flex flex-col">
        <button onClick={() => setActiveTab(activeTab === 'headings' ? '' as any : 'headings')} className={getTabBtnStyle('headings')}>
          <span>Tytuły Główne</span>
          <span className="text-sm font-light transition-transform duration-300" style={{ transform: activeTab === 'headings' ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        </button>
        <div className={`transition-all duration-500 overflow-hidden ${activeTab === 'headings' ? 'max-h- opacity-100' : 'max-h-0 opacity-0'}`}>
          <HeadingsPanel handleAddBlock={handleAddBlock} />
        </div>
      </div>

      {/* KATEGORIA 2 */}
      <div className="flex flex-col">
        <button onClick={() => setActiveTab(activeTab === 'paragraphs' ? '' as any : 'paragraphs')} className={getTabBtnStyle('paragraphs')}>
          <span>Akapity i Treść</span>
          <span className="text-sm font-light transition-transform duration-300" style={{ transform: activeTab === 'paragraphs' ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        </button>
        <div className={`transition-all duration-500 overflow-hidden ${activeTab === 'paragraphs' ? 'max-h- opacity-100' : 'max-h-0 opacity-0'}`}>
          <ParagraphsPanel handleAddBlock={handleAddBlock} />
        </div>
      </div>

      {/* KATEGORIA 3 */}
      <div className="flex flex-col">
        <button onClick={() => setActiveTab(activeTab === 'inserts' ? '' as any : 'inserts')} className={getTabBtnStyle('inserts')}>
          <span>Wstawki (Alerty)</span>
          <span className="text-sm font-light transition-transform duration-300" style={{ transform: activeTab === 'inserts' ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        </button>
        <div className={`transition-all duration-500 overflow-hidden ${activeTab === 'inserts' ? 'max-h- opacity-100' : 'max-h-0 opacity-0'}`}>
          <InsertsPanel handleAddBlock={handleAddBlock} />
        </div>
      </div>

    </div>
  );
}