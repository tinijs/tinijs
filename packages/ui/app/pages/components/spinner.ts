import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';
import {TiniBoxComponent} from '@tinijs/ui-app/components/box.js';
import {TiniSpinnerComponent} from '@tinijs/ui-app/components/spinner.js';

import {
  renderDefaultSection,
  renderColorsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {
  AppSectionComponent,
  FLEX_ROW_STYLES,
} from '../../components/section.js';

@Page({
  name: 'app-page-components-spinner',
  components: [
    TiniBoxComponent,
    TiniSpinnerComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsSpinner extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniSpinnerComponent.defaultTagName],
        [
          /* scheme, */ ReactCommonProps.SchemeButColorsOnly,
          ReactCommonProps.Scale,
        ]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        common: FLEX_ROW_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Spinner"
        name="spinner"
        path="components/spinner"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Spinner description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is <code>medium</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`<tini-spinner></tini-spinner>`,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color => html`<tini-spinner scheme=${color}></tini-spinner>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-spinner scale=${scale} scheme="primary"></tini-spinner>`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-spinner
              styleDeep="
    .root {
      --spinner-color: darkmagenta;
      --spinner-scale: 7rem;
    }
  "
            ></tini-spinner>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
