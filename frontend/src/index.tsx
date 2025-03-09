import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import App from './App.tsx';
import AppProvider  from './providers/index.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

