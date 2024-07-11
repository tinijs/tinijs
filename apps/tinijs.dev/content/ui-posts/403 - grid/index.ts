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
    const holyGrailInner = `<tini-box gridArea="header" height="64px" background="body-subtle">Header</tini-box>
<tini-box gridArea="nav" width="120px" background="body-subtle">Nav</tini-box>
<tini-box gridArea="content" background="body-subtle">Content</tini-box>
<tini-box gridArea="side" width="120px" background="body-subtle">Side</tini-box>
<tini-box gridArea="footer" height="64px" background="body-subtle">Footer</tini-box>`;
    return html`
      <app-component-editor
        name="grid"
        .examples=${{
          row: {
            content: 'Holy grail layout',
            items: [
              {
                target: 'areas',
                value:
                  "'header header header' 'nav content side' 'footer footer footer'",
              },
              {target: 'columns', value: 'auto 1fr auto'},
              {target: 'rows', value: 'auto 1fr auto'},
              {target: 'gap', value: 'md'},
              {target: 'height', value: '250px'},
              {target: 'inner', value: holyGrailInner},
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
                {content: 'Grid', value: 'grid'},
                {content: 'Inline grid', value: 'inline-grid'},
              ],
            },
            target: 'display',
          },
          {
            section: 'html',
            attrs: {label: 'HTML'},
            target: 'inner',
            value: '<div>Grid layout</div>',
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
