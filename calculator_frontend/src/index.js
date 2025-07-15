import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Entry point: Only App component is rendered.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
