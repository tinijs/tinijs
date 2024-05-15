import {html, css} from 'lit';

import {TiniTextareaComponent} from '../../ui/components/textarea.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

@Component({
  components: [TiniTextareaComponent],
})
export class AppComponentEditorTextareaComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-textarea';

  @Input() label!: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Output() change!: EventEmitter<string>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
  }

  protected render() {
    return html`
      <tini-textarea
        .label=${this.label}
        .placeholder=${this.placeholder}
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
        font-size: var(--size-text-0_75x);
        text-transform: uppercase;
      }

      &::part(textarea) {
        height: 100px;
      }
    }
  `;
}
