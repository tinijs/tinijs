import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: 'app-page-404',
})
export class AppPage404 extends TiniComponent {
  protected render() {
    return html`<h1 style="text-align: center;">Oops 🫣!</h1>`;
  }
}
