import {html, nothing} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';
import {TiniIconComponent, TiniBoxComponent} from '@ui';

import {ConsumerPlatforms} from '../../consts/main.js';
import {CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';
import {
  renderDefaultSection,
  renderColorsSection,
  renderGradientsSection,
  renderScalesSection,
  renderTransformsSection,
  renderFiltersSection,
  renderStyleDeepSection,
  RenderSectionOptions,
} from '../../utils/varies.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {
  AppSectionComponent,
  FLEX_ROW_STYLES,
} from '../../components/section.js';

@Page({
  name: 'app-page-components-icon',
  components: [
    TiniBoxComponent,
    TiniIconComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsIcon extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly SRC =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRDb2xvciIgY2xhc3M9ImJpIGJpLWhlYXJ0LWZpbGwiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNOCAxLjMxNEMxMi40MzgtMy4yNDggMjMuNTM0IDQuNzM1IDggMTUtNy41MzQgNC43MzYgMy41NjItMy4yNDggOCAxLjMxNHoiLz48L3N2Zz4=';

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.customModifier(code =>
      code.replace(/src="([\s\S]*?)"/g, 'src="URI/URL"')
    );

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniIconComponent.defaultTagName],
        [/* scheme, */ ReactCommonProps.Scale]
      ),
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      codeBuildContext: undefined,
      codePostFormat: true,
      styleRecord: {
        contrasts: FLEX_ROW_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Icons"
        name="icon"
        path="components/icon"
        .partList=${this.PART_LIST}
      >
        <div slot="description">A generic icon component.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default color is the <strong>original</strong> color, and default
              size is <code>md</code>.
            </p>
          `,
          html`<tini-icon .src=${this.SRC}></tini-icon>`,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-icon .src=${this.SRC} scheme=${color}></tini-icon>`,
          this.renderSectionOptions
        )}

        <!-- gradients -->
        ${renderGradientsSection(
          gradient =>
            html`<tini-icon .src=${this.SRC} scheme=${gradient}></tini-icon>`,
          this.renderSectionOptions
        )}

        <!-- scales -->
        ${renderScalesSection(
          scale =>
            html`<tini-icon scale=${scale} .src=${this.SRC}></tini-icon>`,
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
              .src=${this.SRC}
            ></tini-icon>
            <tini-icon
              style="
                display: inline-block;
                transform: scale(2.5) translate(30px, 15px);
              "
              .src=${this.SRC}
            ></tini-icon>
            <tini-icon
              style="
                display: inline-block;
                transform: translate(170px, 20px) scale(3.5) skew(20deg, 10deg);
              "
              .src=${this.SRC}
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
                .src=${this.SRC}
              ></tini-icon>
              <tini-icon
                scheme="primary"
                scale="xxl"
                style="filter: opacity(50%)"
                .src=${this.SRC}
              ></tini-icon>
            </div>
            <div class="group">
              <tini-icon
                scheme="gradient-disco-club"
                scale="xxl"
                .src=${this.SRC}
              ></tini-icon>
              <tini-icon
                scheme="gradient-disco-club"
                scale="xxl"
                style="filter: blur(2px)"
                .src=${this.SRC}
              ></tini-icon>
            </div>
            <div class="group">
              <tini-icon
                scheme="gradient-mello-yellow"
                scale="xxl"
                .src=${this.SRC}
              ></tini-icon>
              <tini-icon
                scheme="gradient-mello-yellow"
                scale="xxl"
                style="filter: grayscale(90%)"
                .src=${this.SRC}
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
              .src=${this.SRC}
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
      </app-component-page>
    `;
  }
}
