import {html, css} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  element,
  event,
  TiniElement,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {TiniInputElement} from '../../ui/elements/input.js';

@element({
  elements: [TiniInputElement],
})
export class AppElementEditorInputElement
  extends TiniElement
  implements OnCreate
{
  static readonly defaultTagName = 'app-element-editor-input';

  @property() label!: string;
  @property() placeholder?: string;

  @property() target!: string;
  @property() value?: string;

  @event() change!: EventEmitter<string>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.target) throw new Error('target is required');
  }

  protected render() {
    return html`
      <tini-input
        wrap
        block
        label=${this.label}
        placeholder=${ifDefined(this.placeholder)}
        .value=${this.value}
        events="change"
        @change=${({detail}: CustomEvent<InputEvent>) =>
          this.change.emit((detail as any).target.value)}
      ></tini-input>
    `;
  }

  static styles = css`
    tini-input {
      &::part(label) {
        font-weight: bold;
        font-size: var(--text-xs);
        text-transform: uppercase;
      }
    }
  `;
}
