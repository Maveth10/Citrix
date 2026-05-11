import React from 'react';

export default function TextTab({ currentStyles, handleStyleChange }: any) {
  if (!currentStyles) return null;

  const handleSliderChange = (key: string, value: string, suffix: string = '') => {
    handleStyleChange(key, `${value}${suffix}`);
  };

  // Zunifikowany słownik fontów z podziałem na grupy
  const fontGroups = [
    {
      label: 'Systemowe',
      options: [
        { label: 'Domyślna (Dziedziczona)', value: 'inherit' },
        { label: 'Systemowa Sans-serif', value: 'system-ui, -apple-system, sans-serif' },
        { label: 'Systemowa Serif', value: 'ui-serif, Georgia, serif' },
        { label: 'Systemowa Mono', value: 'ui-monospace, monospace' },
      ]
    },
    {
      label: 'Klasyczne (Web-safe)',
      options: [
        { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
        { label: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
        { label: 'Book Antiqua', value: '"Book Antiqua", Palatino, serif' },
        { label: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
        { label: 'Courier New', value: '"Courier New", Courier, monospace' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
        { label: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
        { label: 'Lucida Sans', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
        { label: 'Palatino', value: 'Palatino, "Palatino Linotype", serif' },
        { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
        { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
        { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
        { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
      ]
    },
    {
      label: 'Nowoczesne (Google Fonts)',
      options: [
        { label: 'Inter', value: '"Inter", sans-serif' },
        { label: 'Lato', value: '"Lato", sans-serif' },
        { label: 'Montserrat', value: '"Montserrat", sans-serif' },
        { label: 'Open Sans', value: '"Open Sans", sans-serif' },
        { label: 'Oswald', value: '"Oswald", sans-serif' },
        { label: 'Playfair Display', value: '"Playfair Display", serif' },
        { label: 'Poppins', value: '"Poppins", sans-serif' },
        { label: 'Raleway', value: '"Raleway", sans-serif' },
        { label: 'Roboto', value: '"Roboto", sans-serif' },
        { label: 'Source Sans Pro', value: '"Source Sans Pro", sans-serif' },
      ]
    }
  ];

  const weights = [
    { label: 'Lekka (300)', value: '300' },
    { label: 'Zwykła (400)', value: '400' },
    { label: 'Średnia (500)', value: '500' },
    { label: 'Półgruba (600)', value: '600' },
    { label: 'Gruba (700)', value: '700' },
    { label: 'Czarna (900)', value: '900' }
  ];

  const parseValue = (val: string, fallback: number) => {
    if (!val) return fallback;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* STYLE DLA SUWAKÓW */}
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range] { -webkit-appearance: none; background: rgba(255, 255, 255, 0.05); height: 4px; border-radius: 4px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #ff4500; cursor: pointer; box-shadow: 0 0 10px rgba(255, 69, 0, 0.5); transition: transform 0.1s; }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
      `}} />

      {/* TYPOGRAFIA BAZOWA */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Czcionka (Font)</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="flex justify-between items-center relative group">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Krój:</span>
            <div className="relative w-[150px]">
              <select value={currentStyles.fontFamily || 'inherit'} onChange={(e) => handleStyleChange('fontFamily', e.target.value)} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner truncate">
                {fontGroups.map((group, gIdx) => (
                  <optgroup key={gIdx} label={group.label} className="bg-[#0f0f13] text-neutral-400 font-semibold italic">
                    {group.options.map(f => (
                      <option key={f.value} value={f.value} className="bg-[#1a1a24] text-white not-italic font-normal">{f.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
            </div>
          </div>

          <div className="flex justify-between items-center relative group">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Grubość:</span>
            <div className="relative w-[150px]">
              <select value={currentStyles.fontWeight || 'inherit'} onChange={(e) => handleStyleChange('fontWeight', e.target.value)} className="appearance-none w-full bg-black/40 hover:bg-black/60 border border-white/10 text-white text-[11px] font-bold rounded-lg pl-3 pr-8 py-1.5 focus:border-[#ff4500] outline-none transition-all cursor-pointer shadow-inner">
                <option value="inherit" className="bg-[#0f0f13] text-white">Domyślna</option>
                {weights.map(w => <option key={w.value} value={w.value} className="bg-[#0f0f13] text-white">{w.label}</option>)}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">▼</div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          <div className="flex justify-between items-center group">
             <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Kolor Tekstu:</span>
             <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                  <input type="color" value={currentStyles.color?.includes('#') ? currentStyles.color.slice(0,7) : '#ffffff'} onChange={(e) => handleStyleChange('color', e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
                </div>
                <input type="text" value={currentStyles.color || 'inherit'} onChange={(e) => handleStyleChange('color', e.target.value)} className="w-20 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner transition-colors" />
             </div>
          </div>

        </div>
      </div>

      {/* ROZMIAR I ODSTĘPY */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Rozmiar i Odstępy</h4>
        
        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
          
          <div className="flex justify-between items-center group">
            <span className="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition-colors">Wielkość (Size):</span>
            <input type="text" value={currentStyles.fontSize || 'inherit'} onChange={(e) => handleStyleChange('fontSize', e.target.value)} className="w-24 bg-black/40 hover:bg-black/60 border border-white/10 text-center font-mono font-bold text-[11px] p-1.5 rounded-lg focus:border-[#ff4500] outline-none text-white transition-all shadow-inner" placeholder="np. 16px" />
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Interlinia (Line Height)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.lineHeight || '1.5'}</span>
            </div>
            <input 
              type="range" min="0.8" max="3" step="0.1" 
              value={parseValue(currentStyles.lineHeight, 1.5)} 
              onChange={(e) => handleSliderChange('lineHeight', e.target.value)} 
              className="w-full cursor-ew-resize"
            />
          </div>

          <div className="group">
            <div className="flex justify-between text-[11px] mb-3">
              <span className="text-neutral-400 font-semibold group-hover:text-white transition-colors">Odstęp Liter (Spacing)</span>
              <span className="text-[#ff4500] font-mono font-bold bg-[#ff4500]/10 px-2 rounded">{currentStyles.letterSpacing || '0em'}</span>
            </div>
            <input 
              type="range" min="-0.1" max="0.5" step="0.01" 
              value={parseValue(currentStyles.letterSpacing, 0)} 
              onChange={(e) => handleSliderChange('letterSpacing', e.target.value, 'em')} 
              className="w-full cursor-ew-resize"
            />
          </div>

        </div>
      </div>

      {/* FORMATOWANIE I DEKORACJA */}
      <div className="space-y-4">
         <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Formatowanie</h4>
         
         <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
            
            {/* WYRÓWNANIE */}
            <div>
              <span className="text-[10px] text-neutral-500 block mb-2 font-bold uppercase tracking-wider">Wyrównanie</span>
              <div className="flex bg-black/40 rounded-lg border border-white/10 overflow-hidden shadow-inner p-1 gap-1">
                <button onClick={() => handleStyleChange('textAlign', 'left')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${currentStyles.textAlign === 'left' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>Lewo</button>
                <button onClick={() => handleStyleChange('textAlign', 'center')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${currentStyles.textAlign === 'center' || !currentStyles.textAlign ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>Środek</button>
                <button onClick={() => handleStyleChange('textAlign', 'right')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${currentStyles.textAlign === 'right' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>Prawo</button>
                <button onClick={() => handleStyleChange('textAlign', 'justify')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${currentStyles.textAlign === 'justify' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>Justuj</button>
              </div>
            </div>

            {/* WIELKOŚĆ LITER */}
            <div>
              <span className="text-[10px] text-neutral-500 block mb-2 font-bold uppercase tracking-wider">Wielkość liter</span>
              <div className="flex bg-black/40 rounded-lg border border-white/10 overflow-hidden shadow-inner p-1 gap-1">
                <button onClick={() => handleStyleChange('textTransform', 'none')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${!currentStyles.textTransform || currentStyles.textTransform === 'none' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>Aa</button>
                <button onClick={() => handleStyleChange('textTransform', 'uppercase')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${currentStyles.textTransform === 'uppercase' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>AA</button>
                <button onClick={() => handleStyleChange('textTransform', 'lowercase')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${currentStyles.textTransform === 'lowercase' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>aa</button>
              </div>
            </div>

            {/* DEKORACJA */}
            <div>
              <span className="text-[10px] text-neutral-500 block mb-2 font-bold uppercase tracking-wider">Dekoracja</span>
              <div className="flex bg-black/40 rounded-lg border border-white/10 overflow-hidden shadow-inner p-1 gap-1">
                <button onClick={() => handleStyleChange('textDecoration', 'none')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold ${!currentStyles.textDecoration || currentStyles.textDecoration === 'none' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>Brak</button>
                <button onClick={() => handleStyleChange('textDecoration', 'underline')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold underline ${currentStyles.textDecoration === 'underline' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>U</button>
                <button onClick={() => handleStyleChange('textDecoration', 'line-through')} className={`flex-1 py-1.5 rounded-md transition-all text-[11px] font-bold line-through ${currentStyles.textDecoration === 'line-through' ? 'text-white bg-white/10 shadow-sm' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>S</button>
              </div>
            </div>

         </div>
      </div>

      {/* 🔴 NOWOŚĆ: CIEŃ TEKSTU 🔴 */}
      <div className="space-y-4 mb-10">
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Efekty Tekstu (Shadow)</h4>
        
        <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
           <input 
             type="text" 
             value={currentStyles.textShadow || 'none'} 
             onChange={(e) => handleStyleChange('textShadow', e.target.value)} 
             className="w-full bg-black/40 border border-white/10 font-mono font-bold text-[11px] p-2 rounded-lg focus:border-[#ff4500] outline-none text-white shadow-inner" 
             placeholder="0 2px 4px rgba(0,0,0,0.5)" 
           />
           
           <div className="flex flex-wrap gap-2 mt-1">
             <button onClick={() => handleStyleChange('textShadow', 'none')} className="px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-neutral-400 transition-colors">Brak</button>
             <button onClick={() => handleStyleChange('textShadow', '0 2px 4px rgba(0,0,0,0.5)')} className="px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-white transition-colors">Delikatny</button>
             <button onClick={() => handleStyleChange('textShadow', '0 4px 10px rgba(0,0,0,0.8)')} className="px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-white transition-colors">Mocny</button>
             <button onClick={() => handleStyleChange('textShadow', '0 0 10px rgba(255, 69, 0, 0.8), 0 0 20px rgba(255, 69, 0, 0.4)')} className="px-3 py-1.5 bg-[#ff4500]/10 hover:bg-[#ff4500]/20 border border-[#ff4500]/30 rounded-lg text-[10px] text-[#ff4500] transition-colors">Glow (Neon)</button>
           </div>
           <p className="text-[9px] text-neutral-500 mt-2 leading-tight">Cień tekstu jest przydatny, aby napis był czytelny na jasnych lub wzorzystych tłach.</p>
        </div>
      </div>

    </div>
  );
}