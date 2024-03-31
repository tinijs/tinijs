import {html} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

@Component()
export class AppWelcomeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-welcome';

  protected render() {
    return html`<h1>Hello world! 👋</h1>`;
  }
}
