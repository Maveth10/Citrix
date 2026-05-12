import React, { useState, useEffect, useRef } from 'react';
import { getEmbedUrl } from '../../utils/styleBuilder';

export default function CanvasElement({ 
  b, currentStyles, isEditing, isPreviewMode, onDoubleClick, updateActiveBlock 
}: any) {
  const [localText, setLocalText] = useState(b.text || '');
  const textRef = useRef<HTMLElement>(null);
  const latestTextRef = useRef(b.text || '');

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

  if (b.type === 'img') {
    return (
      <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius: currentStyles.borderRadius, position: 'relative', zIndex: 10}}>
        <img src={b.src} className="w-full h-full pointer-events-none transition-all duration-500" 
             style={{objectFit: currentStyles.objectFit, objectPosition: `${currentStyles.objectPositionX || 50}% ${currentStyles.objectPositionY || 50}%`, transform: `scale(${currentStyles.imageScale || 1})`}} />
      </div>
    );
  }

  // --- GRAFIKI Z FACTORY (Wykresy, liczniki, itp.) ---
  if (b.type === 'graphic') {
    return <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}} dangerouslySetInnerHTML={{ __html: b.text || '' }}></div>;
  }

  if (b.type === 'shape') {
    return <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative', backgroundColor: currentStyles.backgroundColor, borderRadius: currentStyles.borderRadius, border: currentStyles.border}}></div>;
  }

  // --- ELEMENTY TEKSTOWE I INTERAKTYWNE ---
  // Obsługujemy wszystkie tagi z blockFactory (w tym listy i faqi)
  const isTextElement = ['h1', 'h2', 'h3', 'p', 'button', 'marquee', 'list', 'faq', 'social', 'alert', 'menu', 'text', 'span'].includes(b.type);
  
  if (isTextElement) {
    const Tag = b.type === 'marquee' ? 'h1' : (['list', 'faq', 'button', 'social', 'alert'].includes(b.type) ? 'div' : (b.type === 'menu' ? 'nav' : b.type));
    const ActualTag = (isPreviewMode && b.type === 'button') ? 'button' : Tag;

    // Sprawdzamy, czy w tekście siedzi kod HTML (np. style dla wariantów typu glitch, typewriter).
    // Jeśli tak, musimy uważać, by nie nadpisać tych specyficznych efektów "szarym" cieniem.
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

    // 🔥 LOGIKA KONTRASTU I KOLORÓW 🔥
    // 1. Jeśli element to wariant ze skomplikowanym HTML (glitch, typewriter), zachowujemy oryginalny kolor i ignorujemy cień.
    // 2. Jeśli to zwykły tekst, stosujemy Adaptive Contrast.
    if (!hasCustomHtml) {
      textStyles.color = currentStyles.color || 'var(--canvas-text)';
      textStyles.textShadow = currentStyles.textShadow || '0 0 1px var(--text-shadow)';
    } else {
      textStyles.color = currentStyles.color || 'inherit';
      // Pozostawiamy textShadow jeśli był ręcznie wymuszony w panelu, w przeciwnym razie none
      textStyles.textShadow = currentStyles.textShadow || 'none';
    }

    // Specjalna obsługa gradientów tekstu i wariantów typu "stroke"
    if (currentStyles.WebkitBackgroundClip === 'text' || currentStyles.WebkitTextStroke) {
      textStyles.backgroundImage = currentStyles.backgroundImage; 
      textStyles.WebkitBackgroundClip = currentStyles.WebkitBackgroundClip; 
      textStyles.WebkitTextFillColor = currentStyles.WebkitTextFillColor || 'transparent'; 
      textStyles.WebkitTextStroke = currentStyles.WebkitTextStroke;
      textStyles.color = currentStyles.color || 'transparent';
      textStyles.textShadow = 'none'; // Gradient i stroke gryzą się z cieniem
    }

    // --- BUTTON Z FACTORY ---
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
            className="w-full relative z-10" // Zapewnia, że tekst jest nad ewentualnymi efektami np. btn-shine
          />
        </button>
      );
    }

    // --- ZWYKŁE ZNACZNIKI TEKSTOWE ---
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