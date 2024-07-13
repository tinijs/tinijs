import {html, css, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {UIConsumerTargets} from '../../../app/consts/common.js';

import {AppComponentUsageComponent} from '../../../app/components/component-usage.js';
import {TiniButtonComponent} from '../../../app/ui/components/button.js';
import {TiniCodeComponent} from '../../../app/ui/components/code.js';
import {TiniDialogComponent} from '../../../app/ui/components/dialog.js';

@Component({
  components: [
    TiniButtonComponent,
    TiniCodeComponent,
    TiniDialogComponent,
    AppComponentUsageComponent,
  ],
})
export class ContentUIPostDialogComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-dialog';

  @Input() block!: string;

  onCreate() {
    if (!this.block) throw new Error('block is required');
  }

  private readonly alertDialogRef = createRef<TiniDialogComponent>();

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

import { type TiniDialogComponent } from 'path/to/components/dialog.js';

class XXX extends TiniComponent {

  private readonly dialogRef = createRef<TiniDialogComponent>();

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
      <app-component-usage
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
          scheme="primary"
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
      </app-component-usage>
    `;
  }

  static styles = css``;
}
