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

  // 🔥 Używamy naszych nowych klocków z blockFactory!
  if (type === 'hero') {
    template = createBlock('section', 'hero', 'Hero Banner');
    template.id = idGen();
    // Nakładamy tylko tło graficzne (resztę robi sam klocek hero)
    template.styles = { 
      ...template.styles, 
      bgType: 'image', 
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', 
      bgOverlay: 'rgba(15,23,42,0.85)' // Ciemny, szlachetny granat
    };
    
    // Nadpisujemy teksty na bardziej chwytliwe pod konkretny szablon
    if (template.children && template.children.length >= 3) {
      template.children[1].text = 'Zdominuj rynek. Zbuduj konwertującą stronę w 5 minut.';
      template.children[1].styles.color = '#ffffff';
      template.children[2].text = 'Zaprojektowane, by zachwycać. Zakodowane, by sprzedawać. Użyj naszego gotowego szablonu i wejdź na nowy poziom biznesu.';
      template.children[2].styles.color = '#cbd5e1';
    }
  } 
  else if (type === 'features') {
    // Używamy gotowej siatki korzyści
    template = createBlock('section', 'features-section', 'Cechy Produktu');
    template.id = idGen();
    template.styles = { ...template.styles, backgroundColor: '#f8fafc' };
  }
  else if (type === 'footer') {
    // Używamy profesjonalnej stopki z newsletterem z blockFactory
    template = createBlock('container', 'footer-newsletter', 'Złożona Stopka');
    template.id = idGen();
  }

  return template;
};