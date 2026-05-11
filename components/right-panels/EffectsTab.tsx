import React from 'react';

export default function EffectsTab({ activeBlock, updateActiveBlock, currentStyles, handleStyleChange, mode }: any) {
  if (!activeBlock || !currentStyles) return null;

  const { entranceAnim = 'none', animDuration = 0.8, animDelay = 0 } = activeBlock;

  const handleTopLevelChange = (key: string, value: any) => {
    updateActiveBlock({ [key]: value });
  };

  const parseValue = (val: any, fallback: number) => {
    if (val === undefined || val === null) return fallback;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  };

  // 🔥 STYLE DLA PIĘKNYCH SUWAKÓW
  const sliderStyles = `
    input[type=range] { -webkit-appearance: none; background: rgba(255, 255, 255, 0.05); height: 4px; border-radius: 4px; outline: none; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #ff4500; cursor: pointer; box-shadow: 0 0 10px rgba(255, 69, 0, 0.5); transition: transform 0.1s; }
    input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
  `;

  // =========================================================================
  // 🖱️ TRYB HOVER (Najazd myszką)
  // =========================================================================
  if (mode === 'hover') {
    return (
      <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <style dangerouslySetInnerHTML={{__html: sliderStyles}} />
        
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-[#ff4500] uppercase tracking-widest border-b border-[#ff4500]/30 pb-2">Animacja najechania (Hover)</h4>
          
          <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-[#ff4500]/20 shadow-[0_0_15px_rgba(255,69,0,0.05)]">
            
            <div className="group">
              <div className="flex justify-between text-[11px] mb-3">
                <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Skalowanie (Scale)</span>
                <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.scale || '1'}x</span>
              </div>
              <input type="range" min="0.8" max="1.5" step="0.05" value={parseValue(currentStyles.scale, 1)} onChange={(e) => handleStyleChange('scale', e.target.value)} className="w-full cursor-ew-resize" />
            </div>

            <div className="group">
              <div className="flex justify-between text-[11px] mb-3">
                <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Lewitacja (Translate Y)</span>
                <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.translateY || '0'}px</span>
              </div>
              <input type="range" min="-30" max="30" step="1" value={parseValue(currentStyles.translateY, 0)} onChange={(e) => handleStyleChange('translateY', `${e.target.value}px`)} className="w-full cursor-ew-resize" />
            </div>

            <div className="group">
              <div className="flex justify-between text-[11px] mb-3">
                <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Obrót (Rotate)</span>
                <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.rotate || '0'}°</span>
              </div>
              <input type="range" min="-180" max="180" step="5" value={parseValue(currentStyles.rotate, 0)} onChange={(e) => handleStyleChange('rotate', `${e.target.value}deg`)} className="w-full cursor-ew-resize" />
            </div>

            <div className="group">
              <div className="flex justify-between text-[11px] mb-3">
                <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Krycie (Opacity)</span>
                <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.opacity !== undefined ? currentStyles.opacity : '1'}</span>
              </div>
              <input type="range" min="0" max="1" step="0.1" value={parseValue(currentStyles.opacity, 1)} onChange={(e) => handleStyleChange('opacity', e.target.value)} className="w-full cursor-ew-resize" />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

            <div className="flex justify-between items-center group">
               <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolor tła (Hover):</span>
               <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                    <input type="color" value={currentStyles.backgroundColor?.includes('#') ? currentStyles.backgroundColor.slice(0,7) : '#000000'} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
                  </div>
                  <input type="text" value={currentStyles.backgroundColor || ''} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} placeholder="HEX / Brak" className="w-20 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" />
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 🎬 TRYB NORMALNY (Animacje Wejścia, Filtry, Cienie, Transformacje)
  // =========================================================================
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <style dangerouslySetInnerHTML={{__html: sliderStyles}} />

      {/* ANIMACJE WEJŚCIA NA SCROLL */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-[#00f2ff] uppercase tracking-widest border-b border-[#00f2ff]/30 pb-2">Wejście na scroll (Reveal)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-[#00f2ff]/20 shadow-[0_0_15px_rgba(0,242,255,0.05)]">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-2">Typ Animacji</span>
            <div className="relative">
              <select value={entranceAnim} onChange={(e) => handleTopLevelChange('entranceAnim', e.target.value)} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2.5 focus:border-[#00f2ff] outline-none transition-all cursor-pointer shadow-inner">
                <option value="none">Brak (Statyczne)</option>
                <option value="fade-in">Przenikanie (Fade In)</option>
                <option value="slide-up">Wjazd z dołu (Slide Up)</option>
                <option value="slide-down">Wjazd z góry (Slide Down)</option>
                <option value="slide-left">Wjazd z prawej (Slide Left)</option>
                <option value="slide-right">Wjazd z lewej (Slide Right)</option>
                <option value="zoom-in">Powiększenie (Zoom In)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">▼</div>
            </div>
          </div>

          {entranceAnim && entranceAnim !== 'none' && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
              <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">Czas trwania (s)</span>
                <input type="number" step="0.1" min="0.1" value={animDuration} onChange={(e) => handleTopLevelChange('animDuration', parseFloat(e.target.value))} className="w-full bg-transparent text-[#00f2ff] font-mono text-[12px] font-bold outline-none" />
              </div>
              <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">Opóźnienie (s)</span>
                <input type="number" step="0.1" min="0" value={animDelay} onChange={(e) => handleTopLevelChange('animDelay', parseFloat(e.target.value))} className="w-full bg-transparent text-[#00f2ff] font-mono text-[12px] font-bold outline-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TRANSFORMACJE 2D (NOWOŚĆ) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Transformacje (Przekształcenia)</h4>
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Obrót (Rotate)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.rotate || '0'}°</span>
            </div>
            <input type="range" min="-180" max="180" step="1" value={parseValue(currentStyles.rotate, 0)} onChange={(e) => handleStyleChange('rotate', `${e.target.value}deg`)} className="w-full cursor-ew-resize" />
          </div>
        </div>
      </div>

      {/* WIDOCZNOŚĆ I SZKŁO */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Widoczność i Szkło</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Przezroczystość (Opacity)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.opacity ?? '1'}</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" value={parseValue(currentStyles.opacity, 1)} onChange={(e) => handleStyleChange('opacity', e.target.value)} className="w-full cursor-ew-resize" />
          </div>

          <div className="w-full h-px bg-white/10 my-1"></div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Szkło: Rozmycie tła (Backdrop Blur)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.backdropFilter?.replace('blur(', '').replace('px)', '') || '0'}px</span>
            </div>
            <input type="range" min="0" max="50" step="1" value={parseValue(currentStyles.backdropFilter?.replace('blur(', '').replace('px)', ''), 0)} onChange={(e) => handleStyleChange('backdropFilter', `blur(${e.target.value}px)`)} className="w-full cursor-ew-resize" />
            <p className="text-[9px] text-neutral-500 mt-2 leading-relaxed border-l-2 border-[#ff4500]/50 pl-2">
              Aby szkło działało, "Kolor Tła" w zakładce Wygląd musi być półprzezroczysty (np. rgba(255,255,255,0.1)).
            </p>
          </div>
        </div>
      </div>

      {/* CIENIE */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Cienie (Box Shadow)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleStyleChange('boxShadow', 'none')} className="bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-colors text-[10px] text-white">Brak</button>
            <button onClick={() => handleStyleChange('boxShadow', '0 4px 15px rgba(0,0,0,0.1)')} className="bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-colors text-[10px] text-white">Miękki (S)</button>
            <button onClick={() => handleStyleChange('boxShadow', '0 10px 30px rgba(0,0,0,0.2)')} className="bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-colors text-[10px] text-white">Średni (M)</button>
            <button onClick={() => handleStyleChange('boxShadow', '0 20px 50px rgba(0,0,0,0.5)')} className="bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-colors text-[10px] text-white">Głęboki (L)</button>
            <button onClick={() => handleStyleChange('boxShadow', '0 0 20px rgba(255, 69, 0, 0.4)')} className="bg-white/5 border border-white/10 p-2 rounded hover:bg-[#ff4500]/10 hover:border-[#ff4500]/50 transition-colors text-[#ff4500] text-[10px] font-bold">Neon Orange</button>
            <button onClick={() => handleStyleChange('boxShadow', '0 0 20px rgba(0, 242, 255, 0.4)')} className="bg-white/5 border border-white/10 p-2 rounded hover:bg-[#00f2ff]/10 hover:border-[#00f2ff]/50 transition-colors text-[#00f2ff] text-[10px] font-bold">Neon Blue</button>
          </div>
          <input type="text" placeholder="Własny: np. 0 5px 10px #000" value={currentStyles.boxShadow === 'none' ? '' : (currentStyles.boxShadow || '')} onChange={(e) => handleStyleChange('boxShadow', e.target.value)} className="bg-black/50 border border-white/10 text-white rounded-lg p-2 outline-none w-full focus:border-[#ff4500] transition-colors font-mono text-[11px] shadow-inner" />
        </div>
      </div>

      {/* FILTRY I MIESZANIE (BLENDING) */}
      <div className="space-y-4 mb-10">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Filtry Obrazu</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Rozmycie (Blur)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.filterBlur || '0'}px</span>
            </div>
            <input type="range" min="0" max="20" step="1" value={parseValue(currentStyles.filterBlur, 0)} onChange={(e) => handleStyleChange('filterBlur', e.target.value)} className="w-full cursor-ew-resize" />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Jasność (Brightness)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.filterBrightness ?? '100'}%</span>
            </div>
            <input type="range" min="0" max="200" step="5" value={parseValue(currentStyles.filterBrightness, 100)} onChange={(e) => handleStyleChange('filterBrightness', e.target.value)} className="w-full cursor-ew-resize" />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Kontrast (Contrast)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.filterContrast ?? '100'}%</span>
            </div>
            <input type="range" min="0" max="200" step="5" value={parseValue(currentStyles.filterContrast, 100)} onChange={(e) => handleStyleChange('filterContrast', e.target.value)} className="w-full cursor-ew-resize" />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Nasycenie (Saturate)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.filterSaturate ?? '100'}%</span>
            </div>
            <input type="range" min="0" max="200" step="5" value={parseValue(currentStyles.filterSaturate, 100)} onChange={(e) => handleStyleChange('filterSaturate', e.target.value)} className="w-full cursor-ew-resize" />
          </div>
          
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Czerń i Biel (Grayscale)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.filterGrayscale ?? '0'}%</span>
            </div>
            <input type="range" min="0" max="100" step="1" value={parseValue(currentStyles.filterGrayscale, 0)} onChange={(e) => handleStyleChange('filterGrayscale', e.target.value)} className="w-full cursor-ew-resize" />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          <div className="flex justify-between items-center relative group">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Tryb (Blend Mode):</span>
            <div className="relative w-[130px]">
              <select value={currentStyles.mixBlendMode || 'normal'} onChange={(e) => handleStyleChange('mixBlendMode', e.target.value)} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                <option value="normal">Normal</option>
                <option value="multiply">Multiply</option>
                <option value="screen">Screen (Ekran)</option>
                <option value="overlay">Overlay</option>
                <option value="darken">Darken</option>
                <option value="lighten">Lighten</option>
                <option value="color-dodge">Color Dodge</option>
                <option value="difference">Difference</option>
                <option value="exclusion">Exclusion</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}