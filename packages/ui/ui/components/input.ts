import {html, nothing, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Scales,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
    colorOnlyScheme: true,
    mainNonRootSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare label?: string;
  @property({type: String, reflect: true}) declare placeholder?: string;
  @property({type: String, reflect: true}) declare type?: string;
  @property({type: String, reflect: true}) declare name?: string;
  @property({type: String, reflect: true}) declare value?: string;
  @property({type: String, reflect: true}) declare inputmode?: string;
  @property({type: String, reflect: true}) declare autocomplete?: string;
  @property({type: Boolean, reflect: true}) declare disabled?: boolean;
  @property({type: Boolean, reflect: true}) declare readonly?: boolean;
  @property({type: Boolean, reflect: true}) declare wrap?: boolean;
  @property({type: Boolean, reflect: true}) declare block?: boolean;
  @property({type: String, reflect: true}) declare scheme?: Colors;
  @property({type: String, reflect: true}) declare scale?: Scales;
  @property({type: String, reflect: true, attribute: 'focus:scheme'}) declare focusScheme?: this['scheme'];
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // host block
    if (changedProperties.has('block')) {
      if (this.block) {
        this.classList.add('block');
      } else {
        this.classList.remove('block');
      }
    }
    // root classes parts
    this.extendRootClasses({
      raw: {
        wrap: !!this.wrap,
        disabled: !!this.disabled,
        readonly: !!this.readonly,
      },
      pseudo: {
        focus: {
          [VaryGroups.Scheme]: this.focusScheme,
        },
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
      },
    });
  }

  protected render() {
    return html`
      <label
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        ${!this.label
          ? nothing
          : html`<span class="label" part="label">${this.label}</span>`}
        <input
          class="input"
          part="input"
          placeholder=${ifDefined(this.placeholder)}
          type=${ifDefined(this.type) as any}
          name=${ifDefined(this.name)}
          .value=${this.value || ''}
          inputmode=${ifDefined(this.inputmode)}
          autocomplete=${ifDefined(this.autocomplete) as any}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
        />
      </label>
    `;
  }
}
