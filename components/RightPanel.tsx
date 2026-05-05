import React from 'react';

interface RightPanelProps {
  activeBlock: any;
  rightTab: 'layout' | 'design' | 'effects' | 'interactions';
  setRightTab: (tab: 'layout' | 'design' | 'effects' | 'interactions') => void;
  updateActiveBlock: (updates: any) => void;
  removeActiveBlock: () => void;
  setIsMediaManagerOpen: (val: boolean) => void;
}

export default function RightPanel({ activeBlock, rightTab, setRightTab, updateActiveBlock, removeActiveBlock, setIsMediaManagerOpen }: RightPanelProps) {
  if (!activeBlock) {
    return (
      <aside className="w-80 bg-[#0c0c0e] border-l border-white/5 p-6 flex flex-col items-center justify-center text-neutral-500 shadow-2xl z-50">
        <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <span className="text-2xl">🖱️</span>
        </div>
        <p className="text-sm font-medium text-center">Wybierz element na płótnie,<br/>aby rozpocząć edycję.</p>
      </aside>
    );
  }

  const { styles } = activeBlock;
  const isFlex = styles.display === 'flex' || !styles.display;

  return (
    <aside className="w-80 bg-[#0c0c0e] border-l border-white/5 flex flex-col h-full z-50 text-white shadow-2xl">
      <div className="flex px-4 pt-4 pb-2 border-b border-white/5 gap-2 overflow-x-auto scrollbar-hide">
        <button onClick={() => setRightTab('layout')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${rightTab === 'layout' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300'}`}>UKŁAD</button>
        <button onClick={() => setRightTab('design')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${rightTab === 'design' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300'}`}>WYGLĄD</button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        
        {rightTab === 'layout' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
            
            {/* Wymiary */}
            <div>
              <h4 className="text-[10px] font-bold text-neutral-500 mb-3 uppercase tracking-widest flex items-center justify-between">Wymiary <span>⤢</span></h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Szerokość (W)</label>
                  <input type="text" value={styles.width || ''} onChange={(e) => updateActiveBlock({ styles: { width: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="np. 100%" />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Wysokość (H)</label>
                  <input type="text" value={styles.height || ''} onChange={(e) => updateActiveBlock({ styles: { height: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="np. auto" />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Min Wysokość</label>
                  <input type="text" value={styles.minHeight || ''} onChange={(e) => updateActiveBlock({ styles: { minHeight: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="np. 200px" />
                </div>
              </div>

              <div className="mt-4 bg-blue-900/20 p-3 rounded-xl border border-blue-500/30 flex items-center justify-between">
                <div>
                  <label className="text-[10px] text-blue-400 font-bold uppercase tracking-wider cursor-pointer">Blokuj miejsce obok</label>
                  <p className="text-[9px] text-neutral-400 mt-0.5 leading-tight">Wymusza spadek kolejnej sekcji<br/>do nowego wiersza.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={styles.clearRow !== false} 
                  onChange={(e) => updateActiveBlock({ styles: { clearRow: e.target.checked } })} 
                  className="w-5 h-5 rounded bg-black border border-blue-500/50 accent-blue-500 cursor-pointer shadow-inner" 
                />
              </div>
            </div>

            <hr className="border-white/5" />

            {/* CENTRUM STEROWANIA NURTEM (FLEXBOX) */}
            {isFlex && activeBlock.children && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden">
                <h4 className="text-[10px] font-bold text-neutral-400 mb-4 uppercase tracking-widest flex items-center justify-between">
                  Nurt Kontenera (Flex)
                </h4>
                
                <div className="mb-4">
                  <label className="text-[10px] text-neutral-400 block mb-2">Kierunek rzeki (Direction)</label>
                  <div className="flex bg-black/50 border border-white/10 rounded-lg p-1">
                    <button onClick={() => updateActiveBlock({ styles: { flexDirection: 'row' } })} className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${styles.flexDirection === 'row' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Poziomo (→)</button>
                    <button onClick={() => updateActiveBlock({ styles: { flexDirection: 'column' } })} className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${styles.flexDirection === 'column' || !styles.flexDirection ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Pionowo (↓)</button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[10px] text-neutral-400 block mb-2">Zachowanie na brzegu (Wrap)</label>
                  <div className="flex bg-black/50 border border-white/10 rounded-lg p-1">
                    <button onClick={() => updateActiveBlock({ styles: { flexWrap: 'nowrap' } })} className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${styles.flexWrap === 'nowrap' || !styles.flexWrap ? 'bg-neutral-600 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Miażdż (No-wrap)</button>
                    <button onClick={() => updateActiveBlock({ styles: { flexWrap: 'wrap' } })} className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${styles.flexWrap === 'wrap' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Zawijaj (Tetris)</button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[10px] text-neutral-400 block mb-2">Rozkład wzdłuż nurtu (Justify)</label>
                  <select value={styles.justifyContent || 'flex-start'} onChange={(e) => updateActiveBlock({ styles: { justifyContent: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner appearance-none cursor-pointer">
                    <option value="flex-start">Początek (Start)</option>
                    <option value="center">Środek (Center)</option>
                    <option value="flex-end">Koniec (End)</option>
                    <option value="space-between">Rozstrzelone (Space Between)</option>
                    <option value="space-around">Odstępy (Space Around)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[10px] text-neutral-400 block mb-2">Pozycja w poprzek (Align Items)</label>
                  <select value={styles.alignItems || 'stretch'} onChange={(e) => updateActiveBlock({ styles: { alignItems: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner appearance-none cursor-pointer">
                    <option value="stretch">Rozciągnij (Stretch)</option>
                    <option value="flex-start">Do lewej / Do góry (Start)</option>
                    <option value="center">Na środku (Center)</option>
                    <option value="flex-end">Do prawej / Na dół (End)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-2">Odległość między klockami (Gap)</label>
                  <input type="text" value={styles.gap || ''} onChange={(e) => updateActiveBlock({ styles: { gap: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="np. 20px" />
                </div>
              </div>
            )}

            <hr className="border-white/5" />

            {/* Przestrzeń (Odstępy wewn/zewn) */}
            <div>
              <h4 className="text-[10px] font-bold text-neutral-500 mb-3 uppercase tracking-widest">Odstępy (Box Model)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <label className="text-[9px] text-neutral-400 block mb-2 text-center uppercase tracking-wider">Padding wewn.</label>
                  <input type="text" value={styles.padding || ''} onChange={(e) => updateActiveBlock({ styles: { padding: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded p-1.5 text-xs text-center text-white outline-none focus:border-blue-500" placeholder="0px" />
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <label className="text-[9px] text-neutral-400 block mb-2 text-center uppercase tracking-wider">Margines zewn.</label>
                  <input type="text" value={styles.margin || ''} onChange={(e) => updateActiveBlock({ styles: { margin: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded p-1.5 text-xs text-center text-white outline-none focus:border-blue-500" placeholder="0px" />
                </div>
              </div>
            </div>

          </div>
        )}

        {rightTab === 'design' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
            <div><h4 className="text-[10px] font-bold text-neutral-500 mb-3 uppercase tracking-widest">Tło Elementu</h4><div className="flex items-center gap-3 bg-black/50 border border-white/10 p-2 rounded-xl mb-3 shadow-inner"><input type="color" value={styles.backgroundColor?.includes('#') ? styles.backgroundColor : '#000000'} onChange={(e) => updateActiveBlock({ styles: { backgroundColor: e.target.value } })} className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0" /><input type="text" value={styles.backgroundColor || ''} onChange={(e) => updateActiveBlock({ styles: { backgroundColor: e.target.value } })} className="flex-1 bg-transparent text-xs text-white outline-none font-mono" placeholder="rgba(0,0,0,0)" /></div><label className="text-[10px] text-neutral-400 block mb-1 mt-3">Obraz w tle (URL)</label><input type="text" value={styles.bgImage || ''} onChange={(e) => updateActiveBlock({ styles: { bgImage: e.target.value, bgType: e.target.value ? 'image' : 'color' } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="https://..." /></div><hr className="border-white/5" /><div><h4 className="text-[10px] font-bold text-neutral-500 mb-3 uppercase tracking-widest">Obramowanie</h4><div className="grid grid-cols-2 gap-3 mb-3"><div><label className="text-[10px] text-neutral-400 block mb-1">Zaokrąglenie</label><input type="text" value={styles.borderRadius || ''} onChange={(e) => updateActiveBlock({ styles: { borderRadius: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 shadow-inner" placeholder="0px" /></div><div><label className="text-[10px] text-neutral-400 block mb-1">Cień (Box Shadow)</label><input type="text" value={styles.boxShadow || ''} onChange={(e) => updateActiveBlock({ styles: { boxShadow: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 shadow-inner" placeholder="none" /></div></div><div><label className="text-[10px] text-neutral-400 block mb-1">Obramowanie (Border)</label><input type="text" value={styles.border || ''} onChange={(e) => updateActiveBlock({ styles: { border: e.target.value } })} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-blue-500 shadow-inner" placeholder="1px solid #000" /></div></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-[#09090b]">
        <button onClick={removeActiveBlock} className="w-full py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
          🗑️ Usuń element
        </button>
      </div>
    </aside>
  );
}