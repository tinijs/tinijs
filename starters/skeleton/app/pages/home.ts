import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {AppWelcomeComponent} from '../components/welcome.js';

@Page({
  name: 'app-page-home',
  components: [AppWelcomeComponent],
})
export class AppPageHome extends TiniComponent {
  protected render() {
    return html`<app-welcome></app-welcome>`;
  }
}
