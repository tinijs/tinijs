import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Weights,
  Lines,
  Letters,
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
        <span>Lorem ipsum (span)</span><br />
        <strong>Lorem ipsum (strong)</strong><br />
        <em>Lorem ipsum (em)</em><br />
        <p>Lorem ipsum (p)</p>
      </ui-dev-section>

      <ui-dev-section titleText="Defaults">
        <tini-text>Lorem ipsum (default)</tini-text><br />
        <tini-text weight="bold">Lorem ipsum (weight=bold)</tini-text><br />
        <tini-text italic>Lorem ipsum (italic)</tini-text><br />
        <tini-text block>Lorem ipsum (block)</tini-text>
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

      <ui-dev-section titleText="Aligns">
        <tini-text block>Lorem ipsum (start)</tini-text>
        <tini-text block align="center">Lorem ipsum (center)</tini-text>
        <tini-text block align="end">Lorem ipsum (end)</tini-text>
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

      <ui-dev-section titleText="Line heights">
        ${Object.values(Lines).map(
          height => html`
            <tini-text block height=${height} style="width: 150px"
              >The quick brown fox jumped over the lazy dog
              <strong>(height=${height})</strong></tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Letter spacings">
        ${Object.values(Letters).map(
          spacing => html`
            <tini-text spacing=${spacing}
              >The quick brown fox jumped over the lazy dog
              <strong>(spacing=${spacing})</strong></tini-text
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
        ${[Colors.Success, Gradients.Success].map(
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
