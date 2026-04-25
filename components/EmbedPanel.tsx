import React from 'react';

interface EmbedPanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function EmbedPanel({ handleAddBlock }: EmbedPanelProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      
      <div className="mt-2 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Zewnętrzne Skrypty
        </span>
      </div>

      <button
        onClick={() => handleAddBlock('embed', 'html', 'Kod HTML')}
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-orange-500 group text-left w-full"
      >
        <div className="w-full h-16 bg-[#111] border border-neutral-700 rounded mb-3 flex items-center justify-center group-hover:border-orange-500 transition-colors shadow-inner font-mono text-orange-500 text-2xl tracking-widest">
          &lt;/&gt;
        </div>
        <span className="text-sm font-bold text-white block mb-1">Własny Kod HTML/JS</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Wklej skrypty analityczne, widżety zewnętrzne, style CSS lub całkowicie własne tagi HTML.</span>
      </button>

      <div className="mt-4 px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
          Integracje Stron
        </span>
      </div>

      <button
        onClick={() => handleAddBlock('embed', 'site', 'iFrame Strony')}
        className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-lg transition border border-neutral-700 hover:border-blue-500 group text-left w-full"
      >
        <div className="w-full h-20 bg-neutral-900 border border-neutral-700 rounded mb-3 flex flex-col group-hover:border-blue-500 transition-colors shadow-inner overflow-hidden">
           <div className="h-4 bg-neutral-800 flex items-center px-2 gap-1 border-b border-neutral-700">
             <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
           </div>
           <div className="flex-1 flex items-center justify-center text-[10px] text-neutral-500 font-mono">
             https://...
           </div>
        </div>
        <span className="text-sm font-bold text-white block mb-1">Ramka iFrame</span>
        <span className="text-[10px] text-neutral-400 block leading-tight">Osadź całą, w pełni działającą obcą stronę internetową wewnątrz swojej aplikacji.</span>
      </button>

    </div>
  );
}