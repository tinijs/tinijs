import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  type EventEmitter,
} from '@tinijs/core';

import {
  TiniRadiosComponent,
  type RadiosItem,
} from '../../ui/components/radios.js';

@Component({
  components: [TiniRadiosComponent],
})
export class AppComponentEditorRadiosComponent extends TiniComponent {
  static readonly defaultTagName = 'app-component-editor-radios';

  @Input() label!: string;
  @Input({type: Object}) items!: RadiosItem[];
  @Output() change!: EventEmitter<string>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.items) throw new Error('items is required');
  }

  protected render() {
    return html`
      <div class="main">
        <span class="label">${this.label}</span>
        <tini-radios
          name="radio-item"
          .items=${this.items}
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
