import { FactoryContext } from '../blockFactory';

export const buildList = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = '100%'; 
  block.styles.padding = '20px';
  
  if (variant === 'classic-ul') { 
    block.text = '<ul style="padding-left: 20px; list-style-type: disc; margin: 0; color: #334155; line-height: 1.8;"><li>Pierwszy, bardzo ważny punkt</li><li>Drugi argument potwierdzający tezę</li><li>Trzeci punkt zamykający temat</li></ul>'; block.styles.fontSize = '16px'; 
  } 
  else if (variant === 'classic-ol') { 
    block.text = '<ol style="padding-left: 20px; list-style-type: decimal; margin: 0; color: #334155; line-height: 1.8;"><li>Załóż darmowe konto</li><li>Skonfiguruj swój profil</li><li>Ciesz się dostępem do platformy</li></ol>'; block.styles.fontSize = '16px'; 
  }
  else if (variant === 'features') { 
    block.text = `<style>.feat-list-${ctx.rnd} { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; } .feat-list-${ctx.rnd} li { display: flex; align-items: center; gap: 10px; font-size: 16px; color: #1e293b; font-weight: 600; } .feat-list-${ctx.rnd} li::before { content: '✓'; display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: #dcfce7; color: #10b981; border-radius: 50%; font-size: 14px; flex-shrink: 0; }</style><ul class="feat-list-${ctx.rnd}"><li>Nielimitowany dostęp do bazy wiedzy</li><li>Wsparcie techniczne 24/7 Premium</li><li>Darmowe aktualizacje przez rok</li><li>Dedykowany opiekun klienta</li></ul>`; 
  }
  else if (variant === 'steps') { 
    block.styles.backgroundColor = '#f8fafc'; 
    block.styles.borderRadius = '16px'; 
    block.text = `<style>.step-list-${ctx.rnd} { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px; counter-reset: step-counter_${ctx.rnd}; border-left: 3px solid #cbd5e1; margin-left: 20px; padding-left: 30px; } .step-list-${ctx.rnd} li { position: relative; } .step-list-${ctx.rnd} li::before { counter-increment: step-counter_${ctx.rnd}; content: counter(step-counter_${ctx.rnd}); position: absolute; left: -46px; top: 0; width: 30px; height: 30px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; border: 4px solid #f8fafc; } .step-title-${ctx.rnd} { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 4px; } .step-desc-${ctx.rnd} { font-size: 15px; color: #64748b; line-height: 1.5; }</style><ol class="step-list-${ctx.rnd}"><li><div class="step-title-${ctx.rnd}">Analiza i strategia</div><div class="step-desc-${ctx.rnd}">Dokładnie badamy Twoje potrzeby i ustalamy plan działania.</div></li><li><div class="step-title-${ctx.rnd}">Projektowanie UX/UI</div><div class="step-desc-${ctx.rnd}">Tworzymy makiety i pełny wizualny prototyp produktu.</div></li><li><div class="step-title-${ctx.rnd}">Wdrożenie i testy</div><div class="step-desc-${ctx.rnd}">Programujemy, testujemy i odpalamy projekt na produkcji.</div></li></ol>`; 
  }
  else if (variant === 'pro-checklist') {
    block.styles.backgroundColor = '#ffffff';
    block.styles.padding = '30px';
    block.styles.borderRadius = '16px';
    block.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
    block.styles.border = '1px solid #e2e8f0';
    block.text = `<style>.pro-check-${ctx.rnd} { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; } .pro-check-${ctx.rnd} li { display: flex; align-items: flex-start; gap: 12px; font-size: 16px; color: #334155; line-height: 1.5; font-weight: 500; } .pro-check-${ctx.rnd} li::before { content: ''; display: block; width: 24px; height: 24px; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23ff4500" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'); background-size: contain; background-repeat: no-repeat; flex-shrink: 0; margin-top: 2px; }</style><ul class="pro-check-${ctx.rnd}"><li><strong style="color:#0f172a">Błyskawiczna integracja:</strong> Podłącz swoje konto w mniej niż 5 minut bez pisania kodu.</li><li><strong style="color:#0f172a">Bezpieczeństwo danych:</strong> Pełne szyfrowanie end-to-end oraz zgodność z RODO.</li><li><strong style="color:#0f172a">Wsparcie 24/7:</strong> Dedykowany zespół ekspertów gotowy pomóc Ci o każdej porze.</li></ul>`;
  }

  return block;
};