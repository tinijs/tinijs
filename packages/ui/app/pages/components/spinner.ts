import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniBoxComponent} from '@tinijs/ui/components/box';
import {TiniSpinnerComponent} from '@tinijs/ui/components/spinner';

import {
  renderDefaultSection,
  renderColorsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent, FLEX_ROW_STYLES} from '../../components/section';

@Page({
  name: 'app-page-components-spinner',
  components: [
    TiniBoxComponent,
    TiniSpinnerComponent,
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
