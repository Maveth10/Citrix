import { buildText } from './factories/textFactory';
import { buildButton } from './factories/buttonFactory';
import { buildInput } from './factories/inputFactory';
import { buildForm } from './factories/formFactory';
import { buildGraphic } from './factories/graphicFactory';
import { buildPopup } from './factories/popupFactory';
import { buildList } from './factories/listFactory';
import { buildFaq } from './factories/faqFactory';
import { buildContainer } from './factories/containerFactory';
import { buildSection } from './factories/sectionFactory';
import { buildGrid } from './factories/gridFactory';
import { buildImage } from './factories/imageFactory';
import { buildVideo } from './factories/videoFactory';
import { buildEmbed } from './factories/embedFactory';
import { buildShape } from './factories/shapeFactory';

export interface FactoryContext {
  generateId: () => number;
  rnd: number;
  createBlock: (type: string, variant: string, label: string) => any;
}

export const createBlock = (type: string, variant: string, label: string) => {
  const generateId = () => Math.floor(Math.random() * 10000000);
  const rnd = Math.floor(Math.random() * 10000); // Unikalny seed dla animacji CSS
  
  let newBlock: any = {
    id: generateId(), type, name: label.toUpperCase(),
    children: ['section', 'container', 'grid', 'form', 'popup'].includes(type) ? [] : undefined,
    hoverStyles: {}, entranceAnim: 'none',
    styles: { 
      boxSizing: 'border-box', maxWidth: '100%', minWidth: '0', minHeight: '0',
      position: 'relative', left: '0px', top: '0px', display: 'flex', flexDirection: 'column', 
      padding: '20px', margin: '0px', 
      width: '100%', height: 'auto', 
      backgroundColor: 'transparent', borderRadius: '0px', boxShadow: 'none', border: '0px solid #000', 
      opacity: '1', backdropFilter: 'none', transition: 'all 0.3s ease', overflow: 'visible', 
      bgType: 'color', bgImage: '', bgVideo: '', bgOverlay: 'rgba(0,0,0,0)', zIndex: 1,
      clearRow: true 
    },
  };

  const ctx: FactoryContext = { generateId, rnd, createBlock };

  // ROUTER: Kierujemy blok do mik-fabryki na podstawie ścisłego typu
  switch (type) {
    case 'text':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'p':
    case 'marquee': 
      return buildText(newBlock, variant, ctx); // 🔥 DODANE KRYTYCZNE TYPY 🔥
    case 'button': return buildButton(newBlock, variant, ctx);
    case 'input': return buildInput(newBlock, variant, ctx);
    case 'form': return buildForm(newBlock, variant, ctx);
    case 'graphic': return buildGraphic(newBlock, variant, ctx);
    case 'popup': return buildPopup(newBlock, variant, ctx);
    case 'list': return buildList(newBlock, variant, ctx);
    case 'faq': return buildFaq(newBlock, variant, ctx);
    case 'container': return buildContainer(newBlock, variant, ctx);
    case 'section': return buildSection(newBlock, variant, ctx);
    case 'grid': return buildGrid(newBlock, variant, ctx);
    case 'img': return buildImage(newBlock, variant, ctx);
    case 'video': return buildVideo(newBlock, variant, ctx);
    case 'embed': return buildEmbed(newBlock, variant, ctx);
    case 'shape':
    case 'ribbon': return buildShape(newBlock, variant, ctx);
    default: return newBlock;
  }
};