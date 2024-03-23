import {html, css} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniBoxComponent} from '@tinijs/ui/components/box';
import {TiniButtonComponent} from '@tinijs/ui/components/button';
import {IconChevronLeftComponent} from '@tinijs/bootstrap-icons/chevron-left';
import {IconChevronRightComponent} from '@tinijs/bootstrap-icons/chevron-right';
import {IconHeartFillComponent} from '@tinijs/bootstrap-icons/heart-fill';

import {
  renderSection,
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderScalesSection,
  renderFontColorsSection,
  renderFontSizesSection,
  renderTransformsSection,
  renderFiltersSection,
  renderBoxShadowsSection,
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
  FLEX_ROW_GAP2X_STYLES,
  WIDE_XS_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-button',
  components: [
    IconChevronLeftComponent,
    IconChevronRightComponent,
    IconHeartFillComponent,
    TiniBoxComponent,
    TiniButtonComponent,
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
export class AppPageComponentsButton extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.attrCasing(['font size', 'justify content']);

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniButtonComponent.defaultTagName],
        [
          /* scheme, */ ReactCommonProps.Scale,
          ReactCommonProps.Color,
          ReactCommonProps.FontSize,
          ReactCommonProps.JustifyContent,
        ]
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
        scales: BLOCK_STYLES,
        transforms: BLOCK_STYLES,
        shadows: FLEX_ROW_GAP2X_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Buttons"
        name="button"
        path="components/button"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Use buttons to trigger actions.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is <code>medium</code>, default size is
              <code>md</code>, default mode is <code>filled</code>.
            </p>
          `,
          html`
            <tini-button>Filled</tini-button>
            <tini-button mode="outline">Outline</tini-button>
            <tini-button mode="clear">Clear</tini-button>
          `,
          this.renderSectionOptions
        )}

        <!-- block -->
        ${renderSection(
          'block',
          'Block',
          null,
          html`
            <tini-button block>Filled</tini-button>
            <tini-button block mode="outline">Outline</tini-button>
            <tini-button block mode="clear">Clear</tini-button>
          `,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-button scheme=${color}>Button ${color}</tini-button>`,
          this.renderSectionOptions
        )}

        <!-- outline colors -->
        ${renderColorsSection(
          color =>
            html`<tini-button mode="outline" scheme=${color}
              >Button ${color}</tini-button
            >`,
          {
            ...this.renderSectionOptions,
            className: 'outline-colors',
            title: 'Outline (colors)',
          }
        )}

        <!-- bordered -->
        ${renderSection(
          'bordered',
          'Bordered',
          html`<p>
            Similar to <strong>outline</strong>, but with outside border, for
            colors only and supports the <code>border</code> property.
          </p>`,
          html`
            <tini-button mode="bordered" scheme="primary"
              >Bordered button</tini-button
            >
            <tini-button mode="bordered" scheme="primary" border="dotted"
              >Dotted border</tini-button
            >
            <tini-button
              mode="bordered"
              scheme="primary"
              border="big dashed"
              borderRadius="max"
              >Big dashed border, max radius</tini-button
            >
            <tini-button
              mode="bordered"
              scheme="primary"
              border="massive solid success"
              borderRadius="zero"
              >Massive solid success border, zero radius</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- Clear colors -->
        ${renderColorsSection(
          color =>
            html`<tini-button mode="clear" scheme=${color}
              >Button ${color}</tini-button
            >`,
          {
            ...this.renderSectionOptions,
            className: 'clear-colors',
            title: 'Clear',
          }
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-button scheme=${gradient}
              >Button ${gradient}</tini-button
            >`,
          this.renderSectionOptions
        )}

        <!-- Outline gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-button mode="outline" scheme=${gradient}
              >Button ${gradient}</tini-button
            >`,
          {
            ...this.renderSectionOptions,
            className: 'outline-gradients',
            title: 'Outline (gradients)',
          }
        )}

        <!-- disabled -->
        ${renderSection(
          'disabled',
          'Disabled',
          null,
          html`
            <tini-button disabled scheme="primary">Filled button</tini-button>
            <tini-button disabled mode="outline" scheme="primary"
              >Outline button</tini-button
            >
            <tini-button disabled mode="clear" scheme="primary"
              >Clear button</tini-button
            >
            <tini-button disabled scheme="gradient-primary"
              >Gradient button</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- text colors -->
        ${renderFontColorsSection(
          ['primary'] as any,
          scheme => html`
            <tini-button scheme=${scheme} color="warning"
              >Filled button with scheme=${scheme} & color=warning</tini-button
            >
            <tini-button
              scheme=${`gradient-${scheme}`}
              mode="outline"
              color="foreground"
              borderRadius="big"
              style="--button-border-size: 3px;"
              >Outline button with scheme=gradient-${scheme} &
              color=foreground</tini-button
            >
            <tini-button
              scheme=${scheme}
              mode="bordered"
              border="massive"
              borderRadius="zero"
              color="foreground"
              >Bordered button with scheme=${scheme} &
              color=foreground</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-button scale=${scale} scheme="primary"
              >${scale}</tini-button
            > `,
          this.renderSectionOptions
        )}

        <!-- font sizes -->
        ${renderFontSizesSection(
          false,
          fontSize =>
            html`<tini-button scheme="primary" fontSize=${fontSize}
              >Medium button with ${fontSize} font size</tini-button
            >`,
          this.renderSectionOptions
        )}

        <!-- icons and justifications -->
        ${renderSection(
          'icons-and-justifications',
          'Icons and Justifications',
          null,
          html`
            <tini-button scheme="primary">
              <icon-heart-fill
                scale="ss"
                scheme="primary-contrast"
              ></icon-heart-fill>
              <span>Left</span>
            </tini-button>

            <tini-button scheme="primary">
              <span>Right</span>
              <icon-heart-fill
                scale="ss"
                scheme="primary-contrast"
              ></icon-heart-fill>
            </tini-button>

            <tini-button scheme="primary">
              <icon-heart-fill
                scale="ss"
                scheme="primary-contrast"
              ></icon-heart-fill>
              <span>Left Right</span>
              <icon-heart-fill
                scale="ss"
                scheme="primary-contrast"
              ></icon-heart-fill>
            </tini-button>

            <tini-button justifyContent="space-between" scheme="primary">
              <icon-heart-fill
                scale="ss"
                scheme="primary-contrast"
              ></icon-heart-fill>
              <span>Far Left</span>
            </tini-button>

            <tini-button justifyContent="space-between" scheme="primary">
              <span>Far Right</span>
              <icon-heart-fill
                scale="ss"
                scheme="primary-contrast"
              ></icon-heart-fill>
            </tini-button>

            <tini-button justifyContent="space-between" scheme="primary">
              <icon-chevron-left
                scale="ss"
                scheme="primary-contrast"
              ></icon-chevron-left>
              <span>Far Left Right</span>
              <icon-chevron-right
                scale="ss"
                scheme="primary-contrast"
              ></icon-chevron-right>
            </tini-button>

            <tini-button justifyContent="space-between" scheme="primary">
              <div class="content-group">
                <icon-heart-fill
                  scale="ss"
                  scheme="primary-contrast"
                ></icon-heart-fill>
                <span>Content Group</span>
              </div>
              <icon-chevron-right
                scale="ss"
                scheme="primary-contrast"
              ></icon-chevron-right>
            </tini-button>
          `,
          this.renderSectionOptions
        )}

        <!-- pseudo-classes -->
        ${renderSection(
          'pseudo-classes',
          'Pseudo Classes',
          html`<p>Change pseudo-classes behavior.</p>`,
          html`
            <tini-button scheme="primary" hover:scheme="primary-shade"
              >primary <=hover=> primary-shade</tini-button
            >
            <tini-button scheme="secondary" hover:scheme="warning"
              >secondary <=hover=> warning</tini-button
            >
            <tini-button scheme="tertiary" hover:scheme="gradient-tertiary"
              >tertiary <=hover=> gradient-tertiary</tini-button
            >
            <tini-button scheme="gradient-success" hover:scheme="success"
              >gradient-success <=hover=> success</tini-button
            >
            <tini-button
              scheme="gradient-warning"
              hover:scheme="gradient-danger"
              >gradient-warning <=hover=> gradient-danger</tini-button
            >
            <tini-button
              scheme="gradient-mello-yellow"
              styleDeep="
    .root { filter: grayscale(90%) }
    .root:hover { filter: none; opacity: 1 }
    .root:active { opacity: 0.8 }
  "
              >Filter grayscale(90%) <=hover=> No filter</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- transforms -->
        ${renderTransformsSection(
          html`
            <tini-button
              style="
                display: inline-block;
                transform: rotate(-45deg);
              "
              >Transform me</tini-button
            >
            <tini-button
              style="
                display: inline-block;
                transform: translateX(300px) scale(2) skew(45deg, 10deg);
              "
              >Transform me</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- filters -->
        ${renderFiltersSection(
          html`
            <div class="group">
              <tini-button scheme="primary">Original</tini-button>
              <tini-button scheme="primary" style="filter: opacity(50%)"
                >Filtered opacity(50%)</tini-button
              >
            </div>
            <div class="group">
              <tini-button scheme="gradient-disco-club">Original</tini-button>
              <tini-button
                scheme="gradient-disco-club"
                style="filter: blur(1px)"
                >Filtered blur(1px)</tini-button
              >
            </div>
            <div class="group">
              <tini-button scheme="gradient-mello-yellow">Original</tini-button>
              <tini-button
                scheme="gradient-mello-yellow"
                style="filter: grayscale(90%)"
                >Filtered grayscale(90%)</tini-button
              >
            </div>
          `,
          this.renderSectionOptions
        )}

        <!-- box shadows -->
        ${renderBoxShadowsSection(
          shadow =>
            html`<tini-button scheme="background-tint" .shadow=${shadow}
              >Shadow ${shadow}</tini-button
            >`,
          this.renderSectionOptions
        )}

        <!-- overrides -->
        ${renderSection(
          'overrides',
          'Overrides',
          html`<p>
            Refer different values for different themes (switch to
            <strong>Bootstrap Dark</strong> to see the differences). Note that
            you must implicitly specify the attributes to be able to override
            them.
          </p>`,
          html`
            <tini-button
              scheme="primary"
              mode="filled"
              borderRadius="base"
              .refers=${{
                'bootstrap/dark': {
                  mode: 'outline',
                  borderRadius: 'max',
                },
              }}
              >Filled, base radius <=> Outlined, max radius</tini-button
            >
            <tini-button
              scheme="success"
              fontSize="1x"
              .refers=${{
                'bootstrap/dark': {
                  scheme: 'danger',
                  fontSize: '1_5x',
                },
              }}
              >Success, 1x font <=> Danger, 1_5x font</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-button
              styleDeep="
    .root { background: pink; color: black }
    .root:hover { background: darkmagenta; color: white }
  "
              >Custom button</tini-button
            >
          `,
          this.renderSectionOptions
        )}

        <!-- global options -->
        <app-section noCodeSample>
          <h2 slot="title">Global options</h2>
          <div slot="content" class="global-options">
            <p>Shared global options:</p>
            <ul>
              <li>
                <code>referGradientScheme</code>: Use gradients in place of
                colors.
              </li>
            </ul>

            <p>
              Per-component global options, via the
              <code>${TiniButtonComponent.componentName}</code> key:
            </p>
            <ul>
              <li>
                <code>referGradientSchemeOnHover</code>: Use gradients for
                hover.
              </li>
            </ul>
          </div>
        </app-section>
      </app-component-page>
    `;
  }

  static styles = css`
    .icons-and-justifications [slot='code'] {
      tini-button::part(root) {
        width: var(--wide-xs);
      }
    }
  `;
}
