import data from './initial-data.js';

const content = document.getElementById('content');

if (data.features && data.features.length) {
    data.features.forEach(feature => {
    const name = document.createElement('article');
    name.innerText = feature.properties.name;
    content.appendChild(name);
  });
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./service-worker.js')
//     .then(() => console.debug('Service Worker registered'));
// }
