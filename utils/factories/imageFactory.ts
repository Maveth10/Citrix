import { FactoryContext } from '../blockFactory';

export const buildImage = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000); 

  // Baza
  block.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; 
  block.styles.width = '100%'; 
  block.styles.height = 'auto'; 
  block.styles.objectFit = 'cover'; 
  block.styles.imageScale = 1; 
  block.styles.position = 'relative';

  switch (variant) {
    // ==========================================
    // 📸 POJEDYNCZE MEDIA
    // ==========================================
    case 'rounded': 
      block.styles.borderRadius = '24px'; 
      block.styles.boxShadow = '0 30px 60px -15px rgba(0,0,0,0.5)'; 
      break;
    
    case 'avatar': 
      block.styles.width = '160px'; 
      block.styles.height = '160px'; 
      block.styles.borderRadius = '50%'; 
      block.styles.border = '4px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)';
      block.styles.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.5)'; 
      break;
    
    case 'polaroid': 
      block.styles.padding = '12px 12px 60px 12px'; 
      block.styles.backgroundColor = '#ffffff'; 
      block.styles.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.6)'; 
      block.styles.transform = 'rotate(-2deg)'; 
      block.styles.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      block.hoverStyles = { transform: 'rotate(0deg) scale(1.02)' };
      break;

    case 'glass-card':
      block.styles.padding = '16px';
      block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 3%, transparent)';
      block.styles.backdropFilter = 'blur(24px) saturate(180%)';
      block.styles.WebkitBackdropFilter = 'blur(24px) saturate(180%)';
      block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 10%, transparent)';
      block.styles.borderRadius = '32px';
      block.styles.boxShadow = '0 40px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 color-mix(in srgb, var(--canvas-text) 15%, transparent)';
      block.customCss = `#block-${block.id} img { border-radius: 20px; }`;
      break;

    // ==========================================
    // 🔮 KSZTAŁTY I MASKI
    // ==========================================
    case 'mask-arch': 
      block.styles.borderRadius = '500px 500px 0 0'; 
      block.styles.boxShadow = '0 30px 50px rgba(0,0,0,0.4)'; 
      break;
    
    case 'mask-blob': 
      block.styles.borderRadius = '40% 60% 70% 30% / 40% 40% 60% 50%'; 
      block.styles.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; 
      block.customCss = `@keyframes blobMorphImg_${rnd} { 0%,100%{border-radius:40% 60% 70% 30% / 40% 40% 60% 50%} 34%{border-radius:70% 30% 50% 50% / 30% 30% 70% 70%} 67%{border-radius:100% 60% 60% 100% / 100% 100% 60% 60%} } #block-${block.id} { animation: blobMorphImg_${rnd} 12s ease-in-out infinite alternate; overflow: hidden; }`;
      break;

    case 'mask-diamond':
      block.styles.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      block.styles.WebkitClipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      break;

    case 'mask-ticket':
      block.styles.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      block.styles.WebkitClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      block.styles.maskImage = 'radial-gradient(circle at 0 50%, transparent 25px, black 26px), radial-gradient(circle at 100% 50%, transparent 25px, black 26px)';
      block.styles.WebkitMaskImage = 'radial-gradient(circle at 0 50%, transparent 25px, black 26px), radial-gradient(circle at 100% 50%, transparent 25px, black 26px)';
      block.styles.maskComposite = 'intersect';
      block.styles.WebkitMaskComposite = 'source-in';
      break;

    // ==========================================
    // 🚀 EFEKTY INTERAKTYWNE (Obejście systemu)
    // ==========================================
    case 'effect-duotone':
      block.type = 'graphic'; 
      block.styles.padding = '0';
      block.text = `
        <style>
          .img-fx-duo-${rnd} { width: 100%; height: auto; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); filter: grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(300%) contrast(1.2) brightness(0.8); transition: filter 0.6s ease, transform 0.6s; display: block; }
          .img-fx-duo-${rnd}:hover { filter: grayscale(0%) sepia(0%) hue-rotate(0deg) saturate(100%) contrast(1) brightness(1); transform: scale(1.03); }
        </style>
        <img class="img-fx-duo-${rnd}" src="${block.src}"/>
      `;
      break;

    case 'effect-reveal':
      block.type = 'graphic';
      block.styles.padding = '0';
      block.text = `
        <style>
          .reveal-wrap-${rnd} { position: relative; width: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); cursor: crosshair; }
          .reveal-img-${rnd} { width: 100%; height: auto; filter: grayscale(100%) brightness(0.6) contrast(1.4); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); display: block; }
          .reveal-wrap-${rnd}:hover .reveal-img-${rnd} { filter: grayscale(0%) brightness(1) contrast(1); transform: scale(1.08); }
          .reveal-wrap-${rnd}::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent, var(--theme-color), transparent); height: 10px; opacity: 0; transform: translateY(-100px); pointer-events: none; mix-blend-mode: overlay; transition: 0.1s; box-shadow: 0 0 20px var(--theme-color); }
          .reveal-wrap-${rnd}:hover::after { opacity: 0.8; transform: translateY(800px); transition: transform 1.5s ease-in-out; }
        </style>
        <div class="reveal-wrap-${rnd}"><img class="reveal-img-${rnd}" src="${block.src}"/></div>
      `;
      break;

    case 'effect-zoom':
      block.type = 'graphic';
      block.styles.padding = '0';
      block.text = `
        <style>
          .zoom-wrap-${rnd} { width: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
          .zoom-img-${rnd} { width: 100%; height: auto; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); display: block; }
          .zoom-wrap-${rnd}:hover .zoom-img-${rnd} { transform: scale(1.15) rotate(2deg); }
        </style>
        <div class="zoom-wrap-${rnd}"><img class="zoom-img-${rnd}" src="${block.src}"/></div>
      `;
      break;

    case 'effect-glitch':
      // 🔥 SMOOTH CHROMATIC ABERRATION 🔥 (Zamiast drgawek)
      block.type = 'graphic';
      block.styles.padding = '0';
      block.text = `
        <style>
          .chromatic-wrap-${rnd} { width: 100%; border-radius: 16px; overflow: hidden; position: relative; cursor: crosshair; }
          .chromatic-img-${rnd} { width: 100%; height: auto; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s; display: block; filter: drop-shadow(0 0 0 transparent); }
          @keyframes smoothRGB_${rnd} {
            0% { filter: drop-shadow(-2px 0 0 rgba(255,0,0,0.7)) drop-shadow(2px 0 0 rgba(0,255,255,0.7)); }
            50% { filter: drop-shadow(-4px 0 0 rgba(255,0,0,0.7)) drop-shadow(4px 0 0 rgba(0,255,255,0.7)); }
            100% { filter: drop-shadow(-2px 0 0 rgba(255,0,0,0.7)) drop-shadow(2px 0 0 rgba(0,255,255,0.7)); }
          }
          @keyframes scanOverlay_${rnd} { 0% { top: -20%; } 100% { top: 120%; } }
          .chromatic-wrap-${rnd}::after {
            content: ''; position: absolute; left: 0; width: 100%; height: 20%; top: -100%;
            background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent);
            mix-blend-mode: overlay; pointer-events: none; opacity: 0; transition: opacity 0.3s;
          }
          .chromatic-wrap-${rnd}:hover .chromatic-img-${rnd} { animation: smoothRGB_${rnd} 1.5s ease-in-out infinite; transform: scale(1.03); }
          .chromatic-wrap-${rnd}:hover::after { opacity: 1; animation: scanOverlay_${rnd} 2s linear infinite; }
        </style>
        <div class="chromatic-wrap-${rnd}"><img class="chromatic-img-${rnd}" src="${block.src}"/></div>
      `;
      break;
  }

  return block;
};