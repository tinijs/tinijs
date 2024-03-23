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
import {TiniLabelComponent} from '@tinijs/ui/components/label';

import {
  renderDefaultSection,
  renderColorsSection,
  renderScalesSection,
  renderFontColorsSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent, FLEX_ROW_STYLES} from '../../components/section';

@Page({
  name: 'app-page-components-label',
  components: [
    TiniBoxComponent,
    TiniLabelComponent,
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
export class AppPageComponentsLabel extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniLabelComponent.defaultTagName],
        [
          /* scheme, */ ReactCommonProps.SchemeButColorsOnly,
          ReactCommonProps.Scale,
          ReactCommonProps.Color,
        ]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        contrasts: FLEX_ROW_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Label"
        name="label"
        path="components/label"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Label description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is <code>medium</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`
            <tini-label>Label</tini-label>
            <tini-label pill>Label</tini-label>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color => html`<tini-label scheme=${color}>Label</tini-label>`,
          this.renderSectionOptions
        )}

        <!-- text colors -->
        ${renderFontColorsSection(
          ['medium', 'warning'] as any,
          scheme =>
            html`<tini-label scheme=${scheme as any} color="primary"
              >Label</tini-label
            >`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-label scale=${scale} scheme="primary"
              >Label</tini-label
            >`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-label
              styleDeep="
    .root {
      border-radius: 0;
      background: darkmagenta;
      color: white;
    }
  "
              >Label</tini-label
            >
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
