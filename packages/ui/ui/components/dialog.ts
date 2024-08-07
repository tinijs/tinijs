import {html, nothing, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  TiniElement,
  ElementParts,
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

export enum DialogParts {
  Main = ElementParts.Main,
  Head = 'head',
  Body = 'body',
  Foot = 'foot',
}

export enum DialogTypes {
  Alert = 'alert',
  Confirm = 'confirm',
  Prompt = 'prompt',
}

export enum DialogActions {
  Dismiss = 'dismiss',
  Deny = 'deny',
  Accept = 'accept',
}

/***
{
  "components": ["button"],
  "reactEvents": {
    "action": "onAction"
  }
}
***/
export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) type = DialogTypes.Alert;
  @property({type: String, reflect: true}) titleText?: string;
  @property({type: Boolean, reflect: true}) backdropDismissal = false;
  @property({type: Boolean, reflect: true}) stayUponAccepted = false;
  @property({type: Object}) data?: Record<string, unknown>;
  @property({type: Object}) denyButton?: DialogButton;
  @property({type: Object}) acceptButton?: DialogButton;
  /* eslint-enable prettier/prettier */

  private readonly dialogRef = createRef<HTMLDialogElement>();

  get dialogElement() {
    return this.dialogRef.value!;
  }

  get isOpened() {
    return !!this.dialogRef.value?.open;
  }

  show<Data extends Record<string, unknown>>(data?: Data) {
    this.data = data;
    this.dialogRef.value!.showModal();
    return this;
  }

  hide() {
    this.dialogRef.value!.close();
    return this;
  }

  private clickDialog(e: MouseEvent) {
    if (!this.backdropDismissal) return;
    const targetPart = (e.target as any)?.getAttribute('part') || '';
    if (~targetPart.indexOf(DialogParts.Main) && this.backdropDismissal) {
      this.dismiss();
    }
  }

  private triggerAction(action: DialogActions) {
    return this.emitEvent('action', {
      action,
      data: this.data,
      dialog: this,
    });
  }

  private dismiss() {
    this.hide();
    return this.triggerAction(DialogActions.Dismiss);
  }

  private deny() {
    this.hide();
    return this.triggerAction(DialogActions.Deny);
  }

  private accept() {
    if (!this.stayUponAccepted) this.hide();
    return this.triggerAction(DialogActions.Accept);
  }

  protected render() {
    return this.partRender(
      DialogParts.Main,
      mainChildren => html`
        <dialog
          ${ref(this.dialogRef)}
          class=${DialogParts.Main}
          part=${DialogParts.Main}
          @click=${this.clickDialog}
        >
          ${this.renderHeadPart()} ${this.renderBodyPart()}
          ${this.renderFootPart()} ${mainChildren()}
        </dialog>
      `
    );
  }

  private renderHeadPart() {
    return this.partRender(
      DialogParts.Head,
      headChildren => html`
        <div class=${DialogParts.Head} part=${DialogParts.Head}>
          <slot name=${DialogParts.Head}>
            <strong>${this.titleText || 'Dialog'}</strong>
            <button @click=${this.dismiss}>✕</button>
          </slot>
          ${headChildren()}
        </div>
      `
    );
  }

  private renderBodyPart() {
    return this.partRender(
      DialogParts.Body,
      bodyChildren => html`
        <div class=${DialogParts.Body} part=${DialogParts.Body}>
          <slot></slot>
          ${bodyChildren()}
        </div>
      `
    );
  }

  private renderFootPart() {
    return this.partRender(
      DialogParts.Foot,
      footChildren => html`
        <div class=${DialogParts.Foot} part=${DialogParts.Foot}>
          <slot name=${DialogParts.Foot}>
            ${this.type === DialogTypes.Alert
              ? nothing
              : html`
                  <tini-button
                    scheme=${this.denyButton?.scheme || Colors.Medium}
                    @click=${this.deny}
                  >
                    ${this.denyButton?.text || 'Cancel'}
                  </tini-button>
                `}
            <tini-button
              scheme=${this.acceptButton?.scheme || 'primary'}
              @click=${this.accept}
            >
              ${this.acceptButton?.text || 'OK'}
            </tini-button>
          </slot>
          ${footChildren()}
        </div>
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
      background: var(--color-body);
      color: var(--color-body-contrast);
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.3);
    }

    dialog.backdrop-dismissal::backdrop {
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
      border-bottom: var(--border-md) solid var(--color-body);
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
      color: var(--color-body-contrast);
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
      border-top: var(--border-md) solid var(--color-body);
    }
  `,

  outputs.statics,
]);
