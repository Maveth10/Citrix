import React from 'react';

interface TextFormatToolbarProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
}

export default function TextFormatToolbar({ activeBlock, updateActiveBlock }: TextFormatToolbarProps) {
  if (!activeBlock || !['h1', 'h2', 'p', 'button', 'marquee', 'list', 'faq'].includes(activeBlock.type)) return null;

  // Słownik profesjonalnych fontów webowych
  const fonts = [
    { label: 'Systemowa (Domyślna)', value: 'inherit' },
    { label: 'Inter (Nowoczesna)', value: '"Inter", sans-serif' },
    { label: 'Arial (Klasyczna)', value: 'Arial, Helvetica, sans-serif' },
    { label: 'Times New Roman (Seryfowa)', value: '"Times New Roman", Times, serif' },
    { label: 'Courier New (Mono)', value: '"Courier New", Courier, monospace' },
    { label: 'Georgia (Elegancka)', value: 'Georgia, serif' },
    { label: 'Impact (Plakatowa)', value: 'Impact, fantasy' }
  ];

  return (
    <div className="h-12 bg-[#161616] border-b border-black flex items-center justify-center gap-3 text-xs z-[200] shadow-sm">
      
      {/* WYBÓR CZCIONKI */}
      <select 
        value={activeBlock.styles.fontFamily || 'inherit'} 
        onChange={(e) => updateActiveBlock({ styles: { fontFamily: e.target.value }})}
        className="bg-black text-white font-bold border border-neutral-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 cursor-pointer"
      >
        {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
      </select>

      <div className="w-px h-5 bg-neutral-800 mx-1"></div>

      {/* WYRÓWNANIE TEKSTU */}
      <div className="flex bg-black rounded border border-neutral-800 overflow-hidden">
        <button onClick={() => updateActiveBlock({ styles: { textAlign: 'left' }})} className={`px-3 py-1.5 hover:bg-neutral-800 transition ${activeBlock.styles.textAlign === 'left' ? 'text-blue-400 bg-neutral-800' : 'text-neutral-400'}`}>⫷</button>
        <div className="w-px bg-neutral-800"></div>
        <button onClick={() => updateActiveBlock({ styles: { textAlign: 'center' }})} className={`px-3 py-1.5 hover:bg-neutral-800 transition ${activeBlock.styles.textAlign === 'center' ? 'text-blue-400 bg-neutral-800' : 'text-neutral-400'}`}>⫼</button>
        <div className="w-px bg-neutral-800"></div>
        <button onClick={() => updateActiveBlock({ styles: { textAlign: 'right' }})} className={`px-3 py-1.5 hover:bg-neutral-800 transition ${activeBlock.styles.textAlign === 'right' ? 'text-blue-400 bg-neutral-800' : 'text-neutral-400'}`}>⫸</button>
      </div>
      
      <div className="w-px h-5 bg-neutral-800 mx-1"></div>
      
      {/* KOLOR TEKSTU */}
      <div className="flex items-center gap-2 bg-black px-2 py-1 rounded border border-neutral-800">
        <span className="text-neutral-500">Kolor:</span>
        <input type="color" value={activeBlock.styles.color || '#000000'} onChange={(e) => updateActiveBlock({ styles: { color: e.target.value }})} className="w-6 h-6 p-0 border-0 bg-transparent cursor-pointer rounded overflow-hidden" title="Kolor tekstu"/>
      </div>
      
      <div className="w-px h-5 bg-neutral-800 mx-1"></div>
      
      {/* ROZMIAR TEKSTU */}
      <div className="flex items-center gap-1 bg-black px-2 py-1.5 rounded border border-neutral-800">
        <span className="text-neutral-500">Wielkość:</span>
        <input type="text" value={activeBlock.styles.fontSize || '16px'} onChange={(e) => updateActiveBlock({ styles: { fontSize: e.target.value }})} className="w-14 bg-transparent text-white font-mono outline-none text-center" placeholder="np. 24px" />
      </div>

    </div>
  );
}