 

window.About = function About({ language, onNavigate }) {
  const t = {
    pt: {
      title: 'Sobre Mim',
      intro:
        'Olá! 👋 Sou Raphael, desenvolvedor apaixonado por tecnologia, com ampla experiência em projetos inovadores e soluções personalizadas para o mercado. Desde cedo, sou movido pela curiosidade e pelo desejo de transformar ideias em produtos eficientes e escaláveis.',
      careerTitle: '💻 Carreira como Programador',
      careerText:
        'Atualmente atuo como software engineer na Viasat, com foco em soluções para o setor de petróleo, atendendo grandes clientes como Petrobras, Etesco, Foresea e Acelen. Implemento e desenvolvo algoritmos de engenharia e matemática voltados para cálculos essenciais em todas as fases do ciclo de vida dos poços — da descoberta à extração e até o abandono. Também sou especialista na aplicação da técnica Bowtie (estática e dinâmica), desenvolvendo soluções voltadas à segurança operacional e prevenção de falhas críticas.',
      codebybuddy:
        'Fui o idealizador e responsável técnico da plataforma CodebyBuddy, atual SuperGeeks, criada para ensinar programação de forma interativa e gamificada. Implementei soluções NoCode e LowCode que facilitavam o aprendizado progressivo, permitindo que os alunos evoluíssem até conteúdos de programação avançada de forma prática e envolvente.',
      simulation:
        'Atuei também na Simulation Jogos de Negócio, onde desenvolvi simuladores empresariais para treinar gerentes, investidores e administradores em setores como administração hospitalar, fábricas e instituições de ensino.',
      interestsTitle: 'Interesses Pessoais',
      interestsText:
        'Sou entusiasta de musculação, lutas e natação, mantendo uma rotina disciplinada para cuidar da minha saúde física e mental. Além disso, sou músico pianista, e acredito que a combinação entre arte, foco e atividade física fortalece meu equilíbrio emocional e amplia minha performance profissional.',
      summary:
        '🚀 Resumo: Programador de alma lógica e criativa. Gosto de resolver problemas difíceis com código limpo, estratégia e um toque de ousadia. 😎',
      muscle: 'Musculação',
      piano: 'Piano',
      button: 'Projetos',
    },
    en: {
      title: 'About Me',
      intro:
        "Hello! 👋 I'm Raphael, a developer passionate about technology, with broad experience in innovative projects and custom solutions for the market. Since a young age, I've been driven by curiosity and the desire to turn ideas into efficient, scalable products.",
      careerTitle: '💻 Career as a Programmer',
      careerText:
        'I currently work as a software engineer at Viasat, focused on the oil sector, serving major clients such as Petrobras, Etesco, Foresea, and Acelen. I implement and develop engineering and mathematical algorithms for critical calculations in all stages of the oil well lifecycle — from discovery to extraction and abandonment. I\'m also a specialist in the Bowtie method (static and dynamic), creating solutions focused on operational safety and critical failure prevention.',
      codebybuddy:
        'I was the creator and technical lead behind CodebyBuddy, now known as SuperGeeks, a platform designed to teach programming through interactive and gamified experiences. I implemented NoCode and LowCode solutions that enabled students to gradually progress toward advanced programming in a practical and engaging way.',
      simulation:
        'I also worked at Simulation Business Games, developing corporate simulators to train managers, investors, and administrators in areas such as hospital management, manufacturing, and educational institutions.',
      interestsTitle: 'Personal Interests',
      interestsText:
        "I'm passionate about weightlifting, martial arts, and swimming, maintaining a disciplined routine to take care of my physical and mental health. I'm also a pianist, and I believe that the combination of art, discipline, and physical activity strengthens my emotional balance and boosts my professional performance.",
      summary:
        '🚀 Summary: A programmer with a logical and creative soul. I solve tough problems with clean code, strategy, and a bold mindset. 😎',
      muscle: 'Weightlifting',
      piano: 'Piano',
      button: 'Projects',
    },
  }[language];

  return (
    <section id="about">
      <h2 className="translate">{t.title}</h2>

      <div className="about-container">
        <div className="profile-picture">
          <img src="eu.jpeg" alt="Picture of Raphael Guimarães" />
        </div>

        <div className="about-text">
          <p className="translate">{t.intro}</p>

          <h3 className="translate">{t.careerTitle}</h3>
          <p className="translate">{t.careerText}</p>

          <p className="translate">{t.codebybuddy}</p>

          <p className="translate">{t.simulation}</p>

          <h3 className="translate">{t.interestsTitle}</h3>
          <p className="translate">{t.interestsText}</p>

          <div className="personal-interests">
            <div className="interest-card">
              <span className="icon">🏋️‍♂️</span>
              <p className="translate">{t.muscle}</p>
              <div className="video-wrapper">
                <iframe
                  src="https://www.instagram.com/reel/Cv1lkDrAmOV/embed"
                  frameBorder="0"
                  allowFullScreen
                  allowTransparency="true"
                  loading="lazy"
                  title="Musculação"
                ></iframe>
              </div>
            </div>

            <div className="interest-card">
              <span className="icon">🎹</span>
              <p className="translate">{t.piano}</p>
              <div className="video-wrapper">
                <iframe
                  src="https://www.instagram.com/reel/Ci-3hLxrGUA/embed"
                  frameBorder="0"
                  allowFullScreen
                  allowTransparency="true"
                  loading="lazy"
                  title="Piano"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="highlight-box">
            <p className="highlight-text translate">
              <strong>{t.summary}</strong>
            </p>
          </div>
        </div>
      </div>

      <button
        className="btn translate nextSection"
        onClick={() => onNavigate('projects')}
      >
        {t.button}
      </button>
    </section>
  );
}
 