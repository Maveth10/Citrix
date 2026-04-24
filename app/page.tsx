'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabase';

interface Block {
  id: number; type: string; text?: string; title?: string; content?: string; variant?: string; percent?: number; src?: string; videoId?: string; animationClass?: string;
  layering: { position: 'relative' | 'absolute'; top: number; left: number; zIndex: number; };
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>(null);
  const [rightTab, setRightTab] = useState<'design' | 'interactions'>('design');
  const [pageSlug, setPageSlug] = useState('start');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const canvasRef = useRef<HTMLDivElement>(null);
  const [interaction, setInteraction] = useState<{ type: 'drag' | 'resize' | null; handle?: string; startX: number; startY: number; initialLeft: number; initialTop: number; initialWidth: number; initialHeight: number; } | null>(null);

  const handleAddBlock = (type: string) => {
    const positionMode: 'absolute' | 'relative' = 'absolute'; 

    const newBlock: Block = {
      id: Date.now(), type, animationClass: '',
      layering: { position: positionMode, top: 100, left: 100, zIndex: blocks.length + 1 },
      styles: { width: '250px', height: '100px', padding: '16px', fontSize: '16px', color: '#333333' },
    };

    if (type === 'h1') { newBlock.text = 'Nagłówek'; newBlock.styles.fontSize = '42px'; newBlock.styles.fontWeight = 'bold'; }
    if (type === 'p') { newBlock.text = 'Akapit tekstu...'; newBlock.styles.color = '#64748b'; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; newBlock.styles.width = '300px'; newBlock.styles.height = '200px'; newBlock.styles.objectFit = 'cover'; }
    if (type === 'button') { newBlock.text = 'Kliknij'; newBlock.styles.backgroundColor = '#1C58F2'; newBlock.styles.color = '#FFFFFF'; newBlock.styles.borderRadius = '8px'; newBlock.styles.width = 'auto'; }
    if (type === 'counter') { newBlock.title = 'Licznik'; newBlock.text = '100'; newBlock.styles.color = '#1C58F2'; newBlock.styles.width = '200px'; }
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width = '400px'; newBlock.styles.height = '225px'; newBlock.styles.padding = '0px'; }
    if (type === 'map') { newBlock.src = 'https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed'; newBlock.styles.width = '100%'; newBlock.styles.height = '300px'; newBlock.styles.padding = '0px'; }
    if (type === 'terminal') { newBlock.layering.position = 'relative'; newBlock.content = 'root@system:~# '; newBlock.styles.width = '100%'; newBlock.styles.height = 'auto'; }
    if (type === 'accordion') { newBlock.layering.position = 'relative'; newBlock.title = '▼ FAQ'; newBlock.text = 'Odpowiedź...'; newBlock.styles.width = '100%'; newBlock.styles.height = 'auto'; }
    if (type === 'alert') { newBlock.layering.position = 'relative'; newBlock.variant = 'tip'; newBlock.title = 'INFO'; newBlock.text = 'Treść komunikatu.'; newBlock.styles.width = '100%'; newBlock.styles.height = 'auto'; }
    if (type === 'progress') { newBlock.layering.position = 'relative'; newBlock.title = 'Postęp'; newBlock.percent = 50; newBlock.styles.width = '100%'; newBlock.styles.height = 'auto'; }

