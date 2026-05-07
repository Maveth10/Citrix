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

      {/* TŁO (BACKGROUND) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Tło (Background)</h4>
        
        <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm group hover:border-white/20 transition-all">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolor Tła:</span>
            
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                <input 
                  type="color" 
                  value={styles.backgroundColor && styles.backgroundColor !== 'transparent' ? styles.backgroundColor.slice(0,7) : '#000000'} 
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} 
                  className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
                />
              </div>
              <input 
                type="text" 
                value={styles.backgroundColor || 'transparent'} 
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} 
                className="w-24 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" 
              />
            </div>
          </div>
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
              value={parseInt(styles.borderRadius || '0')} 
              onChange={(e) => handleSliderChange('borderRadius', e.target.value, 'px')} 
              className="w-full cursor-ew-resize"
            />
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>
          
          <div className="flex justify-between items-center group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Grubość Ramki:</span>
             <input type="text" value={styles.borderWidth || '0px'} onChange={(e) => handleStyleChange('borderWidth', e.target.value)} className="w-16 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" placeholder="1px" />
          </div>
          
          <div className="flex justify-between items-center group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolor Ramki:</span>
             <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                <input type="color" value={styles.borderColor || '#ffffff'} onChange={(e) => handleStyleChange('borderColor', e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
             </div>
          </div>
          
          <div className="flex justify-between items-center relative group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Styl Ramki:</span>
             <div className="relative">
               <select value={styles.borderStyle || 'solid'} onChange={(e) => handleStyleChange('borderStyle', e.target.value)} className="appearance-none bg-black/40 hover:bg-black/60 border border-white/10 text-white font-bold text-[11px] rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none w-[110px] shadow-inner transition-colors cursor-pointer">
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

      {/* EFEKTY WIZUALNE */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Efekty (Effects)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Widoczność (Opacity)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{styles.opacity ?? '1'}</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.05" 
              value={styles.opacity ?? 1} 
              onChange={(e) => handleStyleChange('opacity', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Rozmycie (Blur)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{styles.filterBlur || '0'}px</span>
            </div>
            <input 
              type="range" min="0" max="50" step="1" 
              value={styles.filterBlur || 0} 
              onChange={(e) => handleStyleChange('filterBlur', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          <div className="relative group">
            <span className="text-[11px] text-neutral-400 font-semibold block mb-2 group-hover:text-white transition-colors">Cień (Box Shadow)</span>
            <div className="relative">
              <select 
                value={styles.boxShadow || 'none'} 
                onChange={(e) => handleStyleChange('boxShadow', e.target.value)} 
                className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white font-bold text-[11px] rounded-lg pl-3 pr-8 py-2.5 focus:border-[#ff4500] outline-none shadow-inner transition-colors cursor-pointer"
              >
                <option value="none">Brak (None)</option>
                <option value="0 1px 2px 0 rgba(0, 0, 0, 0.05)">Delikatny (Sm)</option>
                <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">Średni (Md)</option>
                <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)">Duży (Lg)</option>
                <option value="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)">Ogromny (Xl)</option>
                <option value="0 25px 50px -12px rgba(0, 0, 0, 0.25)">Gigant (2xl)</option>
                <option value="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)">Wewnętrzny (Inset)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">▼</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}