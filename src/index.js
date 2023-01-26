import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "Productify ToDo App";

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

