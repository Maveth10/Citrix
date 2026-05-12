import { FactoryContext } from '../blockFactory';

export const buildText = (block: any, variant: string, ctx: FactoryContext) => {
  // Reset
  block.styles.margin = '0';
  block.styles.padding = '0';
  block.styles.color = '#ffffff';

  switch (variant) {
    // -----------------------------------
    // TYTUŁY
    // -----------------------------------
    case 'hero':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '4.5rem';
      block.styles.fontWeight = '900';
      block.styles.lineHeight = '1.05';
      block.styles.letterSpacing = '-0.04em';
      block.styles.color = '#ffffff';
      block.styles.marginBottom = '1.5rem';
      block.text = 'Odkryj potęgę designu.';
      break;

    case 'editorial':
      block.styles.fontFamily = 'Georgia, ui-serif, serif';
      block.styles.fontSize = '3.5rem';
      block.styles.fontWeight = '300';
      block.styles.lineHeight = '1.15';
      block.styles.letterSpacing = '0.01em';
      block.styles.color = '#f8fafc';
      block.styles.marginBottom = '1.5rem';
      block.text = 'Elegancja, która definiuje standardy.';
      break;

    case 'metallic':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '2.5rem';
      block.styles.fontWeight = '700';
      block.styles.lineHeight = '1.2';
      block.styles.letterSpacing = '-0.02em';
      block.styles.marginBottom = '1rem';
      block.styles.backgroundImage = 'linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)';
      block.styles.WebkitBackgroundClip = 'text';
      block.styles.WebkitTextFillColor = 'transparent';
      block.styles.color = 'transparent'; // Fallback
      block.text = 'Ekskluzywny Detal';
      break;

    case 'kicker':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '0.85rem';
      block.styles.fontWeight = '700';
      block.styles.textTransform = 'uppercase';
      block.styles.letterSpacing = '0.2em';
      block.styles.color = 'var(--theme-color, #3b82f6)';
      block.styles.marginBottom = '1rem';
      block.text = 'Przedstawiamy nowość';
      break;

    // -----------------------------------
    // AKAPITY
    // -----------------------------------
    case 'body':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '1.125rem';
      block.styles.lineHeight = '1.8';
      block.styles.fontWeight = '400';
      block.styles.color = '#94a3b8'; // Zgaszony, czytelny szary
      block.styles.maxWidth = '700px'; // Złota zasada szerokości linii
      block.styles.marginBottom = '1.5rem';
      block.text = 'Perfekcyjna typografia to nie tylko dobór fontu. To rzemiosło operowania przestrzenią, kontrastem i oddechem. Zmień ten tekst dwukrotnym kliknięciem, a system zachowa te idealne proporcje.';
      break;

    case 'lead':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '1.5rem';
      block.styles.lineHeight = '1.6';
      block.styles.fontWeight = '300';
      block.styles.color = '#e2e8f0';
      block.styles.maxWidth = '800px';
      block.styles.marginBottom = '2rem';
      block.text = 'Jesteśmy o krok przed światem. Nasze rozwiązania definiują przyszłość cyfrowej rzeczywistości.';
      break;

    case 'quote':
      block.styles.fontFamily = 'Georgia, ui-serif, serif';
      block.styles.fontSize = '1.5rem';
      block.styles.lineHeight = '1.6';
      block.styles.fontStyle = 'italic';
      block.styles.color = '#f8fafc';
      block.styles.borderLeft = '4px solid var(--theme-color, #ffffff)';
      block.styles.paddingLeft = '1.5rem';
      block.styles.marginLeft = '1rem';
      block.styles.marginBottom = '2rem';
      block.text = 'Sprostowanie skomplikowanego to zadanie dla inżyniera. Ale zrobienie tego pięknym – to domena artysty.';
      break;

    case 'muted':
      block.styles.fontFamily = 'system-ui, -apple-system, sans-serif';
      block.styles.fontSize = '0.875rem';
      block.styles.lineHeight = '1.5';
      block.styles.fontWeight = '400';
      block.styles.color = '#475569';
      block.text = '* Zmiany wchodzą w życie od następnego cyklu rozliczeniowego. Pełen regulamin dostępny w stopce strony.';
      break;
      
    default:
      block.text = 'Zwykły tekst';
      break;
  }

  return block;
};