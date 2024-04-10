import {html} from 'lit';
import {ref, Ref, createRef} from 'lit/directives/ref.js';

import {CommonColors, Scales} from '@tinijs/core';
import {
  Component,
  TiniComponent,
  Output,
  Reactive,
  EventEmitter,
} from '@tinijs/core';

import {TiniInputComponent} from '@tinijs/ui-bootstrap/components/input.js';

@Component({
  components: [TiniInputComponent],
})
export class AppComposeComponent extends TiniComponent {
  static readonly defaultTagName = 'app-compose';

  @Output() commit!: EventEmitter<string>;

  @Reactive() currentContent = '';

  private readonly inputRef: Ref<TiniInputComponent> = createRef();

  private commitContent() {
    if (!this.currentContent) return;
    this.commit.emit(this.currentContent);
    this.currentContent = '';
  }

  protected render() {
    return html`
      <div>
        <tini-input
          block
          ${ref(this.inputRef)}
          scale=${Scales.ML}
          focus:scheme=${CommonColors.Teal}
          placeholder="What needs to be done?"
          value=${this.currentContent}
          events="input,keypress"
          styledeep="
            input {
              border-width: 2px;
            }
          "
          @input=${(e: CustomEvent<InputEvent>) =>
            (this.currentContent = (
              e.detail.target as HTMLTextAreaElement
            ).value)}
          @keypress=${(e: CustomEvent<KeyboardEvent>) =>
            e.detail.key !== 'Enter' ? null : this.commitContent()}
        ></tini-input>
      </div>
    `;
  }
}
