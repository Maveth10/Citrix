import React, { useState, useEffect, useRef } from 'react';
import { getEmbedUrl } from '../../utils/styleBuilder'; // <-- Dodane ../

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

  if (b.type === 'graphic') {
    return <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}} dangerouslySetInnerHTML={{ __html: b.text || '' }}></div>;
  }

  if (b.type === 'shape') {
    return <div style={{width:'100%', height:'100%', zIndex: 10, position: 'relative'}}></div>;
  }

  const isTextElement = ['h1', 'h2', 'h3', 'p', 'button', 'marquee', 'list', 'faq', 'social', 'alert', 'menu'].includes(b.type);
  
  if (isTextElement) {
    const Tag = b.type === 'marquee' ? 'h1' : (['list', 'faq', 'button', 'social', 'alert'].includes(b.type) ? 'div' : (b.type === 'menu' ? 'nav' : b.type));
    const ActualTag = (isPreviewMode && b.type === 'button') ? 'button' : Tag;

    const textStyles: any = { 
      fontSize: currentStyles.fontSize || 'inherit', fontWeight: currentStyles.fontWeight || 'inherit', color: currentStyles.color || 'inherit', 
      textAlign: currentStyles.textAlign, lineHeight: currentStyles.lineHeight || 'inherit', letterSpacing: currentStyles.letterSpacing || 'inherit',
      textTransform: currentStyles.textTransform || 'none', margin: 0, wordBreak:'break-word', outline: 'none', 
      cursor: isEditing ? 'text' : 'inherit', textShadow: currentStyles.textShadow, 
      width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 10
    };

    if (currentStyles.WebkitBackgroundClip === 'text') {
      textStyles.backgroundImage = currentStyles.backgroundImage; textStyles.WebkitBackgroundClip = 'text'; textStyles.WebkitTextFillColor = 'transparent'; textStyles.color = 'transparent';
    }

    if (ActualTag === 'button') {
      return (
        <button id={`text-${b.id}`} style={textStyles} type="submit" onDoubleClick={onDoubleClick}>
          <span dangerouslySetInnerHTML={{ __html: localText }} />
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
        dangerouslySetInnerHTML={{ __html: localText }} 
      />
    );
  }

  return null;
}