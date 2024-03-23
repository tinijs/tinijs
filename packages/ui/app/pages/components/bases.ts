import {html, css, nothing} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {Page, TiniComponent, Reactive, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  textBases,
  linkBases,
  buttonBases,
  formBases,
  codeBases,
} from '@tinijs/ui/bases';
import {Subscribe} from '@tinijs/store';

import {Configurable} from '../../configurable';
import {mainStore} from '../../stores/main';

import {AppCodeComponent} from '../../components/code';
import {AppSectionComponent} from '../../components/section';

@Page({
  name: 'app-page-components-bases',
  components: [AppCodeComponent, AppSectionComponent],
  theming: {
    styling: stylingWithBases([
      commonBases,
      headingsBases,
      textBases,
      linkBases,
      buttonBases,
      formBases,
      codeBases,
    ]),
  },
})
export class AppPageComponentsBases extends TiniComponent {
  private readonly PACKAGE_PREFIX = Configurable.getOption('packagePrefix');

  private readonly headingsPreviewCode = `
    <h1>H1</h1>
    <h2>H2</h2>
    <h3>H3</h3>
    <h4>H4</h4>
    <h5>H5</h5>
    <h6>H6</h6>
  `;
  private readonly textPreviewCode =
    '<p>A paragraph with <em>em</em>, <strong>strong</strong> and <span>span</span>.</p>';
  private readonly linkPreviewCode = '<a href="#">A link</a>';
  private readonly buttonPreviewCode = '<button>A button</button>';
  private readonly formPreviewCode = `
    <form>
      <label for="input">A label</label><br/>
      <input id="input" type="text" placeholder="A text input"><br/>
      <textarea placeholder="A textarea"></textarea><br/>
      <select>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </form>
  `;
  private readonly codePreviewCode = "<code>const a = 'A code block';</code>";

  private readonly BASE_LIST = [
    [
      'common',
      'Common styles for all elements, recommended to be used in all components.',
    ],
    ['headings', 'Base styles for headings.', this.headingsPreviewCode],
    ['text', 'Base styles for p, em, strong and span.', this.textPreviewCode],
    ['link', 'Base styles for link.', this.linkPreviewCode],
    ['button', 'Base styles for button.', this.buttonPreviewCode],
    ['form', 'Base styles for form elements.', this.formPreviewCode],
    ['code', 'Base styles for code.', this.codePreviewCode],
  ];

  @Subscribe(mainStore) @Reactive() private activeSoulId =
    mainStore.activeSoulId;

  protected render() {
    return html`
      <h1>Bases</h1>
      <p>
        Bases is use to set the base styles for native elements like headings,
        paragraph, link, inputs, ... You can think of them as CSS reset.
      </p>
      <p>
        For instruction on how to setup Tini UI, please see the
        <a href="/get-started">get started</a> guide.
      </p>

      ${this.BASE_LIST.map(
        ([name, description, previewCode]) => html`
          <app-section noCodeSample>
            <h2 slot="title">${name}</h2>
            <div slot="content">
              <p>${description}</p>

              ${!previewCode
                ? nothing
                : html` <div class="preview">${unsafeHTML(previewCode)}</div> `}

              <p><strong>Use the CLI</strong></p>
              <p>
                TiniJS supports multiple souls at the runtime. The CLI provides
                all the bases you need from a single importing endpoint.
              </p>

              <app-code
                code="import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';

// 1. import the style
import {${name}Bases} from '@tinijs/ui/bases';

@Page({
  theming: {
    styling: stylingWithBases([
      ${name}Bases, // 2. use the style
    ]),
  },
})
export class MyPage extends TiniComponent {}"
              ></app-code>

              <p><strong>Use the pre-built packages</strong></p>
              <p>
                After installing the respective package, you can import the base
                CSS to your app. The pre-built package provides only its own
                bases.
              </p>

              <app-code
                code="@import '../node_modules/${this.PACKAGE_PREFIX}-${this
                  .activeSoulId}/styles/base/${name}.css';"
              ></app-code>
            </div>
          </app-section>
        `
      )}
    `;
  }

  static styles = css`
    .preview {
      padding: var(--size-space);
      border-radius: var(--size-radius);
      background: var(--color-background-tint);
    }
  `;
}
