import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';

@Component({
  components: [AppComponentEditorComponent],
})
export class ContentUIPostFlexComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-flex';

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
    const twoChildren =
      '<div style="width: 15rem; height: 2rem; background: var(--color-body-subtle)">Item 1</div>\n<div style="width: 10rem; height: 4rem; background: var(--color-body-subtle)">Item 2</div>';
    return html`
      <app-component-editor
        name="flex"
        .examples=${{
          row: {
            content: 'Row flex',
            items: [
              {target: 'alignItems', value: 'center'},
              {target: 'gap', value: 'md'},
              {target: 'inner', value: twoChildren},
            ],
          },
          column: {
            content: 'Column flex',
            items: [
              {target: 'direction', value: 'column'},
              {target: 'alignItems', value: 'center'},
              {target: 'gap', value: 'md'},
              {target: 'inner', value: twoChildren},
            ],
          },
        }}
        .sections=${[
          {
            section: 'select',
            attrs: {
              label: 'Display',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'None', value: 'none'},
                {content: 'Flex', value: 'flex'},
                {content: 'Inline flex', value: 'inline-flex'},
              ],
            },
            target: 'display',
          },
          {
            section: 'html',
            attrs: {label: 'HTML'},
            target: 'inner',
            value: '<div>Flex layout</div>',
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
