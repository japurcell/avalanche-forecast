import { html, render } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';

const renderZones = (zones) =>
  zones.map(({ color, name, link, start_date, end_date, travel_advice }) =>
    html`
      <article>
        <header>
          <span style=${styleMap({ color: color })} class="material-icons">warning</span>
          <a class="zone__link" href="${link}">${name}</a>
        </header>
        <div class="zone__period">
          <div class="zone__period-item">
            <div class="zone__period-item-header">ISSUED</div>
            <div>${new Date(start_date).toLocaleString()}</div>
          </div>
          <div class="zone__period-item">
            <div class="zone__period-item-header">EXPIRES</div>
            <div>${new Date(end_date).toLocaleString()}</div>
          </div>
        </div>
        <p>${travel_advice}</p>
      </article>
    `);

export default (features, targetElement) => {
  if (Array.isArray(features)) {
    render(renderZones(features.map(f => f.properties)), targetElement);
  }
};
