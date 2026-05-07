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

// ======== ANATOMIA KOSMICZNEGO NIEBA V18 ========
interface AuroraOrb {
  id: number;
  x: number;          // Pozycja X (%)
  y: number;          // Pozycja Y (%)
  size: number;       // Wielkość (px)
  blur: number;       // Stopień rozmycia (px)
  hue: number;        // Bazowy kolor HSL (0-360)
  duration: number;   // Czas życia / prędkość płynięcia (s)
}

interface ShootingStar {
  id: number;
  startX: number;     // Początek X (%)
  startY: number;     // Początek Y (%)
  length: number;     // Długość ogona (px)
  speed: number;      // Prędkość przelotu (s)
  angle: number;      // Losowy Kąt Opadania (deg)
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
    
    // ======== MAGIA: BUDOWANIE ZŁOŻONEGO ALERTU (SECURITY NOTICE) ========
    let newBlock: Block;
    if (type === 'container' && variant === 'notice-box') {
      newBlock = createBlock('container', 'notice-box', 'Security Alert');
      newBlock.styles = { 
        ...newBlock.styles, 
        border: '2px solid #ff0033', 
        backgroundColor: 'rgba(255, 0, 51, 0.05)', 
        padding: '30px 24px 24px 24px', 
        borderRadius: '8px', 
        position: 'relative', 
        boxShadow: '0 0 20px rgba(255, 0, 51, 0.1), inset 0 0 10px rgba(255, 0, 51, 0.05)', 
        marginTop: '24px' 
      };
      
      const badge = createBlock('p', '', 'Plakietka');
      badge.text = 'SECURITY & SAFETY NOTICE';
      badge.styles = { 
        ...badge.styles, 
        backgroundColor: '#ff0033', 
        color: '#ffffff', 
        padding: '6px 16px', 
        fontSize: '11px', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        position: 'absolute', 
        top: '0', 
        transform: 'translateY(-50%)', 
        left: '24px', 
        borderRadius: '4px', 
        letterSpacing: '1px',
        margin: '0',
        width: 'max-content',
        zIndex: 10
      };

      const text = createBlock('p', '', 'Treść Alertu');
      text.text = 'Internal access should only be performed by qualified personnel in compliance with local electrical safety regulations and OHS standards.';
      text.styles = { 
        ...text.styles, 
        color: '#ff0033', 
        fontSize: '14px', 
        fontWeight: '500', 
        margin: '0',
        lineHeight: '1.5'
      };

      newBlock.children = [badge, text];
    } else {
      newBlock = createBlock(type, variant, label);
    }
    // =====================================================================

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

  // ======== MAGIA: GENERYCZNE NIEBO V18 (Zorze i Spadające Gwiazdy) ========
  const [auroraOrbs, setAuroraOrbs] = useState<AuroraOrb[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // A. Pełne Spektrum dla Interfejsu ( requestAnimationFrame )
    let frameId: number;
    const updateDynamicColor = (time: number) => {
      const hue = (time / 30) % 360; 
      document.documentElement.style.setProperty('--theme-color', `hsl(${hue}, 100%, 55%)`);
      frameId = requestAnimationFrame(updateDynamicColor);
    };
    frameId = requestAnimationFrame(updateDynamicColor);

    // B. System Płynącej Zorzy ( Generator Orbsów )
    const spawnOrb = () => {
      const newOrb: AuroraOrb = {
        id: Date.now(),
        // Rodzi się na losowej krawędzi, płynie przez ekran
        x: Math.random() * 120 - 10,   // Losowo od -10% do 110% szerokości
        y: Math.random() * 120 - 10,   // Losowo od -10% do 110% wysokości
        size: Math.random() * 600 + 400, // Wielkość losowa duża 400px - 1000px
        blur: Math.random() * 80 + 120,  // Rozmycie losowe bardzo duże 120px - 200px
        hue: Math.random() * 120 + 160, // Cyjany, fiolety, magenty, zielenie (160-280)
        duration: Math.random() * 20 + 30, // Płynie powoli przez 30-50s
      };
      setAuroraOrbs(prev => [...prev, newOrb]);

      // Automatyczne usuwanie orba po zakończeniu płynięcia
      setTimeout(() => {
        setAuroraOrbs(prev => prev.filter(orb => orb.id !== newOrb.id));
      }, newOrb.duration * 1000);
    };

    // C. System Spadających Gwiazd ( Generator Shooting Stars pod różnymi kątami )
    const spawnShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100,      // Pojawia się losowo na całej szerokości
        startY: Math.random() * 50 - 20,  // Pojawia się gdzieś nad płótnem
        length: Math.random() * 200 + 100, // Długość losowa 100px - 300px
        speed: Math.random() * 1.5 + 0.5, // Prędkość przelotu szybka 0.5s - 2.0s
        angle: Math.random() * 60 + 20,   // LOSOWY KĄT: Od 20 do 80 stopni! (Naturalne opadanie)
      };
      setShootingStars(prev => [...prev, newStar]);

