import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {AppWelcomeComponent} from '../components/welcome.js';

@Page({
  name: 'app-page-blank',
  components: [AppWelcomeComponent],
})
export class AppPageBlank extends TiniComponent {
  readonly metadata = {
    title: 'Blank page',
    description: 'A blank page.',
  };

  protected render() {
    return html`<app-welcome></app-welcome>`;
  }

  static styles = css``;
}
