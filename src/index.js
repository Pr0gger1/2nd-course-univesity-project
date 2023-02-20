import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './App.js';
import ThemeProvider from './providers/Theme.provider.jsx';

import './index.css';
import UIStatesProvider from './providers/UIStates.provider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = 'Productify ToDo App';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UIStatesProvider>
          <App />
        </UIStatesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);