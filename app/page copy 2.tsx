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
  images?: string[]; hoverStyles?: any; entranceAnim?: string; ribbonItems?: { type: 'text' | 'img', value: string, styles?: any }[]; styles: any;
}

// ======== ANATOMIA KOSMICZNEGO NIEBA VYRAI ========
interface AuroraOrb {
  id: number;
  x: number;          
  y: number;
  tx: number; 
  ty: number; 
  size: number;       
  blur: number;       
  hue: number;        
  duration: number;
  opacity: number; 
}

interface ShootingStar {
  id: number;
  startX: number;     
  startY: number;     
  length: number;     
  speed: number;      
  angle: number;      
}

interface BlackHole {
  active: boolean;
  x: number;
  y: number;
}
// ==========================================================

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
  const [leftTab, setLeftTab] = useState<'tekst' | 'obraz' | 'przycisk' | 'grafika' | 'pola' | 'wideo' | 'formularze' | 'wyskakujace' | 'lista' | 'social' | 'osadzona' | null>(null);
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  
  const [pageSlug, setPageSlug] = useState('vyrai');
  
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
  
  useEffect(() => {
    if (viewport === 'desktop') setCanvasZoom(1);
    else if (viewport === 'tablet') setCanvasZoom(1.5);
    else if (viewport === 'mobile') setCanvasZoom(2);
  }, [viewport]);

  // FLAGI DRAG & DROP: Dodane hasMoved aby uniknąć pomyłkowego odklikiwania przy wejściu w edycję
  const [interaction, setInteraction] = useState<{ 
    type: 'drag' | 'resize'; dir?: string; blockId?: number; hasMoved?: boolean;
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

  const activeBlock = findBlockById(blocks, activeId);

  const checkIsChild = (parent: Block, childId: number): boolean => {
    if (!parent.children) return false;
    if (parent.children.some(c => c.id === childId)) return true;
    return parent.children.some(c => checkIsChild(c, childId));
  };

  // ZAMIANA NA ELASTYCZNY FLEXBOX DLA UWOLNIENIA SZEROKOŚCI
  const handleChangeLayout = (layout: string) => {
    setBlocks(prevBlocks => {
      const updateRecursive = (arr: Block[]): Block[] => arr.map(b => {
        if (b.id === activeId && b.children) {
          const newStyles = { ...b.styles };
          newStyles.display = 'flex';
          newStyles.flexWrap = 'wrap';
          newStyles.gap = '20px';
          newStyles.flexDirection = layout === 'flex-col' ? 'column' : 'row';
          newStyles.minHeight = 'min-content'; 
          newStyles.padding = '30px'; 
          newStyles.alignItems = 'flex-start';
          newStyles.justifyContent = 'flex-start';

          delete newStyles.gridTemplateColumns;
          delete newStyles.gridTemplateRows;

          let childWidths: string[] = [];
          if (layout.startsWith('grid-custom-')) {
            const parts = layout.split('-');
            const cols = parseInt(parts[2]) || 1;
            const rows = parseInt(parts[3]) || 1;
            const gapDeduct = ((cols - 1) * 20) / cols;
            const w = `calc(${100 / cols}% - ${gapDeduct}px)`;
            childWidths = Array(cols * rows).fill(w);
          } else if (layout === 'grid-2') { childWidths = ['calc(50% - 10px)', 'calc(50% - 10px)']; }
          else if (layout === 'grid-3') { childWidths = ['calc(33.333% - 13.33px)', 'calc(33.333% - 13.33px)', 'calc(33.333% - 13.33px)']; }
          else if (layout === 'grid-2-rows') { childWidths = ['100%', '100%']; }
          else if (layout === 'grid-left') { childWidths = ['calc(66.666% - 10px)', 'calc(33.333% - 10px)']; }
          else if (layout === 'grid-right') { childWidths = ['calc(33.333% - 10px)', 'calc(66.666% - 10px)']; }
          else if (layout === 'grid-2x2') { childWidths = ['calc(50% - 10px)', 'calc(50% - 10px)', 'calc(50% - 10px)', 'calc(50% - 10px)']; }
          else { childWidths = ['100%']; }

          let newChildren = [...b.children];
          newChildren = newChildren.map((child, i) => {
             const w = childWidths[i] || '100%';
             return { ...child, styles: { ...child.styles, width: w } };
          });

          if (layout !== 'flex-col' && newChildren.length < childWidths.length) {
            const missingSlots = childWidths.length - newChildren.length;
            for (let i = 0; i < missingSlots; i++) { 
              const emptyField = createBlock('container', 'empty', 'Puste Pole');
              emptyField.id = Date.now() + Math.floor(Math.random() * 100000) + i;
              emptyField.styles.minHeight = '20px'; 
              emptyField.styles.minWidth = '20px';
              emptyField.styles.height = '120px';
              emptyField.styles.width = childWidths[newChildren.length + i] || '100%'; 
              newChildren.push(emptyField); 
            }
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
    newSection.styles = { 
      ...newSection.styles, 
      display: 'flex', 
      flexWrap: 'wrap',
      flexDirection: layout === 'flex-col' ? 'column' : 'row',
      gap: '20px', 
      padding: '30px', 
      backgroundColor: '#ffffff', 
      width: '100%', 
      minHeight: 'min-content', 
      clearRow: true,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    };

    let childWidths: string[] = [];
    if (layout.startsWith('grid-custom-')) {
      const parts = layout.split('-');
      const cols = parseInt(parts[2]) || 1;
      const rows = parseInt(parts[3]) || 1;
      const gapDeduct = ((cols - 1) * 20) / cols;
      const w = `calc(${100 / cols}% - ${gapDeduct}px)`;
      childWidths = Array(cols * rows).fill(w);
    } else if (layout === 'grid-2') { childWidths = ['calc(50% - 10px)', 'calc(50% - 10px)']; }
    else if (layout === 'grid-3') { childWidths = ['calc(33.333% - 13.33px)', 'calc(33.333% - 13.33px)', 'calc(33.333% - 13.33px)']; }
    else if (layout === 'grid-2-rows') { childWidths = ['100%', '100%']; }
    else if (layout === 'grid-left') { childWidths = ['calc(66.666% - 10px)', 'calc(33.333% - 10px)']; }
    else if (layout === 'grid-right') { childWidths = ['calc(33.333% - 10px)', 'calc(66.666% - 10px)']; }
    else if (layout === 'grid-2x2') { childWidths = ['calc(50% - 10px)', 'calc(50% - 10px)', 'calc(50% - 10px)', 'calc(50% - 10px)']; }
    else { childWidths = ['100%']; }

    newSection.children = childWidths.map((w, i) => {
      const emptyField = createBlock('container', 'empty', `Pole ${i + 1}`);
      emptyField.id = Date.now() + Math.floor(Math.random() * 100000) + i;
      emptyField.styles.minHeight = '20px'; 
      emptyField.styles.minWidth = '20px';
      emptyField.styles.height = '120px'; // Baza by ładnie wyglądało, łatwo zmniejszyć bo flex-start
      emptyField.styles.width = w;
      return emptyField;
    });
    setBlocks(prev => [...prev, newSection]);
    setActiveId(newSection.id);
  };

  const handleAddComplexSection = (fullBlock: any) => {
    setBlocks(prev => [...prev, fullBlock]);
    setActiveId(fullBlock.id); 
  };

  const handleAddBlock = (type: string, variant: string, label: string) => {
    const newBlock = createBlock(type, variant, label);
    newBlock.id = Date.now() + Math.floor(Math.random() * 100000); 

    if (type === 'container' && variant === 'empty') {
       newBlock.styles.minHeight = '20px';
       newBlock.styles.minWidth = '20px';
       newBlock.styles.height = '120px';
       newBlock.styles.width = '100%';
    }

    setBlocks(prevBlocks => {
      if (!activeId) {
        if (type !== 'section' && type !== 'popup') {
           const autoWrapper = createBlock('section', '', 'Sekcja (Auto)');
           autoWrapper.id = Date.now() + Math.floor(Math.random() * 100000);
           autoWrapper.styles = { ...autoWrapper.styles, display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px', minHeight: 'min-content', height: '150px', width: '100%', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', clearRow: true, justifyContent: 'flex-start', alignItems: 'flex-start' };
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
        if (typeof w === 'string' && (w.includes('48%') || w.includes('33%') || w.includes('31%') || w.includes('50%') || w.includes('calc'))) {
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
            const emptyContainer = createBlock('container', 'empty', 'Puste Pole');
            emptyContainer.id = Date.now() + Math.floor(Math.random() * 100000);
            emptyContainer.styles.minHeight = '20px'; 
            emptyContainer.styles.minWidth = '20px';
            emptyContainer.styles.height = '120px';
            emptyContainer.styles.width = arr[index].styles.width || '100%';
            newArr[index] = emptyContainer;
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
        return arr.map(b => ({ ...b, children: b.children ? removeRecursive(b.children, b.styles.display === 'flex' || b.styles.display === 'grid') : undefined }));
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
         if (typeof restoredWidth === 'string' && restoredWidth.includes('calc')) restoredWidth = '100%';
         // Zabezpieczenie przed lataniem w powietrzu po przeniesieniu - natychmiastowy reset X i Y
         const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, flex: 'unset', clearRow: true, width: restoredWidth, position: 'relative', left: '0px', top: '0px' } };
         return cleanupRows([...intermediate, updatedSource]);
      }

      const insertBlock = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === targetId);
        if (index > -1) {
          if (dropType === 'inline') {
            const newArr = [...arr];
            let targetWidth = newArr[index].styles.width;
            if (targetWidth === '100%' || !targetWidth) targetWidth = 'calc(50% - 10px)'; 
            
            newArr[index] = { ...newArr[index], styles: { ...newArr[index].styles, clearRow: false, width: targetWidth } };
            
            let safeWidth = sourceBlock!.styles.width;
            if (safeWidth === '100%' || !safeWidth) safeWidth = 'calc(50% - 10px)'; 
            
            // Zabezpieczenie przed lataniem - reset X i Y
            const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, clearRow: true, flex: 'unset', width: safeWidth, marginLeft: '0px', position: 'relative', left: '0px', top: '0px' } };
            const mergedArr = [...newArr.slice(0, index + 1), updatedSource, ...newArr.slice(index + 1)];
            return cleanupRows(mergedArr);
          } else {
            let restoredWidth = sourceBlock!.styles.width;
            if (typeof restoredWidth === 'string' && restoredWidth.includes('calc')) restoredWidth = '100%';
            
            // Zabezpieczenie przed lataniem - reset X i Y
            const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, clearRow: true, flex: 'unset', width: restoredWidth, position: 'relative', left: '0px', top: '0px' } };
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
    if (error) alert(error.message); else alert(`Opublikowano Vyrai! Link: /live/${pageSlug}`);
  };

  const [auroraOrbs, setAuroraOrbs] = useState<AuroraOrb[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [blackHole, setBlackHole] = useState<BlackHole | null>(null);

  useEffect(() => {
    let frameId: number;
    const updateDynamicColor = (time: number) => {
      const hue = (time / 30) % 360; 
      document.documentElement.style.setProperty('--theme-color', `hsl(${hue}, 100%, 55%)`);
      frameId = requestAnimationFrame(updateDynamicColor);
    };
    frameId = requestAnimationFrame(updateDynamicColor);

    const spawnOrb = () => {
      const newOrb: AuroraOrb = {
        id: Date.now() + Math.floor(Math.random() * 100000),
        x: Math.random() * 140 - 20,   
        y: Math.random() * 140 - 20,   
        tx: (Math.random() - 0.5) * 80, 
        ty: (Math.random() - 0.5) * 80, 
        size: Math.random() * 800 + 500, 
        blur: Math.random() * 40 + 80,  
        hue: Math.random() * 140 + 150, 
        duration: Math.random() * 20 + 20, 
        opacity: Math.random() * 0.25 + 0.15, 
      };
      setAuroraOrbs(prev => [...prev, newOrb]);
      setTimeout(() => {
        setAuroraOrbs(prev => prev.filter(orb => orb.id !== newOrb.id));
      }, newOrb.duration * 1000);
    };

    const spawnShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.floor(Math.random() * 100000),
        startX: Math.random() * 100,      
        startY: Math.random() * 50 - 20,  
        length: Math.random() * 200 + 100, 
        speed: Math.random() * 1.5 + 0.5, 
        angle: Math.random() * 60 + 20,   
      };
      setShootingStars(prev => [...prev, newStar]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, newStar.speed * 1000 + 100);
    };

    const scheduleBlackHole = () => {
      const nextEventTime = Math.random() * (15 * 60000 - 5 * 60000) + 5 * 60000; 
      
      setTimeout(() => {
        setBlackHole({
          active: true,
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20
        });

        setTimeout(() => {
          setBlackHole(null);
          scheduleBlackHole(); 
        }, 15000);

      }, nextEventTime);
    };

    for (let i = 0; i < 12; i++) spawnOrb();
    const spawnAuroraInterval = setInterval(spawnOrb, 3000); 
    const spawnStarInterval = setInterval(() => {
       if (Math.random() > 0.4) spawnShootingStar(); 
    }, 4000); 
    
    scheduleBlackHole();

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(spawnAuroraInterval);
      clearInterval(spawnStarInterval);
    };
  }, []);

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
        // BLOKADA WADLIWEGO ODKLIKIWANIA: Akceptujemy ruch tylko jeśli myszka przesunęła się więcej niż 3px.
        if (!interaction.hasMoved) {
          if (Math.abs(dx * canvasZoom) > 3 || Math.abs(dy * canvasZoom) > 3) {
            setInteraction({ ...interaction, hasMoved: true });
            if (!draggedId) setDraggedId(interaction.blockId || null);
          }
          return;
        }

        const cw = parseInt(getCanvasWidth());
        let newLeft = interaction.initialLeft + dx;
        let newTop = interaction.initialTop + dy;
        
        // Magnes 20px
        const SNAP = 20;
        newLeft = Math.round(newLeft / SNAP) * SNAP;
        newTop = Math.round(newTop / SNAP) * SNAP;

        // Twarde ograniczenie X - nie pozwala wyciągnąć po za mapę
        newLeft = Math.max(-cw, Math.min(newLeft, cw));
        
        updateActiveBlock({ styles: { position: 'relative', left: `${newLeft}px`, top: `${newTop}px`, right: 'auto', bottom: 'auto' } }, true);

        // SKANER PROMIENIOWY
        document.querySelectorAll('.dropzone-active').forEach(el => el.classList.remove('dropzone-active'));
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const dropzone = elements.find(el => el.classList?.contains('dropzone-area'));
        if (dropzone) {
           dropzone.classList.add('dropzone-active');
        }
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

        const SNAP_GRID = 20;
        newHeightPx = Math.round(newHeightPx / SNAP_GRID) * SNAP_GRID;

        let percentWidth = (newWidthPx / parentWidth) * 100;
        percentWidth = Math.max(10, percentWidth); // Limit aby nie zgnieść szerokości do zera

        const snaps = [20, 25, 30, 31, 33.33, 40, 48, 50, 60, 66, 66.66, 70, 75, 80, 85, 90, 100];
        for (const snap of snaps) {
          if (Math.abs(percentWidth - snap) < 3) { percentWidth = snap; break; }
        }
        
        const updates: any = {};
        
        if (interaction.dir.includes('e') || interaction.dir.includes('w')) {
          updates.width = `${percentWidth}%`;
        }
        
        if (interaction.dir.includes('s') || interaction.dir.includes('n')) {
          // ZMIANA: Zgnieciesz teraz wysokość do absolutnych 20px
          updates.height = `${newHeightPx}px`; 
          updates.minHeight = `20px`; 
        }
        
        updates.marginLeft = '0px'; updates.marginTop = '0px';
        updateActiveBlock({ styles: updates }, true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (interaction) {
        if (interaction.type === 'drag' && draggedId) {
          // Twarde Dokowanie w nowej Siatce
          const elements = document.elementsFromPoint(e.clientX, e.clientY);
          const dropzone = elements.find(el => el.classList?.contains('dropzone-area'));
          if (dropzone) {
             const targetId = parseInt(dropzone.getAttribute('data-dropzone-target') || '-1');
             const dropType = dropzone.getAttribute('data-dropzone-type') as any;
             if (handleDrop) handleDrop(draggedId, targetId, dropType);
          }
        }
        else if (interaction.type === 'resize') {
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

              return res.map(b => ({ ...b, children: b.children ? sanitizeRecursive(b.children, b.styles.display === 'flex' || b.styles.display === 'grid') : undefined }));
            };
            
            return sanitizeRecursive(prevBlocks);
          });
        }
        
        document.querySelectorAll('.dropzone-active').forEach(el => el.classList.remove('dropzone-active'));
        
        setTimeout(() => {
          setInteraction(null);
          if (setDraggedId) setDraggedId(null);
        }, 10);
      }
    };

    if (interaction) { 
      window.addEventListener('mousemove', handleMouseMove as any); 
      window.addEventListener('mouseup', handleMouseUp); 
    }
    return () => { 
      window.removeEventListener('mousemove', handleMouseMove as any); 
      window.removeEventListener('mouseup', handleMouseUp); 
    };
  }, [interaction, activeId, canvasZoom, isEditing, isMediaManagerOpen, viewport, activeBlock]);

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

  const categories = [
    { id: 'tekst', label: 'Tekst' }, 
    { id: 'obraz', label: 'Obraz' }, 
    { id: 'przycisk', label: 'Przycisk' }, 
    { id: 'grafika', label: 'Grafika' }, 
    { id: 'pola', label: 'Pola' }, 
    { id: 'wideo', label: 'Wideo' }, 
    { id: 'formularze', label: 'Formularze' }, 
    { id: 'menu', label: 'Menu' },
    { id: 'wyskakujace', label: 'Wyskakujące' }, 
    { id: 'lista', label: 'Lista' }, 
    { id: 'social', label: 'Social' },
    { id: 'osadzona', label: 'Osadzona' },
  ];

  const renderCategoryIcon = (id: string) => {
    const iconProps = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    switch(id) {
      case 'tekst': return <svg {...iconProps}><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>;
      case 'obraz': return <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
      case 'przycisk': return <svg {...iconProps}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
      case 'grafika': return <svg {...iconProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
      case 'pola': return <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
      case 'wideo': return <svg {...iconProps}><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><polygon points="10 9 15 12 10 15 10 9"/></svg>;
      case 'formularze': return <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
      case 'menu': return <svg {...iconProps}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
      case 'wyskakujace': return <svg {...iconProps}><rect x="3" y="3" width="12" height="12" rx="2" ry="2"/><rect x="9" y="9" width="12" height="12" rx="2" ry="2"/></svg>;
      case 'lista': return <svg {...iconProps}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
      case 'social': return <svg {...iconProps}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
      case 'osadzona': return <svg {...iconProps}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
      default: return <svg {...iconProps}><circle cx="12" cy="12" r="10"/></svg>;
    }
  };

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <div className={`flex items-center justify-between pr-2 transition ${activeId === b.id ? 'bg-[#ff4500]/20 border-l-2 border-[#ff4500]' : 'hover:bg-white/10 border-l-2 border-transparent'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} 
            className={`flex-1 text-left text-[11px] py-1.5 px-2 truncate flex items-center gap-2 ${activeId === b.id ? 'text-[#ff4500] font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]' : 'text-neutral-400 hover:text-white'}`} 
            style={{ paddingLeft: `${(depth * 12) + 8}px` }}
          >
            <span className={`flex items-center gap-1.5 ${hiddenBlocks.includes(b.id) ? 'opacity-30 line-through' : ''}`}>
              {b.children ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              )} 
              {b.name}
            </span>
          </button>
          <button onClick={(e) => toggleBlockVisibility(e, b.id)} className={`text-xs px-1 ${hiddenBlocks.includes(b.id) ? 'text-red-500 hover:text-red-400' : 'text-neutral-500 hover:text-white'}`}>
            {hiddenBlocks.includes(b.id) ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  const activeCategoryData = categories.find(c => c.id === addCategory);

  return (
    <div className="flex h-screen w-screen bg-[#000] text-white font-sans overflow-hidden relative selection:bg-[#ff4500]/30 z-0">
      
      {/* MAGIA ANIMACJI: SYSTEM NIEBA, ZAPADANIE SIĘ ŚWIATŁA I MROCZNE SZKŁO */}
      <style dangerouslySetInnerHTML={{__html: `
        
        .dropzone-active {
           background-color: rgba(255, 69, 0, 0.3) !important;
           transform: scale(1.02) !important;
           border-color: rgba(255, 69, 0, 1) !important;
        }

        /* KOSMICZNE SUWAKI */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
        * { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.1) transparent; }

        @keyframes full-spectrum-shift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        /* NOWA ZORZA: Losowe trajektorie i miękkie przenikanie */
        @keyframes aurora-flow {
          0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
          25% { opacity: var(--max-opacity, 0.35); transform: translate(calc(var(--tx) * 0.33), calc(var(--ty) * 0.33)) scale(1.1); }
          75% { opacity: var(--max-opacity, 0.35); transform: translate(calc(var(--tx) * 0.66), calc(var(--ty) * 0.66)) scale(1.2); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.9); }
        }

        @keyframes shooting-star-dash {
          0% { opacity: 0; transform: rotate(var(--star-angle)) translateX(0) scaleX(1); }
          5% { opacity: 1; transform: rotate(var(--star-angle)) translateX(100%) scaleX(1.3); }
          90% { opacity: 1; transform: rotate(var(--star-angle)) translateX(2000%) scaleX(1.5); }
          100% { opacity: 0; transform: rotate(var(--star-angle)) translateX(2500%) scaleX(0.8); }
        }
        
        @keyframes black-hole-suck {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; filter: blur(20px); }
          20% { transform: translate(-50%, -50%) scale(1); opacity: 1; filter: blur(50px); }
          80% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; filter: blur(80px); }
          100% { transform: translate(-50%, -50%) scale(0); opacity: 0; filter: blur(10px); }
        }

        .black-hole-event {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #000000 20%, rgba(0,0,0,0.9) 50%, transparent 80%);
          box-shadow: 0 0 100px 50px #000;
          width: 800px;
          height: 800px;
          z-index: 15;
          animation: black-hole-suck 15s ease-in-out forwards;
          pointer-events: none;
        }

        .aurora-container-normal {
          opacity: 0.9;
          transform: scale(1);
          transition: opacity 4s ease, transform 6s ease;
        }

        .aurora-container-dimmed {
          opacity: 0.02 !important; 
          transform: scale(0.5); 
          transition: opacity 5s ease-in, transform 8s ease-in;
        }

        @keyframes neon-breathe {
          0%, 100% { box-shadow: 0 0 10px -2px var(--theme-color), inset 0 0 5px -2px var(--theme-color); }
          50% { box-shadow: 0 0 20px 2px var(--theme-color), inset 0 0 10px 1px var(--theme-color); }
        }

        .aurora-flowing-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px);
          pointer-events: none;
          mix-blend-mode: plus-lighter;
          animation-name: aurora-flow;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
          opacity: 0;
        }

        .shooting-star {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 1) 30%, var(--theme-color) 80%, rgba(0, 229, 255, 0) 100%);
          pointer-events: none;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 4px var(--theme-color));
          animation-name: shooting-star-dash;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          transform-origin: left center;
        }

        .cyber-glass-panel {
          background: rgba(8, 8, 12, 0.75) !important; 
          backdrop-filter: blur(30px) saturate(150%) !important;
          -webkit-backdrop-filter: blur(30px) saturate(150%) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 10px 0 30px rgba(0,0,0,0.5) !important;
        }

        .cyber-kafel {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          color: #94a3b8;
          transition: all 0.3s ease;
        }
        .cyber-kafel:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .cyber-kafel.active {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--theme-color);
          animation: neon-breathe 8s infinite ease-in-out;
          color: #fff;
        }
      `}} />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#070709]"></div>

      <div 
        className={`absolute inset-0 pointer-events-none z-10 overflow-hidden animate-[full-spectrum-shift_60s_linear_infinite] ${blackHole?.active ? 'aurora-container-dimmed' : 'aurora-container-normal'}`}
        style={{ transformOrigin: blackHole ? `${blackHole.x}% ${blackHole.y}%` : '50% 50%' }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>

        {auroraOrbs.map(orb => (
          <div 
            key={orb.id}
            className="aurora-flowing-orb"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              backgroundColor: `hsl(${orb.hue}, 100%, 55%)`,
              filter: `blur(${orb.blur}px)`,
              animationDuration: `${orb.duration}s`,
              '--tx': `${orb.tx}vw`,
              '--ty': `${orb.ty}vh`,
              '--max-opacity': orb.opacity
            } as React.CSSProperties}
          />
        ))}

        {shootingStars.map(star => (
          <div 
            key={star.id}
            className="shooting-star"
            style={{
              width: `${star.length}px`,
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              animationDuration: `${star.speed}s`,
              '--star-angle': `${star.angle}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {blackHole?.active && (
        <div 
          className="black-hole-event" 
          style={{ left: `${blackHole.x}%`, top: `${blackHole.y}%` }}
        />
      )}

      <div 
        className="flex h-full relative z-50"
        onMouseLeave={() => setAddCategory(null)}
      >
        {/* LEWY PASEK TERMINALA VYRAI */}
        <aside className="cyber-glass-panel w-[110px] flex flex-col items-center py-6 gap-4 shrink-0 overflow-y-auto scrollbar-hide relative border-r border-white/5">
          
          <button 
            onClick={() => { setLeftTab(leftTab === 'pages' ? null : 'pages'); setAddCategory(null); }} 
            className="relative w-[76px] h-12 rounded-[14px] flex items-center justify-center text-neutral-400 transition-all duration-300 z-30 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 hover:scale-105"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          </button>
          <button 
            onClick={() => { setLeftTab(leftTab === 'layers' ? null : 'layers'); setAddCategory(null); }} 
            className="relative w-[76px] h-12 rounded-[14px] flex items-center justify-center text-neutral-400 transition-all duration-300 z-30 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 hover:scale-105"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </button>
          
          <div className="w-12 h-px bg-white/10 my-1 z-30"></div>
          
          {/* KATEGORIE - WEKTOROWE MINIMALISTYCZNE IKONY SVG */}
          {categories.map(cat => {
            const isActive = addCategory === cat.id;
            return (
              <button 
                key={cat.id} 
                onMouseEnter={() => { setAddCategory(cat.id); setLeftTab(null); }} 
                onClick={() => { setAddCategory(isActive ? null : cat.id); setLeftTab(null); }} 
                className={`cyber-kafel w-[76px] h-[76px] flex items-center justify-center transition-all duration-300 z-30 ${isActive ? 'active scale-105 text-white' : 'text-neutral-500 hover:text-white hover:scale-105'}`}
              >
                <div 
                  className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                  style={isActive ? { color: 'var(--theme-color)', filter: 'drop-shadow(0 0 8px var(--theme-color))' } : {}}
                >
                  {renderCategoryIcon(cat.id)}
                </div>
              </button>
            );
          })}
        </aside>

        {/* PANELE WYSZUKIWANE Z LEWEJ (Strony, Warstwy, Kategorie) */}
        <div className="relative z-40 h-full flex">
          
          {leftTab === 'pages' && (
            <div className="cyber-glass-panel w-64 h-full flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5">
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 15px var(--theme-color)' }}></div>
              <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
                <h2 className="font-bold text-[11px] uppercase tracking-widest text-white">Strony</h2>
                <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
              </div>
              <div className="flex-1 p-4 relative z-10 bg-transparent">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-all shadow-sm">
                   <span className="text-xs font-bold text-white">/{pageSlug}</span>
                 </div>
              </div>
            </div>
          )}
          
          {leftTab === 'layers' && (
            <div className="cyber-glass-panel w-64 h-full flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5">
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 15px var(--theme-color)' }}></div>
              <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
                <h2 className="font-bold text-[11px] uppercase tracking-widest text-neutral-300">DOM Navigator</h2>
                <button onClick={() => setLeftTab(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto py-2 relative z-10 bg-transparent">{blocks.length === 0 ? <div className="p-4 text-xs text-neutral-500 text-center">Płótno jest puste.</div> : renderLayerTree(blocks)}</div>
            </div>
          )}

          {addCategory && activeCategoryData && (
            <div className="cyber-glass-panel w-[340px] h-full flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5">
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 10px var(--theme-color)' }}></div>
              <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.5 }}></div>
              
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 relative z-10">
                <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-sm">
                  {activeCategoryData.label}
                </h3>
                <button onClick={() => setAddCategory(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-hide relative z-10 bg-transparent">
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
      </div>

      <div className="flex-1 flex flex-col relative z-30 bg-transparent">
        <TopHeader canvasZoom={canvasZoom} setCanvasZoom={setCanvasZoom} showGrid={showGrid} setShowGrid={setShowGrid} pageSlug={pageSlug} setPageSlug={setPageSlug} handlePublish={handlePublish} activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} viewport={viewport} setViewport={setViewport} handleAddSection={handleAddSection} handleChangeLayout={handleChangeLayout} isAiOpen={isAiOpen} setIsAiOpen={setIsAiOpen} undo={undo} redo={redo} canUndo={past.length > 0} canRedo={future.length > 0} />
        
        {isAiOpen && (
          <AICopilot 
            activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsAiOpen={setIsAiOpen} 
            handleAddSection={handleAddSection} handleAddComplexSection={handleAddComplexSection}
          />
        )}
        
        <TextFormatToolbar activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />
        
        <main 
          className="flex-1 overflow-auto flex justify-center p-10 z-10 Selection:bg-blue-600/20 bg-transparent relative" 
          onClick={() => { 
            if (interaction) return;
            setActiveId(null); setIsEditing(false); setLeftTab(null); setAddCategory(null); setIsAiOpen(false); 
          }}
        >
          {/* OBIEKT UCINA SIĘ POZA PŁÓTNEM - WPROWADZONY KAGANIEC (overflow-hidden) */}
          <div style={{ width: getCanvasWidth(), transform: `scale(${canvasZoom})`, transformOrigin: 'top center', transition: interaction ? 'none' : 'width 0.3s ease-in-out, transform 0.2s ease-out' }} 
               className="min-h-screen h-fit bg-white text-black shadow-[0_40px_100px_rgba(0,0,0,0.9)] rounded-b-xl relative z-30 flex flex-row flex-wrap content-start items-start pb-40 border border-white/5 overflow-hidden">
             
             {/* NOWA SIATKA ARCHITEKTONICZNA: Renderowana NA płótnie */}
             {showGrid && (
               <div className="absolute inset-0 pointer-events-none z-0 rounded-b-xl overflow-hidden opacity-30">
                 <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
                 <div className="absolute inset-0 flex justify-center w-full h-full">
                   <div className="w-full h-full flex gap-5 px-5">
                     {Array(12).fill(0).map((_,i) => <div key={i} className="flex-1 bg-blue-500/[0.04] border-x border-blue-500/10 h-full"></div>)}
                   </div>
                 </div>
               </div>
             )}
             
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
                      viewport={viewport}
                    />
                    
                    {/* WIDZIALNE STREFY ZRZUTU (DROP ZONES) */}
                    {showGhost && !hiddenBlocks.includes(b.id) && (
                      <div 
                        data-dropzone-target={b.id}
                        data-dropzone-type="inline"
                        className="dropzone-area flex-1 min-h-[100px] border-2 border-dashed border-[#ff4500] bg-[#ff4500]/10 rounded-xl m-2 flex items-center justify-center opacity-50 transition-all cursor-pointer pointer-events-auto z-[99999]"
                      >
                        <span className="text-[#ff4500] font-bold text-[10px] uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,69,0,0.5)] pointer-events-none">+ Wstaw Obok</span>
                      </div>
                    )}

                    {isBreak && !hiddenBlocks.includes(b.id) && <div className="basis-full h-0 m-0 p-0 pointer-events-none"></div>}
                  </React.Fragment>
                );
             })}

             {/* DOLNA STREFA ZRZUTU */}
             <div 
               data-dropzone-target="-1"
               data-dropzone-type="bottom"
               className="dropzone-area w-full h-32 mt-4 border-2 border-transparent hover:border-dashed hover:border-[#ff4500] hover:bg-[#ff4500]/10 hover:text-[#ff4500] rounded-xl transition-all flex items-center justify-center text-transparent font-bold tracking-widest uppercase text-[10px] pointer-events-auto z-[99999]"
             >
               Upuść tutaj (Na koniec)
             </div>

          </div>
        </main>
        
        <div className="absolute bottom-0 left-0 w-full z-50">
          <BottomBar blocks={blocks} activeId={activeId} setActiveId={setActiveId} />
        </div>
      </div>
      
      <RightPanel 
        activeBlock={(leftTab !== null || addCategory !== null) ? null : activeBlock} 
        rightTab={rightTab} 
        setRightTab={setRightTab as any} 
        updateActiveBlock={updateActiveBlock} 
        removeActiveBlock={removeActiveBlock} 
        setIsMediaManagerOpen={setIsMediaManagerOpen} 
      />
      
      {isMediaManagerOpen && <MediaManager activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />}
    </div>
  );
}