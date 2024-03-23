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
import {TiniRadiosComponent, RadiosItem} from '@tinijs/ui/components/radios';

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
  name: 'app-page-components-radios',
  components: [
    TiniBoxComponent,
    TiniRadiosComponent,
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
export class AppPageComponentsRadios extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['item', 'Item container'],
    ['input', 'An input element'],
    ['label', 'A label'],
  ];

  private DEFAULT_LIST: RadiosItem[] = [
    {label: 'Default radio'},
    {label: 'Default radio (checked)', checked: true},
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniRadiosComponent.defaultTagName],
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
    modifier: (item: RadiosItem, i: number) => RadiosItem
  ) {
    return this.DEFAULT_LIST.map((item, i) => modifier({...item}, i));
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Radios"
        name="radios"
        path="components/radios"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Radios description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default active color is <code>primary</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`<tini-radios
            name="default"
            .items=${this.DEFAULT_LIST}
          ></tini-radios>`,
          this.renderSectionOptions
        )}

        <!-- no label -->
        ${renderSection(
          'no-label',
          'No label',
          html`<p>Omit the <code>label</code> from the items.</p>`,
          html`<tini-radios
            name="no-label"
            .items=${this.buildCustomList(item => !(item.label = '') && item)}
          ></tini-radios>`,
          this.renderSectionOptions
        )}

        <!-- wrap -->
        ${renderSection(
          'wrap',
          'Wrap',
          null,
          html`<tini-radios
            wrap
            name="wrap"
            .items=${this.DEFAULT_LIST}
          ></tini-radios>`,
          this.renderSectionOptions
        )}

        <!-- disabled -->
        ${renderSection(
          'disabled',
          'Disabled',
          html`<p>Add <code>{disable: true}</code> to the items.</p>`,
          html`<tini-radios
            name="disabled"
            .items=${this.buildCustomList(
              item => (item.disabled = true) && item
            )}
          ></tini-radios>`,
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
            <tini-radios
              name="events"
              events="change"
              .items=${this.buildCustomList((item, i) => {
                const no = i + 1;
                item.label = `Checkbox ${no}`;
                return item;
              })}
              @change=${({detail}: CustomEvent<InputEvent>) =>
                console.log('Radios "change" event: ', detail)}
            ></tini-radios>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-radios
              name=${`${color}`}
              wrap
              .items=${[
                {
                  label: `Checkbox color ${color}`,
                  checked: true,
                  scheme: color,
                },
              ]}
            ></tini-radios>`,
          {
            ...this.renderSectionOptions,
            content: html`<p>Add <code>{color: '...'}</code> to the items.</p>`,
          }
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-radios
              name="scales"
              wrap
              .items=${[
                {
                  label: `Checkbox scale ${scale}`,
                  scale,
                },
              ]}
            ></tini-radios>`,
          this.renderSectionOptions
        )}

        <!-- pseudo -->
        ${renderSection(
          'pseudo',
          'Pseudo',
          html`<p>Checked scheme.</p>`,
          html`
            <tini-radios
              name="pseudo-1"
              .items=${this.buildCustomList(
                item => (item['checked:scheme'] = Colors.Success) && item
              )}
            ></tini-radios>
            <tini-radios
              name="pseudo-2"
              .items=${this.buildCustomList(item => {
                item.scheme = Colors.Warning;
                item['checked:scheme'] = Colors.Danger;
                return item;
              })}
            ></tini-radios>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-radios
              name="style-deep"
              .items=${this.DEFAULT_LIST}
              styleDeep="
    .item { gap: .25rem }
    input[type=radio] { border-radius: 0; transform: rotate(45deg) }
  "
            ></tini-radios>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
