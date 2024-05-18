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
  @Input() checked?: boolean;
  @Output() change!: EventEmitter<boolean>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
  }

  protected render() {
    return html`
      <div class="root">
        <span class="label">${this.label}</span>
        <tini-switch
          ?checked=${this.checked}
          @change=${({detail}: CustomEvent<SwitchEventDetail>) =>
            this.change.emit(detail.checked)}
        ></tini-switch>
      </div>
    `;
  }

  static styles = css`
    .root {
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
