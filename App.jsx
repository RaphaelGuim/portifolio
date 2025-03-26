window.App = function App() {
  const [language, setLanguage] = React.useState('pt');
  const [section, setSection] = React.useState('home');

  const renderSection = () => {
    switch (section) {
      case 'about':
        return <window.About language={language} onNavigate={setSection} />;
      case 'projects':
        return <window.Projects language={language} onNavigate={setSection} />;
      case 'skills':
        return <window.Skills language={language} onNavigate={setSection} />;
      case 'contact':
        return <window.Contact language={language}  onNavigate={setSection} />;
      case 'home':
        return <window.Home language={language}  onNavigate={setSection} />;
      default:
        return <window.Home language={language} onNavigate={setSection} />;
    }
  };

  return (
    <div id="content">
      <canvas id="bg"></canvas>

      <window.Header
        language={language}
        onLanguageToggle={setLanguage}  
        onNavigate={setSection}
        activeSection={section}
      />

      {renderSection()}

      <window.Footer language={language} />
    </div>
  );
};
