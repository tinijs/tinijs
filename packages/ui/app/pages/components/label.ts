import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';
import {TiniBoxComponent} from '@tinijs/ui-app/components/box.js';
import {TiniLabelComponent} from '@tinijs/ui-app/components/label.js';

import {
  renderDefaultSection,
  renderColorsSection,
  renderScalesSection,
  renderFontColorsSection,
  renderStyleDeepSection,
  type RenderSectionOptions,
} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {type CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {
  AppSectionComponent,
  FLEX_ROW_STYLES,
} from '../../components/section.js';

@Page({
  name: 'app-page-components-label',
  components: [
    TiniBoxComponent,
    TiniLabelComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
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
