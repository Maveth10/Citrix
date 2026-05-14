import { FactoryContext } from '../blockFactory';

export const buildList = (block: any, variant: string, ctx: FactoryContext) => {
  const rnd = ctx?.rnd || Math.floor(Math.random() * 10000);

  block.styles.width = '100%';
  block.styles.padding = '20px';

  if (variant === 'pro-checklist') {
    block.styles.backgroundColor = 'color-mix(in srgb, var(--canvas-text) 2%, transparent)';
    block.styles.borderRadius = '16px';
    block.styles.border = '1px solid color-mix(in srgb, var(--canvas-text) 5%, transparent)';
    
    // 🔥 WYPASIONY CHECKMARK W SVG 🔥
    const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: var(--theme-color); filter: drop-shadow(0 0 5px var(--theme-color)); flex-shrink: 0; margin-top: 4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    block.text = `
      <style>
        .pro-list-${rnd} { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
        .pro-item-${rnd} { display: flex; align-items: flex-start; gap: 15px; color: var(--canvas-text); font-size: 15px; line-height: 1.6; }
        .pro-content-${rnd} strong { display: block; color: var(--canvas-text); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 12px; margin-bottom: 2px; }
        .pro-content-${rnd} span { opacity: 0.6; }
      </style>
      <ul class="pro-list-${rnd}">
        <li class="pro-item-${rnd}">${checkIcon}<div class="pro-content-${rnd}"><strong>Architektura Kwantowa</strong><span>Bezpieczeństwo danych na poziomie horyzontu zdarzeń.</span></div></li>
        <li class="pro-item-${rnd}">${checkIcon}<div class="pro-content-${rnd}"><strong>Płynność 120 FPS</strong><span>Interfejs reagujący szybciej niż Twoje myśli.</span></div></li>
        <li class="pro-item-${rnd}">${checkIcon}<div class="pro-content-${rnd}"><strong>Wsparcie AI 24/7</strong><span>Dedykowany model językowy pilnujący Twojego biznesu.</span></div></li>
      </ul>`;
  } else {
    // Klasyczna lista
    block.text = `<ul style="color: var(--canvas-text); line-height: 1.8; padding-left: 20px;"><li>Punkt pierwszy</li><li>Punkt drugi</li></ul>`;
  }

  return block;
};