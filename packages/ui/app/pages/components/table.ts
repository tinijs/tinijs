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
import {TiniTableComponent} from '@tinijs/ui/components/table';

import {
  renderSection,
  renderDefaultSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent} from '../../components/section';

@Page({
  name: 'app-page-components-table',
  components: [
    TiniBoxComponent,
    TiniTableComponent,
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
