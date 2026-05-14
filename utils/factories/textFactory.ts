import { FactoryContext } from '../blockFactory';

export const buildText = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000);

  // Globalny Reset dla tekstów
  block.styles.margin = '0';
  block.styles.padding = '0';
  block.styles.width = '100%';

  switch (variant) {
    // ==========================================
    // 👑 TYTUŁY (HEADINGS)
    // ==========================================
    case 'hero':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.lineHeight = '1.05';
      block.styles.letterSpacing = '-0.04em';
      block.styles.marginBottom = '1.5rem';
      block.styles.color = 'var(--canvas-text)';
      block.text = 'Odkryj potęgę designu.';
      break;

    case 'swiss-minimal':
      block.styles.fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
      block.styles.fontSize = '5rem';
      block.styles.fontWeight = '700';
      block.styles.lineHeight = '1';
      block.styles.letterSpacing = '-0.05em';
      block.styles.marginBottom = '1rem';
      block.styles.color = 'var(--canvas-text)';
      block.text = 'Less is more.';
      break;

    case 'metallic':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4rem';
      block.styles.fontWeight = '800';
      block.styles.lineHeight = '1.2';
      block.styles.letterSpacing = '-0.02em';
      block.styles.marginBottom = '1rem';
      block.styles.backgroundImage = 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)';
      block.styles.WebkitBackgroundClip = 'text';
      block.styles.WebkitTextFillColor = 'transparent';
      block.styles.color = 'transparent';
      block.text = 'Ekskluzywny Detal';
      break;

    // 🔥 NOWE: HOLOGRAPHIC FOIL 🔥
    case 'holographic':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.letterSpacing = '-0.03em';
      block.text = `<style>
        @keyframes holoFlow_${rnd} { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .holo-txt-${rnd} {
          background: linear-gradient(100deg, #ff0055, #00f2ff, #7000ff, #ff0055, #00f2ff);
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: holoFlow_${rnd} 4s linear infinite; filter: drop-shadow(0 0 20px rgba(0, 242, 255, 0.4)); margin: 0; line-height: 1.1;
        }
      </style><div class="holo-txt-${rnd}">HOLOGRAPHIC</div>`;
      break;

    // 🔥 NOWE: AURORA MESH TEXT 🔥
    case 'aurora-text':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.letterSpacing = '-0.03em';
      block.text = `<style>
        @keyframes aurora_${rnd} { 0% { background-position: 0% 50%; filter: hue-rotate(0deg); } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; filter: hue-rotate(360deg); } }
        .aurora-txt-${rnd} {
          background: linear-gradient(270deg, var(--theme-color), #9333ea, #3b82f6, var(--theme-color));
          background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: aurora_${rnd} 8s ease infinite; margin: 0; line-height: 1.1; text-shadow: 0 0 30px color-mix(in srgb, var(--theme-color) 40%, transparent);
        }
      </style><div class="aurora-txt-${rnd}">AURORA MESH</div>`;
      break;

    case 'outline':
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.color = 'transparent';
      block.styles.WebkitTextStroke = '2px var(--canvas-text)';
      block.text = 'PUSTY KONTUR';
      break;

    case 'engraved':
      block.styles.fontSize = '5rem';
      block.styles.fontWeight = '900';
      block.styles.color = 'var(--canvas-text)';
      block.styles.opacity = '0.7';
      block.styles.textShadow = '1px 1px 1px rgba(255,255,255,0.2), -1px -1px 1px rgba(0,0,0,0.8)';
      block.text = 'ENGRAVED';
      break;

    case 'kicker':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '0.85rem';
      block.styles.fontWeight = '800';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '0.2em';
      block.styles.color = 'var(--theme-color, #ff4500)';
      block.styles.marginBottom = '1rem';
      block.text = 'PRZEDSTAWIAMY NOWOŚĆ';
      break;

    // ==========================================
    // 📰 AKAPITY (BODY)
    // ==========================================
    case 'body':
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.fontWeight = '400';
      block.styles.color = 'var(--canvas-text)'; 
      block.styles.opacity = '0.7';
      block.styles.maxWidth = '700px'; 
      block.styles.marginBottom = '1.5rem';
      block.text = 'Perfekcyjna typografia to nie tylko dobór fontu. To rzemiosło operowania przestrzenią, kontrastem i oddechem.';
      break;

    case 'lead':
      block.styles.fontSize = '1.5rem';
      block.styles.lineHeight = '1.6';
      block.styles.fontWeight = '300';
      block.styles.color = 'var(--canvas-text)';
      block.styles.maxWidth = '800px';
      block.styles.marginBottom = '2rem';
      block.text = 'Jesteśmy o krok przed światem. Nasze rozwiązania definiują przyszłość cyfrowej rzeczywistości.';
      break;

    case 'columns':
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.columnCount = '2';
      block.styles.columnGap = '50px';
      block.styles.columnRule = '1px solid color-mix(in srgb, var(--canvas-text) 15%, transparent)'; 
      block.styles.color = 'var(--canvas-text)';
      block.styles.opacity = '0.8';
      block.styles.textAlign = 'justify';
      block.text = 'Ten tekst automatycznie dzieli się na dwie równe kolumny. To doskonałe rozwiązanie do dłuższych artykułów, ponieważ krótsze linie tekstu są znacznie łatwiejsze do przyswojenia przez ludzkie oko.';
      break;

    case 'pro-quote':
      block.styles.padding = '40px';
      block.styles.backgroundColor = 'color-mix(in srgb, var(--theme-color) 5%, transparent)';
      block.styles.borderLeft = '6px solid var(--theme-color)';
      block.styles.borderRadius = '0 16px 16px 0';
      block.text = `<div style="font-size: 24px; font-style: italic; font-weight: 300; margin-bottom: 20px; line-height: 1.4; color: var(--canvas-text);">"To narzędzie całkowicie zmieniło nasz workflow. Odzyskaliśmy setki godzin pracy."</div><div style="font-size: 14px; font-weight: 800; color: var(--theme-color); text-transform: uppercase; letter-spacing: 0.1em;">— Elon Musk</div>`;
      break;

    case 'illuminated-cap':
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.maxWidth = '800px';
      block.styles.color = 'var(--canvas-text)';
      block.text = `<style>
        .illuminated-p-${rnd}::first-letter {
          float: left; font-size: 5rem; line-height: 0.8; margin-right: 0.15em; margin-top: 0.05em; font-weight: 900;
          color: transparent; font-family: 'Times New Roman', serif;
          background-image: linear-gradient(135deg, var(--theme-color) 0%, #fff 100%);
          -webkit-background-clip: text; text-shadow: 4px 4px 0px rgba(0,0,0,0.2); 
        }
      </style>
      <span class="illuminated-p-${rnd}">Dawno, dawno temu, w czasach, gdy kod pisano przy świecach, pierwsza litera rozdziału była czymś więcej niż tylko znakiem. Ten akapit przywraca ten luksus z systemowym wcięciem CSS.</span>`;
      break;

    // ==========================================
    // 🎬 EFEKTY I KINETYKA
    // ==========================================
    case 'blackmirror':
      block.styles.backgroundColor = '#000';
      block.styles.color = '#fff';
      block.styles.fontFamily = 'consolas, monospace';
      block.styles.padding = '60px';
      block.styles.textAlign = 'center';
      block.styles.overflow = 'hidden';
      block.text = `<style>
        @keyframes static_${rnd} { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
        @keyframes glitchSplit_${rnd} { 0% { transform: translate(0); } 20% { transform: translate(-5px, 5px); } 40% { transform: translate(-5px, -5px); } 60% { transform: translate(5px, 5px); } 80% { transform: translate(5px, -5px); } 100% { transform: translate(0); } }
        .mirror-container-${rnd} { position: relative; display: inline-block; animation: glitchSplit_${rnd} 0.3s ease-in-out infinite; animation-play-state: paused; }
        .mirror-container-${rnd}:hover { animation-play-state: running; }
        .mirror-text-${rnd} { font-size: 5rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; line-height: 1; position: relative; z-index: 2; color: #fff; text-shadow: 2px 2px 0 #ff4500, -2px -2px 0 #3b82f6; }
        .mirror-text-${rnd}::before { content: 'DIGITAL STATIC'; position: absolute; top: 0; left: 0; width: 100%; height: 100%; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.1); z-index: 1; transform: translate(4px, 4px); }
        .mirror-static-${rnd} { position: absolute; inset: 0; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEVFRUZGRkdHR0hISElKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fYGBgYGBhYWF/AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGVJREFUeNrtlDsOwCAMBAn4Ei//+U9p8pUoUKRInRWhYGFmZpYmIsK5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5uXl+fgAbwAbwAAAAXklEQVQI12NgGAWjYBSMglEwCkbBKBgFgxEAAAn4AAn4+Q8AAAAASUVORK5CYII='); opacity: 0.05; animation: static_${rnd} 0.5s steps(5) infinite; pointer-events: none; z-index: 0; }
      </style>
      <div class="mirror-static-${rnd}"></div><div class="mirror-container-${rnd}"><div class="mirror-text-${rnd}">DIGITAL STATIC</div></div>`;
      break;

    // 🔥 NOWE: MASKED LIQUID 🔥
    case 'masked-liquid':
      block.text = `<style>
        @keyframes liquidWave_${rnd} { 0% { background-position: 0 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
        .liquid-text-${rnd} {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="none"><path d="M0,150 C300,50 600,250 900,150 L1200,50 L1200,600 L0,600 Z" fill="%23ffffff"/></svg>'), linear-gradient(90deg, #3b82f6, #9333ea, var(--theme-color));
          background-size: 200% 100%, 200% 100%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: liquidWave_${rnd} 10s linear infinite; font-size: 6rem; font-weight: 900; text-transform: uppercase; text-align: center; margin: 0;
        }
      </style><div class="liquid-text-${rnd}">LIQUID WAVE</div>`;
      break;

    case 'flicker-neon':
      block.styles.backgroundColor = '#000';
      block.styles.padding = '40px';
      block.styles.textAlign = 'center';
      block.text = `<style>
        @keyframes flicker_${rnd} { 0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 20px var(--theme-color), 0 0 40px var(--theme-color); } 20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.3; text-shadow: none; } }
        .flicker-text-${rnd} { font-family: 'Courier New', monospace; font-size: 4rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 0.1em; animation: flicker_${rnd} 3s linear infinite; margin: 0; }
      </style><div class="flicker-text-${rnd}">HOTEL MOTEL</div>`;
      break;

    case 'glitch':
      block.styles.backgroundColor = '#000';
      block.styles.padding = '40px';
      block.styles.textAlign = 'center';
      block.text = `<style>@keyframes glitch_${rnd} { 0%, 14%, 100% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75), -0.025em 0.05em 0 rgba(0,0,255,.75); } 15%, 49% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,.75), 0.025em 0.025em 0 rgba(0,255,0,.75), -0.05em -0.05em 0 rgba(0,0,255,.75); } 50%, 99% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,.75), 0.05em 0 0 rgba(0,255,0,.75), 0 -0.05em 0 rgba(0,0,255,.75); } } .glitch-anim-${rnd} { animation: glitch_${rnd} 1.5s linear infinite; font-size: 5rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 0.1em; margin:0; line-height: 1; }</style><div class="glitch-anim-${rnd}">CYBER ERROR</div>`;
      break;

    case 'marquee-text':
      block.styles.width = '100vw'; 
      block.styles.position = 'relative';
      block.styles.left = '50%';
      block.styles.transform = 'translateX(-50%)';
      block.styles.overflow = 'hidden';
      block.styles.whiteSpace = 'nowrap';
      block.styles.borderTop = '1px solid color-mix(in srgb, var(--canvas-text) 15%, transparent)';
      block.styles.borderBottom = '1px solid color-mix(in srgb, var(--canvas-text) 15%, transparent)';
      block.styles.padding = '20px 0';
      block.text = `<style>@keyframes scrollText_${rnd} { from { transform: translateX(0); } to { transform: translateX(-50%); } } .marquee-inner-${rnd} { display: inline-block; white-space: nowrap; animation: scrollText_${rnd} 20s linear infinite; font-size: 4rem; font-weight: 900; font-style: italic; color: transparent; -webkit-text-stroke: 2px var(--canvas-text); text-transform: uppercase; margin:0; }</style><div class="marquee-inner-${rnd}">INFINITE LOOP • KINETIC SCROLL • INFINITE LOOP • KINETIC SCROLL • </div>`;
      break;

    case 'sliced':
      block.styles.textAlign = 'center';
      block.text = `<style>
        .sliced-container-${rnd} { display: inline-block; position: relative; overflow: hidden; cursor: pointer; font-size: 5rem; font-weight: 900; text-transform: uppercase; }
        .sliced-top-${rnd}, .sliced-bottom-${rnd} { color: var(--canvas-text); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sliced-bottom-${rnd} { position: absolute; top: 0; left: 0; width: 100%; height: 100%; color: transparent; -webkit-text-stroke: 2px var(--canvas-text); clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%); transform: translateY(0px); }
        .sliced-top-${rnd} { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); }
        .sliced-container-${rnd}:hover .sliced-top-${rnd} { transform: translateY(-10px) skewX(-5deg); }
        .sliced-container-${rnd}:hover .sliced-bottom-${rnd} { transform: translateY(10px) skewX(5deg); color: var(--theme-color); -webkit-text-stroke: 0px; }
      </style>
      <div class="sliced-container-${rnd}">
        <div class="sliced-top-${rnd}">KINETIC SPLIT</div>
        <div class="sliced-bottom-${rnd}">KINETIC SPLIT</div>
      </div>`;
      break;

    case 'typewriter':
      block.styles.backgroundColor = '#0a0a0c';
      block.styles.padding = '30px';
      block.styles.borderRadius = '12px';
      block.styles.border = '1px solid #333';
      block.text = `<style>@keyframes typing_${rnd} { from { width: 0 } to { width: 100% } } @keyframes blink_${rnd} { 50% { border-color: transparent } } .typewriter-${rnd} { display: inline-block; overflow: hidden; border-right: 0.15em solid #10b981; white-space: nowrap; margin: 0; letter-spacing: 0.05em; font-family: monospace; font-size: 1.125rem; color: #10b981; animation: typing_${rnd} 4s steps(40, end), blink_${rnd} .75s step-end infinite; }</style><div class="typewriter-${rnd}">> Inicjowanie bazy danych... Zakończono pomyślnie.</div>`;
      break;

    // ==========================================
    // 🛠️ UŻYTKOWE (UI Elements)
    // ==========================================
    case 'badge':
      block.styles.display = 'inline-flex';
      block.styles.alignItems = 'center';
      block.styles.justifyContent = 'center';
      block.styles.padding = '6px 16px';
      block.styles.backgroundColor = 'color-mix(in srgb, var(--theme-color) 15%, transparent)';
      block.styles.color = 'var(--theme-color)';
      block.styles.borderRadius = '999px';
      block.styles.fontSize = '0.75rem';
      block.styles.fontWeight = '900';
      block.styles.letterSpacing = '0.1em';
      block.styles.textTransform = 'uppercase';
      block.styles.border = '1px solid color-mix(in srgb, var(--theme-color) 30%, transparent)';
      block.styles.width = 'max-content';
      block.text = 'LIVE STATUS';
      break;

    case 'kbd':
      block.styles.display = 'inline-flex';
      block.styles.padding = '8px 14px';
      block.styles.backgroundColor = 'var(--canvas-text)';
      block.styles.color = 'color-mix(in srgb, var(--canvas-text) 100%, black)'; 
      block.styles.borderRadius = '8px';
      block.styles.fontSize = '0.875rem';
      block.styles.fontWeight = '800';
      block.styles.fontFamily = 'monospace';
      block.styles.borderBottom = '4px solid color-mix(in srgb, var(--canvas-text) 60%, transparent)';
      block.styles.width = 'max-content';
      block.text = 'CTRL + K';
      break;

    default:
      block.text = 'Wprowadź tekst...';
      block.styles.color = 'var(--canvas-text)'; 
      break;
  }

  return block;
};