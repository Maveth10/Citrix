import React from 'react';

interface RightPanelProps {
  activeBlock: any;
  rightTab: 'layout' | 'design' | 'effects' | 'interactions';
  setRightTab: (tab: 'layout' | 'design' | 'effects' | 'interactions') => void;
  updateActiveBlock: (updates: any) => void;
  removeActiveBlock: () => void;
  setIsMediaManagerOpen: (isOpen: boolean) => void;
}

export default function RightPanel({ activeBlock, rightTab, setRightTab, updateActiveBlock, removeActiveBlock, setIsMediaManagerOpen }: RightPanelProps) {
  if (!activeBlock) {
    return (
      <aside className="w-72 bg-[#09090b] border-l border-white/5 flex flex-col items-center justify-center text-neutral-500 text-xs p-8 text-center z-50 shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 shadow-inner">🖱️</div>
        <p className="leading-relaxed">Zaznacz dowolny element na płótnie, aby uzyskać dostęp do panelu właściwości.</p>
      </aside>
    );
  }

  const handleChange = (key: string, value: string) => {
    updateActiveBlock({ styles: { [key]: value } });
  };

  const handleHoverChange = (key: string, value: string | number) => {
    updateActiveBlock({ hoverStyles: { [key]: value } });
  };

  return (
    <aside className="w-80 bg-[#09090b] border-l border-white/5 flex flex-col z-50 shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] h-full">
      
      {/* TABS (Teraz mamy cztery!) */}
      <div className="p-4 border-b border-white/5 shrink-0 bg-[#09090b]">
        <div className="flex bg-white/5 rounded-xl p-1 shadow-inner border border-white/5">
          <button onClick={() => setRightTab('layout')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${rightTab === 'layout' ? 'bg-[#18181b] text-white shadow-sm border border-white/5' : 'text-neutral-500 hover:text-white'}`}>Układ</button>
          <button onClick={() => setRightTab('design')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${rightTab === 'design' ? 'bg-[#18181b] text-white shadow-sm border border-white/5' : 'text-neutral-500 hover:text-white'}`}>Wygląd</button>
          <button onClick={() => setRightTab('effects')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${rightTab === 'effects' ? 'bg-[#18181b] text-white shadow-sm border border-white/5' : 'text-neutral-500 hover:text-white'}`}>Efekty</button>
          <button onClick={() => setRightTab('interactions')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${rightTab === 'interactions' ? 'bg-[#18181b] text-white shadow-sm border border-white/5' : 'text-neutral-500 hover:text-white'}`}>Interakcje</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide flex flex-col gap-6">
        
        {/* MEDIA BUTTON */}
        {(activeBlock.images || activeBlock.type === 'img') && (
          <div className="bg-gradient-to-b from-blue-900/20 to-transparent p-5 rounded-2xl border border-blue-500/20 shadow-lg relative overflow-hidden">
            <span className="text-[10px] font-bold text-blue-400 uppercase block mb-3 tracking-widest relative z-10">Zarządzaj Plikiem</span>
            <button onClick={() => setIsMediaManagerOpen(true)} className="w-full py-3 bg-white text-black hover:bg-neutral-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg relative z-10 transform hover:-translate-y-0.5">🖼️ Menedżer Mediów</button>
          </div>
        )}

        {activeBlock.type === 'video' && (
          <div className="bg-gradient-to-b from-red-900/20 to-transparent p-5 rounded-2xl border border-red-500/20 shadow-lg relative overflow-hidden mb-2">
             <span className="text-[10px] font-bold text-red-400 uppercase block mb-3 tracking-widest relative z-10">URL Wideo (YouTube / MP4)</span>
             <input type="text" value={activeBlock.src || ''} onChange={(e) => updateActiveBlock({ src: e.target.value })} className="w-full bg-black/50 border border-white/10 p-3 text-xs rounded-xl text-white outline-none focus:border-red-500 transition-colors shadow-inner relative z-10" placeholder="Wklej link..." />
          </div>
        )}

        {activeBlock.type === 'embed' && (
          <div className="bg-gradient-to-b from-emerald-900/20 to-transparent p-5 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden mb-2">
             <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-3 tracking-widest relative z-10">Kod Osadzenia (iFrame)</span>
             <textarea value={activeBlock.text || ''} onChange={(e) => updateActiveBlock({ text: e.target.value })} className="w-full bg-black/50 border border-white/10 p-3 text-xs rounded-xl text-white outline-none focus:border-emerald-500 transition-colors shadow-inner relative z-10 h-32 resize-none font-mono" placeholder="Wklej kod..." />
          </div>
        )}

        {/* UKŁAD */}
        {rightTab === 'layout' && (
          <div className="flex flex-col gap-5 animate-in fade-in">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">Wymiary</span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3"><label className="text-xs text-neutral-500 w-16">Szerokość</label><input type="text" value={activeBlock.styles.width || ''} onChange={(e) => handleChange('width', e.target.value)} className="flex-1 bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="np. 100%" /></div>
                <div className="flex items-center gap-3"><label className="text-xs text-neutral-500 w-16">Wysokość</label><input type="text" value={activeBlock.styles.height || ''} onChange={(e) => handleChange('height', e.target.value)} className="flex-1 bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="np. auto" /></div>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">Odstępy</span>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] text-neutral-500 block mb-1">Pad (Wewn)</label><input type="text" value={activeBlock.styles.padding || ''} onChange={(e) => handleChange('padding', e.target.value)} className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white text-center outline-none focus:border-blue-500" placeholder="20px" /></div>
                <div><label className="text-[10px] text-neutral-500 block mb-1">Mar (Zewn)</label><input type="text" value={activeBlock.styles.margin || ''} onChange={(e) => handleChange('margin', e.target.value)} className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white text-center outline-none focus:border-blue-500" placeholder="0 auto" /></div>
              </div>
            </div>
          </div>
        )}

        {/* WYGLĄD */}
        {rightTab === 'design' && (
          <div className="flex flex-col gap-5 animate-in fade-in">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-3">Kolor Tła</label>
              <div className="flex gap-3 items-center bg-[#09090b] p-2 rounded-xl border border-white/10"><input type="color" value={activeBlock.styles.backgroundColor?.includes('#') ? activeBlock.styles.backgroundColor : '#000000'} onChange={(e) => handleChange('backgroundColor', e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent" /><input type="text" value={activeBlock.styles.backgroundColor || ''} onChange={(e) => handleChange('backgroundColor', e.target.value)} className="flex-1 bg-transparent border-none text-xs text-white outline-none font-mono" placeholder="#000000" /></div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">Stylizacja granic</span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3"><label className="text-xs text-neutral-500 w-16">Rogowe</label><input type="text" value={activeBlock.styles.borderRadius || ''} onChange={(e) => handleChange('borderRadius', e.target.value)} className="flex-1 bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white outline-none focus:border-pink-500" placeholder="16px" /></div>
                <div className="flex items-center gap-3"><label className="text-xs text-neutral-500 w-16">Linia</label><input type="text" value={activeBlock.styles.border || ''} onChange={(e) => handleChange('border', e.target.value)} className="flex-1 bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white outline-none focus:border-pink-500" placeholder="1px solid #fff" /></div>
              </div>
            </div>
          </div>
        )}

        {/* EFEKTY */}
        {rightTab === 'effects' && (
          <div className="flex flex-col gap-5 animate-in fade-in">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-3"><label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Krycie (Opacity)</label><span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">{Math.round((activeBlock.styles.opacity || 1) * 100)}%</span></div>
              <input type="range" min="0" max="1" step="0.05" value={activeBlock.styles.opacity || 1} onChange={(e) => handleChange('opacity', e.target.value)} className="w-full accent-emerald-500" />
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">Dodatkowe filtry</span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3"><label className="text-xs text-neutral-500 w-16">Blur</label><input type="text" value={activeBlock.styles.backdropFilter || ''} onChange={(e) => handleChange('backdropFilter', e.target.value)} className="flex-1 bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white outline-none focus:border-emerald-500" placeholder="blur(10px)" /></div>
              </div>
            </div>
          </div>
        )}

        {/* NOWOŚĆ V18.2: INTERAKCJE I ANIMACJE */}
        {rightTab === 'interactions' && (
          <div className="flex flex-col gap-5 animate-in fade-in">
            
            {/* Animacja Wejściowa */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">Animacja Przy Pojawieniu (Load)</label>
              <select 
                value={activeBlock.entranceAnim || 'none'} 
                onChange={(e) => updateActiveBlock({ entranceAnim: e.target.value })}
                className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs rounded-xl text-white outline-none focus:border-purple-500"
              >
                <option value="none">Brak (Pojawia się natychmiast)</option>
                <option value="fade-in">Mękkie wejście (Fade In)</option>
                <option value="slide-up">Wjazd od dołu (Slide Up)</option>
                <option value="zoom-in">Zwiększenie (Zoom In)</option>
              </select>
            </div>

            {/* Efekty Hover */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-4 flex items-center gap-2"><span>🖱️</span> Efekt Najechania (Hover)</span>
              
              <div className="flex flex-col gap-4">
                {/* Skala */}
                <div>
                  <div className="flex justify-between items-center mb-2"><label className="text-[10px] text-neutral-400">Powiększenie (Scale)</label><span className="text-[10px] text-white">x{activeBlock.hoverStyles?.scale || 1}</span></div>
                  <input type="range" min="0.8" max="1.5" step="0.05" value={activeBlock.hoverStyles?.scale || 1} onChange={(e) => handleHoverChange('scale', parseFloat(e.target.value))} className="w-full accent-purple-500" />
                </div>

                {/* Przesunięcie Y */}
                <div>
                  <div className="flex justify-between items-center mb-2"><label className="text-[10px] text-neutral-400">Unoszenie (Translate Y)</label><span className="text-[10px] text-white">{activeBlock.hoverStyles?.translateY || 0}px</span></div>
                  <input type="range" min="-30" max="30" step="1" value={activeBlock.hoverStyles?.translateY || 0} onChange={(e) => handleHoverChange('translateY', parseInt(e.target.value))} className="w-full accent-purple-500" />
                </div>

                {/* Zmiana Koloru */}
                <div className="flex gap-3 items-center bg-[#09090b] p-2 rounded-xl border border-white/10 shadow-inner mt-2">
                  <input type="color" value={activeBlock.hoverStyles?.backgroundColor || '#000000'} onChange={(e) => handleHoverChange('backgroundColor', e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent" />
                  <span className="text-xs text-neutral-500">Kolor tła na Hover</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <div className="p-5 border-t border-white/5 bg-[#09090b]">
        <button onClick={removeActiveBlock} className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-xl transition border border-red-500/20">🗑️ Usuń Element</button>
      </div>
    </aside>
  );
}