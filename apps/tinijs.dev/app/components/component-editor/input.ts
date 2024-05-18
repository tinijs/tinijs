import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {TiniInputComponent} from '../../ui/components/input.js';

@Component({
  components: [TiniInputComponent],
})
export class AppComponentEditorInputComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-input';

  @Input() label!: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Output() change!: EventEmitter<string>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
  }

  protected render() {
    return html`
      <tini-input
        wrap
        block
        .label=${this.label}
        .placeholder=${this.placeholder}
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
