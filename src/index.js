import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import store from './store/store.js';

import { Provider } from 'react-redux';
import AuthProvider from './providers/AuthContext.provider.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = 'Productify ToDo App';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);