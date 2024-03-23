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
import {TiniPaginationComponent} from '@tinijs/ui/components/pagination';

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
  WIDE_XS_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-pagination',
  components: [
    TiniBoxComponent,
    TiniPaginationComponent,
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
export class AppPageComponentsPagination extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['previous', 'The previous button'],
    ['previous-disabled', 'The disabled previous button'],
    ['previous-link', 'The previous link'],
    ['previous-link-disabled', 'The disabled previous link'],
    ['next', 'The next button'],
    ['next-disabled', 'The disabled next button'],
    ['next-link', 'The next link'],
    ['next-link-disabled', 'The disabled next link'],
    ['item', 'An item button'],
    ['item-active', 'An active item button'],
    ['item-link', 'An item link'],
    ['item-link-active', 'An active item link'],
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.attrCasing(['total page', 'current page']);

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniPaginationComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.Scale]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        common: FLEX_COLUMN_STYLES,
        contrastBoxes: WIDE_XS_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Pagination"
        name="pagination"
        path="components/pagination"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Pagination description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default current page is <code>1</code>. Default color is
              <code>primary</code>, default size is <code>md</code>.
            </p>
          `,
          html`<tini-pagination totalPage="3"></tini-pagination>`,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-pagination
              totalPage="3"
              currentPage="2"
              scheme=${color}
            ></tini-pagination>`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-pagination
              totalPage="3"
              currentPage="2"
              scheme=${gradient}
            ></tini-pagination>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-pagination
              totalPage="3"
              currentPage="2"
              scale=${scale}
            ></tini-pagination>`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-pagination
              totalPage="3"
              currentPage="2"
              styleDeep="
    .root { gap: 0.5rem; }
    .root li a {
      border: 1px solid var(--color-primary);
      border-radius: 0;
    }
  "
            ></tini-pagination>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
