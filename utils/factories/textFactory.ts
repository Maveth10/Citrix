import { FactoryContext } from '../blockFactory';

export const buildText = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.color = '#ffffff';

  // ==========================================
  // NAGŁÓWKI (H1, H2, H3)
  // ==========================================
  if (block.type === 'h1' || block.type === 'h2' || block.type === 'h3') {
    block.styles.fontWeight = 'bold';
    block.styles.fontSize = block.type === 'h1' ? '3rem' : (block.type === 'h2' ? '2.25rem' : '1.75rem');
    block.styles.lineHeight = '1.2';
    block.styles.marginBottom = '1rem';
    block.text = block.name;

    if (variant === 'gradient') {
      block.styles.background = 'linear-gradient(90deg, #ff4500, #9333ea, #3b82f6)';
      block.styles.WebkitBackgroundClip = 'text';
      block.styles.WebkitTextFillColor = 'transparent';
      block.styles.display = 'inline-block';
      block.text = 'Gradientowy Tytuł';
    } 
    else if (variant === 'outline') {
      block.styles.color = 'transparent';
      block.styles.WebkitTextStroke = '2px #ffffff';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '0.05em';
      block.text = 'Napis Konturowy';
    } 
    else if (variant === 'kinetic') {
      block.styles.whiteSpace = 'nowrap';
      block.styles.overflow = 'hidden';
      block.styles.display = 'block';
      block.styles.width = '100%';
      // Używamy unikalnego ID (ctx.rnd) dla animacji CSS
      block.text = `
        <div style="display:inline-block; animation: marquee_${ctx.rnd} 15s linear infinite; font-style: italic; color: #ff4500;">
          KINETYCZNY TEKST • PŁYWAJĄCY NAGŁÓWEK • KINETYCZNY TEKST • PŁYWAJĄCY NAGŁÓWEK •
        </div>
        <style>
          @keyframes marquee_${ctx.rnd} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        </style>
      `;
    } 
    else if (variant === 'typewriter') {
      block.styles.fontFamily = 'monospace';
      block.styles.borderRight = '4px solid #ff4500';
      block.styles.whiteSpace = 'nowrap';
      block.styles.overflow = 'hidden';
      block.styles.display = 'inline-block';
      block.styles.width = 'fit-content';
      block.text = `
        <style>
          #block-${block.id} { animation: typing_${ctx.rnd} 3.5s steps(40, end), blink_${ctx.rnd} .75s step-end infinite; }
          @keyframes typing_${ctx.rnd} { from { width: 0 } to { width: 100% } }
          @keyframes blink_${ctx.rnd} { from, to { border-color: transparent } 50% { border-color: #ff4500 } }
        </style>
        Witaj w przyszłości web designu...
      `;
    }
  } 
  // ==========================================
  // AKAPITY I ELEMENTY SPECJALNE (P)
  // ==========================================
  else {
    block.styles.fontSize = '1rem';
    block.styles.lineHeight = '1.6';
    block.styles.color = '#cbd5e1';
    block.styles.marginBottom = '1rem';
    block.text = 'Przykładowy tekst akapitu. Kliknij dwukrotnie (lub skorzystaj z prawego panelu), aby edytować zawartość tego bloku i opowiedzieć swoją historię.';

    if (variant === 'lead') {
      block.styles.fontSize = '1.25rem';
      block.styles.color = '#f8fafc';
      block.styles.fontWeight = '500';
    } 
    else if (variant === 'muted') {
      block.styles.fontSize = '0.875rem';
      block.styles.color = '#64748b';
    } 
    else if (variant === 'columns') {
      block.styles.columnCount = '2';
      block.styles.columnGap = '2rem';
      block.text = 'To jest dłuższy blok tekstu, który został automatycznie podzielony na dwie eleganckie kolumny przy pomocy nowoczesnego CSS (column-count). Znacznie ułatwia to czytanie długich artykułów na szerokich ekranach, dając efekt przypominający tradycyjną prasę drukowaną. Możesz tu wpisać cokolwiek chcesz.';
    } 
    else if (variant === 'notification') {
      block.styles.display = 'inline-flex';
      block.styles.alignItems = 'center';
      block.styles.gap = '10px';
      block.styles.backgroundColor = 'rgba(16, 185, 129, 0.1)'; // Zielone tło
      block.styles.border = '1px solid rgba(16, 185, 129, 0.3)';
      block.styles.padding = '8px 16px';
      block.styles.borderRadius = '999px';
      block.styles.color = '#10b981'; // Zielony tekst
      block.styles.fontWeight = 'bold';
      block.styles.fontSize = '0.875rem';
      block.text = `
        <span style="display:block; width:8px; height:8px; background-color:#10b981; border-radius:50%; box-shadow:0 0 10px #10b981; animation:pulse_${ctx.rnd} 2s infinite;"></span> 
        Nowa aktualizacja systemu jest dostępna!
        <style>@keyframes pulse_${ctx.rnd} { 0% { opacity:1; } 50% { opacity:0.3; } 100% { opacity:1; } }</style>
      `;
    } 
    else if (variant === 'eyebrow') {
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '0.15em';
      block.styles.fontWeight = '900';
      block.styles.color = 'var(--theme-color, #ff4500)';
      block.styles.fontSize = '0.75rem';
      block.styles.marginBottom = '0.5rem';
      block.text = '🚀 NOWOŚĆ W OFERCIE';
    } 
    else if (variant === 'quote') {
      block.styles.borderLeft = '4px solid var(--theme-color, #ff4500)';
      block.styles.paddingLeft = '1.25rem';
      block.styles.fontStyle = 'italic';
      block.styles.fontSize = '1.125rem';
      block.styles.color = '#e2e8f0';
      block.styles.backgroundColor = 'rgba(255,255,255,0.02)';
      block.styles.padding = '1.5rem';
      block.styles.borderRadius = '0 12px 12px 0';
      block.text = '"Design to nie tylko to, jak coś wygląda i jak się to czuje. Design to to, jak to działa." <br/><span style="font-size: 0.875rem; color: #64748b; font-style: normal; margin-top: 10px; display: block;">— Steve Jobs</span>';
    } 
    else if (variant === 'badge') {
      block.styles.display = 'inline-block';
      block.styles.backgroundColor = '#1e293b';
      block.styles.color = '#38bdf8';
      block.styles.padding = '4px 12px';
      block.styles.borderRadius = '6px';
      block.styles.fontSize = '0.75rem';
      block.styles.fontWeight = 'bold';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '0.05em';
      block.styles.border = '1px solid #38bdf8';
      block.text = 'Beta';
    } 
    else if (variant === 'code') {
      block.styles.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
      block.styles.backgroundColor = '#0f172a';
      block.styles.color = '#34d399';
      block.styles.padding = '1rem 1.5rem';
      block.styles.borderRadius = '8px';
      block.styles.border = '1px solid #1e293b';
      block.styles.width = 'max-content';
      block.text = 'npm install @vyrai/core --save';
    } 
    else if (variant === 'link') {
      block.styles.display = 'inline-flex';
      block.styles.alignItems = 'center';
      block.styles.gap = '5px';
      block.styles.color = '#3b82f6';
      block.styles.fontWeight = 'bold';
      block.styles.cursor = 'pointer';
      block.text = '<span style="text-decoration: underline;">Dowiedz się więcej</span> <span>→</span>';
    }
  }

  return block;
};