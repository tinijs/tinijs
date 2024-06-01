import {html, css, nothing} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Weights,
} from '@tinijs/core';

import {TiniTextComponent} from '../../ui/components/text.js';

@Component({
  components: [TiniTextComponent],
})
export class AppPageUIDevTextComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-text';

  protected render() {
    return html`
      <ui-dev-section titleText="Natives">
        <p>Lorem ipsum (p)</p>
        <strong>Lorem ipsum (strong)</strong><br />
        <em>Lorem ipsum (em)</em><br />
        <span>Lorem ipsum (span)</span>
      </ui-dev-section>

      <ui-dev-section titleText="Defaults">
        <tini-text block>Lorem ipsum (block)</tini-text>
        <tini-text weight="bold">Lorem ipsum (weight=bold)</tini-text><br />
        <tini-text italic>Lorem ipsum (italic)</tini-text><br />
        <tini-text>Lorem ipsum (default)</tini-text>
      </ui-dev-section>

      <ui-dev-section titleText="Colors">
        ${[...Object.values(Colors), ...Object.values(Gradients)].map(
          color => html`
            <tini-text color=${color}>Lorem ipsum (color=${color})</tini-text>
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font types">
        ${Object.values(Fonts).map(
          font => html`
            <tini-text font=${font}>Lorem ipsum (font=${font})</tini-text>
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font sizes">
        ${Object.values(Texts).map(
          size => html`
            <tini-text size=${size}>Lorem ipsum (size=${size})</tini-text>
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font weights">
        ${Object.values(Weights).map(
          weight => html`
            <tini-text weight=${weight}
              >Lorem ipsum (weight=${weight})</tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Italics">
        <tini-text italic>Lorem ipsum</tini-text><br />
        ${[Colors.Primary, Gradients.Primary].map(
          color => html`
            <tini-text italic color=${color}
              >Lorem ipsum (color=${color})</tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Underlines">
        <tini-text underline>Lorem ipsum</tini-text><br />
        ${[Colors.Rose, Gradients.DiscoClub].map(
          color => html`
            <tini-text underline color=${color}
              >Lorem ipsum (color=${color})</tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
