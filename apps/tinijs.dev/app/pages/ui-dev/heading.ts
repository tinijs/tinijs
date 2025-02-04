import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniTextElement} from '../../ui/elements/text.js';
import {TiniHeadingElement} from '../../ui/elements/heading.js';

@element({
  elements: [TiniHeadingElement],
})
export class AppPageUIDevHeadingElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-heading';

  protected render() {
    return html`
      <ui-dev-section titleText="Basics">
        <h1>Lorem ipsum (A)</h1>
        <tini-heading>Lorem ipsum (B)</tini-heading>
        <tini-heading level="1">Lorem ipsum (B)</tini-heading>
        <br />
        <h2>Lorem ipsum (A)</h2>
        <tini-heading level="2">Lorem ipsum (B)</tini-heading>
        <br />
        <h3>Lorem ipsum (A)</h3>
        <tini-heading level="3">Lorem ipsum (B)</tini-heading>
        <br />
        <h4>Lorem ipsum (A)</h4>
        <tini-heading level="4">Lorem ipsum (B)</tini-heading>
        <br />
        <h5>Lorem ipsum (A)</h5>
        <tini-heading level="5">Lorem ipsum (B)</tini-heading>
        <br />
        <h6>Lorem ipsum (A)</h6>
        <tini-heading level="6">Lorem ipsum (B)</tini-heading>
      </ui-dev-section>

      <ui-dev-section titleText="Link and code">
        <h1>With <a href="#">link</a> and <code>code</code> (A)</h1>
        <tini-heading
          >With <a href="#">link</a> and <code>code</code> (B)</tini-heading
        >
        <tini-heading preset="insideLinkAfter"
          >With <a href="#" target="_blank">link</a> and <code>code</code> and
          permalink</tini-heading
        >
        <br />
        <h1><a href="#">Full link (A)</a></h1>
        <tini-heading><a href="#">Full link (B)</a></tini-heading>
        <br />
        <h1><code>Full code (A)</code></h1>
        <tini-heading><code>Full code (B)</code></tini-heading>
        <br />
        <h1>
          <a href="#">Full link with <code>code</code> (A)</a>
        </h1>
        <tini-heading
          ><a href="#">Full link with <code>code</code> (B)</a></tini-heading
        >
        <tini-heading preset="insideLinkAfter">
          <a href="#" target="_blank"
            >Full link with <code>code</code> and permalink</a
          ></tini-heading
        >
        <br />
        <tini-heading preset="selfLink"
          >Self permalink with <a href="#">link</a> and
          <code>code</code></tini-heading
        >
        <tini-heading preset="selfLink"
          ><a href="#">Self permalink with full link</a></tini-heading
        >
        <tini-heading preset="selfLink"
          ><code>Self permalink with full code</code></tini-heading
        >
      </ui-dev-section>

      <ui-dev-section titleText="Permalinks">
        <div style="margin: 0 50px">
          ${[1, 2, 3, 4, 5, 6].map(
            level => html`
              <tini-heading level=${level}>No permalink</tini-heading>
              <tini-heading level=${level} preset="selfLink"
                >Self always</tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkVisibility="hover"
                >Self hover</tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkDecoration="underline blue wavy 2px"
                >Self decoration always</tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkDecoration="underline blue wavy 2px"
                selfLinkVisibility="hover"
                >Self decoration hover</tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkUnderlineOffset=".5em"
                >Self underline offset always</tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkUnderlineOffset=".5em"
                selfLinkVisibility="hover"
                >Self underline offset hover</tini-heading
              >
              <tini-heading level=${level} preset="insideLinkAfter"
                >Inside after</tini-heading
              >
              <tini-heading level=${level} preset="insideLinkBefore"
                >Inside before</tini-heading
              >
              <tini-heading level=${level} preset="foo1"
                >Before always</tini-heading
              >
              <tini-heading level=${level} preset="foo2"
                >Before hover</tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkAfter"
                insideLinkSymbol="🌏"
                >After always</tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkAfter"
                insideLinkSymbol="🌏"
                insideLinkVisibility="hover"
                >After hover</tini-heading
              >
              <tini-heading level=${level} preset="bar1">Icon raw</tini-heading>
              <tini-heading level=${level} preset="bar2"
                >Icon recolor</tini-heading
              >
              <tini-heading level=${level} preset="baz"
                >Custom preset</tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                insideLinkPlacement="before"
                insideLinkSize="0.5"
                insideLinkSpace="1"
                >Size and space</tini-heading
              >
              <tini-heading
                level=${level}
                preset="bar2"
                insideLinkPlacement="before"
                insideLinkSize="0.5"
                insideLinkSpace="1"
                >Size and space</tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                insideLinkPlacement="before"
                insideLinkColor="red"
                >Color</tini-heading
              >
              <tini-heading
                level=${level}
                preset="bar2"
                insideLinkPlacement="before"
                insideLinkColor="red"
                >Color</tini-heading
              >
              <br />
            `
          )}
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="RTL">
        <div style="margin: 0 50px">
          ${[1, 2, 3].map(
            level => html`
              <tini-heading level=${level} dir="rtl">No permalink</tini-heading>
              <tini-heading level=${level} dir="rtl" preset="selfLink"
                >Self always</tini-heading
              >
              <tini-heading
                level=${level}
                dir="rtl"
                preset="selfLink"
                selfLinkVisibility="hover"
                >Self hover</tini-heading
              >
              <tini-heading level=${level} dir="rtl" preset="insideLinkAfter"
                >After always</tini-heading
              >
              <tini-heading
                level=${level}
                dir="rtl"
                preset="insideLinkAfter"
                insideLinkVisibility="hover"
                >After hover</tini-heading
              >
              <tini-heading
                level=${level}
                dir="rtl"
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                >Before always</tini-heading
              >
              <tini-heading
                level=${level}
                dir="rtl"
                preset="insideLinkBefore"
                insideLinkVisibility="hover"
                >Before hover</tini-heading
              >
              <tini-heading
                level=${level}
                dir="rtl"
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                insideLinkSize="0.5"
                insideLinkSpace="1"
                >Size and space</tini-heading
              >
              <tini-heading
                level=${level}
                dir="rtl"
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                insideLinkColor="red"
                >Color</tini-heading
              >
              <br />
            `
          )}
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="Custom hrefs">
        <tini-heading level="1" preset="selfLink" linkHref="#custom-href-1"
          >Anchor fragment</tini-heading
        >
        <tini-heading
          level="2"
          preset="insideLinkAfter"
          linkHref="/custom/href/2"
          >Router path</tini-heading
        >
        <tini-heading
          level="3"
          preset="insideLinkAfter"
          linkHref="https://custom.link/href/3"
          >Full url</tini-heading
        >
        <tini-heading
          level="3"
          preset="insideLinkAfter"
          linkHref="https://custom.link/href/4"
          linkTarget="_blank"
          >Full url (_blank)</tini-heading
        >
      </ui-dev-section>

      <ui-dev-section titleText="Colors & gradients">
        <div style="margin: 0 50px">
          ${[1, 2, 3].map(
            level => html`
              <tini-heading level=${level}
                ><tini-text color="success"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkColor="success"
                ><tini-text color="success"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkDecoration="underline success"
                ><tini-text color="success"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading level=${level}
                ><tini-text color="magenta"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                ><tini-text color="magenta"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading level=${level} preset="insideLinkAfter"
                ><tini-text color="magenta"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading level=${level}
                ><tini-text gradient="danger"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkColor="danger"
                ><tini-text gradient="danger"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkDecoration="underline danger"
                ><tini-text gradient="danger"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading level=${level}
                ><tini-text gradient="linear-gradient(to bottom, red, blue)"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                ><tini-text gradient="linear-gradient(to bottom, red, blue)"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading level=${level} preset="insideLinkAfter"
                ><tini-text gradient="linear-gradient(to bottom, red, blue)"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkColor="warning"
                >Lorem ipsum</tini-heading
              >
              <tini-heading
                level=${level}
                preset="selfLink"
                selfLinkDecoration="underline warning"
                >Lorem ipsum</tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkBefore"
                insideLinkVisibility="always"
                insideLinkColor="warning"
                ><tini-text color="warning"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <tini-heading
                level=${level}
                preset="insideLinkAfter"
                insideLinkColor="warning"
                ><tini-text color="warning"
                  >Lorem ipsum</tini-text
                ></tini-heading
              >
              <br />
            `
          )}
        </div>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
