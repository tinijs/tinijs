import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';

@Component({
  components: [AppComponentEditorComponent],
})
export class ContentUIPostGridComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-grid';

  @Input() block!: string;

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
    const innerValue = `<div>Child 1</div>
<div>Child 2</div>`;
    return html`
      <app-component-editor
        name="grid"
        .sections=${[
          {
            section: 'select',
            attrs: {
              label: 'Display',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'None', value: 'none'},
                {content: 'Grid', value: 'grid'},
                {content: 'Inline grid', value: 'inline-grid'},
              ],
            },
            target: 'display',
          },
          {
            section: 'html',
            attrs: {label: 'Text/html'},
            target: 'inner',
            value: innerValue,
          },
          {
            section: 'css',
            attrs: {
              label: 'Style deep',
              placeholder: ':host {\n  key: value;\n}',
            },
            target: 'styleDeep',
          },
          {
            section: 'plain',
            attrs: {
              label: 'Other options',
              content:
                '<p>Please see the below API section for all the options.</p>',
            },
          },
        ]}
      ></app-component-editor>
    `;
  }

  static styles = css``;
}
