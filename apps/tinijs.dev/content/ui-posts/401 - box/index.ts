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
          paddings: {
            content: 'Paddings',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'inner', value: 'Box with medium padding'},
            ],
          },
          'backgroumd-color-padding-radius': {
            content: 'Background, color and radius',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'primary'},
              {target: 'color', value: 'primary-contrast'},
              {target: 'radius', value: 'md'},
              {target: 'inner', value: 'Box with primary background'},
            ],
          },
          margins: {
            content: 'Margins',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'body-subtle'},
              {target: 'margin', value: 'xl'},
              {target: 'inner', value: 'Box with extra-large margin'},
            ],
          },
          'width-height': {
            content: 'Width and height',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'body-subtle'},
              {target: 'width', value: '150px'},
              {target: 'height', value: '150px'},
              {target: 'inner', value: 'Box with custom width and height'},
            ],
          },
          borders: {
            content: 'Borders',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'border', value: 'md solid medium'},
              {target: 'inner', value: 'Box with medium solid border'},
            ],
          },
          shadows: {
            content: 'Shadows',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'shadow', value: 'md'},
              {target: 'inner', value: 'Box with medium shadow'},
            ],
          },
          transforms: {
            content: 'Transforms',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'body-subtle'},
              {
                target: 'transform',
                value: 'translateY(5rem) scaleX(0.7) skew(30deg,10deg)',
              },
              {target: 'inner', value: 'Box with transform'},
            ],
          },
          filters: {
            content: 'Filters',
            items: [
              {target: 'padding', value: 'md'},
              {
                target: 'background',
                value: 'linear-gradient(90deg,#f8ff00 0%,#3ad59f 100%)',
              },
              {target: 'filter', value: 'grayscale(80%)'},
              {target: 'inner', value: 'Box with filter'},
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
            attrs: {label: 'HTML'},
            target: 'inner',
            value: '<span>A box</span>',
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
