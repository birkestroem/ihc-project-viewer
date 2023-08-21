// App.mjs
// Main component for the application.
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { StoreContext } from '../StoreContext.mjs';
import UploadForm from './UploadForm.mjs';
import IHCProjectGroup from './IHCProjectGroup.mjs';

export default class App extends Component {
  render() {
    return html`
        <div class="container">
          <h1>IHC Project Viewer</h1>
        </div>
        <${UploadForm} />
        <div class="container ihc-project-groups">
          <hr />
          <${StoreContext.Consumer}>
            ${({ state }) => {
              return state.ihcProject.groups.map((group) => {
                return html`
                  <${IHCProjectGroup} ...${group} />
                `;
              });
            }}
          </${StoreContext.Consumer}>
        </div>
      `;
  }
}

