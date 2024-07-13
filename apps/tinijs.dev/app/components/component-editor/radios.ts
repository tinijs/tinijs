import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  type EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {
  TiniRadiosComponent,
  type RadiosItem,
} from '../../ui/components/radios.js';

@Component({
  components: [TiniRadiosComponent],
})
export class AppComponentEditorRadiosComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-radios';

  @Input() label!: string;
  @Input({type: Object}) items!: RadiosItem[];

  @Input() target!: string;
  @Input() value?: string;

  @Output() change!: EventEmitter<string>;

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
          name="radio-item"
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
