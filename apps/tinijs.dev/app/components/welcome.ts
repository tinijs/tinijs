import {html} from 'lit';

import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button.js';

import {Component, TiniComponent} from '@tinijs/core';

@Component({
  components: [TiniButtonComponent],
})
export class AppWelcomeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-welcome';

  protected render() {
    return html`<h1>Hello world! 👋</h1> <tini-button scheme="primary">Test</tini-button>`;
  }
}
