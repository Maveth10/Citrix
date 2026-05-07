import React from 'react';

export default function EffectsTab({ activeBlock, updateActiveBlock }: any) {
  if (!activeBlock) return null;
  const { styles, hoverStyles = {}, entranceAnim = 'none' } = activeBlock;

  const handleStyleChange = (key: string, value: any) => {
    updateActiveBlock({ styles: { [key]: value } });
  };

  const handleHoverChange = (key: string, value: any) => {
    updateActiveBlock({ hoverStyles: { [key]: value } });
  };

  const handleTopLevelChange = (key: string, value: any) => {
    updateActiveBlock({ [key]: value });
  };

  const parseValue = (val: any, fallback: number) => {
    if (val === undefined || val === null) return fallback;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* STYLE DLA SUWAKÓW */}
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range] {
          -webkit-appearance: none;
          background: rgba(255, 255, 255, 0.05);
          height: 4px;
          border-radius: 4px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ff4500;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}} />

      {/* ANIMACJE WEJŚCIA */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Wejście (Entrance)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          <div className="flex justify-between items-center relative group">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Animacja:</span>
            <div className="relative w-[150px]">
              <select 
                value={entranceAnim} 
                onChange={(e) => handleTopLevelChange('entranceAnim', e.target.value)} 
                className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="none">Brak</option>
                <option value="fade-in">Przenikanie (Fade In)</option>
                <option value="slide-up">Wjazd z dołu (Slide Up)</option>
                <option value="zoom-in">Powiększenie (Zoom In)</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERAKCJE (HOVER) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Najazd Myszki (Hover)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Skalowanie (Scale)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{hoverStyles.scale || '1'}x</span>
            </div>
            <input 
              type="range" min="0.8" max="1.5" step="0.05" 
              value={parseValue(hoverStyles.scale, 1)} 
              onChange={(e) => handleHoverChange('scale', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Lewitacja (Translate Y)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{hoverStyles.translateY || '0'}px</span>
            </div>
            <input 
              type="range" min="-30" max="30" step="1" 
              value={parseValue(hoverStyles.translateY, 0)} 
              onChange={(e) => handleHoverChange('translateY', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          <div className="flex justify-between items-center group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Zmień kolor tła:</span>
             <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                  <input type="color" value={hoverStyles.backgroundColor?.includes('#') ? hoverStyles.backgroundColor.slice(0,7) : '#000000'} onChange={(e) => handleHoverChange('backgroundColor', e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
                </div>
                <input type="text" value={hoverStyles.backgroundColor || ''} onChange={(e) => handleHoverChange('backgroundColor', e.target.value)} placeholder="HEX / Brak" className="w-20 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" />
             </div>
          </div>

        </div>
      </div>

      {/* FILTRY I MIESZANIE (BLENDING) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Filtry i Mieszanie</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Jasność (Brightness)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{styles.filterBrightness ?? '100'}%</span>
            </div>
            <input 
              type="range" min="0" max="200" step="5" 
              value={parseValue(styles.filterBrightness, 100)} 
              onChange={(e) => handleStyleChange('filterBrightness', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Kontrast (Contrast)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{styles.filterContrast ?? '100'}%</span>
            </div>
            <input 
              type="range" min="0" max="200" step="5" 
              value={parseValue(styles.filterContrast, 100)} 
              onChange={(e) => handleStyleChange('filterContrast', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          <div className="flex justify-between items-center relative group">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Tryb (Blend Mode):</span>
            <div className="relative w-[130px]">
              <select 
                value={styles.mixBlendMode || 'normal'} 
                onChange={(e) => handleStyleChange('mixBlendMode', e.target.value)} 
                className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-2 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="normal">Normal</option>
                <option value="multiply">Multiply (Mnożenie)</option>
                <option value="screen">Screen (Ekran)</option>
                <option value="overlay">Overlay (Nakładka)</option>
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