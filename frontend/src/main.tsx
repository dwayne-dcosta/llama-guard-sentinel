import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Map browser tab favicon icon directly to the local header-logo.png
const link = (document.querySelector("link[rel~='icon']") || document.createElement('link')) as HTMLLinkElement;
link.rel = 'icon';
link.type = 'image/png';
link.href = '/header-logo.png';
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
