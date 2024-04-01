import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';
import {TiniBoxComponent} from '@tinijs/ui-app/components/box.js';
import {TiniSwitchComponent} from '@tinijs/ui-app/components/switch.js';

import {
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
  FLEX_ROW_STYLES,
} from '../../components/section.js';

@Page({
  name: 'app-page-components-switch',
  components: [
    TiniBoxComponent,
    TiniSwitchComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsSwitch extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['switch', 'The switch container'],
    ['input', 'The input element'],
    ['slider', 'The slider part'],
    ['label', 'The label'],
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniSwitchComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.Scale]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        default: FLEX_COLUMN_STYLES,
        contrasts: FLEX_ROW_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Switch"
        name="switch"
        path="components/switch"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Switch description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is <code>medium</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`
            <tini-switch label="Default switch checkbox input"></tini-switch>
            <tini-switch
              checked
              label="Default switch checkbox input (checked)"
            ></tini-switch>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color => html`<tini-switch checked scheme=${color}></tini-switch>`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-switch checked scheme=${gradient}></tini-switch>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale => html`<tini-switch checked scale=${scale}></tini-switch>`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-switch
              checked
              scheme="primary"
              scale="xxxl"
              styleDeep=".slider, .slider::before { border-radius: 0 }"
            ></tini-switch>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
