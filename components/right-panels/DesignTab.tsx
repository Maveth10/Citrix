import React from 'react';

export default function DesignTab({ activeBlock, updateActiveBlock, currentStyles, handleStyleChange, setIsMediaManagerOpen }: any) {
  if (!activeBlock) return null;

  // Elastyczna obsługa propsów (w zależności od tego, jak przesyła je Twój RightPanel)
  const styles = currentStyles || activeBlock.styles || {};
  
  const doStyleChange = (key: string, value: any) => {
    if (handleStyleChange) handleStyleChange(key, value);
    else updateActiveBlock({ styles: { [key]: value } });
  };

  const doPropChange = (key: string, value: any) => {
    updateActiveBlock({ [key]: value });
  };

  const isMediaBlock = ['img', 'video', 'embed'].includes(activeBlock.type);
  const radiusVal = parseInt(styles.borderRadius || '0');

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* STYLE DLA SUWAKÓW */}
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range] { -webkit-appearance: none; background: rgba(255, 255, 255, 0.05); height: 4px; border-radius: 4px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #ff4500; cursor: pointer; box-shadow: 0 0 10px rgba(255, 69, 0, 0.5); transition: transform 0.1s; }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
      `}} />

      {/* 🔴 NOWOŚĆ: MEDIA (LINKI DO ZDJĘĆ I WIDEO) 🔴 */}
      {isMediaBlock && (
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-[#ff4500] uppercase tracking-widest border-b border-[#ff4500]/30 pb-2">Źródło Multimediów</h4>
          
          <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm group hover:border-white/20 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Link URL (src):</span>
              {setIsMediaManagerOpen && (
                <button onClick={() => setIsMediaManagerOpen(true)} className="text-[9px] text-[#ff4500] uppercase font-bold hover:underline">Zarządzaj (Media)</button>
              )}
            </div>
            <input 
              type="text" 
              value={activeBlock.src || ''} 
              onChange={(e) => doPropChange('src', e.target.value)} 
              className="w-full bg-black/40 border border-white/10 text-white font-mono font-bold text-[10px] p-2.5 rounded-lg focus:border-[#ff4500] outline-none transition-colors shadow-inner" 
              placeholder="https://..." 
            />
            <p className="text-[9px] text-neutral-500 leading-tight">
              Wklej bezpośredni link do obrazka (np. z Unsplash) lub pliku wideo.
            </p>
          </div>
        </div>
      )}

      {/* TŁO (BACKGROUND) ORAZ TŁO OBRAZKOWE */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Tło (Background)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm group hover:border-white/20 transition-all">
          
          {/* KOLOR TŁA */}
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolor Tła:</span>
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                <input type="color" value={styles.backgroundColor && styles.backgroundColor !== 'transparent' ? styles.backgroundColor.slice(0,7) : '#000000'} onChange={(e) => doStyleChange('backgroundColor', e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
              </div>
              <input type="text" value={styles.backgroundColor || 'transparent'} onChange={(e) => doStyleChange('backgroundColor', e.target.value)} className="w-24 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" />
            </div>
          </div>

          {/* Gotowe kolory (Szybki wybór) */}
          <div className="flex flex-wrap gap-2 mt-1">
            {['transparent', '#ffffff', '#000000', '#0f172a', '#3b82f6', '#ef4444', '#10b981', '#ff4500'].map(c => (
              <button key={c} onClick={() => doStyleChange('backgroundColor', c)} className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform relative shadow-sm" style={{ backgroundColor: c }}>
                  {c === 'transparent' && <div className="absolute inset-0 m-auto w-[2px] h-[120%] bg-red-500 rotate-45"></div>}
              </button>
            ))}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          {/* 🔴 NOWOŚĆ: OBRAZEK JAKO TŁO 🔴 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Obraz w tle (URL):</span>
              {setIsMediaManagerOpen && (
                <button onClick={() => setIsMediaManagerOpen(true)} className="text-[9px] text-[#ff4500] uppercase font-bold hover:underline">Media Manager</button>
              )}
            </div>
            <input 
              type="text" 
              value={(styles.backgroundImage || '').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')} 
              onChange={(e) => doStyleChange('backgroundImage', e.target.value ? `url('${e.target.value}')` : 'none')} 
              className="w-full bg-black/40 border border-white/10 text-white font-mono font-bold text-[10px] p-2.5 rounded-lg focus:border-[#ff4500] outline-none transition-colors shadow-inner" 
              placeholder="Wklej link do tła..." 
            />
          </div>

          {styles.backgroundImage && styles.backgroundImage !== 'none' && (
            <div className="flex justify-between items-center">
               <span className="text-[11px] text-neutral-400 font-semibold">Rozmiar tła:</span>
               <select value={styles.backgroundSize || 'cover'} onChange={(e) => doStyleChange('backgroundSize', e.target.value)} className="bg-black/40 border border-white/10 text-white text-[11px] font-bold rounded-lg p-1.5 focus:border-[#ff4500] outline-none cursor-pointer">
                 <option value="cover">Wypełnij (Cover)</option>
                 <option value="contain">Dopasuj (Contain)</option>
                 <option value="auto">Oryginalny (Auto)</option>
               </select>
            </div>
          )}

        </div>
      </div>

      {/* KRAWĘDZIE (BORDERS) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Krawędzie (Borders)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Zaokrąglenie (Radius)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{styles.borderRadius || '0px'}</span>
            </div>
            <input 
              type="range" min="0" max="150" 
              value={isNaN(radiusVal) ? 0 : radiusVal} 
              onChange={(e) => doStyleChange('borderRadius', `${e.target.value}px`)} 
              className="w-full cursor-ew-resize"
            />
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>
          
          <div className="flex justify-between items-center group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Grubość Ramki:</span>
             <input type="text" value={styles.borderWidth || '0px'} onChange={(e) => doStyleChange('borderWidth', e.target.value)} className="w-16 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" placeholder="1px" />
          </div>
          
          <div className="flex justify-between items-center group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolor Ramki:</span>
             <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                <input type="color" value={styles.borderColor || '#ffffff'} onChange={(e) => doStyleChange('borderColor', e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
             </div>
          </div>
          
          <div className="flex justify-between items-center relative group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Styl Ramki:</span>
             <div className="relative">
               <select value={styles.borderStyle || 'solid'} onChange={(e) => doStyleChange('borderStyle', e.target.value)} className="appearance-none bg-black/40 hover:bg-black/60 border border-white/10 text-white font-bold text-[11px] rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none w-[110px] shadow-inner transition-colors cursor-pointer">
                  <option value="none">Brak</option>
                  <option value="solid">Ciągła</option>
                  <option value="dashed">Przerywana</option>
                  <option value="dotted">Kropkowana</option>
               </select>
               <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}