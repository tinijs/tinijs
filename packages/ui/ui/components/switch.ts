import {html, nothing, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateSizeVariants,
} from '@tinijs/core';

export interface SwitchEventDetail {
  target: HTMLInputElement;
  name?: string;
  checked?: boolean;
}

export enum SwitchParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: Boolean, reflect: true}) checked?: boolean;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        checked: !!this.checked,
        disabled: !!this.disabled,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  private onChange(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    return this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          target,
          name: target.name,
          checked: target.checked,
        } as SwitchEventDetail,
      })
    );
  }

  protected render() {
    return this.renderPart(
      SwitchParts.Main,
      mainChildren => html`
        <label
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          <div class="switch">
            <input
              class="input"
              part="input"
              type="checkbox"
              name=${ifDefined(this.name)}
              ?checked=${this.checked}
              ?disabled=${this.disabled}
              @change=${this.onChange}
            />
            <span class="slider" part="slider"></span>
          </div>
          ${!this.label
            ? nothing
            : html`<span class="label" part="label">${this.label}</span>`}
          ${mainChildren()}
        </label>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVariants>[0];
  gradientGen: Parameters<typeof generateAllGradientVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --size: var(--size-md);
      --background: var(--color-middle);
      --color: var(--color-white);
      --hover-shadow: var(--color-primary);
      --active-background: var(--color-primary);
      --active-color: var(--color-primary-contrast);
      --transition: 0.3s;
      --space: 2px;
      display: inline;
      line-height: 1;
    }

    .main {
      --wrapper-size: calc(var(--size) * 2);
      --slider-outer-size: calc((var(--wrapper-size) / 2) + var(--space));
      --slider-size: calc((var(--wrapper-size) / 2) - var(--space));
    }

    .main {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: var(--wrapper-size);
      height: var(--slider-outer-size);
    }

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--background);
      transition: var(--transition);
      border-radius: var(--slider-outer-size);
    }

    .slider:before {
      position: absolute;
      content: '';
      height: var(--slider-size);
      width: var(--slider-size);
      left: var(--space);
      bottom: var(--space);
      background: var(--color);
      transition: var(--transition);
      border-radius: 50%;
    }

    input:focus + .slider {
      outline: none;
      border-color: color-mix(in oklab, var(--hover-shadow), transparent 30%);
      box-shadow: 0 0 0 calc(var(--size) / 4)
        color-mix(in oklab, var(--hover-shadow), transparent 70%);
    }

    input:checked + .slider {
      background: var(--active-background);
    }

    input:checked + .slider:before {
      background: var(--active-color);
      -webkit-transform: translateX(var(--slider-size));
      -ms-transform: translateX(var(--slider-size));
      transform: translateX(var(--slider-size));
    }

    .main > span {
      margin-left: var(--space-xs);
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, fullName, color, contrast} = values;
    return `
      .${fullName} {
        --active-background: ${color};
        --hover-shadow: ${color};
        --active-color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, fullName, color, contrast, gradient} = values;
    return `
      .${fullName} {
        --background: var(--gradient-middle);
        --hover-shadow: ${color};
        --active-background: ${gradient};
        --active-color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, fullName, size} = values;
    return `
      .${fullName} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