    setBlocks([...blocks, newBlock]); setActiveId(newBlock.id); setLeftTab(null);
  };

  const updateBlock = (k: keyof Block, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, [k]: v } : b));
  const updateStyle = (k: string, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, styles: { ...b.styles, [k]: v } } : b));
  const updateLayer = (k: string, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, layering: { ...b.layering, [k]: v } } : b));
  
  // ZWRÓCONE BRAKUJĄCE FUNKCJE:
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

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!interaction || !activeId) return;
      const dx = e.clientX - interaction.startX;
      const dy = e.clientY - interaction.startY;

      const currentBlock = blocks.find(b => b.id === activeId);
      if(!currentBlock) return;

      if (interaction.type === 'drag') {
        if(currentBlock.layering.position === 'absolute') {
          updateLayer('left', Math.max(0, interaction.initialLeft + dx));
          updateLayer('top', Math.max(0, interaction.initialTop + dy));
        }
      } else if (interaction.type === 'resize') {
        if (interaction.handle === 'br') {
          updateStyle('width', `${Math.max(50, interaction.initialWidth + dx)}px`);
          updateStyle('height', `${Math.max(20, interaction.initialHeight + dy)}px`);
        }
      }
    };

    const handleGlobalMouseUp = () => setInteraction(null);

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [interaction, activeId, blocks]);

  const activeBlock = blocks.find(b => b.id === activeId);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#E5E7EB] text-neutral-800 font-sans overflow-hidden">
      
      <header className="h-14 bg-[#1A1A1A] text-neutral-400 flex items-center justify-between px-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-4 w-1/3">
          <div className="text-white font-bold text-lg"><span className="text-blue-500">X</span>ON <span className="text-[10px] text-emerald-400 ml-1">v1.3 [Wizualna Edycja]</span></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase">Slug:</span>
            <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/ /g, '-'))} className="bg-neutral-800 text-white text-[11px] px-2 py-1 rounded w-32 outline-none focus:border-blue-500 border border-neutral-700 transition" />
          </div>
        </div>
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
          {[
            {key:'desktop', icon:'<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>'},
            {key:'tablet', icon:'<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'},
            {key:'mobile', icon:'<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'}
          ].map(d => (
            <button key={d.key} onClick={() => setDeviceView(d.key as any)} className={`p-2 rounded transition-all ${deviceView === d.key ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-white'}`} dangerouslySetInnerHTML={{__html: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">${d.icon}</svg>`}} />
          ))}
        </div>
        <div className="flex justify-end w-1/3">
          <button onClick={handlePublish} className="bg-[#1C58F2] hover:bg-blue-600 text-white text-xs font-bold px-6 py-2 rounded transition active:scale-95 shadow-lg">PUBLISH</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="w-14 bg-white border-r flex flex-col items-center py-4 gap-4 z-40 shadow-sm"><button onClick={() => setLeftTab(leftTab==='add'?null:'add')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${leftTab==='add'?'bg-blue-500 text-white shadow-inner':'hover:bg-neutral-100 text-neutral-500'}`}>+</button></aside>

        {leftTab === 'add' && (
          <div className="w-64 bg-white border-r h-full absolute left-14 z-30 flex flex-col shadow-2xl animate-in slide-in-from-left-2 overflow-y-auto">
            <div className="p-4 font-bold text-[10px] tracking-widest text-neutral-400 border-b">PODSTAWY (Swobodny Lot)</div>
            <div className="p-3 grid grid-cols-2 gap-2 border-b">
              {['h1','p','img','button','counter','video', 'map'].map(type => <button key={type} onClick={() => handleAddBlock(type)} className="p-3 bg-neutral-50 border rounded text-xs text-left hover:border-blue-500 transition">{type.toUpperCase()}</button>)}
            </div>
            <div className="p-4 font-bold text-[10px] tracking-widest text-neutral-400 border-b">WIDŻETY (Siatka)</div>
            <div className="p-3 grid grid-cols-1 gap-2 pb-20">
               {['alert','terminal','progress','accordion'].map(type => <button key={type} onClick={() => handleAddBlock(type)} className="p-3 bg-neutral-50 border rounded text-xs text-left hover:border-blue-500 transition">{type.toUpperCase()}</button>)}
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto flex justify-center py-10 px-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-neutral-200/50" onClick={() => setActiveId(null)}>
          <div ref={canvasRef} className={`bg-white min-h-[900px] relative transition-all duration-500 border border-neutral-300 ${deviceView === 'desktop' ? 'w-full max-w-[1200px]' : deviceView === 'tablet' ? 'w-[768px] shadow-2xl rounded-xl border-8' : 'w-[375px] shadow-2xl rounded-[2.5rem] border-[12px]'}`}>
            {deviceView === 'mobile' && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-300 rounded-full z-10"></div>}
            
            <div className={`w-full h-full p-8 ${deviceView === 'mobile' ? 'mt-6' : ''}`}>
              {blocks.map(b => {
                const isActive = activeId === b.id;
                const isAbsolute = b.layering.position === 'absolute';
                const pos = isAbsolute ? { position: 'absolute' as any, top: `${b.layering.top}px`, left: `${b.layering.left}px`, zIndex: b.layering.zIndex } : { position: 'relative' as any, zIndex: b.layering.zIndex };
                
                return (
                  <div key={b.id} 
                    className={`cursor-pointer transition-all ${isAbsolute ? 'select-none' : ''} ${isActive ? 'ring-2 ring-blue-500 ring-offset-2 z-50' : 'hover:ring-1 hover:ring-blue-200'} ${b.animationClass || ''}`} 
                    style={{ ...b.styles, ...pos, margin: pos.position === 'absolute' ? 0 : undefined, marginBottom: pos.position === 'absolute' ? 0 : b.styles.marginBottom }}
                    
                    onMouseDown={(e) => {
                      e.stopPropagation(); setActiveId(b.id);
                      if (isAbsolute) {
                        setInteraction({ type: 'drag', startX: e.clientX, startY: e.clientY, initialLeft: b.layering.left, initialTop: b.layering.top, initialWidth: 0, initialHeight: 0 });
                      }
                    }}
                  >
                    {isActive && isAbsolute && (
                      <>
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-nw-resize pointer-events-none"></div>
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-ne-resize pointer-events-none"></div>
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-sw-resize pointer-events-none"></div>
                        
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white cursor-se-resize hover:scale-125 transition-transform flex items-center justify-center"
                          onMouseDown={(e) => {
                            e.stopPropagation(); setActiveId(b.id);
                            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                            if(!rect) return;
                            setInteraction({ type: 'resize', handle: 'br', startX: e.clientX, startY: e.clientY, initialLeft: b.layering.left, initialTop: b.layering.top, initialWidth: rect.width, initialHeight: rect.height });
                          }}
                        >
                           <span className="text-white block rotate-45 text-[8px] mt-[-1px]">⬍</span>
                        </div>
                      </>
                    )}

                    {b.type === 'h1' && <h1 style={{ fontSize: b.styles.fontSize, color: b.styles.color, fontWeight: b.styles.fontWeight }}>{b.text}</h1>}
                    {b.type === 'p' && <p style={{ fontSize: b.styles.fontSize, color: b.styles.color, wordBreak: 'break-word' }}>{b.text}</p>}
                    {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full object-cover rounded pointer-events-none" />}
                    {b.type === 'button' && <div className="text-center flex items-center justify-center" style={{ ...b.styles, width:'100%', height:'100%', marginBottom: 0 }}>{b.text}</div>}
                    {b.type === 'alert' && <div className={`p-4 border-l-4 ${b.variant === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-blue-50 border-blue-500 text-blue-700'}`}><b className="block text-[10px] mb-1">{b.title}</b><span className="text-sm">{b.text}</span></div>}
                    {b.type === 'terminal' && <div className="bg-[#0f1115] p-4 font-mono text-xs md:text-sm text-emerald-400 rounded overflow-hidden">{b.content}</div>}
                    {b.type === 'progress' && <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-full" style={{ width: `${b.percent}%` }}></div></div>}
                    {b.type === 'counter' && <div className="bg-neutral-900 p-6 rounded-xl text-center"><div className="text-4xl font-black" style={{ color: b.styles.color }}>{b.text}</div><div className="text-xs text-neutral-500 mt-1">{b.title}</div></div>}
                    {b.type === 'video' && <div className="w-full h-full bg-black rounded overflow-hidden relative pointer-events-none"><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${b.videoId}`} frameBorder="0" className="absolute top-0 left-0"></iframe></div>}
                    {b.type === 'map' && <div className="w-full h-full bg-neutral-200 rounded overflow-hidden relative pointer-events-none"><iframe width="100%" height="100%" src={b.src} frameBorder="0" className="absolute top-0 left-0"></iframe></div>}
                    {b.type === 'accordion' && <details className="w-full border border-neutral-300 rounded bg-neutral-50 pointer-events-none"><summary className="p-4 font-bold text-sm cursor-pointer list-none flex justify-between">{b.title}▼</summary><div className="p-4 border-t border-neutral-300 text-sm bg-white">{b.text}</div></details>}
                  </div>
                )
              })}
            </div>
          </div>
        </main>

        <aside className="w-[320px] bg-white border-l z-40 overflow-y-auto">
          {activeBlock ? (
            <div className="flex flex-col">
              <div className="p-4 font-bold text-[11px] bg-neutral-50 border-b flex justify-between"><span>WYBRANO: {activeBlock.type}</span><button onClick={() => setBlocks(blocks.filter(x => x.id !== activeId))} className="text-red-500 text-[10px] hover:underline">USUŃ</button></div>
              <div className="flex text-xs font-semibold border-b"><button onClick={() => setRightTab('design')} className={`flex-1 py-3 border-b-2 ${rightTab==='design'?'border-blue-500 text-blue-600':'border-transparent text-neutral-400'}`}>Wygląd</button><button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 border-b-2 ${rightTab==='interactions'?'border-blue-500 text-blue-600':'border-transparent text-neutral-400'}`}>Treść</button></div>

              {rightTab === 'design' && (
                <div className="p-5 flex flex-col gap-4 text-xs">
                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 grid grid-cols-2 gap-x-3 gap-y-1.5">
                    <label className="text-[10px] font-bold text-blue-600 block col-span-2 mb-1 tracking-widest">POZYCJA WIZUALNA (px)</label>
                    <div className="border border-neutral-200 p-1.5 rounded flex items-center bg-white"><span className="text-[10px] text-neutral-400 w-3">X</span><input type="text" value={activeBlock.layering.left} onChange={e => updateLayer('left', parseInt(e.target.value) || 0)} className="w-full text-right outline-none disabled:bg-transparent" disabled={activeBlock.layering.position === 'relative'}/></div>
                    <div className="border border-neutral-200 p-1.5 rounded flex items-center bg-white"><span className="text-[10px] text-neutral-400 w-3">Y</span><input type="text" value={activeBlock.layering.top} onChange={e => updateLayer('top', parseInt(e.target.value) || 0)} className="w-full text-right outline-none disabled:bg-transparent" disabled={activeBlock.layering.position === 'relative'}/></div>
                    
                    <label className="text-[10px] font-bold text-blue-600 block col-span-2 mb-1 tracking-widest mt-1">WYMIARY WIZUALNE (px)</label>
                    <div className="border border-neutral-200 p-1.5 rounded flex items-center bg-white"><span className="text-[10px] text-neutral-400 w-3">W</span><input type="text" value={activeBlock.styles.width} onChange={e => updateStyle('width', e.target.value)} className="w-full text-right outline-none disabled:bg-transparent" disabled={activeBlock.layering.position === 'relative'}/></div>
                    <div className="border border-neutral-200 p-1.5 rounded flex items-center bg-white"><span className="text-[10px] text-neutral-400 w-3">H</span><input type="text" value={activeBlock.styles.height} onChange={e => updateStyle('height', e.target.value)} className="w-full text-right outline-none disabled:bg-transparent" disabled={activeBlock.layering.position === 'relative'}/></div>
                  </div>

                  <div className="bg-neutral-50 p-3 rounded-lg border text-xs">
                    <label className="text-[10px] font-bold block mb-2 tracking-widest">TRYB UKŁADANIA</label>
                    <select value={activeBlock.layering.position} onChange={e => updateLayer('position', e.target.value)} className="w-full mb-1 p-2 border rounded outline-none bg-white">
                      <option value="relative">W Siatce (Naturalna)</option>
                      <option value="absolute">Swobodny Lot (Drag&Scale)</option>
                    </select>
                  </div>
                  
                  {(activeBlock.type === 'h1' || activeBlock.type === 'p' || activeBlock.type === 'counter') && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                       <div className="border border-neutral-200 p-1.5 rounded flex items-center"><span className="text-[10px] text-neutral-400 w-8">Rozm</span><input type="text" value={activeBlock.styles.fontSize} onChange={e => updateStyle('fontSize', e.target.value)} className="w-full text-right outline-none" /></div>
                       <div className="border border-neutral-200 p-1.5 rounded flex items-center overflow-hidden"><span className="text-[10px] text-neutral-400 w-10 ml-1">Kolor</span><input type="color" value={activeBlock.styles.color} onChange={e => updateStyle('color', e.target.value)} className="w-full h-8 border-0 p-0 cursor-pointer bg-transparent" /></div>
                    </div>
                  )}
                  <div className="flex gap-1 mt-2 text-xs">
                    <button onClick={() => updateLayer('zIndex', Math.max(1, activeBlock.layering.zIndex + 1))} className="flex-1 bg-neutral-100 p-2 rounded hover:bg-neutral-200 text-[10px] font-bold transition">↑ NA WIERZCH</button>
                    <button onClick={() => updateLayer('zIndex', Math.max(1, activeBlock.layering.zIndex - 1))} className="flex-1 bg-neutral-100 p-2 rounded hover:bg-neutral-200 text-[10px] font-bold transition">↓ POD SPÓD</button>
                  </div>
                </div>
              )}
              {rightTab === 'interactions' && (
                <div className="p-4 flex flex-col gap-4 text-xs">
                  {(activeBlock.type === 'h1' || activeBlock.type === 'p' || activeBlock.type === 'button') && <textarea value={activeBlock.text} onChange={e => updateBlock('text', e.target.value)} className="border p-3 rounded outline-none focus:border-blue-500" rows={4} />}
                  {activeBlock.type === 'video' && <input type="text" value={activeBlock.videoId} onChange={e => updateBlock('videoId', e.target.value)} className="border p-3 rounded outline-none focus:border-blue-500" placeholder="ID z YouTube (np. dQw4w9WgXcQ)" />}
                  {activeBlock.type === 'map' && <textarea value={activeBlock.src} onChange={e => updateBlock('src', e.target.value)} className="border p-3 rounded outline-none focus:border-blue-500" rows={4} placeholder="Link Google Maps Embed" />}
                </div>
              )}
            </div>
          ) : <div className="p-10 text-center text-neutral-400 text-xs italic mt-10">Wybierz element na płótnie, aby edytować.</div>}
        </aside>
      </div>
    </div>
  );
}