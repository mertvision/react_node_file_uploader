/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of React and Utils
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import Statement of CSS Files
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
