import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

import {TiniCodeComponent} from '@tinijs/ui-app/components/code.js';

import {renderSection, type RenderSectionOptions} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {type CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {AppSectionComponent} from '../../components/section.js';

@Page({
  name: 'app-page-components-code',
  components: [
    TiniCodeComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsCode extends TiniComponent {
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
        titleText="Code"
        name="code"
        path="components/code"
        .component=${TiniCodeComponent}
        .partList=${this.PART_LIST}
      >
        <div slot="description">Code description.</div>

        <!-- setup -->
        <app-section noCodeSample>
          <h2 slot="title">Setup</h2>
          <div slot="content" class="setup">
            <p>
              To use the <code>tini-code</code> component, you need to setup an
              engine first. Here are two common code highlight engines, but you
              can use your own as well.
            </p>

            <p><strong>PrismJS</strong></p>
            <p>Install: <code>npm i prismjs</code></p>

            <p><strong>Highlight.js</strong></p>
            <p>Install: <code>npm i highlight.js</code></p>
          </div>
        </app-section>

        <!-- usage -->
        ${renderSection(
          'usage',
          'Usage',
          html` <p>Usage.</p> `,
          html`
            <p><strong>HTML</strong></p>
            <tini-code
              language="html"
              content=${`<!DOCTYPE html>
<html>
<body>
  <h1>This is heading 1</h1>
  <p>This is a paragraph.</p>
  <a href="https://www.example.com">This is a link</a>
  <img src="example.jpg" alt="Example.com" width="104" height="142">
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>
</body>
</html>
`}
            ></tini-code>

            <p><strong>Javascript</strong></p>
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

            <p><strong>CSS</strong></p>
            <tini-code
              language="js"
              content=${`pre code.highlight {
  display: block;
  overflow-x: auto;
  padding: 1em;
  font-size: 0.9rem;
}

code.highlight {
  padding: 3px 5px;
}

.highlight {
  color: #adbac7;
  background: #22272e;
}`}
            ></tini-code>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
