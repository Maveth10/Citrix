import { FactoryContext } from '../blockFactory';

export const buildImage = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000); 

  block.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'; 
  block.styles.width = '100%'; 
  block.styles.height = 'auto'; 
  block.styles.objectFit = 'cover'; 
  block.styles.imageScale = 1; 
  block.styles.position = 'relative';

  switch (variant) {
    case 'rounded': 
      block.styles.borderRadius = '24px'; 
      block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)'; 
      break;
    
    case 'avatar': 
      block.styles.width = '150px'; 
      block.styles.height = '150px'; 
      block.styles.borderRadius = '50%'; 
      block.styles.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)'; 
      break;
    
    case 'polaroid': 
      block.styles.padding = '12px 12px 50px 12px'; 
      block.styles.backgroundColor = '#ffffff'; 
      block.styles.boxShadow = '0 15px 30px -5px rgba(0,0,0,0.3)'; 
      block.styles.transform = 'rotate(-3deg)'; 
      break;

    case 'glass-card':
      block.styles.padding = '10px';
      block.styles.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      block.styles.backdropFilter = 'blur(16px)';
      block.styles.WebkitBackdropFilter = 'blur(16px)';
      block.styles.border = '1px solid rgba(255, 255, 255, 0.2)';
      block.styles.borderRadius = '24px';
      block.styles.boxShadow = '0 30px 50px -12px rgba(0,0,0,0.25)';
      break;

    case 'mask-arch': 
      block.styles.borderRadius = '500px 500px 0 0'; 
      block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; 
      break;
    
    case 'mask-blob': 
      block.styles.borderRadius = '40% 60% 70% 30% / 40% 40% 60% 50%'; 
      block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; 
      block.customCss = `@keyframes blob_${rnd} { 0%,100%{border-radius:40% 60% 70% 30% / 40% 40% 60% 50%} 34%{border-radius:70% 30% 50% 50% / 30% 30% 70% 70%} 67%{border-radius:100% 60% 60% 100% / 100% 100% 60% 60%} } #block-${block.id} { animation: blob_${rnd} 10s ease-in-out infinite alternate; overflow: hidden; }`;
      break;

    case 'mask-diamond':
      block.styles.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      block.styles.WebkitClipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      break;

    case 'mask-ticket':
      block.styles.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      block.styles.WebkitClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      block.styles.maskImage = 'radial-gradient(circle at 0 50%, transparent 20px, black 21px), radial-gradient(circle at 100% 50%, transparent 20px, black 21px)';
      block.styles.WebkitMaskImage = 'radial-gradient(circle at 0 50%, transparent 20px, black 21px), radial-gradient(circle at 100% 50%, transparent 20px, black 21px)';
      block.styles.maskComposite = 'intersect';
      block.styles.WebkitMaskComposite = 'source-in';
      break;

    // 🔥 NAPRAWIONE EFEKTY INTERAKTYWNE 🔥
    case 'effect-duotone':
      block.styles.borderRadius = '16px';
      block.customCss = `#block-${block.id} img { filter: grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(300%) contrast(1.2) !important; }`;
      break;

    case 'effect-reveal':
      block.styles.borderRadius = '16px';
      block.customCss = `#block-${block.id} img { filter: grayscale(100%) contrast(1.2) !important; transition: filter 0.5s ease !important; } #block-${block.id}:hover img { filter: grayscale(0%) contrast(1) !important; }`;
      break;

    case 'effect-zoom':
      block.styles.borderRadius = '16px';
      block.styles.overflow = 'hidden';
      block.customCss = `#block-${block.id} img { transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important; } #block-${block.id}:hover img { transform: scale(1.15) !important; }`;
      break;

    case 'effect-glitch':
      block.styles.borderRadius = '12px';
      block.styles.overflow = 'hidden';
      block.customCss = `
        @keyframes imgGlitch_${rnd} {
          0% { transform: translate(0) skew(0deg); filter: drop-shadow(-4px 0 red) drop-shadow(4px 0 cyan); }
          20% { transform: translate(-4px, 4px) skew(-5deg); filter: none; }
          40% { transform: translate(4px, -4px) skew(5deg); filter: drop-shadow(-4px 0 red) drop-shadow(4px 0 cyan); }
          60% { transform: translate(-4px, 4px) skew(0deg); filter: none; }
          80% { transform: translate(4px, -4px) skew(5deg); filter: drop-shadow(-4px 0 red) drop-shadow(4px 0 cyan); }
          100% { transform: translate(0) skew(0deg); filter: none; }
        }
        #block-${block.id}:hover img { animation: imgGlitch_${rnd} 0.3s linear infinite both !important; }
      `;
      break;
  }

  return block;
};