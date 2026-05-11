import { FactoryContext } from '../blockFactory';

export const buildForm = (block: any, variant: string, ctx: FactoryContext) => {
  block.styles.width = '100%'; 
  block.styles.backgroundColor = 'transparent'; 
  block.styles.padding = '0px';
  
  if (variant === 'newsletter') {
    block.name = 'NEWSLETTER'; 
    block.styles.display = 'flex'; 
    block.styles.flexDirection = 'row'; 
    block.styles.gap = '10px';
    const input = ctx.createBlock('input', 'classic', 'Email'); input.text = 'Twój adres email...'; input.styles.flex = '1';
    const btn = ctx.createBlock('button', 'classic', 'Zapisz'); btn.text = 'Zapisz się'; btn.styles.backgroundColor = '#f43f5e';
    block.children = [input, btn];
  }
  else if (variant === 'contact') {
    block.name = 'KONTAKT'; block.styles.padding = '40px'; block.styles.backgroundColor = '#ffffff'; block.styles.borderRadius = '24px'; block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)'; block.styles.border = '1px solid #f1f5f9'; block.styles.gap = '16px'; block.styles.maxWidth = '500px';
    const h2 = ctx.createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Napisz do nas'; h2.styles.marginBottom = '10px'; h2.styles.color = '#0f172a';
    const nameInp = ctx.createBlock('input', 'classic', 'Imię'); nameInp.text = 'Twoje imię';
    const emailInp = ctx.createBlock('input', 'classic', 'Email'); emailInp.text = 'Adres e-mail';
    const msgInp = ctx.createBlock('input', 'textarea', 'Wiadomość'); msgInp.text = 'W czym możemy pomóc?';
    const btn = ctx.createBlock('button', 'classic', 'Wyślij'); btn.text = 'Wyślij wiadomość'; btn.styles.width = '100%'; btn.styles.backgroundColor = '#f43f5e';
    block.children = [h2, nameInp, emailInp, msgInp, btn];
  }
  else if (variant === 'login') {
    block.name = 'LOGOWANIE'; block.styles.padding = '40px'; block.styles.backgroundColor = '#ffffff'; block.styles.borderRadius = '24px'; block.styles.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)'; block.styles.border = '1px solid #f1f5f9'; block.styles.gap = '16px'; block.styles.maxWidth = '400px';
    const h2 = ctx.createBlock('h2', 'classic', 'Tytuł'); h2.text = 'Zaloguj się'; h2.styles.marginBottom = '20px'; h2.styles.color = '#0f172a'; h2.styles.textAlign = 'center';
    const emailInp = ctx.createBlock('input', 'classic', 'Email'); emailInp.text = 'Adres e-mail';
    const passInp = ctx.createBlock('input', 'classic', 'Hasło'); passInp.text = '••••••••';
    const btn = ctx.createBlock('button', 'classic', 'Wyślij'); btn.text = 'Zaloguj się'; btn.styles.width = '100%'; btn.styles.backgroundColor = '#0f172a';
    const link = ctx.createBlock('p', 'classic', 'Link'); link.text = 'Zapomniałeś hasła?'; link.styles.textAlign = 'center'; link.styles.fontSize = '13px'; link.styles.color = '#64748b'; link.styles.marginTop = '10px';
    block.children = [h2, emailInp, passInp, btn, link];
  }
  else if (variant === 'waitlist') {
    block.name = 'WAITLIST'; 
    block.styles.display = 'flex'; 
    block.styles.flexDirection = 'row'; 
    block.styles.gap = '0px';
    block.styles.backgroundColor = '#ffffff';
    block.styles.border = '1px solid #e2e8f0';
    block.styles.borderRadius = '999px';
    block.styles.padding = '6px';
    block.styles.width = '100%';
    block.styles.maxWidth = '500px';
    block.styles.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
    
    const input = ctx.createBlock('input', 'classic', 'Email'); 
    input.text = 'Wpisz swój email...'; 
    input.styles.flex = '1'; input.styles.border = 'none'; input.styles.backgroundColor = 'transparent'; input.styles.boxShadow = 'none'; input.styles.padding = '10px 20px';
    
    const btn = ctx.createBlock('button', 'classic', 'Zapisz'); 
    btn.text = 'Dołącz do listy'; 
    btn.styles.backgroundColor = '#0f172a'; btn.styles.borderRadius = '999px'; btn.styles.padding = '12px 24px'; btn.styles.margin = '0';
    
    block.children = [input, btn];
  }

  return block;
};