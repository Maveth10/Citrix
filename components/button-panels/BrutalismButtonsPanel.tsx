import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function BrutalismButtonsPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/5 border-x border-b border-[color:var(--theme-color)]/20 rounded-b-xl border-t-0">
      
      {/* 1. Neo-Brutalizm */}
      <button 
        onClick={() => handleAddBlock('button', 'btn-brutal', 'Przycisk Brutalizm')}
        className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:bg-white/5 transition-all group"
      >
        <div className="w-10 h-10 bg-[#ff4500] border-2 border-white flex items-center justify-center mr-3 shadow-[3px_3px_0px_white] group-active:translate-x-[3px] group-active:translate-y-[3px] group-active:shadow-none transition-all">
          <span className="font-black text-white">B</span>
        </div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Neo-Brutalizm</span>
           <span className="text-[9px] text-neutral-500">Twardy cień, ostre krawędzie (Gumroad style)</span>
        </div>
      </button>

      {/* 2. Przycisk 3D (Pressable) */}
      <button 
        onClick={() => handleAddBlock('button', 'btn-3d', 'Przycisk 3D')}
        className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-violet-500/50 hover:bg-white/5 transition-all group"
      >
        <div className="w-10 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 border-b-[4px] border-blue-700 group-active:border-b-0 group-active:translate-y-[4px] transition-all">
          <span className="font-bold text-white text-xs">3D</span>
        </div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Fizyczny (3D)</span>
           <span className="text-[9px] text-neutral-500">Przycisk, który naprawdę się "wciska"</span>
        </div>
      </button>

    </div>
  );
}