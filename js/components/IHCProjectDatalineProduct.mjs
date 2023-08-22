// IHCProjectDatalineProduct.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';

const copyToClipboard = (value) => {
  navigator.clipboard.writeText(value);
};

class IHCProjectDatalineProductInput extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <div class="float-end">
          ${this.props.initialValue ? html`<span class="badge bg-secondary">initially on</span>` : ''}
        </div>
        <i class="bi-box-arrow-right"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>

        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectDatalineProductOutput extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <div class="float-end">
          ${this.props.backupValue ? html`<span class="badge bg-secondary">backup</span>` : ''}
          ${this.props.initialValue ? html`<span class="badge bg-secondary">initially on</span>` : ''}
        </div>
        <i class="bi-box-arrow-left"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>

        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectDatalineProductScene extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <i class="bi-palette"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)} style="font-size: 1rem;"></i>
        ${this.props.note && this.props.note.trim().length > 0 ?
        html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

export default class IHCProjectDatalineProduct extends Component {
  render() {
    return html`
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          ${this.props.locked ? html`<span class="badge text-bg-secondary">locked</span>` : ''}
        </div>
        <h5 class="card-title">
          <i class="bi-plug"></i> ${this.props.name}
        </h5>

        ${this.props.position && this.props.position.trim().length > 0 ?
        html`<h6 class="card-subtitle">${this.props.position}</h6>` : ''}

        ${this.props.note && this.props.note.trim().length > 0 ?
        html`<p class="card-text">${this.props.note}</p>` : ''}

      </div>
      <ul class="list-group list-group-flush">
        ${this.props.inputs.map(i => html`<${IHCProjectDatalineProductInput} ...${i} />`)}
        ${this.props.outputs.map(o => html`<${IHCProjectDatalineProductOutput} ...${o} />`)}
        ${this.props.scenes.map(s => html`<${IHCProjectDatalineProductScene} ...${s} />`)}
      </ul>
    </div>
    `;
  }
}
