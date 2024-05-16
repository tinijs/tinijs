import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
} from '@tinijs/core';

export enum DialogTypes {
  Alert = 'alert',
  Confirm = 'confirm',
  Prompt = 'prompt',
}

export interface DialogButton {
  text?: string;
  scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
}

export interface DialogResult<Context> {
  context: Context;
  dialog: HTMLDialogElement;
}

/***
{
  "components": ["button"],
  "reactEvents": {
    "yes": "onYes",
    "no": "onNo"
  }
}
***/
export default class extends TiniElement {
  private readonly BACKDROP_CLOSED = 'backdrop-closed';

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) type = DialogTypes.Alert;
  @property({type: String, reflect: true}) titleText?: string;
  @property({type: Boolean, reflect: true}) backdropClosed?: boolean;
  @property({type: Object}) noButton?: DialogButton;
  @property({type: Object}) yesButton?: DialogButton;
  /* eslint-enable prettier/prettier */

  private dialogRef = createRef<HTMLDialogElement>();
  private context?: unknown;

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        [this.type]: true,
        [this.BACKDROP_CLOSED]: !!this.backdropClosed,
      },
    });
  }

  get opened() {
    return this.dialogRef.value?.open;
  }

  get result(): DialogResult<unknown> {
    return {
      context: this.context,
      dialog: this.dialogRef.value as HTMLDialogElement,
    };
  }

  show<Context>(context?: Context) {
    if (!this.dialogRef.value) return;
    this.context = context;
    this.dialogRef.value.showModal();
  }

  hide() {
    if (!this.dialogRef.value) return;
    this.dialogRef.value.close();
  }

  private clickDialog(e: MouseEvent) {
    if (!this.backdropClosed) return;
    const targetPart = (e.target as any)?.getAttribute('part');
    if (targetPart && ~targetPart.indexOf(this.BACKDROP_CLOSED)) this.clickNo();
  }

  private clickNo() {
    this.dispatchEvent(new CustomEvent('no', {detail: this.result}));
  }

  private clickYes() {
    this.dispatchEvent(new CustomEvent('yes', {detail: this.result}));
  }

  protected render() {
    return html`
      <dialog
        ${ref(this.dialogRef)}
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
        @click=${this.clickDialog}
      >
        <div class="head" part="head">
          <slot name="head">
            <strong>${this.titleText || 'Untitled'}</strong>
            <button @click=${this.clickNo}>✕</button>
          </slot>
        </div>

        <div class="body" part="body">
          <slot></slot>
        </div>

        <div class="foot" part="foot">
          <slot name="foot">
            <div class="foot-first" part="foot-first">
              ${this.type === DialogTypes.Alert
                ? nothing
                : html`
                    <tini-button
                      scheme=${this.noButton?.scheme || 'medium'}
                      @click=${this.clickNo}
                    >
                      ${this.noButton?.text ||
                      (this.type === DialogTypes.Confirm ? 'No' : 'Cancel')}
                    </tini-button>
                  `}
            </div>
            <div class="foot-second" part="foot-second">
              <tini-button
                scheme=${this.yesButton?.scheme || 'primary'}
                @click=${this.clickYes}
              >
                ${this.yesButton?.text ||
                (this.type === DialogTypes.Confirm ? 'Yes' : 'OK')}
              </tini-button>
            </div>
          </slot>
        </div>
      </dialog>
    `;
  }
}
