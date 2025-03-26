function Header({ onNavigate }) {
    return (
        <header>
            <div className="logo">Raphael Guimarães</div>
            <nav>
                <ul>
                    <li><button onClick={() => onNavigate("home")}>Início</button></li>
                    <li><button onClick={() => onNavigate("about")}>Sobre</button></li>
                    <li><button onClick={() => onNavigate("projects")}>Projetos</button></li>
                    <li><button onClick={() => onNavigate("skills")}>Habilidades</button></li>
                    <li><button onClick={() => onNavigate("contact")}>Contato</button></li>
                </ul>
            </nav>
        </header>
    );
}
