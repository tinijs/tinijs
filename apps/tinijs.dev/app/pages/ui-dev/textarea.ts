import {html, css} from 'lit';

import {component, TiniComponent} from '@tinijs/core';

import {TiniTextareaComponent} from '../../ui/components/textarea.js';

@component({
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
