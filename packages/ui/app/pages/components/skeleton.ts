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
import {TiniSkeletonComponent} from '@tinijs/ui/components/skeleton';

import {
  renderSection,
  renderDefaultSection,
  renderColorsSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
  WIDE_MD_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-skeleton',
  components: [
    TiniBoxComponent,
    TiniSkeletonComponent,
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
export class AppPageComponentsSkeleton extends TiniComponent {
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
      styleRecord: {
        common: FLEX_COLUMN_STYLES,
        contrastBoxes: WIDE_MD_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Skeleton"
        name="skeleton"
        path="components/skeleton"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Skeleton description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default width is <code>100%</code>, default height is
              <code>1rem</code>.
            </p>
          `,
          html`<tini-skeleton></tini-skeleton>`,
          this.renderSectionOptions
        )}

        <!-- customization -->
        ${renderSection(
          'customization',
          'Customization',
          html`
            <p>
              Custom width, height, speed and border radius. Default border
              radius is <code>radius</code>. Default speed is <code>3s</code>.
            </p>
          `,
          html`
            <tini-skeleton
              width="500px"
              height="50px"
              borderRadius="max"
            ></tini-skeleton>
            <tini-skeleton
              width="100px"
              height="100px"
              speed="1.5s"
              borderRadius="zero"
            ></tini-skeleton>
            <tini-skeleton
              width="100px"
              height="100px"
              speed="1.5s"
              borderRadius="full"
            ></tini-skeleton>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-skeleton
              scheme=${color}
              width="500px"
              height="50px"
            ></tini-skeleton>`,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
