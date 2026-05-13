import { FactoryContext } from '../blockFactory';

export const buildButton = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000); 
  
  // ==========================================
  // BAZA: ABSOLUTNA PERFEKCJA KINETYCZNA
  // ==========================================
  block.styles.width = 'max-content';
  block.styles.cursor = 'pointer';
  block.styles.display = 'inline-flex';
  block.styles.alignItems = 'center';
  block.styles.justifyContent = 'center';
  block.styles.userSelect = 'none';
  block.styles.textDecoration = 'none';
  block.styles.position = 'relative';
  block.styles.overflow = 'visible'; 
  block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
  block.styles.WebkitFontSmoothing = 'antialiased';

  // Globalny efekt wciśnięcia (Micro-interaction)
  block.customCss = `#block-${block.id}:active { transform: scale(0.92) !important; transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important; }`;

  switch (variant) {
    // ==========================================
    // 💎 LUKSUS & MINIMAL (Apple Vision Pro & Haute Couture)
    // ==========================================
    case 'apple':
      // 🔥 ADAPTIVE: Automatycznie dopasowuje się do ciemnego/jasnego tła
      block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 3%, transparent)';
      block.styles.color = 'var(--canvas-text)';
      block.styles.padding = '16px 40px';
      block.styles.borderRadius = '999px';
      block.styles.fontWeight = '600';
      block.styles.fontSize = '16px';
      block.styles.letterSpacing = '0.5px';
      block.styles.border = 'none'; 
      // Ultraszkło z refrakcją światła na krawędziach
      block.customCss += `
        #block-${block.id} {
          backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 color-mix(in srgb, var(--canvas-text) 15%, transparent), inset 0 -1px 0 color-mix(in srgb, var(--canvas-text) 5%, transparent);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #block-${block.id}::before {
          content: ''; position: absolute; inset: -1px; border-radius: 999px; padding: 1px;
          background: linear-gradient(135deg, color-mix(in srgb, var(--canvas-text) 30%, transparent) 0%, transparent 40%, transparent 60%, color-mix(in srgb, var(--canvas-text) 15%, transparent) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; z-index: -1;
        }
        #block-${block.id}:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.12), inset 0 2px 4px color-mix(in srgb, var(--canvas-text) 20%, transparent);
          background-color: color-mix(in srgb, var(--canvas-text) 8%, transparent);
        }
      `;
      block.text = 'Vision Pro UI';
      break;

    case 'prada':
      block.styles.backgroundColor = '#000000';
      block.styles.color = '#ffffff';
      block.styles.padding = '20px 50px';
      block.styles.fontWeight = '300';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '6px';
      block.styles.fontSize = '12px';
      block.styles.overflow = 'hidden';
      // Mroczna elegancja: wypełnienie inwersyjne ostre jak brzytwa
      block.customCss += `
        #block-${block.id} { border: 1px solid rgba(255,255,255,0.1); transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1); z-index: 1; }
        #block-${block.id}::before {
          content: ''; position: absolute; inset: 0; background: #ffffff; z-index: -1;
          transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        #block-${block.id}:hover { color: #000000; letter-spacing: 12px; padding-left: 56px; padding-right: 44px; border-color: #fff; box-shadow: 0 20px 40px rgba(255,255,255,0.1); }
        #block-${block.id}:hover::before { transform: translateY(0); }
      `;
      block.text = 'HAUTE COUTURE';
      break;

    case 'luxury-outline':
      block.styles.backgroundColor = 'transparent';
      block.styles.color = '#d4af37'; 
      block.styles.padding = '18px 45px';
      block.styles.fontWeight = '600';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '4px';
      block.styles.fontSize = '12px';
      block.styles.border = '1px solid transparent';
      // Animacja obwodu ze złotą iskrą
      block.customCss += `
        #block-${block.id} { transition: all 0.5s ease; }
        #block-${block.id}::before {
          content: ''; position: absolute; inset: 0; border: 1px solid #d4af37; opacity: 0.3; transition: all 0.5s ease;
        }
        #block-${block.id}::after {
          content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border: 1px solid transparent;
          background: linear-gradient(45deg, transparent 20%, #ffdf73 50%, transparent 80%) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.5s ease;
        }
        #block-${block.id}:hover { color: #fff; background-color: rgba(212, 175, 55, 0.1); box-shadow: 0 0 30px rgba(212, 175, 55, 0.3); text-shadow: 0 0 10px rgba(255,223,115,0.8); }
        #block-${block.id}:hover::before { transform: scale(1.05); opacity: 0; }
        #block-${block.id}:hover::after { opacity: 1; animation: goldShimmer_${rnd} 2s linear infinite; }
        @keyframes goldShimmer_${rnd} { 0% { background-position: 0% 0%; } 100% { background-position: 200% 200%; } }
      `;
      block.text = 'Royal Gold';
      break;

    case 'glass':
      // 🔥 ADAPTIVE: Automatycznie widoczny na białym i czarnym
      block.styles.backgroundColor = 'transparent';
      block.styles.color = 'var(--canvas-text)';
      block.styles.padding = '16px 40px';
      block.styles.borderRadius = '16px';
      block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 15%, transparent)';
      block.styles.fontWeight = '700';
      block.customCss += `
        #block-${block.id} {
          background: linear-gradient(135deg, color-mix(in srgb, var(--canvas-text) 5%, transparent), transparent);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); overflow: hidden;
          box-shadow: inset 0 1px 1px color-mix(in srgb, var(--canvas-text) 15%, transparent), 0 10px 30px rgba(0,0,0,0.05); z-index: 1;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        #block-${block.id}::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, color-mix(in srgb, var(--canvas-text) 10%, transparent) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: -1; transform: scale(0.5);
        }
        #block-${block.id}:hover {
          border-color: color-mix(in srgb, var(--canvas-text) 30%, transparent);
          box-shadow: inset 0 1px 2px color-mix(in srgb, var(--canvas-text) 30%, transparent), 0 20px 40px rgba(0,0,0,0.1);
          transform: translateY(-5px) !important; letter-spacing: 1px;
        }
        #block-${block.id}:hover::before { opacity: 1; transform: scale(1); transition: transform 0.8s ease-out, opacity 0.3s; }
      `;
      block.text = 'Liquid Glass';
      break;

    // ==========================================
    // 🚀 SCI-FI & CYBERPUNK (Rozwala system)
    // ==========================================
    case 'btn-glow':
      block.styles.backgroundColor = '#0a0a0c'; // Ciemne tło wymuszone, aby neonowy tekst uderzał po oczach
      block.styles.padding = '18px 44px'; 
      block.styles.borderRadius = '16px'; 
      block.styles.border = '1px solid #222';
      block.styles.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
      // 🔥 MAGIC GLOW TYLKO NA TEKŚCIE 🔥
      block.customCss += `
        @keyframes textAura_${rnd} { 
          0% { background-position: 0% 50%; filter: hue-rotate(0deg); } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; filter: hue-rotate(360deg); } 
        }
        #block-${block.id} { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s; }
        #block-${block.id}:hover { transform: scale(1.05) translateY(-4px) !important; border-color: #444; }
        
        .quantum-txt-${rnd} {
          position: relative; display: inline-block;
          font-weight: 900; font-size: 16px; letter-spacing: 1px;
          background: linear-gradient(90deg, #ff0055, #00f2ff, #7000ff, #ff0055, #00f2ff);
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: textAura_${rnd} 3s linear infinite; z-index: 2;
        }
        .quantum-txt-${rnd}::after {
          content: attr(data-text); position: absolute; left: 0; top: 0; width: 100%; height: 100%;
          background: inherit; background-size: inherit; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          filter: blur(12px); opacity: 0.8; z-index: -1; animation: textAura_${rnd} 3s linear infinite;
        }
        #block-${block.id}:hover .quantum-txt-${rnd}::after { filter: blur(20px); opacity: 1; }
      `;
      block.text = `<span class="quantum-txt-${rnd}" data-text="QUANTUM TEXT">QUANTUM TEXT</span>`;
      break;

    case 'neon':
      block.styles.backgroundColor = '#000';
      block.styles.color = '#39ff14'; // Toksyczna zieleń Cyberpunk
      block.styles.padding = '16px 40px';
      block.styles.borderRadius = '8px';
      block.styles.border = '2px solid #39ff14';
      block.styles.fontWeight = '900';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '3px';
      // Agresywny neon z błędem świetlówki
      block.customCss += `
        @keyframes neonFlicker_${rnd} { 
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #39ff14, 0 0 20px #39ff14; box-shadow: 0 0 10px #39ff14, inset 0 0 10px #39ff14; } 
          20%, 22%, 24%, 55% { text-shadow: none; box-shadow: none; } 
        }
        #block-${block.id} { animation: neonFlicker_${rnd} 3s infinite alternate; transition: all 0.2s; }
        #block-${block.id}::before { content: ''; position: absolute; top: 120%; left: 10%; width: 80%; height: 20px; background: #39ff14; filter: blur(30px) opacity(0.2); transform: perspective(1em) rotateX(40deg); pointer-events: none; transition: 0.3s; }
        #block-${block.id}:hover { background-color: #39ff14; color: #000; box-shadow: 0 0 50px #39ff14, inset 0 0 20px rgba(0,0,0,0.5) !important; text-shadow: none !important; animation: none; transform: translateY(-3px) !important; }
        #block-${block.id}:hover::before { filter: blur(40px) opacity(0.6); }
      `;
      block.text = 'OVERDRIVE';
      break;

    case 'glitch':
      block.styles.backgroundColor = 'transparent';
      block.styles.color = '#ffffff';
      block.styles.padding = '18px 48px';
      block.styles.fontWeight = '900';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '4px';
      // Najbardziej brutalny efekt CSS Glitcha. Rozszczepienie kanałów RGB.
      block.customCss += `
        .glitch-wrapper-${rnd} { position: relative; display: inline-block; background: #ff003c; padding: 18px 48px; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 20px rgba(255,0,60,0.3); transition: all 0.1s; }
        #block-${block.id} { padding: 0 !important; border: none !important; }
        #block-${block.id}:hover .glitch-wrapper-${rnd} { background: #000; color: transparent; box-shadow: 0 0 0 transparent; }
        #block-${block.id}:hover .glitch-wrapper-${rnd}::before, #block-${block.id}:hover .glitch-wrapper-${rnd}::after {
          content: 'SYSTEM FATAL'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #000; color: white; mix-blend-mode: screen;
        }
        #block-${block.id}:hover .glitch-wrapper-${rnd}::before { left: 5px; text-shadow: -3px 0 #00ffff; animation: glitch-cut-1_${rnd} 0.1s infinite linear alternate-reverse; clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%); z-index: 2; }
        #block-${block.id}:hover .glitch-wrapper-${rnd}::after { left: -5px; text-shadow: 3px 0 #ff00ff; animation: glitch-cut-2_${rnd} 0.15s infinite linear alternate-reverse; clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); z-index: 3; }
        @keyframes glitch-cut-1_${rnd} { 0% { transform: translateX(-8px) skewX(10deg); } 100% { transform: translateX(8px) skewX(-10deg); } }
        @keyframes glitch-cut-2_${rnd} { 0% { transform: translateX(8px) skewX(-10deg); } 100% { transform: translateX(-8px) skewX(10deg); } }
      `;
      block.text = `<div class="glitch-wrapper-${rnd}">SYSTEM FATAL</div>`;
      break;

    case 'matrix':
      block.styles.backgroundColor = '#000000';
      block.styles.color = '#00ff00';
      block.styles.padding = '16px 40px';
      block.styles.border = '2px solid #00ff00';
      block.styles.fontFamily = '"Courier New", Courier, monospace';
      block.styles.fontWeight = 'bold';
      block.styles.fontSize = '18px';
      block.styles.boxShadow = '0 0 10px rgba(0,255,0,0.2)';
      // Animacja tekstu kodującego (CSS steps)
      block.customCss += `
        #block-${block.id} { overflow: hidden; transition: all 0.3s; }
        #block-${block.id} .matrix-text { display: inline-block; position: relative; }
        #block-${block.id}:hover { background-color: #00ff00; color: #000; box-shadow: 0 0 30px #00ff00, inset 0 0 20px #000; transform: scale(1.05) !important; }
        #block-${block.id}:hover .matrix-text::after { content: '101010110'; position: absolute; inset: 0; background: #00ff00; color: #000; animation: decode_${rnd} 0.4s steps(5) forwards; }
        @keyframes decode_${rnd} { 0% { content: '#$%@*&^!'; } 30% { content: '10101011'; } 60% { content: 'INIT...'; } 100% { content: 'CONNECTED'; } }
      `;
      block.text = `<span class="matrix-text">ESTABLISH LINK</span>`;
      break;

    // ==========================================
    // 🕹️ KINETYCZNE & 3D (Prawdziwe CSS 3D Transforms)
    // ==========================================
    case 'btn-3d':
      const thicc = '12px';
      block.styles.backgroundColor = 'var(--theme-color, #3b82f6)'; 
      block.styles.color = '#ffffff'; 
      block.styles.padding = '16px 40px'; 
      block.styles.borderRadius = '16px'; 
      block.styles.fontWeight = '900'; 
      block.styles.fontSize = '18px';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '1px';
      // Fizyczny blok z zachowaniem 3D i cieniem z rzutowania
      block.styles.borderBottom = `${thicc} solid color-mix(in srgb, var(--theme-color) 60%, black)`; 
      block.styles.boxShadow = `0 ${thicc} 0 color-mix(in srgb, var(--theme-color) 30%, black), 0 20px 30px rgba(0,0,0,0.5)`;
      block.styles.transition = 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
      block.customCss += `
        #block-${block.id}:hover { filter: brightness(1.15); transform: translateY(-4px) !important; box-shadow: 0 ${parseInt(thicc)+4}px 0 color-mix(in srgb, var(--theme-color) 60%, black), 0 30px 40px rgba(0,0,0,0.6) !important; }
        #block-${block.id}:active {
          transform: translateY(${thicc}) scale(0.98) !important;
          border-bottom-width: 0px !important;
          box-shadow: 0 0px 0 color-mix(in srgb, var(--theme-color) 60%, black), 0 5px 10px rgba(0,0,0,0.4) !important;
          margin-bottom: ${thicc} !important;
        }
      `;
      block.text = 'HYPER TACTILE';
      break;

    case 'btn-shine':
      block.styles.backgroundColor = '#1e1e1e'; 
      block.styles.color = '#ffffff'; 
      block.styles.padding = '16px 40px'; 
      block.styles.borderRadius = '12px'; 
      block.styles.fontWeight = '800'; 
      block.styles.fontSize = '16px';
      block.styles.overflow = 'hidden'; 
      block.styles.border = '1px solid rgba(255,255,255,0.1)';
      block.styles.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
      // Eksplozja światła na krawędziach
      block.customCss += `
        @keyframes sweep_${rnd} { 0% { transform: translateX(-150%) skewX(-45deg); } 100% { transform: translateX(200%) skewX(-45deg); } }
        #block-${block.id} { background: linear-gradient(180deg, #1a1a1a 0%, #000 100%); transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        #block-${block.id}::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transform: skewX(-20deg); transition: 0.5s; z-index: 1; pointer-events: none;
        }
        #block-${block.id}::after {
          content: ''; position: absolute; inset: -2px; border-radius: 18px; background: linear-gradient(45deg, transparent, #fff, transparent);
          opacity: 0; transition: 0.4s; z-index: -1; filter: blur(8px);
        }
        #block-${block.id}:hover { transform: translateY(-5px) scale(1.02) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); text-shadow: 0 0 10px #fff; }
        #block-${block.id}:hover::before { left: 200%; transition: 0.7s ease-in-out; }
        #block-${block.id}:hover::after { opacity: 1; }
      `;
      block.text = 'SUPERNOVA SWEEP';
      break;

    case 'btn-pulse':
      block.styles.backgroundColor = 'var(--theme-color, #ff4500)'; 
      block.styles.color = '#ffffff'; 
      block.styles.padding = '20px 50px'; 
      block.styles.borderRadius = '999px'; 
      block.styles.fontWeight = '900';
      block.styles.fontSize = '18px';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '2px';
      // Hiper-aktywny puls, rosnący przy najeździe
      block.customCss += `
        @keyframes warpDrive_${rnd} { 
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--theme-color) 80%, transparent), 0 0 0 0 color-mix(in srgb, var(--theme-color) 60%, transparent); } 
          100% { box-shadow: 0 0 0 20px color-mix(in srgb, var(--theme-color) 0%, transparent), 0 0 0 40px color-mix(in srgb, var(--theme-color) 0%, transparent); } 
        }
        #block-${block.id} { animation: warpDrive_${rnd} 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite; }
        #block-${block.id}:hover { animation-duration: 0.5s; transform: scale(1.08) translateY(-4px) !important; background-color: color-mix(in srgb, var(--theme-color) 120%, white); color: #000; }
      `;
      block.text = 'WARP DRIVE';
      break;

    case 'magnetic':
      block.styles.backgroundColor = '#ffffff';
      block.styles.color = '#000000';
      block.styles.padding = '18px 44px';
      block.styles.borderRadius = '999px';
      block.styles.fontWeight = '900';
      block.styles.fontSize = '16px';
      // Agresywny Hover Float symulujący przyklejenie do kursora
      block.customCss += `
        #block-${block.id} { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        #block-${block.id}:hover {
          transform: scale(1.15) translateY(-10px) rotate(-3deg) !important;
          box-shadow: 15px 30px 40px rgba(0,0,0,0.15), inset 0 0 0 4px var(--theme-color);
          color: var(--theme-color);
        }
      `;
      block.text = 'MAGNETIC PULL';
      break;

    // ==========================================
    // 🎨 NOWOCZESNY WEB (Trendy z najwyższej półki)
    // ==========================================
    case 'btn-brutal':
      const brutalHeavy = '10px';
      block.styles.backgroundColor = '#a3e635'; 
      block.styles.color = '#000000'; 
      block.styles.padding = '20px 40px'; 
      block.styles.fontWeight = '900'; 
      block.styles.fontSize = '20px';
      block.styles.textTransform = 'uppercase'; 
      block.styles.letterSpacing = '3px'; 
      // Skrajnie twardy neo-brutalizm z komiksowym, ruchomym cieniem
      block.styles.border = '5px solid #000000'; 
      block.styles.boxShadow = `${brutalHeavy} ${brutalHeavy} 0px #000000`; 
      block.customCss += `
        #block-${block.id} { transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); }
        #block-${block.id}:hover { transform: translate(-4px, -4px) !important; box-shadow: 14px 14px 0px #000000 !important; background-color: #f43f5e; color: #fff; }
        #block-${block.id}:active { transform: translate(${brutalHeavy}, ${brutalHeavy}) scale(1) !important; box-shadow: 0px 0px 0px #000000 !important; transition: all 0.05s !important; }
      `;
      block.text = 'ABSOLUTE BRUTAL';
      break;

    case 'gradient':
      block.styles.color = '#ffffff';
      block.styles.padding = '18px 44px';
      block.styles.borderRadius = '16px';
      block.styles.fontWeight = '900';
      block.styles.fontSize = '18px';
      block.styles.border = 'none';
      // Fluid Mesh Gradient (Płynąca plazma w tle i świecąca ramka)
      block.customCss += `
        @keyframes fluidMesh_${rnd} { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        #block-${block.id} {
          background: linear-gradient(-45deg, #ff4500, #ff0055, #9333ea, #3b82f6);
          background-size: 400% 400%; animation: fluidMesh_${rnd} 6s ease infinite; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #block-${block.id}::before { content: ''; position: absolute; inset: -5px; background: inherit; filter: blur(20px); opacity: 0; transition: opacity 0.5s; z-index: -1; border-radius: inherit; }
        #block-${block.id}:hover::before { opacity: 0.8; }
        #block-${block.id}:hover { transform: translateY(-5px) scale(1.03) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4); letter-spacing: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
      `;
      block.text = 'FLUID PLASMA';
      break;

    case 'pill':
      block.styles.backgroundColor = 'var(--theme-color, #3b82f6)';
      block.styles.color = '#ffffff';
      block.styles.padding = '18px 56px';
      block.styles.borderRadius = '999px';
      block.styles.fontWeight = '800';
      block.styles.fontSize = '18px';
      block.styles.border = 'none';
      // Soczysta pigułka z ultra-głębokim cieniem wewnętrznym
      block.styles.boxShadow = '0 10px 20px color-mix(in srgb, var(--theme-color) 40%, transparent), inset 0 -4px 0 rgba(0,0,0,0.2), inset 0 4px 0 rgba(255,255,255,0.3)';
      block.customCss += `
        #block-${block.id}:hover { filter: brightness(1.15); transform: translateY(-4px) !important; box-shadow: 0 20px 30px color-mix(in srgb, var(--theme-color) 50%, transparent), inset 0 -4px 0 rgba(0,0,0,0.2), inset 0 4px 0 rgba(255,255,255,0.4); }
        #block-${block.id}:active { transform: translateY(2px) !important; box-shadow: 0 5px 10px color-mix(in srgb, var(--theme-color) 30%, transparent), inset 0 4px 8px rgba(0,0,0,0.4); }
      `;
      block.text = 'Perfect Pill';
      break;

    case 'classic':
    default:
      block.styles.backgroundColor = '#ffffff';
      block.styles.color = '#0f172a';
      block.styles.padding = '16px 40px';
      block.styles.borderRadius = '12px';
      block.styles.fontWeight = '700';
      block.styles.fontSize = '16px';
      block.styles.border = '1px solid #e2e8f0';
      block.styles.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      block.customCss += `
        #block-${block.id}:hover { border-color: #94a3b8; background-color: #f8fafc; box-shadow: 0 15px 30px rgba(0,0,0,0.1); transform: translateY(-3px) !important; }
      `;
      block.text = 'Classic Standard';
      break;
  }

  return block;
};