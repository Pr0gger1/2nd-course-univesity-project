import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';

import store from './store/store.js';

import { Provider } from 'react-redux';
import ThemeProvider from './providers/Theme.provider.jsx';
import UIStatesProvider from './providers/UIStates.provider.jsx';
import AuthProvider from './providers/AuthContext.provider.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = 'Productify ToDo App';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <UIStatesProvider>
              <App />
            </UIStatesProvider>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);