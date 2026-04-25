import React from 'react';

interface GraphicsPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function GraphicsPanel({ handleAddBlock }: GraphicsPanelProps) {
  return (
    <div className="flex flex-col gap-3 pb-10">
      <div className="mt-2 mb-1 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Kształty Podstawowe</span>
      </div>
      
      <button 
        onClick={() => handleAddBlock('shape', 'box', 'Kwadrat')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center gap-4 transition border border-neutral-700 hover:border-blue-500 group w-full text-left"
      >
        <div className="w-8 h-8 bg-blue-500 group-hover:scale-110 transition-transform shadow-md rounded-sm"></div>
        <span className="text-sm font-bold text-white block">Kwadrat</span>
      </button>

      <button 
        onClick={() => handleAddBlock('shape', 'circle', 'Koło')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center gap-4 transition border border-neutral-700 hover:border-pink-500 group w-full text-left"
      >
        <div className="w-8 h-8 bg-pink-500 rounded-full group-hover:scale-110 transition-transform shadow-md"></div>
        <span className="text-sm font-bold text-white block">Koło</span>
      </button>

      <button 
        onClick={() => handleAddBlock('shape', 'line', 'Linia')} 
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg flex items-center gap-4 transition border border-neutral-700 hover:border-neutral-400 group w-full text-left"
      >
        <div className="w-8 h-1 bg-neutral-300 group-hover:scale-110 transition-transform shadow-sm"></div>
        <span className="text-sm font-bold text-white block">Linia (Separator)</span>
      </button>
    </div>
  );
}