'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { createBlock } from '../utils/blockFactory';

import TopHeader from '../components/TopHeader';
import RightPanel from '../components/RightPanel';
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
import AICopilot from '../components/AICopilot';

interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; hoverStyles?: any; entranceAnim?: string; ribbonItems?: { type: 'text' | 'img', value: string }[]; styles: any;
}

export default function Home() {
  const [internalBlocks, setInternalBlocks] = useState<Block[]>([]);
  const [past, setPast] = useState<Block[][]>([]);
  const [future, setFuture] = useState<Block[][]>([]);
  
  const blocks = internalBlocks;

  const setBlocks = (action: React.SetStateAction<Block[]>) => {
    setInternalBlocks(current => {
      const next = typeof action === 'function' ? (action as any)(current) : action;
      setPast(p => [...p, current].slice(-50));
      setFuture([]);
      return next;
    });
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast(p => p.slice(0, -1));
    setFuture(f => [blocks, ...f]);
    setInternalBlocks(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture(f => f.slice(1));
    setPast(p => [...p, blocks]);
    setInternalBlocks(next);
  };

  const [activeId, setActiveId] = useState<number | null>(null);
  const [leftTab, setLeftTab] = useState<'add' | 'layers' | null>('add');
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('titan-v18-architekt');
  
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const [interaction, setInteraction] = useState<{ 
    type: 'drag' | 'resize'; dir?: string; 
    startX: number; startY: number; 
    initialLeft: number; initialTop: number; 
    initialWidth: number; initialHeight: number; 
  } | null>(null);
  
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const handleSetInteraction = (val: any) => {
    if (val !== null) { setPast(p => [...p, blocks].slice(-50)); setFuture([]); }
    setInteraction(val);
  };

  const updateActiveBlock = (updates: any, skipHistory = false) => {
    const setter = skipHistory ? setInternalBlocks : setBlocks;
    setter(prevBlocks => {
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

  const handleChangeLayout = (layout: string) => {
    setBlocks(prevBlocks => {
      const updateRecursive = (arr: Block[]): Block[] => arr.map(b => {
        if (b.id === activeId && b.children) {
          const newStyles = { ...b.styles };
          newStyles.display = layout === 'flex-col' ? 'flex' : 'grid';
          newStyles.gap = '20px';
          newStyles.flexDirection = layout === 'flex-col' ? 'column' : 'unset';
          newStyles.gridTemplateColumns = 'unset';
          newStyles.gridTemplateRows = 'unset';
          newStyles.minHeight = 'auto'; 
          let childCount = 1;

          if (layout.startsWith('grid-custom-')) {
            const parts = layout.split('-');
            const cols = parseInt(parts[2]) || 1;
            const rows = parseInt(parts[3]) || 1;
            newStyles.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            newStyles.gridTemplateRows = `repeat(${rows}, minmax(120px, auto))`;
            childCount = cols * rows;
          } else if (layout === 'grid-2') { newStyles.gridTemplateColumns = 'repeat(2, 1fr)'; childCount = 2; }
          else if (layout === 'grid-3') { newStyles.gridTemplateColumns = 'repeat(3, 1fr)'; childCount = 3; }
          else if (layout === 'grid-2-rows') { newStyles.gridTemplateRows = 'repeat(2, minmax(120px, auto))'; newStyles.gridTemplateColumns = '1fr'; childCount = 2; }
          else if (layout === 'grid-left') { newStyles.gridTemplateColumns = '2fr 1fr'; childCount = 2; }
          else if (layout === 'grid-right') { newStyles.gridTemplateColumns = '1fr 2fr'; childCount = 2; }
          else if (layout === 'grid-2x2') { newStyles.gridTemplateColumns = 'repeat(2, 1fr)'; newStyles.gridTemplateRows = 'repeat(2, minmax(120px, auto))'; childCount = 4; }

          let newChildren = [...b.children];
          if (layout !== 'flex-col' && newChildren.length < childCount) {
            const missingSlots = childCount - newChildren.length;
            for (let i = 0; i < missingSlots; i++) { newChildren.push(createBlock('container', 'empty', 'Puste Pole')); }
          }
          return { ...b, styles: newStyles, children: newChildren };
        }
        if (b.children) return { ...b, children: updateRecursive(b.children) };
        return b;
      });
      return updateRecursive(prevBlocks);
    });
  };

  const handleAddSection = (layout: string) => {
    const newSection = createBlock('section', '', 'Sekcja Strony');
    newSection.styles = { ...newSection.styles, display: layout === 'flex-col' ? 'flex' : 'grid', gap: '20px', padding: '40px', backgroundColor: '#ffffff', width: '100%', minHeight: 'auto', clearRow: true };
    let childCount = 1;

    if (layout.startsWith('grid-custom-')) {
      const parts = layout.split('-');
      const cols = parseInt(parts[2]) || 1;
      const rows = parseInt(parts[3]) || 1;
      newSection.styles.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      newSection.styles.gridTemplateRows = `repeat(${rows}, minmax(120px, auto))`;
      childCount = cols * rows;
    } else if (layout === 'grid-2') { newSection.styles.gridTemplateColumns = 'repeat(2, 1fr)'; childCount = 2; }
    else if (layout === 'grid-3') { newSection.styles.gridTemplateColumns = 'repeat(3, 1fr)'; childCount = 3; }
    else if (layout === 'grid-2-rows') { newSection.styles.gridTemplateRows = 'repeat(2, minmax(120px, auto))'; newSection.styles.gridTemplateColumns = '1fr'; childCount = 2; }
    else if (layout === 'grid-left') { newSection.styles.gridTemplateColumns = '2fr 1fr'; childCount = 2; }
    else if (layout === 'grid-right') { newSection.styles.gridTemplateColumns = '1fr 2fr'; childCount = 2; }
    else if (layout === 'grid-2x2') { newSection.styles.gridTemplateColumns = 'repeat(2, 1fr)'; newSection.styles.gridTemplateRows = 'repeat(2, minmax(120px, auto))'; childCount = 4; }

    newSection.children = Array.from({ length: childCount }).map((_, i) => createBlock('container', 'empty', `Pole ${i + 1}`));
    setBlocks(prev => [...prev, newSection]);
    setActiveId(newSection.id);
  };

  const handleAddComplexSection = (fullBlock: any) => {
    setBlocks(prev => [...prev, fullBlock]);
    setActiveId(fullBlock.id); 
  };

  const handleAddBlock = (type: string, variant: string, label: string) => {
    const newBlock = createBlock(type, variant, label);
    setBlocks(prevBlocks => {
      if (!activeId) {
        if (type !== 'section') {
           const autoWrapper = createBlock('section', '', 'Sekcja (Auto)');
           autoWrapper.styles = { ...autoWrapper.styles, display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px', minHeight: '120px', width: '100%', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', clearRow: true };
           autoWrapper.children = [newBlock];
           return [...prevBlocks, autoWrapper];
        }
        return [...prevBlocks, newBlock];
      }
      let inserted = false;
      const insertRecursive = (arr: Block[]): Block[] => {
        let result: Block[] = [];
        for (const b of arr) {
          if (b.id === activeId) {
            if (b.children) { result.push({ ...b, children: [...b.children, newBlock] }); inserted = true; } 
            else { result.push(b); result.push(newBlock); inserted = true; }
          } else if (b.children) { result.push({ ...b, children: insertRecursive(b.children) }); } 
          else { result.push(b); }
        }
        return result;
      };
      const nextBlocks = insertRecursive(prevBlocks);
      return inserted ? nextBlocks : [...nextBlocks, newBlock];
    });
    setActiveId(newBlock.id);
  };

  const removeActiveBlock = () => {
    setBlocks(prev => {
      const removeRecursive = (arr: Block[], parentIsGrid: boolean = false): Block[] => {
        const index = arr.findIndex(b => b.id === activeId);
        if (index > -1) {
          if (parentIsGrid) {
            const newArr = [...arr];
            newArr[index] = createBlock('container', 'empty', 'Puste Pole');
            return newArr;
          }
          return arr.filter(b => b.id !== activeId);
        }
        return arr.map(b => ({ ...b, children: b.children ? removeRecursive(b.children, b.styles.display === 'grid') : undefined }));
      };
      return removeRecursive(prev);
    });
    setActiveId(null); setIsEditing(false); setIsMediaManagerOpen(false); setIsAiOpen(false);
  };

  const handleDrop = (sourceId: number, targetId: number, dropType: 'before' | 'inline' = 'before') => {
    if (sourceId === targetId) return;
    setBlocks(prevBlocks => {
      let sourceBlock: Block | null = null;
      
      const removeSource = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === sourceId);
        if (index > -1) {
          sourceBlock = arr[index];
          return [...arr.slice(0, index), ...arr.slice(index + 1)];
        }
        return arr.map(b => ({ ...b, children: b.children ? removeSource(b.children) : undefined }));
      };
      
      let intermediate = removeSource(prevBlocks);
      if (!sourceBlock) return prevBlocks;

      const insertBlock = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === targetId);
        if (index > -1) {
          if (dropType === 'inline') {
            const newArr = [...arr];
            newArr[index] = { ...newArr[index], styles: { ...newArr[index].styles, clearRow: false } };
            
            let safeWidth = sourceBlock!.styles.width;
            if (safeWidth === '100%') safeWidth = '40%';

            const updatedSource = { 
              ...sourceBlock!, 
              styles: { ...sourceBlock!.styles, clearRow: true, flex: 'unset', width: safeWidth, marginLeft: '0px' } 
            };
            return [...newArr.slice(0, index + 1), updatedSource, ...newArr.slice(index + 1)];
          } else {
            const updatedSource = { 
              ...sourceBlock!, 
              styles: { ...sourceBlock!.styles, flex: 'unset' } 
            };
            return [...arr.slice(0, index), updatedSource, ...arr.slice(index)];
          }
        }
        return arr.map(b => ({ ...b, children: b.children ? insertBlock(b.children) : undefined }));
      };
      return insertBlock(intermediate);
    });
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Opublikowano V18.35! Link: /live/${pageSlug}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMediaManagerOpen) { setIsMediaManagerOpen(false); return; }
        if (isAiOpen) { setIsAiOpen(false); return; }
        if (leftTab || addCategory) { setLeftTab(null); setAddCategory(null); return; }
        if (isEditing) { setIsEditing(false); return; }
        if (activeId) { setActiveId(null); return; }
      }
      if (!isEditing && (e.ctrlKey || e.metaKey)) {
        if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
        if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) { e.preventDefault(); redo(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMediaManagerOpen, isAiOpen, leftTab, addCategory, isEditing, activeId, blocks, past, future]);

  const getCanvasWidth = () => viewport === 'mobile' ? '375px' : (viewport === 'tablet' ? '768px' : '1200px');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!interaction || !activeId || isEditing || isMediaManagerOpen) return; e.preventDefault();
      
      const dx = (e.pageX - interaction.startX) / canvasZoom; 
      const dy = (e.pageY - interaction.startY) / canvasZoom;
      
      if (interaction.type === 'drag') {
        updateActiveBlock({ styles: { left: `${interaction.initialLeft + dx}px`, top: `${interaction.initialTop + dy}px`, right: 'auto', bottom: 'auto' } }, true);
      } 
      else if (interaction.type === 'resize' && interaction.dir) {
        const el = document.getElementById(`block-${activeId}`);
        const parentWidth = el?.parentElement?.offsetWidth || parseInt(getCanvasWidth());
        
        let newWidthPx = interaction.initialWidth;
        let newHeightPx = interaction.initialHeight;
        
        if (interaction.dir.includes('e')) newWidthPx += dx;
        if (interaction.dir.includes('w')) newWidthPx -= dx; 
        
        if (interaction.dir.includes('s')) newHeightPx += dy;
        if (interaction.dir.includes('n')) newHeightPx -= dy;

        newWidthPx = Math.max(20, Math.min(newWidthPx, parentWidth));
        newHeightPx = Math.max(20, newHeightPx);

        let percentWidth = (newWidthPx / parentWidth) * 100;
        const snaps = [10, 15, 20, 25, 30, 33.33, 40, 50, 60, 66.66, 70, 75, 80, 85, 90, 100];
        for (const snap of snaps) {
          if (Math.abs(percentWidth - snap) < 3) { percentWidth = snap; break; }
        }
        
        const updates: any = {};
        
        if (interaction.dir.includes('e') || interaction.dir.includes('w')) updates.width = `${percentWidth}%`;
        
        // FIX V18.35: TWARDA WYSKOKOŚĆ (Pełna władza nad rozmiarem Y)
        if (interaction.dir.includes('s') || interaction.dir.includes('n')) {
          updates.height = `${newHeightPx}px`;
          updates.minHeight = `${newHeightPx}px`;
        }

        updates.marginLeft = '0px';
        updates.marginTop = '0px';

        updateActiveBlock({ styles: updates }, true);
      }
    };
    const handleMouseUp = () => setInteraction(null);
    if (interaction) { window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseup', handleMouseUp); }
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [interaction, activeId, canvasZoom, isEditing, isMediaManagerOpen, viewport]);

  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!activeId || isMediaManagerOpen) return;
      const activeEl = document.getElementById(`block-${activeId}`);
      if (activeEl && activeEl.contains(e.target as Node)) {
        if (activeEl.classList.contains('group/img')) {
          e.preventDefault(); e.stopPropagation();
          setInternalBlocks(prevBlocks => {
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

  const activeBlock = findBlockById(blocks, activeId);

  const categories = [
    { id: 'tekst', label: 'Tekst', icon: 'T' }, { id: 'obraz', label: 'Obraz', icon: '🖼️' }, { id: 'przycisk', label: 'Przycisk', icon: '👆' }, { id: 'grafika', label: 'Grafika', icon: '⭐' }, { id: 'pola', label: 'Pola', icon: '📦' }, { id: 'wideo', label: 'Wideo', icon: '▶️' }, { id: 'formularze', label: 'Formularze', icon: '📝' }, { id: 'menu', label: 'Menu', icon: '☰' }, { id: 'wyskakujace', label: 'Wyskakujące', icon: '🪟' }, { id: 'lista', label: 'Lista', icon: '📋' }, { id: 'galeria', label: 'Galeria', icon: '🎠' }, { id: 'social', label: 'Social Media', icon: '❤️' }, { id: 'osadzona', label: 'Osadzona treść', icon: '🔗' }
  ];

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <button onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} className={`text-left text-[11px] py-1.5 px-2 truncate transition flex items-center gap-2 ${activeId === b.id ? 'bg-blue-500/20 text-blue-400 font-bold border-l-2 border-blue-500' : 'text-neutral-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`} style={{ paddingLeft: `${(depth * 12) + 8}px` }}>
          {b.children ? '📂' : '📄'} {b.name}
        </button>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="flex h-screen w-screen bg-[#09090b] text-white font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `@keyframes scroll-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}} />

      <aside className="w-16 bg-[#09090b] border-r border-white/5 flex flex-col items-center py-6 gap-5 z-50 shrink-0">
        <button onClick={() => { setLeftTab(leftTab === 'add' ? null : 'add'); if(leftTab !== 'add') setAddCategory('tekst'); }} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all shadow-sm ${leftTab === 'add' ? 'bg-blue-600 text-white scale-95' : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}`}>+</button>
        <button onClick={() => setLeftTab(leftTab === 'layers' ? null : 'layers')} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all shadow-sm ${leftTab === 'layers' ? 'bg-blue-600 text-white scale-95' : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}`}>☰</button>
      </aside>

      <div className="relative z-40 h-full flex">
        {leftTab === 'add' && (
          <div className="w-56 bg-[#09090b] border-r border-white/5 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-6 py-5 border-b border-white/5"><span className="font-bold text-[10px] uppercase tracking-widest text-neutral-500">DODAJ ELEMENT</span></div>
            <div className="flex-1 overflow-y-auto py-3 scrollbar-hide px-2">
              {categories.map(cat => (
                <button key={cat.id} onMouseEnter={() => setAddCategory(cat.id)} onClick={() => setAddCategory(cat.id)} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 mb-1 ${addCategory === cat.id ? 'bg-blue-600/10 text-blue-400' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}><span className="w-4 text-center">{cat.icon}</span> {cat.label}</button>
              ))}
            </div>
          </div>
        )}
        {leftTab === 'layers' && (
          <div className="w-64 bg-[#09090b] border-r border-white/5 h-full flex flex-col shadow-2xl animate-in slide-in-from-left-4">
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center"><h2 className="font-bold text-[10px] uppercase tracking-widest text-neutral-500">Nawigator DOM</h2><button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white">✕</button></div>
            <div className="flex-1 overflow-y-auto py-2">{blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}</div>
          </div>
        )}
        {leftTab === 'add' && addCategory && (
          <div className="absolute left-[100%] top-0 w-[340px] bg-[#0c0c0e]/95 backdrop-blur-xl border-r border-white/5 h-full shadow-[20px_0_40px_rgba(0,0,0,0.8)] z-30 flex flex-col">
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/5"><h3 className="text-[10px] font-bold text-white uppercase tracking-widest">{categories.find(c => c.id === addCategory)?.label}</h3><button onClick={() => {setLeftTab(null); setAddCategory(null);}} className="text-neutral-500 hover:text-white text-lg leading-none">✕</button></div>
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2 scrollbar-hide">
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

      <div className="flex-1 flex flex-col relative bg-[#09090b]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <TopHeader canvasZoom={canvasZoom} setCanvasZoom={setCanvasZoom} showGrid={showGrid} setShowGrid={setShowGrid} pageSlug={pageSlug} setPageSlug={setPageSlug} handlePublish={handlePublish} activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} viewport={viewport} setViewport={setViewport} handleAddSection={handleAddSection} handleChangeLayout={handleChangeLayout} isAiOpen={isAiOpen} setIsAiOpen={setIsAiOpen} undo={undo} redo={redo} canUndo={past.length > 0} canRedo={future.length > 0} />
        
        {isAiOpen && (
          <AICopilot 
            activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsAiOpen={setIsAiOpen} 
            handleAddSection={handleAddSection} handleAddComplexSection={handleAddComplexSection}
          />
        )}
        
        <TextFormatToolbar activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />
        <main className="flex-1 overflow-auto flex justify-center p-10 z-10" onClick={() => { setActiveId(null); setIsEditing(false); setLeftTab(null); setAddCategory(null); setIsAiOpen(false); }}>
          <div style={{ width: getCanvasWidth(), transform: `scale(${canvasZoom})`, transformOrigin: 'top center', transition: interaction ? 'none' : 'width 0.3s ease-in-out, transform 0.2s ease-out' }} 
               className="min-h-screen bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-b-xl relative flex flex-row flex-wrap content-start pb-40">
             
             {showGrid && <div className="absolute inset-0 pointer-events-none flex gap-4 px-[40px] z-0 opacity-[0.03]">{Array(12).fill(0).map((_,i) => <div key={i} className="flex-1 bg-blue-500 h-full"></div>)}</div>}
             
             {blocks.map(b => {
                const widthVal = parseFloat(b.styles.width || '100');
                const isBreak = b.styles.clearRow !== false;
                const showGhost = draggedId && draggedId !== b.id && isBreak && widthVal < 98;

                return (
                  <React.Fragment key={b.id}>
                    <CanvasBlock 
                      b={b} activeId={activeId} setActiveId={setActiveId} 
                      isEditing={isEditing} setIsEditing={setIsEditing} 
                      isMediaManagerOpen={isMediaManagerOpen} setIsMediaManagerOpen={setIsMediaManagerOpen} 
                      setInteraction={setInteraction} updateActiveBlock={updateActiveBlock} 
                      interaction={interaction} draggedId={draggedId} setDraggedId={setDraggedId} handleDrop={handleDrop}
                    />
                    
                    {showGhost && (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleDrop(draggedId, b.id, 'inline'); if(setDraggedId) setDraggedId(null); }}
                        className="flex-1 min-h-[100px] border-2 border-dashed border-blue-400 bg-blue-500/10 rounded-xl m-2 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-blue-500/20 hover:scale-[1.02] transition-all cursor-pointer shadow-inner"
                      >
                        <span className="text-blue-500 font-bold text-[10px] uppercase tracking-widest">+ Wstaw Obok</span>
                      </div>
                    )}

                    {isBreak && <div className="basis-full h-0 m-0 p-0 pointer-events-none"></div>}
                  </React.Fragment>
                );
             })}
          </div>
        </main>
        <BottomBar blocks={blocks} activeId={activeId} setActiveId={setActiveId} />
      </div>
      <RightPanel activeBlock={activeBlock} rightTab={rightTab} setRightTab={setRightTab as any} updateActiveBlock={updateActiveBlock} removeActiveBlock={removeActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />
      {isMediaManagerOpen && <MediaManager activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />}
    </div>
  );
}