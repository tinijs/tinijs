import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniButtonComponent} from '@tinijs/ui/components/button';
import {TiniCardComponent} from '@tinijs/ui/components/card';

import {
  renderSection,
  renderDefaultSection,
  renderBoxShadowsSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  FLEX_ROW_GAP2X_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-card',
  components: [
    TiniButtonComponent,
    TiniCardComponent,
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
export class AppPageComponentsCard extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['head', 'The head part'],
    ['head-populated', 'The head part, with content'],
    ['body', 'The body part'],
    ['foot', 'The foot part'],
    ['foot-populated', 'The foot part, with content'],
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniCardComponent.defaultTagName],
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
        shadows: FLEX_ROW_GAP2X_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Card"
        name="card"
        path="components/card"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Card description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`<p>Max width is <code>--wide-xs</code>.</p>`,
          html`
            <tini-card>
              <strong class="card-title">Card title</strong>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <tini-button scheme="primary">Go somewhere</tini-button>
            </tini-card>
          `,
          this.renderSectionOptions
        )}

        <!-- fluid -->
        ${renderSection(
          'fluid',
          'Fluid card',
          null,
          html`
            <tini-card fluid>
              <strong class="card-title">Card title</strong>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <tini-button scheme="primary">Go somewhere</tini-button>
            </tini-card>
          `,
          this.renderSectionOptions
        )}

        <!-- head and foot -->
        ${renderSection(
          'head-foot',
          'Head and foot',
          null,
          html`
            <tini-card>
              <span slot="head">Card head</span>
              <strong class="card-title">Card title</strong>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <tini-button scheme="primary">Go somewhere</tini-button>
              <span slot="foot">Card foot</span>
            </tini-card>
          `,
          this.renderSectionOptions
        )}

        <!-- image -->
        ${renderSection(
          'image',
          'Image card',
          null,
          html`
            <tini-card>
              <img
                class="card-image"
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80"
              />
              <strong class="card-title">Card title</strong>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <tini-button scheme="primary">Go somewhere</tini-button>
            </tini-card>
          `,
          this.renderSectionOptions
        )}

        <!-- box shadows -->
        ${renderBoxShadowsSection(
          shadow =>
            html`<tini-card .shadow=${shadow}>
              <p>Shadow ${shadow}</p>
            </tini-card>`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-card
              styleDeep="
    .root { border: none; box-shadow: 0px 0px 25px -10px darkmagenta }
    .head { background: darkmagenta; color: white }
  "
            >
              <span slot="head">Card head</span>
              <p>Custom styles</p>
            </tini-card>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
