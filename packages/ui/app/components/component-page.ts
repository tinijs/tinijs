import {html, css, nothing} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {cache} from 'lit/directives/cache.js';
import {repeat} from 'lit/directives/repeat.js';
import {UnstableStates} from '@tinijs/core';
import {Component, TiniComponent, Input, Reactive} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {Configurable} from '../configurable.js';
import {OFFICIAL_REPO_URL, ImportMethods} from '../consts/main.js';
import {ICON_EXPERIMENTAL, ICON_DEPRECATED} from '../consts/icons.js';
import {buildGithubRawUrl} from '../utils/github.js';
import {
  extractCSSVariables,
  VariableDef,
  extractComponentProperties,
} from '../utils/source.js';
import {getText} from '../utils/http.js';
import {mainStore} from '../stores/main.js';

import {AppSectionComponent} from './section.js';
import {AppTabsComponent, TabItem} from './tabs.js';
import {AppCodeComponent} from './code.js';

interface Quicklink {
  href: string;
  title: string;
}

enum Modes {
  Article = 'article',
  Component = 'component',
  Soul = 'soul',
}

@Component({
  components: [AppSectionComponent, AppTabsComponent, AppCodeComponent],
})
export class AppComponentPageComponent extends TiniComponent {
  static readonly defaultTagName = 'app-component-page';

  private readonly PACKAGE_PREFIX = Configurable.getOption('packagePrefix');
  private readonly REPO_URL = Configurable.getOption('repoUrl');
  private readonly SOUL_URL_RESOLVER =
    Configurable.getOption('soulUrlResolver');
  private readonly COMPONENT_URL_RESOLVER = Configurable.getOption(
    'componentUrlResolver'
  );

  private readonly IMPORT_TAB_ITEMS: TabItem[] = [
    {name: ImportMethods.Tini},
    {name: ImportMethods.Specific},
    {name: ImportMethods.Standalone},
  ];

  @Input({type: Object}) component!: any;
  @Input({type: String}) name!: string;
  @Input({type: String}) path!: string;
  @Input({type: String}) titleText?: string;
  @Input({type: Array}) partList?: string[][];
  @Input({type: String}) customComponentPrefix?: string;
  @Input({type: Object}) prevPage?: Quicklink;
  @Input({type: Object}) nextPage?: Quicklink;

  @Reactive() private contentMode: Modes = Modes.Article;
  @Reactive() private componentSourceCode?: string;
  @Reactive() private soulSourceCode?: string;
  @Reactive() private soulVariablesMap?: Map<string, VariableDef>;
  @Reactive() private componentProperties?: any[];

  @Subscribe(mainStore) @Reactive() private readonly activeSoulId =
    mainStore.activeSoulId;
  @Subscribe(mainStore) @Reactive() private readonly referImport =
    mainStore.referImport;

  private readonly referArticleRepoUrl = this.customComponentPrefix
    ? this.REPO_URL
    : OFFICIAL_REPO_URL;
  private readonly referComponentRepoUrl = this.customComponentPrefix
    ? this.REPO_URL
    : OFFICIAL_REPO_URL;

  private nameVariants!: ReturnType<typeof this.buildNameVariants>;
  private importTiniCode!: ReturnType<typeof this.buildImportTiniCode>;
  private importSpecificCode!: ReturnType<typeof this.buildImportSpecificCode>;
  private importSpecificCodeReact!: ReturnType<
    typeof this.buildImportSpecificCodeReact
  >;
  private standaloneSkinCode!: string;
  private standaloneScriptCode!: string;
  private standaloneImportCode!: string;
  private articleLink!: string;
  private componentLink!: string;
  private componentUrl!: string;
  private soulLink!: string;
  private soulUrl!: string;

  async onCreate() {
    // extract soul variables
    this.soulVariablesMap = await extractCSSVariables(this.buildSoulUrl(), [
      ':host {',
      '}',
    ]);
    // extract component properties
    this.componentProperties = await extractComponentProperties(
      this.buildComponentUrl()
    );
  }

  onChanges() {
    this.nameVariants = this.buildNameVariants();
    this.importTiniCode = this.buildImportTiniCode();
    this.importSpecificCode = this.buildImportSpecificCode();
    this.importSpecificCodeReact = this.buildImportSpecificCodeReact();
    this.standaloneSkinCode = this.buildStandaloneSkinCode();
    this.standaloneScriptCode = this.buildStandaloneScriptCode();
    this.standaloneImportCode = this.buildStandaloneImportCode();
    this.articleLink = this.buildArticleLink();
    this.componentLink = this.buildComponentLink();
    this.componentUrl = this.buildComponentUrl();
    this.soulLink = this.buildSoulLink();
    this.soulUrl = this.buildSoulUrl();
  }

