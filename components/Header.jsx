 

window.Header = function Header({ language, onLanguageToggle, onNavigate, activeSection }) {
  const labels = {
    pt: ['Início', 'Sobre', 'Projetos', 'Habilidades', 'Contato'],
    en: ['Home', 'About', 'Projects', 'Skills', 'Contact'],
  };

  const sections = ['home', 'about', 'projects', 'skills', 'contact'];

  return (
    <header>
      <div className="logo">Raphael Guimarães</div>
      <nav>
        <ul>
          {sections.map((section, index) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(section);
                }}
              >
                {labels[language][index]}
              </a>
            </li>
          ))}
        </ul>
        <div className="language-toggle">
          <button
            className={`language-btn ${language === 'pt' ? 'active' : ''}`}
            onClick={() => onLanguageToggle('pt')}
          >
            PT-BR
          </button>
          <button
            className={`language-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => onLanguageToggle('en')}
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}

 
