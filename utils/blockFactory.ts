export const createBlock = (type: string, variant: string, label: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: any = {
      id: generateId(), type, name: label.toUpperCase(),
      children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
      hoverStyles: {}, entranceAnim: 'none',
      styles: { 
        position: 'relative', left: '0px', top: '0px', display: 'flex', flexDirection: 'column', 
        padding: '20px', margin: '0px', width: '300px', height: 'auto', 
        backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', 
        opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', overflow: 'hidden',
        bgType: 'color', bgImage: '', bgVideo: '', bgOverlay: 'rgba(0,0,0,0)', zIndex: 1
      },
    };
  
    if (type === 'container') {
      if (variant === 'empty') { newBlock.styles.border = '2px dashed #ccc'; newBlock.styles.height = '150px'; }
      if (variant === 'glass') { newBlock.styles.backgroundColor = 'rgba(255, 255, 255, 0.1)'; newBlock.styles.backdropFilter = 'blur(10px)'; newBlock.styles.border = '1px solid rgba(255, 255, 255, 0.2)'; newBlock.styles.borderRadius = '24px'; }
      if (variant === 'neon') { newBlock.styles.backgroundColor = '#000'; newBlock.styles.border = '2px solid #00f2ff'; newBlock.styles.boxShadow = '0 0 15px #00f2ff, inset 0 0 10px #00f2ff'; newBlock.styles.borderRadius = '12px'; }
      if (variant === 'pill') { newBlock.styles.backgroundColor = '#f3f4f6'; newBlock.styles.borderRadius = '999px'; newBlock.styles.height = '80px'; newBlock.styles.width = '400px'; newBlock.styles.padding = '0 40px'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; }
      if (variant === 'shadow-pro') { newBlock.styles.backgroundColor = '#fff'; newBlock.styles.borderRadius = '32px'; newBlock.styles.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'; }
      if (variant === 'text-combo') { newBlock.styles.width = '100%'; newBlock.children = [{id:generateId(), type:'h2', name:'TYTUŁ', text:'Tytuł', styles:{fontSize:'28px', fontWeight:'bold'}}, {id:generateId(), type:'p', name:'AKAPIT', text:'Opis...', styles:{fontSize:'16px'}}]; }
    }
  
    if (type === 'popup') {
      newBlock.styles.position = 'fixed'; newBlock.styles.zIndex = 999;
      if (variant === 'modal' || variant === '') { newBlock.styles.top = '50%'; newBlock.styles.left = '50%'; newBlock.styles.transform = 'translate(-50%, -50%)'; newBlock.styles.width = '400px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.padding = '40px'; newBlock.styles.borderRadius = '20px'; newBlock.styles.boxShadow = '0 0 0 9999px rgba(0,0,0,0.6)'; }
      if (variant === 'toast') { newBlock.styles.bottom = '20px'; newBlock.styles.right = '20px'; newBlock.styles.width = '300px'; newBlock.styles.backgroundColor = '#111'; newBlock.styles.color = '#fff'; newBlock.styles.padding = '20px'; newBlock.styles.borderRadius = '12px'; newBlock.styles.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }
      if (variant === 'banner') { newBlock.styles.bottom = '0px'; newBlock.styles.left = '0px'; newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#3b82f6'; newBlock.styles.color = '#fff'; newBlock.styles.padding = '15px'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; }
    }
  
    // --- LOGIKA LIST I KROKÓW (V15.9) ---
    if (type === 'list') {
      if (variant === 'steps') {
        newBlock.text = '<ol style="padding-left: 20px; list-style-type: decimal; font-size: 20px; font-weight: bold; display: flex; flex-direction: column; gap: 15px; margin: 0;"><li>Krok pierwszy<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Dokładny opis tego, co należy zrobić w pierwszym kroku.</div></li><li>Krok drugi<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Instrukcje do drugiego etapu procesu.</div></li><li>Krok trzeci<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Zakończenie i podsumowanie akcji.</div></li></ol>';
        newBlock.styles.backgroundColor = '#f9fafb';
        newBlock.styles.padding = '30px';
        newBlock.styles.borderRadius = '16px';
        newBlock.styles.width = '100%';
      } else {
        newBlock.text = '<ul style="padding-left: 20px; list-style-type: disc; margin: 0;"><li>Pierwszy punkt</li><li>Drugi punkt</li><li>Trzeci punkt</li></ul>';
        newBlock.styles.fontSize = '16px';
        newBlock.styles.lineHeight = '2';
        newBlock.styles.width = '100%';
      }
    }
  
    if (type === 'faq') { newBlock.text = '▼ Pytanie FAQ<br><br>Odpowiedź.'; newBlock.styles.border = '1px solid #ccc'; newBlock.styles.padding = '15px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.width = '100%'; }
    
    if (type === 'h1') { newBlock.text = 'Nagłówek H1'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; if(variant==='brand'){newBlock.styles.color='#3b82f6'; newBlock.styles.textTransform='uppercase';} }
    if (type === 'h2') { newBlock.text = 'Podtytuł H2'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '700'; }
    if (type === 'p') { newBlock.text = 'Zwykły akapit tekstu.'; newBlock.styles.fontSize = '16px'; }
    if (type === 'ribbon') { newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#facc15'; newBlock.styles.padding = '20px 0'; newBlock.ribbonItems = [{ type: 'text', value: '🔥 WYPRZEDAŻ' }, { type: 'img', value: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' }]; }
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; newBlock.styles.height = '300px'; newBlock.styles.width = '100%'; newBlock.styles.objectFit = 'cover'; newBlock.styles.imageScale = 1; }
    if (type === 'button') { newBlock.text = 'Przycisk'; newBlock.styles.padding = '14px 28px'; newBlock.styles.borderRadius = '8px'; newBlock.styles.backgroundColor = '#000'; newBlock.styles.color = '#fff'; }
    if (type === 'shape') { if(variant==='box'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#3b82f6';} if(variant==='circle'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#ec4899'; newBlock.styles.borderRadius='50%';} }
    if (type === 'section') { newBlock.styles.width = '100%'; newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; if (variant === 'video-hero') { newBlock.styles.bgType = 'video'; newBlock.styles.bgVideo = 'https://cdn.pixabay.com/video/2021/08/11/84687-586745129_large.mp4'; newBlock.styles.bgOverlay = 'rgba(0,0,0,0.5)'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; } }
    if (type === 'carousel') { newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71']; newBlock.styles.height = '400px'; }
    if (type === 'grid' && variant === 'gallery-grid') { newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap = '20px'; }
  
    return newBlock;
  };