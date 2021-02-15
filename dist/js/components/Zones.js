import { html, render } from 'lit-html';
import zonePeriod from './ZonePeriod.js';
import { warningIcon, warningTemplate } from './Warning.js';

const renderZones = features =>
  features.map(feature => {

    const {
      color,
      font_color,
      name,
      link,
      start_date,
      end_date,
      travel_advice,
      warning
    } = feature.properties;

    return html`
      <article>
        <header>
          ${warningIcon({ id: feature.id, warning, color })}
          <a class="zone__link" href="${link}">${name}</a>
        </header>
        ${zonePeriod({ start_date, end_date })}
        <p>${travel_advice}</p>
      </article>
      ${warningTemplate({
        id: feature.id,
        warning,
        color,
        font_color
      })}
    `});

export default (features, targetElement) => {
  if (Array.isArray(features)) {
    render(renderZones(features), targetElement);
  }
};
