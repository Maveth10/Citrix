export const createBlock = (type: string, variant: string, label: string) => {
  const generateId = () => Math.floor(Math.random() * 10000000);
  const rnd = Math.floor(Math.random() * 10000); // Unikalny seed dla animacji CSS
  
  let newBlock: any = {
    id: generateId(), type, name: label.toUpperCase(),
    children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
    hoverStyles: {}, entranceAnim: 'none',
    styles: { 
      boxSizing: 'border-box', maxWidth: '100%', minWidth: '0', minHeight: '0',
      position: 'relative', left: '0px', top: '0px', display: 'flex', flexDirection: 'column', 
      padding: '20px', margin: '0px', 
      width: '100%', height: 'auto', 
      backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', 
      opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', overflow: 'visible', 
      bgType: 'color', bgImage: '', bgVideo: '', bgOverlay: 'rgba(0,0,0,0)', zIndex: 1,
      clearRow: true 
    },
  };

  // --- POPUPY I NOTYFIKACJE (NOWOŚĆ V18.50) ---
  if (type === 'popup') {
    newBlock.styles.position = 'absolute';
    newBlock.styles.zIndex = 99999;
    newBlock.styles.clearRow = false; // Popupy unoszą się, więc nie zrzucają innych wierszy!

    if (variant === 'modal-promo') {
      newBlock.name = 'PROMO MODAL';
      newBlock.styles.top = '0px'; newBlock.styles.left = '0px'; newBlock.styles.width = '100%'; newBlock.styles.height = '100%';
      newBlock.styles.backgroundColor = 'rgba(0, 0, 0, 0.7)'; newBlock.styles.backdropFilter = 'blur(6px)';
      newBlock.styles.display = 'flex'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center';
      newBlock.styles.padding = '20px';

      const card = createBlock('container', 'shadow-pro', 'Karta Modala');
      card.styles.width = '100%'; card.styles.maxWidth = '450px'; card.styles.padding = '50px 30px'; card.styles.alignItems = 'center'; card.styles.gap = '15px';
      
      const badge = createBlock('p', 'eyebrow', 'Etykieta'); badge.text = 'OFERTA SPECJALNA'; badge.styles.textAlign = 'center';
      const h2 = createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Odbierz -20% na start!'; h2.styles.textAlign = 'center'; h2.styles.marginBottom = '5px';
      const p = createBlock('p', 'classic', 'Tekst'); p.text = 'Zapisz się do newslettera i zyskaj kod rabatowy od razu na swoją skrzynkę.'; p.styles.textAlign = 'center';
      const btn = createBlock('button', 'gradient', 'Przycisk'); btn.text = 'Odbierz Zniżkę'; btn.styles.width = '100%'; btn.styles.marginTop = '10px';
      const cancel = createBlock('button', 'ghost', 'Anuluj'); cancel.text = 'Nie, dziękuję';
      
      card.children = [badge, h2, p, btn, cancel];
      newBlock.children = [card];
    }
    else if (variant === 'modal-newsletter') {
      newBlock.name = 'NEWSLETTER MODAL';
      newBlock.styles.top = '0px'; newBlock.styles.left = '0px'; newBlock.styles.width = '100%'; newBlock.styles.height = '100%';
      newBlock.styles.backgroundColor = 'rgba(15, 23, 42, 0.8)'; newBlock.styles.backdropFilter = 'blur(4px)';
      newBlock.styles.display = 'flex'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center';
      
      const card = createBlock('container', 'shadow-pro', 'Karta Modala');
      card.styles.width = '100%'; card.styles.maxWidth = '500px'; card.styles.padding = '40px'; card.styles.gap = '20px';
      
      const h2 = createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Bądź na bieżąco';
      const form = createBlock('form', 'newsletter', 'Formularz'); form.styles.flexDirection = 'column'; form.styles.width = '100%';
      
      card.children = [h2, form];
      newBlock.children = [card];
    }
    else if (variant === 'cookie-banner') {
      newBlock.name = 'COOKIE BANNER';
      newBlock.styles.top = 'auto'; newBlock.styles.bottom = '20px'; newBlock.styles.left = '20px'; newBlock.styles.right = '20px'; newBlock.styles.width = 'auto'; newBlock.styles.height = 'auto';
      newBlock.styles.backgroundColor = '#0f172a'; newBlock.styles.borderRadius = '16px'; newBlock.styles.padding = '20px 30px'; newBlock.styles.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)';
      newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'row'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'space-between'; newBlock.styles.gap = '20px';
      
      const p = createBlock('p', 'classic', 'Tekst'); p.text = '🍪 Ta strona używa ciasteczek w celu zapewnienia najlepszego doświadczenia z korzystania z serwisu.'; p.styles.color = '#cbd5e1'; p.styles.margin = '0'; p.styles.fontSize = '14px';
      const btn = createBlock('button', 'classic', 'Akceptuj'); btn.text = 'Akceptuję'; btn.styles.backgroundColor = '#3b82f6'; btn.styles.padding = '10px 24px';
      
      newBlock.children = [p, btn];
    }
    else if (variant === 'toast-alert') {
      newBlock.name = 'TOAST ALERTS';
      newBlock.styles.top = '20px'; newBlock.styles.bottom = 'auto'; newBlock.styles.right = '20px'; newBlock.styles.left = 'auto'; newBlock.styles.width = '350px'; newBlock.styles.height = 'auto';
      newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '12px'; newBlock.styles.padding = '20px'; newBlock.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
      newBlock.styles.borderLeft = '4px solid #10b981';
      newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '5px';
      
      const h = createBlock('p', 'classic', 'Tytuł'); h.text = 'Sukces!'; h.styles.fontWeight = '800'; h.styles.margin = '0'; h.styles.color = '#0f172a';
      const p = createBlock('p', 'classic', 'Tekst'); p.text = 'Twoje zmiany zostały pomyślnie zapisane.'; p.styles.margin = '0'; p.styles.fontSize = '13px'; p.styles.color = '#64748b';
      
      newBlock.children = [h, p];
    }
  }

  // --- TYPOGRAFIA ---
  if (['h1', 'h2', 'p'].includes(type)) {
    newBlock.styles.width = '100%'; newBlock.styles.margin = '0 0 15px 0';
    if (type === 'h1') {
      newBlock.text = 'Wielki Nagłówek H1'; newBlock.styles.fontSize = '56px'; newBlock.styles.fontWeight = '900'; newBlock.styles.lineHeight = '1.1'; newBlock.styles.letterSpacing = '-0.03em'; newBlock.styles.color = '#0f172a';
      if (variant === 'gradient') { newBlock.text = 'Magiczny Gradient'; newBlock.styles.backgroundImage = 'linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 100%)'; newBlock.styles.WebkitBackgroundClip = 'text'; newBlock.styles.WebkitTextFillColor = 'transparent'; newBlock.styles.color = 'transparent'; } 
      else if (variant === 'outline') { newBlock.text = 'Pusty w Środku'; newBlock.styles.color = 'transparent'; newBlock.styles.WebkitTextStroke = '2px #0f172a'; } 
      else if (variant === 'highlight') { newBlock.text = 'Kluczowy <span style="background: linear-gradient(120deg, rgba(253, 224, 71, 0.8) 0%, rgba(253, 224, 71, 0.8) 100%) no-repeat; background-size: 100% 35%; background-position: 0 90%;">Wyróżnik</span>'; }
      else if (variant === 'brand') { newBlock.text = 'MARKOWY TYTUŁ'; newBlock.styles.color='#3b82f6'; newBlock.styles.textTransform='uppercase'; newBlock.styles.letterSpacing = '-0.02em'; }
    }
    if (type === 'h2') {
      newBlock.text = 'Mocny Podtytuł H2'; newBlock.styles.fontSize = '36px'; newBlock.styles.fontWeight = '800'; newBlock.styles.lineHeight = '1.2'; newBlock.styles.letterSpacing = '-0.02em'; newBlock.styles.color = '#1e293b';
      if (variant === 'brand') { newBlock.styles.borderBottom = '3px solid #3b82f6'; newBlock.styles.display = 'inline-block'; newBlock.styles.paddingBottom = '5px'; newBlock.styles.width = 'max-content'; }
    }
    if (type === 'p') {
      newBlock.text = 'Zwykły akapit tekstu, który przekazuje najważniejsze informacje o Twoim produkcie i zachęca do czytania dalej.'; newBlock.styles.fontSize = '16px'; newBlock.styles.lineHeight = '1.6'; newBlock.styles.color = '#334155';
      if (variant === 'eyebrow') { newBlock.text = 'ZACZNIJ TUTAJ'; newBlock.styles.color = '#3b82f6'; newBlock.styles.fontWeight = '800'; newBlock.styles.fontSize = '14px'; newBlock.styles.letterSpacing = '0.15em'; newBlock.styles.textTransform = 'uppercase'; newBlock.styles.margin = '0 0 10px 0'; } 
      else if (variant === 'lead') { newBlock.text = 'To jest elegancki, markowy akapit tekstu (Lead). Zbudowany większym fontem, w delikatniejszym kolorze. Idealny pod główny nagłówek.'; newBlock.styles.fontSize = '20px'; newBlock.styles.color = '#64748b'; newBlock.styles.lineHeight = '1.7'; } 
      else if (variant === 'quote') { newBlock.text = '"Wybitny design to nie taki, do którego nie można już nic dodać, ale taki, z którego nie można już nic zabrać."'; newBlock.styles.fontStyle = 'italic'; newBlock.styles.borderLeft = '4px solid #3b82f6'; newBlock.styles.paddingLeft = '20px'; newBlock.styles.color = '#475569'; newBlock.styles.fontSize = '18px'; }
    }
  }

  // --- POLA TEKSTOWE I FORMULARZE ---
  if (type === 'input') {
    newBlock.text = 'Wprowadź tekst...'; newBlock.styles.padding = '14px 16px'; newBlock.styles.backgroundColor = '#f8fafc'; newBlock.styles.border = '1px solid #e2e8f0'; newBlock.styles.borderRadius = '8px'; newBlock.styles.color = '#94a3b8'; newBlock.styles.fontSize = '14px'; newBlock.styles.width = '100%'; newBlock.styles.display = 'flex'; newBlock.styles.alignItems = 'center';
    if (variant === 'textarea') { newBlock.text = 'Wpisz dłuższą wiadomość...'; newBlock.styles.minHeight = '120px'; newBlock.styles.alignItems = 'flex-start'; }
    else if (variant === 'underline') { newBlock.styles.backgroundColor = 'transparent'; newBlock.styles.border = 'none'; newBlock.styles.borderBottom = '2px solid #cbd5e1'; newBlock.styles.borderRadius = '0px'; newBlock.styles.padding = '12px 0px'; }
  }

  if (type === 'form') {
    newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = 'transparent'; newBlock.styles.padding = '0px';
    if (variant === 'newsletter') {
      newBlock.name = 'NEWSLETTER'; newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'row'; newBlock.styles.gap = '10px';
      const input = createBlock('input', 'classic', 'Email'); input.text = 'Twój adres email...'; input.styles.flex = '1';
      const btn = createBlock('button', 'classic', 'Zapisz'); btn.text = 'Zapisz się'; btn.styles.backgroundColor = '#f43f5e';
      newBlock.children = [input, btn];
    }
    else if (variant === 'contact') {
      newBlock.name = 'KONTAKT'; newBlock.styles.padding = '40px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '24px'; newBlock.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)'; newBlock.styles.border = '1px solid #f1f5f9'; newBlock.styles.gap = '16px'; newBlock.styles.maxWidth = '500px';
      const h2 = createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Napisz do nas'; h2.styles.marginBottom = '10px'; h2.styles.color = '#0f172a';
      const nameInp = createBlock('input', 'classic', 'Imię'); nameInp.text = 'Twoje imię';
      const emailInp = createBlock('input', 'classic', 'Email'); emailInp.text = 'Adres e-mail';
      const msgInp = createBlock('input', 'textarea', 'Wiadomość'); msgInp.text = 'W czym możemy pomóc?';
      const btn = createBlock('button', 'classic', 'Wyślij'); btn.text = 'Wyślij wiadomość'; btn.styles.width = '100%'; btn.styles.backgroundColor = '#f43f5e';
      newBlock.children = [h2, nameInp, emailInp, msgInp, btn];
    }
    else if (variant === 'login') {
      newBlock.name = 'LOGOWANIE'; newBlock.styles.padding = '40px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderRadius = '24px'; newBlock.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)'; newBlock.styles.border = '1px solid #f1f5f9'; newBlock.styles.gap = '16px'; newBlock.styles.maxWidth = '400px';
      const h2 = createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Zaloguj się'; h2.styles.marginBottom = '20px'; h2.styles.color = '#0f172a'; h2.styles.textAlign = 'center';
      const emailInp = createBlock('input', 'classic', 'Email'); emailInp.text = 'Adres e-mail';
      const passInp = createBlock('input', 'classic', 'Hasło'); passInp.text = '••••••••';
      const btn = createBlock('button', 'classic', 'Wyślij'); btn.text = 'Zaloguj się'; btn.styles.width = '100%'; btn.styles.backgroundColor = '#0f172a';
      const link = createBlock('p', 'classic', 'Link'); link.text = 'Zapomniałeś hasła?'; link.styles.textAlign = 'center'; link.styles.fontSize = '13px'; link.styles.color = '#64748b'; link.styles.marginTop = '10px';
      newBlock.children = [h2, emailInp, passInp, btn, link];
    }
  }

  // --- GRAFIKI, LICZNIKI, WYKRESY ---
  if (type === 'graphic') {
    newBlock.styles.width = '100%'; newBlock.styles.padding = '0px';
    if (variant === 'counter') { newBlock.text = `<style>@property --num_${rnd} { syntax: "<integer>"; initial-value: 0; inherits: false; } @keyframes count_${rnd} { to { --num_${rnd}: 24500; } } .counter-anim-${rnd} { animation: count_${rnd} 2.5s cubic-bezier(0, 0.5, 0, 1) forwards; counter-reset: n_${rnd} var(--num_${rnd}); font-variant-numeric: tabular-nums; } .counter-anim-${rnd}::after { content: counter(n_${rnd}) "+"; }</style><div style="text-align: center; padding: 30px; background: #ffffff; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; width: 100%;"><div class="counter-anim-${rnd}" style="font-size: 56px; font-weight: 900; color: #f59e0b; line-height: 1;"></div><div style="font-size: 14px; font-weight: 800; color: #64748b; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 10px;">Sprzedanych Ładowarek EV</div></div>`; }
    else if (variant === 'bar-chart') { newBlock.text = `<style>@keyframes grow_${rnd} { from { width: 0%; opacity: 0; } to { opacity: 1; } } .bar-${rnd} { animation: grow_${rnd} 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; height: 100%; border-radius: 999px; }</style><div style="display: flex; flex-direction: column; gap: 20px; padding: 30px; background: #ffffff; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; width: 100%;"><div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="font-size: 14px; font-weight: 800; color: #1e293b;">Zebrane Jabłka (Tony)</span><span style="font-size: 14px; font-weight: 900; color: #ef4444;">92%</span></div><div style="width: 100%; background: #f1f5f9; border-radius: 999px; height: 16px; overflow: hidden;"><div class="bar-${rnd}" style="width: 92%; background: linear-gradient(90deg, #ef4444, #f87171);"></div></div></div><div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="font-size: 14px; font-weight: 800; color: #1e293b;">Winogrona (Tony)</span><span style="font-size: 14px; font-weight: 900; color: #8b5cf6;">65%</span></div><div style="width: 100%; background: #f1f5f9; border-radius: 999px; height: 16px; overflow: hidden;"><div class="bar-${rnd}" style="width: 65%; background: linear-gradient(90deg, #8b5cf6, #a78bfa);"></div></div></div><div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="font-size: 14px; font-weight: 800; color: #1e293b;">Gruszki (Tony)</span><span style="font-size: 14px; font-weight: 900; color: #f59e0b;">40%</span></div><div style="width: 100%; background: #f1f5f9; border-radius: 999px; height: 16px; overflow: hidden;"><div class="bar-${rnd}" style="width: 40%; background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div></div></div></div>`; }
    else if (variant === 'circle-chart') { newBlock.text = `<style>@keyframes fill_${rnd} { 0% { stroke-dasharray: 0, 100; } 100% { stroke-dasharray: 78, 100; } } .circle-anim-${rnd} { animation: fill_${rnd} 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }</style><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; background: #ffffff; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; width: 100%;"><div style="position: relative; width: 140px; height: 140px;"><svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" stroke-width="3" /><path class="circle-anim-${rnd}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="78, 100" stroke-linecap="round" /></svg><div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 900; color: #1e293b;">78%</div></div><div style="margin-top: 20px; font-size: 14px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px;">Wypełnienie Celu</div></div>`; }
    else if (variant === 'blob') { newBlock.text = `<style>@keyframes morph_${rnd} { 0%,100%{border-radius:40% 60% 70% 30% / 40% 40% 60% 50%} 34%{border-radius:70% 30% 50% 50% / 30% 30% 70% 70%} 67%{border-radius:100% 60% 60% 100% / 100% 100% 60% 60%} } .blob-${rnd} { animation: morph_${rnd} 8s ease-in-out infinite; background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%); width: 250px; height: 250px; box-shadow: 0 20px 30px -10px rgba(245, 158, 11, 0.4); }</style><div style="display:flex; justify-content:center; align-items:center; width:100%; padding: 40px 0;"><div class="blob-${rnd}"></div></div>`; }
  }

  // --- KONTENERY I INNE ---
  if (type === 'container') {
    if (variant === 'nav-classic') { newBlock.name = 'NAVBAR'; newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'row'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'space-between'; newBlock.styles.padding = '20px 40px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.borderBottom = '1px solid #e2e8f0'; newBlock.styles.width = '100%'; const logo = createBlock('h2', 'brand', 'Logo'); logo.text = 'LOGO'; logo.styles.fontSize = '24px'; logo.styles.margin = '0'; logo.styles.color = '#0f172a'; logo.styles.borderBottom = 'none'; const links = createBlock('container', 'empty', 'Linki'); links.styles.display = 'flex'; links.styles.flexDirection = 'row'; links.styles.gap = '30px'; links.styles.backgroundColor = 'transparent'; links.styles.padding = '0'; links.styles.minHeight = 'auto'; links.styles.width = 'auto'; links.styles.border = 'none'; const l1 = createBlock('p', 'classic', 'Link'); l1.text = 'O nas'; l1.styles.margin = '0'; l1.styles.fontWeight = '600'; l1.styles.cursor = 'pointer'; const l2 = createBlock('p', 'classic', 'Link'); l2.text = 'Usługi'; l2.styles.margin = '0'; l2.styles.fontWeight = '600'; l2.styles.cursor = 'pointer'; const l3 = createBlock('p', 'classic', 'Link'); l3.text = 'Kontakt'; l3.styles.margin = '0'; l3.styles.fontWeight = '600'; l3.styles.cursor = 'pointer'; links.children = [l1, l2, l3]; const btn = createBlock('button', 'classic', 'Akcja'); btn.text = 'Rozpocznij'; newBlock.children = [logo, links, btn]; }
    else if (variant === 'nav-pill') { newBlock.name = 'FLOATING NAV'; newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'row'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'space-between'; newBlock.styles.padding = '10px 20px'; newBlock.styles.backgroundColor = 'rgba(255, 255, 255, 0.8)'; newBlock.styles.backdropFilter = 'blur(12px)'; newBlock.styles.borderRadius = '999px'; newBlock.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; newBlock.styles.width = '90%'; newBlock.styles.margin = '20px auto'; newBlock.styles.border = '1px solid rgba(255, 255, 255, 0.3)'; const logo = createBlock('h2', 'brand', 'Logo'); logo.text = 'LOGO'; logo.styles.fontSize = '20px'; logo.styles.margin = '0'; logo.styles.color = '#0f172a'; logo.styles.borderBottom = 'none'; const links = createBlock('container', 'empty', 'Linki'); links.styles.display = 'flex'; links.styles.flexDirection = 'row'; links.styles.gap = '25px'; links.styles.backgroundColor = 'transparent'; links.styles.padding = '0'; links.styles.minHeight = 'auto'; links.styles.width = 'auto'; links.styles.border = 'none'; const l1 = createBlock('p', 'classic', 'Link'); l1.text = 'Home'; l1.styles.margin = '0'; l1.styles.fontWeight = '600'; l1.styles.color = '#334155'; l1.styles.cursor = 'pointer'; const l2 = createBlock('p', 'classic', 'Link'); l2.text = 'Cennik'; l2.styles.margin = '0'; l2.styles.fontWeight = '600'; l2.styles.color = '#334155'; l2.styles.cursor = 'pointer'; links.children = [l1, l2]; const btn = createBlock('button', 'rounded', 'Akcja'); btn.text = 'Zaloguj'; btn.styles.padding = '10px 24px'; newBlock.children = [logo, links, btn]; }
    else if (variant === 'footer-columns') { newBlock.name = 'FOOTER PRO'; newBlock.styles.display = 'grid'; newBlock.styles.gridTemplateColumns = '2fr 1fr 1fr 1fr'; newBlock.styles.gap = '40px'; newBlock.styles.padding = '60px 40px'; newBlock.styles.backgroundColor = '#0f172a'; newBlock.styles.width = '100%'; const col1 = createBlock('container', 'empty', 'Kolumna'); col1.styles.border = 'none'; col1.styles.backgroundColor = 'transparent'; col1.styles.padding = '0'; col1.styles.gap = '15px'; const logo = createBlock('h2', 'classic', 'Logo'); logo.text = 'FIRMA'; logo.styles.color = '#ffffff'; logo.styles.margin = '0'; const desc = createBlock('p', 'classic', 'Opis'); desc.text = 'Tworzymy najlepsze rozwiązania dla Twojego biznesu.'; desc.styles.color = '#94a3b8'; desc.styles.margin = '0'; col1.children = [logo, desc]; const col2 = createBlock('container', 'empty', 'Kolumna'); col2.styles.border = 'none'; col2.styles.backgroundColor = 'transparent'; col2.styles.padding = '0'; col2.styles.gap = '10px'; const hProduct = createBlock('p', 'eyebrow', 'Nagłówek'); hProduct.text = 'PRODUKT'; hProduct.styles.color = '#ffffff'; hProduct.styles.margin = '0'; const l1 = createBlock('p', 'classic', 'Link'); l1.text = 'Funkcje'; l1.styles.color = '#94a3b8'; l1.styles.margin = '0'; const l2 = createBlock('p', 'classic', 'Link'); l2.text = 'Cennik'; l2.styles.color = '#94a3b8'; l2.styles.margin = '0'; col2.children = [hProduct, l1, l2]; const col3 = createBlock('container', 'empty', 'Kolumna'); col3.styles.border = 'none'; col3.styles.backgroundColor = 'transparent'; col3.styles.padding = '0'; col3.styles.gap = '10px'; const hCompany = createBlock('p', 'eyebrow', 'Nagłówek'); hCompany.text = 'FIRMA'; hCompany.styles.color = '#ffffff'; hCompany.styles.margin = '0'; const l3 = createBlock('p', 'classic', 'Link'); l3.text = 'O nas'; l3.styles.color = '#94a3b8'; l3.styles.margin = '0'; const l4 = createBlock('p', 'classic', 'Link'); l4.text = 'Kariera'; l4.styles.color = '#94a3b8'; l4.styles.margin = '0'; col3.children = [hCompany, l3, l4]; const col4 = createBlock('container', 'empty', 'Kolumna'); col4.styles.border = 'none'; col4.styles.backgroundColor = 'transparent'; col4.styles.padding = '0'; col4.styles.gap = '10px'; const hLegal = createBlock('p', 'eyebrow', 'Nagłówek'); hLegal.text = 'PRAWNE'; hLegal.styles.color = '#ffffff'; hLegal.styles.margin = '0'; const l5 = createBlock('p', 'classic', 'Link'); l5.text = 'Prywatność'; l5.styles.color = '#94a3b8'; l5.styles.margin = '0'; const l6 = createBlock('p', 'classic', 'Link'); l6.text = 'Regulamin'; l6.styles.color = '#94a3b8'; l6.styles.margin = '0'; col4.children = [hLegal, l5, l6]; newBlock.children = [col1, col2, col3, col4]; }
    else if (variant === 'gallery-bento') { newBlock.name = 'BENTO GRID'; newBlock.styles.display = 'grid'; newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap = '16px'; newBlock.styles.backgroundColor = 'transparent'; newBlock.styles.padding = '0px'; const img1 = createBlock('img', 'rounded', 'Bento 1'); img1.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'; img1.styles.gridColumn = 'span 2'; img1.styles.gridRow = 'span 2'; img1.styles.height = '100%'; const img2 = createBlock('img', 'rounded', 'Bento 2'); img2.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80'; img2.styles.height = '100%'; const img3 = createBlock('img', 'rounded', 'Bento 3'); img3.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'; img3.styles.height = '100%'; newBlock.children = [img1, img2, img3]; }
    else if (variant === 'gallery-slider') { newBlock.name = 'KARUZELA'; newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'row'; newBlock.styles.flexWrap = 'nowrap'; newBlock.styles.overflowX = 'auto'; newBlock.styles.gap = '20px'; newBlock.styles.padding = '10px 0'; newBlock.styles.backgroundColor = 'transparent'; const slideSrcs = ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80']; newBlock.children = slideSrcs.map((src, idx) => { const img = createBlock('img', 'rounded', `Slajd ${idx + 1}`); img.src = src; img.styles.width = '350px'; img.styles.height = '250px'; img.styles.flexShrink = '0'; return img; }); }
    else if (variant === 'empty') { newBlock.styles.border = '2px dashed #cbd5e1'; newBlock.styles.backgroundColor = '#f8fafc'; newBlock.styles.minHeight = '120px'; newBlock.styles.width = '100%'; newBlock.styles.borderRadius = '12px'; newBlock.styles.display = 'flex'; newBlock.styles.flexDirection = 'column'; newBlock.styles.gap = '10px'; }
    else if (variant === 'glass') { newBlock.styles.backgroundColor = 'rgba(255, 255, 255, 0.1)'; newBlock.styles.backdropFilter = 'blur(10px)'; newBlock.styles.border = '1px solid rgba(255, 255, 255, 0.2)'; newBlock.styles.borderRadius = '24px'; }
    else if (variant === 'neon') { newBlock.styles.backgroundColor = '#000'; newBlock.styles.border = '2px solid #00f2ff'; newBlock.styles.boxShadow = '0 0 15px #00f2ff, inset 0 0 10px #00f2ff'; newBlock.styles.borderRadius = '12px'; }
    else if (variant === 'pill') { newBlock.styles.backgroundColor = '#f3f4f6'; newBlock.styles.borderRadius = '999px'; newBlock.styles.height = '80px'; newBlock.styles.width = '400px'; newBlock.styles.padding = '0 40px'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; }
    else if (variant === 'shadow-pro') { newBlock.styles.backgroundColor = '#fff'; newBlock.styles.borderRadius = '32px'; newBlock.styles.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'; }
    else if (variant === 'text-combo') { newBlock.styles.width = '100%'; newBlock.children = [{id:generateId(), type:'p', name:'ETYKIETA', text:'NOWOŚĆ', styles:{fontSize:'14px', fontWeight:'bold', color:'#3b82f6', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 10px 0', clearRow: true}}, {id:generateId(), type:'h2', name:'TYTUŁ', text:'Czysta Architektura', styles:{fontSize:'36px', fontWeight:'900', letterSpacing:'-0.02em', lineHeight:'1.1', color:'#0f172a', margin:'0 0 15px 0', clearRow: true}}, {id:generateId(), type:'p', name:'AKAPIT', text:'Odkryj nowy wymiar projektowania stron internetowych.', styles:{fontSize:'18px', color:'#64748b', lineHeight:'1.6', clearRow: true}}]; }
    else if (['alert-success', 'alert-warning', 'alert-tip', 'notice-box'].includes(variant)) { newBlock.styles.position = 'relative'; newBlock.styles.width = '450px'; newBlock.styles.maxWidth = '100%'; newBlock.styles.borderRadius = '12px'; newBlock.styles.padding = '0px'; newBlock.styles.marginTop = '25px'; newBlock.styles.overflow = 'visible'; newBlock.styles.display = 'block'; newBlock.styles.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'; const badgeId = generateId(); const textId = generateId(); let badgeText = ''; let mainColor = ''; let bgColor = ''; let textColor = ''; let borderLeftColor = ''; if (variant === 'alert-success') { badgeText = 'SUKCES'; mainColor = '#10b981'; bgColor = '#ecfdf5'; textColor = '#065f46'; borderLeftColor = mainColor; } else if (variant === 'alert-warning') { badgeText = 'UWAGA'; mainColor = '#f59e0b'; bgColor = '#fffbeb'; textColor = '#92400e'; borderLeftColor = mainColor; } else if (variant === 'alert-tip') { badgeText = 'WSKAZÓWKA'; mainColor = '#3b82f6'; bgColor = '#eff6ff'; textColor = '#1e3a8a'; borderLeftColor = mainColor; } else if (variant === 'notice-box') { badgeText = 'SECURITY & SAFETY NOTICE'; mainColor = '#ef4444'; bgColor = '#fef2f2'; textColor = '#dc2626'; newBlock.styles.border = `1px solid ${mainColor}`; } newBlock.styles.backgroundColor = bgColor; if (variant !== 'notice-box') { newBlock.styles.borderLeft = `8px solid ${borderLeftColor}`; } newBlock.children = [ { id: badgeId, type: 'h2', name: 'PLAKIETKA', text: badgeText, styles: { position: 'absolute', top: '0px', left: '30px', transform: 'translateY(-50%)', backgroundColor: mainColor, color: '#ffffff', padding: '4px 12px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', borderRadius: '6px', zIndex: 50, width: 'max-content', whiteSpace: 'nowrap', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', clearRow: false } }, { id: textId, type: 'p', name: 'TREŚĆ', text: variant === 'alert-success' ? 'Wszystkie systemy działają poprawnie.' : variant === 'alert-warning' ? 'Ta operacja jest nieodwracalna.' : variant === 'alert-tip' ? 'Kliknij dwukrotnie w obrazek, aby otworzyć Menedżer Mediów.' : 'Internal access should only be performed by qualified personnel in compliance with local electrical safety regulations and OHS standards.', styles: { color: textColor, fontWeight: '600', fontSize: '14px', lineHeight: '1.6', margin: 0, width: '100%', padding: '30px 20px 20px 25px', overflowY: 'auto', flex: '1', clearRow: true } } ]; }
  }

  // --- POZOSTAŁE KLOCKI ---
  if (type === 'list') {
    if (variant === 'steps') { newBlock.text = '<ol style="padding-left: 20px; list-style-type: decimal; font-size: 20px; font-weight: bold; display: flex; flex-direction: column; gap: 15px; margin: 0;"><li>Krok pierwszy<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Dokładny opis tego, co należy zrobić w pierwszym kroku.</div></li><li>Krok drugi<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Instrukcje do drugiego etapu procesu.</div></li><li>Krok trzeci<div style="font-size:14px; font-weight:normal; color:#666; margin-top:5px;">Zakończenie i podsumowanie akcji.</div></li></ol>'; newBlock.styles.backgroundColor = '#f9fafb'; newBlock.styles.padding = '30px'; newBlock.styles.borderRadius = '16px'; newBlock.styles.width = '100%'; } 
    else { newBlock.text = '<ul style="padding-left: 20px; list-style-type: disc; margin: 0;"><li>Pierwszy punkt</li><li>Drugi punkt</li><li>Trzeci punkt</li></ul>'; newBlock.styles.fontSize = '16px'; newBlock.styles.lineHeight = '2'; newBlock.styles.width = '100%'; }
  }
  if (type === 'faq') { newBlock.text = '▼ Pytanie FAQ<br><br>Odpowiedź.'; newBlock.styles.border = '1px solid #ccc'; newBlock.styles.padding = '15px'; newBlock.styles.backgroundColor = '#fff'; newBlock.styles.width = '100%'; }
  if (type === 'shape') { if(variant==='box'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#3b82f6';} if(variant==='circle'){newBlock.styles.width='100px'; newBlock.styles.height='100px'; newBlock.styles.backgroundColor='#ec4899'; newBlock.styles.borderRadius='50%';} }
  if (type === 'section') { newBlock.styles.width = '100%'; newBlock.styles.minHeight = '400px'; newBlock.styles.backgroundColor = '#ffffff'; newBlock.styles.clearRow = true; if (variant === 'video-hero') { newBlock.name = 'SEKCJA KINOWA'; newBlock.styles.minHeight = '600px'; newBlock.styles.bgType = 'video'; newBlock.styles.bgVideo = 'https://cdn.pixabay.com/video/2021/08/11/84687-586745129_large.mp4'; newBlock.styles.bgOverlay = 'rgba(0,0,0,0.5)'; newBlock.styles.alignItems = 'center'; newBlock.styles.justifyContent = 'center'; newBlock.children = [{ id: generateId(), type: 'h1', name: 'NAGŁÓWEK', text: 'KINO NA TWOJEJ STRONIE', styles: { color: '#ffffff', fontSize: '64px', fontWeight: '900', textAlign: 'center' } }]; } }
  if (type === 'grid' && variant === 'gallery-grid') { newBlock.styles.gridTemplateColumns = 'repeat(3, 1fr)'; newBlock.styles.gap = '20px'; newBlock.children = [createBlock('img', 'rounded', 'Foto 1'), createBlock('img', 'rounded', 'Foto 2'), createBlock('img', 'rounded', 'Foto 3')]; }
  if (type === 'video') { newBlock.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; newBlock.styles.width = '100%'; newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; newBlock.styles.backgroundColor = '#000'; newBlock.styles.overflow = 'hidden'; if (variant === 'youtube') { newBlock.src = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; } else if (variant === 'vimeo') { newBlock.src = 'https://vimeo.com/76979871'; } }
  if (type === 'embed') { newBlock.text = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.66487841855!2d16.92516811563456!3d51.10788527957199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe9c2d4b58abf%3A0xb70956aec205e0f5!2zV3JvY8WCYXc!5e0!3m2!1spl!2spl!4v1625560000000!5m2!1spl!2spl" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'; newBlock.styles.width = '100%'; newBlock.styles.height = '400px'; newBlock.styles.borderRadius = '12px'; }
  if (type === 'ribbon') { newBlock.styles.width = '100%'; newBlock.styles.backgroundColor = '#facc15'; newBlock.styles.padding = '20px 0'; newBlock.ribbonItems = [{ type: 'text', value: '🔥 WYPRZEDAŻ' }, { type: 'img', value: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' }, { type: 'text', value: 'DARMOWA DOSTAWA' }]; }

  return newBlock;
};