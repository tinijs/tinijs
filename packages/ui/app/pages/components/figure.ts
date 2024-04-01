import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';
import {TiniBoxComponent} from '@tinijs/ui-app/components/box.js';
import {TiniImageComponent} from '@tinijs/ui-app/components/image.js';
import {TiniCodeComponent} from '@tinijs/ui-app/components/code.js';
import {TiniFigureComponent} from '@tinijs/ui-app/components/figure.js';

import {renderSection, RenderSectionOptions} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {CodeBuilder} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {AppSectionComponent} from '../../components/section.js';

@Page({
  name: 'app-page-components-figure',
  components: [
    TiniBoxComponent,
    TiniImageComponent,
    TiniCodeComponent,
    TiniFigureComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsFigure extends TiniComponent {
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
        titleText="Figure"
        name="figure"
        path="components/figure"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Figure description.</div>

        <!-- images -->
        ${renderSection(
          'images',
          'Images',
          html` <p>Images.</p> `,
          html`
            <tini-figure>
              <tini-image
                fluid
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80"
              ></tini-image>
              <span slot="caption-bottom">An caption for the above image.</span>
            </tini-figure>
          `,
          this.renderSectionOptions
        )}

        <!-- codes -->
        ${renderSection(
          'codes',
          'Codes',
          html` <p>Codes.</p> `,
          html`
            <tini-figure>
              <p slot="caption-top">
                Get browser details using <code>navigator</code>.
              </p>
              <tini-code
                language="js"
                content=${`function NavigatorExample() {
  var txt;
  txt = "Browser CodeName: " + navigator.appCodeName + "; ";
  txt+= "Browser Name: " + navigator.appName + "; ";
  txt+= "Browser Version: " + navigator.appVersion  + "; ";
  txt+= "Cookies Enabled: " + navigator.cookieEnabled  + "; ";
  txt+= "Platform: " + navigator.platform  + "; ";
  txt+= "User-agent header: " + navigator.userAgent  + "; ";
  console.log("NavigatorExample", txt);
}`}
              ></tini-code>
            </tini-figure>
          `,
          this.renderSectionOptions
        )}

        <!-- quotations -->
        ${renderSection(
          'quotations',
          'Quotations',
          html` <p>Quotations.</p> `,
          html`
            <tini-figure>
              <strong slot="caption-top">Edsger Dijkstra:</strong>
              <blockquote>
                If debugging is the process of removing software bugs, then
                programming must be the process of putting them in.
              </blockquote>
            </tini-figure>
          `,
          this.renderSectionOptions
        )}

        <!-- poems -->
        ${renderSection(
          'poems',
          'Poems',
          html` <p>Poems.</p> `,
          html`
            <tini-figure>
              <p style="white-space: pre">
                Bid me discourse, I will enchant thine ear, Or like a fairy trip
                upon the green, Or, like a nymph, with long dishevelled hair,
                Dance on the sands, and yet no footing seen: Love is a spirit
                all compact of fire, Not gross to sink, but light, and will
                aspire.
              </p>
              <span slot="caption-bottom">
                <cite>Venus and Adonis</cite>, by William Shakespeare
              </span>
            </tini-figure>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
