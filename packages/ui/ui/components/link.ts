import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  TiniElement,
  ElementParts,
  createStyleBuilder,
  Colors,
  Gradients,
  Texts,
  Weights,
  generateColorVariants,
  generateGradientVariants,
  generateTextVariants,
  generateWeightVariants,
} from '@tinijs/core';

export enum LinkParts {
  Main = ElementParts.Main,
}

export enum LinkTargets {
  Self = '_self',
  Blank = '_blank',
  Parent = '_parent',
  Top = '_top',
}

export default class extends TiniElement {
  private readonly ROUTER_CHANGE_EVENT = 'tini:route-change';
  private anchorRef = createRef<HTMLAnchorElement>();

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) href?: string;
  @property({type: String, reflect: true}) rel?: string;
  @property({type: String, reflect: true}) target?: LinkTargets;
  @property({type: String, reflect: true}) active?: string;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) size?: Texts;
  @property({type: String, reflect: true}) weight?: Weights;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) noUnderline?: boolean;
  /* eslint-enable prettier/prettier */

  connectedCallback() {
    super.connectedCallback();
    if (this.active)
      window.addEventListener(
        this.ROUTER_CHANGE_EVENT,
        this.updateActiveStatus
      );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.active)
      window.removeEventListener(
        this.ROUTER_CHANGE_EVENT,
        this.updateActiveStatus
      );
  }

  updated() {
    if (this.active) this.updateActiveStatus();
  }

  private updateActiveStatus = (e?: Event) => {
    if (!this.active || !this.anchorRef.value) return;
    const currentUrl = new URL(
      !this.href ? '/' : this.href,
      window.location.origin
    );
    const eventUrl = (e as CustomEvent)?.detail.url;
    const currentActive = e
      ? currentUrl.href === `${eventUrl.origin}${eventUrl.pathname}`
      : currentUrl.href ===
        `${window.location.origin}${window.location.pathname}`;
    // anchor tag
    const partList = this.anchorRef.value.getAttribute('part') || '';
    this.anchorRef.value.setAttribute(
      'part',
      (currentActive
        ? `${partList} ${this.active}`
        : partList.replace(this.active, '')
      ).trim()
    );
    // the host
    this.classList[currentActive ? 'add' : 'remove'](this.active);
  };

  private clickLink(e: Event) {
    if (
      !this.anchorRef.value ||
      (this.target && this.target !== LinkTargets.Self)
    )
      return;
    // navigate
    if (this.anchorRef.value.href !== window.location.href) {
      const url = new URL(this.anchorRef.value.href);
      history.pushState({}, '', url.href);
      dispatchEvent(new PopStateEvent('popstate'));
    }
    // default
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  protected render() {
    return this.partRender(
      LinkParts.Main,
      mainChildren => html`
        <a
          router-ignore
          ${ref(this.anchorRef)}
          class=${LinkParts.Main}
          part=${LinkParts.Main}
          href=${this.href || '/'}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this.rel)}
          @click=${this.clickLink}
        >
          <slot></slot>
          ${mainChildren()}
        </a>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  gradientGen: Parameters<typeof generateGradientVariants>[0];
  textGen: Parameters<typeof generateTextVariants>[0];
  weightGen: Parameters<typeof generateWeightVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-primary);
      --gradient: none;
      --size: var(--text-md);
      display: inline-block;
    }

    .main {
      color: var(--color);
      font-size: var(--size);
    }

    .gradient {
      position: relative;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gradient::after {
      visibility: hidden;
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: var(--gradient);
      height: 0.08em;
    }

    .disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }

    .italic {
      font-style: italic;
    }

    .no-underline {
      text-decoration: none !important;
    }

    .no-underline.gradient::after {
      visibility: hidden !important;
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, color} = values;
    return `
      ${hostSelector} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }, 'color'),

  generateGradientVariants(values => {
    const {hostSelector, gradient} = values;
    return `
      ${hostSelector} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }, 'color'),

  generateTextVariants(values => {
    const {hostSelector, text} = values;
    return `
      ${hostSelector} {
        --size: ${text};
      }
      ${outputs.textGen(values)}
    `;
  }, 'size'),

  generateWeightVariants(values => {
    const {hostSelector, weight} = values;
    return `
      ${hostSelector} .main {
        font-weight: ${weight};
      }
      ${outputs.weightGen(values)}
    `;
  }),
]);
