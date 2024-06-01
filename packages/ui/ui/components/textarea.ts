import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Sizes,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
    customMainSelector: '.textarea',
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) placeholder?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) value?: string;
  @property({type: String, reflect: true}) autocomplete?: string;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: Boolean, reflect: true}) readonly?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) focusScheme?: this['scheme'];
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        disabled: !!this.disabled,
        readonly: !!this.readonly,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
      pseudo: {
        focus: {
          scheme: this.focusScheme,
        },
      },
    });
  }

  protected render() {
    return html`
      <label
        class=${classMap(this.mainClasses)}
        part=${partAttrMap(this.mainClasses)}
      >
        ${!this.label
          ? nothing
          : html`<span class="label" part="label">${this.label}</span>`}
        <textarea
          class="textarea"
          part="textarea"
          placeholder=${ifDefined(this.placeholder)}
          name=${ifDefined(this.name)}
          .value=${this.value || ''}
          autocomplete=${ifDefined(this.autocomplete) as any}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
        ></textarea>
      </label>
    `;
  }
}
