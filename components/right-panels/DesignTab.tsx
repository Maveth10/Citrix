import React from 'react';

export default function DesignTab({ activeBlock, updateActiveBlock }: any) {
  if (!activeBlock) return null;
  const { styles } = activeBlock;

  const handleStyleChange = (key: string, value: any) => {
    updateActiveBlock({ styles: { [key]: value } });
  };

  const handleSliderChange = (key: string, value: string, suffix: string = '') => {
    updateActiveBlock({ styles: { [key]: `${value}${suffix}` } });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      
      {/* TŁO (BACKGROUND) */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Tło (Background)</h4>
        <div className="flex flex-col gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-neutral-400 font-semibold">Kolor Tła:</span>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={styles.backgroundColor && styles.backgroundColor !== 'transparent' ? styles.backgroundColor.slice(0,7) : '#000000'} 
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} 
                className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
              <input 
                type="text" 
                value={styles.backgroundColor || 'transparent'} 
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} 
                className="w-20 bg-[#1c1c21] border border-white/10 text-center text-[11px] p-1.5 rounded focus:border-blue-500 outline-none text-white" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* KRAWĘDZIE (BORDERS) */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Krawędzie (Borders)</h4>
        <div className="flex flex-col gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
          <div>
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-neutral-400 font-semibold">Zaokrąglenie (Radius)</span>
              <span className="text-blue-400 font-bold">{styles.borderRadius || '0px'}</span>
            </div>
            <input 
              type="range" min="0" max="150" 
              value={parseInt(styles.borderRadius || '0')} 
              onChange={(e) => handleSliderChange('borderRadius', e.target.value, 'px')} 
              className="w-full accent-blue-500 cursor-ew-resize"
            />
          </div>
          
          <div className="w-full h-px bg-white/5 my-1"></div>
          
          <div className="flex justify-between items-center">
             <span className="text-[11px] text-neutral-400 font-semibold">Grubość Ramki:</span>
             <input type="text" value={styles.borderWidth || '0px'} onChange={(e) => handleStyleChange('borderWidth', e.target.value)} className="w-16 bg-[#1c1c21] border border-white/10 text-center text-[11px] p-1.5 rounded focus:border-blue-500 outline-none text-white" placeholder="1px" />
          </div>
          <div className="flex justify-between items-center">
             <span className="text-[11px] text-neutral-400 font-semibold">Kolor Ramki:</span>
             <div className="flex items-center gap-2">
                <input type="color" value={styles.borderColor || '#ffffff'} onChange={(e) => handleStyleChange('borderColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
             </div>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-[11px] text-neutral-400 font-semibold">Styl Ramki:</span>
             <select value={styles.borderStyle || 'solid'} onChange={(e) => handleStyleChange('borderStyle', e.target.value)} className="bg-[#1c1c21] border border-white/10 text-white text-[11px] rounded p-1.5 focus:border-blue-500 outline-none w-20">
                <option value="none">Brak</option>
                <option value="solid">Ciągła</option>
                <option value="dashed">Przerywana</option>
                <option value="dotted">Kropkowana</option>
             </select>
          </div>
        </div>
      </div>

      {/* EFEKTY WIZUALNE */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Efekty (Effects)</h4>
        <div className="flex flex-col gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
          
          <div>
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-neutral-400 font-semibold">Przezroczystość (Opacity)</span>
              <span className="text-blue-400 font-bold">{styles.opacity ?? '1'}</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.05" 
              value={styles.opacity ?? 1} 
              onChange={(e) => handleStyleChange('opacity', e.target.value)} 
              className="w-full accent-blue-500 cursor-ew-resize"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-neutral-400 font-semibold">Rozmycie Tła (Backdrop Blur)</span>
              <span className="text-blue-400 font-bold">{styles.filterBlur || '0'}px</span>
            </div>
            <input 
              type="range" min="0" max="50" step="1" 
              value={styles.filterBlur || 0} 
              onChange={(e) => handleStyleChange('filterBlur', e.target.value)} 
              className="w-full accent-blue-500 cursor-ew-resize"
            />
          </div>

          <div className="w-full h-px bg-white/5 my-1"></div>

          <div>
            <span className="text-[11px] text-neutral-400 font-semibold block mb-2">Cień (Box Shadow)</span>
            <select 
              value={styles.boxShadow || 'none'} 
              onChange={(e) => handleStyleChange('boxShadow', e.target.value)} 
              className="w-full bg-[#1c1c21] border border-white/10 text-white text-[11px] rounded p-2 focus:border-blue-500 outline-none"
            >
              <option value="none">Brak (None)</option>
              <option value="0 1px 2px 0 rgba(0, 0, 0, 0.05)">Delikatny (Sm)</option>
              <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">Średni (Md)</option>
              <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)">Duży (Lg)</option>
              <option value="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)">Ogromny (Xl)</option>
              <option value="0 25px 50px -12px rgba(0, 0, 0, 0.25)">Gigant (2xl)</option>
              <option value="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)">Wewnętrzny (Inset)</option>
            </select>
          </div>

        </div>
      </div>

    </div>
  );
}