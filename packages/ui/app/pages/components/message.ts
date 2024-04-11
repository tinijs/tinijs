import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

// import {TiniBoxComponent} from '../../../.ui/components/box.js';
// import {TiniMessageComponent} from '../../../.ui/components/message.js';

import {
  renderDefaultSection,
  renderColorsSection,
  renderFontColorsSection,
  renderFontSizesSection,
  renderStyleDeepSection,
  type RenderSectionOptions,
} from '../../utils/varies.js';
import {ConsumerPlatforms} from '../../consts/main.js';
import {type CodeBuilder, ReactCommonProps} from '../../utils/code-builder.js';

import {AppComponentPageComponent} from '../../components/component-page.js';
import {
  AppSectionComponent,
  FLEX_COLUMN_STYLES,
} from '../../components/section.js';

@Page({
  name: 'app-page-components-message',
  components: [
    TiniBoxComponent,
    TiniMessageComponent,
    AppComponentPageComponent,
    AppSectionComponent,
  ],
})
export class AppPageComponentsMessage extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.attrCasing(['font size']);

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ TiniMessageComponent.defaultTagName],
        [
          /* scheme, */ ReactCommonProps.SchemeButColorsOnly,
          ReactCommonProps.Color,
          ReactCommonProps.FontSize,
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
      },
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Message"
        name="message"
        path="components/message"
        .partList=${this.PART_LIST}
      >
        <div slot="description">Message description.</div>

        <!-- default -->
        ${renderDefaultSection(
          html`
            <p>
              Default background is <code>none</code>, default color is the
              current <code>foreground</code>.
            </p>
          `,
          html`<tini-message>Here is a default message</tini-message>`,
          this.renderSectionOptions
        )}

        <!-- colors -->
        ${renderColorsSection(
          color =>
            html`<tini-message scheme=${color}
              >Message with ${color} background</tini-message
            >`,
          this.renderSectionOptions
        )}

        <!-- font colors -->
        ${renderFontColorsSection(
          ['medium', 'warning'] as any,
          scheme =>
            html`<tini-message scheme=${scheme as any} color="primary"
              >Message with ${scheme} scheme / primary text</tini-message
            >`,
          this.renderSectionOptions
        )}

        <!-- font sizes -->
        ${renderFontSizesSection(
          false,
          fontSize =>
            html`<tini-message fontSize=${fontSize} scheme="primary"
              >Message with ${fontSize} font size</tini-message
            >`,
          this.renderSectionOptions
        )}

        <!-- styleDeep -->
        ${renderStyleDeepSection(
          html`
            <tini-message
              styleDeep="
    .root {
      border: none;
      border-radius: 0;
      background: darkmagenta;
      color: white;
    }
  "
              >Custom message</tini-message
            >
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }
}
