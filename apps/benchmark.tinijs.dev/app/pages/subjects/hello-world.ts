import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {HELLO_WORLD_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-hello-world',
})
export class AppPageHelloWorld extends TiniComponent {
  readonly metadata = {
    title: HELLO_WORLD_SUBJECT.title,
    description: HELLO_WORLD_SUBJECT.desc,
  };

  protected render() {
    return html`
      <h1>Hello world!</h1>
      <p>
        A page for testing the overhead of these TiniJS parts:
        <a
          href="https://tinijs.dev/framework/folder-structure#mandatory-files"
          target="_blank"
          >App</a
        >,
        <a href="https://tinijs.dev/framework/router" target="_blank">Router</a
        >,
        <a href="https://tinijs.dev/framework/meta" target="_blank">Meta</a> and
        <a href="https://tinijs.dev/ui/get-started" target="_blank">UI</a>.
      </p>
    `;
  }

  static styles = css``;
}
