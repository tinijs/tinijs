import {html, css} from 'lit';
import {property} from 'lit/decorators/property.js';

import {
  component,
  event,
  TiniComponent,
  type EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {
  TiniRadiosComponent,
  type RadiosItem,
} from '../../ui/components/radios.js';

@component({
  components: [TiniRadiosComponent],
})
export class AppComponentEditorRadiosComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-radios';

  @property() label!: string;
  @property({type: Object}) items!: RadiosItem[];

  @property() target!: string;
  @property() value?: string;

  @event() change!: EventEmitter<string>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.items) throw new Error('items is required');
    if (!this.target) throw new Error('target is required');
  }

  protected render() {
    return html`
      <div class="main">
        <span class="label">${this.label}</span>
        <tini-radios
          .items=${this.items}
          .value=${this.value || '_default'}
          events="change"
          @change=${({detail}: CustomEvent<InputEvent>) =>
            this.change.emit((detail as any).target.value)}
        ></tini-radios>
      </div>
    `;
  }

  static styles = css`
    .label {
      display: block;
      font-weight: bold;
      font-size: var(--text-xs);
      text-transform: uppercase;
      margin-bottom: var(--space-xs);
    }
  `;
}
