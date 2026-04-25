'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { createBlock } from '../utils/blockFactory';
import TopHeader from '../components/TopHeader';
import LeftSidebar from '../components/LeftSidebar';
import RightPanel from '../components/RightPanel';
import TextFormatToolbar from '../components/TextFormatToolbar';
import TextPanel from '../components/TextPanel';
import ImagePanel from '../components/ImagePanel';
import ButtonPanel from '../components/ButtonPanel'; // Wpinamy nową wtyczkę przycisków!

interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; hoverStyles?: any; entranceAnim?: string; ribbonItems?: { type: 'text' | 'img', value: string }[];
  styles: any;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('titan-v15');
  
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

  const [interaction, setInteraction] = useState<{ type: 'drag' | 'resize'; startX: number; startY: number; initialLeft: number; initialTop: number; initialWidth: number; initialHeight: number; } | null>(null);

  const updateActiveBlock = (updates: any) => {
    setBlocks(prevBlocks => {
      const updateRecursive = (arr: Block[]): Block[] => arr.map(b => {
        if (b.id === activeId) return { ...b, ...updates, styles: { ...b.styles, ...(updates.styles || {}) }, hoverStyles: { ...(b.hoverStyles || {}), ...(updates.hoverStyles || {}) } };
        if (b.children) return { ...b, children: updateRecursive(b.children) }; return b;
      });
      return updateRecursive(prevBlocks);
    });
  };

  const findBlockById = (arr: Block[], id: number | null): Block | null => {
    for (const b of arr) { if (b.id === id) return b; if (b.children) { const f = findBlockById(b.children, id); if (f) return f; } } return null;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!interaction || !activeId || isEditing || isMediaManagerOpen) return; e.preventDefault();
      const dx = (e.clientX - interaction.startX) / canvasZoom; const dy = (e.clientY - interaction.startY) / canvasZoom;
      if (interaction.type === 'drag') updateActiveBlock({ styles: { left: `${interaction.initialLeft + dx}px`, top: `${interaction.initialTop + dy}px` } });
      else if (interaction.type === 'resize') updateActiveBlock({ styles: { width: `${Math.max(20, interaction.initialWidth + dx)}px`, height: `${Math.max(20, interaction.initialHeight + dy)}px` } });
    };
    const handleMouseUp = () => setInteraction(null);
    if (interaction) { window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseup', handleMouseUp); }
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [interaction, activeId, canvasZoom, isEditing, isMediaManagerOpen]);

  // FIX SCROLLOWANIA: Synchroniczne zapobieganie przewijaniu
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!activeId || isMediaManagerOpen) return;
      const activeEl = document.getElementById(`block-${activeId}`);
      if (activeEl && activeEl.contains(e.target as Node)) {
        
        // Sprawdzamy czy to klasa zdjęcia, żeby zablokować scrollowanie synchronicznie (bez czekania na Reacta)
        if (activeEl.classList.contains('group/img')) {
          e.preventDefault(); 
          e.stopPropagation();

          setBlocks(prevBlocks => {
            const currentBlock = findBlockById(prevBlocks, activeId); 
            if (!currentBlock || currentBlock.type !== 'img') return prevBlocks;
            const newScale = Math.max(1, Math.min(10, (currentBlock.styles.imageScale || 1) - e.deltaY * 0.005));
            const updateRecursive = (arr: Block[]): Block[] => arr.map(b => b.id === activeId ? { ...b, styles: { ...b.styles, imageScale: newScale } } : (b.children ? { ...b, children: updateRecursive(b.children) } : b));
            return updateRecursive(prevBlocks);
          });
        }
      }
    };
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, [activeId, isMediaManagerOpen]);

  const handleAddBlock = (type: string, variant: string, label: string) => {
    const newBlock = createBlock(type, variant, label);
    setBlocks(prev => {
      const activeBlock = findBlockById(prev, activeId);
      if (activeBlock && activeBlock.children) { const newArr = [...prev]; const target = findBlockById(newArr, activeId); target!.children!.push(newBlock); return newArr; } 
      return [...prev, newBlock];
    });
    setActiveId(newBlock.id);
  };

  const removeActiveBlock = () => {
    setBlocks(prev => {
      const removeRecursive = (arr: Block[]): Block[] => arr.filter(b => b.id !== activeId).map(b => ({ ...b, children: b.children ? removeRecursive(b.children) : undefined }));
      return removeRecursive(prev);
    });
    setActiveId(null); setIsEditing(false); setIsMediaManagerOpen(false);
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Opublikowano Architekture Modułową! Link: /live/${pageSlug}`);
  };

  const activeBlock = findBlockById(blocks, activeId);

  const renderTextElement = (Tag: keyof JSX.IntrinsicElements, b: Block) => {
    const isActive = activeId === b.id;
    return (
      <Tag style={{ fontSize:'inherit', fontWeight:'inherit', color:'inherit', textAlign:b.styles.textAlign, lineHeight:'inherit', margin:0, overflow:'hidden', wordBreak:'break-word', outline: 'none', cursor: (isActive && isEditing) ? 'text' : 'inherit', textShadow: b.styles.textShadow, width: '100%', height: '100%', display: Tag === 'div' ? 'flex' : 'block', alignItems: b.styles.alignItems, justifyContent: b.styles.justifyContent, zIndex: b.styles.zIndex || 1, position: 'relative' }}
        contentEditable={isActive && isEditing} suppressContentEditableWarning={true}
        onDoubleClick={(e: any) => { e.stopPropagation(); setIsEditing(true); }}
        onBlur={(e: any) => { setIsEditing(false); updateActiveBlock({ text: e.currentTarget.innerHTML }); }} dangerouslySetInnerHTML={{ __html: b.text || '' }}
      />
    );
  };

  const renderCanvasBlock = (b: Block) => {
    const isActive = activeId === b.id;
    const isAbsolute = b.styles.position === 'absolute' || b.styles.position === 'fixed';
    
    const hasMediaBg = b.styles.bgType === 'image' || b.styles.bgType === 'video';
    const bgStyles = { ...b.styles };
    if (b.styles.bgType === 'image') bgStyles.backgroundImage = b.styles.bgImage?.includes('gradient') ? b.styles.bgImage : `url(${b.styles.bgImage})`;
    if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
    const containerStyles = { ...bgStyles, filter: `blur(${b.styles.filterBlur || 0}px) brightness(${b.styles.filterBrightness ?? 100}%) contrast(${b.styles.filterContrast ?? 100}%)`, mixBlendMode: b.styles.mixBlendMode || 'normal', cursor: isAbsolute && !isEditing && !isMediaManagerOpen ? 'move' : 'default', zIndex: b.styles.zIndex || 1 };

    return (
      <div id={`block-${b.id}`} key={b.id} style={containerStyles} onClick={(e) => { e.stopPropagation(); }} 
        onMouseDown={(e) => { e.stopPropagation(); if (activeId !== b.id) { setActiveId(b.id); setIsEditing(false); } if ((isActive && isEditing) || isMediaManagerOpen) return; if (isAbsolute) setInteraction({ type: 'drag', startX: e.clientX, startY: e.clientY, initialLeft: parseInt(b.styles.left) || 0, initialTop: parseInt(b.styles.top) || 0, initialWidth: 0, initialHeight: 0 }); }}
        className={`group transition-all duration-200 ${isActive ? 'outline outline-2 outline-blue-500 outline-offset-0' : 'hover:outline hover:outline-1 hover:outline-blue-400 hover:outline-dashed'}`}
      >
        {b.styles.bgType === 'video' && b.styles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={b.styles.bgVideo} />}
        {b.styles.bgOverlay && (b.styles.bgType === 'image' || b.styles.bgType === 'video') && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: b.styles.bgOverlay, zIndex: 1 }}></div>}
        {isActive && !isEditing && <div className="absolute -top-6 left-[-2px] bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-t font-bold shadow-sm whitespace-nowrap z-[100]">{b.name}</div>}
        
        {isActive && !isEditing && (
          <>
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-[100] pointer-events-none" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-[100] pointer-events-none" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-[100] pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm cursor-se-resize z-[100] hover:bg-blue-500 transition-colors" onMouseDown={(e) => { e.stopPropagation(); setInteraction({ type: 'resize', startX: e.clientX, startY: e.clientY, initialLeft: 0, initialTop: 0, initialWidth: e.currentTarget.parentElement?.offsetWidth || 0, initialHeight: e.currentTarget.parentElement?.offsetHeight || 0 }); }} />
          </>
        )}

        {['h1', 'h2', 'marquee'].includes(b.type) && renderTextElement('h1', b)}
        {b.type === 'p' && renderTextElement('p', b)}
        {b.type === 'list' && renderTextElement('div', b)}
        {b.type === 'faq' && renderTextElement('div', b)}
        {b.type === 'button' && renderTextElement('div', b)}
        {b.type === 'menu' && renderTextElement('nav', b)}
        {b.type === 'social' && renderTextElement('div', b)}
        
        {b.type === 'ribbon' && b.ribbonItems && (
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', height: '100%', zIndex: b.styles.zIndex || 1, position: 'relative', pointerEvents:'none' }}>
             {[1, 2].map(group => (
               <div key={group} style={{ display: 'flex', flexShrink: 0, minWidth: '100%', justifyContent: 'space-around', animation: 'scroll-marquee 15s linear infinite' }}>
                 {b.ribbonItems!.map((item, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 30px' }}>
                     {item.type === 'img' ? <img src={item.value} style={{ height: '1.2em', objectFit: 'contain' }} /> : <span style={{fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit'}} dangerouslySetInnerHTML={{ __html: item.value }}/>}
                   </div>
                 ))}
               </div>
             ))}
          </div>
        )}

        {b.type === 'shape' && <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}}></div>}
        {b.type === 'embed' && b.styles.backgroundColor === '#111' && <div className="w-full h-full flex items-center justify-center text-neutral-500 font-bold border border-neutral-300 pointer-events-none text-center p-4 z-10 relative">⚙️ {b.text}</div>}
        {b.type === 'embed' && b.styles.backgroundColor !== '#111' && <div className="w-full h-full flex items-center justify-center text-neutral-500 font-bold border border-neutral-300 pointer-events-none text-center p-4 z-10 relative">🌍 iFrame URL: {b.src}</div>}
        {b.type === 'map' && <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-500 font-bold border border-neutral-300 pointer-events-none z-10 relative">🗺️ Mapa Google</div>}
        {['input', 'textarea'].includes(b.type) && <div className="w-full h-full flex items-center text-neutral-400 pointer-events-none border border-neutral-300 rounded p-2 bg-neutral-50 z-10 relative">{b.text}</div>}
        
        {/* Tu dodajemy klase group/img, dzieki ktorej dziala powyzszy fix na scroll */}
        {b.type === 'img' && (
          <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: b.styles.borderRadius, position: 'relative', zIndex: b.styles.zIndex || 1}} className="group/img">
            <img src={b.src} className={`w-full h-full pointer-events-none transition-all duration-500 ${b.styles.imgHoverZoom ? 'group-hover/img:scale-110' : ''} ${b.styles.imgGrayscale ? 'grayscale group-hover/img:grayscale-0' : ''}`} style={{objectFit: b.styles.objectFit, objectPosition: `${b.styles.objectPositionX || 50}% ${b.styles.objectPositionY || 50}%`, transform: b.styles.imgHoverZoom ? undefined : `scale(${b.styles.imageScale || 1})`}} />
          </div>
        )}
        
        {b.type === 'carousel' && b.images && (
          <div className="w-full h-full relative overflow-hidden bg-neutral-100 pointer-events-none z-10">
            <img src={b.images[0]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white font-bold tracking-widest"><span className="text-sm bg-black/60 px-4 py-2 rounded-full">🎠 Galeria ({b.images.length})</span></div>
          </div>
        )}
        
        {b.children && (
          <div className="w-full h-full min-h-[40px] relative pointer-events-none" style={{zIndex: b.styles.zIndex || 1}}>
             {b.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic">Upuść elementy</span>}
             <div className="pointer-events-auto w-full h-full" style={{ display: 'inherit', flexDirection: 'inherit', gap: 'inherit', gridTemplateColumns: 'inherit', alignItems: 'inherit', justifyItems: 'inherit', justifyContent: 'inherit' }}>
                {b.children.map(child => renderCanvasBlock(child))}
             </div>
          </div>
        )}
      </div>
    );
  };

  const isTextType = activeBlock && ['h1', 'h2', 'p', 'button', 'marquee', 'faq', 'list', 'menu', 'social'].includes(activeBlock.type);

  // Zredukowane menu - "tekst", "obraz" i "przycisk" usunięte z głównego słownika
  const categories = [
    { id: 'tekst', label: 'Tekst', icon: 'T' }, { id: 'obraz', label: 'Obraz', icon: '🖼️' }, { id: 'przycisk', label: 'Przycisk', icon: '👆' },
    { id: 'grafika', label: 'Grafika', icon: '⭐' }, { id: 'pola', label: 'Pola i Sekcje', icon: '📦' }, { id: 'wideo', label: 'Wideo', icon: '▶️' },
    { id: 'formularze', label: 'Formularze', icon: '📝' }, { id: 'menu', label: 'Menu', icon: '☰' }, { id: 'wyskakujace', label: 'Wyskakujące okna', icon: '🪟' },
    { id: 'social', label: 'Social Media', icon: '❤️' }, { id: 'osadzona', label: 'Osadzona treść', icon: '🔗' }
  ];

  const menuOptions: Record<string, {label: string, type: string, variant: string}[]> = {
    grafika: [ { label: 'Kwadrat', type: 'shape', variant: 'box' }, { label: 'Koło', type: 'shape', variant: 'circle' }, { label: 'Linia', type: 'shape', variant: 'line' } ],
    pola: [ { label: 'Sekcja Klasyczna', type: 'section', variant: '' }, { label: '🎬 Wideo Hero', type: 'section', variant: 'video-hero' }, { label: 'Puste pole', type: 'container', variant: 'empty' }, { label: 'Zaprojektowane', type: 'container', variant: 'designed' } ],
    wideo: [ { label: 'YouTube Wideo', type: 'video', variant: '' } ],
    formularze: [ { label: 'Formularz Kontaktowy', type: 'form', variant: '' }, { label: 'Pole Tekstowe', type: 'input', variant: '' }, { label: 'Wiadomość', type: 'textarea', variant: '' }, { label: 'Mapa Google', type: 'map', variant: '' } ],
    menu: [ { label: 'Menu Poziome', type: 'menu', variant: 'horizontal' }, { label: 'Menu Pionowe', type: 'menu', variant: 'vertical' }, { label: 'Menu Hamburger', type: 'menu', variant: 'hamburger'} ],
    wyskakujace: [ { label: 'Popup', type: 'popup', variant: '' } ],
    social: [ { label: 'Ikonki Social', type: 'social', variant: '' }, { label: 'Pasek Udostępniania', type: 'button', variant: 'share' }, { label: 'Kanał Insta', type: 'grid', variant: 'insta'} ],
    osadzona: [ { label: 'iFrame Strony', type: 'embed', variant: 'site' }, { label: 'Własny kod HTML', type: 'embed', variant: 'html' } ]
  };

  const handleAddMedia = () => { if (!activeBlock || !activeBlock.images) return; const newImages = [...activeBlock.images, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe']; updateActiveBlock({ images: newImages }); setSelectedMediaIndex(newImages.length - 1); };
  const handleUpdateMedia = (url: string) => { if (selectedMediaIndex === null || !activeBlock || !activeBlock.images) return; const newImages = [...activeBlock.images]; newImages[selectedMediaIndex] = url; updateActiveBlock({ images: newImages }); };
  const handleRemoveMedia = (index: number) => { if (!activeBlock || !activeBlock.images) return; const newImages = activeBlock.images.filter((_, i) => i !== index); updateActiveBlock({ images: newImages }); if (selectedMediaIndex === index) setSelectedMediaIndex(null); };
  const handleMoveMedia = (index: number, dir: 'left' | 'right') => { if (!activeBlock || !activeBlock.images) return; const newImages = [...activeBlock.images]; if (dir === 'left' && index > 0) { [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]; setSelectedMediaIndex(index - 1); } if (dir === 'right' && index < newImages.length - 1) { [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]]; setSelectedMediaIndex(index + 1); } updateActiveBlock({ images: newImages }); };

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <button onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} className={`text-left text-[11px] py-1.5 px-2 truncate transition flex items-center gap-2 ${activeId === b.id ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} style={{ paddingLeft: `${(depth * 12) + 8}px` }}>
          {b.children ? '📂' : '📄'} {b.name}
        </button>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="flex h-screen w-screen bg-[#0E0E0E] text-white font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `@keyframes scroll-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}} />

      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab==='add'?null:'add'); if(leftTab!=='add') setAddCategory('tekst'); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='add'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab==='layers'?null:'layers')} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab==='layers'?'bg-blue-600 text-white':'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
      </aside>

      <div className="relative z-40 h-full flex">
        {leftTab === 'add' && (
          <div className="w-56 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800"><span className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">DODAJ ELEMENT</span></div>
            <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat.id} onMouseEnter={() => setAddCategory(cat.id)} onClick={() => setAddCategory(cat.id)} className={`w-full text-left px-5 py-3 text-xs font-semibold transition flex items-center gap-3 border-l-2 ${addCategory === cat.id ? 'bg-neutral-800 text-white border-blue-500' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border-transparent'}`}><span className="w-4 text-center">{cat.icon}</span> {cat.label}</button>
              ))}
            </div>
          </div>
        )}
        {leftTab === 'layers' && (
          <div className="w-64 bg-[#111] border-r border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center"><h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Nawigator DOM</h2><button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button></div>
            <div className="flex-1 overflow-y-auto py-2">{blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}</div>
          </div>
        )}
        {leftTab === 'add' && addCategory && (
          <div className="absolute left-[100%] top-0 w-[340px] bg-[#161616] border-r border-neutral-800 h-full shadow-[20px_0_30px_rgba(0,0,0,0.6)] z-30 flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#161616]"><h3 className="text-[11px] font-bold text-white uppercase tracking-widest">{categories.find(c => c.id === addCategory)?.label}</h3><button onClick={() => {setLeftTab(null); setAddCategory(null);}} className="text-neutral-500 hover:text-white text-lg leading-none">✕</button></div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {addCategory === 'tekst' && <TextPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'obraz' && <ImagePanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'przycisk' && <ButtonPanel handleAddBlock={handleAddBlock} />}
              
              {addCategory !== 'tekst' && addCategory !== 'obraz' && addCategory !== 'przycisk' && menuOptions[addCategory]?.map((opt, i) => (
                <button key={i} onClick={() => handleAddBlock(opt.type, opt.variant, opt.label)} className="p-4 bg-[#222] hover:bg-[#2A2A2A] border border-neutral-800 rounded-lg text-left transition border-l-4 hover:border-l-blue-500"><span className="text-sm font-bold text-white block">{opt.label}</span></button>
              ))}
            </div>
            
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col relative bg-[#222]">
        <TopHeader canvasZoom={canvasZoom} setCanvasZoom={setCanvasZoom} showGrid={showGrid} setShowGrid={setShowGrid} pageSlug={pageSlug} setPageSlug={setPageSlug} handlePublish={handlePublish} />
        <TextFormatToolbar activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />
        <main className="flex-1 overflow-auto flex justify-center bg-[#111] p-10" onClick={() => { setActiveId(null); setIsEditing(false); }}>
          <div style={{ transform: `scale(${canvasZoom})`, transformOrigin: 'top center', transition: interaction ? 'none' : 'transform 0.2s ease-out' }} className="w-[1200px] min-h-screen bg-white text-black shadow-2xl relative overflow-hidden">
             {showGrid && <div className="absolute inset-0 pointer-events-none flex gap-4 px-[40px] z-0 opacity-[0.03]">{Array(12).fill(0).map((_,i) => <div key={i} className="flex-1 bg-blue-500 h-full"></div>)}</div>}
             {blocks.map(b => renderCanvasBlock(b))}
          </div>
        </main>
      </div>

      <RightPanel activeBlock={activeBlock} rightTab={rightTab} setRightTab={setRightTab as any} updateActiveBlock={updateActiveBlock} removeActiveBlock={removeActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />

      {isMediaManagerOpen && activeBlock && activeBlock.images && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center font-sans">
          <div className="bg-white w-[1000px] h-[650px] rounded-xl shadow-2xl flex flex-col text-neutral-800 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200"><h2 className="font-bold text-lg">Edytuj media</h2><button onClick={() => {setIsMediaManagerOpen(false); setSelectedMediaIndex(null);}} className="text-neutral-400 hover:text-black font-bold text-xl">✕</button></div>
            <div className="flex justify-between items-center px-6 py-3 border-b border-neutral-200 bg-neutral-50"><div className="flex gap-4 text-sm text-neutral-500"><span className="text-neutral-800 font-bold">Wybrano {selectedMediaIndex !== null ? 1 : 0}</span><button onClick={() => setSelectedMediaIndex(null)} className="hover:text-blue-600">Odznacz</button><button onClick={() => selectedMediaIndex !== null && handleRemoveMedia(selectedMediaIndex)} className={`hover:text-red-600 ${selectedMediaIndex === null ? 'opacity-50 cursor-not-allowed' : ''}`}>Usuń</button></div><button onClick={handleAddMedia} className="bg-[#1C58F2] hover:bg-blue-600 text-white font-bold py-2 px-6 rounded text-sm transition shadow">+ Dodaj obrazy</button></div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 p-6 overflow-y-auto bg-white"><div className="grid grid-cols-4 gap-6">{activeBlock.images.map((img, i) => (<div key={i} onClick={() => setSelectedMediaIndex(i)} className={`relative aspect-square bg-neutral-100 rounded-lg cursor-pointer overflow-hidden transition-all border-2 ${selectedMediaIndex === i ? 'border-[#1C58F2] shadow-lg ring-4 ring-blue-500/20' : 'border-transparent hover:border-neutral-300'}`}><div className="absolute top-2 left-2 bg-white/80 backdrop-blur w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-neutral-600 z-10 shadow-sm">{i + 1}</div><img src={img} className="w-full h-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex justify-between opacity-0 hover:opacity-100 transition-opacity"><button onClick={(e) => {e.stopPropagation(); handleMoveMedia(i, 'left');}} className="text-white hover:text-blue-400 font-bold">◀</button><button onClick={(e) => {e.stopPropagation(); handleMoveMedia(i, 'right');}} className="text-white hover:text-blue-400 font-bold">▶</button></div></div>))}</div></div>
              <div className="w-[320px] bg-neutral-50 border-l border-neutral-200 flex flex-col shadow-inner">{selectedMediaIndex !== null ? (<div className="p-6 flex flex-col gap-6 overflow-y-auto"><div className="w-full aspect-video bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300 shadow-sm"><img src={activeBlock.images[selectedMediaIndex]} className="w-full h-full object-cover" /></div><div className="flex flex-col gap-1"><label className="text-xs font-bold text-neutral-500">Adres URL Obrazu</label><textarea value={activeBlock.images[selectedMediaIndex]} onChange={(e) => handleUpdateMedia(e.target.value)} className="w-full p-3 text-xs border border-neutral-300 rounded focus:border-blue-500 outline-none bg-white resize-none shadow-sm" rows={5}/></div></div>) : (<div className="flex-1 flex flex-col items-center justify-center text-neutral-400 p-6 text-center"><div className="text-4xl mb-4">🖼️</div><p className="text-sm font-bold text-neutral-600">Nie wybrano obrazu</p></div>)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}