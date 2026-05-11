import { FactoryContext } from '../blockFactory';

export const buildPopup = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.position = 'absolute';
  block.styles.zIndex = 99999;
  block.styles.clearRow = false;

  if (variant === 'modal-promo') {
    block.name = 'PROMO MODAL';
    block.styles.top = '0px'; block.styles.left = '0px'; block.styles.width = '100%'; block.styles.height = '100%';
    block.styles.backgroundColor = 'rgba(0, 0, 0, 0.7)'; block.styles.backdropFilter = 'blur(6px)';
    block.styles.display = 'flex'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'center';
    block.styles.padding = '20px';

    const card = ctx.createBlock('container', 'shadow-pro', 'Karta Modala');
    card.styles.width = '100%'; card.styles.maxWidth = '450px'; card.styles.padding = '50px 30px'; card.styles.alignItems = 'center'; card.styles.gap = '15px';
    
    const badge = ctx.createBlock('p', 'eyebrow', 'Etykieta'); badge.text = 'OFERTA SPECJALNA'; badge.styles.textAlign = 'center';
    const h2 = ctx.createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Odbierz -20% na start!'; h2.styles.textAlign = 'center'; h2.styles.marginBottom = '5px';
    const p = ctx.createBlock('p', 'classic', 'Tekst'); p.text = 'Zapisz się do newslettera i zyskaj kod rabatowy od razu na swoją skrzynkę.'; p.styles.textAlign = 'center';
    const btn = ctx.createBlock('button', 'gradient', 'Przycisk'); btn.text = 'Odbierz Zniżkę'; btn.styles.width = '100%'; btn.styles.marginTop = '10px';
    const cancel = ctx.createBlock('button', 'ghost', 'Anuluj'); cancel.text = 'Nie, dziękuję';
    
    card.children = [badge, h2, p, btn, cancel];
    block.children = [card];
  }
  else if (variant === 'modal-newsletter') {
    block.name = 'NEWSLETTER MODAL';
    block.styles.top = '0px'; block.styles.left = '0px'; block.styles.width = '100%'; block.styles.height = '100%';
    block.styles.backgroundColor = 'rgba(15, 23, 42, 0.8)'; block.styles.backdropFilter = 'blur(4px)';
    block.styles.display = 'flex'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'center';
    
    const card = ctx.createBlock('container', 'shadow-pro', 'Karta Modala');
    card.styles.width = '100%'; card.styles.maxWidth = '500px'; card.styles.padding = '40px'; card.styles.gap = '20px';
    
    const h2 = ctx.createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Bądź na bieżąco';
    const form = ctx.createBlock('form', 'newsletter', 'Formularz'); form.styles.flexDirection = 'column'; form.styles.width = '100%';
    
    card.children = [h2, form];
    block.children = [card];
  }
  else if (variant === 'cookie-banner') {
    block.name = 'COOKIE BANNER';
    block.styles.top = 'auto'; block.styles.bottom = '20px'; block.styles.left = '20px'; block.styles.right = '20px'; block.styles.width = 'auto'; block.styles.height = 'auto';
    block.styles.backgroundColor = '#0f172a'; block.styles.borderRadius = '16px'; block.styles.padding = '20px 30px'; block.styles.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)';
    block.styles.display = 'flex'; block.styles.flexDirection = 'row'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'space-between'; block.styles.gap = '20px';
    
    const p = ctx.createBlock('p', 'classic', 'Tekst'); p.text = '🍪 Ta strona używa ciasteczek w celu zapewnienia najlepszego doświadczenia z korzystania z serwisu.'; p.styles.color = '#cbd5e1'; p.styles.margin = '0'; p.styles.fontSize = '14px';
    const btn = ctx.createBlock('button', 'classic', 'Akceptuj'); btn.text = 'Akceptuję'; btn.styles.backgroundColor = '#3b82f6'; btn.styles.padding = '10px 24px';
    
    block.children = [p, btn];
  }
  else if (variant === 'toast-alert') {
    block.name = 'TOAST ALERTS';
    block.styles.top = '20px'; block.styles.bottom = 'auto'; block.styles.right = '20px'; block.styles.left = 'auto'; block.styles.width = '350px'; block.styles.height = 'auto';
    block.styles.backgroundColor = '#ffffff'; block.styles.borderRadius = '12px'; block.styles.padding = '20px'; block.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
    block.styles.borderLeft = '4px solid #10b981';
    block.styles.display = 'flex'; block.styles.flexDirection = 'column'; block.styles.gap = '5px';
    
    const h = ctx.createBlock('p', 'classic', 'Tytuł'); h.text = 'Sukces!'; h.styles.fontWeight = '800'; h.styles.margin = '0'; h.styles.color = '#0f172a';
    const p = ctx.createBlock('p', 'classic', 'Tekst'); p.text = 'Twoje zmiany zostały pomyślnie zapisane.'; p.styles.margin = '0'; p.styles.fontSize = '13px'; p.styles.color = '#64748b';
    
    block.children = [h, p];
  }
  else if (variant === 'video-modal') {
    block.name = 'VIDEO MODAL';
    block.styles.top = '0px'; block.styles.left = '0px'; block.styles.width = '100%'; block.styles.height = '100%';
    block.styles.backgroundColor = 'rgba(0, 0, 0, 0.85)'; block.styles.backdropFilter = 'blur(8px)';
    block.styles.display = 'flex'; block.styles.alignItems = 'center'; block.styles.justifyContent = 'center';
    block.styles.padding = '20px';

    const card = ctx.createBlock('container', 'empty', 'Kontener Wideo');
    card.styles.width = '100%'; card.styles.maxWidth = '900px'; card.styles.padding = '0px'; card.styles.backgroundColor = 'transparent'; card.styles.border = 'none'; card.styles.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)'; card.styles.overflow = 'hidden'; card.styles.borderRadius = '16px';
    
    const vid = ctx.createBlock('video', 'youtube', 'Wideo');
    vid.styles.height = '500px'; vid.styles.borderRadius = '0px';
    
    const cancel = ctx.createBlock('button', 'ghost', 'Zamknij'); 
    cancel.text = 'Zamknij'; cancel.styles.color = 'white'; cancel.styles.marginTop = '15px'; cancel.styles.alignSelf = 'center';

    card.children = [vid];
    block.children = [card, cancel];
  }

  return block;
};