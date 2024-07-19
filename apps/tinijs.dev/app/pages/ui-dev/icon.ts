import {html, css} from 'lit';

import {Component, TiniComponent, Colors, Gradients, Sizes} from '@tinijs/core';

import {TiniIconComponent} from '../../ui/components/icon.js';

const URL = 'https://icons.getbootstrap.com/assets/icons/heart-fill.svg';
const URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314'/%3E%3C/svg%3E";
const URI_COLOR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Cg fill='none'%3E%3Cpath fill='%2300d26a' d='M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.763 1.763 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6'/%3E%3Cpath fill='%2314a085' d='M16 8.5v3.049c1.27-2.684 4.425-6.269 9.658-5.712c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.763 1.763 0 0 0 2.186.04c.254-.193.516-.4.785-.619c-2.854-2.142-6.86-5.518-9.035-7.462c-4.957-4.43-6.61-11.814 0-14.768a9.706 9.706 0 0 1 3.087-.827'/%3E%3Cellipse cx='23.477' cy='12.594' fill='%2300f397' rx='2.836' ry='4.781' transform='rotate(30 23.477 12.594)'/%3E%3C/g%3E%3C/svg%3E";
const URI_ANIMATED =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='meteoconsUvIndex1Fill0' x1='150' x2='234' y1='119.2' y2='264.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fbbf24'/%3E%3Cstop offset='.5' stop-color='%23fbbf24'/%3E%3Cstop offset='1' stop-color='%23f59e0b'/%3E%3C/linearGradient%3E%3CclipPath id='meteoconsUvIndex1Fill1'%3E%3Cpath fill='none' d='M64 64h384v192H328a72 72 0 0 0-72 72v120H64Z'/%3E%3C/clipPath%3E%3Csymbol id='meteoconsUvIndex1Fill2' viewBox='0 0 384 384'%3E%3Ccircle cx='192' cy='192' r='84' fill='url(%23meteoconsUvIndex1Fill0)' stroke='%23f8af18' stroke-miterlimit='10' stroke-width='6'/%3E%3Cpath fill='none' stroke='%23fbbf24' stroke-linecap='round' stroke-miterlimit='10' stroke-width='24' d='M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7'%3E%3CanimateTransform additive='sum' attributeName='transform' dur='1s' repeatCount='indefinite' type='rotate' values='0 192 192; 45 192 192'/%3E%3C/path%3E%3C/symbol%3E%3C/defs%3E%3Cg clip-path='url(%23meteoconsUvIndex1Fill1)'%3E%3Cuse width='384' height='384' href='%23meteoconsUvIndex1Fill2' transform='translate(64 64)'/%3E%3Cpath fill='none' stroke='%23f8af18' stroke-miterlimit='10' stroke-width='6' d='M254 338v-10a74 74 0 0 1 74-74h10'/%3E%3C/g%3E%3Crect width='144' height='144' x='280' y='280' fill='%2391c700' rx='48'/%3E%3Cpath fill='%23fff' d='M366.4 388h-19v-45h-17.8v-12.6h3q7.8 0 12.4-3.4q4.2-3.1 5.5-10.2l.2-.8h15.6Z'/%3E%3C/svg%3E";

@Component({
  components: [TiniIconComponent],
})
export class AppPageUIDevIconComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-icon';

  protected render() {
    return html`
      <ui-dev-section titleText="Src" description="Must display 2 icons">
        <tini-icon src=${URL} title="Passing an URL"></tini-icon>
        <tini-icon src=${URI} title="Passing a data URI"></tini-icon>
      </ui-dev-section>

      <ui-dev-section
        titleText="Name and Provider"
        description="Must display 3 icons"
      >
        <tini-icon
          name="heart-fill"
          title="Name only without extension"
        ></tini-icon>
        <tini-icon
          name="heart-fill.svg"
          title="Name only with extension"
        ></tini-icon>
        <tini-icon
          name="bi/heart-fill"
          provider="iconify"
          title="Name and provider"
        ></tini-icon>
      </ui-dev-section>

      <ui-dev-section titleText="Color and animated">
        <tini-icon src=${URI_COLOR} title="Color icon"></tini-icon>
        <tini-icon src=${URI_ANIMATED} title="Animated icon"></tini-icon>
      </ui-dev-section>

      <ui-dev-section titleText="Colors and gradients">
        ${Object.values(Colors).map(
          color =>
            html`<tini-icon
              src=${URI}
              color=${color}
              title=${`color=${color}`}
            ></tini-icon><tini-icon
              src=${URI}
              color=${`${color}-subtle`}
              title=${`color=${color}-subtle`}
            ></tini-icon></tini-icon><tini-icon
              src=${URI}
              color=${`${color}-contrast`}
              title=${`color=${color}-contrast`}
            ></tini-icon>`
        )}
        ${Object.values(Gradients).map(
          gradient =>
            html`<tini-icon
              src=${URI}
              gradient=${gradient}
              title=${`gradient=${gradient}`}
            ></tini-icon><tini-icon
              src=${URI}
              gradient=${`${gradient}-subtle`}
              title=${`gradient=${gradient}-subtle`}
            ></tini-icon></tini-icon><tini-icon
              src=${URI}
              gradient=${`${gradient}-contrast`}
              title=${`gradient=${gradient}-contrast`}
            ></tini-icon>`
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Sizes">
        ${Object.values(Sizes).map(
          size => html`
            <tini-icon
              src=${URI}
              size=${size}
              title=${`size=${size}`}
            ></tini-icon>
            <tini-icon
              color="primary"
              src=${URI}
              size=${size}
              title=${`size=${size}`}
            ></tini-icon>
          `
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
