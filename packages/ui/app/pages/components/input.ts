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
import {TiniInputComponent} from '@tinijs/ui/components/input';

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
  FLEX_COLUMN_STYLES,
  WIDE_XS_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-input',
  components: [
    TiniBoxComponent,
    TiniInputComponent,
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
export class AppPageComponentsInput extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['input', 'The input element'],
    ['label', 'The label'],
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniInputComponent.defaultTagName],
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
        schemes: FLEX_COLUMN_STYLES,
        contrasts: FLEX_COLUMN_STYLES,
        contrastBoxes: WIDE_XS_STYLES,
        scales: FLEX_COLUMN_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Input"
        name="input"
        path="components/input"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Input description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is <code>primary</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`
            <tini-input label="Name" placeholder="Enter your name"></tini-input>
            <tini-input
              label="Email address"
              type="email"
              placeholder="name@example.com"
            ></tini-input>
          `,
          this.renderSectionOptions
        )}

        <!-- wrap -->
        ${renderSection(
          'wrap',
          'Wrap',
          null,
          html`<tini-input
            wrap
            label="Name"
            placeholder="Enter your name"
          ></tini-input>`,
          this.renderSectionOptions
        )}

        <!-- block -->
        ${renderSection(
          'block',
          'Block',
          null,
          html`
            <tini-input
              block
              label="Name"
              placeholder="Enter your name"
            ></tini-input>
            <tini-input
              wrap
              block
              label="Name"
              placeholder="Enter your name"
            ></tini-input>
          `,
          this.renderSectionOptions
        )}

        <!-- disabled -->
        ${renderSection(
          'disabled',
          'Disabled',
          null,
          html`<tini-input disabled value="John Doe"></tini-input>`,
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
            <tini-input
              label="Event"
              name="input-with-event"
              events="input,change,focus,blur"
              @input=${({detail}: CustomEvent<InputEvent>) =>
                console.log('Input "input" event: ', detail)}
              @change=${({detail}: CustomEvent<InputEvent>) =>
                console.log('Input "change" event: ', detail)}
              @focus=${({detail}: CustomEvent<InputEvent>) =>
                console.log('Input "focus" event: ', detail)}
              @blur=${({detail}: CustomEvent<InputEvent>) =>
                console.log('Input "blur" event: ', detail)}
            ></tini-input>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-input
              scheme="${color}"
              placeholder="Placeholder"
            ></tini-input>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-input scale=${scale} placeholder=${scale}></tini-input>`,
          this.renderSectionOptions
        )}

        <!-- pseudo -->
        ${renderSection(
          'pseudo',
          'Pseudo',
          html` <p>Focus scheme.</p> `,
          html`
            <tini-input
              focus:scheme="success"
              placeholder="Default / focus success"
            ></tini-input>
            <tini-input
              scheme="warning"
              focus:scheme="danger"
              placeholder="Warning / focus danger"
            ></tini-input>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-input
              placeholder="Custom style"
              styleDeep="
    input {
      border-width: 2px;
      border-radius: 0;
    }
  "
            ></tini-input>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
