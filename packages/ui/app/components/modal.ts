import {html, css, nothing} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {ref, Ref, createRef} from 'lit/directives/ref.js';
import {Colors} from '@tinijs/core';
import {Component, TiniComponent, Input, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniButtonComponent} from '@tinijs/ui/components/button';

export enum ModalKinds {
  Bare = 'bare',
  Modal = 'modal',
  Alert = 'alert',
  Confirm = 'confirm',
  Prompt = 'prompt',
}

export interface ModalButton {
  text: string;
  color: Colors;
}

export interface ModalResult<Context> {
  context: Context;
  dialog: HTMLDialogElement;
}

@Component({
  components: [TiniButtonComponent],
  theming: {
    styling: stylingWithBases([
      commonBases,
      headingsBases,
      linkBases,
      textBases,
      codeBases,
    ]),
  },
})
export class AppModalComponent extends TiniComponent {
  static readonly defaultTagName = 'app-modal';

  @Input({type: String}) declare kind: ModalKinds;
  @Input({type: String}) declare titleText?: string;
  @Input({type: Boolean}) declare backdropClosed?: boolean;
  @Input({type: Object}) declare noButton?: ModalButton;
  @Input({type: Object}) declare yesButton?: ModalButton;

  private dialogRef: Ref<HTMLDialogElement> = createRef();
  private context?: unknown;

  constructor() {
    super();
    this.kind = ModalKinds.Modal;
  }

  get result(): ModalResult<unknown> {
    return {
      context: this.context,
      dialog: this.dialogRef.value as HTMLDialogElement,
    };
  }

  get opened() {
    return this.dialogRef.value?.open;
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
    const backdropClicked = !!(e.target as any)?.getAttribute('part');
    if (backdropClicked) this.clickNo();
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
        part="dialog"
        ${ref(this.dialogRef)}
        class=${classMap({
          [this.kind]: true,
          'backdrop-closed': !!this.backdropClosed,
        })}
        @click=${this.clickDialog}
      >
        ${this.kind === ModalKinds.Bare
          ? nothing
          : html`
              <div class="head">
                <em>${this.titleText || 'Modal'}</em>
                <button @click=${this.clickNo}>✕</button>
              </div>
            `}
        <div class="body">
          <slot></slot>
        </div>
        ${this.kind !== ModalKinds.Confirm && this.kind !== ModalKinds.Prompt
          ? html`<div class="foot"><slot name="foot"></slot></div>`
          : html`
              <div class="foot">
                <tini-button
                  color=${this.noButton?.color || Colors.Medium}
                  @click=${this.clickNo}
                >
                  ${this.noButton?.text ||
                  (this.kind === ModalKinds.Prompt ? 'Cancel' : 'No')}
                </tini-button>
                <tini-button
                  color=${this.yesButton?.color || Colors.Primary}
                  @click=${this.clickYes}
                >
                  ${this.yesButton?.text ||
                  (this.kind === ModalKinds.Prompt ? 'OK' : 'Yes')}
                </tini-button>
              </div>
            `}
      </dialog>
    `;
  }

  static styles = css`
    dialog {
      position: fixed;
      padding: 0;
      width: calc(100% - 2rem);
      max-width: 960px;
      border: none;
      border-radius: var(--size-radius);
      box-shadow: var(--shadow-normal);
      background: var(--color-background);
      color: var(--color-foreground);
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.3);
    }

    dialog.backdrop-closed::backdrop {
      cursor: pointer;
    }

    dialog.alert,
    dialog.confirm,
    dialog.prompt {
      max-width: 480px;
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
      border-bottom: 1px solid var(--color-background-shade);
      padding: 1rem;
    }

    .head em {
      display: block;
      font-size: 1.2rem;
      font-style: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .head button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      padding: 0;
      background: none;
      border: none;
      opacity: 0.5;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-foreground);
    }

    .head button:hover {
      opacity: 1;
    }

    .body {
      padding: 1rem;
      overflow-x: hidden;
      overflow-y: auto;
      max-height: 75vh;
      max-height: 75dvh;
    }

    .foot {
      align-items: center;
      justify-content: space-between;
    }
  `;
}
