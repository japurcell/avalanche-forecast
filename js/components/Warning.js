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

const warningIcon = ({ id, warning, color }) => {
  const hasWarning = warning && warning.reason;

  return html`
    <span @click=${warningClickHandler}
      data-warningid="warning${id}"
      style=${styleMap({
        color: color,
        cursor: hasWarning ? 'pointer' : 'inherit'
      })}
      class="material-icons md-36${hasWarning ? ' warning__icon' : ''}">${hasWarning ? 'warning' : 'error_outline'}</span>
  `;
};

const warningTemplate = ({ id, warning, color, danger }) =>
  warning && warning.reason && warning.reason.length
    ?
      html`
        <div id="warning${id}"
          data-warningid="warning${id}"
          class="d-none modal__bg">
          <div @click=${warningCloseClickHandler}
            class="zone__warning"
            style=${styleMap({ borderColor: color })}>
            <div class="warning__navbar"
              @click=${warningCloseClickHandler}
              data-warningid="warning${id}">
              <span class="warning__navbar-title">Danger - ${danger}</span>
              <span @click=${warningCloseClickHandler}
                    data-warningid="warning${id}"
                    class="material-icons md-48">highlight_off</span>
            </div>
            <div class="warning__body">
              ${zonePeriod(warning)}
              <div>${warning.reason}</div>
            </div>
          </div>
        </div>
      `
    : nothing;

export { warningIcon, warningTemplate };
