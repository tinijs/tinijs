import {html, css} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  component,
  event,
  TiniComponent,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {TiniInputComponent} from '../../ui/components/input.js';

@component({
  components: [TiniInputComponent],
})
export class AppComponentEditorInputComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-input';

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
