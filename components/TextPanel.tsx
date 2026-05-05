import React, { useState } from 'react';
import HeadingsPanel from './text-panels/HeadingsPanel';
import ParagraphsPanel from './text-panels/ParagraphsPanel';
import InsertsPanel from './text-panels/InsertsPanel';

interface TextPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function TextPanel({ handleAddBlock }: TextPanelProps) {
  // Stan przechowujący informację, która sekcja akordeonu jest otwarta
  const [activeTab, setActiveTab] = useState<'headings' | 'paragraphs' | 'inserts'>('headings');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: NAGŁÓWKI */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'headings' ? '' as any : 'headings')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'headings' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Tytuły Główne (H1 & H2)</span>
          <span className="text-lg leading-none">{activeTab === 'headings' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'headings' && <HeadingsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: AKAPITY */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'paragraphs' ? '' as any : 'paragraphs')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'paragraphs' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Akapity i Treść (P)</span>
          <span className="text-lg leading-none">{activeTab === 'paragraphs' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'paragraphs' && <ParagraphsPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 3: WSTAWKI */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'inserts' ? '' as any : 'inserts')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'inserts' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Złożone Wstawki (Alerty)</span>
          <span className="text-lg leading-none">{activeTab === 'inserts' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'inserts' && <InsertsPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}