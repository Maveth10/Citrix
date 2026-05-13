import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getEmbedUrl } from '../../utils/styleBuilder';

export default function CanvasElement({ 
  b, currentStyles, isEditing, isPreviewMode, onDoubleClick, updateActiveBlock 
}: any) {
  const [localText, setLocalText] = useState(b.text || '');
  const textRef = useRef<HTMLElement>(null);
  const latestTextRef = useRef(b.text || '');
  
  // 🔥 STAN DLA ZOOM (LIGHTBOX) 🔥
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isEditing) {
      setLocalText(b.text || '');
      latestTextRef.current = b.text || '';
    }
  }, [b.text, isEditing]);

  const handleBlur = () => {
    if (latestTextRef.current !== b.text) {
      updateActiveBlock({ text: latestTextRef.current }, false, b.id);
    }
  };

  // --- MULTIMEDIA ---
  if (b.type === 'video') {
    return (
      <div className="w-full h-full relative z-10 overflow-hidden" style={{ borderRadius: currentStyles.borderRadius }}>
        {b.src && (b.src.includes('youtube') || b.src.includes('youtu.be') || b.src.includes('vimeo')) ? (
          <iframe className="w-full h-full pointer-events-none" src={getEmbedUrl(b.src)} frameBorder="0" allowFullScreen></iframe>
        ) : <video className="w-full h-full object-cover pointer-events-none" controls src={b.src} />}
        <div className="absolute inset-0 z-20 cursor-pointer" onDoubleClick={onDoubleClick}></div>
      </div>
    );
  }

  if (b.type === 'embed') {
    return (
      <div className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden" style={{ borderRadius: currentStyles.borderRadius }}>
        <style dangerouslySetInnerHTML={{__html: `#block-${b.id} iframe { width: 100%; height: 100%; border: none; pointer-events: none; }`}} />
        <div dangerouslySetInnerHTML={{ __html: b.text || '' }} className="w-full h-full pointer-events-none" />
        <div className="absolute inset-0 z-20 cursor-pointer" onDoubleClick={onDoubleClick}></div>
      </div>
    );
  }

  // 🔥 OBRAZEK + LIGHTBOX (KLIKNIJ ABY POWIĘKSZYĆ) 🔥
  if (b.type === 'img') {
    const isInteractive = isPreviewMode; // Lupa działa tylko na podglądzie/żywo

    const imgContent = (
      <div 
        style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: currentStyles.borderRadius, position: 'relative', zIndex: 10}}
        className={isInteractive ? 'cursor-zoom-in group/lightbox' : ''}
        onClick={(e) => { 
            if (isInteractive) { e.stopPropagation(); setIsLightboxOpen(true); } 
        }}
      >
        <img src={b.src} className="w-full h-full pointer-events-none transition-all duration-500" 
             style={{objectFit: currentStyles.objectFit, objectPosition: `${currentStyles.objectPositionX || 50}% ${currentStyles.objectPositionY || 50}%`, transform: `scale(${currentStyles.imageScale || 1})`}} />
        
        {/* Ikona powiększania pojawiająca się po najechaniu */}
        {isInteractive && (
            <div className="absolute inset-0 bg-black/0 group-hover/lightbox:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/lightbox:opacity-100 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg scale-50 group-hover/lightbox:scale-100 transition-transform duration-300">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
        )}
      </div>
    );

    // Renderowanie Modala nad resztą UI za pomocą Portal
    const lightboxPortal = isLightboxOpen && mounted ? createPortal(
      <div className="fixed inset-0 z-[9999999] bg-[#0a0a0c]/95 backdrop-blur-xl flex items-center justify-center cursor-zoom-out animate-in fade-in duration-200"
           onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}>
         <img src={b.src} className="max-w-[95vw] max-h-[90vh] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg animate-in zoom-in-90 duration-300" />
         <button 
           className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-4 rounded-full transition-all border border-white/10" 
           onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
         >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
         </button>
      </div>,
      document.body
    ) : null;

    return (
      <>
        {imgContent}
        {lightboxPortal}
      </>
    );
  }

  // --- GRAFIKI Z FACTORY ---
  if (b.type === 'graphic') {
    return <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}} dangerouslySetInnerHTML={{ __html: b.text || '' }}></div>;
  }

  if (b.type === 'shape') {
    return <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative', backgroundColor: currentStyles.backgroundColor, borderRadius: currentStyles.borderRadius, border: currentStyles.border}}></div>;
  }

  // --- ELEMENTY TEKSTOWE ---
  const isTextElement = ['h1', 'h2', 'h3', 'p', 'button', 'marquee', 'list', 'faq', 'social', 'alert', 'menu', 'text', 'span'].includes(b.type);
  
  if (isTextElement) {
    const Tag = b.type === 'marquee' ? 'h1' : (['list', 'faq', 'button', 'social', 'alert'].includes(b.type) ? 'div' : (b.type === 'menu' ? 'nav' : b.type));
    const ActualTag = (isPreviewMode && b.type === 'button') ? 'button' : Tag;

    const hasCustomHtml = localText.includes('<style>') || localText.includes('<div') || localText.includes('<ul') || localText.includes('<ol');

    const textStyles: any = { 
      fontSize: currentStyles.fontSize || 'inherit', 
      fontWeight: currentStyles.fontWeight || 'inherit', 
      textAlign: currentStyles.textAlign, 
      lineHeight: currentStyles.lineHeight || 'inherit', 
      letterSpacing: currentStyles.letterSpacing || 'inherit',
      textTransform: currentStyles.textTransform || 'none', 
      margin: 0, 
      wordBreak: 'break-word', 
      outline: 'none', 
      cursor: isEditing ? 'text' : 'inherit', 
      width: '100%', 
      height: '100%', 
      display: 'block', 
      position: 'relative', 
      zIndex: 10
    };

    if (!hasCustomHtml) {
      textStyles.color = currentStyles.color || 'var(--canvas-text)';
      textStyles.textShadow = currentStyles.textShadow || '0 0 1px var(--text-shadow)';
    } else {
      textStyles.color = currentStyles.color || 'inherit';
      textStyles.textShadow = currentStyles.textShadow || 'none';
    }

    if (currentStyles.WebkitBackgroundClip === 'text' || currentStyles.WebkitTextStroke) {
      textStyles.backgroundImage = currentStyles.backgroundImage; 
      textStyles.WebkitBackgroundClip = currentStyles.WebkitBackgroundClip; 
      textStyles.WebkitTextFillColor = currentStyles.WebkitTextFillColor || 'transparent'; 
      textStyles.WebkitTextStroke = currentStyles.WebkitTextStroke;
      textStyles.color = currentStyles.color || 'transparent';
      textStyles.textShadow = 'none'; 
    }

    if (ActualTag === 'button') {
      return (
        <button 
          id={`text-${b.id}`} 
          className="transition-all pointer-events-auto overflow-hidden relative"
          style={{
            ...textStyles,
            backgroundColor: currentStyles.backgroundColor || 'transparent',
            borderRadius: currentStyles.borderRadius || '0px',
            border: currentStyles.border || 'none',
            boxShadow: currentStyles.boxShadow,
            display: currentStyles.display || 'flex',
            alignItems: currentStyles.alignItems || 'center',
            justifyContent: currentStyles.justifyContent || 'center',
            padding: currentStyles.padding,
            width: currentStyles.width || '100%',
          }} 
          type="button" 
          onDoubleClick={onDoubleClick}
        >
          <span 
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onInput={(e: any) => { latestTextRef.current = e.currentTarget.innerHTML; }}
            onBlur={handleBlur}
            dangerouslySetInnerHTML={{ __html: localText }} 
            className="w-full relative z-10" 
          />
        </button>
      );
    }

    return (
      <ActualTag 
        id={`text-${b.id}`} 
        ref={textRef as any} 
        style={textStyles}
        onDoubleClick={onDoubleClick}
        onInput={(e: any) => { latestTextRef.current = e.currentTarget.innerHTML; }}
        onBlur={handleBlur}
        contentEditable={isEditing} 
        suppressContentEditableWarning={true} 
        className={!hasCustomHtml ? "editable-text-field" : ""}
        dangerouslySetInnerHTML={{ __html: localText }} 
      />
    );
  }

  return null;
}