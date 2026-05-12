import React, { useEffect, useState, useRef } from 'react';
import ActiveBlockOverlay from './ActiveBlockOverlay'; 
import CanvasElement from './CanvasElement'; 
import { loadGoogleFont } from '../../utils/fontsConfig'; 
import { applyRWD, buildHoverCSS } from '../../utils/styleBuilder'; 
import { getAnimationStyles, getGlobalKeyframes } from '../../utils/animationBuilder'; 

export default function CanvasBlock({ 
  b, activeId, setActiveId, isEditing, setIsEditing, isMediaManagerOpen, setIsMediaManagerOpen, 
  setInteraction, updateActiveBlock, parentId, parentActive, interaction,
  draggedId, setDraggedId, handleDrop, hiddenBlocks = [], viewport = 'desktop',
  handleDuplicate, removeActiveBlock, isPreviewMode = false,
  copiedStyles, setCopiedStyles, setContextMenu, previewPopupId, setPreviewPopupId
}: any) {
  
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (b?.styles?.fontFamily) loadGoogleFont(b.styles.fontFamily); 
  }, [b?.styles?.fontFamily]);

  useEffect(() => {
    if (!isPreviewMode || !b?.entranceAnim || b.entranceAnim === 'none') { setIsVisible(true); return; }
    setIsVisible(false);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.15 });
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, [isPreviewMode, b?.entranceAnim]);

  if (!b) return null;
  if (hiddenBlocks.includes(b.id)) return null;

  const isActive = activeId === b.id;
  const isCurrentlyEdited = isActive && isEditing && !isPreviewMode;
  const isBeingDragged = interaction?.type === 'drag' && interaction?.hasMoved && draggedId === b.id;
  
  const currentStyles = applyRWD(b, viewport);
  const animStyles = getAnimationStyles(b, isVisible, isPreviewMode);
  const hoverCSS = buildHoverCSS(b.hoverStyles);

  // 🔥 ZAGINIONA ZMIENNA PRZYWRÓCONA DO ŻYCIA 🔥
  const currentZIndex = currentStyles.zIndex !== undefined ? currentStyles.zIndex : 1;

  const hasMediaBg = currentStyles.bgType === 'image' || currentStyles.bgType === 'video';
  const bgStyles = { ...currentStyles };
  if (currentStyles.bgType === 'image') bgStyles.backgroundImage = currentStyles.bgImage?.includes('gradient') ? currentStyles.bgImage : `url(${currentStyles.bgImage})`;
  if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
  
  if (currentStyles.display === 'none' && !isPreviewMode) {
      currentStyles.display = 'flex'; currentStyles.opacity = 0.3; currentStyles.border = '2px dashed #ff4500';
  }

  const containerStyles: any = { 
    ...bgStyles, fontFamily: currentStyles.fontFamily || 'inherit',
    filter: `blur(${currentStyles.filterBlur || 0}px) brightness(${currentStyles.filterBrightness ?? 100}%) contrast(${currentStyles.filterContrast ?? 100}%) saturate(${currentStyles.filterSaturate ?? 100}%)`, 
    backdropFilter: currentStyles.backdropBlur ? `blur(${currentStyles.backdropBlur}px)` : undefined,
    pointerEvents: isBeingDragged ? 'none' : 'auto', 
    zIndex: isBeingDragged ? 99999 : (isActive && !isPreviewMode ? 9999 : currentZIndex),
    transition: isBeingDragged ? 'none' : (currentStyles.transition || 'all 0.3s ease'), overflow: currentStyles.overflow || 'visible', ...animStyles 
  };

  let innerPadding = currentStyles.padding || '0px';
  if (b.children) { delete containerStyles.padding; containerStyles.display = 'block'; }

  const handleBlockMouseDown = (e: any) => { 
    e.stopPropagation(); if (setContextMenu) setContextMenu(null); 
    if (isPreviewMode) return; 
    if (activeId !== b.id) { setActiveId(b.id); setIsEditing(false); } 
    if ((isActive && isEditing) || isMediaManagerOpen) return; 
    setInteraction({ type: 'drag', startX: e.pageX, startY: e.pageY, blockId: b.id, hasMoved: false, initialLeft: parseFloat(b.styles.left) || 0, initialTop: parseFloat(b.styles.top) || 0 });
  };

  const handleResizeStart = (e: React.MouseEvent, dir: string) => {
    e.stopPropagation(); e.preventDefault(); 
    if (isPreviewMode) return;
    const el = document.getElementById(`block-${b.id}`);
    const compStyle = el ? window.getComputedStyle(el) : null;
    setInteraction({ 
      type: 'resize', dir, startX: e.pageX, startY: e.pageY, blockId: b.id,
      initialLeft: el?.offsetLeft || 0, initialTop: el?.offsetTop || 0, 
      initialWidth: el?.offsetWidth || 0, initialHeight: el?.offsetHeight || 0,
      initialMarginLeft: compStyle ? parseFloat(compStyle.marginLeft) || 0 : 0,
      initialMarginTop: compStyle ? parseFloat(compStyle.marginTop) || 0 : 0
    });
  };

  const blockContent = (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        ${getGlobalKeyframes()}
        #block-${b.id} { transition: ${isBeingDragged ? 'none !important' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}; }
        ${hoverCSS ? `#block-${b.id}:hover { ${hoverCSS} z-index: 50 !important; }` : ''}
        ${b.customCss || ''} 
      `}} />
      <div 
        ref={blockRef as any} id={`block-${b.id}`} style={containerStyles} 
        onClick={(e) => { e.stopPropagation(); if (setContextMenu) setContextMenu(null); }} 
        onContextMenu={(e) => { if (isPreviewMode) return; e.preventDefault(); e.stopPropagation(); setActiveId(b.id); setIsEditing(false); if (setContextMenu) setContextMenu({ x: e.clientX, y: e.clientY, blockId: b.id }); }}
        onMouseDown={handleBlockMouseDown}
        className={`group ${!isActive && !isPreviewMode ? 'hover:outline hover:outline-1 hover:outline-[#ff4500]/50 hover:outline-dashed' : ''} ${draggedId === b.id ? 'opacity-50' : ''}`}
      >
        {currentStyles.bgType === 'video' && currentStyles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={currentStyles.bgVideo} />}
        
        <CanvasElement 
          b={b} currentStyles={currentStyles} isEditing={isCurrentlyEdited} isPreviewMode={isPreviewMode} updateActiveBlock={updateActiveBlock}
          onDoubleClick={(e: any) => { 
            if (isPreviewMode) return; e.stopPropagation(); 
            if (b.type === 'img') { setIsMediaManagerOpen(true); } else { setIsEditing(true); setTimeout(() => e.target?.focus(), 10); } 
          }}
        />
        
        {b.children && (
          <div className="w-full h-full relative pointer-events-none flex flex-col flex-1" style={{zIndex: 10, borderRadius: 'inherit', overflow: (!isPreviewMode && isActive) ? 'visible' : 'hidden'}}>
             <div className="pointer-events-auto w-full h-full relative flex-1" style={{ padding: innerPadding, display: currentStyles.display === 'grid' ? 'grid' : 'flex', flexWrap: currentStyles.flexWrap || 'wrap', flexDirection: currentStyles.display === 'grid' ? undefined : (currentStyles.flexDirection || 'column'), gap: currentStyles.gap || '20px', gridTemplateColumns: currentStyles.gridTemplateColumns, alignItems: currentStyles.alignItems || 'stretch', justifyContent: currentStyles.justifyContent || 'stretch' }}>
                {b.children.map((child: any) => (
                     <CanvasBlock key={child.id} b={child} activeId={activeId} setActiveId={setActiveId} isEditing={isEditing} setIsEditing={setIsEditing} isMediaManagerOpen={isMediaManagerOpen} setIsMediaManagerOpen={setIsMediaManagerOpen} setInteraction={setInteraction} updateActiveBlock={updateActiveBlock} parentId={b.id} parentActive={isActive} interaction={interaction} draggedId={draggedId} setDraggedId={setDraggedId} handleDrop={handleDrop} hiddenBlocks={hiddenBlocks} viewport={viewport} handleDuplicate={handleDuplicate} removeActiveBlock={removeActiveBlock} isPreviewMode={isPreviewMode} copiedStyles={copiedStyles} setCopiedStyles={setCopiedStyles} setContextMenu={setContextMenu} previewPopupId={previewPopupId} setPreviewPopupId={setPreviewPopupId} />
                ))}
             </div>
          </div>
        )}
        
        {isActive && !isEditing && !isPreviewMode && ( <ActiveBlockOverlay block={b} currentZIndex={currentZIndex} updateActiveBlock={updateActiveBlock} copiedStyles={copiedStyles} setCopiedStyles={setCopiedStyles} handleDuplicate={handleDuplicate} removeActiveBlock={removeActiveBlock} handleResizeStart={handleResizeStart} /> )}
      </div>
    </>
  );

  return blockContent;
}