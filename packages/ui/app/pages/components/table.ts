import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';
import {TiniBoxComponent, TiniTableComponent} from '@ui';

import {
  renderSection,
  renderDefaultSection,
  RenderSectionOptions,
} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {AppSectionComponent} from '../../components/section.js';

@Page({
  name: 'app-page-components-table',
  components: [
    TiniBoxComponent,
    TiniTableComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsTable extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder => builder,
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Table"
        name="table"
        path="components/table"
        .component=${TiniTableComponent}
        .partList=${this.PART_LIST}
      >
        <div slot="description">Table description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html` <p>Default usage.</p> `,
          html`
            <tini-table
              .head=${['#', 'Name', 'Age']}
              .body=${[
                [1, 'Alex', 25],
                [2, 'Bob', 22],
                [3, 'Chris', 30],
              ]}
            ></tini-table>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
