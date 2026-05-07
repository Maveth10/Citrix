import React from 'react';
import LayoutTab from './right-panels/LayoutTab';
import DesignTab from './right-panels/DesignTab';
import TextTab from './right-panels/TextTab';
import EffectsTab from './right-panels/EffectsTab'; // <-- NOWY IMPORT

interface RightPanelProps {
  activeBlock: any;
  rightTab: string;
  setRightTab: (tab: string) => void;
  updateActiveBlock: (updates: any) => void;
  removeActiveBlock: () => void;
  setIsMediaManagerOpen: (val: boolean) => void;
}

export default function RightPanel({ activeBlock, rightTab, setRightTab, updateActiveBlock, removeActiveBlock, setIsMediaManagerOpen }: RightPanelProps) {
  
  if (!activeBlock) return (
    <aside className="w-80 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] border-l border-white/5 h-full flex flex-col items-center justify-center text-neutral-500 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-40 relative">
      <div className="w-16 h-16 mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
        <span className="text-2xl opacity-40">🎯</span>
      </div>
      <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400">Pusty przelot</p>
      <p className="text-xs text-neutral-600 mt-2">Zaznacz obiekt na płótnie</p>
    </aside>
  );

  return (
    <aside className="w-80 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] border-l border-white/5 h-full flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-40 relative animate-in slide-in-from-right-4">
      
      {/* HEADER PRAWNEGO PANELU */}
      <div className="p-5 border-b border-white/5 bg-transparent relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/5 text-white text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-inner uppercase font-bold tracking-widest flex items-center justify-center">
              {activeBlock.type}
            </span>
            <span className="text-[13px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-400 truncate max-w-[140px]">
              {activeBlock.name}
            </span>
          </div>
          <button 
            onClick={removeActiveBlock} 
            className="text-neutral-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] p-1.5 rounded-lg border border-transparent transition-all" 
            title="Usuń obiekt (Backspace/Del)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          </button>
        </div>

        {/* ZAKŁADKI (TABS) */}
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner">
          <button onClick={() => setRightTab('layout')} className={`flex-1 text-[9px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all duration-300 ${rightTab === 'layout' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>Układ</button>
          <button onClick={() => setRightTab('design')} className={`flex-1 text-[9px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all duration-300 ${rightTab === 'design' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>Wygląd</button>
          <button onClick={() => setRightTab('text')} className={`flex-1 text-[9px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all duration-300 ${rightTab === 'text' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>Tekst</button>
          <button onClick={() => setRightTab('effects')} className={`flex-1 text-[9px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all duration-300 ${rightTab === 'effects' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>Efekty</button>
        </div>
      </div>

      {/* ZAWARTOŚĆ ZAKŁADKI */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 relative z-10">
         {rightTab === 'layout' && <LayoutTab activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}
         {rightTab === 'design' && <DesignTab activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}
         {rightTab === 'text' && <TextTab activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}
         
         {/* KLUCZOWE: Ładujemy nasz nowy EffectsTab! */}
         {rightTab === 'effects' && <EffectsTab activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}
      </div>

    </aside>
  );
}