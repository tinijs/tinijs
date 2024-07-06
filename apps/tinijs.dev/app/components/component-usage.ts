import {html, css, nothing, type TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import {
  Component,
  TiniComponent,
  Input,
  Reactive,
  type OnCreate,
  type OnChanges,
} from '@tinijs/core';

import {mainStore} from '../stores/main.js';

import {TiniCodeComponent} from '../ui/components/code.js';

import {UIConsumerTargets} from '../consts/common.js';

import {buildUsageCode, type BuildCodeDef} from '../utils/code.js';

import {AppConsumerTabsComponent} from './consumer-tabs.js';

@Component({
  components: [TiniCodeComponent, AppConsumerTabsComponent],
})
export class AppComponentUsageComponent
  extends TiniComponent
  implements OnCreate, OnChanges
{
  static readonly defaultTagName = 'app-component-usage';

  @Input() codes!: Array<BuildCodeDef | Record<string, TemplateResult>>;

  @Reactive() uiConsumerTarget?: UIConsumerTargets;

  onCreate() {
    if (!this.codes?.length) throw new Error('codes is required');
  }

  private codeContent?: TemplateResult;
  onChanges() {
    if (this.uiConsumerTarget) {
      this.codeContent = html`${this.codes.map(item => {
        const directContent =
          (item as any)[this.uiConsumerTarget!] || (item as any).all;
        if (directContent) {
          return directContent;
        } else {
          const code = buildUsageCode(
            this.uiConsumerTarget!,
            item as BuildCodeDef
          );
          return html`<tini-code language="html" content=${code}></tini-code>`;
        }
      })}`;
    }
  }

  private changeConsumerTarget({
    detail: target,
  }: CustomEvent<UIConsumerTargets>) {
    if (target === this.uiConsumerTarget) return;
    this.uiConsumerTarget = mainStore.uiConsumerTarget = target;
  }

  protected render() {
    return html`
      <div class="main">
        <div class="preview">${this.getPreviewTemplate()}</div>

        <div class=${classMap({code: true, showed: !!this.uiConsumerTarget})}>
          ${this.getCodeTemplate()}
        </div>
      </div>
    `;
  }

  private getPreviewTemplate() {
    return html`<slot></slot>`;
  }

  private getCodeTemplate() {
    return html`
      <div class="head">
        <app-consumer-tabs
          @change=${this.changeConsumerTarget}
        ></app-consumer-tabs>
      </div>
      ${!this.uiConsumerTarget || !this.codeContent
        ? nothing
        : html` <div class="body">${this.codeContent}</div> `}
    `;
  }

  static styles = css`
    .main {
      overflow: hidden;
      border: 1px solid var(--color-body-semi);
      border-radius: var(--radius-md);
    }

    .preview {
      padding: var(--space-xl);
    }

    .code {
      .head {
        display: flex;
        padding: 0;
        justify-content: flex-start;
        height: 40px;
        border-top: 1px solid var(--color-body-semi);
      }

      &.showed .head {
        height: 42px;
        border-bottom: 1px solid var(--color-body-semi);
      }

      .body {
        padding: var(--space-md);
      }
    }
  `;
}
