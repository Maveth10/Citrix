'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { createBlock } from '../utils/blockFactory';
import TopHeader from '../components/TopHeader';
import RightPanel from '../components/RightPanel'; // <-- Zwróć uwagę: zniknął LeftSidebar!
import TextFormatToolbar from '../components/TextFormatToolbar';
import TextPanel from '../components/TextPanel';
import ImagePanel from '../components/ImagePanel';
import ButtonPanel from '../components/ButtonPanel';
import GraphicsPanel from '../components/GraphicsPanel';
import LayoutPanel from '../components/LayoutPanel';
import VideoPanel from '../components/VideoPanel';
import FormPanel from '../components/FormPanel';
import MenuPanel from '../components/MenuPanel';
import PopupPanel from '../components/PopupPanel';
import ListPanel from '../components/ListPanel';
import GalleryPanel from '../components/GalleryPanel';
import SocialPanel from '../components/SocialPanel';
import EmbedPanel from '../components/EmbedPanel';
import MediaManager from '../components/MediaManager';
import CanvasBlock from '../components/CanvasBlock';
import BottomBar from '../components/BottomBar';

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
  const [pageSlug, setPageSlug] = useState('titan-v16');
  
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(false);

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
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

  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!activeId || isMediaManagerOpen) return;
      const activeEl = document.getElementById(`block-${activeId}`);
      if (activeEl && activeEl.contains(e.target as Node)) {
        if (activeEl.classList.contains('group/img')) {
          e.preventDefault(); e.stopPropagation();
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
    if (error) alert(error.message); else alert(`Opublikowano V16.3! Link: /live/${pageSlug}`);
  };

  const activeBlock = findBlockById(blocks, activeId);

  const getCanvasWidth = () => {
    if (viewport === 'mobile') return '375px';
    if (viewport === 'tablet') return '768px';
    return '1200px';
  };

  const categories = [
    { id: 'tekst', label: 'Tekst', icon: 'T' }, { id: 'obraz', label: 'Obraz', icon: '🖼️' }, { id: 'przycisk', label: 'Przycisk', icon: '👆' },
    { id: 'grafika', label: 'Grafika', icon: '⭐' }, { id: 'pola', label: 'Pola', icon: '📦' }, { id: 'wideo', label: 'Wideo', icon: '▶️' },
    { id: 'formularze', label: 'Formularze', icon: '📝' }, { id: 'menu', label: 'Menu', icon: '☰' }, { id: 'wyskakujace', label: 'Wyskakujące', icon: '🪟' },
    { id: 'lista', label: 'Lista', icon: '📋' }, { id: 'galeria', label: 'Galeria', icon: '🎠' }, { id: 'social', label: 'Social Media', icon: '❤️' },
    { id: 'osadzona', label: 'Osadzona treść', icon: '🔗' }
  ];

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

      {/* --- POPRAWNY, POJEDYNCZY LEWY PANEL NAWIGACYJNY --- */}
      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab === 'add' ? null : 'add'); if(leftTab !== 'add') setAddCategory('tekst'); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab === 'add' ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab === 'layers' ? null : 'layers')} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition ${leftTab === 'layers' ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}>☰</button>
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
              {addCategory === 'grafika' && <GraphicsPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'pola' && <LayoutPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'wideo' && <VideoPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'formularze' && <FormPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'menu' && <MenuPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'wyskakujace' && <PopupPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'lista' && <ListPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'galeria' && <GalleryPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'social' && <SocialPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'osadzona' && <EmbedPanel handleAddBlock={handleAddBlock} />}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col relative bg-[#222]">
        <TopHeader 
          canvasZoom={canvasZoom} setCanvasZoom={setCanvasZoom} 
          showGrid={showGrid} setShowGrid={setShowGrid} 
          pageSlug={pageSlug} setPageSlug={setPageSlug} 
          handlePublish={handlePublish} 
          activeBlock={activeBlock} updateActiveBlock={updateActiveBlock}
          viewport={viewport} setViewport={setViewport}
        />
        
        <TextFormatToolbar activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />
        
        <div className="flex justify-center items-center h-10 bg-[#161616] text-[10px] text-neutral-500 gap-4 border-b border-black">
          <span>{blocks.length} Elementów</span>
          <span>Szerokość: {getCanvasWidth()}</span>
        </div>

        <main className="flex-1 overflow-auto flex justify-center bg-[#111] p-10" onClick={() => { setActiveId(null); setIsEditing(false); }}>
          <div 
            style={{ width: getCanvasWidth(), transform: `scale(${canvasZoom})`, transformOrigin: 'top center', transition: interaction ? 'none' : 'width 0.3s ease-in-out, transform 0.2s ease-out' }} 
            className="min-h-screen bg-white text-black shadow-2xl relative overflow-hidden"
          >
             {showGrid && <div className="absolute inset-0 pointer-events-none flex gap-4 px-[40px] z-0 opacity-[0.03]">{Array(12).fill(0).map((_,i) => <div key={i} className="flex-1 bg-blue-500 h-full"></div>)}</div>}
             {blocks.map(b => (
               <CanvasBlock key={b.id} b={b} activeId={activeId} setActiveId={setActiveId} isEditing={isEditing} setIsEditing={setIsEditing} isMediaManagerOpen={isMediaManagerOpen} setInteraction={setInteraction} updateActiveBlock={updateActiveBlock} />
             ))}
          </div>
        </main>
        
        <BottomBar blocks={blocks} activeId={activeId} setActiveId={setActiveId} />
      </div>

      <RightPanel activeBlock={activeBlock} rightTab={rightTab} setRightTab={setRightTab as any} updateActiveBlock={updateActiveBlock} removeActiveBlock={removeActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />

      {isMediaManagerOpen && (
         <MediaManager activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />
      )}
    </div>
  );
}