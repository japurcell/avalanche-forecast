import '../css/normalize.css';
import '../css/style.css';
import '../css/layout.css';
import '../css/color.css';
import '../css/fonts.css';
import '../icon.png';
import '../tile.png';
import '../site.webmanifest';

import Zones from './components/Zones.js';
import addInstallHandlers from './install.js';
import { environment } from 'config';
import data from './initial-data.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    let swPath = '/service-worker.js';
    let scope = null;

    if (environment === 'production') {
      swPath = '/avalanche-forecast/service-worker.js';
      scope = { scope: '/avalanche-forecast/' };
    }

    navigator.serviceWorker
      .register(swPath, scope)
      .then(() => console.debug('Service Worker registered'));
  });
}

const content = document.getElementById('content');
Zones(data.features, content);

const apiUrl = 'https://api.avalanche.org/v2/public/products/map-layer/NWAC';

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw Error(`HTTP error ${response.status}: ${response.statusText}`);
//     }

//     return response.json();
//   })
//   .then(data => {
//     const content = document.getElementById('content');
//     Zones(data.features, content);
//   })
//   .catch(reason => console.error(reason));

addInstallHandlers();
