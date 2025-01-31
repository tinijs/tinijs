import {html, css, nothing} from 'lit';
import {property} from 'lit/decorators/property.js';

import {component, TiniComponent} from '@tinijs/core';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';

@component({
  components: [AppComponentEditorComponent],
})
export class ContentUIPostLinkComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-link';

  @property() block!: string;

  onCreate() {
    if (!this.block) throw new Error('block is required');
  }

  protected render() {
    switch (this.block) {
      case 'editor':
        return this.renderEditorBlock();
      default:
        return nothing;
    }
  }

  private renderEditorBlock() {
    return html`
      <app-component-editor
        name="link"
        .sections=${[
          {
            section: 'html',
            attrs: {label: 'Inner'},
            target: 'inner',
            value: 'This is a link.',
          },
          {
            section: 'input',
            attrs: {label: 'Href'},
            target: 'href',
            value: '#',
          },
          {
            section: 'select',
            attrs: {
              label: 'Target',
              items: [
                {content: 'Default', value: '_default'},
                {content: '_blank', value: '_blank'},
                {content: '_parent', value: '_parent'},
                {content: '_top', value: '_top'},
              ],
            },
            target: 'target',
          },
          {
            section: 'switch',
            attrs: {label: 'Disabled'},
            target: 'disabled',
          },
          {
            section: 'css',
            attrs: {
              label: 'Style deep',
              placeholder: ':host, .main {\n  key: value;\n}',
            },
            target: 'styleDeep',
          },
        ]}
      ></app-component-editor>
    `;
  }

  static styles = css``;
}
