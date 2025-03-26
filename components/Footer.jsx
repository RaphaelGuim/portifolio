 


window.Footer = function Footer({ language }) {
  const t = {
    pt: '© 2025 Meu Portfólio. Todos os direitos reservados.',
    en: '© 2025 My Portfolio. All rights reserved.',
  }[language];

  return (
    <footer>
      <p className="translate">{t}</p>
    </footer>
  );
}

 
