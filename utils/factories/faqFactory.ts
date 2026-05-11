import { FactoryContext } from '../blockFactory';

export const buildFaq = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = '100%'; 
  if (variant === 'interactive') { 
    block.text = `<style>.faq-det-${ctx.rnd} { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; } .faq-det-${ctx.rnd}[open] { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: #cbd5e1; } .faq-sum-${ctx.rnd} { padding: 20px; font-size: 16px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; } .faq-sum-${ctx.rnd}::-webkit-details-marker { display: none; } .faq-sum-${ctx.rnd}::after { content: '+'; font-size: 20px; color: #3b82f6; font-weight: 300; transition: transform 0.3s; } .faq-det-${ctx.rnd}[open] .faq-sum-${ctx.rnd}::after { transform: rotate(45deg); } .faq-content-${ctx.rnd} { padding: 0 20px 20px 20px; color: #64748b; font-size: 15px; line-height: 1.6; }</style><div><details class="faq-det-${ctx.rnd}"><summary class="faq-sum-${ctx.rnd}">Czy mogę zrezygnować w dowolnym momencie?</summary><div class="faq-content-${ctx.rnd}">Tak, nasza subskrypcja jest elastyczna. Możesz anulować ją z poziomu panelu użytkownika, a konto wygaśnie wraz z końcem opłaconego miesiąca.</div></details><details class="faq-det-${ctx.rnd}"><summary class="faq-sum-${ctx.rnd}">Czy oferujecie zniżki dla NGO i uczelni?</summary><div class="faq-content-${ctx.rnd}">Oczywiście. Skontaktuj się z naszym działem wsparcia, aby otrzymać specjalny cennik ze zniżką do 50% na wszystkie pakiety.</div></details></div>`; 
  } 
  else { 
    block.text = '▼ Pytanie FAQ<br><br>Odpowiedź.'; block.styles.border = '1px solid #ccc'; block.styles.padding = '15px'; block.styles.backgroundColor = '#fff'; block.styles.width = '100%'; 
  }
  return block;
};