// main.mjs
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { StoreProvider } from './StoreContext.mjs';
import App from './components/App.mjs';

render(html`
  <${StoreProvider}>
    <${App}/>
  </${StoreProvider}>
`, document.body);
