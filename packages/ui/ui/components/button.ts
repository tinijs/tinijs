import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  partAttrMap,
  borderToClassInfo,
  VaryGroups,
  Colors,
  Gradients,
  Scales,
  Factors,
  JustifyContents,
  BorderRadiuses,
  BoxShadows,
} from '@tinijs/core';

export enum ButtonModes {
  Filled = 'filled',
  Outline = 'outline',
  Bordered = 'bordered',
  Clear = 'clear',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) mode?: ButtonModes;
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) scale?: Scales;
  @property({type: String, reflect: true}) color?: Colors;
  @property({type: String, reflect: true}) fontSize?: Factors;
  @property({type: String, reflect: true}) justifyContent?: JustifyContents;
  @property({type: String, reflect: true}) border?: string;
  @property({type: String, reflect: true}) borderRadius?: BorderRadiuses;
  @property({type: String, reflect: true}) shadow?: BoxShadows;
  @property({type: String, reflect: true, attribute: 'hover:scheme'}) hoverScheme?: this['scheme'];
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        block: !!this.block,
        disabled: !!this.disabled,
        ...borderToClassInfo(this.border),
      },
      pseudo: {
        hover: {
          [VaryGroups.Scheme]: this.hoverScheme,
        },
      },
      overridable: {
        [VaryGroups.Mode]: this.mode,
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
        [VaryGroups.Color]: this.color,
        [VaryGroups.FontSize]: this.fontSize,
        [VaryGroups.JustifyContent]: this.justifyContent,
        [VaryGroups.BorderRadius]: this.borderRadius,
        [VaryGroups.BoxShadow]: this.shadow,
      },
    });
  }

  protected render() {
    return html`<button
      class=${classMap(this.rootClasses)}
      part=${partAttrMap(this.rootClasses)}
      ?disabled=${this.disabled}
    >
      <slot></slot>
    </button>`;
  }
}
