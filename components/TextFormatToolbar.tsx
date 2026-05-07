import React from 'react';

interface TextFormatToolbarProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
}

export default function TextFormatToolbar({ activeBlock, updateActiveBlock }: TextFormatToolbarProps) {
  if (!activeBlock || !['h1', 'h2', 'p', 'button', 'marquee', 'list', 'faq'].includes(activeBlock.type)) return null;

  // Pogrupowany słownik potężnych fontów
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

  return (
    <div className="flex items-center justify-center gap-2 px-6 py-3 border-b border-white/5 bg-[rgba(8,8,12,0.6)] backdrop-blur-[24px] saturate-[150%] relative z-40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">      
      
      {/* WYBÓR CZCIONKI */}
      <div className="relative group">
        <select 
          value={activeBlock.styles.fontFamily || 'inherit'} 
          onChange={(e) => updateActiveBlock({ styles: { fontFamily: e.target.value }})}
          className="appearance-none bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 hover:border-white/20 rounded-lg pl-4 pr-8 py-2 outline-none focus:border-[#ff4500] cursor-pointer transition-all shadow-inner"
        >
          {fontGroups.map((group, gIdx) => (
            <optgroup key={gIdx} label={group.label} className="bg-[#0f0f13] text-neutral-400 font-semibold italic">
              {group.options.map(f => (
                <option key={f.value} value={f.value} className="bg-[#1a1a24] text-white not-italic font-normal">{f.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-white transition-colors text-[10px]">▼</div>
      </div>

      <div className="w-px h-6 bg-white/10 mx-2"></div>

      {/* WYRÓWNANIE TEKSTU */}
      <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shadow-inner p-0.5 gap-0.5">
        <button onClick={() => updateActiveBlock({ styles: { textAlign: 'left' }})} className={`px-3 py-1.5 rounded-md transition-all text-xs ${activeBlock.styles.textAlign === 'left' ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>⫷</button>
        <button onClick={() => updateActiveBlock({ styles: { textAlign: 'center' }})} className={`px-3 py-1.5 rounded-md transition-all text-xs ${activeBlock.styles.textAlign === 'center' || !activeBlock.styles.textAlign ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>⫼</button>
        <button onClick={() => updateActiveBlock({ styles: { textAlign: 'right' }})} className={`px-3 py-1.5 rounded-md transition-all text-xs ${activeBlock.styles.textAlign === 'right' ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>⫸</button>
      </div>
      
      <div className="w-px h-6 bg-white/10 mx-2"></div>
      
      {/* KOLOR TEKSTU */}
      <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all shadow-inner">
        <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Kolor</span>
        <div className="relative w-5 h-5 rounded-md overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform">
          <input type="color" value={activeBlock.styles.color || '#000000'} onChange={(e) => updateActiveBlock({ styles: { color: e.target.value }})} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" title="Kolor tekstu"/>
        </div>
      </div>
      
      <div className="w-px h-6 bg-white/10 mx-2"></div>
      
      {/* ROZMIAR TEKSTU */}
      <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all shadow-inner focus-within:border-blue-500">
        <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Rozmiar</span>
        <input type="text" value={activeBlock.styles.fontSize || '16px'} onChange={(e) => updateActiveBlock({ styles: { fontSize: e.target.value }})} className="w-12 bg-transparent text-white font-mono font-bold outline-none text-center text-xs" placeholder="16px" />
      </div>

    </div>
  );
}