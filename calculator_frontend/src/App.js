import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * The main App component which will contain the ToDo list application.
 * Placeholder content, ready to implement ToDo features per Figma design.
 */
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Theme toggle retained for further usage */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {/* Prepare for ToDo app - remove demo content */}
        <div>
          <h1>ToDo App</h1>
          <p>
            Start building your ToDo app features here, following the Figma design.
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
