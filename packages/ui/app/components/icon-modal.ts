import {html, css, nothing} from 'lit';
import {ref, Ref, createRef} from 'lit/directives/ref.js';
import {Component, TiniComponent, Input, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';

import {ConsumerPlatforms, IconsImportMethods} from '../consts/main';
import {CodeBuilder, ReactCommonProps} from '../helpers/code-builder';
import {mainStore} from '../stores/main';

import {AppSectionComponent} from './section';
import {AppTabsComponent, TabItem} from './tabs';
import {AppCodeComponent} from './code';
import {AppModalComponent} from './modal';
import {AppIconPageContentComponent} from './icon-page-content';

export type IconDef = [string, string];

@Component({
  components: [
    AppSectionComponent,
    AppTabsComponent,
    AppCodeComponent,
    AppModalComponent,
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
export class AppIconModalComponent extends TiniComponent {
  static readonly defaultTagName = 'app-icon-modal';

  private readonly ICONS_IMPORT_TAB_ITEMS: TabItem[] = [
    {name: IconsImportMethods.Tini},
    {name: IconsImportMethods.Others},
    {name: IconsImportMethods.Source},
  ];

  private readonly PREPROCESS_CODE: CodeBuilder = builder =>
    builder.customModifier((code, context) =>
      (!context
        ? code
        : code.replace(/tini-icon/g, (context as any).nameTag)
      ).replace(/src="([\s\S]*?)"/g, '')
    );

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder =>
      builder.reactConverter(
        [/* tini-box, */ (builder.context as any).nameTag],
        [/* scheme, */ ReactCommonProps.Scale]
      ),
  };

  @Input({type: String}) declare packageName?: string;
  @Input({type: String}) declare packageVersion?: string;
  @Input({type: Boolean}) declare noVariants?: boolean;
  @Input({type: Object}) declare iconDef?: IconDef;

  private modalRef: Ref<AppModalComponent> = createRef();
  private contentValues: Record<string, string> = {};

  private extractContentValues(def: IconDef) {
    const [fileName, base64Content] = def;
    const nameArr = fileName.split('.');
    const ext = nameArr.pop() as string;
    const iconName = nameArr.join('.').replace(/\./g, '-');
    const nameCapitalized = iconName
      .split('-')
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join('');
    const nameTag = `icon-${iconName}`;
    const nameClass = `Icon${nameCapitalized}Component`;
    const packName = this.packageName || '@tinijs/ui-icons';
    const reactTagName = nameClass.replace('Component', '');
    const mimeType = {
      svg: 'image/svg+xml',
      webp: 'image/webp',
      png: 'image/png',
      jpg: 'image/jpeg',
    }[ext];

    const iconSRC = `data:${mimeType};base64,${base64Content}`;

    const tiniJSCode = `import {Component} from '@tinijs/core';

// 1. import the component
import {${nameClass}} from '${packName}/${iconName}';

@Component({
  components: [
    ${nameClass}, // 2. register the component
  ]
});
export class MyComponent extends TiniComponent {}`;

    const othersCode = `import {registerComponents} from '@tinijs/core';

// 1. import the component
import {${nameClass}} from '${packName}/${iconName}';

registerComponents([
  ${nameClass}, // 2. register the component
]);
`;
    const othersCodeReact = `import {registerComponents} from '@tinijs/core';

// 1. import the constructor and the React wrapper
import {${nameClass}, ${reactTagName}} from '${packName}/${iconName}.react';

registerComponents([
  ${nameClass}, // 2. register the component
]);
`;

    const dataURICode = iconSRC;
    const svgCode = ext !== 'svg' ? null : window.atob(base64Content);

    return {
      iconSRC,
      tiniJSCode,
      othersCode,
      othersCodeReact,
      dataURICode,
      svgCode,
      names: {
        nameTag,
      },
    };
  }

  onChanges() {
    this.contentValues = !this.iconDef
      ? ({} as any)
      : this.extractContentValues(this.iconDef);
  }

  show() {
    this.modalRef.value?.show();
  }

  private hideModal() {
    this.modalRef.value?.hide();
    this.iconDef = undefined;
  }

  protected render() {
    const {
      iconSRC,
      tiniJSCode,
      othersCode,
      othersCodeReact,
      dataURICode,
      svgCode,
      names,
    } = this.contentValues;
    return html`
      <app-modal
        ${ref(this.modalRef)}
        .titleText=${this.iconDef?.[0]}
        .backdropClosed=${true}
        @no=${this.hideModal}
      >
        ${!this.iconDef
          ? nothing
          : html`
              <div class="modal-body">
                <app-section noCodeSample style="margin-top: 1rem;">
                  <h2 slot="title" style="margin-top: 0;">Imports</h2>
                  <div slot="content" class="imports">
                    <p>
                      After installing the respective icons pack, you can import
                      and use the component, data URI, SVG code or URL anywhere
                      in your project:
                    </p>

                    <app-tabs
                      .tabItems=${this.ICONS_IMPORT_TAB_ITEMS}
                      .activeName=${mainStore.referIconsImport}
                      @change=${({detail}: CustomEvent<{name: string}>) =>
                        mainStore.commit('referIconsImport', detail.name)}
                    >
                      <div data-tab=${IconsImportMethods.Tini}>
                        <p>For the Tini framework.</p>
                        <app-code .code=${tiniJSCode}></app-code>
                      </div>

                      <div data-tab=${IconsImportMethods.Others}>
                        <p><strong>Vue, Angular, Svelte, ...</strong></p>
                        <app-code .code=${othersCode}></app-code>
                        <p><strong>React</strong></p>
                        <p>
                          Enums for attribute values (<code>Colors</code>,
                          <code>Scales</code>, ...) can be imported from the
                          <code>tinijs</code> package also. Other enums are
                          imported from the same endpoint as the constructor.
                        </p>
                        <app-code .code=${othersCodeReact}></app-code>
                      </div>

                      <div data-tab=${IconsImportMethods.Source}>
                        <p>Base64 data URI</p>
                        <app-code .code=${dataURICode}></app-code>

                        ${!svgCode
                          ? nothing
                          : html`
                              <p>SVG code</p>
                              <app-code .code=${svgCode}></app-code>
                            `}
                      </div>
                    </app-tabs>
                  </div>
                </app-section>

                <app-icon-page-content
                  .src=${iconSRC}
                  .preprocessCode=${this.PREPROCESS_CODE}
                  .codeBuilders=${this.CODE_BUILDERS}
                  .codeBuildContext=${names}
                  ?noVariants=${this.noVariants}
                ></app-icon-page-content>
              </div>
            `}
      </app-modal>
    `;
  }

  static styles = css`
    .modal-body {
      display: block;
      width: 100%;
      padding: 0 2rem;

      app-icon-page-content {
        padding-bottom: 3rem;
      }
    }
  `;
}
