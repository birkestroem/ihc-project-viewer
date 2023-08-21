// IHCProjectAirlinkProduct.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';

export default class IHCProjectAirlinkProduct extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return html`
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">
          <i class="bi-wifi" style="font-size: 1.5rem;"></i> <span>${this.props.name}</span>
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text">${this.props.note}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Input 1</li>
      </ul>
    </div>
    `;
  }
}
