import {html, css} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

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
export class AppComponentEditorHTMLComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-html';

  @Input() label!: string;
  @Input() placeholder?: string;

  @Input() target!: string;
  @Input() value?: string;

  @Output() change!: EventEmitter<string>;

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
        height: 120px;
        font-family: var(--font-code);
        font-size: var(--text-sm);
      }
    }
  `;
}
