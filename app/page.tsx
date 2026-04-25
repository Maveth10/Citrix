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
  const [pageSlug, setPageSlug] = useState('titan-v6');

  const handleAddBlock = (type: string, variant?: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: Block = {
      id: generateId(), type, name: (variant || type).toUpperCase(),
      children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
      hoverStyles: {}, entranceAnim: 'none',
      styles: { position: 'relative', display: 'block', padding: '10px', margin: '0px', width: '100%', height: 'auto', backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', backgroundImage: 'none', backgroundSize: 'cover', backgroundPosition: 'center' },
    };

    // --- TEKST ---
    if (type === 'h1') { 
      newBlock.text = 'Tytuł Strony'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; newBlock.styles.lineHeight = '1.2'; 
      if(variant === 'brand') { newBlock.styles.letterSpacing = '-2px'; newBlock.styles.textTransform = 'uppercase'; newBlock.styles.color = '#3b82f6'; }
    }
    if (type === 'h2') { 
      newBlock.text = 'Nagłówek Sekcji'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '700'; 
      if(variant === 'brand') { newBlock.styles.borderBottom = '4px solid #3b82f6'; newBlock.styles.paddingBottom = '10px'; newBlock.styles.width = 'fit-content'; }
    }
    if (type === 'p') { 
      newBlock.text = 'To jest akapit tekstu. Kliknij dwukrotnie, aby edytować i dodać własną treść...'; newBlock.styles.fontSize = '16px'; newBlock.styles.color = '#4b5563'; 
      if(variant === 'brand') { newBlock.styles.fontStyle = 'italic'; newBlock.styles.borderLeft = '3px solid #3b82f6'; newBlock.styles.paddingLeft = '15px'; }
    }
    if (variant === 'marquee') { newBlock.type = 'marquee'; newBlock.text = 'PRZEWIJANY TEKST OGŁOSZENIA • PROMOCJA • KUP TERAZ • '; newBlock.styles.fontSize = '24px'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.whiteSpace = 'nowrap'; newBlock.styles.overflow = 'hidden'; }
    if (variant === 'text-combo') {
      newBlock = { id: generateId(), type: 'container', name: 'KOMBINACJA TEKSTU', styles: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', padding: '20px' }, children: [ { id: generateId(), type: 'h2', name: 'TYTUŁ', text: 'Złap uwagę czytelnika', styles: { fontSize: '28px', fontWeight: 'bold' } }, { id: generateId(), type: 'p', name: 'AKAPIT', text: 'Zbuduj narrację pod tytułem. Użyj tego bloku do opowiadania historii produktu...', styles: { fontSize: '16px', color: '#666' } } ] };
    }

    // --- OBRAZ ---
    if (type === 'img') { 
      newBlock.styles.width = '100%'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover'; newBlock.styles.borderRadius = '8px';
      if(variant === 'site') newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
      if(variant === 'photo') newBlock.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
      if(variant === 'illustration') { newBlock.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; newBlock.styles.objectFit = 'contain'; }
      if(variant === 'transparent') { newBlock.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'; newBlock.styles.objectFit = 'contain'; newBlock.styles.height = '150px'; }
    }

    // --- PRZYCISK ---
    if (type === 'button') { 
      newBlock.text = 'KLIKNIJ MNIE'; newBlock.styles.backgroundColor = '#000000'; newBlock.styles.color = '#ffffff'; newBlock.styles.padding = '14px 28px'; newBlock.styles.borderRadius = '6px'; newBlock.styles.width = 'fit-content'; newBlock.styles.fontWeight = 'bold'; newBlock.hoverStyles = { transform: 'scale(1.05)' };
    }
    if (variant === 'social-bar') { newBlock.type = 'social'; newBlock.text = '📘 📸 🐦 💼'; newBlock.styles.fontSize = '24px'; newBlock.styles.letterSpacing = '15px'; newBlock.styles.textAlign = 'center'; }
    if (variant === 'share-buttons') { newBlock.type = 'button'; newBlock.text = '🔗 Udostępnij'; newBlock.styles.backgroundColor = '#f3f4f6'; newBlock.styles.color = '#111'; newBlock.styles.border = '1px solid #d1d5db'; newBlock.styles.borderRadius = '20px'; }

    // --- GRAFIKA ---
    if (variant === 'shape-box') { newBlock.type = 'shape'; newBlock.styles.width = '150px'; newBlock.styles.height = '150px'; newBlock.styles.backgroundColor = '#3b82f6'; }
    if (variant === 'shape-circle') { newBlock.type = 'shape'; newBlock.styles.width = '150px'; newBlock.styles.height = '150px'; newBlock.styles.backgroundColor = '#ec4899'; newBlock.styles.borderRadius = '50%'; }
    if (variant === 'line') { newBlock.type = 'shape'; newBlock.styles.width = '100%'; newBlock.styles.height = '2px'; newBlock.styles.backgroundColor = '#e5e7eb'; }
    if (variant === 'logo') { newBlock.type = 'h1'; newBlock.text = 'LOGO™'; newBlock.styles.fontSize = '24px'; newBlock.styles.fontWeight = '900'; newBlock.styles.letterSpacing = '2px'; }

    // --- POLA (LAYOUT) ---
    if (type === 'section') { newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.padding = '80px 20px'; }
    if (variant === 'box-empty') { newBlock.type = 'container'; newBlock.styles.display = 'flex'; newBlock.styles.minHeight = '150px'; newBlock.styles.border = '2px dashed #cbd5e1'; }
    if (variant === 'box-designed') { newBlock.type = 'container'; newBlock.styles.display = 'flex'; newBlock.styles.minHeight = '200px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '16px'; newBlock.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'; newBlock.styles.padding = '30px'; }

    // --- WIDEO ---
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width = '100%'; newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; }
    if (variant === 'video-social') { newBlock.type = 'video'; newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width = '300px'; newBlock.styles.height = '530px'; newBlock.styles.borderRadius = '16px'; newBlock.styles.margin = '0 auto'; } // Pionowy format TikTok/Reels

    // --- FORMULARZE ---
    if (type === 'form') { newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '15px'; newBlock.styles.padding = '30px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '12px'; newBlock.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; }
    if (type === 'input') { newBlock.name = 'email'; newBlock.text = 'Pole tekstowe'; newBlock.styles.padding = '14px 16px'; newBlock.styles.border = '1px solid #e5e7eb'; newBlock.styles.borderRadius = '8px'; newBlock.styles.backgroundColor = '#f9fafb'; }
    if (type === 'textarea') { newBlock.name = 'message'; newBlock.text = 'Pole wiadomości'; newBlock.styles.padding = '14px 16px'; newBlock.styles.border = '1px solid #e5e7eb'; newBlock.styles.borderRadius = '8px'; newBlock.styles.height = '120px'; }
    if (type === 'map') { newBlock.src = 'https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed'; newBlock.styles.width = '100%'; newBlock.styles.height = '350px'; newBlock.styles.borderRadius = '12px'; }

    // --- MENU ---
    if (variant === 'menu-horizontal') { newBlock.type = 'menu'; newBlock.text = 'HOME    O NAS    USŁUGI    KONTAKT'; newBlock.styles.width = '100%'; newBlock.styles.padding = '20px 0'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.textAlign = 'center'; }
    if (variant === 'menu-vertical') { newBlock.type = 'menu'; newBlock.text = 'HOME \n\n O NAS \n\n USŁUGI \n\n KONTAKT'; newBlock.styles.width = '200px'; newBlock.styles.padding = '20px'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.textAlign = 'left'; newBlock.styles.whiteSpace = 'pre-wrap'; newBlock.styles.borderRight = '1px solid #eee'; }
    if (variant === 'menu-hamburger') { newBlock.type = 'menu'; newBlock.text = '☰'; newBlock.styles.fontSize = '32px'; newBlock.styles.cursor = 'pointer'; }

    // --- OKNA WYSKAKUJĄCE ---
    if (type === 'popup') { newBlock.styles.position = 'absolute'; newBlock.styles.top = '50%'; newBlock.styles.left = '50%'; newBlock.styles.transform = 'translate(-50%, -50%)'; newBlock.styles.width = '400px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.padding = '40px'; newBlock.styles.borderRadius = '20px'; newBlock.styles.boxShadow = '0 0 0 9999px rgba(0,0,0,0.5)'; newBlock.styles.zIndex = '999'; }

    // --- LISTY I FAQ ---
    if (variant === 'faq') { newBlock.type = 'accordion'; newBlock.title = '▼ Jakie są metody płatności?'; newBlock.text = 'Akceptujemy karty kredytowe, BLIK oraz przelewy bankowe.'; newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.border = '1px solid #eee'; newBlock.styles.padding = '15px'; newBlock.styles.borderRadius = '8px'; }
    if (type === 'list') { newBlock.text = '✓ Pierwsza zaleta\n✓ Druga zaleta\n✓ Trzecia zaleta'; newBlock.styles.lineHeight = '2'; newBlock.styles.fontSize = '16px'; }

    // --- GALERIA ---
    if (type === 'carousel') {
      newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'];
      newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; newBlock.styles.overflow = 'hidden';
    }
    if (variant === 'insta-feed') { newBlock.type = 'grid'; newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap = '5px'; newBlock.children = [ { id: generateId(), type: 'img', name:'Post', src:'https://images.unsplash.com/photo-1523275335684-37898b6baf30', styles:{width:'100%', aspectRatio:'1/1', objectFit:'cover'} }, { id: generateId(), type: 'img', name:'Post', src:'https://images.unsplash.com/photo-1498050108023-c5249f4df085', styles:{width:'100%', aspectRatio:'1/1', objectFit:'cover'} }, { id: generateId(), type: 'img', name:'Post', src:'https://images.unsplash.com/photo-1551288049-bebda4e38f71', styles:{width:'100%', aspectRatio:'1/1', objectFit:'cover'} } ]; }

    // --- OSADZONA TREŚĆ ---
    if (variant === 'embed-html') { newBlock.type = 'embed'; newBlock.text = 'Wklej kod HTML w zakładce TREŚĆ'; newBlock.styles.backgroundColor = '#111'; newBlock.styles.color = '#0f0'; newBlock.styles.fontFamily = 'monospace'; newBlock.styles.padding = '20px'; }
    if (variant === 'embed-site') { newBlock.type = 'embed'; newBlock.src = 'https://pl.wikipedia.org'; newBlock.styles.width = '100%'; newBlock.styles.height = '500px'; newBlock.styles.border = '1px solid #ccc'; }

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
    if (error) alert(error.message); else alert(`Projekt Opublikowany! Link: /live/${pageSlug}`);
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
        
        {['h1', 'h2', 'marquee'].includes(b.type) && <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', letterSpacing:b.styles.letterSpacing, textTransform:b.styles.textTransform, margin:0, whiteSpace: b.styles.whiteSpace, overflow: b.styles.overflow}}>{b.text}</h1>}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', fontStyle:b.styles.fontStyle, margin:0}}>{b.text}</p>}
        {b.type === 'list' && <div style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', whiteSpace:'pre-wrap'}}>{b.text}</div>}
        {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full pointer-events-none" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent: b.styles.textAlign === 'center' ? 'center' : b.styles.textAlign === 'right' ? 'flex-end' : 'flex-start'}}>{b.text}</div>}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%'}}></div>}
        {['menu', 'menu-hamburger'].includes(b.type) && <nav style={{width:'100%', height:'100%', whiteSpace: b.styles.whiteSpace}}>{b.text}</nav>}
        {b.type === 'social' && <div style={{width:'100%', height:'100%'}}>{b.text}</div>}
        {b.type === 'accordion' && <div className="border border-neutral-300 bg-white p-4 font-bold text-sm">{b.title} ▼</div>}
        
        {['input', 'textarea'].includes(b.type) && <div className="w-full h-full flex items-center text-neutral-400 pointer-events-none border border-neutral-300 rounded p-2 bg-neutral-50">{b.text}</div>}
        {b.type === 'embed' && <div className="w-full h-full bg-neutral-200 pointer-events-none flex items-center justify-center text-neutral-500 font-bold border border-neutral-300">🌍 {b.src ? 'iFrame URL: ' + b.src : b.text}</div>}
        {b.type === 'map' && <div className="w-full h-full bg-neutral-200 pointer-events-none flex items-center justify-center text-neutral-500 font-bold border border-neutral-300">🗺️ Google Maps Embed</div>}
        
        {b.type === 'carousel' && b.images && (
          <div className="w-full h-full relative overflow-hidden bg-neutral-100 pointer-events-none">
            <img src={b.images[0]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white font-bold tracking-widest"><span className="text-sm bg-black/60 px-4 py-2 rounded-full">🎠 Karuzela ({b.images.length})</span></div>
          </div>
        )}
        
        {b.children && (
          <div className="w-full h-full min-h-[40px] relative pointer-events-none">
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Pusty kontener</span>}
             <div className="pointer-events-auto w-full h-full" style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit' }}>
                {b.children.map(child => renderCanvasBlock(child))}
             </div>
          </div>
        )}
      </div>
    );
  };

  const activeBlock = findBlockById(blocks, activeId);

  // DOKŁADNE KATEGORIE Z WIXA
  const categories = [
    { id: 'tekst', label: 'Tekst', icon: 'T' },
    { id: 'obraz', label: 'Obraz', icon: '🖼️' },
    { id: 'przycisk', label: 'Przycisk', icon: '👆' },
    { id: 'grafika', label: 'Grafika', icon: '⭐' },
    { id: 'pole', label: 'Pola i Sekcje', icon: '📦' },
    { id: 'wideo', label: 'Wideo', icon: '▶️' },
    { id: 'formularz', label: 'Formularze', icon: '📝' },
    { id: 'menu', label: 'Menu', icon: '☰' },
    { id: 'popup', label: 'Wyskakujące okna', icon: '🪟' },
    { id: 'lista', label: 'Lista', icon: '📋' },
    { id: 'galeria', label: 'Galeria', icon: '🎠' },
    { id: 'social', label: 'Social Media', icon: '❤️' },
    { id: 'embed', label: 'Osadzona treść', icon: '🔗' }
  ];

  return (
    <div className="flex h-screen w-screen bg-[#0E0E0E] text-white font-sans overflow-hidden">
      
      {/* 1. WĄSKI PASEK NARZĘDZI (FAR LEFT) */}
      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab==='add'?null:'add'); if(leftTab!=='add') setAddCategory('tekst'); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      {/* 2. ROZWIJANY PANEL BOCZNY (KASKADA) */}
      <div className="relative z-40 h-full flex">
        {leftTab === 'add' && (
          <div className="w-56 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center">
              <span className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">DODAJ ELEMENT</span>
            </div>
            <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat.id} onMouseEnter={() => setAddCategory(cat.id)} onClick={() => setAddCategory(cat.id)} className={`w-full text-left px-5 py-3 text-xs font-semibold transition flex items-center gap-3 border-l-2 ${addCategory === cat.id ? 'bg-neutral-800 text-white border-blue-500' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border-transparent'}`}>
                  <span className="w-4 text-center">{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {leftTab === 'layers' && (
          <div className="w-64 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Drzewo DOM</h2>
              <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno puste.</div> : renderLayerTree(blocks)}
            </div>
          </div>
        )}

        {/* KOLUMNA 2: Wysuwany panel opcji dla danej kategorii (Kaskada) */}
        {leftTab === 'add' && addCategory && (
          <div className="absolute left-[100%] top-0 w-80 bg-[#161616] border-r border-neutral-800 h-full shadow-[20px_0_30px_rgba(0,0,0,0.6)] z-30 flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#161616]">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">{categories.find(c => c.id === addCategory)?.label}</h3>
              <button onClick={() => {setLeftTab(null); setAddCategory(null);}} className="text-neutral-500 hover:text-white text-lg leading-none">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {/* TEKST */}
              {addCategory === 'tekst' && (
                <>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest border-b border-neutral-800 pb-2">Tytuły</p>
                  <button onClick={() => handleAddBlock('h1', 'brand')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition"><span className="text-3xl font-black text-blue-500 uppercase tracking-tighter">Markowy Tytuł</span></button>
                  <button onClick={() => handleAddBlock('h1')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition"><span className="text-2xl font-bold text-white">Zwykły Tytuł</span></button>
                  
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest border-b border-neutral-800 pb-2 mt-4">Nagłówki</p>
                  <button onClick={() => handleAddBlock('h2', 'brand')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition"><span className="text-xl font-bold text-white border-b-2 border-blue-500 pb-1">Markowy Nagłówek</span></button>
                  <button onClick={() => handleAddBlock('h2')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition"><span className="text-lg font-semibold text-white">Nagłówek</span></button>
                  
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest border-b border-neutral-800 pb-2 mt-4">Akapity</p>
                  <button onClick={() => handleAddBlock('p', 'brand')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition"><span className="text-sm text-neutral-300 italic border-l-2 border-blue-500 pl-2 block">Markowy akapit z wcięciem...</span></button>
                  <button onClick={() => handleAddBlock('p')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition"><span className="text-sm text-neutral-400 block">Zwykły akapit...</span></button>
                  
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest border-b border-neutral-800 pb-2 mt-4">Inne</p>
                  <button onClick={() => handleAddBlock('text', 'text-combo')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition flex flex-col gap-2"><span className="font-bold text-white">Tytuł Z Akapitem</span><span className="text-xs text-neutral-500">Zgrupowany układ tekstowy</span></button>
                  <button onClick={() => handleAddBlock('h1', 'marquee')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition overflow-hidden whitespace-nowrap"><span className="text-sm font-bold text-white animate-pulse">Tekst przewijany (Marquee) ➡</span></button>
                  <button onClick={() => handleAddBlock('text', 'faq')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-left transition text-sm font-bold text-white">Tekst Zwijany (Akordeon) ▼</button>
                </>
              )}

              {/* OBRAZ */}
              {addCategory === 'obraz' && (
                <>
                  <button onClick={() => handleAddBlock('img', 'site')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left transition flex gap-3 items-center"><div className="w-12 h-12 bg-[#333] rounded flex items-center justify-center text-lg">🖼️</div> <div>Obraz strony (Cover)</div></button>
                  <button onClick={() => handleAddBlock('img', 'photo')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left transition flex gap-3 items-center"><div className="w-12 h-12 bg-[#333] rounded flex items-center justify-center text-lg">📷</div> <div>Zdjęcie (Klasyczne)</div></button>
                  <button onClick={() => handleAddBlock('img', 'illustration')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left transition flex gap-3 items-center"><div className="w-12 h-12 bg-[#333] rounded flex items-center justify-center text-lg">🎨</div> <div>Ilustracja (Wektor)</div></button>
                  <button onClick={() => handleAddBlock('img', 'transparent')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left transition flex gap-3 items-center"><div className="w-12 h-12 bg-[#333] rounded flex items-center justify-center text-[10px]">PNG</div> <div>Wycięte tło (Logo/Ikona)</div></button>
                  <button onClick={() => handleAddBlock('carousel')} className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left transition flex gap-3 items-center border border-indigo-500/30"><div className="w-12 h-12 bg-indigo-900/30 text-indigo-400 rounded flex items-center justify-center text-lg">🎠</div> <div>Galeria (Slider)</div></button>
                </>
              )}

              {/* PRZYCISK */}
              {addCategory === 'przycisk' && (
                <>
                  <button onClick={() => handleAddBlock('button')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition flex justify-center"><div className="bg-white text-black font-bold py-3 px-8 rounded-full text-xs shadow-lg">Zwykły Przycisk</div></button>
                  <button onClick={() => handleAddBlock('button', 'social-bar')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition flex justify-center text-2xl tracking-widest">📘📸🐦</button>
                  <button onClick={() => handleAddBlock('button', 'share-buttons')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition flex justify-center"><div className="border border-white text-white py-2 px-6 rounded-full text-xs">🔗 Udostępnij</div></button>
                </>
              )}

              {/* GRAFIKA */}
              {addCategory === 'grafika' && (
                <>
                  <button onClick={() => handleAddBlock('shape', 'shape-box')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left flex items-center gap-3"><div className="w-6 h-6 bg-blue-500 rounded-sm"></div> Podstawowe Kształty</button>
                  <button onClick={() => handleAddBlock('img', 'illustration')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left flex items-center gap-3">🎨 Grafika Wektorowa</button>
                  <button onClick={() => handleAddBlock('img', 'transparent')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left flex items-center gap-3">⭐ Ikony / Naklejki</button>
                  <button onClick={() => handleAddBlock('h1', 'logo')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left flex items-center gap-3">🆎 Typografia Logo</button>
                  <button onClick={() => handleAddBlock('shape', 'line')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left flex items-center gap-3"><div className="w-8 h-0.5 bg-neutral-400"></div> Linie</button>
                </>
              )}

              {/* POLE (LAYOUT) */}
              {addCategory === 'pole' && (
                <>
                  <button onClick={() => handleAddBlock('container', 'box-empty')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] border border-dashed border-neutral-500 rounded-xl text-xs font-bold text-center text-neutral-400">Puste Pole (Container)</button>
                  <button onClick={() => handleAddBlock('container', 'box-designed')} className="p-5 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl text-xs font-bold text-center border border-neutral-700 shadow-xl">Zaprojektowane Pole (Stylizowane)</button>
                  <button onClick={() => handleAddBlock('carousel')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-center text-indigo-400 border border-indigo-900/50">Pokaz Slajdów (Box)</button>
                </>
              )}

              {/* WIDEO */}
              {addCategory === 'wideo' && (
                <>
                  <button onClick={() => handleAddBlock('video')} className="p-6 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition flex flex-col items-center gap-2"><span className="text-4xl text-red-500">▶️</span><span className="text-xs font-bold text-white">Szerokie Wideo (YouTube)</span></button>
                  <button onClick={() => handleAddBlock('video', 'video-social')} className="p-6 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition flex flex-col items-center gap-2 border border-pink-500/30"><div className="w-12 h-20 bg-neutral-800 rounded flex items-center justify-center border border-pink-500">📱</div><span className="text-xs font-bold text-white">Wideo Social Media (Pionowe)</span></button>
                </>
              )}

              {/* FORMULARZE */}
              {addCategory === 'formularz' && (
                <>
                  <button onClick={() => handleAddBlock('form')} className="p-4 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-900/50 text-emerald-400 rounded-xl text-xs font-bold text-left">📝 Klasyczny Formularz</button>
                  <button onClick={() => handleAddBlock('text', 'faq')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left">💬 Blok FAQ (Akordeon)</button>
                  <button onClick={() => handleAddBlock('map')} className="p-4 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-xs font-bold text-left">🌍 Mapa Google</button>
                </>
              )}

              {/* MENU */}
              {addCategory === 'menu' && (
                <>
                  <button onClick={() => handleAddBlock('menu', 'menu-horizontal')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition font-bold text-[9px] tracking-widest text-neutral-300 border border-neutral-700">A    B    C <br/><span className="text-neutral-500 block mt-2 normal-case">Menu Poziome</span></button>
                  <button onClick={() => handleAddBlock('menu', 'menu-vertical')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition font-bold text-[9px] tracking-widest text-neutral-300 border border-neutral-700 flex flex-col items-center"><span>A</span><span>B</span><span>C</span><span className="text-neutral-500 block mt-2 normal-case">Menu Pionowe</span></button>
                  <button onClick={() => handleAddBlock('menu', 'menu-hamburger')} className="p-5 bg-[#222] hover:bg-[#2A2A2A] rounded-xl text-center transition font-bold text-2xl text-neutral-300 border border-neutral-700">☰ <br/><span className="text-neutral-500 block mt-2 text-[9px] normal-case tracking-normal">Menu Hamburger</span></button>
                </>
              )}

              {/* POZOSTAŁE KATEGORIE */}
              {addCategory === 'popup' && <button onClick={() => handleAddBlock('popup')} className="p-5 bg-purple-900/20 text-purple-400 rounded-xl text-center font-bold text-xs border border-purple-900/50">🪟 Generuj Okno Wyskakujące</button>}
              {addCategory === 'lista' && <button onClick={() => handleAddBlock('text', 'faq')} className="p-5 bg-[#222] rounded-xl text-left text-xs font-bold">💬 Rozwijana Lista FAQ</button>}
              {addCategory === 'galeria' && (
                <>
                  <button onClick={() => handleAddBlock('carousel')} className="p-4 bg-indigo-900/20 text-indigo-400 rounded-xl text-left font-bold text-xs border border-indigo-900/50">🖼️ Galeria Klasyczna</button>
                  <button onClick={() => handleAddBlock('carousel')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs">🎠 Pokaz Slajdów (Auto)</button>
                  <button onClick={() => handleAddBlock('grid', 'insta-feed')} className="p-4 bg-pink-900/20 text-pink-400 rounded-xl text-left font-bold text-xs border border-pink-900/50">📸 Kanał Instagram (Siatka)</button>
                </>
              )}
              {addCategory === 'social' && (
                <>
                  <button onClick={() => handleAddBlock('button', 'social-bar')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs">📱 Pasek Społecznościowy</button>
                  <button onClick={() => handleAddBlock('video', 'video-social')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs">▶️ Wideo z Social Media</button>
                  <button onClick={() => handleAddBlock('button', 'share-buttons')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs">🔗 Przyciski Udostępniania</button>
                  <button onClick={() => handleAddBlock('grid', 'insta-feed')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs">📸 Kanał Insta</button>
                </>
              )}
              {addCategory === 'embed' && (
                <>
                  <button onClick={() => handleAddBlock('embed', 'embed-html')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs border border-green-900/50 text-green-400 font-mono">{'</>'} Osadzony Kod HTML</button>
                  <button onClick={() => handleAddBlock('embed', 'embed-site')} className="p-4 bg-[#222] rounded-xl text-left font-bold text-xs">🌍 Osadź Stronę (iFrame URL)</button>
                </>
              )}
              {addCategory === 'app' && <button onClick={() => handleAddBlock('app')} className="p-5 bg-[#222] rounded-xl text-center text-xs font-bold border border-dashed border-neutral-500 text-neutral-400">🧩 Zainstaluj Aplikację (Widget)</button>}
            </div>
          </div>
        )}
      </div>

      {/* 3. ŚRODEK (PŁÓTNO) i 4. PRAWY INSPEKTOR - POZOSTAJĄ BEZ ZMIAN */}
      <div className="flex-1 flex flex-col relative bg-[#222]">
        <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">URL:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1 rounded outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded transition">ZAPISZ</button>
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
              <button onClick={() => setRightTab('design')} className={`flex-1 py-3 transition ${rightTab==='design'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>STYL</button>
              <button onClick={() => setRightTab('interactions')} className={`flex-1 py-3 transition ${rightTab==='interactions'?'border-b-2 border-blue-500 text-blue-400':'text-neutral-500 hover:text-neutral-300'}`}>TREŚĆ</button>
            </div>

            <div className="p-5 flex flex-col gap-6 pb-20">
              {rightTab === 'layout' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-bold text-neutral-500">POZYCJA W DOKUMENCIE</label>
                  <select value={activeBlock.styles.position} onChange={e => updateActiveBlock({ styles: { position: e.target.value }})} className="bg-black text-white p-2 text-xs border border-neutral-700 rounded"><option value="relative">Naturalna (Zgodnie z siatką)</option><option value="absolute">Swobodna (Przeciąganie)</option><option value="fixed">Zablokowana (Np. Popup / Menu)</option></select>
                  <label className="text-[9px] font-bold text-neutral-500 mt-2">SZEROKOŚĆ I WYSOKOŚĆ</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={activeBlock.styles.width} onChange={e => updateActiveBlock({ styles: { width: e.target.value }})} className="bg-black text-white p-2 text-xs border border-neutral-700 rounded" placeholder="Szerokość" />
                    <input type="text" value={activeBlock.styles.height} onChange={e => updateActiveBlock({ styles: { height: e.target.value }})} className="bg-black text-white p-2 text-xs border border-neutral-700 rounded" placeholder="Wysokość" />
                  </div>
                </div>
              )}

              {rightTab === 'design' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-bold text-neutral-500 block">KOLORY</label>
                  <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tła</span><input type="color" value={activeBlock.styles.backgroundColor || 'transparent'} onChange={e => updateActiveBlock({ styles: { backgroundColor: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Kolor tekstu</span><input type="color" value={activeBlock.styles.color || '#000000'} onChange={e => updateActiveBlock({ styles: { color: e.target.value }})} className="w-8 h-8 rounded border-0 p-0 bg-transparent cursor-pointer" /></div>
                </div>
              )}

              {rightTab === 'interactions' && (
                <div className="flex flex-col gap-3 text-xs">
                  <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane warstwy</label>
                  <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" />
                  {['h1', 'h2', 'p', 'button', 'input', 'textarea', 'menu', 'list', 'social', 'app', 'embed'].includes(activeBlock.type) && <textarea value={activeBlock.text} onChange={e => updateActiveBlock({ text: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={4} placeholder="Wpisz treść tekstu lub osadź kod HTML..." />}
                  {['img', 'map', 'embed'].includes(activeBlock.type) && <textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full mt-2" rows={2} placeholder="Adres URL lub Embed src..." />}
                </div>
              )}
            </div>
          </>
        ) : <div className="p-10 text-center text-neutral-600 text-xs mt-20">Wybierz element.</div>}
      </aside>
    </div>
  );
}