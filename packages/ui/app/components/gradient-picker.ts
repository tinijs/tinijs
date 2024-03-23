import {html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {ref, Ref, createRef} from 'lit/directives/ref.js';
import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  Reactive,
  stylingWithBases,
} from '@tinijs/core';
// @ts-ignore
import * as Grapick from 'grapick';
import {commonBases, formBases} from '@tinijs/ui/bases';

import {parseGradient} from '../helpers/gradient';

@Component({
  theming: {
    styling: stylingWithBases([commonBases, formBases]),
  },
})
export class AppGradientPickerComponent extends TiniComponent {
  static readonly defaultTagName = 'app-gradient-picker';

  @Input({type: String}) name!: string;
  @Input({type: String}) value = 'none';

  @Output() change!: EventEmitter<string>;

  @Reactive() private showed = false;
  private togglerRef: Ref<HTMLButtonElement> = createRef();
  private containerRef: Ref<HTMLDivElement> = createRef();
  private grapickRef: Ref<HTMLDivElement> = createRef();
  private typeSelectRef: Ref<HTMLSelectElement> = createRef();
  private directionSelectRef: Ref<HTMLSelectElement> = createRef();
  private grapickInstance: any;

  private onGlobalClicked = (e: MouseEvent) => {
    const togglerNode = this.togglerRef.value;
    const containerNode = this.containerRef.value;
    if (!this.showed || !togglerNode || !containerNode) return;
    const togglerRange = togglerNode.getBoundingClientRect();
    const menuContainerRange = containerNode.getBoundingClientRect();
    const isInsideToggler =
      togglerRange.left <= e.clientX &&
      togglerRange.right >= e.clientX &&
      togglerRange.top <= e.clientY &&
      togglerRange.bottom >= e.clientY;
    const isInsideMenu =
      menuContainerRange.left <= e.clientX &&
      menuContainerRange.right >= e.clientX &&
      menuContainerRange.top <= e.clientY &&
      menuContainerRange.bottom >= e.clientY;
    this.showed = isInsideToggler || isInsideMenu;
  };

  onCreate() {
    addEventListener('click', this.onGlobalClicked);
  }

  onDestroy() {
    removeEventListener('click', this.onGlobalClicked);
  }

  onReady() {
    if (!this.grapickRef.value) return;
    this.grapickInstance = new Grapick({
      el: this.grapickRef.value,
    });
    try {
      const {type, direction, colors} = parseGradient(this.value);
      this.grapickInstance.setType(type);
      this.typeSelectRef.value!.value = type;
      this.grapickInstance.setDirection(direction);
      this.directionSelectRef.value!.value = direction;
      colors.forEach(({color, position}) => {
        this.grapickInstance.addHandler(position, color);
      });
    } catch (err: any) {
      alert(err.message || 'Load gradient failed');
    }
    this.grapickInstance.on('change', () =>
      this.valueChanged(this.grapickInstance.getSafeValue())
    );
  }

  private valueChanged(value: string) {
    this.value = value;
    this.change.emit(value);
  }

  private changeType(e: InputEvent) {
    const value = (e.target as HTMLSelectElement).value;
    this.grapickInstance.setType(value);
  }

  private changeDirection(e: InputEvent) {
    const value = (e.target as HTMLSelectElement).value;
    this.grapickInstance.setDirection(value);
  }

  protected render() {
    return html`
      <button
        ${ref(this.togglerRef)}
        class="toggler"
        @click=${() => (this.showed = !this.showed)}
        style=${styleMap({background: this.value})}
      ></button>
      <div
        ${ref(this.containerRef)}
        class=${classMap({'picker-container': true, showed: this.showed})}
      >
        <div class="grapick">
          <div ${ref(this.grapickRef)}></div>
        </div>
        <div class="options">
          <select ${ref(this.typeSelectRef)} @change=${this.changeType}>
            <optgroup label="Type">
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </optgroup>
          </select>
          <select
            ${ref(this.directionSelectRef)}
            @change=${this.changeDirection}
          >
            <optgroup label="Direction">
              <option value="top">Top</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
            </optgroup>
          </select>
        </div>
      </div>
    `;
  }

  static styles = css`
    /*
     * Grapick
     */

    .grp-wrapper {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==');
    }
    .grp-preview {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: crosshair;
    }
    .grp-handler {
      width: 4px;
      margin-left: -2px;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      height: 100%;
    }
    .grp-handler-close {
      color: rgba(0, 0, 0, 0.4);
      border-radius: 100%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      background-color: #fff;
      text-align: center;
      width: 15px;
      height: 15px;
      margin-left: -5px;
      line-height: 10px;
      font-size: 21px;
      cursor: pointer;
    }
    .grp-handler-close-c {
      position: absolute;
      top: -17px;
    }
    .grp-handler-drag {
      background-color: rgba(255, 255, 255, 0.35);
      cursor: col-resize;
      width: 100%;
      height: 100%;
    }
    .grp-handler-selected .grp-handler-drag {
      background-color: rgba(255, 255, 255, 0.7);
    }
    .grp-handler-cp-c {
      display: none;
    }
    .grp-handler-selected .grp-handler-cp-c {
      display: block;
    }
    .grp-handler-cp-wrap {
      box-sizing: content-box;
      width: 15px;
      height: 15px;
      margin-left: -8px;
      border: 3px solid #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      border-radius: 100%;
      cursor: pointer;
    }
    .grp-handler-cp-wrap input[type='color'] {
      opacity: 0;
      cursor: pointer;
    }

    /*
     * Main
     */

    :host {
      display: inline;
      position: relative;
    }

    .toggler {
      cursor: pointer;
      width: 50px;
      height: 27px;
      outline: var(--size-border) solid var(--color-medium);
      border: 4px solid var(--color-background-tint);
      border-radius: var(--size-radius);
    }

    .picker-container {
      box-sizing: border-box;
      display: none;
      position: absolute;
      top: 30px;
      right: 0;
      background: var(--color-dark-tint);
      width: 230px;
      border: 1px solid var(--color-light-tint);
      border-radius: var(--size-border);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      z-index: 101;

      &.showed {
        display: block;
      }

      .grapick {
        padding: 2rem 1.5rem;
      }

      .options {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 1rem;
        background: var(--color-background-tint);

        select {
          max-width: calc(50% - 0.5rem);
          background: var(--color-background-tint);
          border: var(--size-border) solid var(--color-medium);
          border-radius: var(--size-radius);
          padding: var(--size-space-0_25x) var(--size-space-0_5x);
        }
      }
    }
  `;
}
