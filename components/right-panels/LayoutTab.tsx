import React from 'react';

export default function LayoutTab({ activeBlock, updateActiveBlock }: any) {
  if (!activeBlock) return null;
  const { styles } = activeBlock;

  const handleStyleChange = (key: string, value: any) => {
    updateActiveBlock({ styles: { [key]: value } });
  };

  // Specjalna funkcja dla Margin/Padding, aby bezpiecznie nadpisywać poszczególne strony
  const handleBoxModelChange = (property: 'margin' | 'padding', side: 'Top' | 'Right' | 'Bottom' | 'Left', value: string) => {
    const key = `${property}${side}`;
    updateActiveBlock({ styles: { [key]: value } });
  };

  // Funkcja wyciągająca wartość konkretnego marginesu/paddingu z obiektu styles
  const getBoxValue = (property: 'margin' | 'padding', side: 'Top' | 'Right' | 'Bottom' | 'Left') => {
    const key = `${property}${side}`;
    return styles[key] || '';
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* ==================== 1. FLEXBOX / GRID / UKŁAD ==================== */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Układ (Display)</h4>
        
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 shadow-inner">
           <button onClick={() => handleStyleChange('display', styles.display === 'flex' ? 'block' : 'flex')} className={`flex-1 p-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-300 ${styles.display === 'flex' ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]' : 'bg-transparent text-neutral-500 hover:text-white'}`}>FLEX</button>
           <button onClick={() => handleStyleChange('display', styles.display === 'grid' ? 'block' : 'grid')} className={`flex-1 p-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-300 ${styles.display === 'grid' ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]' : 'bg-transparent text-neutral-500 hover:text-white'}`}>GRID</button>
           <button onClick={() => handleStyleChange('display', styles.display === 'block' ? 'flex' : 'block')} className={`flex-1 p-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-300 ${(!styles.display || styles.display === 'block' || styles.display === 'inline-block') ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]' : 'bg-transparent text-neutral-500 hover:text-white'}`}>BLOCK</button>
        </div>
        
        {/* Właściwości dla FLEXBOXA */}
        {styles.display === 'flex' && (
          <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center relative group">
              <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kierunek:</span>
              <div className="relative">
                <select value={styles.flexDirection || 'row'} onChange={(e) => handleStyleChange('flexDirection', e.target.value)} className="appearance-none bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                  <option value="row">Poziomo (Row)</option>
                  <option value="column">Pionowo (Col)</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center relative group">
              <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Wyrównaj X:</span>
              <div className="relative">
                <select value={styles.justifyContent || 'flex-start'} onChange={(e) => handleStyleChange('justifyContent', e.target.value)} className="appearance-none w-[110px] bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                  <option value="flex-start">Start</option>
                  <option value="center">Środek</option>
                  <option value="flex-end">Koniec</option>
                  <option value="space-between">Rozstrzel</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
              </div>
            </div>

            <div className="flex justify-between items-center relative group">
              <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Wyrównaj Y:</span>
              <div className="relative">
                <select value={styles.alignItems || 'flex-start'} onChange={(e) => handleStyleChange('alignItems', e.target.value)} className="appearance-none w-[110px] bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                  <option value="flex-start">Start</option>
                  <option value="center">Środek</option>
                  <option value="flex-end">Koniec</option>
                  <option value="stretch">Rozciągnij</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center group mt-2 pt-3 border-t border-white/10">
               <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Odstęp (Gap):</span>
               <input type="text" value={styles.gap || '0px'} onChange={(e) => handleStyleChange('gap', e.target.value)} className="w-16 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white transition-all shadow-inner" placeholder="20px" />
            </div>
          </div>
        )}

        {/* Właściwości dla CSS GRID */}
        {styles.display === 'grid' && (
          <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center group">
               <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolumny:</span>
               <input type="text" value={styles.gridTemplateColumns || ''} onChange={(e) => handleStyleChange('gridTemplateColumns', e.target.value)} className="w-24 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white transition-all shadow-inner" placeholder="1fr 1fr" />
            </div>
            <div className="flex justify-between items-center group">
               <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Wiersze:</span>
               <input type="text" value={styles.gridTemplateRows || ''} onChange={(e) => handleStyleChange('gridTemplateRows', e.target.value)} className="w-24 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white transition-all shadow-inner" placeholder="auto" />
            </div>
            <div className="flex justify-between items-center group mt-2 pt-3 border-t border-white/10">
               <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Odstęp (Gap):</span>
               <input type="text" value={styles.gap || '0px'} onChange={(e) => handleStyleChange('gap', e.target.value)} className="w-16 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white transition-all shadow-inner" placeholder="20px" />
            </div>
          </div>
        )}
      </div>

      {/* ==================== 2. WYMIARY ==================== */}
      <div className="space-y-4">
         <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Wymiary (Size)</h4>
         
         <div className="grid grid-cols-2 gap-3">
           <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-sm group hover:border-white/20 transition-all">
             <span className="text-[10px] text-neutral-500 block mb-2 font-bold uppercase tracking-wider group-hover:text-neutral-300 transition-colors">Szerokość (W)</span>
             <input type="text" value={styles.width || 'auto'} onChange={(e) => handleStyleChange('width', e.target.value)} className="w-full bg-black/40 border border-white/10 text-white font-mono font-bold text-[11px] p-2 rounded-lg focus:border-[#ff4500] outline-none transition-colors shadow-inner" />
           </div>
           <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-sm group hover:border-white/20 transition-all">
             <span className="text-[10px] text-neutral-500 block mb-2 font-bold uppercase tracking-wider group-hover:text-neutral-300 transition-colors">Wysokość (H)</span>
             <input type="text" value={styles.height || 'auto'} onChange={(e) => handleStyleChange('height', e.target.value)} className="w-full bg-black/40 border border-white/10 text-white font-mono font-bold text-[11px] p-2 rounded-lg focus:border-[#ff4500] outline-none transition-colors shadow-inner" />
           </div>
         </div>

         {/* MANUALNA KONTROLA CLEAR ROW */}
         <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm group hover:border-white/20 transition-all">
            <div>
              <span className="text-[11px] text-neutral-300 font-bold block mb-0.5 group-hover:text-white transition-colors">Blokuj Linię (Clear Row)</span>
              <span className="text-[9px] text-neutral-500 block leading-tight">Łamie wiersz i zrzuca<br/>inne elementy w dół.</span>
            </div>
            <button 
              onClick={() => handleStyleChange('clearRow', styles.clearRow === false ? true : false)} 
              className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner border border-white/10 ${styles.clearRow !== false ? 'bg-gradient-to-r from-[#ff4500] to-orange-500 shadow-[0_0_15px_rgba(255,69,0,0.3)]' : 'bg-black/50'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${styles.clearRow !== false ? 'left-7' : 'left-1 opacity-50'}`}></div>
            </button>
         </div>
      </div>

      {/* ==================== 3. WIZUALNY BOX MODEL (MARGIN / PADDING) ==================== */}
      <div className="space-y-4 mb-10">
         <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Przestrzeń (Box Model)</h4>
         
         <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm flex flex-col gap-6">
            
            {/* WIZUALNY MARGINES */}
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-3 text-center">Margines zewn. (Margin)</span>
              <div className="grid grid-cols-3 gap-1 w-[160px] mx-auto items-center justify-items-center">
                <div></div>
                <input type="text" value={getBoxValue('margin', 'Top')} onChange={(e) => handleBoxModelChange('margin', 'Top', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Margin Top" />
                <div></div>
                
                <input type="text" value={getBoxValue('margin', 'Left')} onChange={(e) => handleBoxModelChange('margin', 'Left', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Margin Left" />
                <div className="w-10 h-10 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[8px] text-neutral-500 font-bold">Z</div>
                <input type="text" value={getBoxValue('margin', 'Right')} onChange={(e) => handleBoxModelChange('margin', 'Right', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Margin Right" />
                
                <div></div>
                <input type="text" value={getBoxValue('margin', 'Bottom')} onChange={(e) => handleBoxModelChange('margin', 'Bottom', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Margin Bottom" />
                <div></div>
              </div>
            </div>

            <div className="w-full h-px bg-white/5"></div>

            {/* WIZUALNY PADDING */}
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-3 text-center">Odstęp wewn. (Padding)</span>
              <div className="grid grid-cols-3 gap-1 w-[160px] mx-auto items-center justify-items-center">
                <div></div>
                <input type="text" value={getBoxValue('padding', 'Top')} onChange={(e) => handleBoxModelChange('padding', 'Top', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Padding Top" />
                <div></div>
                
                <input type="text" value={getBoxValue('padding', 'Left')} onChange={(e) => handleBoxModelChange('padding', 'Left', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Padding Left" />
                <div className="w-10 h-10 border border-white/10 bg-white/5 rounded flex items-center justify-center text-[8px] text-[#ff4500] font-bold">W</div>
                <input type="text" value={getBoxValue('padding', 'Right')} onChange={(e) => handleBoxModelChange('padding', 'Right', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Padding Right" />
                
                <div></div>
                <input type="text" value={getBoxValue('padding', 'Bottom')} onChange={(e) => handleBoxModelChange('padding', 'Bottom', e.target.value)} placeholder="0" className="w-12 bg-black/60 border border-white/10 text-center font-mono font-bold text-[10px] py-1 rounded focus:border-[#ff4500] outline-none text-white" title="Padding Bottom" />
                <div></div>
              </div>
            </div>

         </div>
      </div>

    </div>
  );
}