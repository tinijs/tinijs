import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniHeadingComponent} from '@tinijs/ui/components/heading';
import {TiniBoxComponent} from '@tinijs/ui/components/box';

import {
  renderSection,
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderFontTypesSection,
  renderFontSizesSection,
  renderFontWeightsSection,
  renderTextTransformsSection,
  renderItalicUnderlineSection,
  renderTransformsSection,
  renderFiltersSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
  FLEX_ROW_STYLES,
  WIDE_SM_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-heading',
  components: [
    TiniBoxComponent,
    TiniHeadingComponent,
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
export class AppPageComponentsHeading extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.attrCasing([
      'font type',
      'font size',
      'font weight',
      'text transform',
    ]);

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniHeadingComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.ColorButGradientsSupported]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        contrasts: FLEX_COLUMN_STYLES,
        contrastBoxes: WIDE_SM_STYLES,
        fontSizes: {
          ...FLEX_ROW_STYLES,
          alignItems: 'center',
        },
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Heading"
        name="heading"
        path="components/heading"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Heading description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              The default level is <code>1</code>. The default color is
              <code>foreground</code>.
            </p>
          `,
          html`<tini-heading>This is a default heading</tini-heading>`,
          this.renderSectionOptions
        )}

        <!-- levels -->
        ${renderSection(
          'levels',
          'Levels',
          html`
            <p>Use different levels.</p>
            <p>
              IMPORTANT! Please <strong>DON'T use user input</strong> for the
              <code>level</code> attribute to avoid XSS attacks.
            </p>
          `,
          html`
            ${['1', '2', '3', '4', '5', '6'].map(
              level =>
                html`<tini-heading level=${level}
                  >Level ${level} (h${level})
                </tini-heading>`
            )}
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-heading level="3" color=${color}
              >Text with ${color} color</tini-heading
            >`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-heading level="3" color=${gradient}
              >Text with ${gradient} gradient</tini-heading
            >`,
          this.renderSectionOptions
        )}

        <!-- fonts -->
        ${renderFontTypesSection(
          font =>
            html`<tini-heading level="3" fontType=${font}
              >Text with ${font} font</tini-heading
            >`,
          this.renderSectionOptions
        )}

        <!-- font sizes -->
        ${renderFontSizesSection(
          true,
          fontSize =>
            html`<tini-heading level="3" fontSize=${fontSize}
              >${fontSize.replace('_', '.')}</tini-heading
            >`,
          this.renderSectionOptions
        )}

        <!-- weights -->
        ${renderFontWeightsSection(
          weight =>
            html`<tini-heading level="3" fontWeight=${weight}
              >Text with ${weight} weight</tini-heading
            >`,
          this.renderSectionOptions
        )}

        <!-- transforms -->
        ${renderTextTransformsSection(
          transform =>
            html`<tini-heading level="3" textTransform=${transform}
              >Text with ${transform} transform</tini-heading
            >`,
          this.renderSectionOptions
        )}

        <!-- italic and underline -->
        ${renderItalicUnderlineSection(
          html`
            <tini-heading level="3" italic>Text with italic style</tini-heading>
            <tini-heading
              level="3"
              italic
              color="gradient-primary"
              fontSize="2x"
              >Gradient text with italic style</tini-heading
            >
            <tini-heading level="3" underline
              >Text with underline decoration</tini-heading
            >
            <tini-heading
              level="3"
              underline
              color="gradient-primary"
              fontSize="2x"
              >Gradient text with underline decoration</tini-heading
            >
          `,
          this.renderSectionOptions
        )}

        <!-- transforms -->
        ${renderTransformsSection(
          html`
            <tini-heading
              level="3"
              style="transform: rotate(-45deg); display: inline-block"
              >Transform me</tini-heading
            >
            <tini-heading
              level="3"
              style="transform: translateX(300px) scale(3) skew(45deg, 10deg); display: inline-block"
              >Transform me</tini-heading
            >
          `,
          this.renderSectionOptions
        )}

        <!-- filters -->
        ${renderFiltersSection(
          html`
            <div class="group">
              <tini-heading
                style="display: inline-block"
                level="3"
                color="primary"
                fontSize="1_5x"
                >Original</tini-heading
              >
              <tini-heading
                level="3"
                color="primary"
                fontSize="1_5x"
                style="filter: opacity(50%); display: inline-block"
                >Filtered opacity(50%)</tini-heading
              >
            </div>
            <div class="group">
              <tini-heading
                style="display: inline-block"
                level="3"
                color="gradient-disco-club"
                fontSize="1_5x"
                >Original</tini-heading
              >
              <tini-heading
                level="3"
                color="gradient-disco-club"
                fontSize="1_5x"
                style="filter: blur(2px); display: inline-block"
                >Filtered blur(2px)</tini-heading
              >
            </div>
            <div class="group">
              <tini-heading
                style="display: inline-block"
                level="3"
                color="gradient-mello-yellow"
                fontSize="1_5x"
                >Original</tini-heading
              >
              <tini-heading
                level="3"
                color="gradient-mello-yellow"
                fontSize="1_5x"
                style="filter: grayscale(90%); display: inline-block"
                >Filtered grayscale(90%)</tini-heading
              >
            </div>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-heading
              level="3"
              styleDeep="
    .root {
      font-size: 2rem;
      color: darkmagenta;
      text-decoration: line-through;
    }
  "
              >Custom style</tini-heading
            >
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
