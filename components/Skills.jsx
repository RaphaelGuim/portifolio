 

window.Skills =function Skills({ language, onNavigate }) {
  const t = {
    pt: {
      title: 'Minhas Habilidades',
      description:
        'Estas são algumas das tecnologias e ferramentas com as quais trabalho:',
      backend: 'Desenvolvimento Back-end',
      frontend: 'Desenvolvimento Front-end',
      data: 'Ciência e Análise de Dados',
      next: 'Contato',
    },
    en: {
      title: 'My Skills',
      description:
        'These are some of the technologies and tools I work with:',
      backend: 'Back-end Development',
      frontend: 'Front-end Development',
      data: 'Data Science & Analysis',
      next: 'Contact',
    },
  }[language];

  return (
    <section id="skills">
      <h2 className="translate">{t.title}</h2>
      <p className="translate">{t.description}</p>

      <div className="skills">
        {/* Back-end */}
        <div className="skills-category">
          <h3 className="translate">{t.backend}</h3>
          <div className="skills-list">
            <div className="skill">Python</div>
            <div className="skill">Django</div>
            <div className="skill">LangChain</div>
            <div className="skill">Node.js</div>
            <div className="skill">Java</div>
          </div>
        </div>

        {/* Front-end */}
        <div className="skills-category">
          <h3 className="translate">{t.frontend}</h3>
          <div className="skills-list">
            <div className="skill">JavaScript</div>
            <div className="skill">React</div>
            <div className="skill">Three.js</div>
            <div className="skill">P5.js</div>
            <div className="skill">D3.js</div>
          </div>
        </div>

        {/* Data Science */}
        <div className="skills-category">
          <h3 className="translate">{t.data}</h3>
          <div className="skills-list">
            <div className="skill">Ciência de Dados</div>
            <div className="skill">Matemática e Estatística</div>
            <div className="skill">Visualização de Dados</div>
            <div className="skill">Machine Learning</div>
          </div>
        </div>
      </div>

      <button
        className="btn translate nextSection"
        onClick={() => onNavigate('contact')}
      >
        {t.next}
      </button>
    </section>
  );
}

 