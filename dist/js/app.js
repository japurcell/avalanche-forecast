import '../css/normalize.css';
import '../css/style.css';
import '../css/layout.css';
import '../css/color.css';
import '../css/fonts.css';
import Icon from '../icon.png';

import Zones from './components/Zones.js';
import addInstallHandlers from './install.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.debug('Service Worker registered')));
}

const apiUrl = 'https://api.avalanche.org/v2/public/products/map-layer/NWAC';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  })
  .then(data => {
    const content = document.getElementById('content');
    Zones(data.features, content);
  })
  .catch(reason => console.error(reason));

addInstallHandlers();
