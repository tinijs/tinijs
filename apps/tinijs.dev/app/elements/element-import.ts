import {html, css, nothing} from 'lit';
import {property} from 'lit/decorators/property.js';
import {pascalCase} from 'change-case';

import {
  element,
  useUI,
  TiniElement,
  type UI,
  type OnCreate,
  type OnChanges,
} from '@tinijs/core';
import {globalState} from '@tinijs/store';

import {MAIN_STORE} from '../stores/main.js';

import {TiniCodeElement} from '../ui/elements/code.js';

import {UIConsumerTargets} from '../consts/common.js';

import {AppConsumerTabsElement} from './consumer-tabs.js';

@element({
  elements: [TiniCodeElement, AppConsumerTabsElement],
})
export class AppElementImportElement
  extends TiniElement
  implements OnCreate, OnChanges
{
  static readonly defaultTagName = 'app-element-import';

  @useUI() readonly ui!: UI;
  @globalState(MAIN_STORE) uiConsumerTarget = MAIN_STORE.uiConsumerTarget;

  @property() elementName!: string;

  onCreate() {
    if (!this.elementName) throw new Error('elementName is required');
  }

  private importCode?: string;
  onChanges() {
    this.importCode = this.buildImportCode();
  }

  private buildImportCode() {
    const {familyId} = this.ui.activeTheme;
    const className = pascalCase(this.elementName);
    const constructorName = `Tini${className}Element`;
    const importPath = `@tinijs/ui-${familyId}/elements/${this.elementName}.js`;
    switch (this.uiConsumerTarget) {
      case UIConsumerTargets.Tini: {
        return `import { ${constructorName} } from '${importPath}';

// globally in app.ts
@app({ elements: [ ${constructorName} ] })

// or, locally in elements, pages or layouts
@element|page|layout({ elements: [ ${constructorName} ] })`;
      }
      case UIConsumerTargets.React: {
        const reactTag = `Tini${className}`;
        const reactPath = `@tinijs/ui-${familyId}-react/elements/${this.elementName}.js`;
        return `import { ${reactTag}, ${constructorName} } from '${reactPath}';

// globally before app initialization
setupUI({ elements: [ ${constructorName} ] });

// or, locally in elements
registerElements([ ${constructorName} ]);`;
      }
      case UIConsumerTargets.Vanilla: {
        const cdnPath = `https://cdn.jsdelivr.net/npm/@tinijs/ui-${familyId}@0.21.1/bundled/elements/${this.elementName}.js`;
        return `import { ${constructorName} } from '${cdnPath}';

// at the very beginning of a page
setupUI({ elements: [ ${constructorName} ] });`;
      }
      default: {
        return `import { ${constructorName} } from '${importPath}';

// globally before app initialization
setupUI({ elements: [ ${constructorName} ] });

// or, locally in elements
registerElements([ ${constructorName} ]);`;
      }
    }
  }

  private changeConsumerTarget({
    detail: target,
  }: CustomEvent<UIConsumerTargets>) {
    if (target === this.uiConsumerTarget) return;
    MAIN_STORE.uiConsumerTarget = target;
  }

  protected render() {
    return html`
      <p style="margin-bottom: var(--space-md)">
        Import and register the element either globally or locally, please see
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
