import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  type EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {
  TiniSwitchComponent,
  type SwitchEventDetail,
} from '../../ui/components/switch.js';

@Component({
  components: [TiniSwitchComponent],
})
export class AppComponentEditorSwitchComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-switch';

  @Input() label!: string;

  @Input() target!: string;
  @Input() activated?: boolean;

  @Output() change!: EventEmitter<boolean>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.target) throw new Error('target is required');
  }

  protected render() {
    return html`
      <div class="main">
        <span class="label">${this.label}</span>
        <tini-switch
          ?activated=${this.activated}
          @toggle=${({detail}: CustomEvent<SwitchEventDetail>) =>
            this.change.emit(detail.activated)}
        ></tini-switch>
      </div>
    `;
  }

  static styles = css`
    .main {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .label {
      display: block;
      font-weight: bold;
      font-size: var(--text-xs);
      text-transform: uppercase;
    }
  `;
}
