import {html, css, type TemplateResult, type CSSResult} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import slugify from '@sindresorhus/slugify';

import {
  TiniElement,
  createStyleBuilder,
  parseColorValue,
  parseSingleSpaceValue,
  parseDecorationValue,
  isRTL,
  isImageURLOrURI,
  type DirectOrRecordStyles,
  type ComputedStylesQuery,
} from '@tinijs/core';

type ElementConstructor = typeof import('./heading.js').default;

export enum HeadingParts {
  Link = 'link',
  Icon = 'icon',
}

export type HeadingConfig = {
  presets?: Record<string, HeadingPreset>;
  styles?: DirectOrRecordStyles;
};

export interface HeadingPreset {
  // type?: HeadingContext['type'];
  group?: HeadingContext['group'];
  options?: unknown;
  render: (context: HeadingContext) => TemplateResult;
}

export interface HeadingContext {
  level: number;
  preset: string;
  // type: 'self' | 'inside' | 'custom';
  group: string;
  linkHref: string;
  linkTarget?: string;
  linkContent: string;
}

export interface HeadingSelfLinkPresetOptions {
  visibility?: 'always' | 'hover' | 'adaptive';
  color?: string;
  decoration?: string;
  underlineOffset?: string;
}

export function headingSelfLinkPreset(
  options?: HeadingSelfLinkPresetOptions
): HeadingPreset {
  return {
    options,
    // type: 'self',
    group: 'selfLink',
    render: function ({linkHref, linkTarget}) {
      return html`
        <a
          class=${HeadingParts.Link}
          part=${HeadingParts.Link}
          href=${linkHref}
          target=${ifDefined(linkTarget)}
        >
          <slot></slot>
        </a>
      `;
    },
  };
}

export interface HeadingInsideLinkPresetOptions {
  symbol?: string;
  placement?: 'before' | 'after';
  visibility?: 'always' | 'hover' | 'adaptive';
  rawIcon?: boolean;
  color?: string;
  size?: string;
  space?: string;
}

export function headingInsideLinkPreset(
  options?: HeadingInsideLinkPresetOptions
): HeadingPreset {
  return {
    options,
    // type: 'inside',
    group: 'insideLink',
    render: function ({linkHref, linkTarget, linkContent}) {
      return html`
        <slot></slot>
        <a
          class=${HeadingParts.Link}
          part=${HeadingParts.Link}
          href=${linkHref}
          target=${ifDefined(linkTarget)}
          aria-hidden="true"
          >${!isImageURLOrURI(linkContent)
            ? linkContent
            : html`<i
                class=${HeadingParts.Icon}
                part=${HeadingParts.Icon}
              ></i>`}</a
        >
      `;
    },
  };
}

export default class extends TiniElement {
  static readonly elementMetadata = {
    restyleAtUpdate: true,
  };
  private static presets: NonNullable<HeadingConfig['presets']> = {
    selfLink: headingSelfLinkPreset(),
    insideLinkBefore: headingInsideLinkPreset({
      placement: 'before',
      visibility: 'adaptive',
    }),
    insideLinkAfter: headingInsideLinkPreset(),
  };
  static config(config: HeadingConfig) {
    if (config.presets) {
      this.presets = {...this.presets, ...config.presets};
    }
    if (config.styles) {
      this.addStyles(config.styles);
    }
  }

