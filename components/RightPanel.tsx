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
      <aside className="w-64 bg-[#111] border-l border-neutral-800 flex flex-col items-center justify-center text-neutral-600 text-xs p-6 text-center z-50 shrink-0">
        <div className="text-3xl mb-4">🖱️</div>
        <p>Kliknij dowolny element na płótnie, aby rozpocząć edycję jego właściwości.</p>
      </aside>
    );
  }

  const handleChange = (key: string, value: string) => {
    updateActiveBlock({ styles: { [key]: value } });
  };

  return (
    <aside className="w-72 bg-[#111] border-l border-neutral-800 flex flex-col z-50 shrink-0 shadow-2xl h-full">
      
      <div className="flex text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-800 shrink-0 bg-[#161616]">
        <button onClick={() => setRightTab('layout')} className={`flex-1 py-4 hover:text-white transition border-b-2 ${rightTab === 'layout' ? 'border-blue-500 text-white bg-[#111]' : 'border-transparent'}`}>Układ</button>
        <button onClick={() => setRightTab('design')} className={`flex-1 py-4 hover:text-white transition border-b-2 ${rightTab === 'design' ? 'border-pink-500 text-white bg-[#111]' : 'border-transparent'}`}>Wygląd</button>
        <button onClick={() => setRightTab('effects')} className={`flex-1 py-4 hover:text-white transition border-b-2 ${rightTab === 'effects' ? 'border-emerald-500 text-white bg-[#111]' : 'border-transparent'}`}>Efekty</button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide flex flex-col gap-6">
        
        {/* UNIWERSALNY PRZYCISK MENEDŻERA (Dla Obrazów i Galerii) */}
        {(activeBlock.images || activeBlock.type === 'img') && (
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-blue-500/30 shadow-lg">
            <span className="text-[10px] font-bold text-blue-400 uppercase block mb-3 tracking-widest">
              {activeBlock.type === 'img' ? 'Plik Obrazu' : 'Kolekcja Zdjęć'}
            </span>
            <button 
              onClick={() => setIsMediaManagerOpen(true)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition flex items-center justify-center gap-2"
            >
              🖼️ Otwórz Menedżer Mediów
            </button>
            <p className="text-[9px] text-neutral-500 mt-3 leading-tight text-center">
              {activeBlock.type === 'img' ? 'Zmień lub podmień ten obraz (Double-Click na płótnie).' : 'Dodawaj i zmieniaj kolejność zdjęć w tej galerii.'}
            </p>
          </div>
        )}

        {/* UKŁAD */}
        {rightTab === 'layout' && (
          <div className="flex flex-col gap-4 animate-in fade-in">
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Szerokość</label>
              <input type="text" value={activeBlock.styles.width || ''} onChange={(e) => handleChange('width', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-blue-500" placeholder="np. 100% lub 300px" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Wysokość</label>
              <input type="text" value={activeBlock.styles.height || ''} onChange={(e) => handleChange('height', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-blue-500" placeholder="np. auto lub 500px" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Padding</label>
                <input type="text" value={activeBlock.styles.padding || ''} onChange={(e) => handleChange('padding', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-blue-500" placeholder="np. 20px" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Margines</label>
                <input type="text" value={activeBlock.styles.margin || ''} onChange={(e) => handleChange('margin', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-blue-500" placeholder="np. 0 auto" />
              </div>
            </div>
          </div>
        )}

        {/* WYGLĄD */}
        {rightTab === 'design' && (
          <div className="flex flex-col gap-4 animate-in fade-in">
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Kolor Tła</label>
              <div className="flex gap-2 items-center bg-black p-1.5 rounded border border-neutral-800">
                <input type="color" value={activeBlock.styles.backgroundColor?.includes('#') ? activeBlock.styles.backgroundColor : '#000000'} onChange={(e) => handleChange('backgroundColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                <input type="text" value={activeBlock.styles.backgroundColor || ''} onChange={(e) => handleChange('backgroundColor', e.target.value)} className="flex-1 bg-transparent border-none text-xs text-white outline-none" placeholder="np. #ff0000 lub transparent" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Zaokrąglenie rogów</label>
              <input type="text" value={activeBlock.styles.borderRadius || ''} onChange={(e) => handleChange('borderRadius', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-pink-500" placeholder="np. 8px lub 50%" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Obramowanie</label>
              <input type="text" value={activeBlock.styles.border || ''} onChange={(e) => handleChange('border', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-pink-500" placeholder="np. 2px solid #3b82f6" />
            </div>
          </div>
        )}

        {/* EFEKTY */}
        {rightTab === 'effects' && (
          <div className="flex flex-col gap-4 animate-in fade-in">
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Przezroczystość: {Math.round((activeBlock.styles.opacity || 1) * 100)}%</label>
              <input type="range" min="0" max="1" step="0.05" value={activeBlock.styles.opacity || 1} onChange={(e) => handleChange('opacity', e.target.value)} className="w-full accent-emerald-500" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Rozmycie tła (Blur)</label>
              <input type="text" value={activeBlock.styles.backdropFilter || ''} onChange={(e) => handleChange('backdropFilter', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-emerald-500" placeholder="np. blur(10px)" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Z-Index (Warstwa)</label>
              <input type="number" value={activeBlock.styles.zIndex || 1} onChange={(e) => handleChange('zIndex', e.target.value)} className="w-full bg-black border border-neutral-800 p-2 text-xs rounded text-white outline-none focus:border-emerald-500" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-neutral-800 bg-[#161616]">
        <button onClick={removeActiveBlock} className="w-full py-2 bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white text-xs font-bold rounded transition border border-red-900/50">🗑️ Usuń element z Płótna</button>
      </div>
    </aside>
  );
}