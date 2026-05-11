import { FactoryContext } from '../blockFactory';

export const buildSection = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = '100%'; 
  block.styles.minHeight = '400px'; 
  block.styles.backgroundColor = '#ffffff'; 
  block.styles.clearRow = true; 
  
  if (variant === 'video-hero') { 
    block.name = 'SEKCJA KINOWA'; block.styles.minHeight = '600px'; block.styles.bgType = 'video'; block.styles.bgVideo = 'https://cdn.pixabay.com/video/2021/08/11/84687-586745129_large.mp4'; block.styles.bgOverlay = 'rgba(0,0,0,0.5)'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'center'; 
    block.children = [{ id: ctx.generateId(), type: 'h1', name: 'NAGŁÓWEK', text: 'KINO NA TWOJEJ STRONIE', styles: { color: '#ffffff', fontSize: '64px', fontWeight: '900', textAlign: 'center' } }]; 
  } 
  else if (variant === 'hero') {
    block.name = 'HERO SECTION'; block.styles.minHeight = '80vh'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'center'; block.styles.padding = '100px 20px'; block.styles.textAlign = 'center'; block.styles.gap = '24px';
    const badge = ctx.createBlock('p', 'badge', 'Badge');
    const title = ctx.createBlock('h1', 'gradient', 'Hero Tytuł'); title.text = 'Zbuduj to szybciej.'; title.styles.textAlign = 'center'; title.styles.margin = '0';
    const desc = ctx.createBlock('p', 'lead', 'Opis'); desc.text = 'Najlepsze narzędzie do tworzenia nowoczesnych stron internetowych w mgnieniu oka.'; desc.styles.textAlign = 'center'; desc.styles.maxWidth = '600px';
    const btnRow = ctx.createBlock('container', 'empty', 'Przyciski'); btnRow.styles.flexDirection = 'row'; btnRow.styles.justifyContent = 'center'; btnRow.styles.gap = '16px'; btnRow.styles.minHeight = 'auto'; btnRow.styles.padding = '0'; btnRow.styles.border = 'none'; btnRow.styles.backgroundColor = 'transparent';
    const btn1 = ctx.createBlock('button', 'btn-shine', 'Start'); btn1.text = 'Rozpocznij za darmo';
    const btn2 = ctx.createBlock('button', 'outline', 'Demo'); btn2.text = 'Zobacz Demo';
    btnRow.children = [btn1, btn2];
    block.children = [badge, title, desc, btnRow];
  }
  else if (variant === 'features-section') {
    block.name = 'SEKCJA CECH'; block.styles.padding = '80px 20px'; block.styles.alignItems = 'center'; block.styles.gap = '40px';
    const header = ctx.createBlock('h2', 'classic', 'Tytuł Sekcji'); header.text = 'Dlaczego warto nas wybrać?'; header.styles.textAlign = 'center';
    const grid = ctx.createBlock('grid', 'grid-3', 'Siatka Cech'); grid.styles.width = '100%'; grid.styles.maxWidth = '1200px';

    const createFeature = (iconTxt: string, titleTxt: string, descTxt: string) => {
       const card = ctx.createBlock('container', 'shadow-pro', 'Cecha'); card.styles.alignItems = 'flex-start'; card.styles.padding = '30px'; card.styles.gap = '12px';
       const icon = ctx.createBlock('p', 'classic', 'Ikona'); icon.text = iconTxt; icon.styles.fontSize = '32px'; icon.styles.margin = '0';
       const title = ctx.createBlock('h2', 'classic', 'Tytuł'); title.text = titleTxt; title.styles.fontSize = '20px'; title.styles.margin = '0';
       const desc = ctx.createBlock('p', 'classic', 'Opis'); desc.text = descTxt; desc.styles.fontSize = '14px'; desc.styles.color = '#64748b'; desc.styles.margin = '0';
       card.children = [icon, title, desc]; return card;
    };
    grid.children = [
       createFeature('⚡', 'Szybkość działania', 'Zoptymalizowany kod zapewnia błyskawiczne ładowanie na każdym urządzeniu.'),
       createFeature('🔒', 'Bezpieczeństwo', 'Twoje dane są u nas w pełni bezpieczne dzięki zaawansowanemu szyfrowaniu.'),
       createFeature('🎨', 'Piękny Design', 'Zaprojektowane z dbałością o każdy detal, by zachwycać użytkowników.')
    ];
    block.children = [header, grid];
  }
  else if (variant === 'device-guide') {
    block.name = 'INTERAKTYWNY PRZEWODNIK'; block.styles.width = '100%'; block.styles.height = '1000px'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent';
    const widgetHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <style>
        :root { --c1: #3b82f6; --c2: #f8fafc; --c3: #ffffff; --c4: #f1f5f9; --c5: #f8fafc; --c6: #ffffff; --c7: #000; --c8: #0f172a; --c9: #334155; --c10: #ffffff; --c11: #e2e8f0; --c12: #3b82f6; --c13: #10b981; --c14: #ef4444; --c15: #3b82f6; --c16: #ffffff; --c17: #e2e8f0; --c18: #64748b; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background: transparent; overflow-x: hidden; padding: 20px; color: var(--c9); }
        .main-config-container { max-width: 1000px; margin: auto; background: var(--c3); border: 1px solid var(--c11); border-radius: 16px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); overflow: hidden; }
        .device-header { text-align: center; padding: 30px 0 15px 0; background: var(--c3); }
        .device-header h2 { font-size: 22px; font-weight: 800; color: var(--c8); text-transform: uppercase; letter-spacing: 2px; border-bottom: 3px solid var(--c1); display: inline-block; padding-bottom: 5px; }
        .carousel-wrapper { width: 100%; height: 380px; display: flex; align-items: center; justify-content: center; position: relative; border-bottom: 1px solid var(--c11); background: var(--c6); }
        .carousel-content { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow:hidden; }
        .slide { position: absolute; width: 45%; height: 300px; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; z-index: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
        .slide img { max-width: 100%; max-height: 85%; object-fit: contain; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.12)); transition: transform 0.3s ease; border-radius: 12px; }
        .slide.prev-slide { transform: translateX(-70%) scale(0.6); opacity: 0.3; z-index: 1; pointer-events: auto; cursor: pointer; }
        .slide.active-slide { transform: translateX(0) scale(1); opacity: 1; z-index: 2; pointer-events: auto; }
        .slide.next-slide { transform: translateX(70%) scale(0.6); opacity: 0.3; z-index: 1; pointer-events: auto; cursor: pointer; }
        .nav-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: var(--c3); border: 1px solid var(--c11); color: var(--c9); border-radius: 50%; cursor: pointer; z-index: 100; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-weight:bold; }
        .nav-btn:hover { background: var(--c8); color: var(--c3); }
        .caption { margin-top: 15px; font-weight: 700; color: var(--c8); font-size: 14px; background: var(--c17); padding: 6px 16px; border-radius: 20px; opacity: 0; transition: 0.3s; }
        .active-slide .caption { opacity: 1; }
        .guide-container { display: flex; min-height: 480px; }
        .steps-sidebar { width: 35%; background: var(--c4); border-right: 1px solid var(--c11); }
        .step-item { padding: 24px 20px; cursor: pointer; border-bottom: 1px solid var(--c11); display: flex; align-items: flex-start; background: var(--c5); border-left: 4px solid transparent; border-top: none; border-right: none; width: 100%; text-align: left; transition: 0.2s; }
        .step-item:hover { background: var(--c3); }
        .step-item.active { background: var(--c3); border-left: 4px solid var(--c1); }
        .badge { background: var(--c17); color: var(--c18); min-width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; margin-right: 15px; }
        .active .badge { background: var(--c1); color: var(--c10); }
        .step-label { font-size: 15px; font-weight: 700; color: var(--c8); line-height: 1.4; margin-top: 3px;}
        .content-viewer { width: 65%; padding: 30px; display: flex; flex-direction: column; }
        .media-box { width: 100%; background: var(--c7); border-radius: 12px; overflow: hidden; aspect-ratio: 16 / 9; position: relative; border: 1px solid var(--c11); }
        .media-box iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .text-box { margin-top: 20px; }
        .text-box h3 { font-size: 20px; margin-bottom: 12px; color: var(--c8); font-weight: 800;}
        .text-box p { font-size: 15px; color: var(--c9); line-height: 1.6; }
        .text-box ul { margin-left: 20px; font-size: 14.5px; color: var(--c9); margin-top: 10px; line-height:1.6;}
        .highlight { color: var(--c1); font-weight: 700; } 
        .download-btn { display: inline-flex; background: var(--c8); color: var(--c16); padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 700; margin-top: 15px; }
        .tab-content { display: none; animation: fadeIn 0.4s ease; }
        .tab-content.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform:translateY(10px); } to { opacity: 1; transform:translateY(0); } }
        @media (max-width: 768px) { .guide-container { flex-direction: column; } .steps-sidebar { width: 100%; display: flex; overflow-x: auto; } .step-item { min-width: 160px; } .content-viewer { width: 100%; } }
      </style>
      </head>
      <body>
      <div class="main-config-container">
        <div class="device-header"><h2>Smart Router Pro</h2></div>
        <div class="carousel-wrapper">
          <div class="nav-btn" id="btn-left" style="left:20px">❮</div>
          <div class="carousel-content">
            <div class="slide"><img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"><div class="caption">Widok Ogólny</div></div>
            <div class="slide"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"><div class="caption">Bezpieczeństwo</div></div>
            <div class="slide"><img src="https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80"><div class="caption">Wysoka Wydajność</div></div>
          </div>
          <div class="nav-btn" id="btn-right" style="right:20px">❯</div>
        </div>
        <div class="guide-container">
          <div class="steps-sidebar">
            <button class="step-item active" onclick="openStep(event, 'step1')"><span class="badge">1</span><span class="step-label">Pierwsze logowanie</span></button>
            <button class="step-item" onclick="openStep(event, 'step2')"><span class="badge">2</span><span class="step-label">Aktualizacja systemu</span></button>
            <button class="step-item" onclick="openStep(event, 'step3')"><span class="badge">3</span><span class="step-label">Konfiguracja</span></button>
          </div>
          <div class="content-viewer">
            <div id="step1" class="tab-content active">
              <div class="media-box"><iframe src="https://www.youtube.com/embed/8NJiggA11M4?autoplay=0&mute=1&controls=1" allowfullscreen></iframe></div>
              <div class="text-box"><h3>1. Dostęp do panelu</h3><p>Podłącz urządzenie kablem LAN.</p><ul><li>Adres: <span class="highlight">192.168.1.1</span></li><li>Hasło: <span class="highlight">admin123</span></li></ul></div>
            </div>
            <div id="step2" class="tab-content">
              <div class="media-box"><iframe src="https://www.youtube.com/embed/8X6F5JMbrcU?autoplay=0&mute=1" allowfullscreen></iframe></div>
              <div class="text-box"><h3>2. Pobieranie softu</h3><p>Przejdź do System → Firmware i pobierz łatkę.</p><a href="#" class="download-btn">Pobierz Firmware</a></div>
            </div>
            <div id="step3" class="tab-content">
              <div class="media-box"><iframe src="https://www.youtube.com/embed/qmViQs-w-Vw?autoplay=0&mute=1" allowfullscreen></iframe></div>
              <div class="text-box"><h3>3. Wgrywanie ustawień</h3><p>Przywróć konfigurację z pliku zapasowego.</p></div>
            </div>
          </div>
        </div>
      </div>
      <script>
        const slides = document.querySelectorAll('.slide');
        let currentIndex = 0;
        function updateSlides() {
          slides.forEach((slide, i) => {
            slide.classList.remove('active-slide', 'prev-slide', 'next-slide');
            if (i === currentIndex) slide.classList.add('active-slide');
            else if (i === (currentIndex - 1 + slides.length) % slides.length) slide.classList.add('prev-slide');
            else if (i === (currentIndex + 1) % slides.length) slide.classList.add('next-slide');
          });
        }
        document.getElementById('btn-right').addEventListener('click', () => { currentIndex = (currentIndex + 1) % slides.length; updateSlides(); });
        document.getElementById('btn-left').addEventListener('click', () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateSlides(); });
        updateSlides();

        window.openStep = function(evt, stepId) {
          document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.step-item').forEach(s => s.classList.remove('active'));
          document.getElementById(stepId).classList.add('active');
          evt.currentTarget.classList.add('active');
        };
      </script>
      </body>
      </html>
    `;
    block.text = `<iframe style="width: 100%; height: 100%; border: none;" srcdoc="${widgetHTML.replace(/"/g, '&quot;')}"></iframe>`;
  }

  return block;
};