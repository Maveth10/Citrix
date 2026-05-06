import React, { useState } from 'react';
import SingleMediaPanel from './image-panels/SingleMediaPanel';
import GalleriesPanel from './image-panels/GalleriesPanel';

interface ImagePanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ImagePanel({ handleAddBlock }: ImagePanelProps) {
  // Stan przechowujący informację, która sekcja akordeonu jest otwarta
  const [activeTab, setActiveTab] = useState<'single' | 'galleries'>('single');

  return (
    <div className="flex flex-col gap-3 pb-10">
      
      {/* KATEGORIA 1: POJEDYNCZE MEDIA */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'single' ? '' as any : 'single')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'single' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Pojedyncze Media</span>
          <span className="text-lg leading-none">{activeTab === 'single' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'single' && <SingleMediaPanel handleAddBlock={handleAddBlock} />}
      </div>

      {/* KATEGORIA 2: KOLEKCJE I GALERIE */}
      <div className="flex flex-col">
        <button 
          onClick={() => setActiveTab(activeTab === 'galleries' ? '' as any : 'galleries')}
          className={`flex items-center justify-between p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === 'galleries' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-b-none' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          <span>Kolekcje i Galerie</span>
          <span className="text-lg leading-none">{activeTab === 'galleries' ? '▾' : '▸'}</span>
        </button>
        {activeTab === 'galleries' && <GalleriesPanel handleAddBlock={handleAddBlock} />}
      </div>

    </div>
  );
}