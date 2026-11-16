import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';
ReactGA.initialize('G-QPSC3248XS');
ReactGA.pageview(window.location.pathname + window.location.search);

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element was not found');
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove any service worker registration left by earlier deployments.
serviceWorker.unregister();
