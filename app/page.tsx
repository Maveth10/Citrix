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
  videoId?: string;       // NOWE: ID z YouTube
  animationClass?: string; // NOWE: Klasa CSS animacji
  layering: { position: 'relative' | 'absolute'; top: number; left: number; zIndex: number; };
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>(null);
  const [rightTab, setRightTab] = useState<'design' | 'interactions'>('design');
  const [pageSlug, setPageSlug] = useState('start');

  const handleAddBlock = (type: string) => {
    const newBlock: Block = {
      id: Date.now(), type,
      animationClass: '',
      layering: { position: 'relative', top: 0, left: 0, zIndex: 1 },
      styles: { width: '100%', height: 'auto', padding: '16px', marginBottom: '16px', fontSize: '16px', color: '#333333' },
    };

    // Podstawowe
    if (type === 'h1') { newBlock.text = 'Nowy Nagłówek'; newBlock.styles.fontSize = '42px'; newBlock.styles.fontWeight = 'bold'; }
    if (type === 'p') { newBlock.text = 'Akapit tekstu...'; newBlock.styles.color = '#64748b'; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover'; }
    if (type === 'button') { newBlock.text = 'Kliknij'; newBlock.styles.backgroundColor = '#1C58F2'; newBlock.styles.color = '#FFFFFF'; newBlock.styles.borderRadius = '8px'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.display = 'inline-block'; newBlock.styles.width = 'auto'; }
    
    // Zaawansowane
    if (type === 'alert') { newBlock.variant = 'tip'; newBlock.title = 'INFO'; newBlock.text = 'Treść komunikatu.'; }
    if (type === 'terminal') { newBlock.content = 'root@system:~# status'; }
    if (type === 'progress') { newBlock.title = 'Postęp'; newBlock.percent = 50; }
    if (type === 'counter') { newBlock.title = 'Licznik'; newBlock.text = '100'; newBlock.styles.color = '#1C58F2'; }
    
    // NOWE BAJERY
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.height = '400px'; newBlock.styles.padding = '0px'; }
    if (type === 'accordion') { newBlock.title = 'Kliknij, aby rozwinąć...'; newBlock.text = 'Oto ukryta treść akordeonu.'; newBlock.styles.padding = '0px'; }

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

  const handlePublish = async () => {
    if (!pageSlug) return alert("Podaj nazwę strony!");
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert("Błąd zapisu: " + error.message);
    else alert(`Opublikowano! Link: /live/${pageSlug}`);
  };

  const aB = blocks.find(b => b.id === activeId);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F0F1F5] text-neutral-800 font-sans overflow-hidden">
      
      {/* TOP BAR */}
      <header className="h-12 bg-[#1A1A1A] text-neutral-400 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-white font-bold text-lg"><span className="text-blue-500">X</span>ON <span className="text-[10px] text-emerald-400 ml-1">v1.1</span></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase">Slug:</span>
            <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/ /g, '-'))} className="bg-neutral-800 text-white text-xs px-2 py-1 rounded w-40 outline-none focus:border-blue-500 border border-neutral-700" />
          </div>
        </div>
        <button onClick={handlePublish} className="bg-[#1C58F2] hover:bg-blue-500 text-white text-xs font-bold px-6 py-1.5 rounded transition">PUBLISH</button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEWE MENU */}
        <aside className="w-14 bg-white border-r border-neutral-200 flex flex-col items-center py-4 gap-4 z-40">
          <button onClick={() => setLeftTab(leftTab === 'add' ? null : 'add')} className={`w-10 h-10 rounded transition ${leftTab === 'add' ? 'bg-blue-500 text-white' : 'hover:bg-neutral-100'}`}>+</button>
        </aside>

        {leftTab === 'add' && (
          <div className="w-64 bg-white border-r border-neutral-200 h-full absolute left-14 z-30 flex flex-col shadow-2xl">
            <div className="p-4 font-bold text-xs border-b">PODSTAWY</div>
            <div className="p-4 grid grid-cols-2 gap-2 border-b">
              <button onClick={() => handleAddBlock('h1')} className="p-2 bg-neutral-50 hover:border-blue-500 border rounded text-xs">Nagłówek</button>
              <button onClick={() => handleAddBlock('p')} className="p-2 bg-neutral-50 hover:border-blue-500 border rounded text-xs">Tekst</button>
              <button onClick={() => handleAddBlock('img')} className="p-2 bg-neutral-50 hover:border-blue-500 border rounded text-xs">Obraz</button>
              <button onClick={() => handleAddBlock('button')} className="p-2 bg-neutral-50 hover:border-blue-500 border rounded text-xs">Przycisk</button>
            </div>
            
            <div className="p-4 font-bold text-xs border-b text-fuchsia-600">INTERAKTYWNE</div>
            <div className="p-4 grid grid-cols-1 gap-2 border-b">
              <button onClick={() => handleAddBlock('video')} className="p-2 bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 rounded text-xs text-left">▶ Odtwarzacz Wideo</button>
              <button onClick={() => handleAddBlock('accordion')} className="p-2 bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 rounded text-xs text-left">▼ Akordeon (FAQ)</button>
            </div>

            <div className="p-4 font-bold text-xs border-b text-blue-600">KOMPONENTY</div>
            <div className="p-4 grid grid-cols-2 gap-2 overflow-y-auto pb-20">
              <button onClick={() => handleAddBlock('alert')} className="p-2 bg-blue-50 border-blue-200 text-blue-700 rounded text-[10px]">Alert</button>
              <button onClick={() => handleAddBlock('terminal')} className="p-2 bg-blue-50 border-blue-200 text-blue-700 rounded text-[10px]">Terminal</button>
              <button onClick={() => handleAddBlock('progress')} className="p-2 bg-blue-50 border-blue-200 text-blue-700 rounded text-[10px]">Postęp</button>
              <button onClick={() => handleAddBlock('counter')} className="p-2 bg-blue-50 border-blue-200 text-blue-700 rounded text-[10px]">Licznik</button>
            </div>
          </div>
        )}

        {/* PŁÓTNO */}
        <main className="flex-1 overflow-auto flex justify-center py-10 px-8" onClick={() => setActiveId(null)}>
          <div className="w-full max-w-[1200px] bg-white min-h-[800px] shadow-sm relative p-8 border">
            {blocks.map(b => {
              const pos = b.layering.position === 'absolute' ? { position: 'absolute' as any, top: `${b.layering.top}px`, left: `${b.layering.left}px`, zIndex: b.layering.zIndex } : { position: 'relative' as any, zIndex: b.layering.zIndex };
              return (
                <div key={b.id} onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }} className={`cursor-pointer transition-all border-2 ${activeId === b.id ? 'border-blue-500 z-50' : 'border-transparent hover:border-blue-200'} ${b.animationClass || ''}`} style={{ ...b.styles, ...pos, margin: pos.position === 'absolute' ? 0 : undefined, marginBottom: pos.position === 'absolute' ? 0 : b.styles.marginBottom }}>
                  {b.type === 'h1' && <h1 style={{ fontSize: b.styles.fontSize, color: b.styles.color, fontWeight: b.styles.fontWeight }}>{b.text}</h1>}
                  {b.type === 'p' && <p style={{ fontSize: b.styles.fontSize, color: b.styles.color }}>{b.text}</p>}
                  {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full object-cover rounded" />}
                  {b.type === 'button' && <div className="text-center" style={{ padding: b.styles.padding, backgroundColor: b.styles.backgroundColor, color: b.styles.color, borderRadius: b.styles.borderRadius }}>{b.text}</div>}
                  {b.type === 'alert' && <div className={`p-4 border-l-4 ${b.variant === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-blue-50 border-blue-500 text-blue-700'}`}><b className="block text-[10px] mb-1">{b.title}</b><span className="text-sm">{b.text}</span></div>}
                  {b.type === 'terminal' && <div className="bg-[#0f1115] p-4 font-mono text-sm text-emerald-400 rounded">{b.content}</div>}
                  {b.type === 'progress' && <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-full" style={{ width: `${b.percent}%` }}></div></div>}
                  {b.type === 'counter' && <div className="bg-neutral-900 p-6 rounded-xl text-center"><div className="text-4xl font-black" style={{ color: b.styles.color }}>{b.text}</div><div className="text-xs text-neutral-500">{b.title}</div></div>}
                  
                  {/* NOWE ELEMENTY */}
                  {b.type === 'video' && (
                    <div className="w-full h-full bg-neutral-200 rounded overflow-hidden relative pointer-events-none">
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${b.videoId}`} frameBorder="0" className="absolute top-0 left-0"></iframe>
                    </div>
                  )}
                  {b.type === 'accordion' && (
                    <details className="w-full border border-neutral-300 rounded bg-neutral-50 pointer-events-none">
                      <summary className="p-4 font-bold text-sm cursor-pointer">{b.title}</summary>
                      <div className="p-4 border-t border-neutral-300 text-sm bg-white">{b.text}</div>
                    </details>
                  )}
                </div>
              )
            })}
          </div>
        </main>

        {/* PRAWY PANEL */}
        <aside className="w-[320px] bg-white border-l z-40 overflow-y-auto">
          {aB ? (
            <div className="flex flex-col">
              <div className="p-4 font-bold text-[11px] bg-neutral-50 border-b flex justify-between">
                <span>WYBRANO: {aB.type.toUpperCase()}</span>
                <button onClick={() => setBlocks(blocks.filter(x => x.id !== aB.id))} className="text-red-500">USUŃ</button>
              </div>
              <div className="flex text-xs font-semibold border-b">
                <button onClick={() => setRightTab('design')} className={`flex-1 py-3 ${rightTab === 'design' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-neutral-400'}`}>Wygląd</button>
                <button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 ${rightTab === 'interactions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-neutral-400'}`}>Treść</button>
              </div>

              {rightTab === 'design' && (
                <div className="p-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input type="text" value={aB.styles.width} onChange={e => updateStyle('width', e.target.value)} className="border p-2 rounded" placeholder="Szerokość" />
                    <input type="text" value={aB.styles.height} onChange={e => updateStyle('height', e.target.value)} className="border p-2 rounded" placeholder="Wysokość" />
                  </div>
                  
                  {/* NOWE: Efekty / Animacje */}
                  <div className="bg-fuchsia-50 p-3 rounded-lg border border-fuchsia-100">
                    <label className="text-[10px] font-bold text-fuchsia-700 block mb-2">EFEKTY / ANIMACJA</label>
                    <select value={aB.animationClass || ''} onChange={e => updateBlock('animationClass', e.target.value)} className="w-full p-2 text-xs border border-fuchsia-200 rounded outline-none">
                      <option value="">Brak efektu</option>
                      <option value="hover:scale-105 hover:shadow-xl transition-all duration-300">Zoom na najechanie (Hover)</option>
                      <option value="animate-pulse">Pulsowanie</option>
                      <option value="animate-bounce">Skakanie (Bounce)</option>
                    </select>
                  </div>

                  {/* Pozycja */}
                  <div className="bg-neutral-50 p-3 rounded-lg border text-xs">
                    <label className="text-[10px] font-bold block mb-2">POZYCJA (Z-INDEX)</label>
                    <select value={aB.layering.position} onChange={e => updateLayer('position', e.target.value)} className="w-full mb-2 p-2 border rounded">
                      <option value="relative">Siatka</option>
                      <option value="absolute">Swobodny Lot</option>
                    </select>
                  </div>
                </div>
              )}

              {rightTab === 'interactions' && (
                <div className="p-4 flex flex-col gap-4 text-xs">
                  {/* Edycja Treści */}
                  {(aB.type === 'h1' || aB.type === 'p' || aB.type === 'button') && <textarea value={aB.text} onChange={e => updateBlock('text', e.target.value)} className="border p-3 rounded" rows={4} />}
                  
                  {aB.type === 'video' && (
                     <div>
                       <label className="font-bold text-[10px] mb-1 block">ID Filmu YouTube (np. dQw4w9WgXcQ)</label>
                       <input type="text" value={aB.videoId} onChange={e => updateBlock('videoId', e.target.value)} className="border w-full p-2 rounded" />
                     </div>
                  )}
                  
                  {aB.type === 'accordion' && (
                    <>
                      <input type="text" value={aB.title} onChange={e => updateBlock('title', e.target.value)} className="border p-2 rounded" placeholder="Pytanie" />
                      <textarea value={aB.text} onChange={e => updateBlock('text', e.target.value)} className="border p-3 rounded" rows={3} placeholder="Odpowiedź" />
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-10 text-center text-neutral-400 text-xs">Wybierz klocek.</div>
          )}
</aside>
    </div>
  </div>
);
}