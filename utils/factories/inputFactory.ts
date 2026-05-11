import { FactoryContext } from '../blockFactory';

export const buildInput = (block: any, variant: string, ctx: FactoryContext) => {
  block.text = 'Wprowadź tekst...'; 
  block.styles.padding = '14px 16px'; 
  block.styles.backgroundColor = '#f8fafc'; 
  block.styles.border = '1px solid #e2e8f0'; 
  block.styles.borderRadius = '8px'; 
  block.styles.color = '#94a3b8'; 
  block.styles.fontSize = '14px'; 
  block.styles.width = '100%'; 
  block.styles.display = 'flex'; 
  block.styles.alignItems = 'center';
  
  if (variant === 'textarea') { 
    block.text = 'Wpisz dłuższą wiadomość...'; 
    block.styles.minHeight = '120px'; 
    block.styles.alignItems = 'flex-start'; 
  } else if (variant === 'underline') { 
    block.styles.backgroundColor = 'transparent'; 
    block.styles.border = 'none'; 
    block.styles.borderBottom = '2px solid #cbd5e1'; 
    block.styles.borderRadius = '0px'; 
    block.styles.padding = '12px 0px'; 
  } else if (variant === 'pill') {
    block.styles.borderRadius = '999px';
    block.styles.padding = '14px 24px';
    block.styles.boxShadow = 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)';
  }

  return block;
};