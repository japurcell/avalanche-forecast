import data from './initial-data.js';
import Zones from '../views/components/Zones.js';

const content = document.getElementById('content');
Zones(data.features, content);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./service-worker.js')
//     .then(() => console.debug('Service Worker registered'));
// }
