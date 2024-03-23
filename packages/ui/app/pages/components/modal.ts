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
import {TiniModalComponent} from '@tinijs/ui/components/modal';

import {
  renderDefaultSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent} from '../../components/section';

@Page({
  name: 'app-page-components-modal',
  components: [
    TiniModalComponent,
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
export class AppPageComponentsModal extends TiniComponent {
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
        [/* tini-box, */ TiniModalComponent.defaultTagName],
        [
          /* scheme, */
        ]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
    };
  }

  private readonly default1ModalRef: Ref<TiniModalComponent> = createRef();
  private readonly default2ModalRef: Ref<TiniModalComponent> = createRef();
  private readonly styleDeepModalRef: Ref<TiniModalComponent> = createRef();

  protected render() {
    return html`
      <app-component-page
        titleText="Modal"
        name="modal"
        path="components/modal"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Modal description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Use <code>yes</code> and <code>no</code> to capture events. For
              more on customizing button and head/foot slot. Please see the
              <a href="/components/dialog">Dialog</a> component. You can use the
              <code>shadow</code> attribute to change the shadow of the dialog.
            </p>
          `,
          html`
            <div class="group">
              <tini-button
                scheme="primary"
                @click=${() => this.default1ModalRef.value?.show()}
                >Open modal</tini-button
              >
              <tini-modal
                ${ref(this.default1ModalRef)}
                titleText="Modal title"
                @no=${() => this.default1ModalRef.value?.hide()}
                @yes=${() => this.default1ModalRef.value?.hide()}
              >
                ${this.sampleContent}
              </tini-modal>
            </div>

            <div class="group" style="margin-top: 1rem;">
              <tini-button
                scheme="primary"
                @click=${() => this.default2ModalRef.value?.show()}
                >Open modal (excess shadow, close on clicking
                backdrop)</tini-button
              >
              <tini-modal
                ${ref(this.default2ModalRef)}
                backdropClosed
                titleText="Modal title"
                shadow="excess"
                @no=${() => this.default2ModalRef.value?.hide()}
                @yes=${() => this.default2ModalRef.value?.hide()}
              >
                ${this.sampleContent}
              </tini-modal>
            </div>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-button
              scheme="primary"
              @click=${() => this.styleDeepModalRef.value?.show()}
              >Open modal (blur backdrop)</tini-button
            >
            <tini-modal
              ${ref(this.styleDeepModalRef)}
              titleText="Modal title"
              @no=${() => this.styleDeepModalRef.value?.hide()}
              @yes=${() => this.styleDeepModalRef.value?.hide()}
              styleDeep="
    .root { background: color-mix(in oklab, var(--color-background), transparent 30%) }
    .root::backdrop {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  "
            >
              ${this.sampleContent}
            </tini-modal>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }

  private get sampleContent() {
    return html`
      <h3>Content</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae
        enim felis. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Donec molestie justo nec erat
        pulvinar fringilla. Aenean vestibulum nisi sit amet lorem bibendum, sed
        porttitor sapien ullamcorper. Morbi iaculis augue vel mi suscipit
        tempus. Ut suscipit fermentum porta. Donec luctus neque ac magna mollis
        congue ultrices in justo.
      </p>
      <p>
        Aliquam vestibulum velit vel orci semper pellentesque. Integer non
        ornare magna. Proin sollicitudin efficitur augue quis consequat. Aliquam
        non facilisis mauris. Praesent sit amet pharetra dui. In auctor metus
        nisl, in mollis tellus rutrum id. Etiam sit amet vestibulum risus.
        Aliquam lobortis quam ac vestibulum rutrum. Ut lectus dui, consectetur
        eget facilisis vitae, porta eu sapien. Aliquam placerat lobortis
        sodales. Nulla rutrum et metus sed pharetra. Vestibulum sodales nulla
        vel commodo consequat. Donec hendrerit erat non ornare lacinia. Donec ac
        magna nec nisl efficitur egestas. Proin non pretium risus, sed tincidunt
        quam.
      </p>
      <h3>Content</h3>
      <p>
        Sed non erat tristique, sollicitudin orci quis, eleifend nunc. Maecenas
        sagittis erat eget magna malesuada interdum. Pellentesque ultrices
        pellentesque nibh, eget sollicitudin tortor egestas sed. Pellentesque
        vitae lacinia quam. Nullam eget neque sit amet magna tempor molestie non
        sit amet nunc. Nunc eu blandit lectus. Donec faucibus rutrum libero, sit
        amet faucibus nisi convallis porta. Suspendisse potenti. Donec auctor
        metus enim, eu semper nisi pretium pulvinar.
      </p>
    `;
  }
}
