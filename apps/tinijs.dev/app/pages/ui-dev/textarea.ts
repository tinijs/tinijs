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

import {TiniTextareaComponent} from '../../ui/components/textarea.js';

@Component({
  components: [TiniTextareaComponent],
})
export class AppPageUIDevTextareaComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-textarea';

  protected render() {
    return html`
      <ui-dev-section titleText="-">
        <tini-textarea></tini-textarea>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
