// Oblicza style z uwzględnieniem Desktop / Tablet / Mobile
export const applyRWD = (b: any, viewportState: string) => {
    let s = { ...b.styles };
    
    if (viewportState === 'tablet' || viewportState === 'mobile') {
        if (b.stylesTablet) s = { ...s, ...b.stylesTablet };
    }
    if (viewportState === 'mobile') {
        if (b.stylesMobile) s = { ...s, ...b.stylesMobile };
    }
    
    // Automatyczne, awaryjne poprawki dla mobile, jeśli użytkownik ich nie nadpisał
    if (viewportState === 'mobile') {
      if (s.display === 'grid' && !b.stylesMobile?.gridTemplateColumns) s.gridTemplateColumns = 'minmax(20px, 1fr)';
      if (s.display === 'flex' && s.flexDirection !== 'column' && !b.name?.includes('NAV') && !b.stylesMobile?.flexDirection) {
        s.flexDirection = 'column'; s.alignItems = 'center';
      }
      if (typeof s.width === 'string' && s.width.endsWith('%') && parseFloat(s.width) < 100 && !b.stylesMobile?.width) s.width = '100%';
      if (typeof s.fontSize === 'string' && s.fontSize.endsWith('px') && !b.stylesMobile?.fontSize) {
        const size = parseInt(s.fontSize);
        if (size >= 36) s.fontSize = `${Math.max(28, Math.round(size * 0.65))}px`;
        else if (size > 18) s.fontSize = `${Math.round(size * 0.85)}px`;
      }
      if (typeof s.padding === 'string' && !b.stylesMobile?.padding) {
        if (s.padding === '40px' || s.padding === '60px' || s.padding.includes('60px')) s.padding = '20px';
      }
    }
    
    if (viewportState === 'tablet' && !b.stylesTablet) {
      if (s.display === 'grid' && typeof s.gridTemplateColumns === 'string') {
        if (s.gridTemplateColumns.includes('3') || s.gridTemplateColumns.includes('4')) s.gridTemplateColumns = 'repeat(2, minmax(20px, 1fr))';
      }
      if (typeof s.fontSize === 'string' && s.fontSize.endsWith('px')) {
        const size = parseInt(s.fontSize);
        if (size > 40) s.fontSize = `${Math.max(32, Math.round(size * 0.8))}px`;
      }
    }
    return s;
  };
  
  // Generuje łańcuch znaków CSS dla pseudo-klasy :hover z wymuszeniem !important
  export const buildHoverCSS = (hover: any) => {
    if (!hover || Object.keys(hover).length === 0) return '';
    
    let hoverCSS = '';
    if (hover.backgroundColor) hoverCSS += `background-color: ${hover.backgroundColor} !important; `;
    if (hover.opacity !== undefined && hover.opacity !== '') hoverCSS += `opacity: ${hover.opacity} !important; `;
    if (hover.boxShadow) hoverCSS += `box-shadow: ${hover.boxShadow} !important; `;
    if (hover.borderRadius) hoverCSS += `border-radius: ${hover.borderRadius} !important; `;
    if (hover.width) hoverCSS += `width: ${hover.width} !important; `;
    if (hover.height) hoverCSS += `height: ${hover.height} !important; `;
    if (hover.padding) hoverCSS += `padding: ${hover.padding} !important; `;
    
    let transformCSS = '';
    if (hover.scale) transformCSS += `scale(${hover.scale}) `;
    if (hover.translateY) {
      let val = hover.translateY.toString();
      if (!val.includes('px') && !val.includes('%')) val += 'px';
      transformCSS += `translateY(${val}) `;
    }
    if (transformCSS) hoverCSS += `transform: ${transformCSS} !important; `;
    
    return hoverCSS;
  };
  
  // Parsuje linki do natywnych iframe'ów (YouTube / Vimeo)
  export const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/').split('&')[0];
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    if (url.includes('vimeo.com/')) return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    return url;
  };