import React from 'react';
import LayoutTab from './right-panels/LayoutTab';

interface RightPanelProps {
  activeBlock: any;
  rightTab: string;
  setRightTab: (tab: string) => void;
  updateActiveBlock: (updates: any) => void;
  removeActiveBlock: () => void;
  setIsMediaManagerOpen: (val: boolean) => void;
}

export default function RightPanel({ activeBlock, rightTab, setRightTab, updateActiveBlock, removeActiveBlock, setIsMediaManagerOpen }: RightPanelProps) {
  
  // Jeśli żaden klocek nie jest zaznaczony, pokazujemy ekran powitalny
  if (!activeBlock) return (
    <aside className="w-80 bg-[#09090b] border-l border-white/5 h-full flex flex-col items-center justify-center text-neutral-500 shadow-2xl z-40">
      <span className="text-4xl mb-3 opacity-20">🎯</span>
      <p className="text-[11px] tracking-widest uppercase font-bold text-neutral-600">Zaznacz obiekt na płótnie</p>
    </aside>
  );

  return (
    <aside className="w-80 bg-[#09090b] border-l border-white/5 h-full flex flex-col shadow-2xl z-40 animate-in slide-in-from-right-4">
      
      {/* HEADER PRAWNEGO PANELU */}
      <div className="p-4 border-b border-white/5 bg-[#0c0c0e]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600/20 text-blue-400 text-[9px] px-2 py-1 rounded uppercase font-bold tracking-widest border border-blue-500/20">
              {activeBlock.type}
            </span>
            <span className="text-[13px] font-bold text-neutral-200 truncate max-w-[140px]">
              {activeBlock.name}
            </span>
          </div>
          <button 
            onClick={removeActiveBlock} 
            className="text-neutral-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition" 
            title="Usuń obiekt (Backspace/Del)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          </button>
        </div>

        {/* ZAKŁADKI (TABS) */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
          <button onClick={() => setRightTab('layout')} className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-md transition ${rightTab === 'layout' ? 'bg-[#25252b] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>Układ</button>
          <button onClick={() => setRightTab('design')} className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-md transition ${rightTab === 'design' ? 'bg-[#25252b] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>Wygląd</button>
          <button onClick={() => setRightTab('text')} className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-md transition ${rightTab === 'text' ? 'bg-[#25252b] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>Tekst</button>
          <button onClick={() => setRightTab('effects')} className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-md transition ${rightTab === 'effects' ? 'bg-[#25252b] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>Efekty</button>
        </div>
      </div>

      {/* ZAWARTOŚĆ ZAKŁADKI */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
         {rightTab === 'layout' && <LayoutTab activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}
         
         {rightTab === 'design' && (
           <div className="p-6 text-center text-neutral-500 flex flex-col items-center gap-3">
             <span className="text-3xl">🎨</span>
             <p className="text-xs">Zaraz tu wejdziemy z buta. Zakładka Wygląd czeka na wdrożenie.</p>
           </div>
         )}
         
         {rightTab === 'text' && (
           <div className="p-6 text-center text-neutral-500 flex flex-col items-center gap-3">
             <span className="text-3xl">🔤</span>
             <p className="text-xs">Typografia się grzeje. Niedługo podepniemy tu Google Fonts.</p>
           </div>
         )}

         {rightTab === 'effects' && (
           <div className="p-6 text-center text-neutral-500 flex flex-col items-center gap-3">
             <span className="text-3xl">✨</span>
             <p className="text-xs">Cienie, Blur, Opacity i animacje najazdu (Hover).</p>
           </div>
         )}
      </div>

    </aside>
  );
}