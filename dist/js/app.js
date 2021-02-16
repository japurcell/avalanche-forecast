import data from './initial-data.js';
import Zones from './components/Zones.js';

const apiUrl = 'https://api.avalanche.org/v2/public/products/map-layer/NWAC';

const content = document.getElementById('content');
Zones(data.features, content);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./service-worker.js')
//     .then(() => console.debug('Service Worker registered'));
// }
