import { FactoryContext } from '../blockFactory';

export const buildGraphic = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000);
  
  block.styles.width = '100%'; 
  block.styles.padding = '0px';
  block.styles.position = 'relative';
  
  switch (variant) {
    // ==========================================
    // 📊 HOLOGRAFICZNE DANE
    // ==========================================
    case 'quantum-counter':
      // 🔥 POZIOM STARK: Licznik w formie neonowych tub jarzeniowych w obudowie
      block.text = `
        <style>
          @property --num_${rnd} { syntax: "<integer>"; initial-value: 0; inherits: false; } 
          @keyframes count_${rnd} { to { --num_${rnd}: 98400; } } 
          .counter-glow-${rnd} { 
            animation: count_${rnd} 3s cubic-bezier(0.16, 1, 0.3, 1) forwards; counter-reset: n_${rnd} var(--num_${rnd}); 
            font-variant-numeric: tabular-nums; font-family: 'Courier New', monospace; font-size: 3.5rem; font-weight: 900; line-height: 1;
            background: linear-gradient(180deg, #fff, color-mix(in srgb, var(--theme-color) 40%, transparent));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
            filter: drop-shadow(0 0 15px var(--theme-color)) drop-shadow(0 0 3px #fff);
          } 
          .counter-glow-${rnd}::after { content: counter(n_${rnd}) " TX/s"; }
          .counter-case-${rnd} {
            position: relative; padding: 40px; background: rgba(0,0,0,0.8); border-radius: 16px; 
            border: 1px solid color-mix(in srgb, var(--theme-color) 20%, transparent); backdrop-filter: blur(20px); width: 100%; 
            box-shadow: inset 0 0 30px rgba(0,0,0,1), 0 20px 50px rgba(0,0,0,0.5); overflow: hidden;
          }
          .counter-case-${rnd}::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 10px 100%; opacity: 0.3; }
        </style>
        <div class="counter-case-${rnd}">
          <div class="counter-glow-${rnd}"></div>
          <div style="font-size: 11px; font-weight: 800; color: var(--theme-color); opacity: 0.8; letter-spacing: 4px; text-transform: uppercase; margin-top: 20px;">Przepustowość Jądra</div>
        </div>`;
      break;

    case 'neural-bars':
      // 🔥 POZIOM STARK: Słupki skanowane światłem, wyglądające jak płynny kryształ
      block.text = `
        <style>
          @keyframes slideFill_${rnd} { from { transform: scaleX(0); } to { transform: scaleX(1); } } 
          @keyframes scanline_${rnd} { 0% { left: -10%; opacity: 0; } 50% { opacity: 1; } 100% { left: 110%; opacity: 0; } }
          .bar-track-${rnd} { position: relative; width: 100%; background: rgba(255,255,255,0.03); border-radius: 4px; height: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); }
          .bar-fill-${rnd} { position: absolute; top: 0; left: 0; height: 100%; transform-origin: left; animation: slideFill_${rnd} 2s cubic-bezier(0.19, 1, 0.22, 1) forwards; box-shadow: 0 0 15px currentcolor; }
          .bar-scan-${rnd} { position: absolute; top: 0; bottom: 0; width: 30%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent); animation: scanline_${rnd} 2s infinite; mix-blend-mode: overlay; z-index: 10; filter: blur(2px); }
        </style>
        <div style="display: flex; flex-direction: column; gap: 24px; padding: 30px; background: rgba(0,0,0,0.7); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(15px); width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          ${[ { label: 'Synapsa Alfa', val: '92', color: '#00f2ff' }, { label: 'Logika Rozmyta', val: '65', color: '#9333ea' }, { label: 'Zasoby Pamięci', val: '40', color: '#ff0055' } ].map((d, i) => `
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 0 5px rgba(255,255,255,0.3);">${d.label}</span>
                <span style="font-size: 12px; font-weight: 900; color: ${d.color}; text-shadow: 0 0 10px ${d.color};">${d.val}%</span>
              </div>
              <div class="bar-track-${rnd}">
                <div class="bar-fill-${rnd}" style="width: ${d.val}%; background: ${d.color}; color: ${d.color}; animation-delay: ${i*0.2}s;"></div>
                <div class="bar-scan-${rnd}" style="animation-delay: ${i*0.4}s;"></div>
              </div>
            </div>
          `).join('')}
        </div>`;
      break;

    case 'reactor-core':
      // 🔥 POZIOM STARK: (Orbital Reactor) - Keep as is (Benchmark)
      block.text = `
        <style>
          @keyframes coreSpin_${rnd} { 100% { transform: rotate(360deg); } }
          @keyframes corePulse_${rnd} { 0%, 100% { filter: drop-shadow(0 0 10px var(--theme-color)); } 50% { filter: drop-shadow(0 0 30px var(--theme-color)); } }
          .reactor-ring-${rnd} { position: absolute; inset: 0; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.2); animation: coreSpin_${rnd} 10s linear infinite; }
          .reactor-ring-inner-${rnd} { position: absolute; inset: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.05); border-top-color: var(--theme-color); animation: coreSpin_${rnd} 3s linear infinite reverse; }
        </style>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; background: rgba(0,0,0,0.8); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); width: 100%; box-shadow: inset 0 0 50px rgba(0,0,0,1);">
          <div style="position: relative; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; animation: corePulse_${rnd} 2s ease-in-out infinite;">
            <div class="reactor-ring-${rnd}"></div>
            <div class="reactor-ring-inner-${rnd}"></div>
            <svg viewBox="0 0 36 36" style="width: 160px; height: 160px; transform: rotate(-90deg);">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--theme-color)" stroke-width="2.5" stroke-dasharray="85, 100" stroke-linecap="round" />
            </svg>
            <div style="position: absolute; font-size: 2rem; font-family: monospace; font-weight: 900; color: #fff; text-shadow: 0 0 10px var(--theme-color);">85%</div>
          </div>
          <div style="margin-top: 30px; font-size: 11px; font-weight: 800; color: #fff; opacity: 0.5; text-transform: uppercase; letter-spacing: 3px;">Rdzeń Stabilny</div>
        </div>`;
      break;

    case 'predictive-graph':
      // 🔥 POZIOM STARK: (Wykres Liniowy AI) - Keep as is (Benchmark)
      block.text = `
        <style>
          @keyframes drawCurve_${rnd} { to { stroke-dashoffset: 0; } }
          @keyframes gridScan_${rnd} { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          .pred-curve-${rnd} { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawCurve_${rnd} 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; filter: drop-shadow(0 15px 15px var(--theme-color)); }
          .pred-glow-${rnd} { fill: url(#glowGrad_${rnd}); opacity: 0; animation: fadeIn_${rnd} 2.5s ease forwards 0.5s; }
          @keyframes fadeIn_${rnd} { to { opacity: 0.3; } }
        </style>
        <div style="padding: 30px; background: rgba(0,0,0,0.5); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); width: 100%; height: 280px; display: flex; flex-direction: column; position: relative; overflow: hidden; backdrop-filter: blur(10px);">
          <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 40px 40px; z-index: 0;"></div>
          <div style="position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); width: 20%; animation: gridScan_${rnd} 3s linear infinite; z-index: 0;"></div>
          <h4 style="margin: 0 0 20px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #fff; opacity: 0.6; z-index: 1;">Predykcja Zysku AI</h4>
          <div style="flex: 1; position: relative; z-index: 1;">
            <svg viewBox="0 0 500 150" style="width: 100%; height: 100%; overflow: visible;" preserveAspectRatio="none">
              <defs>
                <linearGradient id="glowGrad_${rnd}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--theme-color)"></stop>
                  <stop offset="100%" stop-color="transparent"></stop>
                </linearGradient>
              </defs>
              <path class="pred-glow-${rnd}" d="M 0 150 L 0 130 C 100 130, 150 80, 250 90 C 350 100, 400 40, 500 10 L 500 150 Z" />
              <path class="pred-curve-${rnd}" d="M 0 130 C 100 130, 150 80, 250 90 C 350 100, 400 40, 500 10" fill="none" stroke="var(--theme-color)" stroke-width="4" stroke-linecap="round" />
              <circle cx="250" cy="90" r="4" fill="#fff" style="filter: drop-shadow(0 0 10px #fff);" />
              <circle cx="500" cy="10" r="6" fill="#fff" style="filter: drop-shadow(0 0 15px #fff);" />
            </svg>
          </div>
        </div>`;
      break;

    // ==========================================
    // 🌀 OBIEKTY KINETYCZNE
    // ==========================================
    case 'dark-matter':
      // 🔥 POZIOM STARK: Płynny metal o organicznej fizyce (T-1000 vibe)
      block.text = `
        <style>
          @keyframes matterMorph_${rnd} { 0%,100%{border-radius:40% 60% 70% 30% / 40% 40% 60% 50%; transform: rotate(0deg) scale(1);} 34%{border-radius:70% 30% 50% 50% / 30% 30% 70% 70%; transform: rotate(45deg) scale(1.1);} 67%{border-radius:100% 60% 60% 100% / 100% 100% 60% 60%; transform: rotate(-45deg) scale(0.9);} } 
          .matter-${rnd} { 
            animation: matterMorph_${rnd} 15s ease-in-out infinite alternate; 
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 80%), #111;
            width: 300px; height: 300px; 
            box-shadow: inset 10px 10px 30px rgba(255,255,255,0.1), inset -10px -10px 30px rgba(0,0,0,0.9), 0 30px 60px rgba(0,0,0,0.8); 
            filter: contrast(1.8) brightness(1.1) blur(1px);
          }
        </style>
        <div style="display:flex; justify-content:center; align-items:center; width:100%; padding: 40px 0; background: #000; border-radius: 20px; box-shadow: 0 30px 50px rgba(0,0,0,0.6);"><div class="matter-${rnd}"></div></div>`;
      break;

    case 'space-sonar':
      // 🔥 POZIOM STARK: Izometryczny radar 3D ze skanem terenu
      block.text = `
        <style>
          @keyframes radar3D_${rnd} { from { transform: rotateX(60deg) rotateZ(0deg); } to { transform: rotateX(60deg) rotateZ(360deg); } }
          @keyframes echo3D_${rnd} { 0% { transform: scale(0.1); opacity: 0.8; } 100% { transform: scale(1.8); opacity: 0; } }
          .sonar-container-${rnd} { position: relative; width: 300px; height: 300px; transform-style: preserve-3d; display: flex; align-items: center; justify-content: center; }
          .sonar-dish-${rnd} { position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(0, 242, 255, 0.1); background: radial-gradient(circle, rgba(0, 242, 255, 0.05) 0%, transparent 80%); transform: rotateX(60deg); box-shadow: 0 20px 40px rgba(0, 242, 255, 0.05); }
          .sonar-dish-${rnd}::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px) 0 0 / 20px 100%, linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px) 0 0 / 100% 20px; }
          .sonar-sweep-${rnd} { position: absolute; width: 100%; height: 100%; border-radius: 50%; background: conic-gradient(from 0deg, transparent 60%, rgba(0, 242, 255, 0.6) 99%, #00f2ff 100%); animation: radar3D_${rnd} 4s linear infinite; pointer-events: none; }
          .sonar-echo-${rnd} { position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 1px solid #00f2ff; transform: rotateX(60deg); animation: echo3D_${rnd} 2.5s ease-out infinite; box-shadow: 0 0 15px #00f2ff; }
        </style>
        <div style="display:flex; justify-content:center; align-items:center; width:100%; padding: 60px 0; background: #000; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 50px rgba(0,0,0,0.6);">
          <div class="sonar-container-${rnd}">
            <div class="sonar-dish-${rnd}"></div>
            <div class="sonar-echo-${rnd}"></div>
            <div class="sonar-sweep-${rnd}"></div>
            <div style="width: 8px; height: 8px; background: #fff; border-radius: 50%; box-shadow: 0 0 15px #fff; z-index: 10; filter: drop-shadow(0 0 5px #00f2ff);"></div>
          </div>
        </div>`;
      break;

    case 'synaptic-eq':
      // 🔥 POZIOM STARK: Słupki skaczące jak cząsteczki
      block.text = `
        <style>
          @keyframes synapseJump_${rnd} { 0% { height: 10%; filter: hue-rotate(0deg); opacity: 0.3; } 100% { height: 100%; filter: hue-rotate(60deg); opacity: 1; } }
          .synapse-bar-${rnd} { width: 14px; background: linear-gradient(0deg, var(--theme-color), #fff); border-radius: 7px; transform-origin: bottom; animation: synapseJump_${rnd} 0.4s ease-in-out infinite alternate; box-shadow: 0 0 15px var(--theme-color); }
        </style>
        <div style="display:flex; justify-content:center; align-items:flex-end; gap: 10px; width:100%; height: 160px; padding: 30px; background: rgba(0,0,0,0.8); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 0 30px rgba(0,0,0,0.8);">
          ${[0.3, 0.6, 0.4, 0.7, 0.2, 0.5, 0.8, 0.4].map(delay => `<div class="synapse-bar-${rnd}" style="height: 100%; animation-duration: ${delay}s;"></div>`).join('')}
        </div>`;
      break;

    case 'entanglement':
      // 🔥 POZIOM STARK: Pełna sieć SVG z animowanymi liniami (Hologram sieć)
      block.styles.height = '350px';
      block.styles.overflow = 'hidden';
      block.styles.borderRadius = '20px';
      block.styles.backgroundColor = '#050505';
      block.styles.border = '1px solid rgba(255,255,255,0.05)';
      
      const nodes = [ { x: 30, y: 20, d: 0 }, { x: 20, y: 60, d: 1 }, { x: 60, y: 40, d: 2 }, { x: 70, y: 70, d: 0.5 } ];
      const lines = [ [0,1], [1,2], [2,3], [1,3] ];

      block.text = `
        <style>
          @keyframes floatQ_${rnd} { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-10px, 10px) scale(1.1); } 100% { transform: translate(0, 0) scale(1); } }
          @keyframes drawQLine_${rnd} { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
          .q-node-${rnd} { fill: #fff; filter: drop-shadow(0 0 10px var(--theme-color)); animation: floatQ_${rnd} 6s ease-in-out infinite; transform-origin: center; }
          .q-line-${rnd} { stroke: var(--theme-color); stroke-width: 1.5; opacity: 0.3; stroke-dasharray: 200; animation: drawQLine_${rnd} 4s linear infinite; }
        </style>
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;" preserveAspectRatio="none">
          ${lines.map(l => `<line class="q-line-${rnd}" x1="${nodes[l[0]].x}" y1="${nodes[l[0]].y}" x2="${nodes[l[1]].x}" y2="${nodes[l[1]].y}" />`).join('')}
          ${nodes.map(n => `<circle class="q-node-${rnd}" cx="${n.x}" cy="${n.y}" r="1.5" style="animation-delay: ${n.d}s;" />`).join('')}
        </svg>
        <div style="position: absolute; bottom: 15px; left: 15px; font-size: 10px; font-weight: 800; color: #fff; opacity: 0.4; letter-spacing: 2px; text-transform: uppercase;">QUANTUM NET ACTIVE</div>`;
      break;

    case 'holo-blueprint':
      // 🔥 POZIOM STARK: Ładowanie w formie CAD szeptem lasera (Skaner)
      block.text = `
        <style>
          @keyframes holoScan_${rnd} { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(200%); opacity: 0; } } 
          @keyframes holoFlicker_${rnd} { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
          .holo-base-${rnd} { 
            background: transparent; border: 1px solid rgba(0, 242, 255, 0.3); border-radius: 8px; position: relative; overflow: hidden;
            box-shadow: inset 0 0 15px rgba(0, 242, 255, 0.1); animation: holoFlicker_${rnd} 5s infinite;
          }
          .holo-base-${rnd}::after { 
            content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent, rgba(0,242,255,0.5), transparent); 
            height: 30%; animation: holoScan_${rnd} 3s linear infinite; filter: blur(2px);
          }
        </style>
        <div style="display:flex; gap:20px; width:100%; padding:30px; border:1px solid rgba(0, 242, 255, 0.2); border-radius:16px; background: rgba(0,10,20,0.9); box-shadow: 0 20px 40px rgba(0, 242, 255, 0.08);">
          <div class="holo-base-${rnd}" style="width:80px; height:80px; border-radius:50%; flex-shrink:0; border-style: dashed; border-width: 1px;">
            <svg viewBox="0 0 100 100" style="padding: 15px; opacity: 0.3;">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00f2ff" stroke-width="2" />
              <path d="M50 5 L50 95 M5 50 L95 50" stroke="#00f2ff" stroke-width="1" />
            </svg>
          </div>
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; justify-content:center;">
            <div class="holo-base-${rnd}" style="width:50%; height:12px; border-radius: 4px;"></div>
            <div class="holo-base-${rnd}" style="width:90%; height:8px; border-radius: 4px;"></div>
            <div class="holo-base-${rnd}" style="width:70%; height:8px; border-radius: 4px;"></div>
          </div>
        </div>`;
      break;

    // ==========================================
    // 🧊 KSZTAŁTY I WEKTORY
    // ==========================================
    case 'tesseract':
      // 🔥 POZIOM STARK: Sześcian wewnątrz sześcianu (4D obj)
      block.text = `
        <style>
          @keyframes spinTesser_${rnd} { from { transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); } to { transform: rotateX(-20deg) rotateY(360deg) rotateZ(360deg); } }
          .tesser-scene-${rnd} { width: 160px; height: 160px; perspective: 800px; margin: 60px auto; }
          .tesser-obj-${rnd} { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: spinTesser_${rnd} 15s infinite linear; }
          .tesser-face-${rnd} { position: absolute; border: 2px solid var(--theme-color); background: color-mix(in srgb, var(--theme-color) 5%, transparent); box-shadow: inset 0 0 30px color-mix(in srgb, var(--theme-color) 20%, transparent); display: flex; align-items: center; justify-content: center; }
          
          /* Outer Cube */
          .outer-${rnd} { width: 160px; height: 160px; }
          .o-front-${rnd}  { transform: rotateY(  0deg) translateZ(80px); }
          .o-right-${rnd}  { transform: rotateY( 90deg) translateZ(80px); }
          .o-back-${rnd}   { transform: rotateY(180deg) translateZ(80px); }
          .o-left-${rnd}   { transform: rotateY(-90deg) translateZ(80px); }
          .o-top-${rnd}    { transform: rotateX( 90deg) translateZ(80px); }
          .o-bottom-${rnd} { transform: rotateX(-90deg) translateZ(80px); }

          /* Inner Cube (Hypercore) */
          .inner-${rnd} { width: 80px; height: 80px; top: 40px; left: 40px; border-color: #fff; background: rgba(255,255,255,0.1); box-shadow: 0 0 40px var(--theme-color); filter: blur(1px); }
          .i-front-${rnd}  { transform: rotateY(  0deg) translateZ(40px); }
          .i-right-${rnd}  { transform: rotateY( 90deg) translateZ(40px); }
          .i-back-${rnd}   { transform: rotateY(180deg) translateZ(40px); }
          .i-left-${rnd}   { transform: rotateY(-90deg) translateZ(40px); }
          .i-top-${rnd}    { transform: rotateX( 90deg) translateZ(40px); }
          .i-bottom-${rnd} { transform: rotateX(-90deg) translateZ(40px); }
        </style>
        <div style="background: #000; padding: 20px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          <div class="tesser-scene-${rnd}">
            <div class="tesser-obj-${rnd}">
              <div class="tesser-face-${rnd} outer-${rnd} o-front-${rnd}"></div>
              <div class="tesser-face-${rnd} outer-${rnd} o-back-${rnd}"></div>
              <div class="tesser-face-${rnd} outer-${rnd} o-right-${rnd}"></div>
              <div class="tesser-face-${rnd} outer-${rnd} o-left-${rnd}"></div>
              <div class="tesser-face-${rnd} outer-${rnd} o-top-${rnd}"></div>
              <div class="tesser-face-${rnd} outer-${rnd} o-bottom-${rnd}"></div>

              <div class="tesser-face-${rnd} inner-${rnd} i-front-${rnd}"></div>
              <div class="tesser-face-${rnd} inner-${rnd} i-back-${rnd}"></div>
              <div class="tesser-face-${rnd} inner-${rnd} i-right-${rnd}"></div>
              <div class="tesser-face-${rnd} inner-${rnd} i-left-${rnd}"></div>
              <div class="tesser-face-${rnd} inner-${rnd} i-top-${rnd}"></div>
              <div class="tesser-face-${rnd} inner-${rnd} i-bottom-${rnd}"></div>
            </div>
          </div>
        </div>`;
      break;

    case 'spatial-matrix':
      // 🔥 POZIOM STARK: Grid izometryczny (Siatka OS vibe)
      block.styles.width = '100%';
      block.styles.minHeight = '300px';
      block.styles.borderRadius = '20px';
      block.styles.backgroundColor = '#000';
      block.styles.overflow = 'hidden';
      block.text = `
        <style>
          @keyframes matrixMove_${rnd} { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
          .spatial-grid-${rnd} {
            position: absolute; width: 200%; height: 200%; left: -50%; top: -20%;
            background-image: linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px);
            background-size: 60px 60px; transform: perspective(300px) rotateX(60deg); animation: matrixMove_${rnd} 3s linear infinite;
          }
          .spatial-fade-${rnd} { position: absolute; inset: 0; background: linear-gradient(to bottom, #000 0%, transparent 60%, #000 100%); z-index: 1; }
        </style>
        <div class="spatial-grid-${rnd}"></div>
        <div class="spatial-fade-${rnd}"></div>
        <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#fff; font-size: 2.5rem; font-weight: 900; letter-spacing: 12px; text-shadow: 0 0 20px #00ffff; z-index: 2; opacity: 0.8; mix-blend-mode: overlay;">SPATIAL GRID</div>`;
      break;

    case 'zero-point':
      // 🔥 POZIOM STARK: Płynna plazma w tle
      block.styles.minHeight = '300px';
      block.styles.borderRadius = '20px';
      block.styles.overflow = 'hidden';
      block.styles.backgroundColor = '#000';
      block.styles.boxShadow = '0 30px 50px rgba(0,0,0,0.6)';
      block.text = `
        <style>@keyframes meshBgAnim_${rnd} { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }</style>
        <div style="position: absolute; inset: 0; background: linear-gradient(-45deg, #00f2ff, #9333ea, var(--theme-color), #00f2ff); background-size: 400% 400%; animation: meshBgAnim_${rnd} 15s ease infinite; filter: blur(50px) brightness(1.2); opacity: 0.6;"></div>
        <div style="position: relative; z-index: 10; display:flex; height:100%; align-items:center; justify-content:center; font-weight:900; font-size:32px; color:#fff; mix-blend-mode: color-dodge; letter-spacing: 2px;">ENERGY FIELD</div>`;
      break;

    case 'cyber-divider':
      // 🔥 POZIOM STARK: Linia z pulsującym jądrem lasera
      block.styles.width = '100%';
      block.styles.height = '6px';
      block.styles.backgroundColor = 'transparent';
      block.styles.margin = '40px 0';
      block.text = `
        <style>@keyframes plasmaPulse_${rnd} { 0%, 100% { opacity: 0.5; width: 30px; } 50% { opacity: 1; width: 120px; } }</style>
        <div style="position: relative; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); display: flex; align-items: center; justify-content: center;">
          <div style="height: 6px; background: #fff; box-shadow: 0 0 25px 8px var(--theme-color); border-radius: 6px; animation: plasmaPulse_${rnd} 2s ease-in-out infinite;"></div>
        </div>`;
      break;

    default:
      block.text = '<div style="padding: 20px; border: 2px dashed gray; text-align: center;">Nieznany Obiekt Przestrzenny</div>';
      break;
  }

  return block;
};