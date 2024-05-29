import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
} from '@tinijs/core';

import {TiniBadgeComponent} from '../../ui/components/badge.js';

@Component({
  components: [TiniBadgeComponent],
})
export class AppPageUIDevBadgeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-badge';

  protected render() {
    return html`
      <ui-dev-section titleText="Defaults">
        <tini-badge>Default</tini-badge>
        <tini-badge shape="pill">Pill</tini-badge>
        <tini-badge shape="circle">99+</tini-badge>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
