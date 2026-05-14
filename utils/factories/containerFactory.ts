import { FactoryContext } from '../blockFactory';

export const buildContainer = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000);

  block.styles.width = '100%';
  block.styles.display = 'flex';
  block.styles.flexDirection = 'column';
  block.styles.gap = '20px';
  
  if (variant === 'empty') { 
    block.styles.border = '2px dashed color-mix(in srgb, var(--canvas-text) 20%, transparent)'; 
    block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 2%, transparent)'; 
    block.styles.minHeight = '120px'; 
    block.styles.width = '100%'; 
    block.styles.borderRadius = '12px'; 
    block.styles.display = 'flex'; 
    block.styles.flexDirection = 'column'; 
    block.styles.gap = '10px'; 
    block.styles.padding = '20px';
  }
  else if (variant === 'glass') { 
    block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 2%, transparent)'; 
    block.styles.backdropFilter = 'blur(24px) saturate(180%)'; 
    block.styles.WebkitBackdropFilter = 'blur(24px) saturate(180%)';
    block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; 
    block.styles.borderRadius = '24px'; 
    block.styles.padding = '30px';
    block.styles.boxShadow = 'inset 0 1px 1px color-mix(in srgb, var(--canvas-text) 15%, transparent), 0 20px 40px rgba(0,0,0,0.1)';
  }
  else if (variant === 'neon') { 
    block.styles.backgroundColor = '#000'; 
    block.styles.border = '1px solid var(--theme-color, #00f2ff)'; 
    block.styles.boxShadow = '0 0 30px color-mix(in srgb, var(--theme-color) 40%, transparent), inset 0 0 15px color-mix(in srgb, var(--theme-color) 40%, transparent)'; 
    block.styles.borderRadius = '16px'; 
    block.styles.padding = '30px';
  }
  else if (variant === 'pill') { 
    block.styles.backgroundColor = 'var(--canvas-text)'; 
    block.styles.borderRadius = '999px'; 
    block.styles.height = '80px'; 
    block.styles.width = '400px'; 
    block.styles.padding = '0 40px'; 
    block.styles.alignItems = 'center'; 
    block.styles.justifyContent = 'center'; 
  }
  else if (variant === 'shadow-pro') { 
    block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 5%, transparent)'; 
    block.styles.borderRadius = '32px'; 
    block.styles.boxShadow = '0 30px 60px -15px rgba(0, 0, 0, 0.3)'; 
    block.styles.padding = '40px';
    block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 5%, transparent)';
  }
  else if (variant === 'text-combo') { 
    block.styles.width = '100%'; 
    block.children = [
      {id:ctx.generateId(), type:'p', name:'ETYKIETA', text:'UPDATE 2.0', styles:{fontSize:'12px', fontWeight:'900', color:'var(--theme-color)', letterSpacing:'0.2em', textTransform:'uppercase', margin:'0 0 10px 0', clearRow: true}}, 
      {id:ctx.generateId(), type:'h2', name:'TYTUŁ', text:'Czysta Architektura', styles:{fontSize:'42px', fontWeight:'900', letterSpacing:'-0.03em', lineHeight:'1.1', color:'var(--canvas-text)', margin:'0 0 15px 0', clearRow: true}}, 
      {id:ctx.generateId(), type:'p', name:'AKAPIT', text:'Odkryj nowy wymiar projektowania przestrzennego.', styles:{fontSize:'18px', color:'var(--canvas-text)', opacity:'0.6', lineHeight:'1.6', clearRow: true}}
    ]; 
  }
  
  // ==========================================
  // 🔥 NAWIGACJE I STOPKI
  // ==========================================
  else if (variant === 'nav-classic') { 
    block.name = 'NAVBAR'; block.styles.display = 'flex'; block.styles.flexDirection = 'row'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'space-between'; block.styles.padding = '20px 40px'; block.styles.backgroundColor = 'transparent'; block.styles.borderBottom = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.width = '100%'; 
    const logo = ctx.createBlock('h2', 'brand', 'Logo'); logo.text = 'LOGO'; logo.styles.fontSize = '24px'; logo.styles.fontWeight = '900'; logo.styles.margin = '0'; logo.styles.color = 'var(--canvas-text)'; logo.styles.borderBottom = 'none'; 
    const links = ctx.createBlock('container', 'empty', 'Linki'); links.styles.display = 'flex'; links.styles.flexDirection = 'row'; links.styles.gap = '40px'; links.styles.backgroundColor = 'transparent'; links.styles.padding = '0'; links.styles.minHeight = 'auto'; links.styles.width = 'auto'; links.styles.border = 'none'; 
    const l1 = ctx.createBlock('p', 'classic', 'Link'); l1.text = 'O nas'; l1.styles.margin = '0'; l1.styles.fontWeight = '600'; l1.styles.cursor = 'pointer'; l1.styles.color = 'var(--canvas-text)';
    const l2 = ctx.createBlock('p', 'classic', 'Link'); l2.text = 'Usługi'; l2.styles.margin = '0'; l2.styles.fontWeight = '600'; l2.styles.cursor = 'pointer'; l2.styles.color = 'var(--canvas-text)';
    const l3 = ctx.createBlock('p', 'classic', 'Link'); l3.text = 'Kontakt'; l3.styles.margin = '0'; l3.styles.fontWeight = '600'; l3.styles.cursor = 'pointer'; l3.styles.color = 'var(--canvas-text)';
    links.children = [l1, l2, l3]; 
    const btn = ctx.createBlock('button', 'classic', 'Akcja'); btn.text = 'Rozpocznij'; 
    block.children = [logo, links, btn]; 
  }
  else if (variant === 'nav-pill') { 
    block.name = 'FLOATING NAV'; block.styles.display = 'flex'; block.styles.flexDirection = 'row'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'space-between'; block.styles.padding = '10px 20px'; block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 3%, transparent)'; block.styles.backdropFilter = 'blur(24px) saturate(180%)'; block.styles.WebkitBackdropFilter = 'blur(24px) saturate(180%)'; block.styles.borderRadius = '999px'; block.styles.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; block.styles.width = '90%'; block.styles.margin = '20px auto'; block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; 
    const logo = ctx.createBlock('h2', 'brand', 'Logo'); logo.text = 'LOGO'; logo.styles.fontSize = '20px'; logo.styles.margin = '0'; logo.styles.color = 'var(--canvas-text)'; logo.styles.borderBottom = 'none'; 
    const links = ctx.createBlock('container', 'empty', 'Linki'); links.styles.display = 'flex'; links.styles.flexDirection = 'row'; links.styles.gap = '30px'; links.styles.backgroundColor = 'transparent'; links.styles.padding = '0'; links.styles.minHeight = 'auto'; links.styles.width = 'auto'; links.styles.border = 'none'; 
    const l1 = ctx.createBlock('p', 'classic', 'Link'); l1.text = 'Home'; l1.styles.margin = '0'; l1.styles.fontWeight = '600'; l1.styles.color = 'var(--canvas-text)'; l1.styles.cursor = 'pointer'; 
    const l2 = ctx.createBlock('p', 'classic', 'Link'); l2.text = 'Cennik'; l2.styles.margin = '0'; l2.styles.fontWeight = '600'; l2.styles.color = 'var(--canvas-text)'; l2.styles.cursor = 'pointer'; 
    links.children = [l1, l2]; 
    const btn = ctx.createBlock('button', 'pill', 'Akcja'); btn.text = 'Zaloguj'; btn.styles.padding = '10px 24px'; 
    block.children = [logo, links, btn]; 
  }
  else if (variant === 'nav-mega') {
    block.name = 'MEGA MENU'; block.styles.display = 'flex'; block.styles.flexDirection = 'row'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'space-between'; block.styles.padding = '20px 40px'; block.styles.backgroundColor = 'transparent'; block.styles.borderBottom = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.width = '100%'; block.styles.position = 'relative';
    const logo = ctx.createBlock('h2', 'brand', 'Logo'); logo.text = 'MEGA.'; logo.styles.fontSize = '24px'; logo.styles.fontWeight = '900'; logo.styles.margin = '0'; logo.styles.color = 'var(--canvas-text)'; logo.styles.borderBottom = 'none';
    const links = ctx.createBlock('container', 'empty', 'Nawigacja'); links.styles.display = 'flex'; links.styles.flexDirection = 'row'; links.styles.gap = '40px'; links.styles.padding = '0'; links.styles.border = 'none'; links.styles.backgroundColor = 'transparent'; links.styles.minHeight = 'auto'; links.styles.alignItems = 'center';
    links.text = `<style>.mega-parent-${rnd} { position: relative; cursor: pointer; padding: 20px 0; font-weight: 600; color: var(--canvas-text); } .mega-menu-${rnd} { position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(10px); background: color-mix(in srgb, var(--canvas-text) 5%, var(--canvas-bg, #000)); backdrop-filter: blur(24px); width: 600px; padding: 30px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.3); border: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent); display: grid; grid-template-columns: 1fr 1fr; gap: 30px; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 100; pointer-events: none; } .mega-parent-${rnd}:hover .mega-menu-${rnd} { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; } .mega-col-${rnd} { display: flex; flex-direction: column; gap: 15px; } .mega-title-${rnd} { font-size: 11px; font-weight: 900; color: var(--theme-color); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; } .mega-link-${rnd} { display: flex; align-items: flex-start; gap: 16px; text-decoration: none; padding: 12px; border-radius: 12px; transition: background 0.2s; color: var(--canvas-text); } .mega-link-${rnd}:hover { background: color-mix(in srgb, var(--canvas-text) 5%, transparent); } .mega-link-icon-${rnd} { font-size: 24px; filter: drop-shadow(0 0 8px color-mix(in srgb, var(--theme-color) 40%, transparent)); } .mega-link-text-${rnd} h4 { margin: 0; font-size: 14px; font-weight: 700; color: var(--canvas-text); } .mega-link-text-${rnd} p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.6; line-height: 1.4; }</style><div style="display:flex; gap:40px; align-items:center;"><div style="font-weight: 600; color: var(--canvas-text); opacity: 0.8; cursor: pointer;">Strona Główna</div><div class="mega-parent-${rnd}">Produkty ▾<div class="mega-menu-${rnd}"><div class="mega-col-${rnd}"><div class="mega-title-${rnd}">Dla Biznesu</div><a href="#" class="mega-link-${rnd}"><div class="mega-link-icon-${rnd}">🚀</div><div class="mega-link-text-${rnd}"><h4>Platforma SaaS</h4><p>Kompleksowe rozwiązanie dla Twojej firmy.</p></div></a><a href="#" class="mega-link-${rnd}"><div class="mega-link-icon-${rnd}">📊</div><div class="mega-link-text-${rnd}"><h4>Analityka AI</h4><p>Podejmuj decyzje na podstawie danych.</p></div></a></div><div class="mega-col-${rnd}"><div class="mega-title-${rnd}">Zasoby</div><a href="#" class="mega-link-${rnd}"><div class="mega-link-icon-${rnd}">📚</div><div class="mega-link-text-${rnd}"><h4>Baza Wiedzy</h4><p>Dokumentacja i poradniki wideo.</p></div></a><a href="#" class="mega-link-${rnd}"><div class="mega-link-icon-${rnd}">💬</div><div class="mega-link-text-${rnd}"><h4>Społeczność</h4><p>Dołącz do forum naszych użytkowników.</p></div></a></div></div></div><div style="font-weight: 600; color: var(--canvas-text); opacity: 0.8; cursor: pointer;">Cennik</div></div>`;
    const btn = ctx.createBlock('button', 'apple', 'Akcja'); btn.text = 'Rozpocznij';
    block.children = [logo, links, btn];
  }
  else if (variant === 'footer-columns' || variant === 'footer-pro') { 
    block.name = 'FOOTER PRO'; block.styles.display = 'grid'; block.styles.gridTemplateColumns = '2fr 1fr 1fr 1fr'; block.styles.gap = '40px'; block.styles.padding = '80px 40px'; block.styles.backgroundColor = 'transparent'; block.styles.borderTop = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.width = '100%'; 
    const col1 = ctx.createBlock('container', 'empty', 'Kolumna'); col1.styles.border = 'none'; col1.styles.backgroundColor = 'transparent'; col1.styles.padding = '0'; col1.styles.gap = '15px'; 
    const logo = ctx.createBlock('h2', 'classic', 'Logo'); logo.text = 'FIRMA.'; logo.styles.color = 'var(--canvas-text)'; logo.styles.fontWeight = '900'; logo.styles.margin = '0'; 
    const desc = ctx.createBlock('p', 'classic', 'Opis'); desc.text = 'Tworzymy najlepsze rozwiązania dla Twojego biznesu.'; desc.styles.color = 'var(--canvas-text)'; desc.styles.opacity = '0.6'; desc.styles.margin = '0'; 
    col1.children = [logo, desc]; 
    const col2 = ctx.createBlock('container', 'empty', 'Kolumna'); col2.styles.border = 'none'; col2.styles.backgroundColor = 'transparent'; col2.styles.padding = '0'; col2.styles.gap = '16px'; 
    const hProduct = ctx.createBlock('p', 'eyebrow', 'Nagłówek'); hProduct.text = 'PRODUKT'; hProduct.styles.color = 'var(--canvas-text)'; hProduct.styles.fontWeight = '800'; hProduct.styles.margin = '0'; 
    const l1 = ctx.createBlock('p', 'classic', 'Link'); l1.text = 'Funkcje'; l1.styles.color = 'var(--canvas-text)'; l1.styles.opacity = '0.6'; l1.styles.margin = '0'; 
    const l2 = ctx.createBlock('p', 'classic', 'Link'); l2.text = 'Cennik'; l2.styles.color = 'var(--canvas-text)'; l2.styles.opacity = '0.6'; l2.styles.margin = '0'; 
    col2.children = [hProduct, l1, l2]; 
    const col3 = ctx.createBlock('container', 'empty', 'Kolumna'); col3.styles.border = 'none'; col3.styles.backgroundColor = 'transparent'; col3.styles.padding = '0'; col3.styles.gap = '16px'; 
    const hCompany = ctx.createBlock('p', 'eyebrow', 'Nagłówek'); hCompany.text = 'FIRMA'; hCompany.styles.color = 'var(--canvas-text)'; hCompany.styles.fontWeight = '800'; hCompany.styles.margin = '0'; 
    const l3 = ctx.createBlock('p', 'classic', 'Link'); l3.text = 'O nas'; l3.styles.color = 'var(--canvas-text)'; l3.styles.opacity = '0.6'; l3.styles.margin = '0'; 
    const l4 = ctx.createBlock('p', 'classic', 'Link'); l4.text = 'Kariera'; l4.styles.color = 'var(--canvas-text)'; l4.styles.opacity = '0.6'; l4.styles.margin = '0'; 
    col3.children = [hCompany, l3, l4]; 
    const col4 = ctx.createBlock('container', 'empty', 'Kolumna'); col4.styles.border = 'none'; col4.styles.backgroundColor = 'transparent'; col4.styles.padding = '0'; col4.styles.gap = '16px'; 
    const hLegal = ctx.createBlock('p', 'eyebrow', 'Nagłówek'); hLegal.text = 'PRAWNE'; hLegal.styles.color = 'var(--canvas-text)'; hLegal.styles.fontWeight = '800'; hLegal.styles.margin = '0'; 
    const l5 = ctx.createBlock('p', 'classic', 'Link'); l5.text = 'Prywatność'; l5.styles.color = 'var(--canvas-text)'; l5.styles.opacity = '0.6'; l5.styles.margin = '0'; 
    const l6 = ctx.createBlock('p', 'classic', 'Link'); l6.text = 'Regulamin'; l6.styles.color = 'var(--canvas-text)'; l6.styles.opacity = '0.6'; l6.styles.margin = '0'; 
    col4.children = [hLegal, l5, l6]; 
    block.children = [col1, col2, col3, col4]; 
  }
  else if (variant === 'footer-newsletter') {
    block.name = 'FOOTER NEWSLETTER'; block.styles.display = 'flex'; block.styles.flexDirection = 'column'; block.styles.alignItems = 'center'; block.styles.padding = '80px 20px 40px 20px'; block.styles.backgroundColor = 'transparent'; block.styles.borderTop = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.gap = '40px';
    const topPart = ctx.createBlock('container', 'empty', 'Newsletter Box'); topPart.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 3%, transparent)'; topPart.styles.borderRadius = '32px'; topPart.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; topPart.styles.padding = '60px'; topPart.styles.width = '100%'; topPart.styles.maxWidth = '1000px'; topPart.styles.flexDirection = 'row'; topPart.styles.alignItems = 'center'; topPart.styles.justifyContent = 'space-between'; topPart.styles.gap = '30px';
    const textCol = ctx.createBlock('container', 'empty', 'Text'); textCol.styles.padding = '0'; textCol.styles.backgroundColor = 'transparent'; textCol.styles.border = 'none';
    const h2 = ctx.createBlock('h2', 'classic', 'Nagłówek'); h2.text = 'Zapisz się do newslettera'; h2.styles.color = 'var(--canvas-text)'; h2.styles.fontWeight = '900'; h2.styles.margin = '0 0 10px 0';
    const p = ctx.createBlock('p', 'classic', 'Opis'); p.text = 'Otrzymuj najnowsze informacje o produkcie prosto na skrzynkę.'; p.styles.color = 'var(--canvas-text)'; p.styles.opacity = '0.6'; p.styles.margin = '0';
    textCol.children = [h2, p];
    const form = ctx.createBlock('form', 'waitlist', 'Formularz');
    topPart.children = [textCol, form];
    const bottomPart = ctx.createBlock('container', 'empty', 'Linki'); bottomPart.styles.flexDirection = 'row'; bottomPart.styles.justifyContent = 'space-between'; bottomPart.styles.width = '100%'; bottomPart.styles.maxWidth = '1000px'; bottomPart.styles.padding = '0'; bottomPart.styles.backgroundColor = 'transparent'; bottomPart.styles.border = 'none';
    const logo = ctx.createBlock('h2', 'brand', 'Logo'); logo.text = 'FIRMA.'; logo.styles.margin = '0'; logo.styles.fontWeight = '900'; logo.styles.color = 'var(--canvas-text)';
    const copy = ctx.createBlock('p', 'classic', 'Copyright'); copy.text = '© 2050 Wszelkie prawa zastrzeżone.'; copy.styles.color = 'var(--canvas-text)'; copy.styles.opacity = '0.5'; copy.styles.fontSize = '14px';
    bottomPart.children = [logo, copy];
    block.children = [topPart, bottomPart];
  }

  // ==========================================
  // 🔥 SYSTEM ALERTÓW & MICRO UI
  // ==========================================
  else if (['alert-success', 'alert-warning', 'alert-tip', 'notice-box', 'alert-cosmos'].includes(variant)) { 
    block.styles.position = 'relative'; block.styles.width = '450px'; block.styles.maxWidth = '100%'; block.styles.borderRadius = '16px'; block.styles.padding = '24px 30px'; block.styles.marginTop = '25px'; block.styles.overflow = 'visible'; block.styles.display = 'flex'; block.styles.flexDirection = 'column'; block.styles.gap = '10px';
    const badgeId = ctx.generateId(); const textId = ctx.generateId(); 
    let badgeText = ''; let mainColor = '';
    if (variant === 'alert-success') { badgeText = 'SUKCES'; mainColor = '#10b981'; } else if (variant === 'alert-warning') { badgeText = 'UWAGA'; mainColor = '#f59e0b'; } else if (variant === 'alert-tip') { badgeText = 'WSKAZÓWKA'; mainColor = '#3b82f6'; } else if (variant === 'notice-box') { badgeText = 'CRITICAL NOTICE'; mainColor = '#ef4444'; } else if (variant === 'alert-cosmos') { badgeText = 'ANOMALY DETECTED'; mainColor = '#a855f7'; }
    block.styles.backgroundColor = `color-mix(in srgb, ${mainColor} 10%, transparent)`; block.styles.border = `1px solid color-mix(in srgb, ${mainColor} 30%, transparent)`; block.styles.boxShadow = `inset 4px 0 0 ${mainColor}, 0 20px 40px rgba(0,0,0,0.1)`; block.styles.backdropFilter = 'blur(12px)';
    if(variant === 'alert-cosmos') { block.text = `<style>@keyframes neonPulse_${rnd} { 0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.2), inset 0 0 15px rgba(168, 85, 247, 0.1); } 50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.5), inset 0 0 30px rgba(168, 85, 247, 0.3); } } #block-${block.id} { animation: neonPulse_${rnd} 2s infinite alternate; } #block-${badgeId} { background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6) !important; background-size: 200% 200% !important; animation: gradientFlow_${rnd} 3s ease infinite !important; } @keyframes gradientFlow_${rnd} { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }</style>`; }
    block.children = [ { id: badgeId, type: 'h2', name: 'PLAKIETKA', text: badgeText, styles: { position: 'absolute', top: '0px', left: '30px', transform: 'translateY(-50%)', backgroundColor: mainColor, color: '#ffffff', padding: '6px 16px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '8px', zIndex: 50, width: 'max-content', whiteSpace: 'nowrap', boxShadow: `0 4px 10px color-mix(in srgb, ${mainColor} 60%, transparent)`, clearRow: false } }, { id: textId, type: 'p', name: 'TREŚĆ', text: variant === 'alert-success' ? 'Wszystkie węzły danych zsynchronizowane.' : variant === 'alert-warning' ? 'Wykryto niestabilność napięcia. Zalecana kopia.' : variant === 'alert-tip' ? 'Kliknij dwukrotnie by rozpocząć edycję wizualną.' : variant === 'alert-cosmos' ? '<strong style="color: var(--canvas-text); font-size: 18px; display: block; margin-bottom: 6px;">Rozdarcie Osnowy</strong>System odnotował fluktuacje na poziomie horyzontu zdarzeń.' : 'Dostęp do tego sektora wymaga weryfikacji biometrycznej klasy 4.', styles: { color: 'var(--canvas-text)', fontWeight: '500', fontSize: '15px', lineHeight: '1.6', margin: 0, width: '100%', clearRow: true } } ]; 
  }
  else if (variant === 'review-classic') {
    block.name = 'RECENZJA PRO'; block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 2%, transparent)'; block.styles.borderRadius = '24px'; block.styles.padding = '40px'; block.styles.boxShadow = '0 20px 40px rgba(0,0,0,0.05)'; block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.gap = '20px'; block.styles.maxWidth = '450px';
    const stars = ctx.createBlock('p', 'classic', 'Gwiazdki'); stars.text = '★★★★★'; stars.styles.margin = '0'; stars.styles.fontSize = '24px'; stars.styles.color = 'var(--theme-color, #fbbf24)';
    const quote = ctx.createBlock('p', 'classic', 'Cytat'); quote.text = '"To narzędzie zmieniło sposób, w jaki pracujemy. Interfejs jest z innej planety, a responsywność przewyższa wszystko, co widziałem."'; quote.styles.fontStyle = 'italic'; quote.styles.color = 'var(--canvas-text)'; quote.styles.opacity = '0.9'; quote.styles.margin = '0'; quote.styles.lineHeight = '1.6'; quote.styles.fontSize = '18px';
    const authorRow = ctx.createBlock('container', 'empty', 'Autor'); authorRow.styles.flexDirection = 'row'; authorRow.styles.alignItems = 'center'; authorRow.styles.gap = '16px'; authorRow.styles.padding = '0'; authorRow.styles.border = 'none'; authorRow.styles.backgroundColor = 'transparent';
    const avatar = ctx.createBlock('img', 'avatar', 'Avatar'); avatar.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'; avatar.styles.width = '56px'; avatar.styles.height = '56px';
    const authorInfo = ctx.createBlock('container', 'empty', 'Info'); authorInfo.styles.padding = '0'; authorInfo.styles.border = 'none'; authorInfo.styles.backgroundColor = 'transparent'; authorInfo.styles.gap = '4px';
    const name = ctx.createBlock('p', 'classic', 'Imię'); name.text = 'Anna Nowak'; name.styles.fontWeight = '800'; name.styles.margin = '0'; name.styles.fontSize = '16px'; name.styles.color = 'var(--canvas-text)';
    const role = ctx.createBlock('p', 'classic', 'Stanowisko'); role.text = 'CEO, Visionary AI'; role.styles.margin = '0'; role.styles.fontSize = '13px'; role.styles.color = 'var(--canvas-text)'; role.styles.opacity = '0.6';
    authorInfo.children = [name, role]; authorRow.children = [avatar, authorInfo]; block.children = [stars, quote, authorRow];
  }
  else if (variant === 'tweet-card') {
    block.name = 'TWEET CARD'; block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 2%, transparent)'; block.styles.borderRadius = '24px'; block.styles.padding = '30px'; block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.gap = '20px'; block.styles.maxWidth = '450px'; block.styles.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
    const topRow = ctx.createBlock('container', 'empty', 'Header'); topRow.styles.flexDirection = 'row'; topRow.styles.alignItems = 'center'; topRow.styles.justifyContent = 'space-between'; topRow.styles.padding = '0'; topRow.styles.border = 'none'; topRow.styles.backgroundColor = 'transparent';
    const userRow = ctx.createBlock('container', 'empty', 'User'); userRow.styles.flexDirection = 'row'; userRow.styles.alignItems = 'center'; userRow.styles.gap = '16px'; userRow.styles.padding = '0'; userRow.styles.border = 'none'; userRow.styles.backgroundColor = 'transparent';
    const avatar = ctx.createBlock('img', 'avatar', 'Avatar'); avatar.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'; avatar.styles.width = '56px'; avatar.styles.height = '56px';
    const userInfo = ctx.createBlock('container', 'empty', 'Info'); userInfo.styles.padding = '0'; userInfo.styles.border = 'none'; userInfo.styles.backgroundColor = 'transparent'; userInfo.styles.gap = '0';
    const name = ctx.createBlock('p', 'classic', 'Imię'); name.text = 'Michał Kowalski'; name.styles.fontWeight = '800'; name.styles.margin = '0'; name.styles.fontSize = '16px'; name.styles.color = 'var(--canvas-text)';
    const handle = ctx.createBlock('p', 'classic', 'Handle'); handle.text = '@michalkowalski'; handle.styles.margin = '0'; handle.styles.fontSize = '14px'; handle.styles.color = 'var(--canvas-text)'; handle.styles.opacity = '0.5';
    userInfo.children = [name, handle]; userRow.children = [avatar, userInfo];
    const twitterLogo = ctx.createBlock('p', 'classic', 'X Logo'); twitterLogo.text = '𝕏'; twitterLogo.styles.margin = '0'; twitterLogo.styles.fontSize = '24px'; twitterLogo.styles.color = 'var(--canvas-text)';
    topRow.children = [userRow, twitterLogo];
    const tweetBody = ctx.createBlock('p', 'classic', 'Treść'); tweetBody.text = 'Właśnie przetestowałem to narzędzie i jestem w szoku! 🤯 Moja produktywność wzrosła o 200%. Nie wyobrażam sobie już powrotu do starych metod. Gorąco polecam wszystkim twórcom! 🔥👇'; tweetBody.styles.margin = '0'; tweetBody.styles.fontSize = '16px'; tweetBody.styles.color = 'var(--canvas-text)'; tweetBody.styles.lineHeight = '1.6'; tweetBody.styles.opacity = '0.9';
    const bottomRow = ctx.createBlock('p', 'classic', 'Data'); bottomRow.text = '10:47 AM · 11 Maj 2050'; bottomRow.styles.margin = '0'; bottomRow.styles.fontSize = '14px'; bottomRow.styles.color = 'var(--canvas-text)'; bottomRow.styles.opacity = '0.5';
    block.children = [topRow, tweetBody, bottomRow];
  }
  else if (variant === 'avatar-stack') {
    block.name = 'AVATAR STACK'; block.styles.flexDirection = 'row'; block.styles.alignItems = 'center'; block.styles.gap = '16px'; block.styles.padding = '10px'; block.styles.backgroundColor = 'transparent'; block.styles.border = 'none'; block.styles.width = 'max-content';
    block.text = `<style>.avatar-stack-${rnd} { display: flex; flex-direction: row; } .avatar-stack-${rnd} img { width: 48px; height: 48px; border-radius: 50%; border: 4px solid var(--canvas-bg, #000); object-fit: cover; transition: 0.3s; cursor: pointer; } .avatar-stack-${rnd} img:not(:first-child) { margin-left: -20px; } .avatar-stack-${rnd} img:hover { transform: translateY(-5px) scale(1.1); z-index: 10; border-color: var(--theme-color); }</style><div style="display:flex; align-items:center; gap:20px;"><div class="avatar-stack-${rnd}"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"/><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"/><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"/><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"/></div><div style="display:flex; flex-direction:column; gap:4px;"><div style="display:flex; color:var(--theme-color, #f59e0b); font-size:16px;">★★★★★</div><span style="font-size:14px; font-weight:800; color:var(--canvas-text);">Zaufało nam +10,000 osób</span></div></div>`;
  }
  else if (variant === 'logo-cloud') {
    block.name = 'LOGO CLOUD'; block.styles.flexDirection = 'column'; block.styles.alignItems = 'center'; block.styles.gap = '30px'; block.styles.padding = '60px 20px'; block.styles.backgroundColor = 'transparent'; block.styles.border = 'none';
    block.text = `<div style="font-size: 12px; font-weight: 800; color: var(--canvas-text); opacity: 0.5; text-transform: uppercase; letter-spacing: 3px;">Pionierzy, którzy nam zaufali</div><div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 60px; align-items: center; opacity: 0.6; filter: grayscale(100%) contrast(2); transition: 0.5s;"><svg height="30" viewBox="0 0 100 30" fill="var(--canvas-text)"><text x="0" y="22" font-size="24" font-weight="900" font-family="sans-serif">ACME Corp</text></svg><svg height="30" viewBox="0 0 100 30" fill="var(--canvas-text)"><text x="0" y="22" font-size="24" font-weight="900" font-family="sans-serif">Globex</text></svg><svg height="30" viewBox="0 0 100 30" fill="var(--canvas-text)"><text x="0" y="22" font-size="24" font-weight="900" font-family="sans-serif">Soylent</text></svg><svg height="30" viewBox="0 0 100 30" fill="var(--canvas-text)"><text x="0" y="22" font-size="24" font-weight="900" font-family="sans-serif">Initech</text></svg></div>`;
  }

  // ==========================================
  // 🔥 MOCKUPY I KARTY SAAS 🔥
  // ==========================================
  else if (variant === 'mockup-browser') { 
    block.name = 'MOCKUP BROWSER'; block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 5%, transparent)'; block.styles.borderRadius = '16px'; block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 15%, transparent)'; block.styles.boxShadow = '0 30px 60px rgba(0,0,0,0.3)'; block.styles.padding = '0'; block.styles.overflow = 'hidden'; block.styles.width = '100%'; block.styles.backdropFilter = 'blur(20px)';
    const topBar = ctx.createBlock('graphic', 'classic', 'Pasek Safari'); topBar.text = '<div style="height:40px; background:color-mix(in srgb, var(--canvas-text) 10%, transparent); display:flex; align-items:center; justify-content:center; position:relative; border-bottom: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent);"><div style="position:absolute; left:16px; display:flex; gap:8px;"><div style="width:12px;height:12px;border-radius:50%;background:#ff5f56;box-shadow:inset 0 0 4px rgba(0,0,0,0.2)"></div><div style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;box-shadow:inset 0 0 4px rgba(0,0,0,0.2)"></div><div style="width:12px;height:12px;border-radius:50%;background:#27c93f;box-shadow:inset 0 0 4px rgba(0,0,0,0.2)"></div></div><div style="background:color-mix(in srgb, var(--canvas-text) 10%, transparent); padding: 4px 100px; border-radius: 6px; font-size: 12px; font-weight: 600; color: var(--canvas-text); opacity: 0.5;">vision-os.local</div></div>'; topBar.styles.padding = '0'; topBar.styles.width = '100%';
    const img = ctx.createBlock('img', 'classic', 'Zrzut ekranu'); img.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'; img.styles.borderTopLeftRadius = '0'; img.styles.borderTopRightRadius = '0';
    block.children = [topBar, img]; 
  }
  else if (variant === 'mockup-mobile') { 
    block.name = 'MOCKUP MOBILE'; block.styles.backgroundColor = '#000000'; block.styles.borderRadius = '50px'; block.styles.border = '8px solid color-mix(in srgb, var(--canvas-text) 80%, black)'; block.styles.boxShadow = '0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.2)'; block.styles.padding = '12px'; block.styles.width = '340px'; block.styles.margin = '0 auto';
    const img = ctx.createBlock('img', 'classic', 'Ekran Aplikacji'); img.src = 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80'; img.styles.height = '700px'; img.styles.borderRadius = '32px'; img.styles.objectFit = 'cover';
    block.children = [img]; 
  }
  else if (variant === 'mockup-credit-card') {
    block.name = 'KARTA 3D'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent'; block.styles.border = 'none';
    const cardHtml = ctx.createBlock('graphic', 'raw', 'UI Karty');
    cardHtml.text = `
      <style>
        .card-wrap-${rnd} { perspective: 1200px; display: flex; justify-content: center; padding: 40px; width: 100%; }
        .lux-card-${rnd} { width: 400px; height: 250px; border-radius: 24px; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.4); transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); color: #fff; position: relative; overflow: hidden; cursor: crosshair; }
        .lux-card-${rnd}:hover { transform: scale(1.05) rotateX(15deg) rotateY(-15deg); box-shadow: -20px 30px 50px rgba(var(--theme-color-rgb, 0,200,255), 0.2), 0 0 40px rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.6); }
        .lux-card-${rnd}::before { content:''; position: absolute; top: -100%; left: -100%; width: 300%; height: 300%; background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3), transparent 40%); opacity: 0; pointer-events: none; mix-blend-mode: overlay; transition: opacity 0.5s; }
        .lux-card-${rnd}:hover::before { opacity: 1; transform: translate(20%, 20%); }
      </style>
      <div class="card-wrap-${rnd}">
        <div class="lux-card-${rnd}">
          <svg width="45" height="35" viewBox="0 0 40 30" fill="none"><rect width="40" height="30" rx="6" fill="#fbbf24"/><path d="M10 0v30M20 0v30M30 0v30" stroke="#d97706" stroke-width="2" opacity="0.5"/><path d="M0 15h40" stroke="#d97706" stroke-width="2" opacity="0.5"/></svg>
          <div style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: 800; letter-spacing: 5px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); margin-top: 10px;">5412 7512 3412 9010</div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div style="font-family: system-ui, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">Elon Musk</div>
            <div style="font-family: system-ui, sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 1px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">12/38</div>
          </div>
        </div>
      </div>
    `;
    block.children = [cardHtml];
  }
  else if (variant === 'pricing-card') {
    block.name = 'CENNIK SAAS'; block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 2%, transparent)'; block.styles.borderRadius = '32px'; block.styles.padding = '50px'; block.styles.boxShadow = '0 30px 60px rgba(0,0,0,0.1)'; block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)'; block.styles.maxWidth = '400px'; block.styles.alignItems = 'center'; block.styles.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'; block.hoverStyles = { transform: 'translateY(-15px) scale(1.02)', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', borderColor: 'var(--theme-color)' };
    const title = ctx.createBlock('h3', 'classic', 'Plan'); title.text = 'ENTERPRISE'; title.styles.color = 'var(--theme-color, #ff4500)'; title.styles.fontSize = '16px'; title.styles.fontWeight = '900'; title.styles.letterSpacing = '3px';
    const price = ctx.createBlock('h2', 'classic', 'Cena'); price.text = '$99<span style="font-size:18px; color:var(--canvas-text); opacity:0.5; font-weight:600;">/mc</span>'; price.styles.fontSize = '56px'; price.styles.color = 'var(--canvas-text)'; price.styles.margin = '10px 0 30px 0'; price.styles.fontWeight = '900';
    const list = ctx.createBlock('list', 'pro-checklist', 'Funkcje');
    const btn = ctx.createBlock('button', 'apple', 'Kup'); btn.text = 'Zainicjuj Protokół'; btn.styles.width = '100%'; btn.styles.marginTop = '30px'; 
    block.children = [title, price, list, btn];
  }

  // ==========================================
  // 🖼️ SZALONE GALERIE (Fizyka Omijająca Edytor)
  // ==========================================
  else if (variant === 'gallery-accordion') {
    block.name = 'KINETIC ACCORDION'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent';
    const htmlBlock = ctx.createBlock('graphic', 'raw', 'Gallery Core');
    htmlBlock.text = `
      <style>
        .acc-wrap-${rnd} { display: flex; height: 500px; gap: 12px; width: 100%; border-radius: 24px; padding: 10px; background: color-mix(in srgb, var(--canvas-text) 3%, transparent); border: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent); }
        .acc-item-${rnd} { flex: 1; border-radius: 16px; overflow: hidden; transition: flex 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease, transform 0.6s; filter: grayscale(80%) brightness(0.5); cursor: crosshair; }
        .acc-wrap-${rnd}:hover .acc-item-${rnd} { filter: grayscale(100%) brightness(0.2); }
        .acc-wrap-${rnd} .acc-item-${rnd}:hover { flex: 5; filter: grayscale(0%) brightness(1); transform: scaleY(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10; border: 2px solid var(--theme-color); }
        .acc-item-${rnd} img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; display: block; }
        .acc-item-${rnd}:hover img { transform: scale(1.05); }
      </style>
      <div class="acc-wrap-${rnd}">
        <div class="acc-item-${rnd}"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"/></div>
        <div class="acc-item-${rnd}"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"/></div>
        <div class="acc-item-${rnd}"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"/></div>
        <div class="acc-item-${rnd}"><img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"/></div>
      </div>
    `;
    block.children = [htmlBlock];
  }
  else if (variant === 'gallery-bouncing') {
    // 🔥 ZERO-GRAVITY BOUNCING ORBS 🔥
    block.name = 'KINETIC COLLIDER'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent'; block.styles.overflow = 'hidden';
    const htmlBlock = ctx.createBlock('graphic', 'raw', 'Gallery Core');
    htmlBlock.text = `
      <style>
        .bounce-wrap-${rnd} { position: relative; width: 100%; height: 600px; background: color-mix(in srgb, var(--canvas-text) 2%, transparent); border-radius: 32px; border: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent); overflow: hidden; }
        @keyframes bX1_${rnd} { 0% { left: 0px; } 100% { left: calc(100% - 150px); } }
        @keyframes bY1_${rnd} { 0% { top: 0px; } 100% { top: calc(100% - 150px); } }
        @keyframes bX2_${rnd} { 0% { left: calc(100% - 120px); } 100% { left: 0px; } }
        @keyframes bY2_${rnd} { 0% { top: calc(100% - 120px); } 100% { top: 0px; } }
        @keyframes bX3_${rnd} { 0% { left: 50%; } 100% { left: calc(100% - 180px); } }
        @keyframes bY3_${rnd} { 0% { top: 10px; } 100% { top: calc(100% - 180px); } }
        @keyframes bX4_${rnd} { 0% { left: 10px; } 100% { left: calc(100% - 130px); } }
        @keyframes bY4_${rnd} { 0% { top: calc(100% - 130px); } 100% { top: 10px; } }
        @keyframes bX5_${rnd} { 0% { left: calc(100% - 160px); } 100% { left: 20px; } }
        @keyframes bY5_${rnd} { 0% { top: 50%; } 100% { top: calc(100% - 160px); } }

        .orb-${rnd} { position: absolute; border-radius: 50%; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 2px solid color-mix(in srgb, var(--theme-color) 30%, transparent); transition: transform 0.4s, filter 0.4s; cursor: crosshair; filter: grayscale(50%); }
        .orb-${rnd} img { width: 100%; height: 100%; object-fit: cover; }
        .orb-${rnd}:hover { animation-play-state: paused !important; transform: scale(1.3); z-index: 100 !important; filter: grayscale(0%) brightness(1.2); box-shadow: 0 0 40px var(--theme-color); border-color: var(--theme-color); }
        .bounce-wrap-${rnd}:hover .orb-${rnd}:not(:hover) { filter: grayscale(100%) brightness(0.4) blur(2px); }

        .o1-${rnd} { width: 150px; height: 150px; animation: bX1_${rnd} 4.5s ease-in-out infinite alternate, bY1_${rnd} 3.2s ease-in-out infinite alternate; z-index: 1; }
        .o2-${rnd} { width: 120px; height: 120px; animation: bX2_${rnd} 5s ease-in-out infinite alternate, bY2_${rnd} 4.1s ease-in-out infinite alternate; z-index: 2; }
        .o3-${rnd} { width: 180px; height: 180px; animation: bX3_${rnd} 6s ease-in-out infinite alternate, bY3_${rnd} 4.8s ease-in-out infinite alternate; z-index: 3; }
        .o4-${rnd} { width: 130px; height: 130px; animation: bX4_${rnd} 3.7s ease-in-out infinite alternate, bY4_${rnd} 5.3s ease-in-out infinite alternate; z-index: 4; }
        .o5-${rnd} { width: 160px; height: 160px; animation: bX5_${rnd} 5.5s ease-in-out infinite alternate, bY5_${rnd} 3.9s ease-in-out infinite alternate; z-index: 5; }
      </style>
      <div class="bounce-wrap-${rnd}">
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; letter-spacing: 10px; color: var(--canvas-text); opacity: 0.1; text-transform: uppercase; pointer-events: none;">Zero Gravity</div>
        <div class="orb-${rnd} o1-${rnd}"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"/></div>
        <div class="orb-${rnd} o2-${rnd}"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80"/></div>
        <div class="orb-${rnd} o3-${rnd}"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"/></div>
        <div class="orb-${rnd} o4-${rnd}"><img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80"/></div>
        <div class="orb-${rnd} o5-${rnd}"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80"/></div>
      </div>
    `;
    block.children = [htmlBlock];
  }
  else if (variant === 'gallery-coverflow') {
    // 🔥 3D COVERFLOW CAROUSEL 🔥
    block.name = 'HOLO-RING 3D'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent';
    const htmlBlock = ctx.createBlock('graphic', 'raw', 'Gallery Core');
    htmlBlock.text = `
      <style>
        .cover-scene-${rnd} { perspective: 1200px; width: 100%; height: 600px; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--canvas-text) 2%, transparent); border-radius: 32px; border: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent); overflow: hidden; position: relative; }
        .cover-carousel-${rnd} { width: 300px; height: 200px; transform-style: preserve-3d; animation: spin3D_${rnd} 20s infinite linear; }
        .cover-scene-${rnd}:hover .cover-carousel-${rnd} { animation-play-state: paused; }
        @keyframes spin3D_${rnd} { 100% { transform: rotateY(-360deg); } }
        .cover-item-${rnd} { position: absolute; width: 100%; height: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 2px solid color-mix(in srgb, var(--theme-color) 40%, transparent); transition: 0.4s; cursor: crosshair; filter: brightness(0.5); }
        .cover-item-${rnd} img { width: 100%; height: 100%; object-fit: cover; }
        .cover-item-${rnd}:hover { filter: brightness(1.2); box-shadow: 0 0 40px var(--theme-color); border-color: var(--theme-color); transform: scale(1.1); }
      </style>
      <div class="cover-scene-${rnd}">
        <div style="position: absolute; bottom: -50px; width: 400px; height: 100px; background: radial-gradient(ellipse, var(--theme-color) 0%, transparent 70%); filter: blur(40px); opacity: 0.5;"></div>
        <div class="cover-carousel-${rnd}">
          <div class="cover-item-${rnd}" style="transform: rotateY(0deg) translateZ(350px);"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"/></div>
          <div class="cover-item-${rnd}" style="transform: rotateY(60deg) translateZ(350px);"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"/></div>
          <div class="cover-item-${rnd}" style="transform: rotateY(120deg) translateZ(350px);"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"/></div>
          <div class="cover-item-${rnd}" style="transform: rotateY(180deg) translateZ(350px);"><img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"/></div>
          <div class="cover-item-${rnd}" style="transform: rotateY(240deg) translateZ(350px);"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"/></div>
          <div class="cover-item-${rnd}" style="transform: rotateY(300deg) translateZ(350px);"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"/></div>
        </div>
      </div>
    `;
    block.children = [htmlBlock];
  }
  else if (variant === 'gallery-marquee') {
    block.name = 'INFINITE WALL'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent';
    const htmlBlock = ctx.createBlock('graphic', 'raw', 'Gallery Core');
    htmlBlock.text = `
      <style>
        .wall-wrap-${rnd} { position: relative; width: 100%; height: 550px; overflow: hidden; display: flex; flex-direction: column; gap: 20px; perspective: 1000px; background: color-mix(in srgb, var(--canvas-text) 2%, transparent); border-radius: 24px; border: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent); }
        .wall-scene-${rnd} { transform: rotateX(15deg) rotateZ(-5deg); transform-style: preserve-3d; display: flex; flex-direction: column; gap: 20px; margin-top: -50px; }
        @keyframes sLeft_${rnd} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes sRight_${rnd} { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .mq-trk-${rnd} { display: flex; width: max-content; gap: 20px; }
        .trk-l-${rnd} { animation: sLeft_${rnd} 35s linear infinite; }
        .trk-r-${rnd} { animation: sRight_${rnd} 35s linear infinite; }
        .wall-wrap-${rnd}:hover .mq-trk-${rnd} { animation-play-state: paused; }
        .mq-img-${rnd} { width: 400px; height: 250px; border-radius: 20px; object-fit: cover; flex-shrink: 0; filter: grayscale(60%) brightness(0.7); transition: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); cursor: crosshair; display: block; }
        .mq-img-${rnd}:hover { filter: grayscale(0%) brightness(1); transform: scale(1.1) translateZ(50px); box-shadow: 0 30px 60px rgba(0,0,0,0.8); z-index: 10; border: 2px solid var(--theme-color); }
      </style>
      <div class="wall-wrap-${rnd}">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle, transparent 40%, var(--canvas-bg, #000) 100%); z-index: 5; pointer-events: none;"></div>
        <div class="wall-scene-${rnd}">
          <div class="mq-trk-${rnd} trk-l-${rnd}">
            <img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"/>
          </div>
          <div class="mq-trk-${rnd} trk-r-${rnd}">
            <img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"/><img class="mq-img-${rnd}" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"/>
          </div>
        </div>
      </div>
    `;
    block.children = [htmlBlock];
  }
  else if (variant === 'gallery-bento-3d') {
    block.name = 'BENTO 3D MATRIX'; block.styles.padding = '0'; block.styles.backgroundColor = 'transparent';
    const htmlBlock = ctx.createBlock('graphic', 'raw', 'Gallery Core');
    htmlBlock.text = `
      <style>
        .bento-wrap-${rnd} { perspective: 1200px; padding: 20px; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; background: color-mix(in srgb, var(--canvas-text) 2%, transparent); border-radius: 32px; border: 1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent); }
        .bento-item-${rnd} { position: relative; border-radius: 24px; overflow: hidden; transform-style: preserve-3d; filter: brightness(0.8) grayscale(20%); transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s ease, filter 0.6s; cursor: crosshair; }
        .bento-item-${rnd} img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; display: block; }
        .bento-wrap-${rnd}:hover .bento-item-${rnd} { filter: brightness(0.4) grayscale(100%); }
        .bento-wrap-${rnd} .bento-item-${rnd}:hover { transform: translateZ(80px) rotateX(5deg) rotateY(-5deg) scale(1.05); box-shadow: -30px 30px 50px rgba(0,0,0,0.6), 0 0 30px var(--theme-color); filter: brightness(1.1) grayscale(0%); z-index: 10; border: 2px solid var(--theme-color); }
      </style>
      <div class="bento-wrap-${rnd}">
        <div class="bento-item-${rnd}" style="grid-column: span 2; grid-row: span 2; height: 500px;"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"/></div>
        <div class="bento-item-${rnd}" style="height: 238px;"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"/></div>
        <div class="bento-item-${rnd}" style="height: 238px;"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"/></div>
      </div>
    `;
    block.children = [htmlBlock];
  }

  return block;
};