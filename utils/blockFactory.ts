export const createBlock = (type: string, variant: string, label: string) => {
    const generateId = () => Math.floor(Math.random() * 10000000);
    
    let newBlock: any = {
      id: generateId(), type, name: label.toUpperCase(),
      children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
      hoverStyles: {}, entranceAnim: 'none',
      styles: { 
        position: 'relative', left: '0px', top: '0px', display: 'flex', flexDirection: 'column', 
        padding: '10px', margin: '0px', width: '300px', height: 'auto', 
        backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', 
        opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', overflow: 'hidden',
        bgType: 'color', bgImage: '', bgVideo: '', bgOverlay: 'rgba(0,0,0,0)',
        filterBlur: 0, filterBrightness: 100, filterContrast: 100, mixBlendMode: 'normal', textShadow: 'none'
      },
    };
  
    if (type === 'h1') { newBlock.text = 'Nagłówek H1'; newBlock.styles.fontSize = '48px'; newBlock.styles.fontWeight = '900'; if(variant==='brand'){newBlock.styles.color='#3b82f6'; newBlock.styles.textTransform='uppercase'; newBlock.styles.letterSpacing='-1px';} if(variant==='logo'){newBlock.text='LOGO™'; newBlock.styles.letterSpacing='2px'; newBlock.styles.width='fit-content';} }
    if (type === 'h2') { newBlock.text = 'Podtytuł H2'; newBlock.styles.fontSize = '32px'; newBlock.styles.fontWeight = '700'; if(variant==='brand'){newBlock.styles.borderBottom='3px solid #3b82f6'; newBlock.styles.width='fit-content';} }
    if (type === 'p') { newBlock.text = 'Zwykły akapit tekstu. Możesz edytować.'; newBlock.styles.fontSize = '16px'; if(variant==='brand'){newBlock.styles.fontStyle='italic'; newBlock.styles.borderLeft='4px solid #3b82f6'; newBlock.styles.paddingLeft='15px';} }
    if (type === 'ribbon') { newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#facc15'; newBlock.styles.color = '#000'; newBlock.styles.padding = '20px 0'; newBlock.styles.fontSize = '24px'; newBlock.styles.fontWeight = '900'; newBlock.styles.display = 'block'; newBlock.ribbonItems = [{ type: 'text', value: '🔥 GORĄCA WYPRZEDAŻ' }, { type: 'img', value: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' }, { type: 'text', value: '-50% NA WSZYSTKO' }]; }
    if (type === 'faq') { newBlock.text = '▼ Pytanie FAQ<br><br>Odpowiedź na to pytanie.'; newBlock.styles.border = '1px solid #ccc'; newBlock.styles.padding = '15px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.width = '100%'; }
    if (type === 'list') { newBlock.text = '• Pierwszy<br>• Drugi<br>• Trzeci'; newBlock.styles.fontSize = '16px'; newBlock.styles.lineHeight = '2'; }
    
    if (type === 'section') { newBlock.styles.width = '100%'; newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.padding = '40px'; if (variant === 'video-hero') { newBlock.styles.bgType = 'video'; newBlock.styles.bgVideo = 'https://cdn.pixabay.com/video/2021/08/11/84687-586745129_large.mp4'; newBlock.styles.bgOverlay = 'rgba(0,0,0,0.5)'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; newBlock.children = [{id:generateId(), type:'h1', name:'TYTUŁ HERO', text:'Przyszłość', styles:{fontSize:'64px', fontWeight:'900', color:'#fff', textAlign:'center', margin:'0'}}, {id:generateId(), type:'p', name:'SUBTYTUŁ', text:'Tło wideo z przyciemnieniem.', styles:{fontSize:'20px', color:'#ccc', textAlign:'center'}}]; } }
    if (type === 'container' && variant === 'text-combo') { newBlock.styles.gap='10px'; newBlock.styles.width='100%'; newBlock.children = [{id:generateId(), type:'h2', name:'TYTUŁ', text:'Tytuł', styles:{fontSize:'28px', fontWeight:'bold'}}, {id:generateId(), type:'p', name:'AKAPIT', text:'Opis...', styles:{fontSize:'16px'}}] }
    if (type === 'container' && variant === 'empty') { newBlock.styles.minHeight = '150px'; newBlock.styles.border = '2px dashed #ccc'; newBlock.styles.width = '100%'; }
    if (type === 'container' && variant === 'designed') { newBlock.styles.minHeight = '200px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.borderRadius = '16px'; newBlock.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; newBlock.styles.padding = '30px'; newBlock.styles.width = '100%'; }
    
    if (type === 'img') { newBlock.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'; newBlock.styles.height = '300px'; newBlock.styles.width = '100%'; newBlock.styles.objectFit = 'cover'; newBlock.styles.imageScale = 1; newBlock.styles.objectPositionX = 50; newBlock.styles.objectPositionY = 50; if(variant==='site'){newBlock.styles.height='500px';} if(variant==='transparent'||variant==='illustration'){newBlock.src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'; newBlock.styles.objectFit='contain'; newBlock.styles.height='200px'; newBlock.styles.width='200px';} if(variant==='photo'){newBlock.styles.border='8px solid #fff'; newBlock.styles.boxShadow='0 10px 20px rgba(0,0,0,0.15)';} }
    if (type === 'button') { newBlock.text = variant==='share' ? '🔗 Udostępnij' : 'Przycisk'; newBlock.styles.padding = '14px 28px'; newBlock.styles.borderRadius = '8px'; newBlock.styles.width = 'fit-content'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; newBlock.styles.fontWeight = 'bold'; newBlock.hoverStyles = { transform: 'scale(1.05)' }; if (!variant) { newBlock.styles.backgroundColor = '#000'; newBlock.styles.color = '#fff'; } if (variant === 'outline') { newBlock.styles.backgroundColor = 'transparent'; newBlock.styles.color = '#000'; newBlock.styles.border = '2px solid #000'; } if (variant === 'gradient') { newBlock.styles.backgroundColor = 'transparent'; newBlock.styles.bgType = 'image'; newBlock.styles.bgImage = 'linear-gradient(135deg, #f43f5e, #8b5cf6)'; newBlock.styles.color = '#fff'; } }
    if (type === 'shape') { if(variant==='box'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#3b82f6';} if(variant==='line'){newBlock.styles.width='100%'; newBlock.styles.height='2px'; newBlock.styles.backgroundColor='#ccc';} }
    
    if (type === 'social') { newBlock.text = '📘 📸 🐦'; newBlock.styles.fontSize = '24px'; newBlock.styles.letterSpacing = '10px'; newBlock.styles.width='fit-content'; }
    if (type === 'video') { newBlock.videoId = 'dQw4w9WgXcQ'; newBlock.styles.width='100%'; newBlock.styles.height = '400px'; if(variant==='social'){newBlock.styles.width='300px'; newBlock.styles.height='530px'; newBlock.styles.borderRadius='16px';} }
    if (type === 'form') { newBlock.styles.backgroundColor='#fff'; newBlock.styles.padding='30px'; newBlock.styles.borderRadius='12px'; newBlock.styles.boxShadow='0 10px 20px rgba(0,0,0,0.05)'; newBlock.styles.width = '100%'; }
    if (type === 'input') { newBlock.name = 'email'; newBlock.text = 'Adres e-mail'; newBlock.styles.padding = '14px 16px'; newBlock.styles.border = '1px solid #e5e7eb'; newBlock.styles.borderRadius = '8px'; newBlock.styles.backgroundColor = '#f9fafb'; }
    if (type === 'textarea') { newBlock.name = 'message'; newBlock.text = 'Twoja wiadomość...'; newBlock.styles.padding = '14px 16px'; newBlock.styles.border = '1px solid #e5e7eb'; newBlock.styles.borderRadius = '8px'; newBlock.styles.height = '120px'; }
    if (type === 'map') { newBlock.src = 'https://maps.google.com/maps?q=Warszawa&t=&z=13&ie=UTF8&iwloc=&output=embed'; newBlock.styles.height='300px'; newBlock.styles.width='100%'; }
    if (type === 'embed') { newBlock.src = variant==='site' ? 'https://pl.wikipedia.org' : ''; newBlock.text = variant==='html' ? '<button style="padding:10px; background:red; color:white;">HTML</button>' : ''; newBlock.styles.height='300px'; newBlock.styles.width='100%'; newBlock.styles.backgroundColor = variant==='html' ? '#111' : 'transparent'; newBlock.styles.color = '#0f0'; }
    if (type === 'menu') { newBlock.text = 'HOME | O NAS | KONTAKT'; newBlock.styles.fontWeight='bold'; newBlock.styles.width = '100%'; if(variant==='vertical'){newBlock.styles.width='200px'; newBlock.text='HOME<br><br>O NAS<br><br>KONTAKT';} if(variant==='hamburger'){newBlock.text='☰'; newBlock.styles.fontSize='32px'; newBlock.styles.width='fit-content';} }
    if (type === 'popup') { newBlock.styles.position='fixed'; newBlock.styles.top='50%'; newBlock.styles.left='50%'; newBlock.styles.transform='translate(-50%, -50%)'; newBlock.styles.width='400px'; newBlock.styles.backgroundColor='#fff'; newBlock.styles.padding='40px'; newBlock.styles.borderRadius='20px'; newBlock.styles.boxShadow='0 0 0 9999px rgba(0,0,0,0.5)'; newBlock.styles.zIndex='999'; }
  
    if (type === 'carousel') { newBlock.images = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', 'https://images.unsplash.com/photo-1555421689-491a97ff2040']; newBlock.styles.height = '400px'; newBlock.styles.width='100%'; newBlock.styles.overflow = 'hidden'; }
    if (type === 'grid' && variant === 'gallery-grid') {
      newBlock.name = 'SIATKA ZDJĘĆ PRO'; newBlock.styles.width = '100%'; newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap = '20px';
      const makeProImg = (src: string) => ({ id: generateId(), type: 'img', name: 'KAFELEK', src, styles: { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', imgHoverZoom: true, imgGrayscale: true } });
      newBlock.children = [ makeProImg('https://images.unsplash.com/photo-1551288049-bebda4e38f71'), makeProImg('https://images.unsplash.com/photo-1542744173-8e7e53415bb0'), makeProImg('https://images.unsplash.com/photo-1555421689-491a97ff2040') ];
    }
    if (type === 'grid' && variant === 'insta') { newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap='5px'; newBlock.styles.width='100%'; newBlock.children = [{id:generateId(), type:'img', name:'Post', src:'https://images.unsplash.com/photo-1523275335684-37898b6baf30', styles:{width:'100%', aspectRatio:'1/1', objectFit:'cover'}}]; }
  
    return newBlock;
  };