import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function ParagraphsPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/5 border-x border-b border-[color:var(--theme-color)]/20 rounded-b-xl border-t-0 animate-in slide-in-from-top-2 duration-300">
      
      {/* 1. Zwykły Akapit i Lead */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button onClick={() => handleAddBlock('p', 'classic', 'Zwykły Akapit')} className="p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all text-left">
          <span className="text-[10px] text-neutral-400 font-bold block mb-1">Standard</span>
          <span className="text-xs text-white">Zwykły tekst...</span>
        </button>
        <button onClick={() => handleAddBlock('p', 'lead', 'Lead')} className="p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all text-left">
          <span className="text-[10px] text-neutral-400 font-bold block mb-1">Lead</span>
          <span className="text-[13px] text-white font-medium">Większy wstęp...</span>
        </button>
      </div>

      {/* 2. Drop Cap (Inicjał) */}
      <button onClick={() => handleAddBlock('p', 'drop-cap', 'Drop Cap')} className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group">
        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center mr-3 font-serif font-black text-2xl text-[color:var(--theme-color)]">L</div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Inicjał (Drop Cap)</span>
           <span className="text-[9px] text-neutral-500">Wielka pierwsza litera jak w gazecie</span>
        </div>
      </button>

      {/* 3. Kolumny Gazetowe */}
      <button onClick={() => handleAddBlock('p', 'columns', 'Kolumny')} className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group">
        <div className="w-10 h-10 bg-white/5 rounded flex gap-1 items-center justify-center mr-3 p-2">
           <div className="w-full h-full bg-neutral-600 rounded-sm"></div>
           <div className="w-full h-full bg-neutral-600 rounded-sm"></div>
        </div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Kolumny CSS</span>
           <span className="text-[9px] text-neutral-500">Automatyczny podział tekstu na 2 łamy</span>
        </div>
      </button>

      {/* 4. Pro Cytat */}
      <button onClick={() => handleAddBlock('p', 'pro-quote', 'Cytat')} className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group">
        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center mr-3 font-serif italic font-black text-xl text-neutral-400 border-l-2 border-[color:var(--theme-color)]">"</div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Pro Cytat</span>
           <span className="text-[9px] text-neutral-500">Z autorem i lewą linią akcentującą</span>
        </div>
      </button>

    </div>
  );
}