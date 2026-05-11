import React, { useState, useEffect } from 'react';
import LayoutTab from './right-panels/LayoutTab';
import DesignTab from './right-panels/DesignTab';
import TextTab from './right-panels/TextTab';
import EffectsTab from './right-panels/EffectsTab';
import InteractionsTab from './right-panels/InteractionsTab';

export default function RightPanel({ activeBlock, rightTab, setRightTab, updateActiveBlock, removeActiveBlock, setIsMediaManagerOpen, blocks, viewport }: any) {
  const [mode, setMode] = useState<'normal' | 'hover'>('normal');

  useEffect(() => {
    setMode('normal');
  }, [activeBlock?.id]);

  if (!activeBlock) return (
    <aside className="w-80 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] border-l border-white/5 h-full flex flex-col items-center justify-center text-neutral-500 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-40 relative">
      <div className="w-16 h-16 mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
        <span className="text-2xl opacity-40">🎯</span>
      </div>
      <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400">Pusty przelot</p>
      <p className="text-xs text-neutral-600 mt-2">Zaznacz obiekt na płótnie</p>
    </aside>
  );

  const getStyles = () => {
    if (mode === 'hover') return activeBlock.hoverStyles || {};
    if (viewport === 'mobile') return { ...activeBlock.styles, ...(activeBlock.stylesTablet || {}), ...(activeBlock.stylesMobile || {}) };
    if (viewport === 'tablet') return { ...activeBlock.styles, ...(activeBlock.stylesTablet || {}) };
    return activeBlock.styles || {};
  };
  
  const currentStyles = getStyles();

  const handleStyleChange = (prop: string, val: any) => {
    if (mode === 'hover') {
      updateActiveBlock({ hoverStyles: { [prop]: val } });
    } else {
      if (viewport === 'mobile') {
        updateActiveBlock({ stylesMobile: { [prop]: val } });
      } else if (viewport === 'tablet') {
        updateActiveBlock({ stylesTablet: { [prop]: val } });
      } else {
        updateActiveBlock({ styles: { [prop]: val } });
      }
    }
  };

  return (
    // 🔥 PRZYWRÓCONY EFEKT SZKŁA (GLASSMORPHISM) 🔥
    <aside className="w-80 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] border-l border-white/5 flex flex-col h-full shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-50 relative">
      
      {/* HEADER ZAKŁADEK */}
      <div className="flex border-b border-white/5 px-2 pt-2 bg-black/20 overflow-x-auto scrollbar-hide">
        {['layout', 'design', 'text', 'effects', 'interactions'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setRightTab(tab)} 
            className={`px-3 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${rightTab === tab ? 'border-[#ff4500] text-[#ff4500]' : 'border-transparent text-neutral-500 hover:text-white'}`}
          >
            {tab === 'layout' && 'Układ'}
            {tab === 'design' && 'Wygląd'}
            {tab === 'text' && 'Tekst'}
            {tab === 'effects' && 'Efekty'}
            {tab === 'interactions' && 'Akcje'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide custom-scrollbar">
        
        {/* IDENTYFIKATOR ORAZ TRYBY */}
        <div className="flex flex-col gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest px-2 py-1 bg-white/10 rounded-md">ID: {activeBlock.id}</span>
            <div className="flex items-center gap-2">
              {viewport === 'mobile' && <span className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-[9px] font-bold animate-pulse">MOBILE</span>}
              {viewport === 'tablet' && <span className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-[9px] font-bold animate-pulse">TABLET</span>}
              <span className="text-xs text-neutral-400 capitalize">{activeBlock.name}</span>
            </div>
          </div>
          
          <div className="flex bg-black/30 rounded-lg p-1 border border-white/5 shadow-inner">
            <button onClick={() => setMode('normal')} className={`flex-1 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-md transition-colors ${mode === 'normal' ? 'bg-[#ff4500] text-white shadow-md' : 'text-neutral-500 hover:text-white'}`}>Normalny</button>
            <button onClick={() => setMode('hover')} className={`flex-1 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-md transition-colors ${mode === 'hover' ? 'bg-[#ff4500] text-white shadow-md' : 'text-neutral-500 hover:text-white'}`}>Hover 🖱️</button>
          </div>
        </div>

        {/* MODUŁOWE RENDEROWANIE ZAKŁADEK */}
        {rightTab === 'layout' && <LayoutTab currentStyles={currentStyles} handleStyleChange={handleStyleChange} activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}
        {rightTab === 'design' && <DesignTab currentStyles={currentStyles} handleStyleChange={handleStyleChange} setIsMediaManagerOpen={setIsMediaManagerOpen} activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />}        {rightTab === 'text' && <TextTab currentStyles={currentStyles} handleStyleChange={handleStyleChange} />}
        {rightTab === 'effects' && <EffectsTab currentStyles={currentStyles} handleStyleChange={handleStyleChange} activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} mode={mode} />}
        {rightTab === 'interactions' && <InteractionsTab activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} blocks={blocks} />}
      </div>
    </aside>
  );
}