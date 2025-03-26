 

window.Home = function Home({ language, onNavigate }) {
  const content = {
    pt: {
      title: 'Olá, sou Desenvolvedor Full Stack',
      paragraph:
        'Seja bem-vindo! Especializado em Python, JavaScript e Ciência de Dados, ajudo empresas e projetos a evoluírem com inteligência artificial, usando Machine Learning e LLMs para criar valor de verdade.',
      contactText: 'Quer conversar?',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      aboutBtn: 'Sobre mim',
    },
    en: {
      title: "Hi, I'm a Full Stack Developer",
      paragraph:
        "Welcome! Specialized in Python, JavaScript, and Data Science, I help companies and projects grow with artificial intelligence, using Machine Learning and LLMs to create real value.",
      contactText: 'Want to talk?',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      aboutBtn: 'About me',
    },
  };

  const t = content[language];

  return (
    <section id="home">
      <h1 className="translate">{t.title}</h1>

      <p className="translate">
        {t.paragraph.split('<br />').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <p className="translate cta-links">
        {t.contactText}{' '}
        <a
          href="https://wa.me/5521971837647"
          className="cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.whatsapp}
        </a>{' '}
        {language === 'pt' ? 'ou' : 'or'}{' '}
        <a
          href="https://www.linkedin.com/in/raphaelguim/"
          className="cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.linkedin}
        </a>
      </p>

      <button
        className="btn translate nextSection"
        onClick={() => onNavigate('about')}
      >
        {t.aboutBtn}
      </button>
    </section>
  );
}

 
