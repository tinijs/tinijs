import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  isGradient,
  Colors,
  Gradients,
  Texts,
  Weights,
  generateColorVaries,
  generateGradientVaries,
  generateTextVaries,
  generateWeightVaries,
} from '@tinijs/core';

export enum LinkParts {
  Root = ElementParts.Root,
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
  @property({type: String, reflect: true}) fontSize?:Texts;
  @property({type: String, reflect: true}) fontWeight?: Weights;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) noUnderline?: boolean;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        gradient: isGradient(this.color),
        disabled: !!this.disabled,
        italic: !!this.italic,
        'no-underline': !!this.noUnderline,
      },
      overridable: {
        color: this.color,
        text: this.fontSize,
        weight: this.fontWeight,
      },
    });
  }

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
    return this.renderPart(
      LinkParts.Root,
      rootChild => html`
        <a
          router-ignore
          ${ref(this.anchorRef)}
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
          href=${this.href || '/'}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this.rel)}
          @click=${this.clickLink}
        >
          <slot></slot>
          ${rootChild()}
        </a>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVaries>[0];
  gradientGen: Parameters<typeof generateGradientVaries>[0];
  fontSizeGen: Parameters<typeof generateTextVaries>[0];
  fontWeightGen: Parameters<typeof generateWeightVaries>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-primary);
      --gradient: none;
      --font-size: var(--text-md);
      display: inline-block;
    }

    .root {
      color: var(--color);
      font-size: var(--font-size);
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

  generateColorVaries(values => {
    const {name, color} = values;
    return `
      .color-${name} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateGradientVaries(values => {
    const {name, gradient} = values;
    return `
      .color-${name} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateTextVaries(values => {
    const {fullName, text} = values;
    return `
      .${fullName} {
        --font-size: ${text};
      }
      ${outputs.fontSizeGen(values)}
    `;
  }),

  generateWeightVaries(values => {
    const {fullName, weight} = values;
    return `
      .${fullName} {
        font-weight: ${weight};
      }
      ${outputs.fontWeightGen(values)}
    `;
  }),
]);
