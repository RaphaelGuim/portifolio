 

window.Contact = function Contact({ language,onNavigate }) {
  const t = {
    pt: {
      title: 'Entre em Contato',
      description:
        'Interessado em trabalhar juntos? Entre em contato comigo pelos seguintes meios:',
      emailLabel: 'Email:',
      linkedinLabel: 'LinkedIn:',
      githubLabel: 'GitHub:',
      whatsappLabel: 'Quer conversar?',
      whatsappBtn: 'WhatsApp',
      aboutBtn:"Início"
    },
    en: {
      title: 'Contact Me',
      description:
        'Interested in working together? Contact me through the following means:',
      emailLabel: 'Email:',
      linkedinLabel: 'LinkedIn:',
      githubLabel: 'GitHub:',
      whatsappLabel: 'Want to talk?',
      whatsappBtn: 'WhatsApp',
      aboutBtn:"Home"
    },
  }[language];

  return (
    <section id="contact">
      <h2 className="translate">{t.title}</h2>

      <p className="translate">{t.description}</p>

      <p className="translate">
        {t.emailLabel}{' '}
        <a href="mailto:guimaraesraphael0203@gmail.com">
          guimaraesraphael0203@gmail.com
        </a>
      </p>

      <p className="translate">
        {t.linkedinLabel}{' '}
        <a
          href="https://www.linkedin.com/in/raphaelguim/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/raphaelguim
        </a>
      </p>

      <p className="translate">
        {t.githubLabel}{' '}
        <a
          href="https://github.com/RaphaelGuim"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/RaphaelGuim
        </a>
      </p>

      <p className="translate cta-links">
        {t.whatsappLabel}{' '}
        <a
          href="https://wa.me/5521971837647"
          className="cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.whatsappBtn}
        </a>
      </p>

      <button
        className="btn translate nextSection"
        onClick={() => onNavigate('home')}
      >
        {t.aboutBtn}
      </button>
    </section>
  );
}

 