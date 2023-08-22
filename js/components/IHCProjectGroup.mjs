// IHCProjectGroup.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';
import IHCProjectFunction from './IHCProjectFunction.mjs';
import IHCProjectDatalineProduct from './IHCProjectDatalineProduct.mjs';
import IHCProjectAirlinkProduct from './IHCProjectAirlinkProduct.mjs';

export default class IHCProjectGroup extends Component {
  render() {
    return html`
    <div class="container">
      <h3>
        <i class="bi-pin-map" style="font-size: 2rem;"></i> <span>${this.props.name}</span>
      </h3>
      ${this.props.note && this.props.note.trim().length > 0 ?
        html`<p class="lead">${this.props.note}</p>` :
        null}

      <div class="row row-cols-1 row-cols-md-2 g-4">
        ${this.props.datalineProducts.map(p => html`<div class="col"><${IHCProjectDatalineProduct} ...${p}/></div>`)}
        ${this.props.airlinkProducts.map(p => html`<div class="col"><${IHCProjectAirlinkProduct} ...${p}/></div>`)}
      </div>
    </div>
    <br/>
    `;
  }
}
