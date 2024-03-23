import {html, nothing} from 'lit';
import {Component, TiniComponent, Input, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniBoxComponent} from '@tinijs/ui/components/box';
import {TiniIconComponent} from '@tinijs/ui/components/icon';

import {
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderScalesSection,
  renderTransformsSection,
  renderFiltersSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../helpers/varies';
import {AppSectionComponent, FLEX_ROW_STYLES} from './section';

@Component({
  components: [TiniBoxComponent, TiniIconComponent],
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
export class AppIconPageContentComponent extends TiniComponent {
  static readonly defaultTagName = 'app-icon-page-content';

  @Input({type: String}) src!: string;
  @Input({type: Boolean}) noVariants = false;
  @Input({type: Object}) preprocessCode?: AppSectionComponent['preprocessCode'];
  @Input({type: Object}) codeBuilders?: AppSectionComponent['codeBuilders'];
  @Input({type: Object})
  codeBuildContext?: AppSectionComponent['codeBuildContext'];

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.preprocessCode,
      codeBuilders: this.codeBuilders,
      codeBuildContext: this.codeBuildContext,
      codePostFormat: true,
      styleRecord: {
        contrasts: FLEX_ROW_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <!-- default -->
      ${renderDefaultSection(
        html`
          <p>
            Default color is the <strong>original</strong> color, and default
            size is <code>md</code>.
          </p>
        `,
        html`<tini-icon .src=${this.src}></tini-icon>`,
        this.renderSectionOptions
      )}

      <!-- variants -->
      ${this.noVariants
        ? nothing
        : html`
            <!-- colors -->
            ${renderColorsSection(
              color =>
                html`<tini-icon .src=${this.src} scheme=${color}></tini-icon>`,
              this.renderSectionOptions
            )}

            <!-- gradients -->
            ${renderGradientsSection(
              gradient =>
                html`<tini-icon
                  .src=${this.src}
                  scheme=${gradient}
                ></tini-icon>`,
              this.renderSectionOptions
            )}
          `}

      <!-- scales -->
      ${renderScalesSection(
        scale => html`<tini-icon scale=${scale} .src=${this.src}></tini-icon>`,
        this.renderSectionOptions
      )}

      <!-- transforms -->
      ${renderTransformsSection(
        html`
          <tini-icon
            style="
              display: inline-block;
              transform: rotate(-45deg);
            "
            .src=${this.src}
          ></tini-icon>
          <tini-icon
            style="
              display: inline-block;
              transform: scale(2.5) translate(30px, 15px);
            "
            .src=${this.src}
          ></tini-icon>
          <tini-icon
            style="
              display: inline-block;
              transform: translate(170px, 20px) scale(3.5) skew(20deg, 10deg);
            "
            .src=${this.src}
          ></tini-icon>
        `,
        this.renderSectionOptions
      )}

      <!-- filters -->
      ${renderFiltersSection(
        html`
          <div class="group">
            <tini-icon
              scheme="primary"
              scale="xxl"
              .src=${this.src}
            ></tini-icon>
            <tini-icon
              scheme="primary"
              scale="xxl"
              style="filter: opacity(50%)"
              .src=${this.src}
            ></tini-icon>
          </div>
          <div class="group">
            <tini-icon
              scheme="gradient-disco-club"
              scale="xxl"
              .src=${this.src}
            ></tini-icon>
            <tini-icon
              scheme="gradient-disco-club"
              scale="xxl"
              style="filter: blur(2px)"
              .src=${this.src}
            ></tini-icon>
          </div>
          <div class="group">
            <tini-icon
              scheme="gradient-mello-yellow"
              scale="xxl"
              .src=${this.src}
            ></tini-icon>
            <tini-icon
              scheme="gradient-mello-yellow"
              scale="xxl"
              style="filter: grayscale(90%)"
              .src=${this.src}
            ></tini-icon>
          </div>
        `,
        this.renderSectionOptions
      )}

      <!-- styleDeep -->
      ${renderStyleDeepSection(
        html`
          <tini-icon
            scheme="gradient-ooey-gooey"
            .src=${this.src}
            styleDeep="
    .root {
      --icon-width: 10rem;
      --icon-height: 10rem;
    }
  "
          ></tini-icon>
        `,
        this.renderSectionOptions
      )}
    `;
  }
}
