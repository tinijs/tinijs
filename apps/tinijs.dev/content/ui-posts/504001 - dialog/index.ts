import {html, css, nothing} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ref, createRef} from 'lit/directives/ref.js';

import {element, TiniElement} from '@tinijs/core';

import {UIConsumerTargets} from '../../../app/consts/common.js';

import {AppElementUsageElement} from '../../../app/elements/element-usage.js';
import {TiniButtonElement} from '../../../app/ui/elements/button.js';
import {TiniCodeElement} from '../../../app/ui/elements/code.js';
import {TiniDialogElement} from '../../../app/ui/elements/dialog.js';

@element({
  elements: [
    TiniButtonElement,
    TiniCodeElement,
    TiniDialogElement,
    AppElementUsageElement,
  ],
})
export class ContentUIPostDialogElement extends TiniElement {
  static readonly defaultTagName = 'content-ui-post-dialog';

  @property() block!: string;

  onCreate() {
    if (!this.block) throw new Error('block is required');
  }

  private readonly alertDialogRef = createRef<TiniDialogElement>();

  protected render() {
    switch (this.block) {
      case 'default':
        return this.renderDefaultBlock();
      default:
        return nothing;
    }
  }

  private renderDefaultBlock() {
    const tiniCode = html`
      <tini-code
        language="javascript"
        content=${`import { ref, createRef } from 'lit/directives/ref.js';

import { type TiniDialogElement } from 'path/to/elements/dialog.js';

class XXX extends TiniElement {

  private readonly dialogRef = createRef<TiniDialogElement>();

  showDialog() {
    this.dialogRef.value!.show();
  }

  hideDialog() {
    this.dialogRef.value!.hide();
  }
  
  protected render() {
    return html\`
      <button @click=$\{this.showDialog}>Open dialog</button>

      <tini-dialog
        $\{ref(this.dialogRef)}
        titleText="A dialog"
        @no=$\{this.hideDialog}
        @yes=$\{this.hideDialog}
      >
        <p>Dialog content.</p>
      </tini-dialog>
    \`;
  }

}`}
      ></tini-code>
    `;
    const vueCode = html`TODO: Vue`;
    const reactCode = html`TODO: React`;
    const angularCode = html`TODO: Angular`;
    const svelteCode = html`TODO: Svelte`;
    const vanillaCode = html`TODO: Vanilla`;
    return html`
      <app-element-usage
        .codes=${[
          {
            [UIConsumerTargets.Tini]: tiniCode,
            [UIConsumerTargets.Vue]: vueCode,
            [UIConsumerTargets.React]: reactCode,
            [UIConsumerTargets.Angular]: angularCode,
            [UIConsumerTargets.Svelte]: svelteCode,
            [UIConsumerTargets.Vanilla]: vanillaCode,
          },
        ]}
      >
        <tini-button
          color="primary"
          @click=${() => this.alertDialogRef.value?.show()}
          >Open alert</tini-button
        >
        <tini-dialog
          ${ref(this.alertDialogRef)}
          titleText="An alert dialog"
          @no=${() => this.alertDialogRef.value?.hide()}
          @yes=${() => this.alertDialogRef.value?.hide()}
        >
          <p>Alert dialog content.</p>
        </tini-dialog>
      </app-element-usage>
    `;
  }

  static styles = css``;
}
