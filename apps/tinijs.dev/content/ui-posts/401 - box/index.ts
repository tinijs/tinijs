import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';

@Component({
  components: [AppComponentEditorComponent],
})
export class ContentUIPostBoxComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-box';

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
    return html`
      <app-component-editor
        name="box"
        .examples=${{
          test: {
            content: 'Test',
            items: [
              {target: 'inner', value: 'Test test test.'},
              {target: 'display', value: 'inline'},
              {target: 'background', value: 'red'},
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
                {content: 'Block', value: 'block'},
                {content: 'Inline', value: 'inline'},
                {content: 'Inline block', value: 'inline-block'},
              ],
            },
            target: 'display',
          },
          {
            section: 'html',
            attrs: {label: 'Text/html'},
            target: 'inner',
            value: 'A box',
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
