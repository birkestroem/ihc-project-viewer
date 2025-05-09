// IHCProjectAirlinkProduct.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';

class IHCProjectAirlinkProductInput extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <div class="float-end">
          ${this.props.initialValue ? html`<span class="badge bg-secondary">initially on</span>` : ''}
        </div>
        <i class="bi-box-arrow-right"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => this.props.copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectAirlinkProductRelay extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <div class="float-end">
          ${this.props.initialValue ? html`<span class="badge bg-secondary">initially on</span>` : ''}
        </div>
        <i class="bi-box-arrow-in-right"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => this.props.copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

export default class IHCProjectAirlinkProduct extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('IHCProjectAirlinkProduct', this.props);
    return html`
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          ${this.props.locked ? html`<span class="badge text-bg-secondary">locked</span>` : ''}
        </div>
        <h5 class="card-title">
          <i class="bi-wifi"></i> ${this.props.name}
        </h5>

        ${this.props.position && this.props.position.trim().length > 0 ?
        html`<h6 class="card-subtitle">${this.props.position}</h6>` : ''}

        ${this.props.note && this.props.note.trim().length > 0 ?
        html`<p class="card-text">${this.props.note}</p>` : ''}

      </div>
      <ul class="list-group list-group-flush">
        ${this.props.inputs.map(i => html`<${IHCProjectAirlinkProductInput} ...${i} />`)}
        ${this.props.relays.map(i => html`<${IHCProjectAirlinkProductRelay} ...${i} />`)}
      </ul>
    </div>
    `;
  }
}
