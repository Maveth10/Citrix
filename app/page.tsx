'use client';

import { useState } from 'react';
import { supabase } from '../supabase';

interface Block {
  id: number;
  type: string;
  text?: string;
  title?: string;
  content?: string;
  variant?: string;
  percent?: number;
  src?: string;
  layering: { position: 'relative' | 'absolute'; top: number; left: number; zIndex: number; };
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>(null);
  const [rightTab, setRightTab] = useState<'design' | 'interactions'>('design');
  
  // Domyślna nazwa strony, którą wyślemy do bazy
  const [pageSlug, setPageSlug] = useState('start');

  const handleAddBlock = (type: string) => {
    const newBlock: Block = {
      id: Date.now(), type,
      layering: { position: 'relative', top: 0, left: 0, zIndex: 1 },
      styles: { width: '100%', height: 'auto', padding: '16px', marginBottom: '16px', fontSize: '16px', color: '#333333' },
    };

    if (type === 'h1') { newBlock.text = 'Nagłówek'; newBlock.styles.fontSize = '42px'; newBlock.styles.fontWeight = 'bold'; }
    if (type === 'p') { newBlock.text = 'Akapit tekstu...'; newBlock.styles.color = '#64748b'; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover'; }
    if (type === 'button') { newBlock.text = 'Kliknij'; newBlock.styles.backgroundColor = '#1C58F2'; newBlock.styles.color = '#FFFFFF'; newBlock.styles.borderRadius = '8px'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.display = 'inline-block'; newBlock.styles.width = 'auto'; }
    if (type === 'alert') { newBlock.variant = 'tip'; newBlock.title = 'INFO'; newBlock.text = 'Treść komunikatu.'; }
    if (type === 'terminal') { newBlock.content = 'root@system:~# status'; }
    if (type === 'progress') { newBlock.title = 'Postęp'; newBlock.percent = 50; }
    if (type === 'counter') { newBlock.title = 'Licznik'; newBlock.text = '100'; newBlock.styles.color = '#1C58F2'; }

    setBlocks([...blocks, newBlock]);
    setActiveId(newBlock.id);
    setLeftTab(null);
  };

  const updateBlock = (k: keyof Block, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, [k]: v } : b));
  const updateStyle = (k: string, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, styles: { ...b.styles, [k]: v } } : b));
  const updateLayer = (k: string, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, layering: { ...b.layering, [k]: v } } : b));
  
  const moveBlock = (dir: 'up' | 'down') => {
    if (!activeId) return;
    const idx = blocks.findIndex(b => b.id === activeId);
    const newB = [...blocks];
    if (dir === 'up' && idx > 0) { [newB[idx - 1], newB[idx]] = [newB[idx], newB[idx - 1]]; setBlocks(newB); }
    if (dir === 'down' && idx < blocks.length - 1) { [newB[idx + 1], newB[idx]] = [newB[idx], newB[idx + 1]]; setBlocks(newB); }
  };

  // --- WYSYŁKA DO BAZY ---
  const handlePublish = async () => {
    if (!pageSlug) return alert("Podaj nazwę strony (Slug)!");
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    
    if (error) {
      alert("Błąd zapisu: " + error.message);
    } else {
      alert(`Opublikowano! Strona dostępna pod linkiem /live/${pageSlug}`);
    }
  };

  const aB = blocks.find(b => b.id === activeId);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F0F1F5] text-neutral-800 font-sans overflow-hidden">
      
      {/* TOP BAR */}
      <header className="h-12 bg-[#1A1A1A] text-neutral-400 flex items-center justify-between px-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-white font-bold text-lg"><span className="text-blue-500">X</span>ON</div>
          <div className="h-4 w-px bg-neutral-700 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase">Nazwa Strony:</span>
            <input 
              type="text" 
              value={pageSlug} 
              onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/ /g, '-'))} 
              className="bg-neutral-800 border border-neutral-700 text-white text-xs px-2 py-1 rounded w-40 outline-none focus:border-blue-500" 
            />
          </div>
        </div>
        <button onClick={handlePublish} className="bg-[#1C58F2] hover:bg-blue-500 text-white text-xs font-bold px-6 py-1.5 rounded transition">
          PUBLISH
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEWE MENU */}
        <aside className="w-14 bg-white border-r border-neutral-200 flex flex-col items-center py-4 gap-4 z-40 shadow-[4px_0_15px_rgba(0,0,0,0.03)]">
          <button onClick={() => setLeftTab(leftTab === 'add' ? null : 'add')} className={`w-10 h-10 flex items-center justify-center rounded transition ${leftTab === 'add' ? 'bg-blue-500 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}>+</button>
          <button onClick={() => setLeftTab(leftTab === 'layers' ? null : 'layers')} className={`w-10 h-10 flex items-center justify-center rounded transition ${leftTab === 'layers' ? 'bg-blue-500 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}>≡</button>
        </aside>

        {leftTab === 'add' && (
          <div className="w-64 bg-white border-r border-neutral-200 h-full absolute left-14 z-30 flex flex-col shadow-2xl animate-in slide-in-from-left-2">
            <div className="p-4 font-bold text-xs border-b border-neutral-100 flex justify-between">
              DODAJ ELEMENT
              <button onClick={() => setLeftTab(null)} className="text-neutral-400 hover:text-black">✕</button>
            </div>
            <div className="p-4 flex flex-col gap-2 overflow-y-auto">
              <button onClick={() => handleAddBlock('h1')} className="p-3 bg-neutral-50 hover:border-blue-500 border border-neutral-100 rounded text-xs text-left transition">Nagłówek</button>
              <button onClick={() => handleAddBlock('p')} className="p-3 bg-neutral-50 hover:border-blue-500 border border-neutral-100 rounded text-xs text-left transition">Tekst</button>
              <button onClick={() => handleAddBlock('img')} className="p-3 bg-neutral-50 hover:border-blue-500 border border-neutral-100 rounded text-xs text-left transition">Obrazek</button>
              <button onClick={() => handleAddBlock('button')} className="p-3 bg-neutral-50 hover:border-blue-500 border border-neutral-100 rounded text-xs text-left transition">Przycisk</button>
              
              <div className="h-px bg-neutral-100 my-2"></div>
              
              <button onClick={() => handleAddBlock('alert')} className="p-3 bg-blue-50/50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded text-xs text-left transition">Alert Box</button>
              <button onClick={() => handleAddBlock('terminal')} className="p-3 bg-blue-50/50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded text-xs text-left transition font-mono">Terminal Bash</button>
              <button onClick={() => handleAddBlock('progress')} className="p-3 bg-blue-50/50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded text-xs text-left transition">Progress Bar</button>
              <button onClick={() => handleAddBlock('counter')} className="p-3 bg-blue-50/50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded text-xs text-left transition">Licznik</button>
            </div>
          </div>
        )}

        {/* PŁÓTNO */}
        <main className="flex-1 overflow-auto flex justify-center py-10 px-8" onClick={() => { setActiveId(null); setLeftTab(null); }}>
          <div className="w-full max-w-[1200px] bg-white min-h-[800px] shadow-sm relative p-8 border border-neutral-200">
            {blocks.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm pointer-events-none">Dodaj element z lewego menu.</div>}
            
            {blocks.map(b => {
              const pos = b.layering.position === 'absolute' 
                ? { position: 'absolute' as any, top: `${b.layering.top}px`, left: `${b.layering.left}px`, zIndex: b.layering.zIndex } 
                : { position: 'relative' as any, zIndex: b.layering.zIndex };
              
              return (
                <div 
                  key={b.id} 
                  onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setLeftTab(null); }} 
                  className={`cursor-pointer transition-all border-2 ${activeId === b.id ? 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] z-50' : 'border-transparent hover:border-blue-200 hover:border-dashed'}`} 
                  style={{ ...b.styles, ...pos, margin: pos.position === 'absolute' ? 0 : undefined, marginBottom: pos.position === 'absolute' ? 0 : b.styles.marginBottom }}
                >
                  {b.type === 'h1' && <h1 style={{ fontSize: b.styles.fontSize, color: b.styles.color, fontWeight: b.styles.fontWeight }}>{b.text}</h1>}
                  {b.type === 'p' && <p style={{ fontSize: b.styles.fontSize, color: b.styles.color }}>{b.text}</p>}
                  {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full object-cover rounded" />}
                  {b.type === 'button' && <div className="text-center" style={{ padding: b.styles.padding, backgroundColor: b.styles.backgroundColor, color: b.styles.color, borderRadius: b.styles.borderRadius }}>{b.text}</div>}
                  {b.type === 'alert' && <div className={`p-4 border-l-4 ${b.variant === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-blue-50 border-blue-500 text-blue-700'}`}><b className="block text-[10px] tracking-wider uppercase mb-1">{b.title}</b><span className="text-sm">{b.text}</span></div>}
                  {b.type === 'terminal' && <div className="bg-[#0f1115] p-4 font-mono text-sm text-emerald-400 rounded border border-neutral-800">{b.content}</div>}
                  {b.type === 'progress' && <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-full transition-all" style={{ width: `${b.percent}%` }}></div></div>}
                  {b.type === 'counter' && <div className="bg-neutral-900 p-6 rounded-xl text-center border border-neutral-800"><div className="text-4xl font-black" style={{ color: b.styles.color }}>{b.text}</div><div className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{b.title}</div></div>}
                </div>
              )
            })}
          </div>
        </main>

        {/* PRAWY PANEL (INSPEKTOR) */}
        <aside className="w-[320px] bg-white border-l border-neutral-200 flex flex-col z-40 overflow-y-auto shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
          <div className="p-4 font-bold text-[11px] uppercase tracking-widest border-b border-neutral-100 bg-neutral-50 flex justify-between items-center">
            {aB ? <><span className="w-2 h-2 rounded-full bg-blue-500 inline-block mr-2"></span>{aB.type}</> : 'BRAK WYBORU'}
            {aB && <button onClick={() => setBlocks(blocks.filter(x => x.id !== aB.id))} className="text-red-500 hover:text-red-700 transition">USUŃ</button>}
          </div>
          
          {aB ? (
            <div className="p-5 flex flex-col gap-6">
              <div className="flex gap-2 text-xs font-semibold">
                <button onClick={() => setRightTab('design')} className={`flex-1 py-2 border-b-2 transition ${rightTab === 'design' ? 'border-blue-500 text-blue-600' : 'border-transparent text-neutral-400'}`}>Design</button>
                <button onClick={() => setRightTab('interactions')} className={`flex-1 py-2 border-b-2 transition ${rightTab === 'interactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-neutral-400'}`}>Treść</button>
              </div>

              {rightTab === 'design' && (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 block mb-2">WYMIARY I ODSTĘPY</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="border border-neutral-200 p-1.5 rounded flex items-center focus-within:border-blue-500"><span className="text-[10px] text-neutral-400 w-4">W</span><input type="text" value={aB.styles.width} onChange={e => updateStyle('width', e.target.value)} className="w-full text-right outline-none" /></div>
                      <div className="border border-neutral-200 p-1.5 rounded flex items-center focus-within:border-blue-500"><span className="text-[10px] text-neutral-400 w-4">H</span><input type="text" value={aB.styles.height} onChange={e => updateStyle('height', e.target.value)} className="w-full text-right outline-none" /></div>
                      <div className="border border-neutral-200 p-1.5 rounded flex items-center focus-within:border-blue-500"><span className="text-[10px] text-neutral-400 w-6">Pad</span><input type="text" value={aB.styles.padding} onChange={e => updateStyle('padding', e.target.value)} className="w-full text-right outline-none" /></div>
                      <div className="border border-neutral-200 p-1.5 rounded flex items-center focus-within:border-blue-500"><span className="text-[10px] text-neutral-400 w-6">M.B</span><input type="text" value={aB.styles.marginBottom} onChange={e => updateStyle('marginBottom', e.target.value)} className="w-full text-right outline-none" /></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50/50 p-3 border border-blue-100 rounded-lg text-xs">
                    <label className="text-[10px] font-bold text-blue-600 block mb-2">WARSTWY (Z-INDEX)</label>
                    <select value={aB.layering.position} onChange={e => updateLayer('position', e.target.value)} className="w-full mb-3 p-2 border border-neutral-200 rounded outline-none focus:border-blue-500">
                      <option value="relative">Siatka dokumetu (Relative)</option>
                      <option value="absolute">Swobodny (Absolute)</option>
                    </select>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-neutral-200 bg-white p-1 rounded flex items-center"><span className="text-[10px] text-neutral-400 w-3 ml-1">X</span><input type="number" value={aB.layering.left} disabled={aB.layering.position==='relative'} onChange={e => updateLayer('left', parseInt(e.target.value))} className="w-full text-center outline-none disabled:bg-white" /></div>
                      <div className="border border-neutral-200 bg-white p-1 rounded flex items-center"><span className="text-[10px] text-neutral-400 w-3 ml-1">Y</span><input type="number" value={aB.layering.top} disabled={aB.layering.position==='relative'} onChange={e => updateLayer('top', parseInt(e.target.value))} className="w-full text-center outline-none disabled:bg-white" /></div>
                      <div className="border border-neutral-200 bg-white p-1 rounded flex items-center"><span className="text-[10px] text-neutral-400 w-3 ml-1">Z</span><input type="number" value={aB.layering.zIndex} onChange={e => updateLayer('zIndex', parseInt(e.target.value))} className="w-full text-center font-bold text-blue-600 outline-none" /></div>
                    </div>
                  </div>

                  {(aB.type === 'h1' || aB.type === 'p' || aB.type === 'counter') && (
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 block mb-2">TYPOGRAFIA</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                         <div className="border border-neutral-200 p-1.5 rounded flex items-center"><span className="text-[10px] text-neutral-400 w-8">Rozm</span><input type="text" value={aB.styles.fontSize} onChange={e => updateStyle('fontSize', e.target.value)} className="w-full text-right outline-none" /></div>
                         <div className="border border-neutral-200 p-1 rounded flex items-center overflow-hidden"><span className="text-[10px] text-neutral-400 w-10 ml-1">Kolor</span><input type="color" value={aB.styles.color} onChange={e => updateStyle('color', e.target.value)} className="w-full h-6 border-0 p-0 bg-transparent cursor-pointer" /></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 text-[10px] font-bold mt-2">
                    <button onClick={() => moveBlock('up')} className="flex-1 bg-neutral-100 py-2 rounded hover:bg-neutral-200 transition">↑ W GÓRĘ</button>
                    <button onClick={() => moveBlock('down')} className="flex-1 bg-neutral-100 py-2 rounded hover:bg-neutral-200 transition">↓ W DÓŁ</button>
                  </div>
                </>
              )}

              {rightTab === 'interactions' && (
                <div className="text-xs flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-neutral-500 block mb-1">DANE ELEMENTU</label>
                  {(aB.type === 'h1' || aB.type === 'p' || aB.type === 'button') && <textarea value={aB.text} onChange={e => updateBlock('text', e.target.value)} className="border border-neutral-200 p-3 rounded outline-none focus:border-blue-500 resize-none" rows={5} placeholder="Wpisz treść..." />}
                  {aB.type === 'img' && <input type="text" value={aB.src} onChange={e => updateBlock('src', e.target.value)} className="border border-neutral-200 p-2 rounded outline-none focus:border-blue-500" placeholder="Link do obrazka" />}
                  {aB.type === 'terminal' && <textarea value={aB.content} onChange={e => updateBlock('content', e.target.value)} className="border border-neutral-800 p-3 rounded font-mono bg-neutral-900 text-emerald-400 outline-none resize-none" rows={8} />}
                  {aB.type === 'alert' && (
                    <>
                      <select value={aB.variant} onChange={e => updateBlock('variant', e.target.value)} className="border border-neutral-200 p-2 rounded outline-none">
                        <option value="tip">Informacja (Niebieski)</option>
                        <option value="warning">Ostrzeżenie (Pomarańczowy)</option>
                      </select>
                      <input type="text" value={aB.title} onChange={e => updateBlock('title', e.target.value)} className="border border-neutral-200 p-2 rounded outline-none" placeholder="Tytuł" />
                      <textarea value={aB.text} onChange={e => updateBlock('text', e.target.value)} className="border border-neutral-200 p-2 rounded outline-none resize-none" rows={3} placeholder="Treść komunikatu" />
                    </>
                  )}
                  {aB.type === 'progress' && <input type="range" min="0" max="100" value={aB.percent} onChange={e => updateBlock('percent', parseInt(e.target.value))} className="accent-blue-600" />}
                  {aB.type === 'counter' && (
                    <>
                      <input type="text" value={aB.text} onChange={e => updateBlock('text', e.target.value)} className="border border-neutral-200 p-2 rounded outline-none" placeholder="Liczba" />
                      <input type="text" value={aB.title} onChange={e => updateBlock('title', e.target.value)} className="border border-neutral-200 p-2 rounded outline-none" placeholder="Podpis" />
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-10 text-center text-neutral-400 text-xs mt-10">Zaznacz obiekt na płótnie, aby go edytować.</div>
          )}
        </aside>

      </div>
    </div>
  );
}