  private buildNameVariants() {
    const prefix = (this.customComponentPrefix || 'tini').toLowerCase();
    const prefixUppercase = prefix.toUpperCase();
    const prefixCapitalized = prefix[0].toUpperCase() + prefix.slice(1);
    const nameCapitalized = this.name
      .split('-')
      .map(item => item[0].toUpperCase() + item.slice(1))
      .join('');
    const nameConst = `${prefixUppercase}_${this.name
      .replace(/-/g, '_')
      .toUpperCase()}`;
    const nameTag = `${prefix}-${this.name}`;
    const nameClass = `${prefixCapitalized}${nameCapitalized}Component`;
    return {nameCapitalized, nameConst, nameTag, nameClass};
  }

  private get isUnstable() {
    return !!this.component?.componentMetadata?.unstable;
  }

  private get unstableIcon() {
    return this.component?.componentMetadata?.unstable ===
      UnstableStates.Deprecated
      ? ICON_DEPRECATED
      : ICON_EXPERIMENTAL;
  }

  private get jsdelivrUrl() {
    return `https://cdn.jsdelivr.net/npm/${this.PACKAGE_PREFIX}-${this.activeSoulId}`;
  }

  private buildStandaloneSkinCode() {
    return `@import url('${this.jsdelivrUrl}/styles/skins/light.css');\n@import url('${this.jsdelivrUrl}/utilities.css');`;
  }

  private buildStandaloneScriptCode() {
    return `<script src="${this.buildStandaloneImportCode().replace(
      /(import ')|(';)/g,
      ''
    )}"></script>`;
  }

  private buildStandaloneImportCode() {
    return `import '${this.jsdelivrUrl}/components/${this.name}.bundle.js';`;
  }

  private buildArticleLink() {
    return `${this.referArticleRepoUrl}/blob/main/app/pages/${this.path}.ts`;
  }

  private buildSoulLink() {
    return `${this.REPO_URL}/blob/main/styles/${this.activeSoulId}/soul/${this.name}.ts`;
  }

  private buildSoulUrl() {
    return !this.SOUL_URL_RESOLVER
      ? `${buildGithubRawUrl(this.REPO_URL)}/main/styles/${
          this.activeSoulId
        }/soul/${this.name}.ts`
      : this.SOUL_URL_RESOLVER(this.activeSoulId, this.name);
  }

  private buildComponentLink() {
    return `${this.referComponentRepoUrl}/blob/main/components/${this.name}.ts`;
  }

  private buildComponentUrl() {
    return !this.COMPONENT_URL_RESOLVER
      ? `${buildGithubRawUrl(this.referComponentRepoUrl)}/main/components/${
          this.name
        }.ts`
      : this.COMPONENT_URL_RESOLVER(this.name);
  }

  private buildImportTiniCode() {
    const {nameClass} = this.nameVariants;
    return `import {Page} from '@tinijs/core';

// 1. import the component
import {${nameClass}} from '${
      !this.customComponentPrefix ? '@tinijs/ui' : this.PACKAGE_PREFIX
    }/components/${this.name}';

@Page({
  components: [
    ${nameClass}, // 2. register the component
  ]
});
export class MyPage extends TiniComponent {}`;
  }

  private buildImportSpecificCode() {
    const {nameClass} = this.nameVariants;
    return `import {registerComponents} from '@tinijs/core';

// 1. import the component
import {${nameClass}} from '${this.PACKAGE_PREFIX}-${this.activeSoulId}/components/${this.name}';

registerComponents([
  ${nameClass}, // 2. register the component
]);
`;
  }

  private buildImportSpecificCodeReact() {
    const {nameClass} = this.nameVariants;
    const reactTagName = nameClass.replace('Component', '');
    return `import {registerComponents} from '@tinijs/core';

// 1. import the constructor and the React wrapper
import {${nameClass}, ${reactTagName}} from '${this.PACKAGE_PREFIX}-${this.activeSoulId}/components/${this.name}.react';

registerComponents([
  ${nameClass}, // 2. register the component
]);
`;
  }

  protected async switchMode(mode: AppComponentPageComponent['contentMode']) {
    // set mode
    this.contentMode = mode;
    // load source code
    if (this.contentMode === Modes.Component && !this.componentSourceCode) {
      this.componentSourceCode = await getText(this.componentUrl);
    } else if (this.contentMode === Modes.Soul && !this.soulSourceCode) {
      try {
        this.soulSourceCode = await getText(this.soulUrl);
      } catch (err) {
        alert(`Unable to access: ${this.soulUrl}`);
      }
    }
  }

