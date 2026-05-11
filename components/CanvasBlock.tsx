import React, { useEffect, useState, useRef } from 'react';
import ActiveBlockOverlay from './ActiveBlockOverlay'; 
import { loadGoogleFont } from '../utils/fontsConfig';
import { applyRWD, buildHoverCSS, getEmbedUrl } from '../utils/styleBuilder';
import { getAnimationStyles, getGlobalKeyframes } from '../utils/animationBuilder';
import { supabase } from '../supabase';

interface CanvasBlockProps {
  b: any; activeId: number | null; setActiveId: (id: number | null) => void;
  isEditing: boolean; setIsEditing: (val: boolean) => void;
  isMediaManagerOpen: boolean; setIsMediaManagerOpen: (val: boolean) => void;
  setInteraction: (val: any) => void; updateActiveBlock: (updates: any, skipHistory?: boolean, specificId?: number) => void;
  parentId?: number; parentActive?: boolean; interaction?: any; 
  draggedId?: number | null; setDraggedId?: (id: number | null) => void;
  handleDrop?: (sourceId: number, targetId: number, type?: 'before'|'inline') => void;
  hiddenBlocks?: number[]; viewport?: 'desktop' | 'tablet' | 'mobile';
  handleDuplicate?: () => void; removeActiveBlock?: () => void;
  isPreviewMode?: boolean; copiedStyles?: any; setCopiedStyles?: (styles: any) => void;
  setContextMenu?: (val: {x: number, y: number, blockId: number} | null) => void;
  previewPopupId?: number | null; setPreviewPopupId?: (id: number | null) => void;
}

