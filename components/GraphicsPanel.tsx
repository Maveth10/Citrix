import React, { useState } from 'react';
import DataVisPanel from './graphics-panels/DataVisPanel';
import DynamicElementsPanel from './graphics-panels/DynamicElementsPanel';
import ShapesPanel from './graphics-panels/ShapesPanel';

interface GraphicsPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function GraphicsPanel({ handleAddBlock }: GraphicsPanelProps) {
  const [activeTab, setActiveTab] = useState<'data' | 'dynamic' | 'shapes'>('data');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'data' ? '' as any : 'data')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'data' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Wizualizacja Danych</span>
          <span className="text-lg leading-none">{activeTab === 'data' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'data' && <DataVisPanel handleAddBlock={handleAddBlock} />}
      </div>

      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'dynamic' ? '' as any : 'dynamic')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'dynamic' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Elementy Dynamiczne</span>
          <span className="text-lg leading-none">{activeTab === 'dynamic' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'dynamic' && <DynamicElementsPanel handleAddBlock={handleAddBlock} />}
      </div>

      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'shapes' ? '' as any : 'shapes')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'shapes' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Kształty i Wektory</span>
          <span className="text-lg leading-none">{activeTab === 'shapes' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'shapes' && <ShapesPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}