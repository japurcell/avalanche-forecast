import { html, nothing } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import zonePeriod from './ZonePeriod.js';

const warningClickHandler = {
  handleEvent(e) {
    const warningId = e.target.getAttribute('data-warningid');
    const warning = document.getElementById(warningId);

    if (warning) {
      warning.classList.toggle('d-none');
    }
  }
};

const warningCloseClickHandler = {
  handleEvent(e) {
    const warningId = e.target.getAttribute('data-warningid');
    const warning = document.getElementById(warningId);

    if (warning) {
      warning.classList.add('d-none');
    }
  }
};

const warningIcon = ({ id, warning, color }) =>
  html`
    <span @click=${warningClickHandler}
      data-warningid="warning${id}"
      style=${styleMap({
        color: color,
        cursor: warning && warning.reason ? 'pointer' : 'inherit'
      })}
      class="material-icons md-36">warning</span>
  `;

const warningTemplate = ({ id, warning, color, font_color }) =>
  warning && warning.reason && warning.reason.length
    ?
      html`
        <div id="warning${id}"
          data-warningid="warning${id}"
          @click=${warningCloseClickHandler}
          class="d-none zone__warning"
          style=${styleMap({ backgroundColor: color, color: font_color })}>
          <div class="warning__navbar"
            @click=${warningCloseClickHandler}
            data-warningid="warning${id}">
            <span></span>
            <span @click=${warningCloseClickHandler}
                  data-warningid="warning${id}"
                  class="material-icons md-48">highlight_off</span>
          </div>
          <div class="warning__body">
            ${zonePeriod(warning)}
            ${warning.reason}
          </div>
        </div>
      `
    : nothing;

export { warningIcon, warningTemplate };
