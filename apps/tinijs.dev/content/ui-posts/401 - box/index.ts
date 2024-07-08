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
            section: 'html',
            attrs: {label: 'Inner text/html'},
            target: 'inner',
            value: 'This is a box.',
          },
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
            section: 'input',
            attrs: {
              label: 'Background',
              placeholder: 'primary, gradient-success, blue, #0000ff, ...',
            },
            target: 'background',
          },
          {
            section: 'input',
            attrs: {
              label: 'Color',
              placeholder: 'primary, blue, #0000ff, ...',
            },
            target: 'color',
          },
          {
            section: 'css',
            attrs: {
              label: 'Style deep',
              placeholder: ':host { key: value }',
            },
            target: 'styleDeep',
          },
        ]}
      ></app-component-editor>
    `;
  }

  static styles = css``;
}
