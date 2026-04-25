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
  
  // NOWOŚĆ: Stan wybranej podkategorii w menu "Dodaj"
  const [addCategory, setAddCategory] = useState<string>('tekst');
  
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('wix-killer');

  const handleAddBlock = (type: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: Block = {
      id: generateId(), type, name: type.toUpperCase(),
      children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
      hoverStyles: {}, entranceAnim: 'none',
      styles: { position: 'relative', display: 'block', padding: '10px', margin: '0px', width: '100%', height: 'auto', backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', backgroundImage: 'none', backgroundSize: 'cover', backgroundPosition: 'center' },
    };

    // 1. TEKST
    if (type === 'h1') { newBlock.text = 'Wielki Nagłówek'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; newBlock.styles.lineHeight = '1.2'; }
    if (type === 'h2') { newBlock.text = 'Podtytuł sekcji'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '700'; }
    if (type === 'p') { newBlock.text = 'To jest akapit. Kliknij tutaj, aby edytować tekst i dodać własną treść.'; newBlock.styles.fontSize = '16px'; newBlock.styles.color = '#4b5563'; }
    
    // 2. OBRAZ
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'; newBlock.styles.width = '100%'; newBlock.styles.height = '300px'; newBlock.styles.objectFit = 'cover'; newBlock.styles.borderRadius = '12px'; }
    if (type === 'img-contain') { newBlock.type = 'img'; newBlock.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'; newBlock.styles.width = '200px'; newBlock.styles.height = '200px'; newBlock.styles.objectFit = 'contain'; }

    // 3. PRZYCISK
    if (type === 'button') { newBlock.text = 'KLIKNIJ MNIE'; newBlock.styles.backgroundColor = '#000000'; newBlock.styles.color = '#ffffff'; newBlock.styles.padding = '16px 32px'; newBlock.styles.borderRadius = '8px'; newBlock.styles.width = 'fit-content'; newBlock.styles.fontWeight = 'bold'; }
    
    // 4. GRAFIKA
    if (type === 'shape-box') { newBlock.type = 'shape'; newBlock.styles.width = '150px'; newBlock.styles.height = '150px'; newBlock.styles.backgroundColor = '#3b82f6'; newBlock.styles.borderRadius = '16px'; }
    if (type === 'shape-circle') { newBlock.type = 'shape'; newBlock.styles.width = '150px'; newBlock.styles.height = '150px'; newBlock.styles.backgroundColor = '#ec4899'; newBlock.styles.borderRadius = '50%'; }
    if (type === 'line') { newBlock.type = 'shape'; newBlock.styles.width = '100%'; newBlock.styles.height = '2px'; newBlock.styles.backgroundColor = '#e5e7eb'; }

    // 5. POLE (Box/Layout)
    if (type === 'section') { newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.padding = '80px 20px'; }
    if (type === 'container') { newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '15px'; newBlock.styles.minHeight = '100px'; newBlock.styles.backgroundColor = '#f9fafb'; newBlock.styles.padding = '20px'; newBlock.styles.borderRadius = '12px'; }
    if (type === 'grid') { newBlock.styles.display = 'grid'; newBlock.styles.gridTemplateColumns = 'repeat(2, 1fr)'; newBlock.styles.gap = '20px'; newBlock.styles.minHeight = '100px'; }

    // 6. WIDEO
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width = '100%'; newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; }

    // 7. FORMULARZ
    if (type === 'form') { newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '15px'; newBlock.styles.padding = '30px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '12px'; newBlock.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; }
    if (type === 'input') { newBlock.name = 'email'; newBlock.text = 'Adres e-mail'; newBlock.styles.padding = '14px 16px'; newBlock.styles.border = '1px solid #e5e7eb'; newBlock.styles.borderRadius = '8px'; newBlock.styles.backgroundColor = '#f9fafb'; }
    if (type === 'textarea') { newBlock.name = 'message'; newBlock.text = 'Twoja wiadomość...'; newBlock.styles.padding = '14px 16px'; newBlock.styles.border = '1px solid #e5e7eb'; newBlock.styles.borderRadius = '8px'; newBlock.styles.height = '120px'; }

    // 8. MENU
    if (type === 'menu') { newBlock.text = 'STRONA GŁÓWNA | O NAS | USŁUGI | KONTAKT'; newBlock.styles.width = '100%'; newBlock.styles.padding = '20px 0'; newBlock.styles.fontWeight = 'bold'; newBlock.styles.textAlign = 'center'; newBlock.styles.borderBottom = '1px solid #eee'; }

    // 9. OKNO WYSKAKUJĄCE (POPUP)
    if (type === 'popup') { newBlock.styles.position = 'absolute'; newBlock.styles.top = '50%'; newBlock.styles.left = '50%'; newBlock.styles.transform = 'translate(-50%, -50%)'; newBlock.styles.width = '400px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.padding = '40px'; newBlock.styles.borderRadius = '20px'; newBlock.styles.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)'; newBlock.styles.zIndex = '999'; }

    // 10. LISTA
    if (type === 'list') { newBlock.text = '• Pierwszy element\n• Drugi element\n• Trzeci element'; newBlock.styles.lineHeight = '2'; newBlock.styles.fontSize = '16px'; }

    // 11. GALERIA (Karuzela)
    if (type === 'gallery') {
      newBlock.type = 'carousel';
      newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', 'https://images.unsplash.com/photo-1555421689-491a97ff2040'];
      newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; newBlock.styles.overflow = 'hidden';
    }

    // 12. SOCIAL MEDIA
    if (type === 'social') { newBlock.text = '📘 Facebook   📸 Instagram   🐦 Twitter'; newBlock.styles.fontSize = '24px'; newBlock.styles.textAlign = 'center'; newBlock.styles.letterSpacing = '10px'; }

    // 13. OSADZONA TREŚĆ (Embed / Map)
    if (type === 'embed') { newBlock.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.435749704257!2d21.008453415796853!3d52.2322129797615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471eccf75b7b1fb9%3A0xc3f3bdf5c1b6bd5c!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1620000000000!5m2!1spl!2spl'; newBlock.styles.width = '100%'; newBlock.styles.height = '350px'; newBlock.styles.borderRadius = '12px'; }

    // 14. APP
    if (type === 'app') { newBlock.text = 'WIDGET APLIKACJI (Placeholder)'; newBlock.styles.backgroundColor = '#1e1b4b'; newBlock.styles.color = '#c7d2fe'; newBlock.styles.padding = '40px'; newBlock.styles.textAlign = 'center'; newBlock.styles.borderRadius = '12px'; newBlock.styles.border = '2px dashed #6366f1'; }


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
    if (error) alert(error.message); else alert(`Zapisano! Link: /live/${pageSlug}`);
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
        
        {b.type === 'h1' || b.type === 'h2' ? <h1 style={{fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</h1> : null}
        {b.type === 'p' && <p style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0}}>{b.text}</p>}
        {b.type === 'list' && <div style={{fontSize:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', whiteSpace:'pre-wrap'}}>{b.text}</div>}
        {b.type === 'img' && <img src={b.src} alt="img" className="w-full h-full pointer-events-none" style={{objectFit: b.styles.objectFit, borderRadius: b.styles.borderRadius}}/>}
        {b.type === 'button' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent: b.styles.textAlign === 'center' ? 'center' : b.styles.textAlign === 'right' ? 'flex-end' : 'flex-start'}}>{b.text}</div>}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%'}}></div>}
        {b.type === 'menu' && <nav style={{width:'100%', height:'100%'}}>{b.text}</nav>}
        {b.type === 'social' && <div style={{width:'100%', height:'100%'}}>{b.text}</div>}
        {b.type === 'app' && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold'}}>{b.text}</div>}
        {b.type === 'input' && <div className="w-full h-full flex items-center text-neutral-400 pointer-events-none">{b.text}</div>}
        {b.type === 'textarea' && <div className="w-full h-full text-neutral-400 pointer-events-none">{b.text}</div>}
        {b.type === 'embed' && <div className="w-full h-full bg-neutral-200 pointer-events-none flex items-center justify-center text-neutral-500 font-bold border border-neutral-300">🖼️ Osadzona treść (iFrame/Map)</div>}
        
        {b.type === 'carousel' && b.images && (
          <div className="w-full h-full relative overflow-hidden bg-neutral-100 pointer-events-none">
            <img src={b.images[0]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white font-bold tracking-widest border-4 border-blue-500/50"><span className="text-sm bg-black/60 px-4 py-2 rounded-full backdrop-blur">🎠 Karuzela (Galeria)</span></div>
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

  // LISTA KATEGORII WIX
  const categories = [
    { id: 'tekst', label: 'Tekst', icon: 'T' },
    { id: 'obraz', label: 'Obraz', icon: '🖼️' },
    { id: 'przycisk', label: 'Przycisk', icon: '👆' },
    { id: 'grafika', label: 'Grafika', icon: '⭐' },
    { id: 'pole', label: 'Pole / Layout', icon: '📦' },
    { id: 'wideo', label: 'Wideo', icon: '▶️' },
    { id: 'formularz', label: 'Formularz', icon: '📝' },
    { id: 'menu', label: 'Menu', icon: '☰' },
    { id: 'popup', label: 'Okno wyskakujące', icon: '🪟' },
    { id: 'lista', label: 'Lista', icon: '📋' },
    { id: 'galeria', label: 'Galeria', icon: '🎠' },
    { id: 'social', label: 'Social Media', icon: '❤️' },
    { id: 'embed', label: 'Osadzona treść', icon: '🔗' },
    { id: 'app', label: 'Aplikacje (App)', icon: '🧩' },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#0E0E0E] text-white font-sans overflow-hidden">
      
      {/* 1. WĄSKI PASEK NARZĘDZI (FAR LEFT) */}
      <aside className="w-14 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-4 gap-4 z-50">
        <button onClick={() => setLeftTab(leftTab==='add'?null:'add')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      {/* 2. ROZWIJANY PANEL ELEMENTÓW (WIX STYLE - 2 KOLUMNY DLA 'ADD') */}
      {leftTab && (
        <div className={`${leftTab === 'add' ? 'w-[450px] flex flex-row' : 'w-64 flex flex-col'} bg-[#161616] border-r border-neutral-800 h-full shadow-2xl z-40 transition-all`}>
          
          {leftTab === 'add' ? (
            <>
              {/* Kolumna lewa: Kategorie */}
              <div className="w-1/3 bg-[#111] border-r border-neutral-800 h-full flex flex-col overflow-y-auto pt-2">
                <div className="px-4 py-3 border-b border-neutral-800 mb-2 font-bold text-xs uppercase tracking-widest text-neutral-500">Dodaj</div>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setAddCategory(cat.id)} className={`w-full text-left px-4 py-3 text-[11px] font-medium transition flex items-center gap-2 ${addCategory === cat.id ? 'bg-neutral-800 text-white border-l-2 border-blue-500' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border-l-2 border-transparent'}`}>
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>
              
              {/* Kolumna prawa: Elementy do dodania */}
              <div className="w-2/3 h-full overflow-y-auto p-5 bg-[#161616]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{categories.find(c => c.id === addCategory)?.label}</h3>
                  <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button>
                </div>

                <div className="flex flex-col gap-3">
                  {addCategory === 'tekst' && (
                    <>
                      <button onClick={() => handleAddBlock('h1')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition"><span className="text-2xl font-black block">Wielki Tytuł</span><span className="text-[10px] text-neutral-400">Nagłówek sekcji (H1)</span></button>
                      <button onClick={() => handleAddBlock('h2')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition"><span className="text-lg font-bold block">Mały Tytuł</span><span className="text-[10px] text-neutral-400">Podtytuł (H2)</span></button>
                      <button onClick={() => handleAddBlock('p')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition"><span className="text-sm block">Akapit tekstu...</span><span className="text-[10px] text-neutral-400 mt-1 block">Zwykły blok tekstu</span></button>
                    </>
                  )}
                  {addCategory === 'obraz' && (
                    <>
                      <button onClick={() => handleAddBlock('img')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold text-left transition flex gap-3 items-center"><div className="w-12 h-12 bg-neutral-600 rounded flex items-center justify-center">🖼️</div> <div>Wypełnienie (Cover)<br/><span className="text-[9px] text-neutral-400 font-normal">Obraz na całą szerokość</span></div></button>
                      <button onClick={() => handleAddBlock('img-contain')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold text-left transition flex gap-3 items-center"><div className="w-12 h-12 bg-neutral-600 rounded flex items-center justify-center text-xs">Logo</div> <div>Dopasowanie (Contain)<br/><span className="text-[9px] text-neutral-400 font-normal">Idealne dla logo i ikon</span></div></button>
                    </>
                  )}
                  {addCategory === 'przycisk' && (
                    <button onClick={() => handleAddBlock('button')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition"><div className="bg-blue-600 text-white font-bold py-2 px-6 rounded inline-block text-xs">Standardowy Przycisk</div></button>
                  )}
                  {addCategory === 'grafika' && (
                    <>
                      <button onClick={() => handleAddBlock('shape-box')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-left">🟩 Kolorowy Kwadrat</button>
                      <button onClick={() => handleAddBlock('shape-circle')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-left">🔵 Koło (Kropka)</button>
                      <button onClick={() => handleAddBlock('line')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-left">➖ Linia separatora</button>
                    </>
                  )}
                  {addCategory === 'pole' && (
                    <>
                      <button onClick={() => handleAddBlock('section')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold text-left border border-neutral-600">🟩 Sekcja (Cała szerokość)</button>
                      <button onClick={() => handleAddBlock('container')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold text-left border border-neutral-700">🟦 Kontener (Pudełko)</button>
                      <button onClick={() => handleAddBlock('grid')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold text-left border border-neutral-700">🔲 Siatka (2 kolumny)</button>
                    </>
                  )}
                  {addCategory === 'wideo' && (
                    <button onClick={() => handleAddBlock('video')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition"><span className="text-3xl">▶️</span><br/><span className="text-xs mt-2 block font-bold">Odtwarzacz YouTube</span></button>
                  )}
                  {addCategory === 'formularz' && (
                    <>
                      <button onClick={() => handleAddBlock('form')} className="p-3 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-900/50 text-emerald-400 rounded-lg text-xs font-bold text-left">📝 Cały Formularz (Wysyła dane!)</button>
                      <button onClick={() => handleAddBlock('input')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-left">Krótkie Pole (Input)</button>
                      <button onClick={() => handleAddBlock('textarea')} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-left">Długa Wiadomość (Textarea)</button>
                    </>
                  )}
                  {addCategory === 'menu' && (
                    <button onClick={() => handleAddBlock('menu')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition font-bold text-xs tracking-widest border border-neutral-600">HOME | O NAS | KONTAKT</button>
                  )}
                  {addCategory === 'popup' && (
                    <button onClick={() => handleAddBlock('popup')} className="p-4 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-900/50 text-purple-400 rounded-lg text-center transition text-xs font-bold">🪟 Okno Wyskakujące (Modal / Z-index 999)</button>
                  )}
                  {addCategory === 'lista' && (
                    <button onClick={() => handleAddBlock('list')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition text-xs leading-loose">• Opcja A<br/>• Opcja B<br/>• Opcja C</button>
                  )}
                  {addCategory === 'galeria' && (
                    <button onClick={() => handleAddBlock('gallery')} className="p-4 bg-indigo-900/20 hover:bg-indigo-900/40 border border-indigo-900/50 text-indigo-400 rounded-lg text-center transition font-bold text-xs">🎠 Karuzela Zdjęć (Slider)</button>
                  )}
                  {addCategory === 'social' && (
                    <button onClick={() => handleAddBlock('social')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition text-xl tracking-widest">📘 📸 🐦</button>
                  )}
                  {addCategory === 'embed' && (
                    <button onClick={() => handleAddBlock('embed')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition text-xs font-bold">🌍 Osadź Mapę Google (iFrame)</button>
                  )}
                  {addCategory === 'app' && (
                    <button onClick={() => handleAddBlock('app')} className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center transition text-xs font-bold border border-dashed border-neutral-500">🧩 Zewnętrzny Widget Aplikacji</button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-[#111]">
                <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Nawigator DOM</h2>
                <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}
              </div>
            </>
          )}
        </div>
      )}

      {/* 3. ŚRODEK (PŁÓTNO) */}
      <div className="flex-1 flex flex-col relative bg-[#222]">
        <header className="h-12 bg-[#1A1A1A] border-b border-black flex items-center justify-between px-6 z-30 shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Adres Publikacji:</span>
             <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value.toLowerCase())} className="bg-black text-white border border-neutral-800 text-xs px-3 py-1 rounded outline-none focus:border-blue-500 w-48" />
          </div>
          <button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-500 text-[11px] uppercase tracking-wider font-extrabold px-6 py-1.5 rounded transition">ZAPISZ PROJEKT</button>
        </header>

        <main className="flex-1 overflow-auto flex justify-center bg-[#111]" onClick={() => setActiveId(null)}>
          <div className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative overflow-hidden">
             {blocks.map(b => renderCanvasBlock(b))}
          </div>
        </main>
      </div>

      {/* 4. PRAWY INSPEKTOR (PROPERTIES) */}
      <aside className="w-[320px] bg-[#161616] border-l border-neutral-800 z-40 overflow-y-auto flex flex-col">
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

                  <div className="bg-neutral-900 p-3 rounded border border-neutral-800 flex flex-col gap-3">
                    <label className="text-[9px] font-bold text-neutral-500 block">OBRAMOWANIE</label>
                    <div className="flex items-center justify-between text-xs mt-1"><span className="text-neutral-400">Zaokrąglenie rogów</span><input type="text" value={activeBlock.styles.borderRadius || '0px'} onChange={e => updateActiveBlock({ styles: { borderRadius: e.target.value }})} className="bg-black text-white p-1.5 border border-neutral-700 rounded w-24 text-right"/></div>
                    <div className="flex flex-col gap-1 text-xs mt-2"><span className="text-neutral-400">Cień (Box Shadow)</span><input type="text" value={activeBlock.styles.boxShadow || 'none'} onChange={e => updateActiveBlock({ styles: { boxShadow: e.target.value }})} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" placeholder="0 10px 15px rgba(0,0,0,0.1)"/></div>
                  </div>
                </>
              )}

              {rightTab === 'interactions' && (
                <div className="flex flex-col gap-3 text-xs">
                  <label className="text-[9px] font-bold text-neutral-500 block uppercase">Dane logiczne i treści</label>
                  <label className="text-neutral-400">Nazwa warstwy:</label>
                  <input type="text" value={activeBlock.name} onChange={e => updateActiveBlock({ name: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" />
                  
                  {['h1', 'h2', 'p', 'button', 'input', 'textarea', 'menu', 'list', 'social', 'app'].includes(activeBlock.type) && <><label className="text-neutral-400 mt-2">Treść tekstowa:</label><textarea value={activeBlock.text} onChange={e => updateActiveBlock({ text: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" rows={4} /></>}
                  
                  {['img', 'embed'].includes(activeBlock.type) && <><label className="text-neutral-400 mt-2">Link Źródłowy (URL/iFrame src):</label><textarea value={activeBlock.src} onChange={e => updateActiveBlock({ src: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" rows={4} /></>}
                  
                  {activeBlock.type === 'video' && <><label className="text-neutral-400 mt-2">ID z YouTube:</label><input type="text" value={activeBlock.videoId} onChange={e => updateActiveBlock({ videoId: e.target.value })} className="bg-black text-white p-2 border border-neutral-700 rounded w-full" /></>}
                  
                  {['carousel', 'gallery'].includes(activeBlock.type) && (
                    <>
                      <label className="text-neutral-400 mt-2">Obrazy Galerii (Jeden pod drugim):</label>
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