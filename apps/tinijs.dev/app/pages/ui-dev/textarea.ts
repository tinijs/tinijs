import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniTextareaElement} from '../../ui/elements/textarea.js';

@element({
  elements: [TiniTextareaElement],
})
export class AppPageUIDevTextareaElement extends TiniElement {
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
