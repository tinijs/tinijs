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
import {
  TiniSelectComponent,
  SelectOption,
  SelectOptgroup,
} from '@tinijs/ui/components/select';

import {
  renderSection,
  renderDefaultSection,
  renderColorsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  BLOCK_STYLES,
  FLEX_COLUMN_STYLES,
  WIDE_XXS_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-select',
  components: [
    TiniBoxComponent,
    TiniSelectComponent,
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
export class AppPageComponentsSelect extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['label', 'The label'],
    ['select', 'The select element'],
    ['optgroup', 'An optgroup element'],
    ['option', 'An option element'],
  ];

  private OPTIONS: SelectOption[] = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  private OPTGROUPS: SelectOptgroup[] = [
    {
      label: 'Group 1',
      children: this.OPTIONS,
    },
    {
      label: 'Group 2',
      children: this.OPTIONS,
    },
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniSelectComponent.defaultTagName],
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
        common: FLEX_COLUMN_STYLES,
        default: BLOCK_STYLES,
        contrastBoxes: WIDE_XXS_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Select"
        name="select"
        path="components/select"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Select description.</div>

        <!-- default -->
        ${renderDefaultSection(
          null,
          html`
            <tini-select
              label="Select an option"
              .items=${this.OPTIONS}
            ></tini-select>
            <tini-select
              label="Using optgroup"
              .items=${this.OPTGROUPS}
            ></tini-select>
          `,
          this.renderSectionOptions
        )}

        <!-- wrap -->
        ${renderSection(
          'wrap',
          'Wrap',
          null,
          html`
            <tini-select
              wrap
              label="Select an option"
              .items=${this.OPTIONS}
            ></tini-select>
            <tini-select
              wrap
              label="Using optgroup"
              .items=${this.OPTGROUPS}
            ></tini-select>
          `,
          this.renderSectionOptions
        )}

        <!-- disabled -->
        ${renderSection(
          'disabled',
          'Disabled',
          null,
          html`
            <tini-select
              wrap
              label="Disabled option"
              .items=${[
                this.OPTIONS[0],
                {...this.OPTIONS[1], disabled: true},
                this.OPTIONS[2],
              ]}
            ></tini-select>
            <tini-select
              wrap
              disabled
              label="Disabled select"
              .items=${this.OPTIONS}
            ></tini-select>
          `,
          this.renderSectionOptions
        )}

        <!-- events -->
        ${renderSection(
          'events',
          'Events',
          html`
            <p>
              Enable event forwarding (via the <code>events</code> attribute)
              and add the respected events to capture changes (open the console
              to see the event log).
            </p>
          `,
          html`
            <tini-select
              label="Event"
              name="input-with-event"
              events="change"
              .items=${this.OPTIONS}
              @change=${({detail}: CustomEvent<InputEvent>) =>
                console.log('Select "change" event: ', detail)}
            ></tini-select>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-select
              scheme="${color as any}"
              .items=${this.OPTIONS}
            ></tini-select>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-select
              scale=${scale}
              .items=${this.OPTIONS}
            ></tini-select>`,
          this.renderSectionOptions
        )}

        <!-- pseudo -->
        ${renderSection(
          'pseudo',
          'Pseudo',
          null,
          html`
            <tini-select
              focus:scheme="success"
              label="Default / focus success"
              .items=${this.OPTIONS}
            ></tini-select>
            <tini-select
              scheme="warning"
              focus:scheme="danger"
              label="Warning / focus danger"
              .items=${this.OPTIONS}
            ></tini-select>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-select
              .items=${this.OPTIONS}
              styleDeep="
    select {
      border-width: 2px;
      border-radius: 0;
    }
  "
            ></tini-select>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
