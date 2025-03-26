async function loadAndCompileBabel(src) {
    const response = await fetch(src);
    const code = await response.text();
    const compiled = Babel.transform(code, { presets: ['react'] }).code;
    eval(compiled);
}

// Carregue seus componentes aqui
Promise.all([
    loadAndCompileBabel('./Header.jsx'),
    loadAndCompileBabel('./Home.jsx'),
    loadAndCompileBabel('./About.jsx'),
    loadAndCompileBabel('./Projects.jsx'),
    loadAndCompileBabel('./Skills.jsx'),
    loadAndCompileBabel('./Contact.jsx'),
    loadAndCompileBabel('./Footer.jsx'),
    loadAndCompileBabel('./App.jsx')
]).then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
});