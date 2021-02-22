import { html } from 'lit-html';

export default ({ start_date, end_date }) =>
  html`
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
  `;