      // Usuń spadającą gwiazdę natychmiast po przelocie (z zapasem bezpieczeństwa na animację)
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, newStar.speed * 1000 + 100);
    };

    // Inicjalizacja Zorzy
    for (let i = 0; i < 6; i++) spawnOrb();
    const spawnAuroraInterval = setInterval(spawnOrb, 5000); 

    // Inicjalizacja Spadających Gwiazd
    const spawnStarInterval = setInterval(() => {
       if (Math.random() > 0.4) spawnShootingStar(); // Losowe pojawianie się (nie zawsze)
    }, 4000); 

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(spawnAuroraInterval);
      clearInterval(spawnStarInterval);
    };
  }, []);
  // ============================================================================

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
    { id: 'tekst', label: 'Tekst', icon: 'H1' }, 
    { id: 'obraz', label: 'Obraz', icon: '🖼️' }, 
    { id: 'przycisk', label: 'Przycisk', icon: '👆' }, 
    { id: 'grafika', label: 'Grafika', icon: '⭐' }, 
    { id: 'pola', label: 'Pola', icon: '📦' }, 
    { id: 'wideo', label: 'Wideo', icon: '▶️' }, 
    { id: 'formularze', label: 'Formularze', icon: '📝' }, 
    { id: 'menu', label: 'Menu', icon: '☰' },
    { id: 'wyskakujace', label: 'Wyskakujące', icon: '🪟' }, 
    { id: 'lista', label: 'Lista', icon: '📋' }, 
    { id: 'social', label: 'Social Media', icon: '❤️' },
    { id: 'osadzona', label: 'Osadzona treść', icon: '🔗' },
  ];

  const renderLayerTree = (arr: Block[], depth = 0) => {
    return arr.map(b => (
      <div key={`tree-${b.id}`} className="flex flex-col w-full">
        <div className={`flex items-center justify-between pr-2 transition ${activeId === b.id ? 'bg-[#ff4500]/20 border-l-2 border-[#ff4500]' : 'hover:bg-white/10 border-l-2 border-transparent'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveId(b.id); setIsEditing(false); }} 
            className={`flex-1 text-left text-[11px] py-1.5 px-2 truncate flex items-center gap-2 ${activeId === b.id ? 'text-[#ff4500] font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]' : 'text-neutral-700 hover:text-white'}`} 
            style={{ paddingLeft: `${(depth * 12) + 8}px` }}
          >
            <span className={hiddenBlocks.includes(b.id) ? 'opacity-30 line-through' : ''}>
              {b.children ? '📂' : '📄'} {b.name}
            </span>
          </button>
          <button onClick={(e) => toggleBlockVisibility(e, b.id)} className={`text-xs px-1 ${hiddenBlocks.includes(b.id) ? 'text-red-500 hover:text-red-400' : 'text-neutral-400 hover:text-white'}`}>
            {hiddenBlocks.includes(b.id) ? '🙈' : '👁️'}
          </button>
        </div>
        {b.children && renderLayerTree(b.children, depth + 1)}
      </div>
    ));
  };

  const activeCategoryData = categories.find(c => c.id === addCategory);

  return (
    <div className="flex h-screen w-screen bg-[#000] text-white font-sans overflow-hidden relative selection:bg-[#ff4500]/30 z-0">
      
      {/* MAGIA ANIMACJI: SYSTEM NIEBA V18 & MROCZNE SZKŁO */}
      <style dangerouslySetInnerHTML={{__html: `
        /* A. Pełne Spektrum dla tła nieba (subtelny hue shift) */
        @keyframes full-spectrum-shift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        /* B. Płynięcie pojedynczej zorzy diagonalnie przez ekran */
        @keyframes aurora-flow {
          0% { opacity: 0; transform: translate(0%, 0%) scale(0.9); }
          10% { opacity: 0.15; transform: translate(10%, 10%) scale(1); }
          /* Płynne przemieszczanie się w górę i w prawo */
          90% { opacity: 0.15; transform: translate(90%, -90%) scale(1.1); }
          100% { opacity: 0; transform: translate(100%, -100%) scale(1.2); }
        }

        /* C. Błyskawiczny przelot spadającej gwiazdy Z UWZGLĘDNIENIEM KĄTA ROTACJI */
        @keyframes shooting-star-dash {
          0% { opacity: 0; transform: rotate(var(--star-angle)) translateX(0) scaleX(1); }
          5% { opacity: 1; transform: rotate(var(--star-angle)) translateX(100%) scaleX(1.3); }
          /* Gwiazda przelatuje bardzo głęboko wzdłuż swojej osi X, zależnie od długości */
          90% { opacity: 1; transform: rotate(var(--star-angle)) translateX(2000%) scaleX(1.5); }
          100% { opacity: 0; transform: rotate(var(--star-angle)) translateX(2500%) scaleX(0.8); }
        }

        /* D. Blask aktywnych kafelków interfejsu */
        @keyframes neon-breathe {
          0%, 100% { box-shadow: 0 0 10px -2px var(--theme-color), inset 0 0 5px -2px var(--theme-color); }
          50% { box-shadow: 0 0 20px 2px var(--theme-color), inset 0 0 10px 1px var(--theme-color); }
        }

        /* E. Styl dla generowanej Zorzy (Płynący Orb) */
        .aurora-flowing-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px); /* Baza blur nadpisywana w JS */
          pointer-events: none;
          mix-blend-mode: plus-lighter; /* Lepsze świecenie w mroku */
          animation-name: aurora-flow;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
          opacity: 0;
        }

        /* F. Styl dla Spadającej Gwiazdy (Dash & Tail pod kątem) */
        .shooting-star {
          position: absolute;
          height: 1.5px; /* Bardzo cienki neon */
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 1) 30%, var(--theme-color) 80%, rgba(0, 229, 255, 0) 100%);
          pointer-events: none;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 4px var(--theme-color));
          animation-name: shooting-star-dash;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          /* Rotacja z CSS Variable ustawianej w React */
          transform-origin: left center;
        }

        /* Mroczne Szkło Cyber Premium */
        .cyber-glass-panel {
          background: rgba(8, 8, 12, 0.75) !important; 
          backdrop-filter: blur(30px) saturate(150%) !important;
          -webkit-backdrop-filter: blur(30px) saturate(150%) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 10px 0 30px rgba(0,0,0,0.5) !important;
        }

        /* Szklany Kafel CyberTech */
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
          animation: neon-breathe 2s infinite ease-in-out;
          color: #fff;
        }
      `}} />

      {/* == GENERYCZNE NIEBO V18 (Zorze i Spadające Gwiazdy) == */}
      {/* z-10 dla zorzy, z-20 dla gwiazd, z-30 dla płótna */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-90 animate-[full-spectrum-shift_60s_linear_infinite]">
        
        {/* Subtelna kropkowana głębia kosmosu */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>

        {/* 1. Generowane, Płynące Zorze Polarne */}
        {auroraOrbs.map(orb => (
          <div 
            key={orb.id}
            className="aurora-flowing-orb"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              // Unikalny kolor HSL
              backgroundColor: `hsl(${orb.hue}, 100%, 55%)`,
              // Unikalne rozmycie
              filter: `blur(${orb.blur}px)`,
              // Prędkość diagonalnego płynięcia
              animationDuration: `${orb.duration}s`,
            }}
          />
        ))}

        {/* 2. Błyskawiczne Spadające Gwiazdy (Z ROŻNYMI KĄTAMI OPADANIA) */}
        {shootingStars.map(star => (
          <div 
            key={star.id}
            className="shooting-star"
            style={{
              width: `${star.length}px`,
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              animationDuration: `${star.speed}s`,
              // Kąt wstrzykiwany jako zmienna CSS
              '--star-angle': `${star.angle}deg`,
            } as React.CSSProperties}
          />
        ))}

      </div>

      {/* LEWY PASEK TERMINALA V18 - MROCZNE SZKŁO (z-50) */}
      <aside className="cyber-glass-panel w-[110px] flex flex-col items-center py-6 gap-4 z-50 shrink-0 overflow-y-auto scrollbar-hide relative border-r border-white/5">
        
        <button 
          onClick={() => { setLeftTab(leftTab === 'pages' ? null : 'pages'); setAddCategory(null); }} 
          className="relative w-[76px] h-12 rounded-[14px] flex items-center justify-center text-xl transition-all duration-300 z-30 font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105"
        >
          +
        </button>
        <button 
          onClick={() => { setLeftTab(leftTab === 'layers' ? null : 'layers'); setAddCategory(null); }} 
          className="relative w-[76px] h-12 rounded-[14px] flex items-center justify-center text-xl transition-all duration-300 z-30 bg-white/5 text-neutral-400 border border-white/10 hover:text-white hover:bg-white/10 hover:scale-105"
        >
          ☰
        </button>
        
        <div className="w-12 h-px bg-white/10 my-1 z-30"></div>
        
        {/* KATEGORIE - SZKLANE KAFLE (MROCZNE) */}
        {categories.map(cat => {
          const isActive = addCategory === cat.id;
          return (
            <button 
              key={cat.id} 
              onMouseEnter={() => { setAddCategory(cat.id); setLeftTab(null); }} 
              onClick={() => { setAddCategory(isActive ? null : cat.id); setLeftTab(null); }} 
              className={`cyber-kafel w-[76px] h-[76px] flex items-center justify-center transition-all duration-300 z-30 ${isActive ? 'active scale-105' : 'hover:scale-105'}`}
            >
              <span 
                className={`text-[32px] drop-shadow-md transition-all ${isActive ? 'scale-110' : ''}`}
                style={isActive && cat.icon !== 'H1' ? { color: 'var(--theme-color)', filter: 'drop-shadow(0 0 8px var(--theme-color))' } : {}}
              >
                {cat.icon === 'H1' ? (
                   <span className={`font-bold text-[28px] transition-colors ${isActive ? '' : 'text-neutral-500'}`} style={isActive ? { color: 'var(--theme-color)', textShadow: '0 0 8px var(--theme-color)' } : {}}>H1</span>
                ) : cat.icon}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="relative z-40 h-full flex">
        
        {/* PANEL STRON */}
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
        
        {/* PANEL WARSTW */}
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

        {/* PANELE KATEGORII (MROCZNE SZKŁO Z DYNAMICZNYMI LINIAMI SPEKTRUM) */}
        {addCategory && activeCategoryData && (
          <div 
            className="cyber-glass-panel w-[340px] h-full z-30 flex flex-col animate-in slide-in-from-left-4 relative overflow-hidden border-r border-white/5" 
          >
            {/* Cienka linia akcentująca na górze i z lewej - płynnie zmienia kolory globalną zmienną HSL */}
            <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 10px var(--theme-color)' }}></div>
            <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.5 }}></div>
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 relative z-10">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-sm">
                {activeCategoryData.label}
              </h3>
              <button onClick={() => setAddCategory(null)} className="text-neutral-500 hover:text-white transition-colors font-bold">✕</button>
            </div>
            
            {/* Wnętrze - Transparentne */}
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

      {/* Main Canvas Area - TŁO WRAPPERA JEST TRANSPARENTNE, BY ŚWIATŁO SWOBODNIE PŁYNĘŁO POD SPODEM */}
      <div className="flex-1 flex flex-col relative z-30 bg-transparent">
        <TopHeader canvasZoom={canvasZoom} setCanvasZoom={setCanvasZoom} showGrid={showGrid} setShowGrid={setShowGrid} pageSlug={pageSlug} setPageSlug={setPageSlug} handlePublish={handlePublish} activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} viewport={viewport} setViewport={setViewport} handleAddSection={handleAddSection} handleChangeLayout={handleChangeLayout} isAiOpen={isAiOpen} setIsAiOpen={setIsAiOpen} undo={undo} redo={redo} canUndo={past.length > 0} canRedo={future.length > 0} />
        
        {isAiOpen && (
          <AICopilot 
            activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsAiOpen={setIsAiOpen} 
            handleAddSection={handleAddSection} handleAddComplexSection={handleAddComplexSection}
          />
        )}
        
        <TextFormatToolbar activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} />
        
        <main className="flex-1 overflow-auto flex justify-center p-10 z-10 Selection:bg-blue-600/20 bg-transparent" onClick={() => { setActiveId(null); setIsEditing(false); setLeftTab(null); setAddCategory(null); setIsAiOpen(false); }}>
          
          {/* == PŁÓTNO BIAŁE TEXT-BLACK (ORYGINAŁ) == */}
          {/* Ustawiony wyższy z-index 30, aby płótno było nad niebem */}
          <div style={{ width: getCanvasWidth(), transform: `scale(${canvasZoom})`, transformOrigin: 'top center', transition: interaction ? 'none' : 'width 0.3s ease-in-out, transform 0.2s ease-out' }} 
               className="min-h-screen h-fit bg-white text-black shadow-[0_40px_100px_rgba(0,0,0,0.9)] rounded-b-xl relative z-30 flex flex-row flex-wrap content-start items-start pb-40 border border-white/5">
             
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
                        className="flex-1 min-h-[100px] border-2 border-dashed border-[#ff4500] bg-[#ff4500]/10 rounded-xl m-2 flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-[#ff4500]/20 hover:scale-[1.02] transition-all cursor-pointer"
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
        
        {/* DOLNY BAR (MROCZNY CYBERTECH) - z-50 */}
        <div className="relative z-50 bg-[#070709] border-t border-white/5">
          <BottomBar blocks={blocks} activeId={activeId} setActiveId={setActiveId} />
        </div>
      </div>
      
      <RightPanel activeBlock={activeBlock} rightTab={rightTab} setRightTab={setRightTab as any} updateActiveBlock={updateActiveBlock} removeActiveBlock={removeActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />
      {isMediaManagerOpen && <MediaManager activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />}
    </div>
  );
}