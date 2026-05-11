import React from 'react';

interface PanelProps {
  handleAddBlock: (type: string, variant: string, label: string) => void;
}

export default function InsertsPanel({ handleAddBlock }: PanelProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/5 border-x border-b border-[color:var(--theme-color)]/20 rounded-b-xl border-t-0 animate-in slide-in-from-top-2 duration-300">
      
      {/* 1. Odznaki i Klawisze (Mikro-UI) */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button onClick={() => handleAddBlock('p', 'badge', 'Odznaka')} className="flex flex-col items-center justify-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group">
          <span className="px-3 py-1 bg-[color:var(--theme-color)]/20 text-[color:var(--theme-color)] rounded-full text-[10px] font-bold uppercase mb-2">v2.0 Beta</span>
          <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Odznaka / Tag</span>
        </button>
        <button onClick={() => handleAddBlock('p', 'kbd', 'Klawisz')} className="flex flex-col items-center justify-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group">
          <span className="px-2 py-1 bg-white text-black rounded border border-b-[3px] border-neutral-300 text-[10px] font-mono font-bold mb-2">CTRL</span>
          <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Klawisz 3D</span>
        </button>
      </div>

      {/* 2. Pro Checklist */}
      <button onClick={() => handleAddBlock('list', 'pro-checklist', 'Pro Checklist')} className="w-full flex items-center p-3 bg-[#0a0a0c] border border-white/5 rounded-lg hover:border-[color:var(--theme-color)]/50 hover:bg-white/5 transition-all group mb-3">
        <div className="w-10 h-10 bg-[color:var(--theme-color)]/10 rounded-full flex items-center justify-center mr-3 text-[color:var(--theme-color)]">✓</div>
        <div className="flex flex-col text-left">
           <span className="text-[11px] font-bold text-white tracking-widest uppercase">Pro Checklist</span>
           <span className="text-[9px] text-neutral-500">Lista z customowymi ikonami SVG</span>
        </div>
      </button>

      <div className="w-full h-px bg-white/10 my-1"></div>
      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest ml-1 mt-1 block">Złożone Alerty:</span>

      {/* 3. Alerty (Zwrócone wszystkie 5) */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <button onClick={() => handleAddBlock('container', 'alert-success', 'Alert Sukces')} className="p-2 bg-green-500/10 border border-green-500/30 text-green-500 rounded text-[10px] font-bold hover:bg-green-500/20">Sukces</button>
        <button onClick={() => handleAddBlock('container', 'alert-warning', 'Alert Uwaga')} className="p-2 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded text-[10px] font-bold hover:bg-orange-500/20">Ostrzeżenie</button>
        <button onClick={() => handleAddBlock('container', 'alert-tip', 'Alert Wskazówka')} className="p-2 bg-blue-500/10 border border-blue-500/30 text-blue-500 rounded text-[10px] font-bold hover:bg-blue-500/20">Wskazówka</button>
        <button onClick={() => handleAddBlock('container', 'notice-box', 'Alert Ważne')} className="p-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded text-[10px] font-bold hover:bg-red-500/20">Ważne</button>
        <button onClick={() => handleAddBlock('container', 'alert-cosmos', 'Alert Kosmos')} className="p-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded text-[10px] font-bold hover:bg-purple-500/20 col-span-2 text-center">✨ Kosmiczny Alert</button>
      </div>

    </div>
  );
}