export default function CanvasBlock({ 
  b, activeId, setActiveId, isEditing, setIsEditing, isMediaManagerOpen, setIsMediaManagerOpen, 
  setInteraction, updateActiveBlock, parentId, parentActive, interaction,
  draggedId, setDraggedId, handleDrop, hiddenBlocks = [], viewport = 'desktop',
  handleDuplicate, removeActiveBlock, isPreviewMode = false,
  copiedStyles, setCopiedStyles, setContextMenu,
  previewPopupId, setPreviewPopupId
}: CanvasBlockProps) {
  
  if (hiddenBlocks.includes(b.id)) return null;

  const isActive = activeId === b.id;
  const isAbsolute = b.styles.position === 'absolute' || b.styles.position === 'fixed';
  const isBeingDragged = interaction?.type === 'drag' && interaction?.hasMoved && draggedId === b.id;
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [localText, setLocalText] = useState(b.text || '');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const textRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  const checkIsChildLocal = (block: any, id: number): boolean => {
    if (!block?.children) return false;
    if (block.children.some((c: any) => c.id === id)) return true;
    return block.children.some((c: any) => checkIsChildLocal(c, id));
  };
  const hasActiveChild = activeId ? checkIsChildLocal(b, activeId) : false;
  const forceVisibleOverflow = !isPreviewMode && (isActive || hasActiveChild);

  useEffect(() => {
    if (!isEditing) setLocalText(b.text || '');
  }, [b.text, isEditing]);

  useEffect(() => {
    if (b.styles?.fontFamily) loadGoogleFont(b.styles.fontFamily);
  }, [b.styles?.fontFamily]);

  // Intersection Observer dla animacji Reveal on Scroll
  useEffect(() => {
    if (!isPreviewMode || !b.entranceAnim || b.entranceAnim === 'none') {
      setIsVisible(true); return;
    }
    setIsVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, [isPreviewMode, b.entranceAnim]);
  
  const currentStyles = applyRWD(b, viewport);
  const animStyles = getAnimationStyles(b, isVisible, isPreviewMode);
  const hoverCSS = buildHoverCSS(b.hoverStyles);

  const hasMediaBg = currentStyles.bgType === 'image' || currentStyles.bgType === 'video';
  const bgStyles = { ...currentStyles };
  if (currentStyles.bgType === 'image') bgStyles.backgroundImage = currentStyles.bgImage?.includes('gradient') ? currentStyles.bgImage : `url(${currentStyles.bgImage})`;
  if (hasMediaBg) bgStyles.backgroundColor = 'transparent';
  
  const isHiddenByRWD = currentStyles.display === 'none';
  if (isHiddenByRWD && !isPreviewMode) {
      currentStyles.display = 'flex';
      currentStyles.opacity = 0.3;
      currentStyles.border = '2px dashed #ff4500';
  }

  const currentZIndex = currentStyles.zIndex !== undefined ? currentStyles.zIndex : 1;
  const isInteractive = isPreviewMode && (b.interactionType === 'url' || b.interactionType === 'scroll' || b.interactionType === 'open_popup' || b.interactionType === 'close_popup' || b.type === 'button');

  const containerStyles: any = { 
    ...bgStyles, 
    fontFamily: currentStyles.fontFamily || 'inherit',
    filter: `blur(${currentStyles.filterBlur || 0}px) brightness(${currentStyles.filterBrightness ?? 100}%) contrast(${currentStyles.filterContrast ?? 100}%) saturate(${currentStyles.filterSaturate ?? 100}%) grayscale(${currentStyles.filterGrayscale ?? 0}%)`, 
    backdropFilter: currentStyles.backdropBlur ? `blur(${currentStyles.backdropBlur}px)` : undefined,
    WebkitBackdropFilter: currentStyles.backdropBlur ? `blur(${currentStyles.backdropBlur}px)` : undefined,
    mixBlendMode: currentStyles.mixBlendMode || 'normal', 
    cursor: isInteractive ? 'pointer' : (isPreviewMode ? 'default' : (isAbsolute && !isEditing && !isMediaManagerOpen ? 'move' : 'default')), 
    pointerEvents: isBeingDragged ? 'none' : 'auto',
    zIndex: isBeingDragged ? 99999 : (isActive && !isPreviewMode ? 9999 : currentZIndex),
    transition: isBeingDragged ? 'none' : (currentStyles.transition || 'all 0.3s ease'),
    minWidth: currentStyles.minWidth !== undefined ? currentStyles.minWidth : 0, 
    minHeight: currentStyles.minHeight !== undefined ? currentStyles.minHeight : 0,
    overflow: currentStyles.overflow || 'visible',
    boxShadow: isDragOver && !isPreviewMode ? 'inset 0 4px 0 0 #ff4500, 0 0 20px rgba(255, 69, 0, 0.3)' : (currentStyles.boxShadow || 'none'),
    ...animStyles 
  };

  let innerPadding = currentStyles.padding || '0px';
  if (b.children) {
    delete containerStyles.padding; 
    containerStyles.display = 'block';
  }

  if (b.type === 'popup') {
    if (!isPreviewMode) {
      containerStyles.border = '2px dashed #9333ea';
      containerStyles.position = 'relative';
      containerStyles.margin = '20px 0';
    } else {
      if (previewPopupId !== b.id) return null;
      containerStyles.position = 'fixed';
      containerStyles.top = '50%';
      containerStyles.left = '50%';
      containerStyles.transform = 'translate(-50%, -50%)';
      containerStyles.zIndex = 999999;
      containerStyles.maxWidth = '90vw';
      containerStyles.maxHeight = '90vh';
      containerStyles.overflowY = 'auto';
    }
  }

  if (isHiddenByRWD && isPreviewMode) return null;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const enrichedData = { ...data, form_id: `form_${b.id}` };
    const currentSlug = typeof window !== 'undefined' ? (window.location.pathname.split('/').pop() || 'vyrai') : 'vyrai';
    
    try {
      const { error } = await supabase.from('leads').insert([
        { page_slug: currentSlug, data: enrichedData }
      ]);
      if (error) throw error;
      setFormStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus('idle'), 3000);
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

  // 🔥 NAPRAWIONE RENDEROWANIE TEKSTU I PRZYCISKÓW 🔥
  const renderTextElement = (Tag: keyof JSX.IntrinsicElements) => {
    const textStyles: any = { 
      fontSize: currentStyles.fontSize || 'inherit', fontWeight: currentStyles.fontWeight || 'inherit', color: currentStyles.color || 'inherit', 
      textAlign: currentStyles.textAlign, lineHeight: currentStyles.lineHeight || 'inherit', letterSpacing: currentStyles.letterSpacing || 'inherit',
      textTransform: currentStyles.textTransform || 'none', margin: 0, overflowY: currentStyles.overflowY || 'hidden', overflowX: 'hidden', 
      wordBreak:'break-word', outline: 'none', cursor: isInteractive ? 'pointer' : ((isActive && isEditing && !isPreviewMode) ? 'text' : 'inherit'), textShadow: currentStyles.textShadow, 
      width: '100%', height: '100%', display: Tag === 'div' ? 'flex' : 'block', alignItems: currentStyles.alignItems, justifyContent: currentStyles.justifyContent, 
      zIndex: 10, position: 'relative', flex: currentStyles.flex || 'auto'
    };

    if (currentStyles.WebkitBackgroundClip === 'text') {
      textStyles.backgroundImage = currentStyles.backgroundImage; textStyles.WebkitBackgroundClip = 'text'; textStyles.WebkitTextFillColor = 'transparent';
      textStyles.color = 'transparent';
    }

    if (currentStyles.WebkitTextStroke) {
      textStyles.WebkitTextStroke = currentStyles.WebkitTextStroke; textStyles.color = currentStyles.color || 'transparent';
    }

    const ActualTag = (isPreviewMode && b.type === 'button') ? 'button' : Tag;

    const commonProps = {
      id: `text-${b.id}`,
      ref: textRef as any,
      style: textStyles,
      onMouseDown: (e: any) => {
        if (isPreviewMode) return;
        e.stopPropagation(); 
        if (activeId !== b.id) { setActiveId(b.id); setIsEditing(false); }
      },
      onDoubleClick: (e: any) => { 
        if (isPreviewMode) return; 
        e.stopPropagation(); 
        setIsEditing(true); 
        setTimeout(() => e.target.focus(), 10);
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => { 
        if (e.currentTarget.innerHTML !== b.text) updateActiveBlock({ text: e.currentTarget.innerHTML }, false, b.id); 
      }
    };

    if (ActualTag === 'button') {
      return (
        <button {...commonProps} type="submit">
          <span dangerouslySetInnerHTML={{ __html: localText }} />
        </button>
      );
    }

    return (
      <ActualTag 
        {...commonProps}
        contentEditable={isActive && isEditing && !isPreviewMode} 
        suppressContentEditableWarning={true} 
        dangerouslySetInnerHTML={{ __html: localText }} 
      />
    );
  };

  const ContainerTag = (isPreviewMode && b.type === 'form') ? 'form' : 'div';

  const blockContent = (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        ${getGlobalKeyframes()}
        #block-${b.id} { transition: ${isBeingDragged ? 'none !important' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}; }
        ${hoverCSS ? `#block-${b.id}:hover { ${hoverCSS} z-index: 50 !important; }` : ''}
      `}} />

      <ContainerTag 
        ref={blockRef as any} id={`block-${b.id}`} style={containerStyles} 
        onSubmit={isPreviewMode && b.type === 'form' ? handleFormSubmit : undefined}
        onClick={(e) => { 
          e.stopPropagation(); 
          if (isPreviewMode) {
             if (b.interactionType === 'url' && b.actionUrl) window.open(b.actionUrl, b.actionTarget || '_self');
             else if (b.interactionType === 'scroll' && b.actionScrollId) {
                const target = document.getElementById(`block-${b.actionScrollId}`);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
             } 
             else if (b.interactionType === 'open_popup' && b.actionPopupId && setPreviewPopupId) setPreviewPopupId(parseInt(b.actionPopupId));
             else if (b.interactionType === 'close_popup' && setPreviewPopupId) setPreviewPopupId(null);
          }
        }} 
        onContextMenu={(e) => {
          if (isPreviewMode) return; e.preventDefault(); e.stopPropagation(); setActiveId(b.id); setIsEditing(false);
          if (setContextMenu) setContextMenu({ x: e.clientX, y: e.clientY, blockId: b.id });
        }}
        onMouseDown={(e) => { 
          e.stopPropagation(); 
          if (isPreviewMode) return; 
          if (activeId !== b.id) { if (parentId && !parentActive && !e.ctrlKey && !e.metaKey) { setActiveId(parentId); setIsEditing(false); return; } setActiveId(b.id); setIsEditing(false); } 
          if ((isActive && isEditing) || isMediaManagerOpen) return; 
          setInteraction({ type: 'drag', startX: e.pageX, startY: e.pageY, blockId: b.id, hasMoved: false, initialLeft: parseFloat(b.styles.left) || 0, initialTop: parseFloat(b.styles.top) || 0 });
        }}
        onDoubleClick={(e) => { e.stopPropagation(); if (isPreviewMode) return; if (b.type === 'img' || b.images) setIsMediaManagerOpen(true); }}
        className={`group ${!isActive && !isPreviewMode ? 'hover:outline hover:outline-1 hover:outline-[#ff4500]/50 hover:outline-dashed' : (!isPreviewMode ? 'cursor-grab active:cursor-grabbing' : '')} ${draggedId === b.id ? 'opacity-50' : ''}`}
      >
        {currentStyles.bgType === 'video' && currentStyles.bgVideo && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 0 }} src={currentStyles.bgVideo} />}
        {hasMediaBg && currentStyles.bgOverlay && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: currentStyles.bgOverlay, zIndex: 1 }}></div>}
        
        {b.type === 'ribbon' && b.ribbonItems && (
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', height: '100%', zIndex: 10, position: 'relative', pointerEvents:'none' }}>
             {[1, 2].map(group => (
               <div key={group} style={{ display: 'flex', flexShrink: 0, minWidth: '100%', justifyContent: 'space-around', animation: 'scroll-marquee 15s linear infinite' }}>
                 {b.ribbonItems!.map((item: any, i: number) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 30px' }}>
                     {item.type === 'img' ? <img src={item.value} style={{ height: '1.2em', objectFit: 'contain' }} /> : <span style={{fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit'}} dangerouslySetInnerHTML={{ __html: item.value }}/>}
                   </div>
                 ))}
               </div>
             ))}
          </div>
        )}

        {['h1', 'h2', 'marquee'].includes(b.type) && renderTextElement('h1')}
        {b.type === 'p' && renderTextElement('p')}
        {['list', 'faq', 'button', 'social', 'alert'].includes(b.type) && renderTextElement('div')}
        {b.type === 'menu' && renderTextElement('nav')}
        {b.type === 'shape' && <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}}></div>}
        {b.type === 'graphic' && <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}} dangerouslySetInnerHTML={{ __html: b.text || '' }}></div>}
        
        {['input', 'textarea'].includes(b.type) && (
          isPreviewMode ? (
            b.type === 'input' 
              ? <input type="text" name={`field_${b.id}`} placeholder={b.text || 'Wpisz...'} className="w-full h-full text-inherit outline-none bg-transparent placeholder-white/50 relative z-10" style={{ alignItems: currentStyles.alignItems || 'center' }} required />
              : <textarea name={`field_${b.id}`} placeholder={b.text || 'Wpisz...'} className="w-full h-full text-inherit outline-none bg-transparent placeholder-white/50 resize-none relative z-10" style={{ alignItems: currentStyles.alignItems || 'center' }} required />
          ) : (
            <div className="w-full h-full text-inherit pointer-events-none z-10 relative flex" style={{ alignItems: currentStyles.alignItems || 'center' }}>{b.text}</div>
          )
        )}
        
        {b.type === 'video' && (
          <div className="w-full h-full relative z-10 overflow-hidden" style={{ borderRadius: currentStyles.borderRadius }}>
            {b.src && (b.src.includes('youtube') || b.src.includes('youtu.be') || b.src.includes('vimeo')) ? (
              <iframe className="w-full h-full pointer-events-none" src={getEmbedUrl(b.src)} frameBorder="0" allowFullScreen></iframe>
            ) : <video className="w-full h-full object-cover pointer-events-none" controls src={b.src} />}
            <div className="absolute inset-0 z-20 cursor-pointer"></div>
          </div>
        )}

        {b.type === 'embed' && (
          <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden" style={{ borderRadius: currentStyles.borderRadius }}>
             <style dangerouslySetInnerHTML={{__html: `#block-${b.id} iframe { width: 100%; height: 100%; border: none; pointer-events: none; }`}} />
             <div dangerouslySetInnerHTML={{ __html: b.text || '' }} className="w-full h-full pointer-events-none" />
             <div className="absolute inset-0 z-20 cursor-pointer"></div>
          </div>
        )}
        
        {b.type === 'img' && (
          <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: currentStyles.borderRadius, position: 'relative', zIndex: 10}} className="group/img">
            <img src={b.src} className={`w-full h-full pointer-events-none transition-all duration-500`} style={{objectFit: currentStyles.objectFit, objectPosition: `${currentStyles.objectPositionX || 50}% ${currentStyles.objectPositionY || 50}%`, transform: `scale(${currentStyles.imageScale || 1})`}} />
          </div>
        )}
        
        {b.children && (
          <div className="w-full h-full relative pointer-events-none flex flex-col flex-1" style={{zIndex: 10, borderRadius: 'inherit', overflow: forceVisibleOverflow ? 'visible' : 'hidden'}}>
             {b.children.length === 0 && !isPreviewMode && (
               <div className="absolute inset-2 flex items-center justify-center text-[10px] text-neutral-400 font-mono italic border-2 border-dashed border-neutral-300/50 bg-neutral-50/50 rounded-lg pointer-events-none transition-colors group-hover:border-blue-400/50 group-hover:bg-blue-50/30 z-0">
                 Upuść elementy
               </div>
             )}
             <div className="pointer-events-auto w-full h-full relative flex-1" style={{ 
                 padding: innerPadding, display: currentStyles.display === 'grid' ? 'grid' : 'flex', flexWrap: currentStyles.flexWrap || 'wrap', 
                 flexDirection: currentStyles.display === 'grid' ? undefined : (currentStyles.flexDirection || 'column'), gap: currentStyles.gap || '20px', 
                 gridTemplateColumns: currentStyles.gridTemplateColumns, gridTemplateRows: currentStyles.gridTemplateRows, 
                 alignItems: currentStyles.alignItems || 'stretch', justifyContent: currentStyles.justifyContent || 'stretch' 
             }}>
                {b.children.map((child: any) => (
                     <CanvasBlock 
                       key={child.id} b={child} activeId={activeId} setActiveId={setActiveId} isEditing={isEditing} setIsEditing={setIsEditing} 
                       isMediaManagerOpen={isMediaManagerOpen} setIsMediaManagerOpen={setIsMediaManagerOpen} setInteraction={setInteraction} updateActiveBlock={updateActiveBlock} 
                       parentId={b.id} parentActive={isActive} interaction={interaction} draggedId={draggedId} setDraggedId={setDraggedId} handleDrop={handleDrop}
                       hiddenBlocks={hiddenBlocks} viewport={viewport} handleDuplicate={handleDuplicate} removeActiveBlock={removeActiveBlock}
                       isPreviewMode={isPreviewMode} copiedStyles={copiedStyles} setCopiedStyles={setCopiedStyles} setContextMenu={setContextMenu}
                       previewPopupId={previewPopupId} setPreviewPopupId={setPreviewPopupId}
                     />
                ))}
             </div>
             
             {isPreviewMode && b.type === 'form' && formStatus === 'loading' && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-inherit">
                   <div className="w-8 h-8 border-4 border-[#ff4500] border-t-transparent rounded-full animate-spin"></div>
                </div>
             )}
             {isPreviewMode && b.type === 'form' && formStatus === 'success' && (
                <div className="absolute inset-0 bg-green-500/90 text-white flex flex-col items-center justify-center z-50 rounded-inherit animate-in fade-in zoom-in">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                   <span className="font-bold tracking-widest uppercase text-[10px]">Wysłano pomyślnie!</span>
                </div>
             )}
             {isPreviewMode && b.type === 'form' && formStatus === 'error' && (
                <div className="absolute inset-0 bg-red-500/90 text-white flex flex-col items-center justify-center z-50 rounded-inherit animate-in fade-in zoom-in">
                   <span className="font-bold tracking-widest uppercase text-[10px]">Błąd wysyłania!</span>
                </div>
             )}
          </div>
        )}

        {isActive && !isEditing && !isPreviewMode && (
          <ActiveBlockOverlay 
            block={b} currentZIndex={currentZIndex} updateActiveBlock={updateActiveBlock} copiedStyles={copiedStyles} setCopiedStyles={setCopiedStyles} handleDuplicate={handleDuplicate} removeActiveBlock={removeActiveBlock} handleResizeStart={handleResizeStart} 
          />
        )}
      </ContainerTag>
    </>
  );

  if (isPreviewMode && b.type === 'popup' && previewPopupId === b.id) {
    return (
      <div className="fixed inset-0 z-[999998] flex items-center justify-center animate-in fade-in duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setPreviewPopupId && setPreviewPopupId(null)}>
        <div onClick={e => e.stopPropagation()}>{blockContent}</div>
      </div>
    );
  }

  return blockContent;
}