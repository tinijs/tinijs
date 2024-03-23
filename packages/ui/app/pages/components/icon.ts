import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniIconComponent} from '@tinijs/ui/components/icon';

import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder, ReactCommonProps} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent} from '../../components/section';
import {AppIconPageContentComponent} from '../../components/icon-page-content';

const iconSRC =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRDb2xvciIgY2xhc3M9ImJpIGJpLWhlYXJ0LWZpbGwiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNOCAxLjMxNEMxMi40MzgtMy4yNDggMjMuNTM0IDQuNzM1IDggMTUtNy41MzQgNC43MzYgMy41NjItMy4yNDggOCAxLjMxNHoiLz48L3N2Zz4=';

@Page({
  name: 'app-page-components-icon',
  components: [
    TiniIconComponent,
    AppComponentPageComponent,
    AppSectionComponent,
    AppIconPageContentComponent,
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
export class AppPageComponentsIcon extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

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

  protected render() {
    return html`
      <app-component-page
        titleText="Icons"
        name="icon"
        path="components/icon"
        .partList=${this.PART_LIST}
      >
        <div slot="description">A generic icon component.</div>

        <app-icon-page-content
          .src=${iconSRC}
          .preprocessCode=${this.PREPROCESS_CODE}
          .codeBuilders=${this.CODE_BUILDERS}
        ></app-icon-page-content>
      </app-component-page>
    `;
  }
}
