import Zones from './components/Zones.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => console.debug('Service Worker registered'));
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
