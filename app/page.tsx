'use client';

import { useState } from 'react';
import { supabase } from '../supabase';

// NOWE INTERFEJSY V5: Obsługa wariantów
interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; // Do galerii/slajdów
  menuItems?: {label: string; url: string}[]; // Do menu
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  
  // NOWOŚĆ: Stan dla kaskadowego flyout menu
  const [activeAddCategory, setActiveAddCategory] = useState<string | null>(null);

  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'content'>('layout');
  const [pageSlug, setPageSlug] = useState('v5-titan');

  // POTĘŻNA FUNKCJA DODAWANIA (Z OBSŁUGĄ WARIANTÓW)
  const handleAddBlock = (type: string, variant?: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    // Budujemy bazowy klocek
    let newBlock: Block = {
      id: generateId(), type, name: type.toUpperCase(), styles: {},
    };

    // --- LOGIKA DLA TWOJEJ LISTY OPJI ---

    // 1. TEKST (markowe, kombinacje, marquee)
    if (type === 'text') {
      newBlock.type = 'p'; newBlock.name = 'AKAPIT'; newBlock.text = 'Akapit...'; newBlock.styles.fontSize = '16px';
      if(variant === 'brand-p') { newBlock.name='MARKOWY AKAPIT'; newBlock.styles.fontWeight = '700'; newBlock.styles.color = '#3b82f6'; }
      if(variant === 'text-combo') {
        newBlock = { id: generateId(), type: 'container', name: 'KOMBINACJA TEKSTU', styles: { display:'flex', flexDirection:'column', gap:'10px' }, children: [ { id: generateId(), type: 'h1', name:'TYTUŁ', text:'Wielki Tytuł Combo', styles: { fontSize:'32px', fontWeight:'900' } }, { id: generateId(), type: 'p', name:'AKAPIT', text:'Akapit combo...', styles: { fontSize:'16px' } } ] };
      }
      if(variant === 'marquee') { newBlock.type = 'marquee'; newBlock.name='PRZEWIJANY TEKST'; newBlock.text = 'PROMOCJA !!! OSTATNIE SZTUK !!! 🔥 '; newBlock.styles.fontSize = '24px'; }
    }
    
    if (type === 'h1' || type === 'h2') {
       newBlock.text = type === 'h1' ? 'Wielki Tytuł' : 'Markowy Nagłówek'; newBlock.styles.fontSize = type === 'h1' ? '40px' : '24px'; newBlock.styles.fontWeight = '900';
       if(variant?.includes('brand')) { newBlock.name = `MARKOWY ${type.toUpperCase()}`; newBlock.styles.borderBottom = '3px solid #3b82f6'; }
    }

    // 2. OBRAZ (site, transparent, photo, illustration)
    if (type === 'img') {
      newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; newBlock.styles.width = '100%'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover';
      if(variant === 'site') newBlock.styles.borderRadius = '16px';
      if(variant === 'photo') newBlock.styles.border = '8px solid #eee';
      if(variant === 'transparent') newBlock.styles.objectFit = 'contain';
    }

    // 3. PRZYCISK (social bar, share)
    if (type === 'button') { 
      newBlock.text = 'Przycisk'; newBlock.styles.backgroundColor='#111'; newBlock.styles.color='#fff'; newBlock.styles.padding='14px 28px'; newBlock.styles.borderRadius='50px'; 
      if(variant === 'social-bar') { newBlock.type='social'; newBlock.text = 'FB INSTA LI'; newBlock.styles.fontSize = '24px'; newBlock.styles.backgroundColor='transparent'; newBlock.styles.color='#666'; }
    }

    // 4. GRAFIKA (wektor, naklejki, linie)
    if (type === 'shape') { 
      if(variant === 'line') { newBlock.styles.width='100%'; newBlock.styles.height='2px'; newBlock.styles.backgroundColor='#eee'; }
      if(variant === 'shape-circle') { newBlock.styles.width='150px'; newBlock.styles.height='150px'; newBlock.styles.borderRadius='50%'; newBlock.styles.backgroundColor='#3b82f6'; }
    }
    if (variant === 'logo') { newBlock.type='h1'; newBlock.text = 'LOGO™'; newBlock.styles.fontWeight='900'; newBlock.styles.fontSize='24px'; }

    // 5. POLA (LAYOUT - zaprojektowane, puste, pokaz slajdów)
    if (type === 'section' || type === 'container') {
      newBlock.styles.width='100%'; newBlock.styles.minHeight='200px'; newBlock.styles.backgroundColor='#fff'; newBlock.styles.display='flex';
      if(variant === 'box-designed') { newBlock.styles.backgroundColor='#F9FBFF'; newBlock.styles.borderRadius='20px'; newBlock.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; newBlock.styles.padding='40px'; }
      if(variant === 'slideshow') { newBlock.type = 'slideshow'; newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0']; }
    }

    // 6. WIDEO (social players)
    if (type === 'video') { 
      newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width='100%'; newBlock.styles.height='400px'; 
      if(variant === 'video-social') { newBlock.styles.width = '320px'; newBlock.styles.height = '570px'; newBlock.styles.borderRadius = '16px'; } // TikTok format
    }

    // 7. FORMULARZE (faq, mapy)
    if (type === 'form') { newBlock.styles.display='flex'; newBlock.styles.flexDirection='column'; newBlock.styles.gap='10px'; newBlock.styles.padding='20px'; }
    if (variant === 'faq') { newBlock.type = 'faq'; newBlock.name='FAQ'; newBlock.text = '▼ Pytanie FAQ\n\nOdpowiedź na pytanie... Zwykle zwijana.'; newBlock.styles.backgroundColor='#fff'; newBlock.styles.padding='15px'; newBlock.styles.border='1px solid #eee'; }
    if (variant === 'google-maps') { newBlock.type='map'; newBlock.styles.width='100%'; newBlock.styles.height='300px'; newBlock.styles.borderRadius='16px'; }

    // 8. MENU (poziome, hamburger, pionowe)
    if (type === 'menu') {
       newBlock.text = 'HOME ABOUT SERVICES CONTACT'; newBlock.menuItems = [{label:'HOME', url:'/'}, {label:'ABOUT', url:'/about'}, {label:'SERVICES', url:'/services'}, {label:'CONTACT', url:'/contact'}]; newBlock.styles.width='100%'; newBlock.styles.backgroundColor='transparent'; newBlock.styles.padding='10px'; newBlock.styles.fontWeight='bold';
       if(variant === 'menu-horizontal') { newBlock.name='MENU POZIOME'; newBlock.styles.display='flex'; newBlock.styles.justifyContent='center'; newBlock.styles.gap='20px'; }
       if(variant === 'menu-hamburger') { newBlock.name='MENU HAMBURGER'; newBlock.text='☰'; newBlock.styles.fontSize='24px'; newBlock.styles.width='40px'; }
    }

    // ... Zaimplementuj resztę logiki z listy ...

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
        if (b.id === activeId) return { ...b, ...updates };
        if (b.children) return { ...b, children: updateRecursive(b.children) };
        return b;
      });
    };
    setBlocks(updateRecursive(blocks));
  };

  const removeActiveBlock = () => {
    const removeRecursive = (arr: Block[]): Block[] => {
      return arr.filter(b => b.id !== activeId).map(b => ({ ...b, children: b.children ? removeRecursive(b.children) : undefined }));
    };
    setBlocks(removeRecursive(blocks)); setActiveId(null);
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Opublikowano silnik TITAN V5! Link: /live/${pageSlug}`);
  };

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <button onClick={(e) => { e.stopPropagation(); setActiveId(b.id); }} className={`text-left text-[11px] py-1.5 px-2 truncate transition flex items-center gap-2 ${activeId === b.id ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} style={{ paddingLeft: `${(depth * 12) + 8}px` }}>
          {b.children ? '📂' : '📄'} {b.name}
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
        
        {b.type === 'h1' || b.type === 'marquee' ? <h1 style={{fontSize:'inherit', fontWeight:'inherit'}}>{b.text}</h1> : null}
        {b.type === 'p' && <p>{b.text}</p>}
        {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full pointer-events-none" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <button style={{width:'100%', height:'100%', border:'none', backgroundColor:'transparent', color:'inherit', fontSize:'inherit'}}>{b.text}</button>}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%'}}></div>}
        {b.type === 'menu' && b.variant !== 'menu-hamburger' ? <nav style={{width:'100%', height:'100%'}}>{b.text}</nav> : b.text}
        {b.type === 'social' && <div style={{width:'100%', height:'100%'}}>{b.text}</div>}
        {b.type === 'faq' && <div className="border border-neutral-300 bg-white p-4 font-bold text-sm">{b.text.split('\n\n')[0]} ▼</div>}
        {b.type === 'slideshow' && b.images && (
          <div className="w-full h-full relative overflow-hidden bg-neutral-100 pointer-events-none">
            <img src={b.images[0]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white font-bold tracking-widest border-4 border-blue-500/50"><span className="text-sm bg-black/60 px-4 py-2 rounded-full backdrop-blur">🎠 Pokaz Slajdów V5 ({b.images.length})</span></div>
          </div>
        )}
        
        {b.children && (
          <div className="w-full h-full min-h-[40px] relative pointer-events-none">
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Puste</span>}
             <div className="pointer-events-auto w-full h-full" style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit' }}>
                {b.children.map(child => renderCanvasBlock(child))}
             </div>
          </div>
        )}
      </div>
    );
  };

  const activeBlock = findBlockById(blocks, activeId);

  // LISTA KATEGORII WIXA (DO PANELU WYBORU)
  const categories = [
    { id: 'tekst', label: 'Tekst', icon: 'T' },
    { id: 'obraz', label: 'Obraz', icon: '🖼️' },
    { id: 'przycisk', label: 'Przycisk', icon: '👆' },
    { id: 'grafika', label: 'Grafika', icon: '⭐' },
    { id: 'pole', label: 'Pole / Layout', icon: '📦' },
    { id: 'wideo', label: 'Wideo', icon: '▶️' },
    { id: 'formularz', label: 'Formularz', icon: '📝' },
    { id: 'menu', label: 'Menu', icon: '☰' },
    { id: 'popup', label: 'Wyskakujące okna', icon: '🪟' },
    { id: 'lista', label: 'Lista', icon: '📋' },
    { id: 'galeria', label: 'Galeria', icon: '🎠' },
    { id: 'social', label: 'Social Media', icon: '❤️' },
    { id: 'embed', label: 'Osadzona treść', icon: '🔗' },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#0E0E0E] text-white font-sans overflow-hidden">
      
      {/* 1. WĄSKI PASEK NARZĘDZI (FAR LEFT) */}
      <aside className="w-14 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-4 gap-4 z-50">
        <button onClick={() => setLeftTab(leftTab==='add'?null:'add')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      {/* 2. ROZWIJANY PANEL BOCZNY (KASKADOWY / FLYOUT) V5 */}
      <div className="relative z-40 h-full flex">
        
        {/* KOLUMNA 1: Kategorie (Widoczna gdy kliknięty +) */}
        {leftTab === 'add' && (
          <div className="w-64 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center">
              <span className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Dodaj Element</span>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onMouseEnter={() => setActiveAddCategory(cat.id)} // Dynamiczne pokazywanie menu
                  onClick={() => setActiveAddCategory(cat.id)}
                  className={`w-full text-left px-5 py-3 text-xs font-semibold transition flex items-center gap-3 ${activeAddCategory === cat.id ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'}`}
                >
                  <span className="w-4 text-center">{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {leftTab === 'layers' && (
          <div className="w-64 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Nawigator DOM</h2>
              <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}
            </div>
          </div>
        )}

        {/* KOLUMNA 2: Kaskadowy panel opcji (Widoczny po najechaniu/kliknięciu w Kategorię) V5 */}
        {leftTab === 'add' && activeAddCategory && (
          <div className="absolute left-[100%] top-0 w-72 bg-[#161616] border-r border-neutral-800 h-full shadow-[20px_0_30px_rgba(0,0,0,0.5)] z-30 animate-in slide-in-from-left-8 flex flex-col">
            <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-800 bg-[#111]">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">{categories.find(c => c.id === activeAddCategory)?.label}</h3>
              <button onClick={() => setActiveAddCategory(null)} className="text-neutral-500 hover:text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
              {/* TWOJA LISTA OPCJI */}
              {activeAddCategory === 'tekst' && (
                <>
                  <button onClick={() => handleAddBlock('h1', 'brand-h1')} className="p-3 bg-neutral-800 rounded-lg text-left text-blue-400 text-xs font-black tracking-tighter">Markowy Tytuł (H1)</button>
                  <button onClick={() => handleAddBlock('h1')} className="p-3 bg-neutral-800 rounded-lg text-left text-white text-xs font-bold">Tytuł (H1)</button>
                  <button onClick={() => handleAddBlock('text', 'text-combo')} className="p-3 bg-neutral-800 rounded-lg text-left text-neutral-400 text-xs">Kombinacja Tekstu (Tytuł + P)</button>
                  <button onClick={() => handleAddBlock('text', 'marquee')} className="p-3 bg-neutral-800 rounded-lg text-left text-neutral-400 text-xs overflow-hidden whitespace-nowrap">Text Marquee (Scroller) ➡</button>
                  <button onClick={() => handleAddBlock('faq')} className="p-3 bg-neutral-800 rounded-lg text-left text-neutral-400 text-xs">Tekst zwijany (Accordion)</button>
                </>
              )}
              {activeAddCategory === 'obraz' && (
                <>
                  <button onClick={() => handleAddBlock('img', 'site')} className="p-2.5 bg-neutral-800 rounded text-neutral-400 text-xs text-left flex gap-2.5 items-center"><div className="w-8 h-8 bg-neutral-700 rounded flex items-center justify-center">🖼️</div> Obraz strony (Full Cover)</button>
                  <button onClick={() => handleAddBlock('img', 'photo')} className="p-2.5 bg-neutral-800 rounded text-neutral-400 text-xs text-left flex gap-2.5 items-center"><div className="w-8 h-8 bg-neutral-700 rounded flex items-center justify-center">📷</div> Zdjęcie</button>
                  <button onClick={() => handleAddBlock('img', 'transparent')} className="p-2.5 bg-neutral-800 rounded text-neutral-400 text-xs text-left flex gap-2.5 items-center"><div className="w-8 h-8 bg-neutral-700 rounded flex items-center justify-center text-[10px]">PNG</div> Wycięte tło (Logo)</button>
                </>
              )}
              {activeAddCategory === 'menu' && (
                <>
                  <button onClick={() => handleAddBlock('menu', 'menu-horizontal')} className="p-3 bg-neutral-800 rounded-lg text-left text-neutral-400 text-xs font-bold">HOME | ABOUT | CONTACT</button>
                  <button onClick={() => handleAddBlock('menu', 'menu-hamburger')} className="p-3 bg-neutral-800 rounded-lg text-left text-neutral-400 text-xl font-bold">☰</button>
                </>
              )}
              {/* ... Dodaj pozostałe opcje z Twojej listy ... */}
            </div>
          </div>
        )}
      </div>

      {/* 3. ŚRODEK (PŁÓTNO) i 4. PRAWY INSPEKTOR - POZOSTAJĄ BEZ ZMIAN */}
      <div className="flex-1 flex flex-col relative bg-[#222]">
        <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Adres:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1 rounded outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded transition shadow-[0_0_15px_rgba(37,99,235,0.4)]">WDRÓŻ ZMIANY (V5)</button>
        </header>

        <main className="flex-1 overflow-auto flex justify-center bg-[#111]" onClick={() => setActiveId(null)}>
          <div className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative overflow-hidden">
             {blocks.map(b => renderCanvasBlock(b))}
          </div>
        </main>
      </div>

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
              <button onClick={() => setRightTab('content')} className={`flex-1 py-3 transition ${rightTab==='content'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>TREŚĆ</button>
            </div>

            <div className="p-5 flex flex-col gap-6 pb-20">
              {rightTab === 'layout' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-bold text-neutral-500 block mb-1">Pozycjonowanie</label>
                  <select value={activeBlock.styles.position} onChange={e => updateActiveBlock({ styles: { ...activeBlock.styles, position: e.target.value } })} className="bg-black text-white p-2 text-xs border border-neutral-700 rounded"><option value="relative">Naturalna (Zgodnie z siatką)</option><option value="absolute">Swobodna (Drag & Drop)</option><option value="fixed">Zablokowana (Np. Popup / Menu)</option></select>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input type="text" value={activeBlock.styles.width} onChange={e => updateActiveBlock({ styles: { ...activeBlock.styles, width: e.target.value } })} className="bg-black text-white p-2 text-xs border border-neutral-700 rounded" placeholder="Szerokość" />
                    <input type="text" value={activeBlock.styles.height} onChange={e => updateActiveBlock({ styles: { ...activeBlock.styles, height: e.target.value } })} className="bg-black text-white p-2 text-xs border border-neutral-700 rounded" placeholder="Wysokość" />
                  </div>
                </div>
              )}

              {rightTab === 'design' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-bold text-neutral-500 block">KOLORY</label>
                  <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Tło</span><input type="color" value={activeBlock.styles.backgroundColor || 'transparent'} onChange={e => updateActiveBlock({ styles: { ...activeBlock.styles, backgroundColor: e.target.value } })} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Tekst</span><input type="color" value={activeBlock.styles.color || '#000000'} onChange={e => updateActiveBlock({ styles: { ...activeBlock.styles, color: e.target.value } })} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                </div>
              )}

              {rightTab === 'content' && (
                <div className="flex flex-col gap-3 text-xs">
                  <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane warstwy</label>
                  <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" />
                  {['h1', 'p', 'button', ' социал', 'input', 'textarea'].includes(activeBlock.type) && <textarea value={activeBlock.text} onChange={e => updateActiveBlock({ text: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={4} />}
                  {['img', 'embed'].includes(activeBlock.type) && <textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={2} />}
                  {['carousel', 'slideshow'].includes(activeBlock.type) && <p className="text-neutral-500 italic mt-2">Dostęp do zarządzania slajdami w przygotowaniu...</p>}
                </div>
              )}
            </div>
          </>
        ) : <div className="p-10 text-center text-neutral-600 text-xs mt-20">Zaznacz warstwę.</div>}
      </aside>
    </div>
  );
}