import {html, css} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {TiniTextareaElement} from '../../ui/elements/textarea.js';

import {
  element,
  event,
  TiniElement,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

@element({
  elements: [TiniTextareaElement],
})
export class AppElementEditorTextareaElement
  extends TiniElement
  implements OnCreate
{
  static readonly defaultTagName = 'app-element-editor-textarea';

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
      <tini-textarea
        label=${this.label}
        placeholder=${ifDefined(this.placeholder)}
        .value=${this.value}
        events="change"
        @change=${({detail}: CustomEvent<InputEvent>) =>
          this.change.emit((detail as any).target.value)}
      ></tini-textarea>
    `;
  }

  static styles = css`
    tini-textarea {
      &::part(label) {
        font-weight: bold;
        font-size: var(--text-xs);
        text-transform: uppercase;
      }

      &::part(textarea) {
        height: 100px;
      }
    }
  `;
}
