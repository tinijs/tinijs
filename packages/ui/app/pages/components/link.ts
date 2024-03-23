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
import {TiniLinkComponent} from '@tinijs/ui/components/link';

import {
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
  BLOCK_STYLES,
  FLEX_COLUMN_STYLES,
  WIDE_SS_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-link',
  components: [
    TiniBoxComponent,
    TiniLinkComponent,
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
export class AppPageComponentsLink extends TiniComponent {
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
        [/* tini-box, */ TiniLinkComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.ColorButGradientsSupported]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        common: FLEX_COLUMN_STYLES,
        contrastBoxes: WIDE_SS_STYLES,
        fontSizes: BLOCK_STYLES,
        transforms: BLOCK_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Links"
        name="link"
        path="components/link"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Use link to navigate around.</div>

        <!-- default -->
        ${renderDefaultSection(
          null,
          html`<tini-link href="#">This is a default link!</tini-link>`,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-link href="#" color=${color}
              >Link with ${color} color</tini-link
            >`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-link href="#" color=${gradient}
              >Link with ${gradient} gradient</tini-link
            >`,
          this.renderSectionOptions
        )}

        <!-- fonts -->
        ${renderFontTypesSection(
          font =>
            html`<tini-link href="#" fontType=${font}
              >Link with ${font} font</tini-link
            >`,
          this.renderSectionOptions
        )}

        <!-- font sizes -->
        ${renderFontSizesSection(
          true,
          fontSize =>
            html`<tini-link href="#" fontSize=${fontSize}
              >${fontSize.replace('_', '.')}</tini-link
            >`,
          this.renderSectionOptions
        )}

        <!-- weights -->
        ${renderFontWeightsSection(
          weight =>
            html`<tini-link href="#" fontWeight=${weight}
              >Text with ${weight} weight</tini-link
            >`,
          this.renderSectionOptions
        )}

        <!-- transforms -->
        ${renderTextTransformsSection(
          transform =>
            html`<tini-link href="#" textTransform=${transform}
              >Text with ${transform} transform</tini-link
            >`,
          this.renderSectionOptions
        )}

        <!-- italic-underline -->
        ${renderItalicUnderlineSection(
          html`
            <tini-link href="#" italic>Link with italic style</tini-link>
            <tini-link href="#" italic color="gradient-primary" fontSize="2x"
              >Gradient link with italic style</tini-link
            >
            <tini-link href="#" underline
              >Link with underline decoration</tini-link
            >
            <tini-link href="#" underline color="gradient-primary" fontSize="2x"
              >Gradient link with underline decoration</tini-link
            >
          `,
          this.renderSectionOptions
        )}

        <!-- transforms -->
        ${renderTransformsSection(
          html`
            <tini-link
              fontSize="1_5x"
              style="
                display: inline-block;
                transform: rotate(-45deg);
              "
              >Transform me</tini-link
            >
            <tini-link
              style="
                display: inline-block;
                transform: translateX(300px) scale(5) skew(45deg, 10deg);
              "
              >Transform me</tini-link
            >
          `,
          this.renderSectionOptions
        )}

        <!-- filters -->
        ${renderFiltersSection(
          html`
            <div class="group">
              <tini-link color="primary" fontSize="1_5x">Original</tini-link>
              <tini-link
                color="primary"
                fontSize="1_5x"
                style="filter: opacity(50%)"
                >Filtered opacity(50%)</tini-link
              >
            </div>
            <div class="group">
              <tini-link color="gradient-disco-club" fontSize="1_5x"
                >Original</tini-link
              >
              <tini-link
                color="gradient-disco-club"
                fontSize="1_5x"
                style="filter: blur(2px)"
                >Filtered blur(2px)</tini-link
              >
            </div>
            <div class="group">
              <tini-link color="gradient-mello-yellow" fontSize="1_5x"
                >Original</tini-link
              >
              <tini-link
                color="gradient-mello-yellow"
                fontSize="1_5x"
                style="filter: grayscale(90%)"
                >Filtered grayscale(90%)</tini-link
              >
            </div>
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-link
              styleDeep="
    .root {
      position: relative;
      display: inline-block;
      font-size: 2rem;
      text-decoration: none !important;
      color: var(--color-primary);
    }
    .root::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: 0;
      left: 0;
      background: var(--color-primary);
      transition: transform 0.25s ease-out;
      transform: scaleX(0);
      transform-origin: bottom right;
    }
    .root:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  "
              >Custom style (hover me)</tini-link
            >
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
