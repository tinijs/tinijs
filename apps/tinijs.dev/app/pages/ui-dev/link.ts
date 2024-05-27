import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  Gradients,
  FontSizes,
  FontWeights,
} from '@tinijs/core';

import {TiniLinkComponent} from '../../ui/components/link.js';

@Component({
  components: [TiniLinkComponent],
})
export class AppPageUIDevLinkComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-link';

  protected render() {
    return html`
      <ui-dev-section titleText="Natives">
        <a href="#">Lorem ipsum</a><br />
        <a href="#" target="_blank">Lorem ipsum (target=_blank)</a>
      </ui-dev-section>

      <ui-dev-section titleText="Defaults">
        <tini-link href="#">Lorem ipsum</tini-link><br />
        <tini-link href="#" target="_blank"
          >Lorem ipsum (target=_blank)</tini-link
        ><br />
        <tini-link href="#" disabled>Lorem ipsum (disabled)</tini-link>
      </ui-dev-section>

      <ui-dev-section titleText="Colors">
        ${[...Object.values(Colors), ...Object.values(Gradients)].map(
          color => html`
            <tini-link href="#" color=${color}
              >Lorem ipsum (color=${color})</tini-link
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font sizes">
        ${Object.values(FontSizes).map(
          fontSize => html`
            <tini-link href="#" fontSize=${fontSize}
              >Lorem ipsum (fontSize=${fontSize})</tini-link
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Font weights">
        ${Object.values(FontWeights).map(
          fontWeight => html`
            <tini-link href="#" fontWeight=${fontWeight}
              >Lorem ipsum (fontWeight=${fontWeight})</tini-link
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Italics">
        <tini-link href="#" italic>Lorem ipsum</tini-link><br />
        ${[Colors.Primary, Gradients.Primary].map(
          color => html`
            <tini-link href="#" italic color=${color}
              >Lorem ipsum (color=${color})</tini-link
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="No Underlines">
        <tini-link href="#" noUnderline>Lorem ipsum</tini-link><br />
        ${[Colors.Rose, Gradients.DiscoClub].map(
          color => html`
            <tini-link href="#" noUnderline color=${color}
              >Lorem ipsum (color=${color})</tini-link
            >
            <br />
          `
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