  role = 'heading';

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) level?: string;
  @property({type: String, reflect: true}) preset?: string;
  @property({type: String, reflect: true}) linkHref?: string;
  @property({type: String, reflect: true}) linkTarget?: string;
  // for self link
  @property({type: String, reflect: true}) selfLinkVisibility?: HeadingSelfLinkPresetOptions['visibility'];
  @property({type: String, reflect: true}) selfLinkColor?: HeadingSelfLinkPresetOptions['color'];
  @property({type: String, reflect: true}) selfLinkDecoration?: HeadingSelfLinkPresetOptions['decoration'];
  @property({type: String, reflect: true}) selfLinkUnderlineOffset?: HeadingSelfLinkPresetOptions['underlineOffset'];
  // for inside link
  @property({type: String, reflect: true}) insideLinkSymbol?: HeadingInsideLinkPresetOptions['symbol'];
  @property({type: String, reflect: true}) insideLinkPlacement?: HeadingInsideLinkPresetOptions['placement'];
  @property({type: String, reflect: true}) insideLinkVisibility?: HeadingInsideLinkPresetOptions['visibility'];
  @property({type: Boolean, reflect: true}) insideLinkRawIcon?: HeadingInsideLinkPresetOptions['rawIcon'] = false;
  @property({type: String, reflect: true}) insideLinkColor?: string;
  @property({type: String, reflect: true}) insideLinkSize?: string;
  @property({type: String, reflect: true}) insideLinkSpace?: string;
  /* eslint-enable prettier/prettier */

  private context?: HeadingContext;
  private styleVars: string[] = [];

  protected beforeUpdate() {
    // parse props
    let presetAndLinkHref: [string, string] | undefined;
    if (this.preset && this.linkHref) {
      presetAndLinkHref = [this.preset, this.linkHref];
    } else if (this.preset && this.textContent) {
      presetAndLinkHref = [this.preset, `#${slugify(this.textContent)}`];
    }
    // reset style vars
    this.styleVars = [];
    // build context and vars
    if (!presetAndLinkHref) {
      this.context = undefined;
    } else {
      const [preset, linkHref] = presetAndLinkHref;
      const config = (this.constructor as ElementConstructor).presets[preset];
      const context: HeadingContext = {
        level: Number(this.level || '1'),
        preset,
        // type: config.type || 'custom',
        group: config.group || 'unknown',
        linkHref,
        linkTarget: this.linkTarget,
        linkContent: this.textContent || '',
      };
      // data
      if (config.group === 'selfLink') {
        const options = config.options as
          | HeadingSelfLinkPresetOptions
          | undefined;
        // patch props and values
        if (options?.visibility && !this.selfLinkVisibility) {
          this.selfLinkVisibility = options.visibility;
        }
        const selfLinkColor = this.selfLinkColor || options?.color;
        const selfLinkDecoration =
          this.selfLinkDecoration || options?.decoration;
        const selfLinkUnderlineOffset =
          this.selfLinkUnderlineOffset || options?.underlineOffset;
        // set context and vars
        this.context = {...context, group: config.group};
        /* eslint-disable prettier/prettier */
        if (selfLinkColor) this.styleVars.push(`--self-link-color: ${parseColorValue(selfLinkColor)};`);
        if (selfLinkDecoration) this.styleVars.push(`--self-link-decoration: ${parseDecorationValue(selfLinkDecoration)};`);
        if (selfLinkUnderlineOffset) this.styleVars.push(`--self-link-underline-offset: ${parseSingleSpaceValue(selfLinkUnderlineOffset)};`);
        /* eslint-enable prettier/prettier */
      } else if (config.group === 'insideLink') {
        const options = config.options as
          | HeadingInsideLinkPresetOptions
          | undefined;
        // patch props and values
        if (options?.placement && !this.insideLinkPlacement) {
          this.insideLinkPlacement = options.placement;
        }
        if (options?.visibility && !this.insideLinkVisibility) {
          this.insideLinkVisibility = options.visibility;
        }
        if (options?.rawIcon) {
          this.insideLinkRawIcon = options.rawIcon;
        }
        const insideLinkSymbol = this.insideLinkSymbol || options?.symbol;
        const insideLinkColor = this.insideLinkColor || options?.color;
        const insideLinkSize = this.insideLinkSize || options?.size;
        const insideLinkSpace = this.insideLinkSpace || options?.space;
        // set context and vars
        this.context = {
          ...context,
          group: config.group,
          linkContent: this.insideLinkSymbol || options?.symbol || '#',
        };
        /* eslint-disable prettier/prettier */
        if (insideLinkSymbol && isImageURLOrURI(insideLinkSymbol)) {
          this.styleVars.push(`--inside-link-icon: url("${insideLinkSymbol}");`);
        }
        if (insideLinkColor) this.styleVars.push(`--inside-link-color: ${parseColorValue(insideLinkColor)};`);
        if (insideLinkSize) this.styleVars.push(`--inside-link-size: ${insideLinkSize};`);
        if (insideLinkSpace) this.styleVars.push(`--inside-link-space: ${insideLinkSpace};`);
        /* eslint-enable prettier/prettier */
      } else {
        this.context = context;
      }
    }
    // set id and attributes
    if (isRTL()) this.setAttribute('_dir', 'rtl');
    if (this.context) {
      const {group, linkHref} = this.context;
      if (!linkHref.startsWith('#')) {
        this.removeAttribute('id');
      } else {
        this.id = linkHref.slice(1);
      }
      this.setAttribute('_group', group);
    } else {
      this.removeAttribute('id');
      this.removeAttribute('_group');
    }
  }

  protected computedStyles(_: never, query?: ComputedStylesQuery) {
    return query ? [] : `:host { ${this.styleVars.join('')} }`;
  }

  protected render() {
    if (!this.context) return html`<slot></slot>`;
    return (this.constructor as ElementConstructor).presets[
      this.context.preset
    ].render(this.context);
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    :host {
      --self-link-color: var(--color-body-contrast);
      --self-link-decoration: underline;
      --self-link-underline-offset: auto;
      --inside-link-icon: url();
      --inside-link-color: var(--color-body-contrast);
      --inside-link-size: 1;
      --inside-link-space: 0.25;
      line-height: 1.2;
    }

    /* self link */

    :host([_group='selfLink']) ::slotted(a) {
      text-decoration: none !important;
    }

    :host([_group='selfLink']) .link {
      color: var(--self-link-color);
      font-weight: inherit;
    }

    /* self link visibility */

    :host([_group='selfLink']) .link,
    :host([selfLinkVisibility='hover']:hover) .link,
    :host([selfLinkVisibility='adaptive']:hover) .link {
      -webkit-text-decoration: var(--self-link-decoration);
      text-decoration: var(--self-link-decoration);
      text-underline-offset: var(--self-link-underline-offset);
    }

    :host([selfLinkVisibility='hover']) .link,
    :host([selfLinkVisibility='adaptive']) .link {
      -webkit-text-decoration: none;
      text-decoration: none;
    }

    @media screen and (hover: none) {
      :host([selfLinkVisibility='adaptive']) .link {
        -webkit-text-decoration: var(--self-link-decoration);
        text-decoration: var(--self-link-decoration);
      }
    }

    /* inside link */

    :host([_group='insideLink']) {
      --inside-link-width: calc(
        1em * (var(--inside-link-size) + var(--inside-link-space))
      );
      display: flex;
      align-items: center;
      gap: calc(1em * var(--inside-link-space));
    }

    :host([_group='insideLink']) .link {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 1em;
      max-width: 1em;
      font-size: calc(1em * var(--inside-link-size));
      color: var(--inside-link-color);
      font-weight: normal;
      text-decoration: none;
    }

    /* inside link icon symbol */

    :host([_group='insideLink']) .link .icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      background: var(--inside-link-color);
      -webkit-mask-image: var(--inside-link-icon);
      -webkit-mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-image: var(--inside-link-icon);
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
      mask-position: center;
    }

    :host([_group='insideLink'][insideLinkRawIcon]) .link .icon {
      background: var(--inside-link-icon);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      -webkit-mask: none;
      mask: none;
    }

    /* inside link placement */

    :host([insideLinkPlacement='before']) {
      width: calc(100% + var(--inside-link-width));
      transform: translateX(calc(-1 * var(--inside-link-width)));
    }

    :host([insideLinkPlacement='before']) .link {
      order: -1;
    }

    :host([dir='rtl'][insideLinkPlacement='before']) {
      transform: none;
    }

    :host([_dir='rtl'][insideLinkPlacement='before']) {
      transform: translateX(var(--inside-link-width));
    }

    /* inside link visibility */

    :host([insideLinkVisibility='hover']) .link,
    :host([insideLinkVisibility='adaptive']) .link {
      visibility: hidden;
    }

    :host([insideLinkVisibility='hover']:hover) .link,
    :host([insideLinkVisibility='adaptive']:hover) .link {
      visibility: visible;
    }

    @media screen and (hover: none) {
      :host([insideLinkVisibility='adaptive']) .link {
        visibility: visible;
      }
    }

    /* fixes */

    ::slotted(a),
    ::slotted(code) {
      font-weight: inherit !important;
      font-size: 1em !important;
    }
  `,

  outputs.statics,
]);
