// IHCProjectFunction.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';

const copyToClipboard = (value) => {
  navigator.clipboard.writeText(value);
};

class IHCProjectFunctionInput extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <i class="bi-box-arrow-right"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectFunctionOutput extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <i class="bi-box-arrow-left"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectFunctionSetting extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <i class="bi-gear"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectFunctionInternalSetting extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <i class="bi-gear"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

class IHCProjectFunctionProgram extends Component {
  render() {
    return html`
      <li class="list-group-item">
        <i class="bi-code-square"></i> ${this.props.name} - #${this.props.id.dec} <i class="bi-clipboard-plus" onclick=${() => copyToClipboard(this.props.id.dec)}></i>
        ${this.props.note && this.props.note.trim().length > 0 ? html`<br />${this.props.note}` : ''}
      </li>
    `;
  }
}

export default class IHCProjectFunction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return html`
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          ${this.props.locked ? html`<span class="badge text-bg-secondary">locked</span>` : ''}
        </div>
        <h5 class="card-title">
          <i class="bi-gear"></i> ${this.props.name}
        </h5>

        ${this.props.position && this.props.position.trim().length > 0 ?
        html`<h6 class="card-subtitle">${this.props.position}</h6>` : ''}

        ${this.props.note && this.props.note.trim().length > 0 ?
        html`<p class="card-text">${this.props.note}</p>` : ''}
      </div>

      <ul class="list-group list-group-flush">
        ${this.props.inputs.map(i => html`<${IHCProjectFunctionInput} ...${i} />`)}
        ${this.props.outputs.map(o => html`<${IHCProjectFunctionOutput} ...${o} />`)}
        ${this.props.settings.map(s => html`<${IHCProjectFunctionSetting} ...${s} />`)}
        ${this.props.internalSettings.map(is => html`<${IHCProjectFunctionInternalSetting} ...${is} />`)}
        ${this.props.programs.map(p => html`<${IHCProjectFunctionProgram} ...${p} />`)}
      </ul>
    </div>
    `;
  }
}
