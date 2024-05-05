import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

@Component()
export class AppComponentEditorInputComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-input';

  @Input() property?: string;
  @Output() customEvent!: EventEmitter<{payload: any}>;

  onCreate() {
    // element connected
  }

  emitCustomEvent() {
    this.customEvent.emit({payload: '...'});
  }

  protected render() {
    return html`<p @click=${this.emitCustomEvent}>AppInputComponent</p>`;
  }

  static styles = css``;
}
