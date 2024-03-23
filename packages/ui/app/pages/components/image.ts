import {html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniBoxComponent} from '@tinijs/ui/components/box';
import {TiniImageComponent} from '@tinijs/ui/components/image';

import {
  renderSection,
  renderDefaultSection,
  renderBoxShadowsSection,
  RenderSectionOptions,
} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {
  AppSectionComponent,
  FLEX_ROW_GAP2X_STYLES,
} from '../../components/section';

@Page({
  name: 'app-page-components-image',
  components: [
    TiniBoxComponent,
    TiniImageComponent,
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
export class AppPageComponentsImage extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder => builder,
  };

  private readonly SRC =
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80';

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
      styleRecord: {
        borders: FLEX_ROW_GAP2X_STYLES,
        shadows: FLEX_ROW_GAP2X_STYLES,
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Image"
        name="image"
        path="components/image"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Image description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`<p>
            Accept the same attributes as the <code>img</code> element. Default
            border radius is <code>radius</code>.
          </p>`,
          html` <tini-image src=${this.SRC} width="500"></tini-image> `,
          this.renderSectionOptions
        )}

        <!-- fluid -->
        ${renderSection(
          'fluid',
          'Fluid',
          html`<p>100% width image.</p>`,
          html` <tini-image fluid src=${this.SRC}></tini-image> `,
          this.renderSectionOptions
        )}

        <!-- sources -->
        ${renderSection(
          'sources',
          'Sources',
          html`<p>With multiple sources.</p>`,
          html`
            <tini-image
              src=${this.SRC}
              width="500"
              height="500"
              .sources=${[
                {srcset: this.SRC, type: 'image/png'},
                {srcset: this.SRC, type: 'image/jpeg'},
              ]}
            ></tini-image>
          `,
          this.renderSectionOptions
        )}

        <!-- borders -->
        ${renderSection(
          'borders',
          'Borders',
          html`
            <p>
              Default style is <code>solid</code>, default color is
              <code>medium</code>, default size is <code>border</code>, default
              border radius is <code>radius</code>.
            </p>
          `,
          html`
            ${[
              ['solid'],
              ['primary'],
              ['big'],
              ['massive dashed primary', 'max'],
            ].map(
              ([border, radius]) =>
                html`<tini-image
                  src=${this.SRC}
                  width="200"
                  border=${border}
                  borderRadius=${ifDefined(radius as any)}
                ></tini-image>`
            )}
          `,
          this.renderSectionOptions
        )}

        <!-- box shadows -->
        ${renderBoxShadowsSection(
          shadow =>
            html`<tini-image
              src=${this.SRC}
              width="200"
              shadow=${shadow}
            ></tini-image>`,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
