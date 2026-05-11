import { FactoryContext } from '../blockFactory';

export const buildText = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = '100%'; 
  block.styles.margin = '0 0 15px 0';

  if (block.type === 'h1') {
    block.text = 'Wielki Nagłówek H1'; 
    block.styles.fontSize = '56px'; block.styles.fontWeight = '900'; block.styles.lineHeight = '1.1'; block.styles.letterSpacing = '-0.03em'; block.styles.color = '#0f172a';
    if (variant === 'gradient') { 
      block.styles.backgroundImage = 'linear-gradient(90deg, #ff4500, #9333ea)'; block.styles.WebkitBackgroundClip = 'text'; block.styles.color = 'transparent'; block.styles.fontSize = '64px'; block.text = 'GRADIENT';
    } else if (variant === 'outline') { 
      block.text = 'Pusty w Środku'; block.styles.color = 'transparent'; block.styles.WebkitTextStroke = '2px #0f172a'; 
    } else if (variant === 'highlight') { 
      block.text = 'Kluczowy <span style="background: linear-gradient(120deg, rgba(253, 224, 71, 0.8) 0%, rgba(253, 224, 71, 0.8) 100%) no-repeat; background-size: 100% 35%; background-position: 0 90%;">Wyróżnik</span>'; 
    } else if (variant === 'brand') { 
      block.text = 'MARKOWY TYTUŁ'; block.styles.color='#3b82f6'; block.styles.textTransform='uppercase'; block.styles.letterSpacing = '-0.02em'; 
    } else if (variant === 'marquee-text') {
      block.styles.width = '100vw'; block.styles.position = 'relative'; block.styles.left = '50%'; block.styles.transform = 'translateX(-50%)'; block.styles.overflow = 'hidden'; block.styles.whiteSpace = 'nowrap';
      block.text = `<style>@keyframes scrollText_${ctx.rnd} { from { transform: translateX(0); } to { transform: translateX(-50%); } } .marquee-inner-${ctx.rnd} { display: inline-block; white-space: nowrap; animation: scrollText_${ctx.rnd} 15s linear infinite; font-size: 80px; font-weight: 900; font-style: italic; color: transparent; -webkit-text-stroke: 2px #334155; text-transform: uppercase; }</style><div class="marquee-inner-${ctx.rnd}">FUTURYSTYCZNY DESIGN • NIESKOŃCZONY SCROLL • FUTURYSTYCZNY DESIGN • NIESKOŃCZONY SCROLL • </div>`;
    } else if (variant === 'stroke') {
      block.styles.WebkitTextStroke = '2px #ff4500'; block.styles.color = 'transparent'; block.styles.fontSize = '64px'; block.text = 'KONTUR';
    }
  } else if (block.type === 'h2') {
    block.text = 'Mocny Podtytuł H2'; block.styles.fontSize = '36px'; block.styles.fontWeight = '800'; block.styles.lineHeight = '1.2'; block.styles.color = '#1e293b';
    if (variant === 'brand') { 
      block.styles.borderBottom = '3px solid #3b82f6'; block.styles.display = 'inline-block'; block.styles.paddingBottom = '5px'; block.styles.width = 'max-content'; 
    } else if (variant === 'glitch') {
      block.styles.backgroundColor = '#000'; block.styles.padding = '40px'; block.styles.textAlign = 'center';
      block.text = `<style>@keyframes glitch_${ctx.rnd} { 0%, 14%, 100% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75), -0.025em 0.05em 0 rgba(0,0,255,.75); } 15%, 49% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,.75), 0.025em 0.025em 0 rgba(0,255,0,.75), -0.05em -0.05em 0 rgba(0,0,255,.75); } 50%, 99% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,.75), 0.05em 0 0 rgba(0,255,0,.75), 0 -0.05em 0 rgba(0,0,255,.75); } } .glitch-anim-${ctx.rnd} { animation: glitch_${ctx.rnd} 1.5s linear infinite; font-size: 64px; font-weight: 900; color: #fff; text-transform: uppercase; }</style><span class="glitch-anim-${ctx.rnd}">SYSTEM FAILURE</span>`;
    } else if (variant === 'neon') {
      block.styles.textShadow = '0 0 10px #ff4500, 0 0 20px #ff4500, 0 0 40px #ff4500'; block.styles.color = '#ffffff'; block.styles.fontSize = '48px'; block.text = 'NEON GLOW';
    }
  } else if (block.type === 'p') {
    block.text = 'Zwykły akapit tekstu, który przekazuje najważniejsze informacje o Twoim produkcie i zachęca do czytania dalej.'; block.styles.fontSize = '16px'; block.styles.lineHeight = '1.6'; block.styles.color = '#334155';
    if (variant === 'eyebrow') { block.text = 'ZACZNIJ TUTAJ'; block.styles.color = '#3b82f6'; block.styles.fontWeight = '800'; block.styles.fontSize = '14px'; block.styles.letterSpacing = '0.15em'; block.styles.textTransform = 'uppercase'; } 
    else if (variant === 'lead') { block.styles.fontSize = '20px'; block.styles.color = '#64748b'; block.styles.lineHeight = '1.7'; } 
    else if (variant === 'quote') { block.text = '"Wybitny design to nie taki, do którego nie można już nic dodać..."'; block.styles.fontStyle = 'italic'; block.styles.borderLeft = '4px solid #3b82f6'; block.styles.paddingLeft = '20px'; block.styles.color = '#475569'; block.styles.fontSize = '18px'; }
    else if (variant === 'typewriter') { block.styles.backgroundColor = '#0a0a0c'; block.styles.padding = '20px 30px'; block.styles.borderRadius = '8px'; block.text = `<style>@keyframes typing_${ctx.rnd} { from { width: 0 } to { width: 100% } } .typewriter-${ctx.rnd} { display: inline-block; overflow: hidden; border-right: 0.15em solid #10b981; white-space: nowrap; margin: 0; font-family: monospace; font-size: 18px; color: #10b981; animation: typing_${ctx.rnd} 3s steps(40, end); }</style><span class="typewriter-${ctx.rnd}">Inicjowanie... Zakończono pomyślnie.</span>`; }
    else if (variant === 'columns') { block.styles.columnCount = '2'; block.styles.columnGap = '50px'; block.text = 'Ten tekst automatycznie dzieli się na dwie równe kolumny. To doskonałe rozwiązanie do dłuższych artykułów, ponieważ krótsze linie tekstu są znacznie łatwiejsze do przyswojenia przez ludzkie oko.'; }
    else if (variant === 'pro-quote') { block.styles.padding = '30px 40px'; block.styles.backgroundColor = '#f8fafc'; block.styles.borderLeft = '6px solid #ff4500'; block.text = `<div style="font-size: 24px; font-style: italic; font-weight: 600; color: #0f172a; margin-bottom: 15px;">"Design to nie tylko to, jak coś wygląda."</div><div style="font-size: 14px; font-weight: 800; color: #ff4500; text-transform: uppercase;">— Steve Jobs</div>`; }
    else if (variant === 'badge') { block.styles.display = 'inline-flex'; block.styles.padding = '6px 16px'; block.styles.backgroundColor = 'rgba(255, 69, 0, 0.1)'; block.styles.color = '#ff4500'; block.styles.borderRadius = '999px'; block.styles.fontSize = '12px'; block.styles.fontWeight = '800'; block.styles.width = 'max-content'; block.text = 'NOWOŚĆ 2.0'; }
    else if (variant === 'kbd') { block.styles.display = 'inline-flex'; block.styles.padding = '8px 14px'; block.styles.backgroundColor = '#ffffff'; block.styles.color = '#0f172a'; block.styles.borderRadius = '8px'; block.styles.fontFamily = 'monospace'; block.styles.borderBottom = '4px solid #94a3b8'; block.styles.width = 'max-content'; block.text = 'CTRL + K'; }
  }
  return block;
};