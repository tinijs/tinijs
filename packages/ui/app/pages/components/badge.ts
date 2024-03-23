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
import {TiniBadgeComponent} from '@tinijs/ui/components/badge';

import {
  renderSection,
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderFontColorsSection,
  renderScalesSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent, FLEX_ROW_STYLES} from '../../components/section';

@Page({
  name: 'app-page-components-badge',
  components: [
    TiniBoxComponent,
    TiniBadgeComponent,
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
export class AppPageComponentsBadge extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniBadgeComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.Color, ReactCommonProps.Scale]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        contrasts: FLEX_ROW_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Badge"
        name="badge"
        path="components/badge"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Badge description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is <code>medium</code>, default size is
              <code>md</code>.
            </p>
          `,
          html`
            ${['0', '99+', '1000'].map(
              content => html`<tini-badge>${content}</tini-badge>`
            )}
          `,
          this.renderSectionOptions
        )}

        <!-- pill-circle -->
        ${renderSection(
          'pill-circle',
          'Pill and Circle',
          html`
            <p>
              Circle badges are best for values with less than or equals 2
              characters.
            </p>
          `,
          html`
            <div class="group">
              ${[
                ['0', 'primary'],
                ['99+', 'secondary'],
                ['1000', 'tertiary'],
              ].map(
                ([content, scheme]) =>
                  html`<tini-badge pill scheme=${scheme as any}
                    >${content}</tini-badge
                  >`
              )}
            </div>
            <div class="group" style="margin-top: 1rem;">
              ${[
                ['0', 'success'],
                ['99+', 'warning'],
                ['1000', 'danger'],
              ].map(
                ([content, scheme]) =>
                  html`<tini-badge circle scheme=${scheme as any}
                    >${content}</tini-badge
                  >`
              )}
            </div>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color => html`<tini-badge scheme=${color}>99+</tini-badge>`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient => html`<tini-badge scheme=${gradient}>99+</tini-badge>`,
          this.renderSectionOptions
        )}

        <!-- text colors -->
        ${renderFontColorsSection(
          ['medium', 'warning', 'gradient-danger'] as any,
          scheme =>
            html`<tini-badge scheme=${scheme} color="primary">99+</tini-badge>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-badge scale=${scale} scheme="primary">1000</tini-badge>`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-badge styleDeep=".root { background: darkmagenta }"
              >1000</tini-badge
            >
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
