import {html, nothing, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
} from '@tinijs/core';

export interface DialogButton {
  text?: string;
  scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
}

export interface DialogResult<Context> {
  context: Context;
  dialog: HTMLDialogElement;
}

export enum DialogParts {
  Main = ElementParts.Main,
}

export enum DialogTypes {
  Alert = 'alert',
  Confirm = 'confirm',
  Prompt = 'prompt',
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
    // main classes parts
    this.extendMainClasses({
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
    return this.renderPart(
      DialogParts.Main,
      mainChildren => html`
        <dialog
          ${ref(this.dialogRef)}
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
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
                        scheme=${this.noButton?.scheme || Colors.Middle}
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

          ${mainChildren()}
        </dialog>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    :host {
      --width: var(--wide-xs);
      --box-shadow: none;
    }

    dialog {
      position: fixed;
      padding: 0;
      width: calc(100% - var(--space-xl));
      max-width: var(--width);
      border: none;
      border-radius: var(--radius-md);
      box-shadow: var(--box-shadow);
      background: var(--color-back);
      color: var(--color-front);
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.3);
    }

    dialog.backdrop-closed::backdrop {
      cursor: pointer;
    }

    .head,
    .body,
    .foot {
      cursor: default;
      display: flex;
      box-sizing: border-box;
      width: 100%;
    }

    .head {
      justify-content: space-between;
      align-items: center;
      border-bottom: var(--border-md) solid var(--color-back-shade);
      padding: var(--space-md);
    }

    .head strong {
      display: block;
      font-size: var(--text-lg);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .head button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--space-xl);
      height: var(--space-xl);
      padding: 0;
      background: none;
      border: none;
      opacity: 0.5;
      font-size: var(--text-xl);
      cursor: pointer;
      color: var(--color-front);
    }

    .head button:hover {
      opacity: 1;
    }

    .body {
      flex-flow: column;
      padding: var(--space-lg);
      overflow-x: hidden;
      overflow-y: auto;
      max-height: 75vh;
      max-height: 75dvh;
    }

    .foot {
      align-items: center;
      justify-content: space-between;
      padding: var(--space-md);
      border-top: var(--border-md) solid var(--color-back-shade);
    }
  `,

  outputs.statics,
]);
