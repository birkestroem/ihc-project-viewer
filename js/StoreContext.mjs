// StoreContext.mjs
import { createContext, html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';

export const StoreContext = createContext();

export class StoreProvider extends Component {
    state = {
      ihcProject: {
        groups: [],
      },
    };

    action = {
      clearIHCProjectGroups: () => {
        this.setState((prevStates) => {
          return {
            ...prevStates,
            ihcProject: {
              ...prevStates.ihcProject,
              groups: [],
            },
          };
        });
      },
      addIHCProjectGroup: (group) => {
        this.setState((prevStates) => {
          return {
            ...prevStates,
            ihcProject: {
              ...prevStates.ihcProject,
              groups: [...prevStates.ihcProject.groups, group],
            },
          };
        });
      },
    };

    render() {
      return html`
        <${StoreContext.Provider} value=${{
          state: this.state,
          action: this.action,
        }}>
          ${this.props.children}
        </${StoreContext.Provider}>
      `;
    }
  }
