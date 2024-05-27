import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Scales,
  generateAllColorVaries,
  generateAllGradientVaries,
  generateScaleVaries,
  type UIIconOptions,
} from '@tinijs/core';

export enum IconParts {
  Root = ElementParts.Root,
}

type ComponentConstructor = typeof import('./icon.js').default;

export default class extends TiniElement {
  static readonly src?: string;

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) provider?: string;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) scale?: Scales;
  @property({type: String, reflect: true}) size?: string;
  /* eslint-enable prettier/prettier */

  private rootStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        scheme: !!this.scheme,
      },
      overridable: {
        scheme: this.scheme,
        scale: this.scale,
      },
    });
    // root styles
    const prebuiltSRC = (this.constructor as ComponentConstructor).src;
    if (prebuiltSRC) {
      this.rootStyles = {
        '--image': `url("${prebuiltSRC}")`,
      };
    } else if (changedProperties.has('src') || changedProperties.has('name')) {
      const src = this.src || this.buildCustomSRC();
      this.rootStyles = {
        '--image': `url("${src}")`,
      };
    }
    // size
    if (changedProperties.has('size')) {
      if (!this.size) {
        delete this.rootStyles['--width'];
        delete this.rootStyles['--height'];
      } else {
        const [width, height] = this.size.split(' ').map(value => value.trim());
        this.rootStyles['--width'] = width;
        this.rootStyles['--height'] = height || width;
      }
    }
  }

  private buildCustomSRC() {
    if (!this.name)
      throw new Error(
        'The "name" attribute is required when "src" is not provided.'
      );
    const {componentOptions} = this.getUIContext<UIIconOptions>();
    return componentOptions?.resolve
      ? componentOptions.resolve(this.name, this.provider)
      : `/icons/${this.name}${~this.name.indexOf('.') ? '' : '.svg'}`;
  }

  protected render() {
    return this.renderPart(
      IconParts.Root,
      rootChild => html`
        <i
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
          style=${styleMap(this.rootStyles)}
        >
          ${rootChild()}
        </i>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVaries>[0];
  gradientGen: Parameters<typeof generateAllGradientVaries>[0];
  scaleGen: Parameters<typeof generateScaleVaries>[0];
}>(outputs => [
  css`
    :host {
      --width: calc(var(--scale-md) * 2);
      --height: calc(var(--scale-md) * 2);
      --scheme: none;
      --image: url();
      display: inline-block;
      line-height: 0;
    }

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-image: var(--image);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: var(--width);
      height: var(--height);
    }

    .scheme {
      background: var(--scheme);
      -webkit-mask-image: var(--image);
      -webkit-mask-size: var(--width) var(--height);
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-image: var(--image);
      mask-size: var(--width) var(--height);
      mask-repeat: no-repeat;
      mask-position: center;
    }
  `,

  outputs.statics,

  generateAllColorVaries(values => {
    const {fullName, color} = values;
    return `
      .${fullName} {
        --scheme: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVaries(values => {
    const {fullName, gradient} = values;
    return `
      .${fullName} {
        --scheme: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateScaleVaries(values => {
    const {name, fullName} = values;
    return `
      .${fullName} {
        --width: calc(var(--scale-${name}) * 2);
        --height: calc(var(--scale-${name}) * 2);
      }
      ${outputs.scaleGen(values)}
    `;
  }),
]);
