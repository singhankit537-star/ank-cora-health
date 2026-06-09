/**
 * Main entry point
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@ank-cora/ui-mfe/theme.css';
import './index.css';

// Render app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
