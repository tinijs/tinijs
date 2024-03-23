import {html} from 'lit';
import {ref, Ref, createRef} from 'lit/directives/ref.js';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniButtonComponent} from '@tinijs/ui/components/button';
import {TiniInputComponent} from '@tinijs/ui/components/input';
import {TiniDialogComponent} from '@tinijs/ui/components/dialog';

import {
  renderSection,
  renderDefaultSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent} from '../../components/section';

@Page({
  name: 'app-page-components-dialog',
  components: [
    TiniButtonComponent,
    TiniInputComponent,
    TiniDialogComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
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
export class AppPageComponentsDialog extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['head', 'The head part'],
    ['body', 'The body part'],
    ['foot', 'The foot part'],
    ['foot-first', 'The first child of the foot'],
    ['foot-second', 'The second child of the foot'],
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.attrCasing(['title text', 'backdrop closed']);

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniDialogComponent.defaultTagName],
        [/* scheme, */ {name: 'type', enumName: 'DialogTypes'}]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
    };
  }

  private readonly alert1DialogRef: Ref<TiniDialogComponent> = createRef();
  private readonly alert2DialogRef: Ref<TiniDialogComponent> = createRef();
  private readonly confirmDialogRef: Ref<TiniDialogComponent> = createRef();
  private readonly promptDialogRef: Ref<TiniDialogComponent> = createRef();
  private readonly customButtonsDialogRef: Ref<TiniDialogComponent> =
    createRef();
  private readonly customHeadFootDialogRef: Ref<TiniDialogComponent> =
    createRef();
  private readonly styleDeepDialogRef: Ref<TiniDialogComponent> = createRef();

  protected render() {
    return html`
      <app-component-page
        titleText="Dialog"
        name="dialog"
        path="components/dialog"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Dialog description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default type is <code>alert</code>. Use <code>yes</code> and
              <code>no</code> to capture events. You can use the
              <code>shadow</code> attribute to change the shadow of the dialog.
            </p>
          `,
          html`
            <div class="group">
              <tini-button
                scheme="primary"
                @click=${() => this.alert1DialogRef.value?.show()}
                >Open alert</tini-button
              >
              <tini-dialog
                ${ref(this.alert1DialogRef)}
                titleText="An alert dialog"
                @no=${() => this.alert1DialogRef.value?.hide()}
                @yes=${() => this.alert1DialogRef.value?.hide()}
              >
                <p>Alert dialog content.</p>
              </tini-dialog>
            </div>

            <div class="group" style="margin-top: 1rem;">
              <tini-button
                scheme="primary"
                @click=${() => this.alert2DialogRef.value?.show()}
                >Open alert (excess shadow, close on clicking
                backdrop)</tini-button
              >
              <tini-dialog
                ${ref(this.alert2DialogRef)}
                backdropClosed
                titleText="An alert dialog"
                shadow="excess"
                @no=${() => this.alert2DialogRef.value?.hide()}
                @yes=${() => this.alert2DialogRef.value?.hide()}
              >
                <p>Alert dialog content, close on clicking backdrop.</p>
              </tini-dialog>
            </div>
          `,
          this.renderSectionOptions
        )}

        <!-- confirm -->
        ${renderSection(
          'confirm',
          'Confirm',
          html`
            <p>
              Use type <code>confirm</code> to create dialog with
              <strong>Yes/No</strong> button.
            </p>
          `,
          html`
            <tini-button
              scheme="primary"
              @click=${() => this.confirmDialogRef.value?.show()}
              >Open confirm</tini-button
            >
            <tini-dialog
              ${ref(this.confirmDialogRef)}
              type="confirm"
              titleText="A confirm dialog"
              @no=${() => this.confirmDialogRef.value?.hide()}
              @yes=${() => this.confirmDialogRef.value?.hide()}
            >
              <p>Confirm dialog content.</p>
            </tini-dialog>
          `,
          this.renderSectionOptions
        )}

        <!-- prompt -->
        ${renderSection(
          'prompt',
          'Prompt',
          html`
            <p>
              Use type <code>prompt</code> to create dialog with
              <strong>OK/Cancel</strong> button.
            </p>
          `,
          html`
            <tini-button
              scheme="primary"
              @click=${() => this.promptDialogRef.value?.show()}
              >Open prompt</tini-button
            >
            <tini-dialog
              ${ref(this.promptDialogRef)}
              type="prompt"
              titleText="A prompt dialog"
              @no=${() => this.promptDialogRef.value?.hide()}
              @yes=${() => this.promptDialogRef.value?.hide()}
            >
              <tini-input
                label="Enter your email"
                name="email"
                type="email"
                placeholder="email@example.com"
              ></tini-input>
            </tini-dialog>
          `,
          this.renderSectionOptions
        )}

        <!-- custom buttons -->
        ${renderSection(
          'custom-buttons',
          'Custom buttons',
          html`<p>Customize the Yes/No button.</p>`,
          html`
            <tini-button
              scheme="primary"
              @click=${() => this.customButtonsDialogRef.value?.show()}
              >Open custom dialog</tini-button
            >
            <tini-dialog
              ${ref(this.customButtonsDialogRef)}
              titleText="Delete this item?"
              type="confirm"
              .noButton=${{text: 'Cancel', scheme: 'secondary'} as any}
              .yesButton=${{text: 'Delete?', scheme: 'danger'} as any}
              @no=${() => this.customButtonsDialogRef.value?.hide()}
              @yes=${() => this.customButtonsDialogRef.value?.hide()}
            >
              <p>Customize text and color of the buttons.</p>
            </tini-dialog>
          `,
          this.renderSectionOptions
        )}

        <!-- custom head and foot -->
        ${renderSection(
          'custom-head-foot',
          'Custom head and foot',
          html`<p>Provide your own head and foot.</p>`,
          html`
            <tini-button
              scheme="primary"
              @click=${() => this.customHeadFootDialogRef.value?.show()}
              >Open custom alert</tini-button
            >
            <tini-dialog
              ${ref(this.customHeadFootDialogRef)}
              @no=${() => this.customHeadFootDialogRef.value?.hide()}
              @yes=${() => this.customHeadFootDialogRef.value?.hide()}
            >
              <div slot="head">Custom head</div>
              <p>Provide your custom head and foot.</p>
              <div slot="foot" style="width: 100%; text-align: center;">
                <tini-button
                  scheme="success"
                  @click=${() => this.customHeadFootDialogRef.value?.hide()}
                  >Close</tini-button
                >
              </div>
            </tini-dialog>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-button
              scheme="primary"
              @click=${() => this.styleDeepDialogRef.value?.show()}
              >Open alert (blur backdrop)</tini-button
            >
            <tini-dialog
              ${ref(this.styleDeepDialogRef)}
              titleText="An alert dialog"
              @no=${() => this.styleDeepDialogRef.value?.hide()}
              @yes=${() => this.styleDeepDialogRef.value?.hide()}
              styleDeep="
    .root { background: color-mix(in oklab, var(--color-background), transparent 30%) }
    .root::backdrop {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  "
            >
              <p>Alert dialog content.</p>
            </tini-dialog>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
