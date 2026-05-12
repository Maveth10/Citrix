'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { createBlock } from '../utils/blockFactory';
import { generateTemplate } from '../utils/editorConfig';
import { useEditorShortcuts } from '../hooks/useEditorShortcuts';
import { useContextMenu } from '../hooks/useContextMenu';

import TopHeader from '../components/TopHeader';
import LeftPanel from '../components/LeftPanel'; 
import RightPanel from '../components/RightPanel';
import TextFormatToolbar from '../components/TextFormatToolbar';
import MediaManager from '../components/MediaManager';
import CanvasBlock from '../components/CanvasBlock';
import BottomBar from '../components/BottomBar';
import AICopilot from '../components/AICopilot';

import CosmicBackground from '../components/backgrounds/CosmicBackground';
import CyberTheme from '../components/themes/CyberTheme';
import ContextMenu from '../components/ContextMenu'; 

interface Block {
  id: number; type: string; name: string; text?: string; src?: string; videoId?: string; children?: Block[];
  images?: string[]; hoverStyles?: any; entranceAnim?: string; ribbonItems?: { type: 'text' | 'img', value: string, styles?: any }[]; 
  styles: any; stylesTablet?: any; stylesMobile?: any;
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
  const [leftTab, setLeftTab] = useState<string | null>(null);
  const [addCategory, setAddCategory] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'layout' | 'design' | 'effects' | 'interactions'>('layout');
  
  const [pageSlug, setPageSlug] = useState('vyrai');
  
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [copiedStyles, setCopiedStyles] = useState<any>(null);
  const [previewPopupId, setPreviewPopupId] = useState<number | null>(null);

  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu();

  const handleSetContextMenu = (val: {x: number, y: number, blockId: number} | null) => {
    if (val) {
      const b = findBlockById(blocks, val.blockId);
      openContextMenu({ preventDefault: ()=>{}, stopPropagation: ()=>{}, clientX: val.x, clientY: val.y } as any, val.blockId, b?.type || 'container');
    } else {
      closeContextMenu();
    }
  };

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

