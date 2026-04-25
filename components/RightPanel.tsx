import React from 'react';

interface RightPanelProps {
  activeBlock: any;
  rightTab: string;
  setRightTab: (tab: 'layout' | 'design' | 'effects' | 'interactions') => void;
  updateActiveBlock: (updates: any) => void;
  removeActiveBlock: () => void;
  setIsMediaManagerOpen: (isOpen: boolean) => void;
}

export default function RightPanel({ activeBlock, rightTab, setRightTab, updateActiveBlock, removeActiveBlock, setIsMediaManagerOpen }: RightPanelProps) {
  if (!activeBlock) {
    return <aside className="w-[320px] bg-[#161616] border-l border-neutral-800 z-40 flex flex-col shrink-0"><div className="p-10 text-center text-neutral-600 text-xs mt-20">Zaznacz warstwę na płótnie.</div></aside>;
  }

  const isTextType = ['h1', 'h2', 'p', 'button', 'marquee', 'faq', 'list', 'menu', 'social'].includes(activeBlock.type);

  return (
    <aside className="w-[320px] bg-[#161616] border-l border-neutral-800 z-40 overflow-y-auto flex flex-col shrink-0">
      <div className="p-4 bg-[#111] border-b border-neutral-800 flex justify-between items-center">
        <span className="font-black text-xs text-white truncate max-w-[150px]">{activeBlock.name}</span>
        <button onClick={removeActiveBlock} className="bg-red-900/30 text-red-500 hover:bg-red-600 hover:text-white text-[10px] px-2 py-1 rounded transition">USUŃ</button>
      </div>
      
      <div className="flex text-[10px] font-bold tracking-widest bg-[#111] border-b border-neutral-800">
        <button onClick={() => setRightTab('layout')} className={`flex-1 py-3 transition ${rightTab==='layout'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>UKŁAD</button>
        <button onClick={() => setRightTab('design')} className={`flex-1 py-3 transition ${rightTab==='design'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>STYL</button>
        <button onClick={() => setRightTab('effects')} className={`flex-1 py-3 transition ${rightTab==='effects'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>EFEKTY</button>
        <button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 transition ${rightTab==='interactions'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>TREŚĆ</button>
      </div>

      <div className="p-5 flex flex-col gap-6 pb-20">
        {/* --- UKŁAD --- */}
        {rightTab === 'layout' && (
          <>
            <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
              <label className="text-[9px] font-bold text-neutral-500 block mb-2">WYŚWIETLANIE (DISPLAY)</label>
              <select value={activeBlock.styles.display} onChange={e => updateActiveBlock({ styles: { display: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none mb-2">
                <option value="block">Blokowy</option><option value="flex">Flexbox</option><option value="grid">Siatka (Grid)</option>
              </select>
              {activeBlock.styles.display === 'flex' && (
                <div className="flex flex-col gap-2 mt-3 text-xs">
                  <div className="flex justify-between items-center"><span className="text-neutral-400">Kierunek</span><select value={activeBlock.styles.flexDirection} onChange={e => updateActiveBlock({ styles: { flexDirection: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded"><option value="row">Wiersz ➡</option><option value="column">Kolumna ⬇</option></select></div>
                  <div className="flex justify-between items-center"><span className="text-neutral-400">Wyrównanie ↕</span><select value={activeBlock.styles.alignItems} onChange={e => updateActiveBlock({ styles: { alignItems: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded"><option value="flex-start">Góra / Lewo</option><option value="center">Środek</option><option value="flex-end">Dół / Prawo</option></select></div>
                  <div className="flex justify-between items-center"><span className="text-neutral-400">Odstęp (Gap)</span><input type="text" value={activeBlock.styles.gap || '0px'} onChange={e => updateActiveBlock({ styles: { gap: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded w-16 text-right" /></div>
                </div>
              )}
            </div>
            <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
              <label className="text-[9px] font-bold text-neutral-500 block mb-2">POZYCJA W DOKUMENCIE</label>
              <select value={activeBlock.styles.position} onChange={e => updateActiveBlock({ styles: { position: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none mb-2">
                <option value="relative">Naturalna (W siatce)</option><option value="absolute">Swobodna (Absolute)</option><option value="fixed">Zablokowana (Fixed)</option>
              </select>
            </div>
            
            {/* NOWOŚĆ: KONTROLA Z-INDEX */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-blue-400 font-bold block mb-1">Warstwa (Z)</label><input type="number" value={activeBlock.styles.zIndex || 0} onChange={e => updateActiveBlock({ styles: { zIndex: parseInt(e.target.value) }})} className="w-full bg-black text-white p-1.5 text-xs border border-blue-500 rounded" /></div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800 col-span-2"><label className="text-[9px] text-neutral-500 block mb-1">Wyżej = na wierzchu</label><p className="text-[9px] text-neutral-400 mt-2">Ustaw wyższą wartość, by przenieść na przód.</p></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Szerokość</label><input type="text" value={activeBlock.styles.width} onChange={e => updateActiveBlock({ styles: { width: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Wysokość</label><input type="text" value={activeBlock.styles.height} onChange={e => updateActiveBlock({ styles: { height: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Padding wewn.</label><input type="text" value={activeBlock.styles.padding} onChange={e => updateActiveBlock({ styles: { padding: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
              <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Margin zewn.</label><input type="text" value={activeBlock.styles.margin} onChange={e => updateActiveBlock({ styles: { margin: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
            </div>
          </>
        )}

        {/* --- STYL --- */}
        {rightTab === 'design' && (
          <>
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col gap-4">
              <label className="text-[10px] font-bold text-white block tracking-widest uppercase">Tło Elementu</label>
              <select value={activeBlock.styles.bgType || 'color'} onChange={e => updateActiveBlock({ styles: { bgType: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none">
                <option value="color">Jednolity Kolor</option><option value="image">Obrazek / Gradient</option><option value="video">Plik Wideo (.mp4)</option>
              </select>
              {(!activeBlock.styles.bgType || activeBlock.styles.bgType === 'color') && (
                <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła</span><input type="color" value={activeBlock.styles.backgroundColor || 'transparent'} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
              )}
              {activeBlock.styles.bgType === 'image' && (
                <div className="flex flex-col gap-2 text-xs"><span className="text-neutral-400">URL obrazka lub Gradient CSS</span><textarea value={activeBlock.styles.bgImage || ''} onChange={e => updateActiveBlock({ styles: { bgImage: e.target.value }})} className="w-full bg-black text-white p-2 border border-neutral-700 rounded" placeholder="https://..." rows={3} /><div className="flex items-center justify-between mt-2"><span className="text-neutral-400">Krycie (Nakładka)</span><input type="color" value={activeBlock.styles.bgOverlay || 'transparent'} onChange={e => updateActiveBlock({ styles: { bgOverlay: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div></div>
              )}
              {activeBlock.styles.bgType === 'video' && (
                <div className="flex flex-col gap-2 text-xs"><span className="text-neutral-400">URL pliku wideo (.mp4)</span><textarea value={activeBlock.styles.bgVideo || ''} onChange={e => updateActiveBlock({ styles: { bgVideo: e.target.value }})} className="w-full bg-black text-white p-2 border border-neutral-700 rounded" placeholder="https://.../video.mp4" rows={2} /><div className="flex items-center justify-between mt-2"><span className="text-neutral-400">Kolor przyciemnienia</span><input type="color" value={activeBlock.styles.bgOverlay || 'rgba(0,0,0,0.5)'} onChange={e => updateActiveBlock({ styles: { bgOverlay: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div></div>
              )}
            </div>
            
            {isTextType && (
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                <label className="text-[9px] font-bold text-neutral-500 block uppercase">Efekty Tekstu</label>
                <select value={activeBlock.styles.textShadow || 'none'} onChange={e => updateActiveBlock({ styles: { textShadow: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none">
                  <option value="none">Brak Cienia</option><option value="2px 2px 4px rgba(0,0,0,0.5)">Miękki Cień</option><option value="4px 4px 0px rgba(0,0,0,0.2)">Twardy Cień (Retro)</option><option value="0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(59,130,246,0.8)">Świecący Neon</option>
                </select>
              </div>
            )}

            {activeBlock.type === 'img' && (
              <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-900/30 flex flex-col gap-4">
                <label className="text-[10px] font-bold text-blue-400 block tracking-widest">KADROWANIE WNĘTRZA</label>
                <div className="flex flex-col gap-1"><div className="flex justify-between text-xs"><span className="text-neutral-400">Zoom</span><span className="text-blue-300">{activeBlock.styles.imageScale || 1}x</span></div><input type="range" min="1" max="3" step="0.1" value={activeBlock.styles.imageScale || 1} onChange={e => updateActiveBlock({ styles: { imageScale: parseFloat(e.target.value) }})} className="w-full accent-blue-500" /></div>
                <div className="flex flex-col gap-1"><div className="flex justify-between text-xs"><span className="text-neutral-400">Oś X</span><span className="text-blue-300">{activeBlock.styles.objectPositionX || 50}%</span></div><input type="range" min="0" max="100" value={activeBlock.styles.objectPositionX || 50} onChange={e => updateActiveBlock({ styles: { objectPositionX: parseInt(e.target.value) }})} className="w-full accent-blue-500" /></div>
                <div className="flex flex-col gap-1"><div className="flex justify-between text-xs"><span className="text-neutral-400">Oś Y</span><span className="text-blue-300">{activeBlock.styles.objectPositionY || 50}%</span></div><input type="range" min="0" max="100" value={activeBlock.styles.objectPositionY || 50} onChange={e => updateActiveBlock({ styles: { objectPositionY: parseInt(e.target.value) }})} className="w-full accent-blue-500" /></div>
              </div>
            )}
          </>
        )}

        {/* --- EFEKTY --- */}
        {rightTab === 'effects' && (
          <>
            <div className="bg-pink-900/10 p-4 rounded-xl border border-pink-900/30 flex flex-col gap-4">
              <label className="text-[10px] font-bold text-pink-400 block tracking-widest">FILTRY I MIESZANIE</label>
              <div className="flex flex-col gap-1"><div className="flex justify-between text-xs"><span className="text-neutral-400">Rozmycie (Blur)</span><span className="text-pink-300">{activeBlock.styles.filterBlur || 0}px</span></div><input type="range" min="0" max="20" value={activeBlock.styles.filterBlur || 0} onChange={e => updateActiveBlock({ styles: { filterBlur: parseInt(e.target.value) }})} className="w-full accent-pink-500" /></div>
              <div className="flex flex-col gap-1"><div className="flex justify-between text-xs"><span className="text-neutral-400">Jasność</span><span className="text-pink-300">{activeBlock.styles.filterBrightness ?? 100}%</span></div><input type="range" min="0" max="200" value={activeBlock.styles.filterBrightness ?? 100} onChange={e => updateActiveBlock({ styles: { filterBrightness: parseInt(e.target.value) }})} className="w-full accent-pink-500" /></div>
              <div className="flex flex-col gap-1"><div className="flex justify-between text-xs"><span className="text-neutral-400">Kontrast</span><span className="text-pink-300">{activeBlock.styles.filterContrast ?? 100}%</span></div><input type="range" min="0" max="200" value={activeBlock.styles.filterContrast ?? 100} onChange={e => updateActiveBlock({ styles: { filterContrast: parseInt(e.target.value) }})} className="w-full accent-pink-500" /></div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-neutral-400 text-xs">Tryb Mieszania (Blend Mode)</span>
                <select value={activeBlock.styles.mixBlendMode || 'normal'} onChange={e => updateActiveBlock({ styles: { mixBlendMode: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none">
                  <option value="normal">Normal (Brak)</option><option value="multiply">Multiply (Mnożenie)</option><option value="screen">Screen</option><option value="overlay">Overlay</option>
                </select>
              </div>
            </div>

            <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
              <label className="text-[9px] font-bold text-neutral-500 block">OBRAMOWANIE I CIEŃ</label>
              <div className="flex flex-col gap-1 text-xs"><span className="text-neutral-400">Border (CSS)</span><input type="text" value={activeBlock.styles.border || 'none'} onChange={e => updateActiveBlock({ styles: { border: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full"/></div>
              <div className="flex items-center justify-between text-xs mt-1"><span className="text-neutral-400">Radius</span><input type="text" value={activeBlock.styles.borderRadius || '0px'} onChange={e => updateActiveBlock({ styles: { borderRadius: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded w-24 text-right"/></div>
              <div className="flex flex-col gap-1 text-xs mt-2"><span className="text-neutral-400">Box Shadow</span><input type="text" value={activeBlock.styles.boxShadow || 'none'} onChange={e => updateActiveBlock({ styles: { boxShadow: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full"/></div>
            </div>
            
            <div className="bg-blue-900/10 p-3 rounded border border-blue-900/30 flex flex-col gap-3">
              <label className="text-[9px] font-bold text-blue-500 block">EFEKTY HOVER (Najechanie)</label>
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła (Hover)</span><input type="color" value={activeBlock.hoverStyles?.backgroundColor || '#000000'} onChange={e => updateActiveBlock({ hoverStyles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
              <div className="flex flex-col gap-1 text-xs"><span className="text-neutral-400">Transform (np. scale(1.1))</span><input type="text" value={activeBlock.hoverStyles?.transform || 'none'} onChange={e => updateActiveBlock({ hoverStyles: { transform: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full"/></div>
            </div>
          </>
        )}

        {/* --- TREŚĆ --- */}
        {rightTab === 'interactions' && (
          <div className="flex flex-col gap-3 text-xs">
            <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane logiczne i treści</label>
            <label className="text-neutral-400">Nazwa warstwy:</label>
            <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" />
            
            {['img', 'embed', 'map'].includes(activeBlock.type) && <><label className="text-neutral-400 mt-2">Link Źródłowy:</label><textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={3} /></>}
            {activeBlock.type === 'video' && <><label className="text-neutral-400 mt-2">ID z YouTube:</label><input type="text" value={activeBlock.videoId} onChange={e => updateActiveBlock({ videoId: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" /></>}
            
            {activeBlock.type === 'ribbon' && activeBlock.ribbonItems && (
              <>
                <label className="text-neutral-400 mt-4 text-yellow-400 font-bold">Elementy Wstęgi:</label>
                <textarea value={activeBlock.ribbonItems.map((i: any) => i.value).join('\n')} onChange={e => { const lines = e.target.value.split('\n').filter(s => s.trim() !== ''); const newItems = lines.map(line => ({ type: line.startsWith('http') ? 'img' : 'text', value: line })); updateActiveBlock({ ribbonItems: newItems as any }); }} className="bg-black text-white p-2 border border-neutral-700 rounded w-full font-mono text-[10px] leading-relaxed" rows={8} />
              </>
            )}

            {['carousel', 'grid'].includes(activeBlock.type) && activeBlock.images && (
              <div className="mt-4 p-4 bg-neutral-900 border border-neutral-700 rounded-lg text-center">
                <button onClick={() => setIsMediaManagerOpen(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded shadow-lg transition text-xs">🖼️ Menedżer Mediów</button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}