import { html, nothing, render } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';

const iconClickHandler = {
  handleEvent(e) {
    const warningId = e.target.getAttribute('data-warningid');
    const warning = document.getElementById(warningId);

    if (warning) {
      warning.classList.remove('d-none');
    }
  }
};

const warningTemplate = ({ id, warning, color, font_color }) =>
  warning && warning.reason && warning.reason.length
    ?
      html`
        <div id="warning${id}"
          class="d-none zone__warning"
          style=${styleMap({ backgroundColor: color, color: font_color })}>
          ${warning.reason}
        </div>
      `
    : nothing;

const renderZones = features =>
  features.map(feature => {
    const { color, font_color, name, link, start_date, end_date, travel_advice, warning }
      = feature.properties;
    return html`
      <article>
        <header>
          <span @click=${iconClickHandler}
            data-warningid="warning${feature.id}"
            style=${styleMap({ color: color })}
            class="material-icons md-36">warning</span>
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
      ${warningTemplate({ id: feature.id, warning, color, font_color })}
    `});

export default (features, targetElement) => {
  if (Array.isArray(features)) {
    render(renderZones(features), targetElement);
  }
};
