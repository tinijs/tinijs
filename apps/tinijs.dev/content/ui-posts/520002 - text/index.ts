import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';

@Component({
  components: [AppComponentEditorComponent],
})
export class ContentUIPostTextComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-text';

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
        name="text"
        .sections=${[
          {
            section: 'html',
            attrs: {label: 'Text'},
            target: 'inner',
            value: 'A text',
          },
          {
            section: 'switch',
            attrs: {label: 'Block'},
            target: 'block',
          },
          {
            section: 'select',
            attrs: {label: 'Color', preset: 'allColors'},
            target: 'color',
          },
          {
            section: 'select',
            attrs: {label: 'Gradient', preset: 'allGradients'},
            target: 'gradient',
          },
          {
            section: 'select',
            attrs: {label: 'Font', preset: 'fonts'},
            target: 'font',
          },
          {
            section: 'select',
            attrs: {label: 'Size', preset: 'texts'},
            target: 'size',
          },
          {
            section: 'input',
            attrs: {label: 'Weight', placeholder: '100 to 900'},
            target: 'weight',
          },
          {
            section: 'switch',
            attrs: {label: 'Italic'},
            target: 'italic',
          },
          {
            section: 'input',
            attrs: {
              label: 'Decoration',
              placeholder: 'underline, green wavy underline, ...',
            },
            target: 'decoration',
          },
          {
            section: 'select',
            attrs: {label: 'Line height', preset: 'lines'},
            target: 'line',
          },
          {
            section: 'select',
            attrs: {label: 'Letter spacing', preset: 'letters'},
            target: 'letter',
          },
          {
            section: 'select',
            attrs: {label: 'Word spacing', preset: 'words'},
            target: 'word',
          },
          {
            section: 'select',
            attrs: {
              label: 'Transform',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Lowercase', value: 'lowercase'},
                {content: 'Uppercase', value: 'uppercase'},
                {content: 'Capitalize', value: 'capitalize'},
              ],
            },
            target: 'transform',
          },
          {
            section: 'input',
            attrs: {
              label: 'Shadow',
              placeholder: 'Text shadow',
            },
            target: 'shadow',
          },
          {
            section: 'select',
            attrs: {
              label: 'Direction',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'LTR', value: 'ltr'},
                {content: 'RTL', value: 'rtl'},
              ],
            },
            target: 'dir',
          },
          {
            section: 'select',
            attrs: {
              label: 'Writing mode',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Horizontal', value: 'horizontal-tb'},
                {content: 'Vertical LR', value: 'vertical-lr'},
                {content: 'Vertical RL', value: 'vertical-rl'},
              ],
            },
            target: 'writing',
          },
          {
            section: 'select',
            attrs: {
              label: 'Overflow',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Clip', value: 'clip'},
                {content: 'Ellipsis', value: 'ellipsis'},
                {content: 'Fade', value: 'fade'},
              ],
            },
            target: 'overflow',
          },
          {
            section: 'input',
            attrs: {label: 'Max length', placeholder: '100px, 50%, ...'},
            target: 'max',
          },
          {
            section: 'select',
            attrs: {
              label: 'Align',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Start', value: 'start'},
                {content: 'Center', value: 'center'},
                {content: 'End', value: 'end'},
              ],
            },
            target: 'align',
          },
          {
            section: 'css',
            attrs: {
              label: 'Style deep',
              placeholder: ':host {\n  key: value;\n}',
            },
            target: 'styleDeep',
          },
        ]}
      ></app-component-editor>
    `;
  }

  static styles = css``;
}
