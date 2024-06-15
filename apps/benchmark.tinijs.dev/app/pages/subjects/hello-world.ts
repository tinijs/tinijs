import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {info} from '../../utils/subject.js';

export const HELLO_WORLD_SUBJECT = info({
  title: 'Hello world',
  path: '/hello-world',
  docPath: '/framework/get-started',
  variants: 1,
  suggestedItems: 1,
});

@Page({
  name: 'app-page-hello-world',
})
export class AppPageHelloWorld extends TiniComponent {
  readonly metadata = {
    title: 'Hello world',
    description: 'A hello world page.',
  };

  protected render() {
    return html`
      <h1>Hello world!</h1>
      <p>A page for testing the overhead of these TiniJS parts: <a href="https://tinijs.dev/framework/folder-structure#mandatory-files" target="_blank">App</a>, <a href="https://tinijs.dev/framework/router" target="_blank">Router</a>, <a href="https://tinijs.dev/framework/meta" target="_blank">Meta</a> and <a href="https://tinijs.dev/ui/get-started" target="_blank">UI</a>.</p>
    `;
  }

  static styles = css``;
}
