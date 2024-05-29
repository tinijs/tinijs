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

import {TiniTextComponent, TextTags} from '../../ui/components/text.js';

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
        <tini-text>Lorem ipsum</tini-text><br />
        ${Object.values(TextTags).map(
          tag => html`
            <tini-text tag=${tag}>Lorem ipsum (tag=${tag})</tini-text>
            ${tag === 'p' ? nothing : html`<br />`}
          `
        )}
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
          fontType => html`
            <tini-text fontType=${fontType}
              >Lorem ipsum (fontType=${fontType})</tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font sizes">
        ${Object.values(Texts).map(
          fontSize => html`
            <tini-text fontSize=${fontSize}
              >Lorem ipsum (fontSize=${fontSize})</tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font weights">
        ${Object.values(Weights).map(
          fontWeight => html`
            <tini-text fontWeight=${fontWeight}
              >Lorem ipsum (fontWeight=${fontWeight})</tini-text
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
