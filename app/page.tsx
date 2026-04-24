'use client';

import { useState } from 'react';
import { supabase } from '../supabase';

interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; // Do karuzeli
  hoverStyles?: any; // Stany najechania
  entranceAnim?: string; // Animacje wejściowe
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('wix-killer');

  const handleAddBlock = (type: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: Block = {
      id: generateId(), type, name: type.toUpperCase(),
      children: ['section', 'container', 'grid', 'form'].includes(type) ? [] : undefined,
      hoverStyles: {},
      entranceAnim: 'none',
      styles: { position: 'relative', display: 'block', padding: '10px', margin: '0px', width: '100%', height: 'auto', backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease' },
    };

    if (type === 'section') { newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.padding = '80px 20px'; }
    if (type === 'container') { newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '15px'; newBlock.styles.minHeight = '100px'; }
    if (type === 'form') { newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '10px'; newBlock.styles.padding = '20px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '8px'; newBlock.styles.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'; }
    
    if (type === 'h1') { newBlock.text = 'Potężny Nagłówek'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; newBlock.styles.color = '#111'; newBlock.styles.lineHeight = '1.2'; }
    if (type === 'p') { newBlock.text = 'Tekst opisu. W pełni edytowalny akapit...'; newBlock.styles.fontSize = '18px'; newBlock.styles.color = '#4b5563'; }
    if (type === 'button') { newBlock.text = 'Wyślij'; newBlock.styles.backgroundColor = '#000000'; newBlock.styles.color = '#ffffff'; newBlock.styles.padding = '16px 32px'; newBlock.styles.borderRadius = '8px'; newBlock.styles.width = 'fit-content'; newBlock.styles.fontWeight = 'bold'; newBlock.hoverStyles = { backgroundColor: '#333333', transform: 'scale(1.05)' }; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; newBlock.styles.width = '100%'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover'; newBlock.styles.borderRadius = '12px'; }
    
    if (type === 'input') { newBlock.name = 'email'; newBlock.text = 'Adres e-mail'; newBlock.styles.padding = '12px 16px'; newBlock.styles.border = '1px solid #d1d5db'; newBlock.styles.borderRadius = '6px'; newBlock.styles.backgroundColor = '#f9fafb'; }
    if (type === 'textarea') { newBlock.name = 'message'; newBlock.text = 'Twoja wiadomość...'; newBlock.styles.padding = '12px 16px'; newBlock.styles.border = '1px solid #d1d5db'; newBlock.styles.borderRadius = '6px'; newBlock.styles.height = '120px'; }
    
    // NOWOŚĆ: Karuzela
    if (type === 'carousel') {
      newBlock.images = [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
        'https://images.unsplash.com/photo-1555421689-491a97ff2040'
      ];
      newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; newBlock.styles.overflow = 'hidden';
    }

    const activeBlock = findBlockById(blocks, activeId);
    if (activeBlock && activeBlock.children) {
      activeBlock.children.push(newBlock); setBlocks([...blocks]);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    setActiveId(newBlock.id);
  };

  const findBlockById = (arr: Block[], id: number | null): Block | null => {
    for (const b of arr) { if (b.id === id) return b; if (b.children) { const f = findBlockById(b.children, id); if (f) return f; } } return null;
  };

  const updateActiveBlock = (updates: any) => {
    const updateRecursive = (arr: Block[]): Block[] => {
      return arr.map(b => {
        if (b.id === activeId) return { ...b, ...updates, styles: { ...b.styles, ...(updates.styles || {}) }, hoverStyles: { ...(b.hoverStyles || {}), ...(updates.hoverStyles || {}) } };
        if (b.children) return { ...b, children: updateRecursive(b.children) };
        return b;
      });
    };
    setBlocks(updateRecursive(blocks));
  };

  const removeActiveBlock = () => {
    const removeRecursive = (arr: Block[]): Block[] => arr.filter(b => b.id !== activeId).map(b => ({ ...b, children: b.children ? removeRecursive(b.children) : undefined }));
    setBlocks(removeRecursive(blocks)); setActiveId(null);
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Produkcja zaktualizowana! /live/${pageSlug}`);
  };

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <button onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }} className={`text-left text-[11px] py-1.5 px-2 truncate transition flex items-center gap-2 ${activeId === b.id ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} style={{ paddingLeft: `${(depth * 12) + 8}px` }}>
          {b.children ? '📂' : '📄'} {b.name} <span className="text-[8px] text-neutral-600 ml-auto">({b.type})</span>
        </button>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  const renderCanvasBlock = (b: Block) => {
    const isActive = activeId === b.id;
    return (
      <div key={b.id} style={b.styles} onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }} className={`relative transition-all duration-200 ${isActive ? 'ring-2 ring-blue-500 z-50 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]' : 'hover:ring-1 hover:ring-blue-300'}`}>
        {isActive && <div className="absolute -top-5 left-[-2px] bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-t font-bold shadow-sm whitespace-nowrap z-50">{b.name}</div>}
        
        {b.type === 'h1' && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full pointer-events-none" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent: b.styles.textAlign === 'center' ? 'center' : b.styles.textAlign === 'right' ? 'flex-end' : 'flex-start'}}>{b.text}</div>}
        {b.type === 'input' && <div className="w-full h-full flex items-center text-neutral-400 pointer-events-none">{b.text}</div>}
        {b.type === 'textarea' && <div className="w-full h-full text-neutral-400 pointer-events-none">{b.text}</div>}
        {b.type === 'carousel' && <div className="w-full h-full flex overflow-hidden relative pointer-events-none bg-neutral-100"><img src={b.images?.[0]} className="w-full h-full object-cover" /><div className="absolute inset-0 flex items-center justify-between p-4 text-white text-2xl font-bold"><span>‹</span><span>›</span></div></div>}
        
        {b.children && (
          <div className="w-full h-full min-h-[40px] relative pointer-events-none">
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Upuść elementy tutaj</span>}
             <div className="pointer-events-auto w-full h-full" style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit' }}>
                {b.children.map(child => renderCanvasBlock(child))}
             </div>
          </div>
        )}
      </div>
    );
  };

  const activeBlock = findBlockById(blocks, activeId);

  return (
    <div className="flex h-screen w-screen bg-[#0E0E0E] text-white font-sans overflow-hidden">
      <aside className="w-14 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-4 gap-4 z-50">
        <button onClick={() => setLeftTab(leftTab==='add'?null:'add')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      {leftTab && (
        <div className="w-64 bg-[#161616] border-r border-neutral-800 h-full flex flex-col shadow-2xl z-40">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-[#111]">
            <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">{leftTab === 'add' ? 'Dodaj Element' : 'Nawigator DOM'}</h2>
            <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {leftTab === 'add' && (
              <div className="p-4 flex flex-col gap-6">
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-neutral-500 mb-2">UKŁAD (LAYOUT)</div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => handleAddBlock('section')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-xs text-left">🟩 Sekcja (Section)</button>
                    <button onClick={() => handleAddBlock('container')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-xs text-left">🟦 Kontener (Flex)</button>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-neutral-500 mb-2">ELEMENTY</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button onClick={() => handleAddBlock('h1')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px]">Tytuł</button>
                    <button onClick={() => handleAddBlock('p')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px]">Tekst</button>
                    <button onClick={() => handleAddBlock('img')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px]">Obraz</button>
                    <button onClick={() => handleAddBlock('button')} className="p-2 bg-blue-900/30 text-blue-400 hover:bg-blue-800 rounded text-[10px]">Przycisk</button>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-emerald-500 mb-2">INTERAKCJE & DATA</div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => handleAddBlock('carousel')} className="p-2 bg-indigo-900/20 border border-indigo-900/50 text-indigo-400 rounded text-[10px] text-left">🎠 Karuzela Obrazów</button>
                    <button onClick={() => handleAddBlock('form')} className="p-2 bg-emerald-900/20 border border-emerald-900/50 text-emerald-400 rounded text-[10px] text-left">📝 Działający Formularz (Baza)</button>
                    <div className="grid grid-cols-2 gap-1.5 mt-1">
                      <button onClick={() => handleAddBlock('input')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px]">Polo tekstowe</button>
                      <button onClick={() => handleAddBlock('textarea')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px]">Textarea</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {leftTab === 'layers' && <div className="py-2">{blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}</div>}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col relative bg-[#222]">
        <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Adres:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1 rounded outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded-sm transition">Wdróż V4</button>
        </header>

        <main className="flex-1 overflow-auto flex justify-center bg-[#111]" onClick={() => setActiveId(null)}>
          <div className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative">
             {blocks.map(b => renderCanvasBlock(b))}
          </div>
        </main>
      </div>

      <aside className="w-[320px] bg-[#161616] border-l border-neutral-800 z-40 overflow-y-auto flex flex-col">
        {activeBlock ? (
          <>
            <div className="p-4 bg-[#111] border-b border-neutral-800 flex justify-between items-center">
              <span className="font-black text-xs text-white truncate max-w-[200px]">{activeBlock.name}</span>
              <button onClick={removeActiveBlock} className="bg-red-900/30 text-red-500 hover:bg-red-600 hover:text-white text-[10px] px-2 py-1 rounded transition">USUŃ</button>
            </div>
            
            <div className="flex text-[10px] font-bold tracking-widest bg-[#111] border-b border-neutral-800">
              <button onClick={() => setRightTab('layout')} className={`flex-1 py-3 transition ${rightTab==='layout'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500'}`}>UKŁAD</button>
              <button onClick={() => setRightTab('design')} className={`flex-1 py-3 transition ${rightTab==='design'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500'}`}>STYL</button>
              <button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 transition ${rightTab==='interactions'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500'}`}>AKCJA</button>
            </div>

            <div className="p-5 flex flex-col gap-6">
              {rightTab === 'layout' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                    <label className="text-[9px] font-bold text-neutral-500 block mb-2">WYŚWIETLANIE (FLEXBOX)</label>
                    <select value={activeBlock.styles.display} onChange={e => updateActiveBlock({ styles: { display: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none mb-2">
                      <option value="block">Blokowy (Standard)</option><option value="flex">Flexbox (Elastyczny)</option>
                    </select>
                    {activeBlock.styles.display === 'flex' && (
                      <div className="flex flex-col gap-2 mt-3 text-xs">
                        <div className="flex justify-between items-center"><span className="text-neutral-400">Kierunek</span><select value={activeBlock.styles.flexDirection} onChange={e => updateActiveBlock({ styles: { flexDirection: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded"><option value="row">Wiersz ➡</option><option value="column">Kolumna ⬇</option></select></div>
                        <div className="flex justify-between items-center"><span className="text-neutral-400">Odstęp (Gap)</span><input type="text" value={activeBlock.styles.gap || '0px'} onChange={e => updateActiveBlock({ styles: { gap: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded w-16 text-right" /></div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Szerokość</label><input type="text" value={activeBlock.styles.width} onChange={e => updateActiveBlock({ styles: { width: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Wysokość</label><input type="text" value={activeBlock.styles.height} onChange={e => updateActiveBlock({ styles: { height: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Padding wewn.</label><input type="text" value={activeBlock.styles.padding} onChange={e => updateActiveBlock({ styles: { padding: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Margin zewn.</label><input type="text" value={activeBlock.styles.margin} onChange={e => updateActiveBlock({ styles: { margin: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                  </div>
                </>
              )}

              {rightTab === 'design' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">KOLORY I TŁO</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła</span><input type="color" value={activeBlock.styles.backgroundColor || 'transparent'} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tekstu</span><input type="color" value={activeBlock.styles.color || '#000000'} onChange={e => updateActiveBlock({ styles: { color: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                  </div>

                  {/* NOWOŚĆ V4: HOVER STATES (Stany po najechaniu myszką) */}
                  <div className="bg-blue-900/10 p-3 rounded border border-blue-900/30 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-blue-500 block">EFEKTY HOVER (Po najechaniu)</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła (Hover)</span><input type="color" value={activeBlock.hoverStyles?.backgroundColor || '#000000'} onChange={e => updateActiveBlock({ hoverStyles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                    <div className="flex flex-col gap-1 text-xs"><span className="text-neutral-400">Transformacja (np. scale(1.05))</span><input type="text" value={activeBlock.hoverStyles?.transform || 'none'} onChange={e => updateActiveBlock({ hoverStyles: { transform: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full"/></div>
                  </div>

                  {/* NOWOŚĆ V4: ANIMACJE WEJŚCIA */}
                  <div className="bg-purple-900/10 p-3 rounded border border-purple-900/30 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-purple-500 block">ANIMACJA WEJŚCIA (START)</label>
                    <select value={activeBlock.entranceAnim || 'none'} onChange={e => updateActiveBlock({ entranceAnim: e.target.value })} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none">
                      <option value="none">Brak animacji</option>
                      <option value="animate-fade-in">Pojawienie się (Fade In)</option>
                      <option value="animate-slide-up">Wjazd z dołu (Slide Up)</option>
                      <option value="animate-zoom-in">Powiększenie (Zoom In)</option>
                    </select>
                  </div>
                </>
              )}

              {rightTab === 'interactions' && (
                <div className="flex flex-col gap-3 text-xs">
                  <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane logiczne</label>
                  
                  <label className="text-neutral-400">Nazwa warstwy (Ważne dla formularzy!):</label>
                  <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" />
                  
                  {['h1', 'p', 'button', 'input', 'textarea'].includes(activeBlock.type) && <><label className="text-neutral-400 mt-2">Treść / Placeholder:</label><textarea value={activeBlock.text} onChange={e => updateActiveBlock({ text: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" rows={4} /></>}
                  
                  {activeBlock.type === 'img' && <><label className="text-neutral-400 mt-2">Link do obrazu (URL):</label><textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" rows={4} /></>}
                  
                  {activeBlock.type === 'carousel' && (
                    <>
                      <label className="text-neutral-400 mt-2">Obrazy Karuzeli (URL po przecinku):</label>
                      <textarea value={activeBlock.images?.join(',\n')} onChange={e => updateActiveBlock({ images: e.target.value.split(',').map(s=>s.trim()) })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" rows={6} />
                    </>
                  )}
                  {activeBlock.type === 'form' && <p className="text-[10px] text-emerald-400 italic mt-2">Ten blok wyśle zawartość do Supabase (tabela 'leads') po kliknięciu przycisku wewnątrz niego na stronie publicznej.</p>}
                </div>
              )}
            </div>
          </>
        ) : <div className="p-10 text-center text-neutral-600 text-xs mt-20">Zaznacz warstwę.</div>}
      </aside>
    </div>
  );
}