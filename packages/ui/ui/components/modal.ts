import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ref, createRef} from 'lit/directives/ref.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
} from '@tinijs/core';

import type {DialogButton} from './dialog.js';

export type ModalButton = DialogButton;

export enum ModalParts {
  Main = ElementParts.Main,
  Head = 'head',
  Body = 'body',
  Foot = 'foot',
}

export enum ModalActions {
  Dismiss = 'dismiss',
  Deny = 'deny',
  Accept = 'accept',
}

export const BACKDROP_DISMISSAL = 'backdrop-dismissal';

/***
{
  "reactEvents": {
    "action": "onAction"
  }
}
***/
export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) titleText?: string;
  @property({type: Boolean, reflect: true}) backdropDismissal?: boolean;
  @property({type: Boolean, reflect: true}) stayUponAccepted?: boolean;
  @property({type: Object}) data?: Record<string, unknown>;
  @property({type: Object}) denyButton?: DialogButton;
  @property({type: Object}) acceptButton?: DialogButton;
  /* eslint-enable prettier/prettier */

  private readonly dialogRef = createRef<HTMLDialogElement>();

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        [BACKDROP_DISMISSAL]: !!this.backdropDismissal,
      },
    });
  }

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
    if (
      ~targetPart.indexOf(ModalParts.Main) &&
      ~targetPart.indexOf(BACKDROP_DISMISSAL)
    ) {
      this.dismiss();
    }
  }

  private triggerAction(action: ModalActions) {
    const detail = {
      action,
      data: this.data,
      dialog: this,
    };
    return this.dispatchEvent(new CustomEvent('action', {detail}));
  }

  private dismiss() {
    this.hide();
    return this.triggerAction(ModalActions.Dismiss);
  }

  private deny() {
    this.hide();
    return this.triggerAction(ModalActions.Deny);
  }

  private accept() {
    if (!this.stayUponAccepted) this.hide();
    return this.triggerAction(ModalActions.Accept);
  }

  protected render() {
    return this.partRender(
      ModalParts.Main,
      mainChildren => html`
        <dialog
          ${ref(this.dialogRef)}
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
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
      ModalParts.Head,
      headChildren => html`
        <div class=${ModalParts.Head} part=${ModalParts.Head}>
          <slot name=${ModalParts.Head}>
            <strong>${this.titleText || 'Modal'}</strong>
            <button @click=${this.dismiss}>✕</button>
          </slot>
          ${headChildren()}
        </div>
      `
    );
  }

  private renderBodyPart() {
    return this.partRender(
      ModalParts.Body,
      bodyChildren => html`
        <div class=${ModalParts.Body} part=${ModalParts.Body}>
          <slot></slot>
          ${bodyChildren()}
        </div>
      `
    );
  }

  private renderFootPart() {
    return this.partRender(
      ModalParts.Foot,
      footChildren => html`
        <div class=${ModalParts.Foot} part=${ModalParts.Foot}>
          <slot name=${ModalParts.Foot}>
            <tini-button
              scheme=${this.denyButton?.scheme || Colors.Medium}
              @click=${this.deny}
            >
              ${this.denyButton?.text || 'Cancel'}
            </tini-button>
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
      --width: var(--wide-lg);
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
      border-bottom: var(--border-md) solid var(--color-body-semi);
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
      border-top: var(--border-md) solid var(--color-body-semi);
    }
  `,

  outputs.statics,
]);
