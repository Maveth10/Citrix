import { FactoryContext } from '../blockFactory';

export const buildButton = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = 'max-content';
  block.styles.cursor = 'pointer';
  block.styles.display = 'flex';
  block.styles.alignItems = 'center';
  block.styles.justifyContent = 'center';
  
  if (variant === 'btn-shine') {
    block.styles.backgroundColor = '#0f172a'; block.styles.color = '#ffffff'; block.styles.padding = '14px 32px'; block.styles.borderRadius = '12px'; block.styles.fontWeight = 'bold'; block.styles.overflow = 'hidden'; block.styles.border = '1px solid #334155';
    block.text = `<style>@keyframes shine_${ctx.rnd} { 100% { left: 125%; } } #block-${block.id}::after { content: ''; position: absolute; top: -50%; left: -100%; width: 50%; height: 200%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent); transform: skewX(-20deg); animation: shine_${ctx.rnd} 3s infinite; z-index: 1; pointer-events: none; }</style>Przycisk Shine`;
  } else if (variant === 'btn-glow') {
    block.styles.backgroundColor = 'transparent'; block.styles.color = '#ffffff'; block.styles.padding = '14px 32px'; block.styles.borderRadius = '12px'; block.styles.fontWeight = 'bold';
    block.text = `<style>@keyframes rotate_${ctx.rnd} { 100% { transform: rotate(360deg); } } #block-${block.id}::before { content: ''; position: absolute; inset: -2px; border-radius: 14px; background: conic-gradient(from 0deg, #ff4500, #9333ea, #3b82f6, #ff4500); animation: rotate_${ctx.rnd} 4s linear infinite; z-index: -2; } #block-${block.id}::after { content: ''; position: absolute; inset: 2px; background: #0a0a0c; border-radius: 10px; z-index: -1; }</style>Magic Glow`;
  } else if (variant === 'btn-pulse') {
    block.styles.backgroundColor = '#ff4500'; block.styles.color = '#ffffff'; block.styles.padding = '16px 36px'; block.styles.borderRadius = '999px'; block.styles.fontWeight = '900';
    block.text = `<style>@keyframes pulse_${ctx.rnd} { 0% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(255, 69, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 69, 0, 0); } } #block-${block.id} { animation: pulse_${ctx.rnd} 2s infinite; }</style>Pulsowanie`;
  } else if (variant === 'btn-brutal') {
    block.styles.backgroundColor = '#fbbf24'; block.styles.color = '#000000'; block.styles.padding = '16px 32px'; block.styles.fontWeight = '900'; block.styles.border = '3px solid #000000'; block.styles.boxShadow = '5px 5px 0px #000000'; block.styles.textTransform = 'uppercase'; block.styles.letterSpacing = '1px'; block.styles.transition = 'all 0.1s ease';
    block.text = `<style>#block-${block.id}:active { transform: translate(5px, 5px) !important; box-shadow: 0px 0px 0px #000000 !important; }</style>Neo-Brutalizm`;
  } else if (variant === 'btn-3d') {
    block.styles.backgroundColor = '#3b82f6'; block.styles.color = '#ffffff'; block.styles.padding = '16px 32px'; block.styles.borderRadius = '12px'; block.styles.fontWeight = 'bold'; block.styles.borderBottom = '6px solid #1d4ed8'; block.styles.transition = 'all 0.1s ease';
    block.text = `<style>#block-${block.id}:active { transform: translateY(6px) !important; border-bottom-width: 0px !important; margin-bottom: 6px !important; }</style>Przycisk 3D`;
  } else {
    block.styles.backgroundColor = variant === 'secondary' ? '#e2e8f0' : '#3b82f6';
    block.styles.color = variant === 'secondary' ? '#0f172a' : '#ffffff';
    block.styles.padding = '12px 24px';
    block.styles.borderRadius = variant === 'rounded' ? '999px' : '8px';
    block.styles.fontWeight = '600';
    block.text = 'Przycisk';
    if (variant === 'outline') {
        block.styles.backgroundColor = 'transparent';
        block.styles.color = '#3b82f6';
        block.styles.border = '2px solid #3b82f6';
    }
  }

  return block;
};