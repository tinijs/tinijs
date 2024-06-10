import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata, PageMetadata} from '@tinijs/meta';

@Page({
  name: 'app-page-404',
})
export class AppPage404 extends TiniComponent implements PageWithMetadata {
  readonly metadata: PageMetadata = {
    title: 'Oops',
    description: 'Error 404, page not found!',
  };

  protected render() {
    return html`<h1 style="text-align: center;">Oops 🫣!</h1>`;
  }
}
