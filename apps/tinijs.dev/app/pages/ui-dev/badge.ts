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
          color => html`
            <tini-badge color=${color}>${color}</tini-badge>
            <tini-badge color=${`${color}-subtle`}
              >${`${color}-subtle`}</tini-badge
            >
            <tini-badge color=${`${color}-contrast`}
              >${`${color}-contrast`}</tini-badge
            >
          `
        )}
        <br />
        ${Object.values(Gradients).map(
          gradient => html`
            <tini-badge shape="pill" gradient=${gradient}
              >${gradient}</tini-badge
            >
            <tini-badge shape="pill" gradient=${`${gradient}-subtle`}
              >${`${gradient}-subtle`}</tini-badge
            >
            <tini-badge shape="pill" gradient=${`${gradient}-contrast`}
              >${`${gradient}-contrast`}</tini-badge
            >
          `
        )}
        <br />
        ${Object.values(Colors).map(
          color => html`
            <tini-badge shape="circle" color=${color}>A</tini-badge>
            <tini-badge shape="circle" color=${`${color}-subtle`}>9</tini-badge>
            <tini-badge shape="circle" color=${`${color}-contrast`}
              >9</tini-badge
            >
          `
        )}
        ${Object.values(Gradients).map(
          gradient => html`
            <tini-badge shape="circle" gradient=${gradient}>A</tini-badge>
            <tini-badge shape="circle" gradient=${`${gradient}-subtle`}
              >9</tini-badge
            >
            <tini-badge shape="circle" gradient=${`${gradient}-contrast`}
              >9</tini-badge
            >
          `
        )}
        <br />
        ${Object.values(Colors).map(
          color => html`
            <tini-badge shape="dot" color=${color}></tini-badge>
            <tini-badge shape="dot" color=${`${color}-subtle`}></tini-badge>
            <tini-badge shape="dot" color=${`${color}-contrast`}></tini-badge>
          `
        )}
        ${Object.values(Gradients).map(
          gradient => html`
            <tini-badge shape="dot" gradient=${gradient}></tini-badge>
            <tini-badge
              shape="dot"
              gradient=${`${gradient}-subtle`}
            ></tini-badge>
            <tini-badge
              shape="dot"
              gradient=${`${gradient}-contrast`}
            ></tini-badge>
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
