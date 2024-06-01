import {html, css} from 'lit';

import {Component, TiniComponent, Colors, Gradients} from '@tinijs/core';

import {TiniHeadingComponent} from '../../ui/components/heading.js';

@Component({
  components: [TiniHeadingComponent],
})
export class AppPageUIDevHeadingComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-heading';

  protected render() {
    return html`
      <ui-dev-section titleText="Natives">
        <h1>Lorem ipsum (h1)</h1>
        <h2>Lorem ipsum (h2)</h2>
        <h3>Lorem ipsum (h3)</h3>
        <h4>Lorem ipsum (h4)</h4>
        <h5>Lorem ipsum (h5)</h5>
        <h6>Lorem ipsum (h6)</h6>
      </ui-dev-section>

      <ui-dev-section titleText="Defaults">
        <tini-heading>Lorem ipsum (default)</tini-heading>
        ${[1, 2, 3, 4, 5, 6].map(
          level => html`
            <tini-heading level=${level}
              >Lorem ipsum (level=${level})</tini-heading
            >
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Colors">
        ${[...Object.values(Colors), ...Object.values(Gradients)].map(
          color => html`
            <tini-heading level="3" color=${color}
              >Lorem ipsum (color=${color})</tini-heading
            >
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Italics">
        <tini-heading italic level="3">Lorem ipsum</tini-heading>
        ${[Colors.Primary, Gradients.Primary].map(
          color => html`
            <tini-heading italic level="3" color=${color}
              >Lorem ipsum (color=${color})</tini-heading
            >
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Underlines">
        <tini-heading underline level="3">Lorem ipsum</tini-heading>
        ${[Colors.Rose, Gradients.DiscoClub].map(
          color => html`
            <tini-heading underline level="3" color=${color}
              >Lorem ipsum (color=${color})</tini-heading
            >
          `
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
