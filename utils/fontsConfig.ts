// utils/fontsConfig.ts

export const GOOGLE_FONTS = [
    "Inter", 
    "Roboto", 
    "Open Sans", 
    "Montserrat", 
    "Playfair Display",
    "Lato", 
    "Poppins", 
    "Oswald", 
    "Raleway", 
    "Nunito", 
    "Ubuntu", 
    "Bebas Neue",
    "Cinzel",
    "Pacifico",
    "Dancing Script",
    "Space Mono"
  ];
  
  // Funkcja, która dynamicznie wstrzykuje font do przeglądarki, jeśli jeszcze go nie ma!
  export const loadGoogleFont = (fontName: string) => {
    if (typeof window === 'undefined' || !fontName || fontName === 'inherit') return;
    
    const fontId = `font-${fontName.replace(/\s+/g, '-')}`;
    if (document.getElementById(fontId)) return; // Blokujemy wielokrotne pobieranie tego samego fontu
  
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    // Ładujemy od razu różne grubości i kursywę
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap`;
    document.head.appendChild(link);
  };