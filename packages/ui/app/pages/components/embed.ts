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
import {TiniEmbedComponent} from '@tinijs/ui/components/embed';

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
  name: 'app-page-components-embed',
  components: [
    TiniBoxComponent,
    TiniEmbedComponent,
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
export class AppPageComponentsEmbed extends TiniComponent {
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
        titleText="Embed"
        name="embed"
        path="components/embed"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Embed description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html` <p>Default ratio is <code>16:9</code>.</p> `,
          html`
            <tini-embed>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ?si=pMUWQVk63DgVToPe"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </tini-embed>
          `,
          this.renderSectionOptions
        )}

        <!-- 4:3 -->
        ${renderSection(
          'ratio-4-3',
          '4:3',
          html`<p>
            You can pass the value of <code>75%</code> or <code>4:3</code> or
            <code>4/3</code> or <code>4x3</code>.
          </p>`,
          html`
            <tini-embed ratio="4:3">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_FoVCBMkUw0?si=80o2FMsDB7UuqMIW"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </tini-embed>
          `,
          this.renderSectionOptions
        )}

        <!-- 1:1 -->
        ${renderSection(
          'ratio-1-1',
          '1:1',
          html`<p>
            You can pass the value of <code>100%</code> or <code>1:1</code> or
            <code>1/1</code> or <code>1x1</code>.
          </p>`,
          html`
            <tini-embed ratio="1/1">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/EScLmWJs82I?si=zD0cQOJAzBmKxlOk"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </tini-embed>
          `,
          this.renderSectionOptions
        )}

        <!-- 9:16 -->
        ${renderSection(
          'ratio-9-16',
          '9:16',
          html`<p>
            You can pass the value of <code>178%</code> or <code>9:16</code> or
            <code>9/16</code> or <code>9x16</code>.
          </p>`,
          html`
            <tini-embed ratio="9x16" style="width: 320px">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1UJpFahphko?si=thUjX5G1SBRVgO4f"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </tini-embed>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
