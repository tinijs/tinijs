import {html, css} from 'lit';
import JSON5 from 'json5';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  type OnCreate,
  type OnChanges,
} from '@tinijs/core';

import {TiniTextareaComponent} from '../../ui/components/textarea.js';

@Component({
  components: [TiniTextareaComponent],
})
export class AppComponentEditorJSComponent
  extends TiniComponent
  implements OnCreate, OnChanges
{
  static readonly defaultTagName = 'app-component-editor-js';

  @Input() label!: string;
  @Input({type: Object}) value?: Record<string, any>;
  @Output() change!: EventEmitter<Record<string, any>>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
  }

  private displayValue?: string;
  onChanges() {
    this.displayValue = !this.value ? '' : JSON5.stringify(this.value, null, 2);
  }

  protected render() {
    return html`
      <tini-textarea
        .label=${this.label}
        .value=${this.displayValue}
        events="change"
        @change=${({detail}: CustomEvent<InputEvent>) =>
          this.change.emit(JSON5.parse((detail as any).target.value))}
      ></tini-textarea>
    `;
  }

  static styles = css`
    tini-textarea {
      &::part(label) {
        font-weight: bold;
        font-size: var(--size-text-0_8x);
        text-transform: uppercase;
      }

      &::part(textarea) {
        height: 120px;
        font-family: var(--font-code);
        font-size: var(--size-text-0_9x);
      }
    }
  `;
}