  protected render() {
    return html`
      <div class="head">
        <div class="title-bar">
          <h1 class="title">
            <span>${this.titleText || 'Untitled page'}</span>
            ${!this.isUnstable
              ? nothing
              : html`<tini-icon src=${this.unstableIcon}></tini-icon>`}
            <a
              class="github-link"
              href=${this.articleLink}
              target="_blank"
              rel="noopener"
            >
              <icon-github scheme="foreground" scale="sm"></icon-github>
            </a>
          </h1>
          <div class="switch-mode">
            <button
              class=${classMap({active: this.contentMode === Modes.Article})}
              @click=${this.switchMode.bind(this, Modes.Article)}
            >
              Documentation
            </button>
            <button
              class=${classMap({
                active: this.contentMode === Modes.Component,
              })}
              @click=${this.switchMode.bind(this, Modes.Component)}
            >
              Component source
            </button>
            <button
              class=${classMap({active: this.contentMode === Modes.Soul})}
              @click=${this.switchMode.bind(this, Modes.Soul)}
            >
              Soul source
            </button>
          </div>
        </div>
        <slot name="description"></slot>
      </div>

      ${cache(
        this.contentMode === Modes.Component
          ? this.renderComponentSource()
          : this.contentMode === Modes.Soul
            ? this.renderSoulSource()
            : this.renderArticle()
      )}
    `;
  }

