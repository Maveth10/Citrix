'use client';

import React, { useEffect, useState } from 'react';
import { GOOGLE_FONTS, loadGoogleFont } from '../utils/fontsConfig';

interface TextFormatToolbarProps {
  activeBlock: any;
  updateActiveBlock: (updates: any) => void;
  isEditing?: boolean; // Dodane dla pełnej kompatybilności
}

export default function TextFormatToolbar({ activeBlock, updateActiveBlock }: TextFormatToolbarProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // Nasłuchujemy zaznaczania tekstu przez użytkownika
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      
      // Jeśli nie ma zaznaczenia lub to tylko kliknięcie (kursor) - ukrywamy pasek
      if (!selection || selection.isCollapsed || !activeBlock) {
        setShow(false);
        return;
      }

      // Upewniamy się, że zaznaczony tekst jest wewnątrz aktywnego bloku
      let node = selection.anchorNode;
      let isInsideActive = false;
      while (node) {
        if (node.nodeType === 1 && (node as Element).id === `block-${activeBlock.id}`) {
          isInsideActive = true;
          break;
        }
        node = node.parentNode;
      }

      if (isInsideActive && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Obliczamy środek zaznaczonego tekstu i pozycjonujemy pasek lekko ponad nim
        setPos({
          top: rect.top - 55, 
          left: rect.left + rect.width / 2
        });
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    window.addEventListener('scroll', handleSelection);
    window.addEventListener('resize', handleSelection);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
      window.removeEventListener('scroll', handleSelection);
      window.removeEventListener('resize', handleSelection);
    };
  }, [activeBlock]);

  if (!show || !activeBlock) return null;

  // Wykonanie formatowania (używamy document.execCommand - standardu Rich Text)
  const applyFormat = (e: React.MouseEvent | React.FormEvent<HTMLInputElement>, cmd: string, val?: string) => {
    e.preventDefault(); // Krytyczne: Zapobiega utracie zaznaczenia tekstu po kliknięciu w przycisk!
    
    if (cmd === 'createLink') {
      const url = prompt('Podaj adres URL (np. https://google.com):');
      if (url) document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, val);
    }
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    if (font) loadGoogleFont(font);
    updateActiveBlock({ styles: { ...activeBlock.styles, fontFamily: font } });
  };

  return (
    <div 
      className="fixed z-[9999999] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex items-center p-1.5 backdrop-blur-xl animate-in zoom-in-95 duration-200 -translate-x-1/2"
      style={{ top: pos.top, left: pos.left }}
    >
      {/* SELEKTOR CZCIONEK */}
      <select
        value={activeBlock.styles?.fontFamily || ''}
        onChange={handleFontFamilyChange}
        onMouseDown={(e) => e.preventDefault()} // Zabezpieczenie przed utratą focusu!
        className="bg-black/40 text-white text-xs py-1.5 px-2 rounded-lg border border-white/10 outline-none hover:border-[#ff4500] cursor-pointer appearance-none mr-1 shadow-inner focus:ring-1 focus:ring-[#ff4500] max-w-[120px]"
      >
        <option value="">Domyślny Font</option>
        {GOOGLE_FONTS.map(font => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>

      <div className="w-px h-5 bg-white/20 mx-1"></div>

      <button onMouseDown={(e) => applyFormat(e, 'bold')} className="p-2 hover:bg-white/10 rounded text-white transition-colors" title="Pogrubienie (Ctrl+B)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
      </button>
      
      <button onMouseDown={(e) => applyFormat(e, 'italic')} className="p-2 hover:bg-white/10 rounded text-white transition-colors" title="Kursywa (Ctrl+I)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
      </button>
      
      <button onMouseDown={(e) => applyFormat(e, 'underline')} className="p-2 hover:bg-white/10 rounded text-white transition-colors" title="Podkreślenie (Ctrl+U)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
      </button>

      <button onMouseDown={(e) => applyFormat(e, 'strikeThrough')} className="p-2 hover:bg-white/10 rounded text-white transition-colors" title="Przekreślenie">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
      </button>

      <div className="w-px h-5 bg-white/20 mx-1"></div>

      <button onMouseDown={(e) => applyFormat(e, 'createLink')} className="p-2 hover:bg-[#ff4500]/20 rounded text-[#ff4500] transition-colors" title="Wstaw Link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>

      <div className="w-px h-5 bg-white/20 mx-1"></div>

      {/* Kolor tekstu */}
      <label onMouseDown={(e) => e.preventDefault()} className="relative p-2 hover:bg-white/10 rounded cursor-pointer flex items-center justify-center transition-colors" title="Kolor tekstu">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20"/></svg>
        <input 
          type="color" 
          className="absolute opacity-0 w-0 h-0 cursor-pointer" 
          onInput={(e) => applyFormat(e, 'foreColor', e.currentTarget.value)} 
        />
      </label>

      {/* Kolor tła zaznaczenia */}
      <label onMouseDown={(e) => e.preventDefault()} className="relative p-2 hover:bg-white/10 rounded cursor-pointer flex items-center justify-center transition-colors" title="Podświetlenie (Tło)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l-6 6v3h9l3-3"/><path d="M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>
        <input 
          type="color" 
          className="absolute opacity-0 w-0 h-0 cursor-pointer" 
          onInput={(e) => applyFormat(e, 'backColor', e.currentTarget.value)} 
        />
      </label>

      <div className="w-px h-5 bg-white/20 mx-1"></div>

      {/* Usuwanie formatowania */}
      <button onMouseDown={(e) => applyFormat(e, 'removeFormat')} className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors" title="Wyczyść formatowanie">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

    </div>
  );
}