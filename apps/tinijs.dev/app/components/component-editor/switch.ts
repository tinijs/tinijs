import {html, css} from 'lit';
import {property} from 'lit/decorators/property.js';

import {
  component,
  event,
  TiniComponent,
  type EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {
  TiniSwitchComponent,
  type SwitchEventDetail,
} from '../../ui/components/switch.js';

@component({
  components: [TiniSwitchComponent],
})
export class AppComponentEditorSwitchComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-switch';

  @property() label!: string;

  @property() target!: string;
  @property() activated?: boolean;

  @event() change!: EventEmitter<boolean>;

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
