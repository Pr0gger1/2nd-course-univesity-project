import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import ThemeProvider from './providers/Theme.provider.jsx';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "Productify ToDo App";

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