  private renderArticle() {
    return html`
      <div class="body article">
        <app-section noCodeSample>
          <h2 slot="title">Imports</h2>
          <div slot="content" class="imports">
            <p>
              After the
              <a href="/get-started">initial setup</a>, you can import and use
              the component anywhere in your project. There are several way of
              including the component:
            </p>

            <app-tabs
              .tabItems=${this.IMPORT_TAB_ITEMS}
              .activeName=${this.referImport}
              @change=${({detail}: CustomEvent<{name: string}>) =>
                mainStore.commit('referImport', detail.name)}
            >
              <div data-tab=${ImportMethods.Tini}>
                <p>
                  The official
                  <tini-link
                    href="https://github.com/tinijs/tinijs/tree/main/packages/cli"
                    target="_blank"
                    rel="noopener"
                    >CLI</tini-link
                  >
                  provides the <code>tini ui use</code> command. It helps you to
                  manage <strong>components</strong>, <strong>souls</strong> and
                  <strong>skins</strong> under a single importing endpoint.
                </p>
                <app-code .code=${this.importTiniCode}></app-code>
              </div>

              <div data-tab=${ImportMethods.Specific}>
                <p>The specific package only supports one soul at a time.</p>
                <p><strong>Vue, Angular, Svelte, ...</strong></p>
                <app-code .code=${this.importSpecificCode}></app-code>
                <p><strong>React</strong></p>
                <p>
                  Enums for attribute values (<code>Colors</code>,
                  <code>Scales</code>, ...) can be imported from the
                  <code>tinijs</code> package also. Other enums are imported
                  from the same endpoint as the constructor.
                </p>
                <app-code .code=${this.importSpecificCodeReact}></app-code>
              </div>

              <div data-tab=${ImportMethods.Standalone}>
                <p>
                  First, you need to import a skin or multiple skins and set the
                  default theme
                  <code
                    >&lt;body
                    data-theme=&quot;${this.activeSoulId}/light&quot;&gt;</code
                  >. See the <a href="/get-started">Get Started</a> for the list
                  of available skins.
                </p>
                <app-code .code=${this.standaloneSkinCode}></app-code>
                <p>
                  Then, include the standalone script in any HTML page from a
                  public CDN:
                </p>
                <app-code .code=${this.standaloneScriptCode}></app-code>
                <p>Or, using ES6 import:</p>
                <app-code .code=${this.standaloneImportCode}></app-code>
                <p>
                  <strong>Note that</strong>: this method is quite convenient
                  because it can be used right away without any setup. But, it
                  is <u>not recommended</u> because the standalone component has
                  the soul baked in and is usually bigger in size compares to
                  the ESM version.
                </p>
              </div>
            </app-tabs>
          </div>
        </app-section>

        <slot></slot>

        <app-section noCodeSample>
          <h2 slot="title">API</h2>
          <div slot="content" class="api">
            <p>
              For implementation detail, please see the
              <a
                href="javascript:void(0)"
                @click=${this.switchMode.bind(this, Modes.Component)}
                >component source code</a
              >.
            </p>
            <p>
              <strong>Please note</strong>: Events are not show up in the list,
              in the mean time, please see <strong>Component Source</strong> for
              detail.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                ${!this.componentProperties?.length
                  ? nothing
                  : this.componentProperties.map(
                      prop => html`
                        <tr>
                          <td><code>${prop.name}</code></td>
                          <td><code>${prop.type}</code></td>
                          <td>${prop.isOptional ? '' : '✓'}</td>
                          <td><code>${prop.defaultValue}</code></td>
                        </tr>
                      `
                    )}
              </tbody>
            </table>
          </div>
        </app-section>

        <app-section noCodeSample>
          <h2 slot="title">Variables & parts</h2>
          <div slot="content" class="styles">
            <p>
              Please see the
              <a href="/guides/customization">Customization</a> guide for more
              info on how to customize a component.
            </p>
            <p>
              For implementation detail, please see the
              <a
                href="javascript:void(0)"
                @click=${this.switchMode.bind(this, Modes.Soul)}
                >soul source code</a
              >.
            </p>
            ${!this.soulVariablesMap?.size
              ? nothing
              : html`
                  <h3>Variables</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Variable</th>
                        <th>Description</th>
                        <th>Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${repeat(
                        this.soulVariablesMap,
                        ([key]) => key,
                        ([, variable]) => html`
                          <tr>
                            <td><code>${variable.key}</code></td>
                            <td>${variable.description}</td>
                            <td><code>${variable.value}</code></td>
                          </tr>
                        `
                      )}
                    </tbody>
                  </table>
                `}
            ${!this.partList
              ? nothing
              : html`
                  <h3>Parts</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>styleDeep template</th>
                        <th>Part template</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.partList.map(
                        ([name, description]) => html`
                          <tr>
                            <td><code>${name}</code></td>
                            <td>${description}</td>
                            <td>
                              <code>.${name} {}</code>
                            </td>
                            <td>
                              <code
                                >${this.nameVariants.nameTag}::part(${name})
                                {}</code
                              >
                            </td>
                          </tr>
                        `
                      )}
                    </tbody>
                  </table>
                `}
          </div>
        </app-section>
      </div>

      ${!this.prevPage && !this.nextPage
        ? nothing
        : html`
            <div class="foot">
              ${!this.prevPage
                ? nothing
                : html`
                    <tini-link .href=${this.prevPage.href}
                      >${this.prevPage.title}</tini-link
                    >
                  `}
              ${!this.nextPage
                ? nothing
                : html`
                    <tini-link .href=${this.nextPage.href}
                      >${this.nextPage.title}</tini-link
                    >
                  `}
            </div>
          `}
    `;
  }

  private renderComponentSource() {
    return html`
      <div class="body component-source">
        ${!this.componentSourceCode
          ? nothing
          : html`
              <p>
                View on Github:
                <a href=${this.componentLink} target="_blank" rel="noopener"
                  >${this.componentLink}</a
                >
              </p>
              <app-code .code=${this.componentSourceCode}></app-code>
            `}
      </div>
    `;
  }

  private renderSoulSource() {
    return html`
      <div class="body soul-source">
        ${!this.soulSourceCode
          ? nothing
          : html`
              <p>
                View on Github:
                <a href=${this.soulLink} target="_blank" rel="noopener"
                  >${this.soulLink}</a
                >
              </p>
              <app-code .code=${this.soulSourceCode}></app-code>
            `}
      </div>
    `;
  }

  static styles = css`
    .title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title .github-link {
        margin-left: var(--size-space);
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }

      .switch-mode {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          cursor: pointer;
          padding: var(--size-space-0_4x) var(--size-space-0_8x);
          font-size: var(--size-text-0_9x);
          border: var(--size-border) solid var(--color-primary-tint);
          border-right: none;
          color: var(--color-primary);

          &:first-child {
            border-radius: var(--size-radius) 0 0 var(--size-radius);
          }
          &:last-child {
            border-radius: 0 var(--size-radius) var(--size-radius) 0;
            border-right: var(--size-border) solid var(--color-primary-tint);
          }
          &.active {
            background: var(--color-primary);
            color: var(--color-primary-contrast);
          }
        }
      }
    }

    .body {
      padding-bottom: 2rem;

      &.article,
      &.component-source,
      &.soul-source {
        margin-top: var(--size-space-4x);
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;

      thead tr th {
        border-bottom: var(--size-border-big) solid
          var(--color-background-shade);
      }

      tbody tr td {
        border-bottom: 1px solid var(--color-background-shade);
      }

      th,
      td {
        padding: var(--size-space-0_5x);
        text-align: left;
      }
    }
  `;
}
