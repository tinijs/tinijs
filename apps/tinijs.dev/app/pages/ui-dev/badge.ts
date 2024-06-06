import {html, css} from 'lit';

import {Component, TiniComponent, Colors, Gradients, Sizes} from '@tinijs/core';

import {TiniBadgeComponent} from '../../ui/components/badge.js';

@Component({
  components: [TiniBadgeComponent],
})
export class AppPageUIDevBadgeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-badge';

  protected render() {
    return html`
      <ui-dev-section titleText="Shapes">
        <tini-badge>Default</tini-badge>
        <tini-badge shape="pill">Pill</tini-badge>
        <tini-badge shape="circle">0</tini-badge>
        <tini-badge shape="dot"></tini-badge>
      </ui-dev-section>

      <ui-dev-section titleText="Colors">
        ${Object.values(Colors).map(
          scheme => html`
            <tini-badge scheme=${scheme}>${scheme}</tini-badge>
            <tini-badge scheme=${`${scheme}-subtle`}
              >${`${scheme}-subtle`}</tini-badge
            >
            <tini-badge scheme=${`${scheme}-contrast`}
              >${`${scheme}-contrast`}</tini-badge
            >
          `
        )}
        <br />
        ${Object.values(Gradients).map(
          scheme => html`
            <tini-badge shape="pill" scheme=${scheme}>${scheme}</tini-badge>
            <tini-badge shape="pill" scheme=${`${scheme}-subtle`}
              >${`${scheme}-subtle`}</tini-badge
            >
            <tini-badge shape="pill" scheme=${`${scheme}-contrast`}
              >${`${scheme}-contrast`}</tini-badge
            >
          `
        )}
        <br />
        ${[...Object.values(Colors), ...Object.values(Gradients)].map(
          scheme => html`
            <tini-badge shape="circle" scheme=${scheme}>A</tini-badge>
            <tini-badge shape="circle" scheme=${`${scheme}-subtle`}
              >9</tini-badge
            >
            <tini-badge shape="circle" scheme=${`${scheme}-contrast`}
              >9</tini-badge
            >
          `
        )}
        <br />
        ${[...Object.values(Colors), ...Object.values(Gradients)].map(
          scheme => html`
            <tini-badge shape="dot" scheme=${scheme}></tini-badge>
            <tini-badge shape="dot" scheme=${`${scheme}-subtle`}></tini-badge>
            <tini-badge shape="dot" scheme=${`${scheme}-contrast`}></tini-badge>
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Sizes">
        ${Object.values(Sizes).map(
          size => html` <tini-badge size=${size}>${size}</tini-badge> `
        )}
        <br />
        ${Object.values(Sizes).map(
          size => html`
            <tini-badge size=${size} shape="pill">${size}</tini-badge>
          `
        )}
        <br />
        ${Object.values(Sizes).map(
          size => html`
            <tini-badge size=${size} shape="circle">9+</tini-badge>
          `
        )}
        <br />
        ${Object.values(Sizes).map(
          size => html` <tini-badge size=${size} shape="dot"></tini-badge> `
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
