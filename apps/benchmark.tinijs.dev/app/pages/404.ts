import {html} from 'lit';

import {page, TiniElement} from '@tinijs/core';
import type {PageWithMetadata, PageMetadata} from '@tinijs/meta';

@page({
  name: 'app-page-404',
})
export class AppPage404 extends TiniElement implements PageWithMetadata {
  readonly metadata: PageMetadata = {
    title: 'Oops',
    description: 'Error 404, page not found!',
  };

  protected render() {
    return html`<h1 style="text-align: center;">Oops 🫣!</h1>`;
  }
}
