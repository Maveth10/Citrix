'use client';

import { useState } from 'react';
import { supabase } from '../supabase';

interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; hoverStyles?: any; entranceAnim?: string;
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('wix-killer-v6');

  // --- BAZA TWOICH KATEGORII I OPCJI ---
  const menuOptions: Record<string, {label: string, type: string, variant: string}[]> = {
    tekst: [
      { label: 'Markowy tytuł', type: 'h1', variant: 'brand' }, { label: 'Tytuł', type: 'h1', variant: '' },
      { label: 'Markowy nagłówek', type: 'h2', variant: 'brand' }, { label: 'Nagłówek', type: 'h2', variant: '' },
      { label: 'Markowy akapit', type: 'p', variant: 'brand' }, { label: 'Akapit', type: 'p', variant: '' },
      { label: 'Kombinacja tekstu', type: 'container', variant: 'text-combo' },
      { label: 'Tekst przewijany', type: 'marquee', variant: '' }, { label: 'Tekst zwijany', type: 'faq', variant: '' }
    ],
    obraz: [
      { label: 'Obraz strony', type: 'img', variant: 'site' }, { label: 'Zdjęcie', type: 'img', variant: 'photo' },
      { label: 'Ilustracja', type: 'img', variant: 'illustration' }, { label: 'Element z wyciętym tłem', type: 'img', variant: 'transparent' },
      { label: 'Galeria', type: 'carousel', variant: '' }
    ],
    przycisk: [
      { label: 'Przycisk', type: 'button', variant: '' }, { label: 'Pasek społecznościowy', type: 'social', variant: '' },
      { label: 'Przyciski udostępniania', type: 'button', variant: 'share' }
    ],
    grafika: [
      { label: 'Podstawowe kształty', type: 'shape', variant: 'box' }, { label: 'Grafika wektorowa', type: 'img', variant: 'illustration' },
      { label: 'Naklejki', type: 'img', variant: 'transparent' }, { label: 'Ikony', type: 'img', variant: 'transparent' },
      { label: 'Logo', type: 'h1', variant: 'logo' }, { label: 'Linie', type: 'shape', variant: 'line' }
    ],
    pola: [
      { label: 'Puste pole', type: 'container', variant: 'empty' }, { label: 'Zaprojektowane pole', type: 'container', variant: 'designed' },
      { label: 'Pokaz slajdów', type: 'carousel', variant: '' }
    ],
    wideo: [
      { label: 'Wideo', type: 'video', variant: '' }, { label: 'Odtwarzacze wideo dla social mediów', type: 'video', variant: 'social' }
    ],
    formularze: [
      { label: 'Formularze', type: 'form', variant: '' }, { label: 'FAQ', type: 'faq', variant: '' }, { label: 'Mapy google', type: 'map', variant: '' }
    ],
    menu: [
      { label: 'Menu poziome', type: 'menu', variant: 'horizontal' }, { label: 'Menu pionowe', type: 'menu', variant: 'vertical' },
      { label: 'Menu hamburger', type: 'menu', variant: 'hamburger' }
    ],
    wyskakujace: [
      { label: 'Wyskakujące okna', type: 'popup', variant: '' }
    ],
    lista: [
      { label: 'FAQ', type: 'faq', variant: '' }
    ],
    galeria: [
      { label: 'Galeria', type: 'carousel', variant: '' }, { label: 'Pokaz slajdów', type: 'carousel', variant: '' },
      { label: 'Kanał instagram', type: 'grid', variant: 'insta' }
    ],
    social: [
      { label: 'Pasek społecznościowy', type: 'social', variant: '' }, { label: 'Odtwarzacz wideo z social mediów', type: 'video', variant: 'social' },
      { label: 'Przyciski udostępniania', type: 'button', variant: 'share' }, { label: 'Kanał z insta', type: 'grid', variant: 'insta' }
    ],
    osadzona: [
      { label: 'Osadzony kod', type: 'embed', variant: 'html' }, { label: 'Osadź stronę', type: 'embed', variant: 'site' }
    ]
  };

  const handleAddBlock = (type: string, variant: string, label: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: Block = {
      id: generateId(), type, name: label.toUpperCase(),
      children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
      hoverStyles: {}, entranceAnim: 'none',
      styles: { position: 'relative', display: 'block', padding: '10px', margin: '0px', width: '100%', height: 'auto', backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease' },
    };

    // --- LOGIKA WARIANTÓW ---
    if (type === 'h1') { newBlock.text = 'Nagłówek H1'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; if(variant==='brand'){newBlock.styles.color='#3b82f6'; newBlock.styles.textTransform='uppercase'; newBlock.styles.letterSpacing='-1px';} if(variant==='logo'){newBlock.text='LOGO™'; newBlock.styles.letterSpacing='2px';} }
    if (type === 'h2') { newBlock.text = 'Podtytuł H2'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '700'; if(variant==='brand'){newBlock.styles.borderBottom='3px solid #3b82f6'; newBlock.styles.width='fit-content';} }
    if (type === 'p') { newBlock.text = 'Zwykły akapit tekstu. Możesz go edytować.'; newBlock.styles.fontSize = '16px'; if(variant==='brand'){newBlock.styles.fontStyle='italic'; newBlock.styles.borderLeft='4px solid #3b82f6'; newBlock.styles.paddingLeft='15px';} }
    if (type === 'marquee') { newBlock.text = 'PRZEWIJANY TEKST • OGŁOSZENIE • '; newBlock.styles.fontSize = '24px'; newBlock.styles.fontWeight = 'bold'; }
    if (type === 'faq') { newBlock.text = '▼ Pytanie FAQ\n\nOdpowiedź na to pytanie.'; newBlock.styles.border = '1px solid #ccc'; newBlock.styles.padding = '15px'; newBlock.styles.backgroundColor = '#fff'; }
    
    if (type === 'container' && variant === 'text-combo') { newBlock.children = [{id:generateId(), type:'h2', name:'TYTUŁ', text:'Tytuł Bloku', styles:{fontSize:'28px', fontWeight:'bold'}}, {id:generateId(), type:'p', name:'AKAPIT', text:'Opis...', styles:{fontSize:'16px'}}] }
    if (type === 'container' && variant === 'empty') { newBlock.styles.minHeight = '150px'; newBlock.styles.border = '2px dashed #ccc'; }
    if (type === 'container' && variant === 'designed') { newBlock.styles.minHeight = '200px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.borderRadius = '16px'; newBlock.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; newBlock.styles.padding = '30px'; }
    
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover'; if(variant==='transparent'||variant==='illustration'){newBlock.src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'; newBlock.styles.objectFit='contain';} if(variant==='photo'){newBlock.styles.border='8px solid #fff'; newBlock.styles.boxShadow='0 4px 6px rgba(0,0,0,0.1)';} }
    
    if (type === 'button') { newBlock.text = variant==='share' ? '🔗 Udostępnij' : 'Przycisk'; newBlock.styles.backgroundColor = variant==='share' ? '#f3f4f6' : '#000'; newBlock.styles.color = variant==='share' ? '#000' : '#fff'; newBlock.styles.padding = '12px 24px'; newBlock.styles.borderRadius = '8px'; newBlock.styles.width = 'fit-content'; newBlock.hoverStyles = { transform: 'scale(1.05)' }; }
    
    if (type === 'shape') { if(variant==='box'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#3b82f6';} if(variant==='line'){newBlock.styles.height='2px'; newBlock.styles.backgroundColor='#ccc';} }
    if (type === 'social') { newBlock.text = '📘 📸 🐦'; newBlock.styles.fontSize = '24px'; newBlock.styles.letterSpacing = '10px'; }
    
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.height = '400px'; if(variant==='social'){newBlock.styles.width='300px'; newBlock.styles.height='530px'; newBlock.styles.borderRadius='16px';} }
    if (type === 'carousel') { newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0']; newBlock.styles.height = '400px'; newBlock.styles.overflow = 'hidden'; }
    if (type === 'grid' && variant === 'insta') { newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap='5px'; newBlock.children = [{id:generateId(), type:'img', name:'Post', src:'https://images.unsplash.com/photo-1523275335684-37898b6baf30', styles:{width:'100%', aspectRatio:'1/1', objectFit:'cover'}}]; }
    
    if (type === 'form') { newBlock.styles.backgroundColor='#fff'; newBlock.styles.padding='30px'; newBlock.styles.borderRadius='12px'; newBlock.styles.boxShadow='0 10px 20px rgba(0,0,0,0.05)'; }
    if (type === 'map') { newBlock.src = 'https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed'; newBlock.styles.height='300px'; }
    if (type === 'embed') { newBlock.src = variant==='site' ? 'https://pl.wikipedia.org' : ''; newBlock.text = variant==='html' ? 'Tu wklej kod HTML' : ''; newBlock.styles.height='300px'; newBlock.styles.backgroundColor = variant==='html' ? '#111' : 'transparent'; newBlock.styles.color = '#0f0'; }
    
    if (type === 'menu') { newBlock.text = 'HOME | O NAS | KONTAKT'; newBlock.styles.fontWeight='bold'; if(variant==='vertical'){newBlock.styles.width='200px'; newBlock.text='HOME\nO NAS\nKONTAKT'; newBlock.styles.whiteSpace='pre-wrap';} if(variant==='hamburger'){newBlock.text='☰'; newBlock.styles.fontSize='32px'; newBlock.styles.width='fit-content';} }
    if (type === 'popup') { newBlock.styles.position='absolute'; newBlock.styles.top='50%'; newBlock.styles.left='50%'; newBlock.styles.transform='translate(-50%, -50%)'; newBlock.styles.width='400px'; newBlock.styles.backgroundColor='#fff'; newBlock.styles.padding='40px'; newBlock.styles.borderRadius='20px'; newBlock.styles.boxShadow='0 0 0 9999px rgba(0,0,0,0.5)'; newBlock.styles.zIndex='999'; }

    const activeBlock = findBlockById(blocks, activeId);
    if (activeBlock && activeBlock.children) { activeBlock.children.push(newBlock); setBlocks([...blocks]); } 
    else { setBlocks([...blocks, newBlock]); }
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
    if (error) alert(error.message); else alert(`Opublikowano! Link: /live/${pageSlug}`);
  };

  const renderCanvasBlock = (b: Block) => {
    const isActive = activeId === b.id;
    return (
      <div key={b.id} style={b.styles} onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }} className={`relative transition-all duration-200 ${isActive ? 'ring-2 ring-blue-500 z-50 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]' : 'hover:ring-1 hover:ring-blue-300'}`}>
        {isActive && <div className="absolute -top-5 left-[-2px] bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-t font-bold shadow-sm whitespace-nowrap z-50">{b.name}</div>}
        
        {['h1', 'h2', 'marquee'].includes(b.type) && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', fontStyle:b.styles.fontStyle, margin:0}}>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full pointer-events-none" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent: b.styles.textAlign === 'center' ? 'center' : b.styles.textAlign === 'right' ? 'flex-end' : 'flex-start'}}>{b.text}</div>}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%'}}></div>}
        {b.type === 'menu' && <nav style={{width:'100%', height:'100%', whiteSpace: b.styles.whiteSpace}}>{b.text}</nav>}
        {b.type === 'social' && <div style={{width:'100%', height:'100%'}}>{b.text}</div>}
        {b.type === 'faq' && <div className="font-bold text-sm">{b.text?.split('\n\n')[0]} ▼</div>}
        {b.type === 'embed' && <div className="w-full h-full flex items-center justify-center text-neutral-500 font-bold border border-neutral-300">🌍 {b.src || b.text}</div>}
        {b.type === 'map' && <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-500 font-bold border border-neutral-300">🗺️ Mapa Google</div>}
        {b.type === 'carousel' && b.images && (
          <div className="w-full h-full relative overflow-hidden bg-neutral-100 pointer-events-none">
            <img src={b.images[0]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white font-bold tracking-widest"><span className="text-sm bg-black/60 px-4 py-2 rounded-full">🎠 Galeria ({b.images.length})</span></div>
          </div>
        )}
        
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
      
      {/* 1. WĄSKI PASEK NARZĘDZI */}
      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab==='add'?null:'add'); if(leftTab!=='add') setAddCategory(null); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
      </aside>

      {/* 2. ROZWIJANY PANEL BOCZNY (KASKADA) */}
      <div className="relative z-40 h-full flex">
        {leftTab === 'add' && (
          <div className="w-56 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center">
              <span className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">DODAJ ELEMENT</span>
            </div>
            <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
              {Object.keys(menuOptions).map(catKey => (
                <button 
                  key={catKey} 
                  onMouseEnter={() => setAddCategory(catKey)}
                  onClick={() => setAddCategory(catKey)}
                  className={`w-full text-left px-5 py-3 text-xs font-semibold transition flex items-center gap-3 border-l-2 ${addCategory === catKey ? 'bg-neutral-800 text-white border-blue-500' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border-transparent'}`}
                >
                  <span className="capitalize">{catKey}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* KOLUMNA 2: Opcje (Wysuwany panel) */}
        {leftTab === 'add' && addCategory && (
          <div className="absolute left-[100%] top-0 w-80 bg-[#161616] border-r border-neutral-800 h-full shadow-[20px_0_30px_rgba(0,0,0,0.6)] z-30 flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#161616]">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">{addCategory}</h3>
              <button onClick={() => {setLeftTab(null); setAddCategory(null);}} className="text-neutral-500 hover:text-white text-lg leading-none">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {menuOptions[addCategory].map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAddBlock(opt.type, opt.variant, opt.label)} 
                  className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition"
                >
                  <span className="text-sm font-bold text-white block">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. ŚRODEK (PŁÓTNO) */}
      <div className="flex-1 flex flex-col relative bg-[#222]">
        <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Adres:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1 rounded outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded transition shadow-[0_0_15px_rgba(37,99,235,0.4)]">WDRÓŻ ZMIANY (V6)</button>
        </header>

        <main className="flex-1 overflow-auto flex justify-center bg-[#111]" onClick={() => setActiveId(null)}>
          <div className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative overflow-hidden">
             {blocks.map(b => renderCanvasBlock(b))}
          </div>
        </main>
      </div>

      {/* 4. PRAWY INSPEKTOR (PROPERTIES) - W PEŁNI PRZYWRÓCONY Z V5 */}
      <aside className="w-[320px] bg-[#161616] border-l border-neutral-800 z-40 overflow-y-auto flex flex-col shrink-0">
        {activeBlock ? (
          <>
            <div className="p-4 bg-[#111] border-b border-neutral-800 flex justify-between items-center">
              <span className="font-black text-xs text-white truncate max-w-[180px]">{activeBlock.name}</span>
              <button onClick={removeActiveBlock} className="bg-red-900/30 text-red-500 hover:bg-red-600 hover:text-white text-[10px] px-2 py-1 rounded transition">USUŃ</button>
            </div>
            
            <div className="flex text-[10px] font-bold tracking-widest bg-[#111] border-b border-neutral-800">
              <button onClick={() => setRightTab('layout')} className={`flex-1 py-3 transition ${rightTab==='layout'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>UKŁAD</button>
              <button onClick={() => setRightTab('design')} className={`flex-1 py-3 transition ${rightTab==='design'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>DESIGN</button>
              <button onClick={() => setRightTab('effects')} className={`flex-1 py-3 transition ${rightTab==='effects'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>EFEKTY</button>
              <button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 transition ${rightTab==='interactions'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>TREŚĆ</button>
            </div>

            <div className="p-5 flex flex-col gap-6 pb-20">
              {/* ZAKŁADKA 1: UKŁAD */}
              {rightTab === 'layout' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                    <label className="text-[9px] font-bold text-neutral-500 block mb-2">WYŚWIETLANIE (DISPLAY)</label>
                    <select value={activeBlock.styles.display} onChange={e => updateActiveBlock({ styles: { display: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none mb-2">
                      <option value="block">Blokowy</option><option value="flex">Flexbox (Zalecany)</option><option value="grid">Siatka (Grid)</option>
                    </select>
                    {activeBlock.styles.display === 'flex' && (
                      <div className="flex flex-col gap-2 mt-3 text-xs">
                        <div className="flex justify-between items-center"><span className="text-neutral-400">Kierunek</span><select value={activeBlock.styles.flexDirection} onChange={e => updateActiveBlock({ styles: { flexDirection: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded"><option value="row">Wiersz ➡</option><option value="column">Kolumna ⬇</option></select></div>
                        <div className="flex justify-between items-center"><span className="text-neutral-400">Wyrównanie ↕</span><select value={activeBlock.styles.alignItems} onChange={e => updateActiveBlock({ styles: { alignItems: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded"><option value="flex-start">Góra / Lewo</option><option value="center">Środek</option><option value="flex-end">Dół / Prawo</option></select></div>
                        <div className="flex justify-between items-center"><span className="text-neutral-400">Odstęp (Gap)</span><input type="text" value={activeBlock.styles.gap || '0px'} onChange={e => updateActiveBlock({ styles: { gap: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded w-16 text-right" /></div>
                      </div>
                    )}
                    {activeBlock.styles.display === 'grid' && (
                      <div className="flex flex-col gap-2 mt-3 text-xs">
                        <div className="flex justify-between items-center"><span className="text-neutral-400">Kolumny (CSS)</span><input type="text" value={activeBlock.styles.gridTemplateColumns || 'repeat(2, 1fr)'} onChange={e => updateActiveBlock({ styles: { gridTemplateColumns: e.target.value }})} className="bg-black text-white p-1 border border-neutral-700 rounded w-32 text-right" /></div>
                      </div>
                    )}
                  </div>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                    <label className="text-[9px] font-bold text-neutral-500 block mb-2">POZYCJA W DOKUMENCIE</label>
                    <select value={activeBlock.styles.position} onChange={e => updateActiveBlock({ styles: { position: e.target.value }})} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none mb-2">
                      <option value="relative">Naturalna (Zgodnie z siatką)</option><option value="absolute">Swobodna (Na warstwie)</option><option value="fixed">Zablokowana (Np. Popup / Menu)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Szerokość</label><input type="text" value={activeBlock.styles.width} onChange={e => updateActiveBlock({ styles: { width: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Wysokość</label><input type="text" value={activeBlock.styles.height} onChange={e => updateActiveBlock({ styles: { height: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Padding wewn.</label><input type="text" value={activeBlock.styles.padding} onChange={e => updateActiveBlock({ styles: { padding: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                    <div className="bg-neutral-900 p-2 rounded border border-neutral-800"><label className="text-[9px] text-neutral-500 block mb-1">Margin zewn.</label><input type="text" value={activeBlock.styles.margin} onChange={e => updateActiveBlock({ styles: { margin: e.target.value }})} className="w-full bg-black text-white p-1.5 text-xs border border-neutral-700 rounded" /></div>
                  </div>
                </>
              )}

              {/* ZAKŁADKA 2: DESIGN */}
              {rightTab === 'design' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">KOLORY I TŁO</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła</span><input type="color" value={activeBlock.styles.backgroundColor || 'transparent'} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tekstu</span><input type="color" value={activeBlock.styles.color || '#000000'} onChange={e => updateActiveBlock({ styles: { color: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                  </div>

                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">TYPOGRAFIA PRO</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Rozmiar</span><input type="text" value={activeBlock.styles.fontSize || ''} onChange={e => updateActiveBlock({ styles: { fontSize: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded w-20 text-right"/></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Grubość</span><input type="text" value={activeBlock.styles.fontWeight || ''} onChange={e => updateActiveBlock({ styles: { fontWeight: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded w-20 text-right" placeholder="bold"/></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Odstęp liter</span><input type="text" value={activeBlock.styles.letterSpacing || ''} onChange={e => updateActiveBlock({ styles: { letterSpacing: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded w-20 text-right" placeholder="1px"/></div>
                  </div>
                </>
              )}

              {/* ZAKŁADKA 3: EFEKTY (Powrót z V5!) */}
              {rightTab === 'effects' && (
                <>
                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">OBRAMOWANIE</label>
                    <div className="flex flex-col gap-1 text-xs"><span className="text-neutral-400">Border (CSS)</span><input type="text" value={activeBlock.styles.border || 'none'} onChange={e => updateActiveBlock({ styles: { border: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" placeholder="2px solid #3b82f6"/></div>
                    <div className="flex items-center justify-between text-xs mt-1"><span className="text-neutral-400">Zaokrąglenie (Radius)</span><input type="text" value={activeBlock.styles.borderRadius || '0px'} onChange={e => updateActiveBlock({ styles: { borderRadius: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded w-24 text-right"/></div>
                    <div className="flex flex-col gap-1 text-xs mt-2"><span className="text-neutral-400">Cień (Box Shadow)</span><input type="text" value={activeBlock.styles.boxShadow || 'none'} onChange={e => updateActiveBlock({ styles: { boxShadow: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" placeholder="0 10px 15px rgba(0,0,0,0.1)"/></div>
                  </div>

                  <div className="bg-blue-900/10 p-3 rounded border border-blue-900/30 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-blue-500 block">EFEKTY HOVER (Najechanie)</label>
                    <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła (Hover)</span><input type="color" value={activeBlock.hoverStyles?.backgroundColor || '#000000'} onChange={e => updateActiveBlock({ hoverStyles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                    <div className="flex flex-col gap-1 text-xs"><span className="text-neutral-400">Transform (np. translateY(-5px))</span><input type="text" value={activeBlock.hoverStyles?.transform || 'none'} onChange={e => updateActiveBlock({ hoverStyles: { transform: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full"/></div>
                  </div>
                  
                  <div className="bg-purple-900/10 p-3 rounded border border-purple-900/30 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-purple-500 block">ANIMACJA WEJŚCIA (START)</label>
                    <select value={activeBlock.entranceAnim || 'none'} onChange={e => updateActiveBlock({ entranceAnim: e.target.value })} className="w-full bg-black text-white p-2 text-xs border border-neutral-700 rounded outline-none">
                      <option value="none">Brak animacji</option><option value="animate-fade-in">Pojawienie się (Fade In)</option><option value="animate-slide-up">Wjazd z dołu (Slide Up)</option>
                    </select>
                  </div>
                </>
              )}

              {/* ZAKŁADKA 4: TREŚĆ */}
              {rightTab === 'interactions' && (
                <div className="flex flex-col gap-3 text-xs">
                  <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane logiczne i treści</label>
                  <label className="text-neutral-400">Nazwa warstwy:</label>
                  <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" />
                  
                  {['h1', 'h2', 'p', 'button', 'input', 'textarea', 'menu', 'list', 'social', 'marquee', 'faq'].includes(activeBlock.type) && <><label className="text-neutral-400 mt-2">Treść tekstowa:</label><textarea value={activeBlock.text} onChange={e => updateActiveBlock({ text: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={4} placeholder="Wpisz treść..." /></>}
                  
                  {['img', 'embed', 'map'].includes(activeBlock.type) && <><label className="text-neutral-400 mt-2">Link Źródłowy (URL/iFrame src):</label><textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={3} /></>}
                  
                  {activeBlock.type === 'video' && <><label className="text-neutral-400 mt-2">ID z YouTube:</label><input type="text" value={activeBlock.videoId} onChange={e => updateActiveBlock({ videoId: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" /></>}
                  
                  {['carousel'].includes(activeBlock.type) && (
                    <>
                      <label className="text-neutral-400 mt-2">Obrazy Galerii (Jeden pod drugim URL):</label>
                      <textarea value={activeBlock.images?.join('\n')} onChange={e => updateActiveBlock({ images: e.target.value.split('\n').filter(s=>s.trim()!=='') })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" rows={6} />
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        ) : <div className="p-10 text-center text-neutral-600 text-xs mt-20">Zaznacz warstwę na płótnie.</div>}
      </aside>
    </div>
  );
}