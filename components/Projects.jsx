 

window.Projects = function Projects({ language, onNavigate }) {
  const t = {
    pt: {
      title: 'Meus Projetos',
      project1Title: 'Projeto 1',
      project2Title: 'Projeto 2',
      project3Title: 'Projeto 3',
      description:
        'Descrição breve do projeto. Tecnologias utilizadas e resultados alcançados.',
      button: 'Ver Projeto',
      next: 'Habilidades',
    },
    en: {
      title: 'My Projects',
      project1Title: 'Project 1',
      project2Title: 'Project 2',
      project3Title: 'Project 3',
      description:
        'Brief project description. Technologies used and results achieved.',
      button: 'View Project',
      next: 'Skills',
    },
  }[language];

  return (
    <section id="projects">
      <h2 className="translate">{t.title}</h2>

      <div className="projects">
        {/* Projeto 1 */}
        <div className="project-card">
          <div className="project-img">Imagem do Projeto</div>
          <div className="project-info">
            <h3 className="project-title translate">{t.project1Title}</h3>
            <p className="translate">{t.description}</p>
            <a href="#" className="btn translate">
              {t.button}
            </a>
          </div>
        </div>

        {/* Projeto 2 */}
        <div className="project-card">
          <div className="project-img">Imagem do Projeto</div>
          <div className="project-info">
            <h3 className="project-title translate">{t.project2Title}</h3>
            <p className="translate">{t.description}</p>
            <a href="#" className="btn translate">
              {t.button}
            </a>
          </div>
        </div>

        {/* Projeto 3 */}
        <div className="project-card">
          <div className="project-img">Imagem do Projeto</div>
          <div className="project-info">
            <h3 className="project-title translate">{t.project3Title}</h3>
            <p className="translate">{t.description}</p>
            <a href="#" className="btn translate">
              {t.button}
            </a>
          </div>
        </div>
      </div>

      <button
        className="btn translate nextSection"
        onClick={() => onNavigate('skills')}
      >
        {t.next}
      </button>
    </section>
  );
}
 
