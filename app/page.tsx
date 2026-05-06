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
  const [leftTab, setLeftTab] = useState<'pages' | 'layers' | null>(null);
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  const [pageSlug, setPageSlug] = useState('titan-v18-architekt');
  
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  const [hiddenBlocks, setHiddenBlocks] = useState<number[]>([]);

  const toggleBlockVisibility = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setHiddenBlocks(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
  };

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

  const checkIsChild = (parent: Block, childId: number): boolean => {
    if (!parent.children) return false;
    if (parent.children.some(c => c.id === childId)) return true;
    return parent.children.some(c => checkIsChild(c, childId));
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
        if (type !== 'section' && type !== 'popup') {
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

  const cleanupRows = (arr: Block[]): Block[] => {
    let rows: Block[][] = [];
    let currentRow: Block[] = [];

    for (let b of arr) {
      currentRow.push(b);
      if (b.styles.clearRow !== false) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      const lastIdx = currentRow.length - 1;
      currentRow[lastIdx] = { ...currentRow[lastIdx], styles: { ...currentRow[lastIdx].styles, clearRow: true } };
      rows.push(currentRow);
    }

    const processedRows = rows.map(row => {
      if (row.length === 1) {
        const single = row[0];
        const w = single.styles.width;
        if (['48%', '40%', '50%'].includes(w)) {
          return [{ ...single, styles: { ...single.styles, clearRow: true, width: '100%' } }];
        }
        return [{ ...single, styles: { ...single.styles, clearRow: true } }];
      }
      return row.map((b, i) => ({ ...b, styles: { ...b.styles, clearRow: i === row.length - 1 } }));
    });

    return processedRows.flat();
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
          const removedBlock = arr[index];
          const newArr = [...arr];
          newArr.splice(index, 1);
          
          if (index > 0 && removedBlock.styles.clearRow !== false && newArr[index - 1].styles.clearRow === false) {
             newArr[index - 1] = { ...newArr[index - 1], styles: { ...newArr[index - 1].styles, clearRow: true } };
          }
          
          return cleanupRows(newArr);
        }
        return arr.map(b => ({ ...b, children: b.children ? removeRecursive(b.children, b.styles.display === 'grid') : undefined }));
      };
      return removeRecursive(prev);
    });
    setActiveId(null); setIsEditing(false); setIsMediaManagerOpen(false); setIsAiOpen(false);
  };

  const handleDrop = (sourceId: number, targetId: number, dropType: 'before' | 'inline' | 'bottom' = 'before') => {
    if (sourceId === targetId) return;
    
    setBlocks(prevBlocks => {
      const sourceBlockNode = findBlockById(prevBlocks, sourceId);
      if (sourceBlockNode && targetId !== -1 && checkIsChild(sourceBlockNode, targetId)) {
         return prevBlocks; 
      }

      let sourceBlock: Block | null = null;
      
      const removeSource = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === sourceId);
        if (index > -1) {
          sourceBlock = arr[index];
          const newArr = [...arr];
          newArr.splice(index, 1);
          
          if (index > 0 && sourceBlock.styles.clearRow !== false && newArr[index - 1].styles.clearRow === false) {
             newArr[index - 1] = { ...newArr[index - 1], styles: { ...newArr[index - 1].styles, clearRow: true } };
          }
          
          return cleanupRows(newArr);
        }
        return arr.map(b => ({ ...b, children: b.children ? removeSource(b.children) : undefined }));
      };
      
      let intermediate = removeSource(prevBlocks);
      if (!sourceBlock) return prevBlocks;

      if (dropType === 'bottom') {
         let restoredWidth = sourceBlock!.styles.width;
         if (['48%', '40%', '50%'].includes(restoredWidth)) restoredWidth = '100%';
         const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, flex: 'unset', clearRow: true, width: restoredWidth } };
         return cleanupRows([...intermediate, updatedSource]);
      }

      const insertBlock = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === targetId);
        if (index > -1) {
          if (dropType === 'inline') {
            const newArr = [...arr];
            let targetWidth = newArr[index].styles.width;
            if (targetWidth === '100%' || !targetWidth) targetWidth = '48%'; 
            
            newArr[index] = { ...newArr[index], styles: { ...newArr[index].styles, clearRow: false, width: targetWidth } };
            
            let safeWidth = sourceBlock!.styles.width;
            if (safeWidth === '100%' || !safeWidth) safeWidth = '48%'; 
            
            const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, clearRow: true, flex: 'unset', width: safeWidth, marginLeft: '0px' } };
            const mergedArr = [...newArr.slice(0, index + 1), updatedSource, ...newArr.slice(index + 1)];
            return cleanupRows(mergedArr);
          } else {
            let restoredWidth = sourceBlock!.styles.width;
            if (['48%', '40%', '50%'].includes(restoredWidth)) restoredWidth = '100%';
            
            const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, flex: 'unset', clearRow: true, width: restoredWidth } };
            const mergedArr = [...arr.slice(0, index), updatedSource, ...arr.slice(index)];
            return cleanupRows(mergedArr);
          }
        }
        return arr.map(b => ({ ...b, children: b.children ? insertBlock(b.children) : undefined }));
      };
      
      return insertBlock(intermediate);
    });
  };

  const handlePublish = async () => {
    const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content: blocks }, { onConflict: 'slug' });
    if (error) alert(error.message); else alert(`Opublikowano V18.NEXT! Link: /live/${pageSlug}`);
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
        const snaps = [10, 15, 20, 25, 30, 33.33, 40, 48, 50, 60, 66.66, 70, 75, 80, 85, 90, 100];
        for (const snap of snaps) {
          if (Math.abs(percentWidth - snap) < 3) { percentWidth = snap; break; }
        }
        
        const updates: any = {};
        if (interaction.dir.includes('e') || interaction.dir.includes('w')) updates.width = `${percentWidth}%`;
        if (interaction.dir.includes('s') || interaction.dir.includes('n')) {
          updates.height = `${newHeightPx}px`;
          updates.minHeight = `${newHeightPx}px`;
        }
        updates.marginLeft = '0px'; updates.marginTop = '0px';
        updateActiveBlock({ styles: updates }, true);
      }
    };

    const handleMouseUp = () => {
      if (interaction && interaction.type === 'resize') {
        setInternalBlocks(prevBlocks => {
          const sanitizeRecursive = (arr: Block[], parentIsGrid: boolean = false): Block[] => {
            if (parentIsGrid) return arr.map(b => ({ ...b, children: b.children ? sanitizeRecursive(b.children, true) : undefined }));
            
            let res = [...arr];
            let currentRowWidth = 0;
            let rowStartIndex = 0;

            for (let i = 0; i < res.length; i++) {
              const block = res[i];
              const wStr = block.styles.width || '100%';
              let w = 100;
              if (typeof wStr === 'string' && wStr.endsWith('%')) w = parseFloat(wStr) || 100;
              
              if (currentRowWidth + w > 102 && i > rowStartIndex) {
                res[i - 1] = { ...res[i - 1], styles: { ...res[i - 1].styles, clearRow: true } };
                currentRowWidth = w;
                rowStartIndex = i;
              } else {
                currentRowWidth += w;
              }
              
              if (res[i].styles.clearRow !== false) {
                currentRowWidth = 0;
                rowStartIndex = i + 1;
              }
            }
            
            if (res.length > 0 && res[res.length - 1].styles.clearRow === false) {
              res[res.length - 1] = { ...res[res.length - 1], styles: { ...res[res.length - 1].styles, clearRow: true } };
            }

            return res.map(b => ({ ...b, children: b.children ? sanitizeRecursive(b.children, b.styles.display === 'grid') : undefined }));
          };
          
          return sanitizeRecursive(prevBlocks);
        });
      }
      setInteraction(null);
    };

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
    { id: 'tekst', label: 'Tekst', icon: 'T', color: '#ff4500', glowClass: 'neon-orange', shadowColor: 'rgba(255,69,0,0.5)' }, 
    { id: 'obraz', label: 'Obraz', icon: '🖼️', color: '#00e5ff', glowClass: 'neon-cyan', shadowColor: 'rgba(0,229,255,0.5)' }, 
    { id: 'przycisk', label: 'Przycisk', icon: '👆', color: '#ff0055', glowClass: 'neon-red', shadowColor: 'rgba(255,0,85,0.5)' }, 
    { id: 'grafika', label: 'Grafika', icon: '⭐', color: '#ffea00', glowClass: 'neon-yellow', shadowColor: 'rgba(255,234,0,0.5)' }, 
    { id: 'pola', label: 'Pola', icon: '📦', color: '#00ff66', glowClass: 'neon-green', shadowColor: 'rgba(0,255,102,0.5)' }, 
    { id: 'wideo', label: 'Wideo', icon: '▶️', color: '#ff00aa', glowClass: 'neon-pink', shadowColor: 'rgba(255,0,170,0.5)' }, 
    { id: 'formularze', label: 'Formularze', icon: '📝', color: '#ff4500', glowClass: 'neon-orange', shadowColor: 'rgba(255,69,0,0.5)' }, 
    { id: 'menu', label: 'Menu', icon: '☰', color: '#7b61ff', glowClass: 'neon-purple', shadowColor: 'rgba(123,97,255,0.5)' }, 
    { id: 'wyskakujace', label: 'Wyskakujące', icon: '🪟', color: '#00e5ff', glowClass: 'neon-cyan', shadowColor: 'rgba(0,229,255,0.5)' }, 
    { id: 'lista', label: 'Lista', icon: '📋', color: '#00ff66', glowClass: 'neon-green', shadowColor: 'rgba(0,255,102,0.5)' }, 
    { id: 'social', label: 'Social Media', icon: '❤️', color: '#ff0055', glowClass: 'neon-red', shadowColor: 'rgba(255,0,85,0.5)' }, 
    { id: 'osadzona', label: 'Osadzona treść', icon: '🔗', color: '#a0a0b0', glowClass: 'neon-gray', shadowColor: 'rgba(160,160,176,0.5)' }
  ];

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <div className={`flex items-center justify-between pr-2 transition ${activeId === b.id ? 'bg-[#ff4500]/20 border-l-2 border-[#ff4500]' : 'hover:bg-white/5 border-l-2 border-transparent'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} 
            className={`flex-1 text-left text-[11px] py-1.5 px-2 truncate flex items-center gap-2 ${activeId === b.id ? 'text-[#ff4500] font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]' : 'text-neutral-400 hover:text-white'}`} 
            style={{ paddingLeft: `${(depth * 12) + 8}px` }}
          >
            <span className={hiddenBlocks.includes(b.id) ? 'opacity-30 line-through' : ''}>
              {b.children ? '📂' : '📄'} {b.name}
            </span>
          </button>
          
          <button 
            onClick={(e) => toggleBlockVisibility(e, b.id)}
            className={`text-xs px-1 ${hiddenBlocks.includes(b.id) ? 'text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]' : 'text-neutral-500 hover:text-white'}`}
            title="Pokaż/Ukryj w edytorze"
          >
            {hiddenBlocks.includes(b.id) ? '🙈' : '👁️'}
          </button>
        </div>
        
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  const activeCategoryData = categories.find(c => c.id === addCategory);

  return (
    // THE ULTIMATE CYBER KOKPIT (V18.NEXT)
    <div className="flex h-screen w-screen bg-[#070709] text-white font-sans overflow-hidden relative selection:bg-[#ff4500]/30">
      
      {/* MAGIA ANIMACJI (REAKTOR & SCANNER) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes reaktor-breathe { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        @keyframes orbital-scanner-fast { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
        @keyframes neon-glow-pulse { 0%, 100% { shadow-color: var(--theme-color); } 50% { shadow-color: rgba(255,255,255,0.3); } }

        @keyframes breathe-orange { 0%, 100% { box-shadow: 0 0 10px rgba(255,69,0,0.4); border-color: rgba(255,69,0,0.5); } 50% { box-shadow: 0 0 25px rgba(255,69,0,0.8); border-color: rgba(255,69,0,1); } }
        @keyframes breathe-cyan { 0%, 100% { box-shadow: 0 0 10px rgba(0,229,255,0.4); border-color: rgba(0,229,255,0.5); } 50% { box-shadow: 0 0 25px rgba(0,229,255,0.8); border-color: rgba(0,229,255,1); } }
        @keyframes breathe-red { 0%, 100% { box-shadow: 0 0 10px rgba(255,0,85,0.4); border-color: rgba(255,0,85,0.5); } 50% { box-shadow: 0 0 25px rgba(255,0,85,0.8); border-color: rgba(255,0,85,1); } }
        @keyframes breathe-yellow { 0%, 100% { box-shadow: 0 0 10px rgba(255,234,0,0.4); border-color: rgba(255,234,0,0.5); } 50% { box-shadow: 0 0 25px rgba(255,234,0,0.8); border-color: rgba(255,234,0,1); } }
        @keyframes breathe-green { 0%, 100% { box-shadow: 0 0 10px rgba(0,255,102,0.4); border-color: rgba(0,255,102,0.5); } 50% { box-shadow: 0 0 25px rgba(0,255,102,0.8); border-color: rgba(0,255,102,1); } }
        @keyframes breathe-pink { 0%, 100% { box-shadow: 0 0 10px rgba(255,0,170,0.4); border-color: rgba(255,0,170,0.5); } 50% { box-shadow: 0 0 25px rgba(255,0,170,0.8); border-color: rgba(255,0,170,1); } }
        @keyframes breathe-purple { 0%, 100% { box-shadow: 0 0 10px rgba(123,97,255,0.4); border-color: rgba(123,97,255,0.5); } 50% { box-shadow: 0 0 25px rgba(123,97,255,0.8); border-color: rgba(123,97,255,1); } }
        @keyframes breathe-gray { 0%, 100% { box-shadow: 0 0 10px rgba(160,160,176,0.4); border-color: rgba(160,160,176,0.5); } 50% { box-shadow: 0 0 25px rgba(160,160,176,0.8); border-color: rgba(160,160,176,1); } }
        
        .neon-orange { animation: breathe-orange 2s infinite ease-in-out; color: #fff; background: rgba(255,69,0,0.1); }
        .neon-cyan { animation: breathe-cyan 2s infinite ease-in-out; color: #fff; background: rgba(0,229,255,0.1); }
        .neon-red { animation: breathe-red 2s infinite ease-in-out; color: #fff; background: rgba(255,0,85,0.1); }
        .neon-yellow { animation: breathe-yellow 2s infinite ease-in-out; color: #fff; background: rgba(255,234,0,0.1); }
        .neon-green { animation: breathe-green 2s infinite ease-in-out; color: #fff; background: rgba(0,255,102,0.1); }
        .neon-pink { animation: breathe-pink 2s infinite ease-in-out; color: #fff; background: rgba(255,0,170,0.1); }
        .neon-purple { animation: breathe-purple 2s infinite ease-in-out; color: #fff; background: rgba(123,97,255,0.1); }
        .neon-gray { animation: breathe-gray 2s infinite ease-in-out; color: #fff; background: rgba(160,160,176,0.1); }
        
        .cyber-panel { background: #111115; border: 1px solid rgba(255,255,255,0.05); }

        /* NOWY: ULTIMATE GLASSMOPHISM & PULSING REACTOR TŁA */
        .category-container {
          background-color: rgba(17, 17, 21, 0.7) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8) !important;
          position: relative !important;
          overflow: hidden !important;
        }

        /* Pulsujący Reaktor pod spodem - Siatka Technologiczna */
        .reactor-core-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at center, var(--theme-color) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.1;
          animation: reaktor-breathe 4s infinite ease-in-out;
          pointer-events: none;
          z-index: 1;
        }

        /* Skaner Orbitujący - Szybki, przebijający się refles */
        .reactor-scanner-beam {
          position: absolute;
          left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), var(--theme-color), rgba(255,255,255,0.6), transparent);
          box-shadow: 0 0 20px var(--theme-color), 0 0 40px var(--theme-color);
          animation: orbital-scanner-fast 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          pointer-events: none;
          z-index: 2;
        }
      `}} />

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#ff4500]/5 blur-[200px] rounded-full pointer-events-none z-0"></div>

      {/* LEWY PASEK TERMINALA */}
      <aside className="cyber-panel w-16 flex flex-col items-center py-4 gap-4 z-50 shrink-0 overflow-y-auto scrollbar-hide shadow-[10px_0_30px_rgba(0,0,0,0.8)] relative border-r border-[#ff4500]/20">
        
        <button 
          onClick={() => { setLeftTab(leftTab === 'pages' ? null : 'pages'); setAddCategory(null); }} 
          className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 z-10 font-bold ${leftTab === 'pages' ? 'neon-orange scale-110' : 'bg-[#1a1a20] border border-white/5 text-neutral-500 hover:text-white hover:border-[#ff4500]/50 hover:shadow-[0_0_15px_rgba(255,69,0,0.4)]'}`} 
          title="Zarządzanie Stronami"
        >
          +
        </button>
        <button 
          onClick={() => { setLeftTab(leftTab === 'layers' ? null : 'layers'); setAddCategory(null); }} 
          className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 z-10 ${leftTab === 'layers' ? 'neon-cyan scale-110' : 'bg-[#1a1a20] border border-white/5 text-neutral-500 hover:text-white hover:border-[#00e5ff]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]'}`} 
          title="Nawigator DOM"
        >
          ☰
        </button>
        
        <div className="w-8 h-px bg-white/5 my-1 z-10"></div>
        
        {/* KATEGORIE - PULSUJĄCE NEONY Z HOVER OTWARTYM */}
        {categories.map(cat => {
          const isActive = addCategory === cat.id;
          return (
            <button 
              key={cat.id} 
              onMouseEnter={() => { setAddCategory(cat.id); setLeftTab(null); }} 
              onClick={() => { setAddCategory(isActive ? null : cat.id); setLeftTab(null); }} 
              title={cat.label}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-300 z-10 ${isActive ? `${cat.glowClass} scale-110` : 'bg-[#1a1a20] border border-white/5 text-neutral-500 hover:bg-white/5 hover:text-white hover:scale-105'}`}
            >
              {cat.icon === 'T' ? <span className="font-serif font-bold text-[18px] drop-shadow-md">T</span> : <span className="drop-shadow-md">{cat.icon}</span>}
            </button>
          );
        })}
      </aside>

      <div className="relative z-40 h-full flex">
        
        {/* PANEL STRON */}
        {leftTab === 'pages' && (
          <div className="cyber-panel w-64 h-full flex flex-col shadow-[30px_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-left-4 relative border-r border-[#ff4500]/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff4500] shadow-[0_0_10px_#ff4500]"></div>
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-[#ff4500] drop-shadow-[0_0_5px_rgba(255,69,0,0.8)]">Zarządzanie Stronami</h2>
              <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white transition-colors">✕</button>
            </div>
            <div className="flex-1 p-4 relative z-10">
               <div className="p-3 bg-[#1a1a20] rounded border border-[#ff4500]/40 flex justify-between items-center cursor-pointer hover:bg-[#ff4500]/10 transition-all shadow-[inset_0_0_10px_rgba(255,69,0,0.1)]">
                 <span className="text-xs font-bold text-white">/{pageSlug}</span>
                 <span className="text-[9px] bg-[#ff4500] text-white px-2 py-0.5 rounded uppercase tracking-widest shadow-[0_0_8px_#ff4500]">Aktywna</span>
               </div>
               <button className="w-full mt-3 p-2 border border-dashed border-white/10 hover:border-[#ff4500]/50 hover:bg-[#ff4500]/5 text-neutral-400 hover:text-[#ff4500] text-xs font-bold rounded transition-all">+ Dodaj Podstronę</button>
            </div>
          </div>
        )}
        
        {/* PANEL WARSTW */}
        {leftTab === 'layers' && (
          <div className="cyber-panel w-64 h-full flex flex-col shadow-[30px_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-left-4 relative border-r border-[#00e5ff]/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"></div>
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-[#00e5ff] drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]">Nawigator DOM</h2>
              <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white transition-colors">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-2 relative z-10">{blocks.length === 0 ? <div className="p-4 text-xs text-neutral-600 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}</div>
          </div>
        )}

        {/* PANELE KATEGORII (NOWY Wizualny Standard V18.NEXT) */}
        {addCategory && activeCategoryData && (
          <div 
            className="category-container w-[340px] h-full shadow-[40px_0_60px_rgba(0,0,0,0.9)] z-30 flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden" 
            style={{ 
              borderRightColor: `${activeCategoryData.color}40`,
              '--theme-color': activeCategoryData.color,
              '--theme-shadow': activeCategoryData.shadowColor
            } as React.CSSProperties}
          >
            
            {/* Pulsujący Reaktor underlay */}
            <div className="reactor-core-bg pointer-events-none"></div>
            {/* Przebijający się Skaner pod spodem */}
            <div className="reactor-scanner-beam pointer-events-none"></div>
            
            {/* Ultra-cienka Laserowa Linia góry */}
            <div className={`absolute top-0 left-0 w-full h-[1.5px]`} style={{ backgroundColor: activeCategoryData.color, boxShadow: `0 0 10px ${activeCategoryData.color}` }}></div>
            
            {/* Header (Lżejszy, bez ramki bocznej) */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 relative z-10 backdrop-blur-xl">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] flex items-center gap-3" style={{ color: activeCategoryData.color, textShadow: `0 0 8px ${activeCategoryData.color}` }}>
                {activeCategoryData.label}
              </h3>
              <button onClick={() => setAddCategory(null)} className="text-neutral-500 hover:text-white transition-colors">✕</button>
            </div>
            
            {/* Wnętrze - Bezszwowe Columny, Hairlines */}
            <div className="flex-1 overflow-y-auto p-0 flex flex-col gap-0 scrollbar-hide relative z-10 pb-20 bg-transparent">
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
              {addCategory === 'social' && <SocialPanel handleAddBlock={handleAddBlock} />}
              {addCategory === 'osadzona' && <EmbedPanel handleAddBlock={handleAddBlock} />}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col relative z-10">
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
               className="min-h-screen h-fit bg-white text-black shadow-[0_30px_80px_rgba(0,0,0,0.8)] rounded-b-xl relative flex flex-row flex-wrap content-start items-start pb-40">
             
             {showGrid && <div className="absolute inset-0 pointer-events-none flex gap-4 px-[40px] z-0 opacity-[0.03]">{Array(12).fill(0).map((_,i) => <div key={i} className="flex-1 bg-[#ff4500] h-full"></div>)}</div>}
             
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
                      hiddenBlocks={hiddenBlocks}
                    />
                    
                    {showGhost && !hiddenBlocks.includes(b.id) && (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleDrop(draggedId, b.id, 'inline'); if(setDraggedId) setDraggedId(null); }}
                        className="flex-1 min-h-[100px] border-2 border-dashed border-[#ff4500] bg-[#ff4500]/10 rounded-xl m-2 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-[#ff4500]/20 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,69,0,0.2)] transition-all cursor-pointer"
                      >
                        <span className="text-[#ff4500] font-bold text-[10px] uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,69,0,0.5)]">+ Wstaw Obok</span>
                      </div>
                    )}

                    {isBreak && !hiddenBlocks.includes(b.id) && <div className="basis-full h-0 m-0 p-0 pointer-events-none"></div>}
                  </React.Fragment>
                );
             })}

             <div 
               onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
               onDrop={(e) => { e.preventDefault(); e.stopPropagation(); if (draggedId && handleDrop) handleDrop(draggedId, -1, 'bottom'); if(setDraggedId) setDraggedId(null); }}
               className="w-full h-32 mt-4 border-2 border-transparent hover:border-[#ff4500]/50 hover:bg-[#ff4500]/10 rounded-xl transition-all flex items-center justify-center text-transparent hover:text-[#ff4500] font-bold tracking-widest uppercase text-[10px]"
             >
               Upuść tutaj (Na koniec)
             </div>

          </div>
        </main>
        <BottomBar blocks={blocks} activeId={activeId} setActiveId={setActiveId} />
      </div>
      <RightPanel activeBlock={activeBlock} rightTab={rightTab} setRightTab={setRightTab as any} updateActiveBlock={updateActiveBlock} removeActiveBlock={removeActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />
      {isMediaManagerOpen && <MediaManager activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />}
    </div>
  );
}