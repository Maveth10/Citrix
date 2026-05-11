// Generuje parametry animacji na podstawie ustawień bloku
export const getAnimationStyles = (b: any, isVisible: boolean, isPreviewMode: boolean) => {
    if (!isPreviewMode || !b.entranceAnim || b.entranceAnim === 'none') {
      return { 
        opacity: isVisible ? (b.styles.opacity ?? 1) : 0, 
        transform: b.styles.transform || 'none', 
        animation: 'none' 
      };
    }
  
    const duration = b.animDuration || 0.8;
    const delay = b.animDelay || 0;
  
    let animation = 'none';
    if (isVisible) {
      if (b.entranceAnim === 'fade-in') animation = `fadeIn ${duration}s ease-out ${delay}s forwards`;
      if (b.entranceAnim === 'slide-up') animation = `slideUp ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`;
      if (b.entranceAnim === 'slide-down') animation = `slideDown ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`;
      if (b.entranceAnim === 'slide-left') animation = `slideLeft ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`;
      if (b.entranceAnim === 'slide-right') animation = `slideRight ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`;
      if (b.entranceAnim === 'zoom-in') animation = `zoomIn ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`;
    }
  
    // Ustawienie początkowe (zanim element wjedzie)
    let initialTransform = 'none';
    if (!isVisible) {
      if (b.entranceAnim === 'slide-up') initialTransform = 'translateY(40px)';
      if (b.entranceAnim === 'slide-down') initialTransform = 'translateY(-40px)';
      if (b.entranceAnim === 'slide-left') initialTransform = 'translateX(40px)';
      if (b.entranceAnim === 'slide-right') initialTransform = 'translateX(-40px)';
      if (b.entranceAnim === 'zoom-in') initialTransform = 'scale(0.95)';
    }
  
    return {
      opacity: isVisible ? (b.styles.opacity ?? 1) : 0,
      transform: isVisible ? (b.styles.transform || 'none') : initialTransform,
      animation: animation,
      visibility: isVisible ? 'visible' : 'hidden'
    };
  };
  
  // Zwraca kluczowe klatki (Keyframes), które wstrzykniemy na płótno
  export const getGlobalKeyframes = () => `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideLeft { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideRight { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  `;