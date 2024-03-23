import {html} from 'lit';
import {Colors} from '@tinijs/core';
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
  TiniCheckboxesComponent,
  CheckboxesItem,
} from '@tinijs/ui/components/checkboxes';

import {
  renderSection,
  renderDefaultSection,
  renderColorsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-checkboxes',
  components: [
    TiniBoxComponent,
    TiniCheckboxesComponent,
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
export class AppPageComponentsCheckboxes extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['item', 'Item container'],
    ['input', 'An input element'],
    ['label', 'A label'],
  ];

  private DEFAULT_LIST: CheckboxesItem[] = [
    {label: 'Default checkbox'},
    {label: 'Default checkbox (checked)', checked: true},
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniCheckboxesComponent.defaultTagName],
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
      styleRecord: {
        common: FLEX_COLUMN_STYLES,
      },
    };
  }

  private buildCustomList(
    modifier: (item: CheckboxesItem, i: number) => CheckboxesItem
  ) {
    return this.DEFAULT_LIST.map((item, i) => modifier({...item}, i));
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Checkboxes"
        name="checkboxes"
        path="components/checkboxes"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Checkboxes description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default active color is <code>primary</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`<tini-checkboxes .items=${this.DEFAULT_LIST}></tini-checkboxes>`,
          this.renderSectionOptions
        )}

        <!-- no label -->
        ${renderSection(
          'no-label',
          'No label',
          html`<p>Omit the <code>label</code> from the items.</p>`,
          html`<tini-checkboxes
            .items=${this.buildCustomList(item => !(item.label = '') && item)}
          ></tini-checkboxes>`,
          this.renderSectionOptions
        )}

        <!-- wrap -->
        ${renderSection(
          'wrap',
          'Wrap',
          null,
          html`<tini-checkboxes
            wrap
            .items=${this.DEFAULT_LIST}
          ></tini-checkboxes>`,
          this.renderSectionOptions
        )}

        <!-- disabled -->
        ${renderSection(
          'disabled',
          'Disabled',
          html`<p>Add <code>{disable: true}</code> to the items.</p>`,
          html`<tini-checkboxes
            .items=${this.buildCustomList(
              item => (item.disabled = true) && item
            )}
          ></tini-checkboxes>`,
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
          html`<tini-checkboxes
            events="change"
            .items=${this.buildCustomList((item, i) => {
              const no = i + 1;
              item.name = `checkbox-${no}`;
              item.label = `Checkbox ${no}`;
              return item;
            })}
            @change=${({detail}: CustomEvent<InputEvent>) =>
              console.log('Checkboxes "change" event: ', detail)}
          ></tini-checkboxes>`,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-checkboxes
              wrap
              .items=${[
                {
                  label: `Checkbox ${color}`,
                  checked: true,
                  scheme: color as Colors,
                },
              ]}
            ></tini-checkboxes>`,
          {
            ...this.renderSectionOptions,
            content: html`<p>Add <code>{color: '...'}</code> to the items.</p>`,
          }
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-checkboxes
              wrap
              .items=${[
                {
                  label: `Checkbox scale ${scale}`,
                  scale,
                },
              ]}
            ></tini-checkboxes>`,
          this.renderSectionOptions
        )}

        <!-- pseudo -->
        ${renderSection(
          'pseudo',
          'Pseudo',
          html`<p>Checked scheme.</p>`,
          html`
            <tini-checkboxes
              .items=${this.buildCustomList(
                item => (item['checked:scheme'] = Colors.Success) && item
              )}
            ></tini-checkboxes>
            <tini-checkboxes
              .items=${this.buildCustomList(item => {
                item.scheme = Colors.Warning;
                item['checked:scheme'] = Colors.Danger;
                return item;
              })}
            ></tini-checkboxes>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-checkboxes
              .items=${this.DEFAULT_LIST}
              styleDeep="input[type=checkbox] { border-radius: 0 }"
            ></tini-checkboxes>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
