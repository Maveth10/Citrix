'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface Block {
  id: number;
  type: string;
  name: string; // Wyświetlana nazwa w drzewie warstw
  text?: string;
  src?: string;
  children?: Block[];
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'content'>('layout');
  const [pageSlug, setPageSlug] = useState('pro-page');

  // Funkcja dodająca klocki (w tym potężne Gotowce)
  const handleAddBlock = (type: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: Block = {
      id: generateId(), type, name: type.toUpperCase(),
      children: ['section', 'container', 'grid'].includes(type) ? [] : undefined,
      styles: { position: 'relative', display: 'block', padding: '10px', margin: '0px', width: '100%', height: 'auto', backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none' },
    };

    // Style bazowe
    if (type === 'section') { newBlock.styles.minHeight = '300px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.padding = '40px 20px'; }
    if (type === 'container') { newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '10px'; newBlock.styles.minHeight = '100px'; newBlock.styles.backgroundColor = '#f8f9fa'; newBlock.styles.border = '1px dashed #ccc'; }
    if (type === 'grid') { newBlock.styles.display = 'grid'; newBlock.styles.gridTemplateColumns = '1fr 1fr'; newBlock.styles.gap = '20px'; newBlock.styles.minHeight = '100px'; }
    if (type === 'h1') { newBlock.text = 'Potężny Nagłówek'; newBlock.styles.fontSize = '40px'; newBlock.styles.fontWeight = '800'; newBlock.styles.color = '#111'; }
    if (type === 'p') { newBlock.text = 'Tekst opisu. W pełni edytowalny akapit...'; newBlock.styles.fontSize = '16px'; newBlock.styles.color = '#666'; }
    if (type === 'button') { newBlock.text = 'Dołącz teraz'; newBlock.styles.backgroundColor = '#2563eb'; newBlock.styles.color = '#fff'; newBlock.styles.padding = '12px 24px'; newBlock.styles.borderRadius = '6px'; newBlock.styles.width = 'fit-content'; newBlock.styles.cursor = 'pointer'; newBlock.styles.fontWeight = 'bold'; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; newBlock.styles.width = '100%'; newBlock.styles.height = '200px'; newBlock.styles.objectFit = 'cover'; newBlock.styles.borderRadius = '8px'; newBlock.styles.padding = '0px'; }

    // GOTOWIEC: Karta Produktu (Zagnieżdżone elementy)
    if (type === 'prefab-card') {
      newBlock = {
        id: generateId(), type: 'container', name: 'KARTA Z GOTOWCA',
        styles: { display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '300px' },
        children: [
          { id: generateId(), type: 'img', name: 'IMG', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', styles: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' } },
          { id: generateId(), type: 'h1', name: 'TYTUŁ', text: 'Smartwatch Pro', styles: { fontSize: '22px', fontWeight: 'bold' } },
          { id: generateId(), type: 'p', name: 'OPIS', text: 'Najlepszy zegarek w swojej klasie.', styles: { fontSize: '14px', color: '#666' } },
          { id: generateId(), type: 'button', name: 'PRZYCISK', text: 'Kup za 99$', styles: { backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '6px', width: '100%', textAlign: 'center', fontWeight: 'bold' } }
        ]
      };
    }

    // Wrzucanie do aktywnego lub na sam dół
    const activeBlock = findBlockById(blocks, activeId);
    if (activeBlock && activeBlock.children) {
      activeBlock.children.push(newBlock);
      setBlocks([...blocks]);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    setActiveId(newBlock.id);
  };

  // Silnik przeszukiwania drzewa
  const findBlockById = (arr: Block[], id: number | null): Block | null => {
    for (const b of arr) {
      if (b.id === id) return b;
      if (b.children) { const found = findBlockById(b.children, id); if (found) return found; }
    }
    return null;
  };

  // Silnik aktualizacji drzewa
  const updateActiveBlock = (updates: any) => {
    const updateRecursive = (arr: Block[]): Block[] => {
      return arr.map(b => {
        if (b.id === activeId) return { ...b, ...updates, styles: { ...b.styles, ...(updates.styles || {}) } };
        if (b.children) return { ...b, children: updateRecursive(b.children) };
        return b;
      });
    };
    setBlocks(updateRecursive(blocks));
  };

  // Usuwanie z drzewa
  const removeActiveBlock = () => {
    const removeRecursive = (arr: Block[]): Block[] => {
      return arr.filter(b => b.id !== activeId).map(b => ({ ...b, children: b.children ? removeRecursive(b.children) : undefined }));
    };
    setBlocks(removeRecursive(blocks));
    setActiveId(null);
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Wysłano na produkcję! Link: /live/${pageSlug}`);
  };

  // Rysowanie Drzewa Nawigacji (Lewy Panel)
  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <button 
          onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }}
          className={`text-left text-[11px] py-1.5 px-2 truncate transition flex items-center gap-2 ${activeId === b.id ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
          style={{ paddingLeft: `${(depth * 12) + 8}px` }}
        >
          {b.children ? '📂' : '📄'} {b.name}
        </button>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  // Główny Silnik Renderujący Płótno
  const renderCanvasBlock = (b: Block) => {
    const isActive = activeId === b.id;
    return (
      <div 
        key={b.id} style={b.styles}
        onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }}
        className={`relative transition-all duration-200 ${isActive ? 'ring-2 ring-blue-500 z-50 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]' : 'hover:ring-1 hover:ring-blue-300'}`}
      >
        {isActive && <div className="absolute -top-5 left-[-2px] bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-t font-bold shadow-sm whitespace-nowrap z-50">{b.name}</div>}
        
        {b.type === 'h1' && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign: b.styles.textAlign, margin:0}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign: b.styles.textAlign, margin:0}}>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full pointer-events-none" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>{b.text}</div>}
        
        {/* Renderowanie Dzieci (Kontenery/Sekcje) */}
        {b.children && (
          <div className="w-full h-full min-h-[50px] relative pointer-events-none">
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Puste {b.type}</span>}
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
      
      {/* WĄSKI PASEK NARZĘDZI (FAR LEFT) */}
      <aside className="w-14 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-4 gap-4 z-50">
        <button onClick={() => setLeftTab(leftTab==='add'?null:'add')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      {/* ROZWIJANY PANEL LEWY */}
      {leftTab && (
        <div className="w-64 bg-[#161616] border-r border-neutral-800 h-full flex flex-col shadow-2xl z-40">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-[#111]">
            <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">{leftTab === 'add' ? 'Dodaj Element' : 'Warstwy (DOM)'}</h2>
            <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {leftTab === 'add' && (
              <div className="p-4 flex flex-col gap-6">
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-neutral-500 mb-2">UKŁAD (KONTENERY)</div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => handleAddBlock('section')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-xs text-left">🟩 Sekcja</button>
                    <button onClick={() => handleAddBlock('container')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-xs text-left flex justify-between">🟦 Kontener Flex <span>⬇</span></button>
                    <button onClick={() => handleAddBlock('grid')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-xs text-left flex justify-between">🔲 Siatka Grid <span>⊞</span></button>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-neutral-500 mb-2">PODSTAWY</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button onClick={() => handleAddBlock('h1')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px] text-center">Tytuł</button>
                    <button onClick={() => handleAddBlock('p')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px] text-center">Tekst</button>
                    <button onClick={() => handleAddBlock('img')} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-[10px] text-center">Obrazek</button>
                    <button onClick={() => handleAddBlock('button')} className="p-2 bg-blue-900/30 text-blue-400 hover:bg-blue-800 hover:text-white rounded text-[10px] text-center transition">Przycisk</button>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-fuchsia-500 mb-2">GOTOWCE (PREFABS)</div>
                  <button onClick={() => handleAddBlock('prefab-card')} className="w-full p-3 bg-gradient-to-r from-purple-900/50 to-blue-900/50 hover:from-purple-800 hover:to-blue-800 rounded border border-purple-700/50 text-xs text-white font-bold transition flex items-center justify-center gap-2">
                    ✨ Karta Produktu
                  </button>
                </div>
              </div>
            )}
            
            {leftTab === 'layers' && (
              <div className="py-2">
                {blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ŚRODEK (PŁÓTNO) */}
      <div className="flex-1 flex flex-col relative bg-[#222]">
        <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Adres:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1 rounded outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={handlePublish} className="bg-white text-black hover:bg-blue-500 hover:text-white text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded-sm transition">Wdróż Zmiany</button>
        </header>

        <main className="flex-1 overflow-auto flex justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-[#111]" onClick={() => setActiveId(null)}>
          <div className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative">
             {blocks.map(b => renderCanvasBlock(b))}
          </div>
        </main>
      </div>

      {/* PRAWY INSPEKTOR (PROPERTIES) */}
      <aside className="w-[300px] bg-[#161616] border-l border-neutral-800 z-40 overflow-y-auto flex flex-col">
        {activeBlock ? (
          <>
            <div className="p-4 bg-[#111] border-b border-neutral-800 flex justify-between items-center">
              <span className="font-black text-xs text-white">{activeBlock.name}</span>
              <button onClick={removeActiveBlock} className="bg-red-900/30 text-red-500 hover:bg-red-600 hover:text-white text-[10px] px-2 py-1 rounded transition">USUŃ</button>
            </div>
            
            <div className="flex text-[10px] font-bold tracking-widest bg-[#111] border-b border-neutral-800">
              <button onClick={() => setRightTab('layout')} className={`flex-1 py-3 transition ${rightTab==='layout'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500'}`}>UKŁAD</button>
              <button onClick={() => setRightTab('design')} className={`flex-1 py-3 transition ${rightTab==='design'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500'}`}>WYGLĄD</button>
              <button onClick={() => setRightTab('content')} className={`flex-1 py-3 transition ${rightTab==='content'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500'}`}>TREŚĆ</button>
            </div>

            <div className="p-5 flex flex-col gap-6">
              {rightTab === 'layout' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                    <label className="text-[9px] font-bold text-neutral-500 block mb-2">TRYB WYŚWIETLANIA (FLEXBOX)</label>
                    <select value={activeBlock.styles.display} onChange={e => updateActiveBlock({ styles: { display: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none mb-2">
                      <option value="block">Blokowy (Standard)</option>
                      <option value="flex">Flexbox (Elastyczny)</option>
                      <option value="grid">Grid (Siatka)</option>
                    </select>
                    
                    {activeBlock.styles.display === 'flex' && (
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-neutral-400">Kierunek:</span>
                          <select value={activeBlock.styles.flexDirection} onChange={e => updateActiveBlock({ styles: { flexDirection: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded outline-none">
                            <option value="row">Wiersz ➡</option><option value="column">Kolumna ⬇</option>
                          </select>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-neutral-400">Wyrównaj:</span>
                          <select value={activeBlock.styles.alignItems} onChange={e => updateActiveBlock({ styles: { alignItems: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded outline-none">
                            <option value="flex-start">Początek</option><option value="center">Środek</option><option value="flex-end">Koniec</option>
                          </select>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-neutral-400">Odstęp (Gap):</span>
                          <input type="text" value={activeBlock.styles.gap || '0px'} onChange={e => updateActiveBlock({ styles: { gap: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded outline-none w-16 text-right" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Szerokość</label><input type="text" value={activeBlock.styles.width} onChange={e => updateActiveBlock({ styles: { width: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded outline-none" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Wysokość</label><input type="text" value={activeBlock.styles.height} onChange={e => updateActiveBlock({ styles: { height: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded outline-none" /></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Marginesy wewn. (Padding)</label><input type="text" value={activeBlock.styles.padding} onChange={e => updateActiveBlock({ styles: { padding: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded outline-none" placeholder="np. 20px" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Marginesy zewn. (Margin)</label><input type="text" value={activeBlock.styles.margin} onChange={e => updateActiveBlock({ styles: { margin: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded outline-none" placeholder="np. 0 auto" /></div>
                  </div>
                </>
              )}

              {rightTab === 'design' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">TYPOGRAFIA</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Rozmiar tekstu</span><input type="text" value={activeBlock.styles.fontSize || ''} onChange={e => updateActiveBlock({ styles: { fontSize: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded outline-none w-20 text-right" placeholder="16px"/></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Waga (Grubość)</span><input type="text" value={activeBlock.styles.fontWeight || ''} onChange={e => updateActiveBlock({ styles: { fontWeight: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded outline-none w-20 text-right" placeholder="bold"/></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Wyrównanie</span>
                      <select value={activeBlock.styles.textAlign || 'left'} onChange={e => updateActiveBlock({ styles: { textAlign: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded outline-none"><option value="left">Lewo</option><option value="center">Środek</option><option value="right">Prawo</option></select>
                    </div>
                  </div>

                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">DEKORACJE</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła</span><input type="color" value={activeBlock.styles.backgroundColor} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tekstu</span><input type="color" value={activeBlock.styles.color || '#000000'} onChange={e => updateActiveBlock({ styles: { color: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                    <div className="flex items-center justify-between text-xs mt-2"><span className="text-neutral-400">Zaokrąglenie (Radius)</span><input type="text" value={activeBlock.styles.borderRadius} onChange={e => updateActiveBlock({ styles: { borderRadius: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded outline-none w-20 text-right" placeholder="8px"/></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Cień (Box Shadow)</span><input type="text" value={activeBlock.styles.boxShadow} onChange={e => updateActiveBlock({ styles: { boxShadow: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded outline-none w-24 text-right" placeholder="0px 10px 15px #000"/></div>
                  </div>
                </>
              )}

              {rightTab === 'content' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane wewnętrzne</label>
                  <label className="text-[10px] text-neutral-400">Nazwa w warstwach:</label>
                  <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded outline-none text-xs" />
                  
                  {['h1', 'p', 'button'].includes(activeBlock.type) && <><label className="text-[10px] text-neutral-400 mt-2">Treść tekstowa:</label><textarea value={activeBlock.text} onChange={e => updateActiveBlock({ text: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded outline-none text-xs" rows={4} /></>}
                  {activeBlock.type === 'img' && <><label className="text-[10px] text-neutral-400 mt-2">Link do obrazu (URL):</label><textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded outline-none text-xs" rows={4} /></>}
                </div>
              )}
            </div>
          </>
        ) : <div className="p-10 text-center text-neutral-600 text-xs mt-20">Zaznacz element w drzewie lub na płótnie.</div>}
      </aside>
    </div>
  );
}