import React from 'react';
import { createBlock } from './blockFactory';

export const CATEGORIES = [
  { id: 'szablony', label: 'Szablony' }, 
  { id: 'storage', label: 'Zapis/Odczyt' }, 
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

export const renderCategoryIcon = (id: string) => {
  const iconProps = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch(id) {
    case 'szablony': return <svg {...iconProps}><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>;
    case 'storage': return <svg {...iconProps}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
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

export const generateTemplate = (type: string) => {
  const idGen = () => Date.now() + Math.floor(Math.random() * 100000);
  let template: any = null;

  if (type === 'hero') {
    template = createBlock('section', '', 'Hero Banner');
    template.id = idGen();
    template.styles = { ...template.styles, minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgType: 'image', bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', bgOverlay: 'rgba(0,0,0,0.6)', padding: '60px 20px' };
    
    const title = createBlock('h1', 'h1', 'Główny Nagłówek');
    title.id = idGen() + 1;
    title.text = 'Zbuduj coś niesamowitego';
    title.styles = { ...title.styles, fontSize: '48px', fontWeight: 'bold', textAlign: 'center', color: '#ffffff', marginBottom: '15px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' };

    const subtitle = createBlock('p', 'p', 'Opis');
    subtitle.id = idGen() + 2;
    subtitle.text = 'Oto gotowy szablon sekcji hero. Zmień tło, dostosuj napisy i ciesz się efektem w kilka sekund.';
    subtitle.styles = { ...subtitle.styles, fontSize: '18px', textAlign: 'center', color: '#e0e0e0', marginBottom: '30px' };

    const btn = createBlock('button', 'primary', 'Przycisk Akcji');
    btn.id = idGen() + 3;
    btn.text = 'Rozpocznij teraz';
    btn.styles = { ...btn.styles, padding: '16px 36px', backgroundColor: '#ff4500', color: '#ffffff', borderRadius: '8px', fontWeight: 'bold', border: 'none', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(255, 69, 0, 0.3)' };

    template.children = [title, subtitle, btn];
  } 
  else if (type === 'features') {
    template = createBlock('section', '', 'Sekcja Kart');
    template.id = idGen();
    template.styles = { ...template.styles, minHeight: '200px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', padding: '80px 30px', backgroundColor: '#f4f4f4', alignItems: 'stretch' };
    
    const cards = [1, 2, 3].map((num, i) => {
      const card = createBlock('container', 'empty', `Karta Funkcji ${num}`);
      card.id = idGen() + i + 10;
      card.styles = { ...card.styles, width: 'calc(33.333% - 13.33px)', backgroundColor: '#ffffff', borderRadius: '16px', padding: '35px 25px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '150px' };
      
      const title = createBlock('h2', 'h2', 'Tytuł');
      title.id = idGen() + i + 20;
      title.text = `Funkcja ${num}`;
      title.styles = { ...title.styles, fontSize: '22px', fontWeight: 'bold', color: '#111111', marginBottom: '10px' };

      const desc = createBlock('p', 'p', 'Opis');
      desc.id = idGen() + i + 30;
      desc.text = 'Podmień ten tekst, aby opisać najważniejsze zalety Twojego produktu lub usługi. Kolumny same dopasują się do zawartości.';
      desc.styles = { ...desc.styles, fontSize: '14px', color: '#666666', lineHeight: '1.6' };

      card.children = [title, desc];
      return card;
    });
    template.children = cards;
  }
  else if (type === 'footer') {
    template = createBlock('section', '', 'Stopka');
    template.id = idGen();
    template.styles = { ...template.styles, minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#0a0a0a', color: '#ffffff' };
    
    const text = createBlock('p', 'p', 'Copyright');
    text.id = idGen() + 1;
    text.text = '© 2024 Vyrai Builder. Wszelkie prawa zastrzeżone.';
    text.styles = { ...text.styles, fontSize: '12px', color: '#666666', textAlign: 'center', letterSpacing: '1px' };

    template.children = [text];
  }

  return template;
};