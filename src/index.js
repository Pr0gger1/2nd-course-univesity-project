import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import store from './store/store.js';

import { Provider } from 'react-redux';

import './index.css';
import { themes } from "./store/reducers/ThemeSlice";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = 'Productify ToDo App';

const currentTheme = localStorage.getItem('theme');
if (!currentTheme) localStorage.setItem('theme', themes.light);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);