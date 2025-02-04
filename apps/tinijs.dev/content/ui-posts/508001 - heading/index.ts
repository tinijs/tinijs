import {html, css, nothing} from 'lit';
import {property} from 'lit/decorators/property.js';

import {element, TiniElement} from '@tinijs/core';

import {AppElementEditorElement} from '../../../app/elements/element-editor/index.js';

@element({
  elements: [AppElementEditorElement],
})
export class ContentUIPostHeadingElement extends TiniElement {
  static readonly defaultTagName = 'content-ui-post-heading';

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
      <app-element-editor
        name="heading"
        .examples=${{
          color: {
            content: 'Color heading',
            items: [
              {
                target: 'inner',
                value: '<tini-text color="success">A heading</tini-text>',
              },
            ],
          },
          gradient: {
            content: 'Gradient heading',
            items: [
              {
                target: 'inner',
                value:
                  '<tini-text gradient="linear-gradient(180deg, red, blue)">A heading</tini-text>',
              },
            ],
          },
          'link-always': {
            content: 'Always permalink',
            items: [
              {
                target: 'inner',
                value: 'Always permalink',
              },
              {
                target: 'preset',
                value: 'insideLinkAfter',
              },
            ],
          },
          'link-hover': {
            content: 'Hover permalink',
            items: [
              {
                target: 'inner',
                value: 'Hover permalink',
              },
              {
                target: 'preset',
                value: 'insideLinkAfter',
              },
              {
                target: 'insideLinkVisibility',
                value: 'hover',
              },
            ],
          },
          'custom-underline': {
            content: 'Custom self underline',
            items: [
              {
                target: 'inner',
                value: 'Custom underline',
              },
              {
                target: 'preset',
                value: 'selfLink',
              },
              {
                target: 'selfLinkDecoration',
                value: 'underline wavy magenta',
              },
            ],
          },
          'custom-symbol': {
            content: 'Custom inside symbol',
            items: [
              {
                target: 'inner',
                value: 'Custom symbol',
              },
              {
                target: 'preset',
                value: 'insideLinkAfter',
              },
              {
                target: 'insideLinkSymbol',
                value: '$',
              },
              {
                target: 'insideLinkColor',
                value: 'magenta',
              },
            ],
          },
          'patch-underline': {
            content: 'Patch self gradient permalink underline',
            items: [
              {
                target: 'inner',
                value:
                  '<tini-text gradient="linear-gradient(180deg, red, blue)">A heading</tini-text>',
              },
              {
                target: 'preset',
                value: 'selfLink',
              },
              {
                target: 'selfLinkColor',
                value: 'blue',
              },
            ],
          },
        }}
        .sections=${[
          {
            section: 'html',
            attrs: {label: 'Text/HTML'},
            target: 'inner',
            value: 'A heading',
          },
          {
            section: 'select',
            attrs: {
              label: 'Level',
              items: [
                {content: 'Default', value: '_default'},
                {content: '1', value: '1'},
                {content: '2', value: '2'},
                {content: '3', value: '3'},
                {content: '4', value: '4'},
                {content: '5', value: '5'},
                {content: '6', value: '6'},
              ],
            },
            target: 'level',
          },
          {
            section: 'select',
            attrs: {
              label: 'Built-in presets',
              items: [
                {content: 'Default (no permalink)', value: '_default'},
                {content: 'With self permalink', value: 'selfLink'},
                {
                  content: 'With before inside permalink',
                  value: 'insideLinkBefore',
                },
                {
                  content: 'With after inside permalink',
                  value: 'insideLinkAfter',
                },
              ],
            },
            target: 'preset',
          },
          {
            section: 'input',
            attrs: {
              label: 'Permalink href',
              placeholder: 'Custom permalink href',
            },
            target: 'linkHref',
          },
          {
            section: 'select',
            attrs: {
              label: 'Permalink target',
              items: [
                {content: 'Default', value: '_default'},
                {content: '_self', value: '_self'},
                {content: '_blank', value: '_blank'},
                {content: '_parent', value: '_parent'},
                {content: '_top', value: '_top'},
                {content: '_unfencedTop', value: '_unfencedTop'},
              ],
            },
            target: 'linkTarget',
          },
          {
            section: 'select',
            attrs: {
              label: 'Self permalink visibility',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Always', value: 'always'},
                {content: 'Hover', value: 'hover'},
                {content: 'Adaptive', value: 'adaptive'},
              ],
            },
            target: 'selfLinkVisibility',
          },
          {
            section: 'input',
            attrs: {
              label: 'Self permalink color',
              placeholder: 'primary, red, ...',
            },
            target: 'selfLinkColor',
          },
          {
            section: 'input',
            attrs: {
              label: 'Self permalink decoration',
              placeholder: 'underline, green wavy underline, ...',
            },
            target: 'selfLinkDecoration',
          },
          {
            section: 'input',
            attrs: {
              label: 'Self permalink underline offset',
              placeholder: 'sm, 0.5rem, ...',
            },
            target: 'selfLinkUnderlineOffset',
          },
          {
            section: 'input',
            attrs: {
              label: 'Inside permalink symbol',
              placeholder: 'Text or image URL/URI',
            },
            target: 'insideLinkSymbol',
          },
          {
            section: 'select',
            attrs: {
              label: 'Inside permalink placement',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Before', value: 'before'},
                {content: 'After', value: 'after'},
              ],
            },
            target: 'insideLinkPlacement',
          },
          {
            section: 'select',
            attrs: {
              label: 'Inside permalink visibility',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Always', value: 'always'},
                {content: 'Hover', value: 'hover'},
                {content: 'Adaptive', value: 'adaptive'},
              ],
            },
            target: 'insideLinkVisibility',
          },
          {
            section: 'switch',
            attrs: {label: 'Use raw icon'},
            target: 'insideLinkRawIcon',
          },
          {
            section: 'input',
            attrs: {
              label: 'Inside permalink color',
              placeholder: 'primary, red, ...',
            },
            target: 'insideLinkColor',
          },
          {
            section: 'input',
            attrs: {
              label: 'Inside permalink size',
              placeholder: '0.25 to 1',
            },
            target: 'insideLinkSize',
          },
          {
            section: 'input',
            attrs: {
              label: 'Inside permalink space',
              placeholder: '0.25 to 1',
            },
            target: 'insideLinkSpace',
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
      ></app-element-editor>
    `;
  }

  static styles = css``;
}
