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
import {TiniSwitchComponent} from '@tinijs/ui/components/switch';

import {
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
  FLEX_ROW_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-switch',
  components: [
    TiniBoxComponent,
    TiniSwitchComponent,
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
