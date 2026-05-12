import { FactoryContext } from '../blockFactory';

export const buildText = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000); // Unikalny seed dla animacji

  // ----------------------------------------------------
  // GLOBALNY RESET (Baza dla każdego tekstu)
  // ----------------------------------------------------
  block.styles.margin = '0';
  block.styles.padding = '0';
  block.styles.width = '100%';
  block.styles.position = 'relative';

  switch (variant) {
    // ==========================================
    // 👑 TYTUŁY (Hero & Headings)
    // ==========================================
    case 'hero':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.lineHeight = '1.05';
      block.styles.letterSpacing = '-0.04em';
      block.styles.marginBottom = '1.5rem';
      block.text = 'Odkryj potęgę designu.';
      break;

    case 'swiss-minimal':
      block.styles.fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
      block.styles.fontSize = '5rem';
      block.styles.fontWeight = '700';
      block.styles.lineHeight = '1';
      block.styles.letterSpacing = '-0.05em';
      block.styles.marginBottom = '1rem';
      block.text = 'Less is more.';
      break;

    case 'neo-brutal':
      block.styles.backgroundColor = '#fbbf24';
      block.styles.color = '#000000';
      block.styles.border = '4px solid #000000';
      block.styles.boxShadow = '8px 8px 0px #000000';
      block.styles.padding = '15px 30px';
      block.styles.width = 'max-content';
      block.styles.fontSize = '4rem';
      block.styles.fontWeight = '900';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '0.05em';
      block.styles.marginBottom = '20px';
      block.text = 'BRUTAL FORCE';
      break;

    case 'editorial':
      block.styles.fontFamily = 'Georgia, ui-serif, serif';
      block.styles.fontSize = '4rem';
      block.styles.fontWeight = '300';
      block.styles.lineHeight = '1.1';
      block.styles.letterSpacing = '0.01em';
      block.styles.fontStyle = 'italic';
      block.styles.marginBottom = '1.5rem';
      block.text = 'Elegancja definiuje standardy.';
      break;

    case 'metallic':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '800';
      block.styles.lineHeight = '1.2';
      block.styles.letterSpacing = '-0.02em';
      block.styles.marginBottom = '1rem';
      block.styles.backgroundImage = 'linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)';
      block.styles.WebkitBackgroundClip = 'text';
      block.styles.WebkitTextFillColor = 'transparent';
      block.styles.color = 'transparent';
      block.text = 'Ekskluzywny Detal';
      break;

    case 'holographic':
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.textAlign = 'center';
      block.text = `<style>
        @keyframes holo_${rnd} { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .holo-text-${rnd} {
          background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: holo_${rnd} 6s ease infinite;
          margin: 0; line-height: 1.1;
        }
      </style><div class="holo-text-${rnd}">HOLOGRAPHIC</div>`;
      break;

    case 'aurora-text':
      block.styles.marginBottom = '1rem';
      block.text = `<style>
        @keyframes aurora_${rnd} { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .aurora-txt-${rnd} {
          background: linear-gradient(270deg, #ff4500, #9333ea, #3b82f6, #10b981);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: aurora_${rnd} 10s ease infinite;
          font-size: 5rem; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1.1;
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
      block.styles.textAlign = 'center';
      block.styles.textTransform = 'uppercase';
      block.styles.color = 'var(--canvas-text)';
      block.styles.opacity = '0.6';
      block.styles.textShadow = '1px 1px 1px rgba(255,255,255,0.4), -1px -1px 1px rgba(0,0,0,0.5)';
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
    // 📰 AKAPITY I FORMA (Body)
    // ==========================================
    case 'body':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.fontWeight = '400';
      block.styles.color = '#94a3b8'; // Stały przyjazny szary
      block.styles.maxWidth = '700px'; 
      block.styles.marginBottom = '1.5rem';
      block.text = 'Perfekcyjna typografia to nie tylko dobór fontu. To rzemiosło operowania przestrzenią, kontrastem i oddechem. Dobrze sformatowany tekst czyta się sam.';
      break;

    case 'lead':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '1.5rem';
      block.styles.lineHeight = '1.6';
      block.styles.fontWeight = '300';
      block.styles.color = '#cbd5e1';
      block.styles.maxWidth = '800px';
      block.styles.marginBottom = '2rem';
      block.text = 'Jesteśmy o krok przed światem. Nasze rozwiązania definiują przyszłość cyfrowej rzeczywistości. Poznaj nowy wymiar kreatywności.';
      break;

    case 'columns':
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.columnCount = '2';
      block.styles.columnGap = '50px';
      block.styles.columnRule = '1px solid var(--text-shadow)'; 
      block.styles.textAlign = 'justify';
      block.text = 'Ten tekst automatycznie dzieli się na dwie równe kolumny. To doskonałe rozwiązanie do dłuższych artykułów, ponieważ krótsze linie tekstu są znacznie łatwiejsze do przyswojenia przez ludzkie oko. Nie musisz ręcznie tworzyć dwóch kontenerów – przeglądarka sama ułoży treść w eleganckim, gazetowym stylu.';
      break;

    case 'magazine-block':
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.7';
      block.styles.textAlign = 'justify';
      block.styles.textIndent = '3rem';
      block.styles.maxWidth = '650px';
      block.text = 'Akapit przypominający łam gazety lub powieści. Pierwsza linia jest zgrabnie wcięta, a tekst równomiernie rozłożony od lewej do prawej. Taki zabieg nadaje całości bardzo ustrukturyzowany, literacki i analogowy charakter, na którym wzrok może komfortowo osiąść.';
      break;

    case 'muted':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '0.875rem';
      block.styles.lineHeight = '1.5';
      block.styles.fontWeight = '400';
      block.styles.color = '#475569';
      block.text = '* Zmiany wchodzą w życie od następnego cyklu rozliczeniowego. Pełen regulamin dostępny w stopce strony.';
      break;

    // ==========================================
    // 💬 CYTATY I WYRÓŻNIENIA (Quotes)
    // ==========================================
    case 'quote':
      block.styles.fontFamily = 'Georgia, ui-serif, serif';
      block.styles.fontSize = '1.5rem';
      block.styles.lineHeight = '1.6';
      block.styles.fontStyle = 'italic';
      block.styles.borderLeft = '4px solid var(--theme-color, #ff4500)';
      block.styles.paddingLeft = '1.5rem';
      block.styles.marginLeft = '1rem';
      block.styles.marginBottom = '2rem';
      block.text = 'Sprostowanie skomplikowanego to zadanie dla inżyniera. Ale zrobienie tego pięknym – to domena artysty.';
      break;

    case 'pro-quote':
      block.styles.padding = '40px';
      block.styles.backgroundColor = 'color-mix(in srgb, var(--theme-color) 5%, transparent)';
      block.styles.borderLeft = '6px solid var(--theme-color)';
      block.styles.borderRadius = '0 16px 16px 0';
      block.text = `<div style="font-size: 28px; font-style: italic; font-weight: 300; margin-bottom: 20px; line-height: 1.4;">"To narzędzie całkowicie zmieniło nasz workflow. Odzyskaliśmy setki godzin pracy."</div><div style="font-size: 14px; font-weight: 800; color: var(--theme-color); text-transform: uppercase; letter-spacing: 0.1em;">— Elon Musk</div>`;
      break;

    case 'pull-quote':
      block.styles.textAlign = 'center';
      block.styles.fontSize = '2.5rem';
      block.styles.fontStyle = 'italic';
      block.styles.fontWeight = '300';
      block.styles.borderTop = '2px solid var(--text-shadow)';
      block.styles.borderBottom = '2px solid var(--text-shadow)';
      block.styles.padding = '40px 0';
      block.styles.maxWidth = '80%';
      block.styles.margin = '20px auto';
      block.styles.color = 'var(--canvas-text)';
      block.text = 'Wybitny design to nie taki, do którego nie można już nic dodać, ale taki, z którego nie można już nic zabrać.';
      break;

    case 'illuminated-cap':
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.maxWidth = '800px';
      block.text = `<style>
        .illuminated-p-${rnd}::first-letter {
          float: left; font-size: 6rem; line-height: 0.7; margin-right: 0.15em; margin-top: 0.05em; font-weight: 900;
          color: transparent; font-family: 'Times New Roman', serif;
          background-image: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
          -webkit-background-clip: text; text-shadow: 4px 4px 0px rgba(0,0,0,0.2); border: 2px solid #bf953f; padding: 10px; border-radius: 8px; background-color: #000; box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
        }
      </style>
      <span class="illuminated-p-${rnd}">Dawno, dawno temu, w czasach, gdy kod pisano przy świecach, pierwsza litera rozdziału była czymś więcej niż tylko znakiem. Była portalem do opowieści, dziełem sztuki samym w sobie, rzeźbionym w złocie i purpurze. Ten akapit przywraca ten zapomniany luksus. Reszta tekstu opływa ten majestatyczny inicjał w naturalny sposób.</span>`;
      break;

    case 'highlight':
      block.styles.fontSize = '1.5rem';
      block.styles.lineHeight = '1.6';
      block.text = 'To jest normalny tekst, ale <span style="background: linear-gradient(120deg, rgba(253, 224, 71, 0.8) 0%, rgba(253, 224, 71, 0.8) 100%) no-repeat; background-size: 100% 35%; background-position: 0 90%; color: #000; padding: 0 4px;">najważniejsze słowa</span> zasługują na zakreślacz.';
      break;

    // ==========================================
    // 🎬 DISPLAY & EFEKTY SPECJALNE (Effects)
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
      <div class="mirror-static-${rnd}"></div>
      <div class="mirror-container-${rnd}">
        <div class="mirror-text-${rnd}">DIGITAL STATIC</div>
      </div>`;
      break;

    case 'glitch':
      block.styles.backgroundColor = '#000';
      block.styles.padding = '40px';
      block.styles.textAlign = 'center';
      block.text = `<style>@keyframes glitch_${rnd} { 0%, 14%, 100% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75), -0.025em 0.05em 0 rgba(0,0,255,.75); } 15%, 49% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,.75), 0.025em 0.025em 0 rgba(0,255,0,.75), -0.05em -0.05em 0 rgba(0,0,255,.75); } 50%, 99% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,.75), 0.05em 0 0 rgba(0,255,0,.75), 0 -0.05em 0 rgba(0,0,255,.75); } } .glitch-anim-${rnd} { animation: glitch_${rnd} 1.5s linear infinite; font-size: 5rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 0.1em; margin:0; line-height: 1; }</style><div class="glitch-anim-${rnd}">CYBER ERROR</div>`;
      break;

    case 'flicker-neon':
      block.styles.backgroundColor = '#000';
      block.styles.padding = '40px';
      block.styles.textAlign = 'center';
      block.text = `<style>
        @keyframes flicker_${rnd} { 0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; text-shadow: 0 0 10px #ff4500, 0 0 20px #ff4500, 0 0 40px #ff4500, 0 0 80px #ff4500; } 20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.3; text-shadow: none; } }
        .flicker-text-${rnd} { font-family: 'Courier New', monospace; font-size: 4rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 0.1em; animation: flicker_${rnd} 3s linear infinite; margin: 0; }
      </style>
      <div class="flicker-text-${rnd}">HOTEL MOTEL</div>`;
      break;

    case 'masked-liquid':
      block.text = `<style>
        @keyframes liquidWave_${rnd} { 0% { background-position: 0 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
        .liquid-text-${rnd} {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="none"><path d="M0,150 C300,50 600,250 900,150 L1200,50 L1200,600 L0,600 Z" fill="%23ffffff"/></svg>'), linear-gradient(90deg, #3b82f6, #9333ea, #ff4500);
          background-size: 200% 100%, 200% 100%;
          -webkit-background-clip: text; WebkitTextFillColor: transparent; color: transparent;
          animation: liquidWave_${rnd} 10s linear infinite; font-size: 6rem; font-weight: 900; text-transform: uppercase; text-align: center; margin: 0;
        }
      </style>
      <div class="liquid-text-${rnd}">LIQUID WAVE</div>`;
      break;

    case 'glass-text':
      block.styles.padding = '40px';
      block.styles.textAlign = 'center';
      block.styles.backgroundImage = 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)';
      block.styles.backgroundSize = 'cover';
      block.styles.backgroundPosition = 'center';
      block.text = `<div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2); padding: 40px; border-radius: 24px; font-size: 4rem; font-weight: 900; color: rgba(255,255,255,0.9); display: inline-block;">FROSTED GLASS</div>`;
      break;

    case 'anaglyph':
      block.styles.fontSize = '5rem';
      block.styles.fontWeight = '900';
      block.styles.textAlign = 'center';
      block.styles.textTransform = 'uppercase';
      block.styles.color = 'var(--canvas-text)';
      block.styles.letterSpacing = '0.05em';
      block.styles.textShadow = '-4px 0 0 rgba(255,0,0,0.8), 4px 0 0 rgba(0,255,255,0.8)';
      block.text = 'ANAGLYPH 3D';
      break;

    case 'arcade':
      block.styles.fontFamily = '"Courier New", Courier, monospace';
      block.styles.fontSize = '3rem';
      block.styles.fontWeight = '900';
      block.styles.textAlign = 'center';
      block.styles.textTransform = 'uppercase';
      block.styles.color = '#39ff14'; // Toksyczna zieleń
      block.styles.textShadow = '3px 3px 0 #000000';
      block.text = 'INSERT COIN...';
      break;

    case 'typewriter':
      block.styles.backgroundColor = '#0a0a0c';
      block.styles.padding = '30px';
      block.styles.borderRadius = '12px';
      block.styles.border = '1px solid #333';
      block.text = `<style>@keyframes typing_${rnd} { from { width: 0 } to { width: 100% } } @keyframes blink_${rnd} { 50% { border-color: transparent } } .typewriter-${rnd} { display: inline-block; overflow: hidden; border-right: 0.15em solid #10b981; white-space: nowrap; margin: 0; letter-spacing: 0.05em; font-family: monospace; font-size: 1.125rem; color: #10b981; animation: typing_${rnd} 4s steps(40, end), blink_${rnd} .75s step-end infinite; }</style><div class="typewriter-${rnd}">> Inicjowanie bazy danych... Zakończono pomyślnie.</div>`;
      break;

    // ==========================================
    // 🌀 INTERAKTYWNE KINETIC (Kinetic)
    // ==========================================
    case 'marquee-text':
      block.styles.width = '100vw'; 
      block.styles.position = 'relative';
      block.styles.left = '50%';
      block.styles.transform = 'translateX(-50%)';
      block.styles.overflow = 'hidden';
      block.styles.whiteSpace = 'nowrap';
      block.styles.borderTop = '1px solid var(--text-shadow)';
      block.styles.borderBottom = '1px solid var(--text-shadow)';
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

    case 'censored':
      block.styles.fontSize = '3rem';
      block.styles.fontWeight = '900';
      block.styles.textAlign = 'center';
      block.styles.textTransform = 'uppercase';
      block.styles.color = 'var(--canvas-text)';
      block.text = `<style>
        .censored-box-${rnd} { display: inline-block; cursor: pointer; }
        .censored-text-${rnd} { background-color: var(--canvas-text); color: var(--canvas-text); padding: 0 10px; transition: all 0.3s ease; }
        .censored-box-${rnd}:hover .censored-text-${rnd} { background-color: transparent; color: var(--canvas-text); }
      </style>
      <div class="censored-box-${rnd}">
        TOP <span class="censored-text-${rnd}">SECRET</span> DATA
      </div>`;
      break;

    case 'hover-reveal':
      block.styles.textAlign = 'center';
      block.text = `<style>
        .reveal-${rnd} { color: transparent; text-shadow: 0 0 20px var(--canvas-text); transition: text-shadow 0.6s ease, color 0.6s ease; font-size: 4rem; font-weight: 900; cursor: crosshair; margin:0; text-transform: uppercase;}
        .reveal-${rnd}:hover { text-shadow: 0 0 0px var(--canvas-text); color: var(--canvas-text); }
      </style>
      <div class="reveal-${rnd}">NAJEDŹ ABY ODKRYĆ</div>`;
      break;

    case 'text-circle':
      block.styles.display = 'flex';
      block.styles.justifyContent = 'center';
      block.styles.padding = '40px';
      block.text = `<style>@keyframes spin_${rnd} { 100% { transform: rotate(360deg); } } .spin-box-${rnd} { width: 150px; height: 150px; animation: spin_${rnd} 15s linear infinite; display: flex; align-items: center; justify-content: center; }</style>
      <div class="spin-box-${rnd}">
        <svg viewBox="0 0 100 100" width="150" height="150" style="overflow:visible;">
          <path id="circlePath_${rnd}" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
          <text fill="var(--canvas-text)" font-weight="900" font-size="12.5" letter-spacing="4px" text-transform="uppercase">
            <textPath href="#circlePath_${rnd}">ROTATING BADGE • PREMIUM QUALITY • </textPath>
          </text>
        </svg>
      </div>`;
      break;

    // ==========================================
    // 🛠️ UŻYTKOWE I UI (UI Elements)
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
      block.styles.fontWeight = '800';
      block.styles.letterSpacing = '0.1em';
      block.styles.textTransform = 'uppercase';
      block.styles.border = '1px solid color-mix(in srgb, var(--theme-color) 30%, transparent)';
      block.styles.width = 'max-content';
      block.text = 'NOWOŚĆ 2.0';
      break;

    case 'status-indicator':
      block.styles.display = 'inline-flex';
      block.styles.alignItems = 'center';
      block.styles.width = 'max-content';
      block.text = `<style>@keyframes pulseDot_${rnd} { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }</style><div style="display:flex; align-items:center; gap:10px; padding:8px 16px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); border-radius:999px;"><div style="width:10px; height:10px; background-color:#10b981; border-radius:50%; animation: pulseDot_${rnd} 2s infinite;"></div><span style="color:#10b981; font-size:12px; font-weight:800; letter-spacing:1px; text-transform:uppercase;">System Operacyjny Online</span></div>`;
      break;

    case 'tag-cloud':
      block.styles.display = 'flex';
      block.styles.flexWrap = 'wrap';
      block.styles.gap = '10px';
      block.text = `
        <span style="padding: 6px 14px; background: var(--text-shadow); color: var(--canvas-text); border-radius: 8px; font-size: 13px; font-weight: 600;">#Design</span>
        <span style="padding: 6px 14px; background: var(--text-shadow); color: var(--canvas-text); border-radius: 8px; font-size: 13px; font-weight: 600;">#Technology</span>
        <span style="padding: 6px 14px; background: var(--text-shadow); color: var(--canvas-text); border-radius: 8px; font-size: 13px; font-weight: 600;">#Innovation</span>
      `;
      break;

    case 'kbd':
      block.styles.display = 'inline-flex';
      block.styles.padding = '8px 14px';
      block.styles.backgroundColor = 'var(--canvas-text)';
      block.styles.color = 'var(--text-shadow)';
      block.styles.borderRadius = '8px';
      block.styles.fontSize = '0.875rem';
      block.styles.fontWeight = '700';
      block.styles.fontFamily = 'monospace';
      block.styles.borderBottom = '4px solid color-mix(in srgb, var(--canvas-text) 50%, transparent)';
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