  const updateActiveBlock = (updates: any, skipHistory = false, specificId?: number) => {
    const targetId = specificId !== undefined ? specificId : activeId;
    if (targetId === null) return;

    const setter = skipHistory ? setInternalBlocks : setBlocks;
    setter(prevBlocks => {
      const updateRecursive = (arr: Block[]): Block[] => arr.map(b => {
        if (b.id === targetId) {
          return { 
            ...b, 
            ...updates, 
            styles: updates.styles ? { ...b.styles, ...updates.styles } : b.styles,
            stylesTablet: updates.stylesTablet ? { ...(b.stylesTablet || {}), ...updates.stylesTablet } : b.stylesTablet,
            stylesMobile: updates.stylesMobile ? { ...(b.stylesMobile || {}), ...updates.stylesMobile } : b.stylesMobile,
            hoverStyles: updates.hoverStyles ? { ...(b.hoverStyles || {}), ...updates.hoverStyles } : b.hoverStyles
          };
        }
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
              emptyField.styles.minHeight = '100px'; 
              emptyField.styles.minWidth = '20px';
              emptyField.styles.height = 'auto';
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
      emptyField.styles.minHeight = '100px'; 
      emptyField.styles.minWidth = '20px';
      emptyField.styles.height = 'auto';
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

  const handleInsertTemplate = (type: string) => {
    const template = generateTemplate(type);
    if (template) {
      handleAddComplexSection(template);
      setLeftTab(null);
      setAddCategory(null);
    }
  };

  const handleAddBlock = (type: string, variant: string, label: string) => {
    const newBlock = createBlock(type, variant, label);
    newBlock.id = Date.now() + Math.floor(Math.random() * 100000); 

    if (type === 'container' && variant === 'empty') {
       newBlock.styles.minHeight = '100px';
       newBlock.styles.minWidth = '20px';
       newBlock.styles.height = 'auto';
       newBlock.styles.width = '100%';
    }

    setBlocks(prevBlocks => {
      if (!activeId) {
        if (type !== 'section' && type !== 'popup') {
           const autoWrapper = createBlock('section', '', 'Sekcja (Auto)');
           autoWrapper.id = Date.now() + Math.floor(Math.random() * 100000);
           autoWrapper.styles = { ...autoWrapper.styles, display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px', minHeight: 'min-content', height: 'auto', width: '100%', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', clearRow: true, justifyContent: 'stretch', alignItems: 'stretch' };
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

  const handleDuplicate = () => {
    if (!activeId) return;

    setBlocks(prevBlocks => {
      let clonedBlock: Block | null = null;
      
      const deepClone = (block: Block): Block => {
        return {
          ...block,
          id: Date.now() + Math.floor(Math.random() * 1000000),
          children: block.children ? block.children.map(deepClone) : undefined
        };
      };

      const findBlock = (arr: Block[]) => {
        for (const b of arr) {
          if (b.id === activeId) clonedBlock = deepClone(b);
          if (b.children && !clonedBlock) findBlock(b.children);
        }
      };
      findBlock(prevBlocks);

      if (!clonedBlock) return prevBlocks;

      const insertClone = (arr: Block[]): Block[] => {
        let res: Block[] = [];
        for (const b of arr) {
          res.push(b);
          if (b.id === activeId) {
            res.push(clonedBlock!);
          } else if (b.children) {
            b.children = insertClone(b.children);
          }
        }
        return res;
      };

      const nextBlocks = insertClone(prevBlocks);
      return cleanupRows(nextBlocks);
    });
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
            emptyContainer.styles.minHeight = '100px'; 
            emptyContainer.styles.minWidth = '20px';
            emptyContainer.styles.height = 'auto';
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

  const moveBlockTree = (sourceId: number, targetId: number, position: 'before' | 'after' | 'inside') => {
    if (sourceId === targetId) return;
    
    setBlocks(prevBlocks => {
      const sourceBlockNode = findBlockById(prevBlocks, sourceId);
      if (sourceBlockNode && checkIsChild(sourceBlockNode, targetId)) {
         return prevBlocks; 
      }

      let sourceBlock: Block | null = null;
      
      const removeSource = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === sourceId);
        if (index > -1) {
          sourceBlock = arr[index];
          const newArr = [...arr];
          newArr.splice(index, 1);
          return newArr;
        }
        return arr.map(b => ({ ...b, children: b.children ? removeSource(b.children) : undefined }));
      };
      
      let intermediate = removeSource(prevBlocks);
      if (!sourceBlock) return prevBlocks;

      const insertBlock = (arr: Block[]): Block[] => {
        const index = arr.findIndex(b => b.id === targetId);
        if (index > -1) {
          const newArr = [...arr];
          if (position === 'before') {
             newArr.splice(index, 0, sourceBlock!);
          } else if (position === 'after') {
             newArr.splice(index + 1, 0, sourceBlock!);
          } else if (position === 'inside') {
             newArr[index] = { 
               ...newArr[index], 
               children: [...(newArr[index].children || []), sourceBlock!] 
             };
          }
          return newArr;
        }
        return arr.map(b => ({ ...b, children: b.children ? insertBlock(b.children) : undefined }));
      };
      
      return cleanupRows(insertBlock(intermediate));
    });
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
            
            const updatedSource = { ...sourceBlock!, styles: { ...sourceBlock!.styles, clearRow: true, flex: 'unset', width: safeWidth, marginLeft: '0px', position: 'relative', left: '0px', top: '0px' } };
            const mergedArr = [...newArr.slice(0, index + 1), updatedSource, ...newArr.slice(index + 1)];
            return cleanupRows(mergedArr);
          } else {
            let restoredWidth = sourceBlock!.styles.width;
            if (typeof restoredWidth === 'string' && restoredWidth.includes('calc')) restoredWidth = '100%';
            
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

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blocks, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `vyrai_project_${pageSlug}.json`);
    dlAnchorElem.click();
  };

  const handleImportJSON = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedBlocks = JSON.parse(event.target?.result as string);
        setBlocks(importedBlocks);
        setActiveId(null);
      } catch (err) {
        alert("Błąd pliku JSON! Wybierz poprawny plik projektu Vyrai.");
      }
    };
    reader.readAsText(file);
    e.target.value = null; 
  };

  const handleQuickAction = (action: string, blockId: number) => {
    if (action === 'fill-100') {
      updateActiveBlock({ styles: { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: '0px', left: '0px', zIndex: 0 } }, true, blockId);
    } else if (action === 'center-all') {
      updateActiveBlock({ styles: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' } }, true, blockId);
    } else if (action === 'hide-mobile') {
      setHiddenBlocks(prev => prev.includes(blockId) ? prev : [...prev, blockId]);
      updateActiveBlock({ styles: { opacity: '0.3', border: '2px dashed red' } }, true, blockId);
    }
  };

  useEditorShortcuts({
    isPreviewMode, setIsPreviewMode: (val) => { setIsPreviewMode(val); setPreviewPopupId(null); },
    isMediaManagerOpen, setIsMediaManagerOpen,
    isAiOpen, setIsAiOpen,
    leftTab, setLeftTab,
    addCategory, setAddCategory,
    isEditing, setIsEditing,
    activeId, setActiveId,
    activeBlock, updateActiveBlock,
    removeActiveBlock, handleDuplicate,
    undo, redo
  });

  const getCanvasWidth = () => viewport === 'mobile' ? '375px' : (viewport === 'tablet' ? '768px' : '1200px');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!interaction || !activeId || isEditing || isMediaManagerOpen || isPreviewMode) return; e.preventDefault();
      
      const dx = (e.pageX - interaction.startX) / canvasZoom; 
      const dy = (e.pageY - interaction.startY) / canvasZoom;
      
      if (interaction.type === 'drag') {
        if (!interaction.hasMoved) {
          if (Math.abs(dx * canvasZoom) > 3 || Math.abs(dy * canvasZoom) > 3) {
            setInteraction({ ...interaction, hasMoved: true });
            if (!draggedId) setDraggedId(interaction.blockId || null);
          }
          return;
        }

        const SNAP_GRID = 20;
        const cw = parseInt(getCanvasWidth());
        let newLeft = interaction.initialLeft + dx;
        let newTop = interaction.initialTop + dy;
        
        newLeft = Math.round(newLeft / SNAP_GRID) * SNAP_GRID;
        newTop = Math.round(newTop / SNAP_GRID) * SNAP_GRID;

        newLeft = Math.max(-cw + 40, Math.min(newLeft, cw - 40));
        
        updateActiveBlock({ styles: { position: 'relative', left: `${newLeft}px`, top: `${newTop}px`, right: 'auto', bottom: 'auto' } }, true);

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
        
        percentWidth = Math.min(100, Math.max(10, percentWidth)); 

        const snaps = [20, 25, 30, 31, 33.33, 40, 48, 50, 60, 66, 66.66, 70, 75, 80, 85, 90, 100];
        for (const snap of snaps) {
          if (Math.abs(percentWidth - snap) < 3) { percentWidth = snap; break; }
        }
        
        const updates: any = {};
        
        if (interaction.dir.includes('e') || interaction.dir.includes('w')) {
          updates.width = `${percentWidth}%`;
        }
        
        if (interaction.dir.includes('s') || interaction.dir.includes('n')) {
          const isStructural = ['section', 'container', 'form', 'list', 'menu', 'popup'].includes(activeBlock?.type || '');
          if (isStructural) {
            updates.minHeight = `${newHeightPx}px`; 
            updates.height = 'auto'; 
          } else {
            updates.height = `${newHeightPx}px`; 
            updates.minHeight = `20px`; 
          }
        }
        
        updates.marginLeft = '0px'; updates.marginTop = '0px';
        updateActiveBlock({ styles: updates }, true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (interaction) {
        if (interaction.type === 'drag' && draggedId) {
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

    if (interaction) { window.addEventListener('mousemove', handleMouseMove as any); window.addEventListener('mouseup', handleMouseUp); }
    return () => { window.removeEventListener('mousemove', handleMouseMove as any); window.removeEventListener('mouseup', handleMouseUp); };
  }, [interaction, activeId, canvasZoom, isEditing, isMediaManagerOpen, viewport, activeBlock, isPreviewMode]);

  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!activeId || isMediaManagerOpen || isPreviewMode) return;
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
  }, [activeId, isMediaManagerOpen, isPreviewMode]);

  return (
    <div 
      className="flex h-screen w-screen bg-[#000] text-white font-sans overflow-hidden relative selection:bg-[#ff4500]/30 z-0"
      onContextMenu={(e) => { 
         closeContextMenu(); 
      }}
    >
      
      <CyberTheme />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#070709]"></div>
      <CosmicBackground />

      {contextMenu && activeBlock && (
        <ContextMenu 
          x={contextMenu.x}
          y={contextMenu.y}
          blockType={contextMenu.blockType || activeBlock.type}
          onClose={closeContextMenu}
          onLayerUp={() => updateActiveBlock({ styles: { zIndex: (activeBlock.styles?.zIndex || 1) + 1 } }, true, contextMenu.blockId)}
          onLayerDown={() => updateActiveBlock({ styles: { zIndex: Math.max(0, (activeBlock.styles?.zIndex || 1) - 1) } }, true, contextMenu.blockId)}
          onCopyStyles={() => setCopiedStyles(activeBlock.styles)}
          onPasteStyles={() => {
            const { width, height, minWidth, minHeight, left, top, position, display, flexDirection, flexWrap, gridTemplateColumns, gridTemplateRows, ...safeStyles } = copiedStyles;
            updateActiveBlock({ styles: { ...activeBlock.styles, ...safeStyles } }, true, contextMenu.blockId);
          }}
          onDuplicate={() => handleDuplicate()}
          onRemove={() => removeActiveBlock()}
          onQuickAction={(action) => handleQuickAction(action, contextMenu.blockId)}
          hasCopiedStyles={!!copiedStyles}
        />
      )}

      {/* LEWY PANEL (Został jak był) */}
      {!isPreviewMode && (
        <div 
          className="flex h-full relative z-50 transition-all duration-300"
          onMouseLeave={() => setAddCategory(null)}
        >
          <LeftPanel 
            leftTab={leftTab} setLeftTab={setLeftTab} 
            addCategory={addCategory} setAddCategory={setAddCategory} 
            blocks={blocks} pageSlug={pageSlug} 
            handleAddBlock={handleAddBlock} handleInsertTemplate={handleInsertTemplate} 
            handleExportJSON={handleExportJSON} handleImportJSON={handleImportJSON} 
            activeId={activeId} setActiveId={setActiveId} 
            setIsEditing={setIsEditing} hiddenBlocks={hiddenBlocks} 
            toggleBlockVisibility={toggleBlockVisibility} moveBlockTree={moveBlockTree}
          />
        </div>
      )}

      {/* GŁÓWNA OBSZAR ROBOCZY */}
      <div className="flex-1 flex flex-col relative z-30 bg-transparent transition-all duration-300">
        
        {/* 🔥 TOP HEADER (Niewidzialny Hover Area - Tryb Zen) 🔥 */}
        {!isPreviewMode && (
          <div className="absolute top-0 left-0 w-full z-50 group">
             {/* To jest strefa wykrywania myszki na górze (wysokość 20px) */}
             <div className="absolute top-0 left-0 w-full h-[30px] z-40 bg-transparent"></div>
             {/* Sam pasek TopHeader - domyślnie schowany do góry, wyjeżdża na hover */}
             <div className="absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out -translate-y-full group-hover:translate-y-0 z-50">
               <TopHeader 
                 canvasZoom={canvasZoom} setCanvasZoom={setCanvasZoom} 
                 showGrid={showGrid} setShowGrid={setShowGrid} 
                 pageSlug={pageSlug} setPageSlug={setPageSlug} 
                 handlePublish={handlePublish} activeBlock={activeBlock} 
                 updateActiveBlock={updateActiveBlock} viewport={viewport} 
                 setViewport={setViewport} handleAddSection={handleAddSection} 
                 handleChangeLayout={handleChangeLayout} isAiOpen={isAiOpen} 
                 setIsAiOpen={setIsAiOpen} undo={undo} redo={redo} 
                 canUndo={past.length > 0} canRedo={future.length > 0} 
                 onPreviewClick={() => { setActiveId(null); setIsPreviewMode(true); }}
               />
             </div>
          </div>
        )}
        
        {isAiOpen && !isPreviewMode && (
          <AICopilot 
            activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsAiOpen={setIsAiOpen} 
            handleAddSection={handleAddSection} handleAddComplexSection={handleAddComplexSection}
          />
        )}
        
        {!isPreviewMode && <TextFormatToolbar activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} isEditing={isEditing} />}
        
        {/* PŁÓTNO (CANVAS) */}
        <main 
          className="flex-1 overflow-auto flex justify-center p-10 pt-[60px] z-10 Selection:bg-blue-600/20 bg-transparent relative" 
          onClick={() => { 
            if (interaction) return;
            setActiveId(null); setIsEditing(false); setLeftTab(null); setAddCategory(null); setIsAiOpen(false); 
          }}
        >
          <div style={{ width: getCanvasWidth(), transform: `scale(${canvasZoom})`, transformOrigin: 'top center', transition: interaction ? 'none' : 'width 0.3s ease-in-out, transform 0.2s ease-out' }} 
               className="min-h-screen h-fit bg-white text-black shadow-[0_40px_100px_rgba(0,0,0,0.9)] rounded-b-xl relative z-30 flex flex-row flex-wrap content-start items-start pb-40 border border-white/5 overflow-hidden">
             
             {showGrid && !isPreviewMode && (
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
                      handleDuplicate={handleDuplicate}
                      removeActiveBlock={removeActiveBlock}
                      isPreviewMode={isPreviewMode}
                      copiedStyles={copiedStyles}
                      setCopiedStyles={setCopiedStyles}
                      previewPopupId={previewPopupId}
                      setPreviewPopupId={setPreviewPopupId}
                      setContextMenu={handleSetContextMenu} 
                    />
                    
                    {showGhost && !hiddenBlocks.includes(b.id) && !isPreviewMode && (
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

             {!isPreviewMode && (
               <div 
                 data-dropzone-target="-1"
                 data-dropzone-type="bottom"
                 className="dropzone-area w-full h-32 mt-4 border-2 border-transparent hover:border-dashed hover:border-[#ff4500] hover:bg-[#ff4500]/10 hover:text-[#ff4500] rounded-xl transition-all flex items-center justify-center text-transparent font-bold tracking-widest uppercase text-[10px] pointer-events-auto z-[99999]"
               >
                 Upuść tutaj (Na koniec)
               </div>
             )}

          </div>
        </main>
        
        {/* 🔥 BOTTOM BAR (Niewidzialny Hover Area - Tryb Zen) 🔥 */}
        {!isPreviewMode && (
          <div className="absolute bottom-0 left-0 w-full z-50 group">
             {/* Strefa wykrywania myszki na dole ekranu */}
             <div className="absolute bottom-0 left-0 w-full h-[30px] z-40 bg-transparent"></div>
             {/* Sam pasek BottomBar - domyślnie w dół, wyjeżdża na hover */}
             <div className="absolute bottom-0 left-0 w-full transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0 z-50">
               <BottomBar blocks={blocks} activeId={activeId} setActiveId={setActiveId} />
             </div>
          </div>
        )}
      </div>
      
      {/* PRAWY PANEL (Został jak był) */}
      {!isPreviewMode && (
        <RightPanel 
          blocks={blocks}
          activeBlock={(leftTab !== null || addCategory !== null) ? null : activeBlock} 
          rightTab={rightTab} 
          setRightTab={setRightTab as any} 
          updateActiveBlock={updateActiveBlock} 
          removeActiveBlock={removeActiveBlock} 
          setIsMediaManagerOpen={setIsMediaManagerOpen} 
          viewport={viewport}
        />
      )}
      
      {isMediaManagerOpen && <MediaManager activeBlock={activeBlock} updateActiveBlock={updateActiveBlock} setIsMediaManagerOpen={setIsMediaManagerOpen} />}

      {isPreviewMode && (
        <button 
          onClick={() => setIsPreviewMode(false)}
          className="fixed bottom-6 right-6 z-[9999999] bg-[#ff4500] text-white font-bold w-12 h-12 rounded-full shadow-[0_10px_30px_rgba(255,69,0,0.4)] hover:scale-110 transition-transform flex items-center justify-center outline outline-2 outline-white/20"
          title="Wróć do edycji"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </button>
      )}

    </div>
  );
}