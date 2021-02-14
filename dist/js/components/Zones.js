import { html, render } from 'lit-html';

const renderZones = (zones) =>
  zones.map(({ name, link, travel_advice }) =>
    html`
      <article>
        <h2><a href="${link}">${name}</a></h2>
        <p>${travel_advice}</p>
      </article>
    `);

export default (features, targetElement) => {
  if (Array.isArray(features)) {
    render(renderZones(features.map(f => f.properties)), targetElement);
  }
};
