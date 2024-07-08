import {html, css, nothing} from 'lit';
import {pascalCase} from 'change-case';

import {
  Component,
  TiniComponent,
  Input,
  UseUI,
  type UI,
  type OnCreate,
  type OnChanges,
} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {mainStore} from '../stores/main.js';

import {TiniCodeComponent} from '../ui/components/code.js';

import {UIConsumerTargets} from '../consts/common.js';

import {AppConsumerTabsComponent} from './consumer-tabs.js';

@Component({
  components: [TiniCodeComponent, AppConsumerTabsComponent],
})
export class AppComponentImportComponent
  extends TiniComponent
  implements OnCreate, OnChanges
{
  static readonly defaultTagName = 'app-component-import';

  @UseUI() readonly ui!: UI;
  @Subscribe(mainStore) uiConsumerTarget = mainStore.uiConsumerTarget;

  @Input() componentName!: string;

  onCreate() {
    if (!this.componentName) throw new Error('componentName is required');
  }

  private importCode?: string;
  onChanges() {
    this.importCode = this.buildImportCode();
  }

  private buildImportCode() {
    const {familyId} = this.ui.activeTheme;
    const className = pascalCase(this.componentName);
    const constructorName = `Tini${className}Component`;
    const importPath = `@tinijs/ui-${familyId}/components/${this.componentName}.js`;
    switch (this.uiConsumerTarget) {
      case UIConsumerTargets.Tini: {
        return `import { ${constructorName} } from '${importPath}';

// globally in app.ts
@App({ components: [ ${constructorName} ] })

// or, locally in layouts, pages and components
@Layout|Page|Component({ components: [ ${constructorName} ] })`;
      }
      case UIConsumerTargets.React: {
        const reactTag = `Tini${className}`;
        const reactPath = `@tinijs/ui-${familyId}-react/components/${this.componentName}.js`;
        return `import { ${reactTag}, ${constructorName} } from '${reactPath}';

// globally before app initialization
setupUI({ components: [ ${constructorName} ] });

// or, locally in components
registerComponents([ ${constructorName} ]);`;
      }
      case UIConsumerTargets.Vanilla: {
        const cdnPath = `https://cdn.jsdelivr.net/npm/@tinijs/ui-${familyId}/components/${this.componentName}.js`;
        return `import { ${constructorName} } from '${cdnPath}';

// at the very beginning of a page
setupUI({ components: [ ${constructorName} ] });`;
      }
      default: {
        return `import { ${constructorName} } from '${importPath}';

// globally before app initialization
setupUI({ components: [ ${constructorName} ] });

// or, locally in components
registerComponents([ ${constructorName} ]);`;
      }
    }
  }

  private changeConsumerTarget({
    detail: target,
  }: CustomEvent<UIConsumerTargets>) {
    if (target === this.uiConsumerTarget) return;
    mainStore.uiConsumerTarget = target;
  }

  protected render() {
    return html`
      <p style="margin-bottom: var(--space-md)">
        Import and register the component either globally or locally, please see
        <a href="/ui/get-started">Get started</a> for how to add Tini UI to a
        project.
      </p>
      <div class="main">
        <div class="head">
          <app-consumer-tabs
            target=${this.uiConsumerTarget}
            @change=${this.changeConsumerTarget}
          ></app-consumer-tabs>
        </div>

        <div class="body">
          ${!this.importCode
            ? nothing
            : html`
                <div>
                  <tini-code
                    language="javascript"
                    content=${this.importCode}
                  ></tini-code>
                </div>
              `}
        </div>
      </div>
    `;
  }

  static styles = css`
    .main {
      overflow: hidden;
      border: 1px solid var(--color-body-semi);
      border-radius: var(--radius-md);
    }

    .head {
      display: flex;
      padding: 0;
      justify-content: flex-start;
      height: 41px;
      border-bottom: 1px solid var(--color-body-semi);
    }

    .body {
      padding: var(--space-md);
    }
  `;
}
