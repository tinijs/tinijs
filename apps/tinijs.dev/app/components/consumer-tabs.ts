import {html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import {
  Component,
  TiniComponent,
  Prop,
  Event,
  Sizes,
  type EventEmitter,
} from '@tinijs/core';

import {IconTiniComponent} from '../icons/tini.js';
import {IconVueComponent} from '../icons/vue.js';
import {IconReactComponent} from '../icons/react.js';
import {IconAngularComponent} from '../icons/angular.js';
import {IconSvelteComponent} from '../icons/svelte.js';
import {IconHTMLComponent} from '../icons/html.js';

import {UIConsumerTargets} from '../consts/common.js';

@Component({
  components: [
    IconTiniComponent,
    IconVueComponent,
    IconReactComponent,
    IconAngularComponent,
    IconSvelteComponent,
    IconHTMLComponent,
  ],
})
export class AppConsumerTabsComponent extends TiniComponent {
  static readonly defaultTagName = 'app-consumer-tabs';

  @Prop() target?: string;

  @Event() change!: EventEmitter<UIConsumerTargets>;

  private changeTarget(target: UIConsumerTargets) {
    this.target = target;
    this.change.emit(target);
  }

  protected render() {
    return html`
      <div class="main">
        <button
          class=${classMap({
            selected: this.target === UIConsumerTargets.Tini,
          })}
          @click=${() => this.changeTarget(UIConsumerTargets.Tini)}
        >
          <icon-tini size=${Sizes.XS}></icon-tini>
          <span>Tini</span>
        </button>
        <button
          class=${classMap({
            selected: this.target === UIConsumerTargets.Vue,
          })}
          @click=${() => this.changeTarget(UIConsumerTargets.Vue)}
        >
          <icon-vue size=${Sizes.XS}></icon-vue>
          <span>Vue</span>
        </button>
        <button
          class=${classMap({
            selected: this.target === UIConsumerTargets.React,
          })}
          @click=${() => this.changeTarget(UIConsumerTargets.React)}
        >
          <icon-react size=${Sizes.XS}></icon-react>
          <span>React</span>
        </button>
        <button
          class=${classMap({
            selected: this.target === UIConsumerTargets.Angular,
          })}
          @click=${() => this.changeTarget(UIConsumerTargets.Angular)}
        >
          <icon-angular size=${Sizes.XS}></icon-angular>
          <span>Angular</span>
        </button>
        <button
          class=${classMap({
            selected: this.target === UIConsumerTargets.Svelte,
          })}
          @click=${() => this.changeTarget(UIConsumerTargets.Svelte)}
        >
          <icon-svelte size=${Sizes.XS}></icon-svelte>
          <span>Svelte</span>
        </button>
        <button
          class=${classMap({
            selected: this.target === UIConsumerTargets.Vanilla,
          })}
          @click=${() => this.changeTarget(UIConsumerTargets.Vanilla)}
        >
          <icon-html size=${Sizes.XS}></icon-html>
          <span>Vanilla</span>
        </button>
      </div>
    `;
  }

  static styles = css`
    :host {
      width: 100%;
      container: consumer-tabs / inline-size;
    }

    .main {
      display: flex;
      padding: 0;
      justify-content: flex-start;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs2);
        background: var(--color-body);
        border: none;
        padding: var(--space-xs) var(--space-sm);
        cursor: pointer;
        box-sizing: border-box;
        height: 41px;
        border-bottom: 1px solid var(--color-body-semi);
        border-right: 1px solid var(--color-body-semi);
        background: var(--color-body-soft);

        &:hover {
          background: var(--color-body-semi);
        }

        &.selected {
          background: var(--color-body);
          border-bottom-color: var(--color-body);
        }

        span {
          display: none;
        }
      }
    }

    @container consumer-tabs (min-width: 576px) {
      .main button span {
        display: inline;
      }
    }
  `;
}
