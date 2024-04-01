import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

import {TiniBoxComponent} from '@tinijs/ui-app/components/box.js';
import {
  BreadcrumbItem,
  TiniBreadcrumbComponent,
} from '@tinijs/ui-app/components/breadcrumb.js';

import {
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
  WIDE_XS_STYLES,
} from '../../components/section.js';

@Page({
  name: 'app-page-components-breadcrumb',
  components: [
    TiniBoxComponent,
    TiniBreadcrumbComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsBreadcrumb extends TiniComponent {
  private readonly PART_LIST = [
    ['root', 'The root part'],
    ['item', 'A segment'],
    ['item-active', 'An active segment'],
  ];

  private readonly ITEMS: BreadcrumbItem[] = [
    {label: 'Home', href: '#'},
    {label: 'Library', href: '#'},
    {label: 'Data'},
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.attrCasing(['link color']);

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniBreadcrumbComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.LinkColor]
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
        titleText="Breadcrumb"
        name="breadcrumb"
        path="components/breadcrumb"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Breadcrumb description.</div>

        <!-- default -->
        ${renderDefaultSection(
          null,
          html`
            ${[[this.ITEMS[0]], [this.ITEMS[0], this.ITEMS[1]], this.ITEMS].map(
              items => html`<tini-breadcrumb .items=${items}></tini-breadcrumb>`
            )}
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-breadcrumb
              linkColor=${color}
              .items=${this.ITEMS}
            ></tini-breadcrumb>`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-breadcrumb
              linkColor=${gradient}
              .items=${this.ITEMS}
            ></tini-breadcrumb>`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-breadcrumb
              .items=${this.ITEMS}
              styleDeep=".item::before { content: '>' }"
            ></tini-breadcrumb>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
