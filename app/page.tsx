'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabase';

interface Block {
  id: number; type: string; text?: string; title?: string; content?: string; variant?: string; percent?: number; src?: string; videoId?: string; animationClass?: string;
  layering: { position: 'relative' | 'absolute' | 'sticky'; top: number; left: number; zIndex: number; };
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<string | null>(null); 
  const [rightTab, setRightTab] = useState<'design' | 'interactions'>('design');
  const [pageSlug, setPageSlug] = useState('start');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const canvasRef = useRef<HTMLDivElement>(null);
  const [interaction, setInteraction] = useState<{ type: 'drag' | 'resize' | null; handle?: string; startX: number; startY: number; initialLeft: number; initialTop: number; initialWidth: number; initialHeight: number; } | null>(null);

  const handleAddBlock = (type: string) => {
    // Media i Teksty lądują od razu w Swobodnym Locie, żebyś mógł je przeciągać
    const newBlock: Block = {
      id: Date.now(), type, animationClass: '',
      layering: { position: type === 'menu' ? 'sticky' : 'absolute', top: 50, left: 50, zIndex: blocks.length + 10 },
      styles: { width: '250px', height: '100px', padding: '16px', fontSize: '16px', color: '#333333' },
    };

    if (type === 'h1') { newBlock.text = 'Wielki Nagłówek'; newBlock.styles.fontSize = '46px'; newBlock.styles.fontWeight = '900'; newBlock.styles.lineHeight = '1.2'; }
    if (type === 'p') { newBlock.text = 'To jest akapit tekstu. Możesz tu wpisać dłuższą treść dla swoich klientów...'; newBlock.styles.color = '#5a5a5a'; }
    if (type === 'button') { newBlock.text = 'KUP TERAZ'; newBlock.styles.backgroundColor = '#000000'; newBlock.styles.color = '#FFFFFF'; newBlock.styles.borderRadius = '0px'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.width = '160px'; newBlock.styles.height = '50px'; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; newBlock.styles.width = '300px'; newBlock.styles.height = '200px'; newBlock.styles.objectFit = 'cover'; newBlock.styles.padding = '0px'; }
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width = '400px'; newBlock.styles.height = '225px'; newBlock.styles.padding = '0px'; }
    if (type === 'shape') { newBlock.styles.width = '100px'; newBlock.styles.height = '100px'; newBlock.styles.backgroundColor = '#1C58F2'; newBlock.styles.borderRadius = '8px'; newBlock.styles.padding = '0px'; }
    
    if (type === 'menu') { newBlock.text = 'HOME | OFERTA | GALERIA | KONTAKT'; newBlock.layering.top = 0; newBlock.layering.left = 0; newBlock.styles.width = '100%'; newBlock.styles.height = '60px'; newBlock.styles.backgroundColor = '#FFFFFF'; newBlock.styles.borderBottom = '1px solid #E5E7EB'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.fontSize = '12px'; }
    
    // Zaawansowane sekcje układają się naturalnie jedna pod drugą (Relative)
    if (type === 'accordion') { newBlock.layering.position = 'relative'; newBlock.title = '▼ Pytanie (FAQ)'; newBlock.text = 'Ukryta odpowiedź na pytanie...'; newBlock.styles.width = '100%'; newBlock.styles.height = 'auto'; }
    if (type === 'terminal') { newBlock.layering.position = 'relative'; newBlock.content = 'root@system:~# '; newBlock.styles.width = '100%'; newBlock.styles.height = 'auto'; }

