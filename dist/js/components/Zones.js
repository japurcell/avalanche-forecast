import { html, render } from 'lit-html';

const renderZones = (zones) =>
  zones.map(({ name, link, travel_advice }) =>
    html`
      <article>
        <header>
          <a class="zone__link" href="${link}">${name}</a>
        </header>
        <p>${travel_advice}</p>
      </article>
    `);

export default (features, targetElement) => {
  if (Array.isArray(features)) {
    render(renderZones(features.map(f => f.properties)), targetElement);
  }
};
