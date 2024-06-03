import {html, css, nothing} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
} from '@tinijs/core';

import {TiniBreadcrumbsComponent} from '../../ui/components/breadcrumbs.js';

@Component({
  components: [TiniBreadcrumbsComponent],
})
export class AppPageUIDevBreadcrumbsComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-breadcrumbs';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-breadcrumbs></tini-breadcrumbs>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
