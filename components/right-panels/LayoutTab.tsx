import React from 'react';

export default function LayoutTab({ activeBlock, updateActiveBlock }: any) {
  if (!activeBlock) return null;
  const { styles } = activeBlock;

  const handleStyleChange = (key: string, value: any) => {
    updateActiveBlock({ styles: { [key]: value } });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      
      {/* FLEXBOX / UKŁAD */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Układ (Display)</h4>
        <div className="flex gap-2">
           <button onClick={() => handleStyleChange('display', styles.display === 'flex' ? 'block' : 'flex')} className={`flex-1 p-2 rounded-lg text-[11px] font-bold transition-all ${styles.display === 'flex' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}`}>FLEX</button>
           <button onClick={() => handleStyleChange('display', styles.display === 'grid' ? 'block' : 'grid')} className={`flex-1 p-2 rounded-lg text-[11px] font-bold transition-all ${styles.display === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}`}>GRID</button>
           <button onClick={() => handleStyleChange('display', styles.display === 'block' ? 'flex' : 'block')} className={`flex-1 p-2 rounded-lg text-[11px] font-bold transition-all ${(!styles.display || styles.display === 'block') ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}`}>BLOCK</button>
        </div>
        
        {styles.display === 'flex' && (
          <div className="flex flex-col gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold">Kierunek:</span>
              <select value={styles.flexDirection || 'row'} onChange={(e) => handleStyleChange('flexDirection', e.target.value)} className="bg-[#1c1c21] border border-white/10 text-white text-[11px] rounded p-1.5 focus:border-blue-500 outline-none">
                <option value="row">Poziomo (Row) →</option>
                <option value="column">Pionowo (Col) ↓</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold">Wyrównaj X:</span>
              <select value={styles.justifyContent || 'flex-start'} onChange={(e) => handleStyleChange('justifyContent', e.target.value)} className="bg-[#1c1c21] border border-white/10 text-white text-[11px] rounded p-1.5 focus:border-blue-500 outline-none w-[110px]">
                <option value="flex-start">Start</option>
                <option value="center">Środek</option>
                <option value="flex-end">Koniec</option>
                <option value="space-between">Rozstrzel</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold">Wyrównaj Y:</span>
              <select value={styles.alignItems || 'flex-start'} onChange={(e) => handleStyleChange('alignItems', e.target.value)} className="bg-[#1c1c21] border border-white/10 text-white text-[11px] rounded p-1.5 focus:border-blue-500 outline-none w-[110px]">
                <option value="flex-start">Start</option>
                <option value="center">Środek</option>
                <option value="flex-end">Koniec</option>
                <option value="stretch">Rozciągnij</option>
              </select>
            </div>
            <div className="w-full h-px bg-white/5 my-1"></div>
            <div className="flex justify-between items-center">
               <span className="text-[11px] text-neutral-400 font-semibold">Odstęp (Gap):</span>
               <input type="text" value={styles.gap || '0px'} onChange={(e) => handleStyleChange('gap', e.target.value)} className="w-16 bg-[#1c1c21] border border-white/10 text-center text-[11px] p-1.5 rounded focus:border-blue-500 outline-none text-white" placeholder="20px" />
            </div>
          </div>
        )}
      </div>

      {/* WYMIARY */}
      <div className="space-y-3">
         <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Wymiary (Size)</h4>
         <div className="grid grid-cols-2 gap-3">
           <div>
             <span className="text-[10px] text-neutral-400 block mb-1 font-semibold">Szerokość (W)</span>
             <input type="text" value={styles.width || 'auto'} onChange={(e) => handleStyleChange('width', e.target.value)} className="w-full bg-[#1c1c21] border border-white/10 text-white text-[11px] p-2 rounded-lg focus:border-blue-500 outline-none" />
           </div>
           <div>
             <span className="text-[10px] text-neutral-400 block mb-1 font-semibold">Wysokość (H)</span>
             <input type="text" value={styles.height || 'auto'} onChange={(e) => handleStyleChange('height', e.target.value)} className="w-full bg-[#1c1c21] border border-white/10 text-white text-[11px] p-2 rounded-lg focus:border-blue-500 outline-none" />
           </div>
         </div>

         {/* FIX V18.56: MANUALNA KONTROLA CLEAR ROW */}
         <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5 mt-3">
            <div>
              <span className="text-[11px] text-neutral-200 font-bold block">Blokuj Linię (Clear Row)</span>
              <span className="text-[9px] text-neutral-500 block">Łamie wiersz i zrzuca inne elementy w dół.</span>
            </div>
            <button 
              onClick={() => handleStyleChange('clearRow', styles.clearRow === false ? true : false)} 
              className={`w-10 h-6 rounded-full relative transition-colors border border-white/10 ${styles.clearRow !== false ? 'bg-blue-600' : 'bg-black/50'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${styles.clearRow !== false ? 'left-5 bg-white' : 'left-1 bg-neutral-500'}`}></div>
            </button>
         </div>
      </div>

      {/* BOX MODEL (MARGIN / PADDING) */}
      <div className="space-y-3">
         <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Przestrzeń (Box Model)</h4>
         <div className="flex flex-col gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold">Margines (Zewnątrz):</span>
              <input type="text" value={styles.margin || '0px'} onChange={(e) => handleStyleChange('margin', e.target.value)} className="w-24 bg-[#1c1c21] border border-white/10 text-center text-[11px] p-1.5 rounded focus:border-blue-500 outline-none text-white" placeholder="0 0 15px 0" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-400 font-semibold">Padding (Wewnątrz):</span>
              <input type="text" value={styles.padding || '0px'} onChange={(e) => handleStyleChange('padding', e.target.value)} className="w-24 bg-[#1c1c21] border border-white/10 text-center text-[11px] p-1.5 rounded focus:border-blue-500 outline-none text-white" placeholder="20px" />
            </div>
         </div>
      </div>

    </div>
  );
}