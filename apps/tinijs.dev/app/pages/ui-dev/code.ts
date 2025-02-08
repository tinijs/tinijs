import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniCodeElement} from '../../ui/elements/code.js';

@element({
  elements: [TiniCodeElement],
})
export class AppPageUIDevCodeElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-code';

  protected render() {
    return html`
      <ui-dev-section titleText="Defaults">
        <tini-code
          language="html"
          content=${`<!-- language="html" -->
<h1>Hello, World!</h1>
<p>This is a paragraph.</p>
`}
        ></tini-code>

        <tini-code
          language="javascript"
          content=${`// language="javascript"
const hello = 'Hello, World!';
function sayHello() {
  console.log(hello);
}
`}
        ></tini-code>

        <tini-code
          language="css"
          content=${`/* language="css" */
body {
  font-family: sans-serif;
  color: #333;
}
`}
        ></tini-code>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
