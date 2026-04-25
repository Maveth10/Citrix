import React from 'react';

interface TextFormatToolbarProps { activeBlock: any; updateActiveBlock: (u: any) => void; }

export default function TextFormatToolbar({ activeBlock, updateActiveBlock }: TextFormatToolbarProps) {
  if (!activeBlock || !['h1', 'h2', 'p', 'button', 'marquee', 'faq', 'list', 'menu', 'social'].includes(activeBlock.type)) return null;

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-white border border-neutral-200 shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-lg flex items-center px-2 py-1.5 gap-1 text-black animate-in fade-in slide-in-from-top-4">
      <select value={activeBlock.type} onChange={e => updateActiveBlock({ type: e.target.value })} className="text-xs bg-transparent outline-none cursor-pointer p-1.5 font-bold border-r border-neutral-200 hover:bg-neutral-50 rounded">
        <option value="h1">Tytuł (H1)</option><option value="h2">Nagłówek (H2)</option><option value="p">Akapit (P)</option><option value="button">Przycisk</option>
      </select>
      <div className="flex items-center border-r border-neutral-200 px-2"><input type="text" value={activeBlock.styles.fontSize || '16px'} onChange={e => updateActiveBlock({ styles: { fontSize: e.target.value }})} className="w-12 text-xs text-center outline-none bg-neutral-100 rounded py-1" /></div>
      <button onMouseDown={e => {e.preventDefault(); document.execCommand('bold');}} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded font-black text-sm">B</button>
      <button onMouseDown={e => {e.preventDefault(); document.execCommand('italic');}} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded italic font-serif text-sm">I</button>
      <button onMouseDown={e => {e.preventDefault(); document.execCommand('underline');}} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded underline text-sm">U</button>
      <div className="w-[1px] h-5 bg-neutral-200 mx-1"></div>
      <button onClick={() => updateActiveBlock({ styles: { textAlign: 'left', justifyContent: 'flex-start' }})} className={`w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded text-sm ${activeBlock.styles.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : ''}`}>⇤</button>
      <button onClick={() => updateActiveBlock({ styles: { textAlign: 'center', justifyContent: 'center' }})} className={`w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded text-sm ${activeBlock.styles.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : ''}`}>⇥⇤</button>
      <button onClick={() => updateActiveBlock({ styles: { textAlign: 'right', justifyContent: 'flex-end' }})} className={`w-8 h-8 flex items-center justify-center hover:bg-neutral-200 rounded text-sm ${activeBlock.styles.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : ''}`}>⇥</button>
      <div className="w-[1px] h-5 bg-neutral-200 mx-1"></div>
      <div className="relative flex items-center justify-center w-8 h-8 hover:bg-neutral-200 rounded cursor-pointer overflow-hidden" title="Kolor Tekstu">
         <span className="font-bold text-sm" style={{color: activeBlock.styles.color}}>A</span>
         <div className="absolute bottom-1 w-4 h-1 rounded-sm" style={{backgroundColor: activeBlock.styles.color || '#000'}}></div>
         <input type="color" value={activeBlock.styles.color || '#000000'} onChange={e => { updateActiveBlock({ styles: { color: e.target.value }}); document.execCommand('foreColor', false, e.target.value); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
      </div>
    </div>
  );
}