    setBlocks([...blocks, newBlock]); setActiveId(newBlock.id); setLeftTab(null);
  };

  const updateBlock = (k: keyof Block, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, [k]: v } : b));
  const updateStyle = (k: string, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, styles: { ...b.styles, [k]: v } } : b));
  const updateLayer = (k: string, v: any) => activeId && setBlocks(blocks.map(b => b.id === activeId ? { ...b, layering: { ...b.layering, [k]: v } } : b));
  
  const handlePublish = async () => {
    if (!pageSlug) return alert("Podaj Slug!");
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert("Błąd zapisu: " + error.message); else alert(`Opublikowano! /live/${pageSlug}`);
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
          updateStyle('width', `${Math.max(20, interaction.initialWidth + dx)}px`);
          updateStyle('height', `${Math.max(20, interaction.initialHeight + dy)}px`);
        }
      }
    };
    const handleGlobalMouseUp = () => setInteraction(null);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => { window.removeEventListener('mousemove', handleGlobalMouseMove); window.removeEventListener('mouseup', handleGlobalMouseUp); };
  }, [interaction, activeId, blocks]);

  const activeBlock = blocks.find(b => b.id === activeId);

  return (
    <div className="flex h-screen w-screen bg-[#F0F1F5] text-neutral-800 font-sans overflow-hidden">
      
      {/* CIEMNY PASEK WIX */}
      <aside className="w-16 bg-[#161616] border-r border-[#2A2A2A] flex flex-col items-center py-6 shrink-0 z-50 shadow-2xl">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-fuchsia-600 text-white flex items-center justify-center font-bold mb-8 shadow-lg shadow-blue-500/30">X</div>
        <div className="flex flex-col gap-6 w-full items-center">
          <button onClick={() => setLeftTab(leftTab==='add' ? null : 'add')} className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${leftTab==='add' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`} title="Add Elements">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </aside>

      {/* MENU ELEMENTÓW */}
      {leftTab === 'add' && (
        <div className="w-72 bg-white border-r border-neutral-200 h-full flex flex-col shadow-2xl z-40 animate-in slide-in-from-left-4">
          <div className="p-5 border-b border-neutral-100 flex justify-between items-center">
            <h2 className="font-bold text-sm">Add Elements</h2>
            <button onClick={() => setLeftTab(null)} className="text-neutral-400 hover:text-black">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 mb-3">TEXT & MEDIA (Swobodne)</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleAddBlock('h1')} className="p-3 bg-neutral-50 hover:bg-blue-50 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Title (H1)</button>
                <button onClick={() => handleAddBlock('p')} className="p-3 bg-neutral-50 hover:bg-blue-50 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Paragraph</button>
                <button onClick={() => handleAddBlock('img')} className="p-3 bg-neutral-50 hover:bg-blue-50 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Image</button>
                <button onClick={() => handleAddBlock('video')} className="p-3 bg-neutral-50 hover:bg-blue-50 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Video</button>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 mb-3">UI COMPONENTS</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleAddBlock('button')} className="p-3 bg-neutral-50 hover:bg-blue-50 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition text-blue-600">Button</button>
                <button onClick={() => handleAddBlock('shape')} className="p-3 bg-neutral-50 hover:bg-blue-50 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Shape</button>
                <button onClick={() => handleAddBlock('menu')} className="p-3 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded-lg text-xs font-semibold text-center transition col-span-2">Site Menu (Sticky)</button>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 mb-3">LAYOUT WIDGETS (Siatka)</div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleAddBlock('accordion')} className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Accordion (FAQ)</button>
                <button onClick={() => handleAddBlock('terminal')} className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 rounded-lg text-xs font-semibold text-left transition">Terminal Box</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ŚRODEK (TOP BAR + PŁÓTNO) */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold text-neutral-400">Page:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/ /g, '-'))} className="bg-neutral-100 text-neutral-800 font-mono text-xs px-3 py-1.5 rounded outline-none focus:ring-2 focus:ring-blue-500 w-40" />
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
            {['desktop','tablet','mobile'].map(d => (
              <button key={d} onClick={() => setDeviceView(d as any)} className={`p-1.5 rounded transition-all ${deviceView === d ? 'bg-white shadow text-blue-600' : 'text-neutral-500 hover:text-black'}`}>
                {d === 'desktop' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>}
                {d === 'tablet' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>}
                {d === 'mobile' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2"></rect></svg>}
              </button>
            ))}
          </div>
          <button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2 rounded-full transition shadow-md">Publish</button>
        </header>

        {/* GŁÓWNE PŁÓTNO - Z POPRAWKĄ NA SZEROKOŚĆ (MIN-W-MAX) */}
        <main className="flex-1 overflow-auto bg-[#F8F9FA]" onClick={() => setActiveId(null)}>
          <div className="w-full min-w-max p-10 flex justify-center mx-auto">
            <div ref={canvasRef} className={`bg-white min-h-[1200px] shrink-0 relative transition-all duration-500 border border-neutral-200 ${deviceView === 'desktop' ? 'w-[1200px] shadow-sm' : deviceView === 'tablet' ? 'w-[768px] shadow-2xl rounded-xl border-8' : 'w-[375px] shadow-2xl rounded-[2.5rem] border-[12px]'}`}>
              {deviceView === 'mobile' && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-200 rounded-full z-10"></div>}
              
              <div className={`w-full h-full ${deviceView === 'mobile' ? 'mt-6' : ''}`}>
                {blocks.map(b => {
                  const isActive = activeId === b.id;
                  const pos = b.layering.position === 'absolute' ? { position: 'absolute' as any, top: `${b.layering.top}px`, left: `${b.layering.left}px`, zIndex: b.layering.zIndex } : b.layering.position === 'sticky' ? { position: 'sticky' as any, top: `${b.layering.top}px`, zIndex: 50 } : { position: 'relative' as any, zIndex: b.layering.zIndex };
                  
                  // Resetowanie marginesów dla elementów ułożonych absolutnie
                  const dynamicStyles = { ...b.styles, ...pos };
                  if (b.layering.position !== 'relative') {
                    dynamicStyles.margin = 0;
                    dynamicStyles.marginBottom = 0;
                  }

                  return (
                    <div key={b.id} 
                      className={`cursor-pointer transition-all ${b.layering.position === 'absolute' ? 'select-none' : ''} ${isActive ? 'ring-2 ring-blue-500 ring-offset-1 z-[60]' : 'hover:ring-1 hover:ring-blue-300'} ${b.animationClass || ''}`} 
                      style={dynamicStyles}
                      onClick={(e) => { e.stopPropagation(); }}
                      onMouseDown={(e) => {
                        e.stopPropagation(); setActiveId(b.id);
                        if (b.layering.position === 'absolute') {
                          setInteraction({ type: 'drag', startX: e.clientX, startY: e.clientY, initialLeft: b.layering.left, initialTop: b.layering.top, initialWidth: 0, initialHeight: 0 });
                        }
                      }}
                    >
                      {isActive && b.layering.position === 'absolute' && (
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow cursor-se-resize flex items-center justify-center hover:scale-110"
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => { e.stopPropagation(); setActiveId(b.id); const rect = e.currentTarget.parentElement?.getBoundingClientRect(); if(rect) setInteraction({ type: 'resize', handle: 'br', startX: e.clientX, startY: e.clientY, initialLeft: b.layering.left, initialTop: b.layering.top, initialWidth: rect.width, initialHeight: rect.height }); }}
                        />
                      )}

                      {b.type === 'h1' && <h1 style={{ fontSize: b.styles.fontSize, color: b.styles.color, fontWeight: b.styles.fontWeight, lineHeight: b.styles.lineHeight }}>{b.text}</h1>}
                      {b.type === 'p' && <p style={{ fontSize: b.styles.fontSize, color: b.styles.color, wordBreak: 'break-word' }}>{b.text}</p>}
                      {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full object-cover pointer-events-none" />}
                      {b.type === 'button' && <div className="text-center flex items-center justify-center" style={{ ...b.styles, width:'100%', height:'100%', marginBottom: 0 }}>{b.text}</div>}
                      {b.type === 'shape' && <div style={{ ...b.styles, width:'100%', height:'100%', marginBottom: 0 }}></div>}
                      {b.type === 'menu' && <nav className="flex items-center justify-center gap-8 shadow-sm" style={{ ...b.styles, width:'100%', height:'100%', marginBottom: 0 }}>{b.text}</nav>}
                      {b.type === 'terminal' && <div className="bg-[#0f1115] p-4 font-mono text-sm text-emerald-400 rounded">{b.content}</div>}
                      {b.type === 'video' && <div className="w-full h-full bg-neutral-200 pointer-events-none"><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${b.videoId}`} frameBorder="0" className="absolute top-0 left-0"></iframe></div>}
                      {b.type === 'accordion' && <details className="w-full border border-neutral-300 rounded bg-white pointer-events-none"><summary className="p-4 font-bold text-sm list-none flex justify-between">{b.title}▼</summary><div className="p-4 border-t text-sm">{b.text}</div></details>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* PRAWY INSPEKTOR */}
      <aside className="w-[300px] bg-white border-l border-neutral-200 z-40 overflow-y-auto flex flex-col shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
        {activeBlock ? (
          <>
            <div className="p-4 flex justify-between items-center bg-neutral-50 border-b border-neutral-200">
              <span className="font-bold text-xs tracking-wider uppercase text-neutral-600">{activeBlock.type}</span>
              <button onClick={() => setBlocks(blocks.filter(x => x.id !== activeId))} className="text-red-500 hover:text-red-700 p-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
            </div>
            
            <div className="flex text-[11px] font-bold tracking-widest border-b border-neutral-200">
              <button onClick={() => setRightTab('design')} className={`flex-1 py-3 uppercase transition ${rightTab==='design'?'border-b-2 border-black text-black':'text-neutral-400 hover:text-neutral-600'}`}>Design</button>
              <button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 uppercase transition ${rightTab==='interactions'?'border-b-2 border-black text-black':'text-neutral-400 hover:text-neutral-600'}`}>Content</button>
            </div>

            <div className="p-5 flex flex-col gap-6 text-xs">
              {rightTab === 'design' && (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 block mb-2 uppercase">Pozycja / Przepływ</label>
                    <select value={activeBlock.layering.position} onChange={e => updateLayer('position', e.target.value)} className="w-full p-2.5 border border-neutral-300 rounded outline-none focus:border-black font-semibold">
                      <option value="relative">⬇ W Sekcji (Pionowo)</option>
                      <option value="absolute">⤡ Swobodny Lot (Myszka)</option>
                      <option value="sticky">📌 Przypięte na górze</option>
                    </select>
                  </div>

                  {/* NOWOŚĆ V1.5: Przyciski wyrównania specjalnie dla elementów w sekcji! */}
                  {activeBlock.layering.position === 'relative' && (
                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <label className="text-[10px] font-bold block mb-2 tracking-widest text-blue-600 uppercase">Wyrównanie Elementu</label>
                      <div className="flex gap-1">
                        <button onClick={() => {updateStyle('marginLeft','0'); updateStyle('marginRight','auto'); updateStyle('textAlign','left')}} className="flex-1 p-2 bg-white border border-neutral-200 rounded hover:border-black transition text-[10px] font-bold">⭰ LEWO</button>
                        <button onClick={() => {updateStyle('marginLeft','auto'); updateStyle('marginRight','auto'); updateStyle('textAlign','center')}} className="flex-1 p-2 bg-white border border-neutral-200 rounded hover:border-black transition text-[10px] font-bold">ŚRODEK</button>
                        <button onClick={() => {updateStyle('marginLeft','auto'); updateStyle('marginRight','0'); updateStyle('textAlign','right')}} className="flex-1 p-2 bg-white border border-neutral-200 rounded hover:border-black transition text-[10px] font-bold">PRAWO ⭲</button>
                      </div>
                      <p className="text-[9px] text-neutral-500 mt-2 leading-tight">Użyj tych opcji, aby przesuwać element na boki, gdy jesteś w trybie "W Sekcji".</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 block mb-1">Szerokość</label>
                      <input type="text" value={activeBlock.styles.width} onChange={e => updateStyle('width', e.target.value)} className="w-full p-2 border border-neutral-300 rounded outline-none focus:border-black" disabled={activeBlock.layering.position === 'relative'}/>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 block mb-1">Wysokość</label>
                      <input type="text" value={activeBlock.styles.height} onChange={e => updateStyle('height', e.target.value)} className="w-full p-2 border border-neutral-300 rounded outline-none focus:border-black" disabled={activeBlock.layering.position === 'relative'}/>
                    </div>
                  </div>

                  {(activeBlock.type === 'h1' || activeBlock.type === 'p' || activeBlock.type === 'menu') && (
                    <div className="grid grid-cols-2 gap-3">
                       <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Czcionka</label><input type="text" value={activeBlock.styles.fontSize} onChange={e => updateStyle('fontSize', e.target.value)} className="w-full p-2 border border-neutral-300 rounded outline-none focus:border-black" /></div>
                       <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Kolor</label><input type="color" value={activeBlock.styles.color} onChange={e => updateStyle('color', e.target.value)} className="w-full h-8 border-0 p-0 cursor-pointer rounded" /></div>
                    </div>
                  )}
                  {['button', 'shape', 'menu'].includes(activeBlock.type) && (
                    <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Tło</label><input type="color" value={activeBlock.styles.backgroundColor} onChange={e => updateStyle('backgroundColor', e.target.value)} className="w-full h-8 border-0 p-0 cursor-pointer rounded" /></div>
                  )}
                </>
              )}
              {rightTab === 'interactions' && (
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-bold text-neutral-400 block uppercase">Dane Elementu</label>
                  {['h1', 'p', 'button', 'menu'].includes(activeBlock.type) && <textarea value={activeBlock.text} onChange={e => updateBlock('text', e.target.value)} className="border border-neutral-300 p-3 rounded outline-none focus:border-black" rows={4} />}
                  {activeBlock.type === 'video' && <input type="text" value={activeBlock.videoId} onChange={e => updateBlock('videoId', e.target.value)} className="border border-neutral-300 p-2 rounded outline-none focus:border-black" placeholder="ID z YouTube" />}
                  {activeBlock.type === 'img' && <textarea value={activeBlock.src} onChange={e => updateBlock('src', e.target.value)} className="border border-neutral-300 p-2 rounded outline-none focus:border-black" rows={3} placeholder="Link do obrazka" />}
                </div>
              )}
            </div>
          </>
        ) : <div className="p-10 text-center text-neutral-400 text-xs italic mt-20">Zaznacz element.</div>}
      </aside>
    </div>
  );
}