export const createBlock = (type: string, variant: string, label: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: any = {
      id: generateId(), type, name: label.toUpperCase(),
      children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
      hoverStyles: {}, entranceAnim: 'none',
      styles: { 
        position: 'relative', left: '0px', top: '0px', display: 'flex', flexDirection: 'column', 
        padding: '20px', margin: '0px', 
        width: '100%', // NAPRAWA V17.5: Zmieniono z twardych 300px na 100%!
        height: 'auto', 
        backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', 
        opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', overflow: 'hidden',
        bgType: 'color', bgImage: '', bgVideo: '', bgOverlay: 'rgba(0,0,0,0)', zIndex: 1
      },
    };
  
    if (type === 'container') {
      if (variant === 'empty') { 
        newBlock.styles.border = '2px dashed #cbd5e1'; 
        newBlock.styles.backgroundColor = '#f8fafc'; 
        newBlock.styles.minHeight = '120px'; 
        newBlock.styles.width = '100%';
        newBlock.styles.borderRadius = '12px';
        newBlock.styles.display = 'flex';
        newBlock.styles.flexDirection = 'column';
        newBlock.styles.gap = '10px';
      }
      if (variant === 'glass') { newBlock.styles.backgroundColor = 'rgba(255, 255, 255, 0.1)'; newBlock.styles.backdropFilter = 'blur(10px)'; newBlock.styles.border = '1px solid rgba(255, 255, 255, 0.2)'; newBlock.styles.borderRadius = '24px'; }
      if (variant === 'neon') { newBlock.styles.backgroundColor = '#000'; newBlock.styles.border = '2px solid #00f2ff'; newBlock.styles.boxShadow = '0 0 15px #00f2ff, inset 0 0 10px #00f2ff'; newBlock.styles.borderRadius = '12px'; }
      if (variant === 'pill') { newBlock.styles.backgroundColor = '#f3f4f6'; newBlock.styles.borderRadius = '999px'; newBlock.styles.height = '80px'; newBlock.styles.width = '400px'; newBlock.styles.padding = '0 40px'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; }
      if (variant === 'shadow-pro') { newBlock.styles.backgroundColor = '#fff'; newBlock.styles.borderRadius = '32px'; newBlock.styles.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'; }
      if (variant === 'text-combo') { newBlock.styles.width = '100%'; newBlock.children = [{id:generateId(), type:'h2', name:'TYTUŁ', text:'Tytuł', styles:{fontSize:'28px', fontWeight:'bold'}}, {id:generateId(), type:'p', name:'AKAPIT', text:'Opis...', styles:{fontSize:'16px'}}]; }
    }
  
    // --- NOWOŚĆ V17.5: CALLOUTY (Powiadomienia) ---
    if (type === 'alert') {
      newBlock.styles.padding = '20px';
      newBlock.styles.borderRadius = '8px';
      newBlock.styles.borderLeft = '6px solid'; // Gruby boczny border
      newBlock.styles.display = 'flex';
      newBlock.styles.alignItems = 'center';
      newBlock.styles.fontSize = '15px';
  
      if (variant === 'success') {
        newBlock.text = '✅ <strong>Sukces!</strong> Wszystkie systemy działają poprawnie.';
        newBlock.styles.backgroundColor = '#ecfdf5';
        newBlock.styles.borderColor = '#10b981';
        newBlock.styles.color = '#065f46';
      }
      if (variant === 'warning') {
        newBlock.text = '⚠️ <strong>Uwaga:</strong> Ta operacja jest nieodwracalna.';
        newBlock.styles.backgroundColor = '#fffbeb';
        newBlock.styles.borderColor = '#f59e0b';
        newBlock.styles.color = '#92400e';
      }
      if (variant === 'tip') {
        newBlock.text = '💡 <strong>Wskazówka:</strong> Kliknij dwukrotnie w obrazek, aby otworzyć Menedżer Mediów.';
        newBlock.styles.backgroundColor = '#eff6ff';
        newBlock.styles.borderColor = '#3b82f6';
        newBlock.styles.color = '#1e3a8a';
      }
    }
  
    if (type === 'popup') {
      newBlock.styles.position = 'fixed'; newBlock.styles.zIndex = 999;
      if (variant === 'modal' || variant === '') { newBlock.styles.top = '50%'; newBlock.styles.left = '50%'; newBlock.styles.transform = 'translate(-50%, -50%)'; newBlock.styles.width = '400px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.padding = '40px'; newBlock.styles.borderRadius = '20px'; newBlock.styles.boxShadow = '0 0 0 9999px rgba(0,0,0,0.6)'; }
      if (variant === 'toast') { newBlock.styles.bottom = '20px'; newBlock.styles.right = '20px'; newBlock.styles.width = '300px'; newBlock.styles.backgroundColor = '#111'; newBlock.styles.color = '#fff'; newBlock.styles.padding = '20px'; newBlock.styles.borderRadius = '12px'; newBlock.styles.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }
      if (variant === 'banner') { newBlock.styles.bottom = '0px'; newBlock.styles.left = '0px'; newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#3b82f6'; newBlock.styles.color = '#fff'; newBlock.styles.padding = '15px'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; }
    }
  
    if (type === 'list') {
      if (variant === 'steps') { newBlock.text = '<ol style="padding-left: 20px; list-style-type: decimal; font-size: 20px; font-weight: bold; display: flex; flex-direction: column; gap: 15px; margin: 0;"><li>Krok pierwszy<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Dokładny opis tego, co należy zrobić w pierwszym kroku.</div></li><li>Krok drugi<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Instrukcje do drugiego etapu procesu.</div></li><li>Krok trzeci<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Zakończenie i podsumowanie akcji.</div></li></ol>'; newBlock.styles.backgroundColor = '#f9fafb'; newBlock.styles.padding = '30px'; newBlock.styles.borderRadius = '16px'; newBlock.styles.width = '100%'; } 
      else { newBlock.text = '<ul style="padding-left: 20px; list-style-type: disc; margin: 0;"><li>Pierwszy punkt</li><li>Drugi punkt</li><li>Trzeci punkt</li></ul>'; newBlock.styles.fontSize = '16px'; newBlock.styles.lineHeight = '2'; newBlock.styles.width = '100%'; }
    }
  
    if (type === 'faq') { newBlock.text = '▼ Pytanie FAQ<br><br>Odpowiedź.'; newBlock.styles.border = '1px solid #ccc'; newBlock.styles.padding = '15px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.width = '100%'; }
    if (type === 'h1') { newBlock.text = 'Nagłówek H1'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; if(variant==='brand'){newBlock.styles.color='#3b82f6'; newBlock.styles.textTransform='uppercase';} }
    if (type === 'h2') { newBlock.text = 'Podtytuł H2'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '700'; }
    if (type === 'p') { newBlock.text = 'Zwykły akapit tekstu.'; newBlock.styles.fontSize = '16px'; }
    if (type === 'ribbon') { newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#facc15'; newBlock.styles.padding = '20px 0'; newBlock.ribbonItems = [{ type: 'text', value: '🔥 WYPRZEDAŻ' }, { type: 'img', value: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' }]; }
    
    if (type === 'img') { 
      newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; 
      newBlock.styles.height = '300px'; newBlock.styles.width = '100%'; newBlock.styles.objectFit = 'cover'; newBlock.styles.imageScale = 1; 
  
      if (variant === 'icon-star') { newBlock.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'; newBlock.styles.width = '64px'; newBlock.styles.height = '64px'; newBlock.styles.objectFit = 'contain'; }
      if (variant === 'icon-heart') { newBlock.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ec4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'; newBlock.styles.width = '64px'; newBlock.styles.height = '64px'; newBlock.styles.objectFit = 'contain'; }
      if (variant === 'sticker-sale') { newBlock.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ef4444"/><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="24" font-family="Arial" font-weight="bold">SALE</text></svg>'; newBlock.styles.width = '120px'; newBlock.styles.height = '120px'; newBlock.styles.objectFit = 'contain'; }
      if (variant === 'sticker-new') { newBlock.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="%2310b981"/><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="20" font-family="Arial" font-weight="bold">NEW!</text></svg>'; newBlock.styles.width = '120px'; newBlock.styles.height = '120px'; newBlock.styles.objectFit = 'contain'; }
      if (variant === 'vector-chart') { newBlock.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="50" width="20" height="40" fill="%233b82f6" rx="4"/><rect x="40" y="30" width="20" height="60" fill="%238b5cf6" rx="4"/><rect x="70" y="10" width="20" height="80" fill="%236366f1" rx="4"/></svg>'; newBlock.styles.width = '150px'; newBlock.styles.height = '150px'; newBlock.styles.objectFit = 'contain'; }
    }
  
    if (type === 'button') { 
      newBlock.text = 'Przycisk'; 
      newBlock.styles.padding = '14px 28px'; 
      newBlock.styles.borderRadius = '8px'; 
      newBlock.styles.backgroundColor = '#000'; 
      newBlock.styles.color = '#fff'; 
      newBlock.styles.width = 'max-content'; // Przycisk nie rozciąga się na całą stronę
    }
    
    if (type === 'shape') { if(variant==='box'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#3b82f6';} if(variant==='circle'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#ec4899'; newBlock.styles.borderRadius='50%';} }
    if (type === 'section') { newBlock.styles.width = '100%'; newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; if (variant === 'video-hero') { newBlock.styles.bgType = 'video'; newBlock.styles.bgVideo = 'https://cdn.pixabay.com/video/2021/08/11/84687-586745129_large.mp4'; newBlock.styles.bgOverlay = 'rgba(0,0,0,0.5)'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; } }
    if (type === 'carousel') { newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71']; newBlock.styles.height = '400px'; }
    if (type === 'grid' && variant === 'gallery-grid') { newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap = '20px'; }
  
    return newBlock;
  };