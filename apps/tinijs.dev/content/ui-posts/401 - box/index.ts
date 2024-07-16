import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {UIConsumerTargets} from '../../../app/consts/common.js';

import {TiniBoxComponent} from '../../../app/ui/components/box.js';
import {TiniFlexComponent} from '../../../app/ui/components/flex.js';
import {TiniTextComponent} from '../../../app/ui/components/text.js';
import {TiniImageComponent} from '../../../app/ui/components/image.js';
import {TiniButtonComponent} from '../../../app/ui/components/button.js';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';
import {AppComponentUsageComponent} from '../../../app/components/component-usage.js';

@Component({
  components: [
    TiniBoxComponent,
    TiniFlexComponent,
    TiniTextComponent,
    TiniImageComponent,
    TiniButtonComponent,
    AppComponentEditorComponent,
    AppComponentUsageComponent,
  ],
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
      case 'tailwind':
        return this.renderTailwindBlock();
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
              {target: 'inner', value: '<span>Box with medium padding</span>'},
            ],
          },
          'backgroumd-color-padding-radius': {
            content: 'Background, color and radius',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'primary'},
              {target: 'color', value: 'primary-contrast'},
              {target: 'radius', value: 'md'},
              {
                target: 'inner',
                value: '<span>Box with primary background</span>',
              },
            ],
          },
          margins: {
            content: 'Margins',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'body-subtle'},
              {target: 'margin', value: 'xl'},
              {
                target: 'inner',
                value: '<span>Box with extra-large margin</span>',
              },
            ],
          },
          'width-height': {
            content: 'Width and height',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'background', value: 'body-subtle'},
              {target: 'width', value: '150px'},
              {target: 'height', value: '150px'},
              {
                target: 'inner',
                value: '<span>Box with custom width and height</span>',
              },
            ],
          },
          borders: {
            content: 'Borders',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'border', value: 'md solid medium'},
              {
                target: 'inner',
                value: '<span>Box with medium solid border</span>',
              },
            ],
          },
          shadows: {
            content: 'Shadows',
            items: [
              {target: 'padding', value: 'md'},
              {target: 'shadow', value: 'md'},
              {target: 'inner', value: '<span>Box with medium shadow</span>'},
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
              {target: 'inner', value: '<span>Box with transform</span>'},
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
              {target: 'inner', value: '<span>Box with filter</span>'},
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

  private renderTailwindBlock() {
    const example1 = `<!-- Example 1: using design tokens in inline styles -->
<div style="
  width: 400px;
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
">
  <img
    style="width: 64px"
    src="https://img.icons8.com/fluency/96/chat--v1.png"
    alt="ChitChat"
  />
  <div>
    <div style="font-size: var(--text-lg); font-weight: var(--weight-medium);">ChitChat</div>
    <p style="color: var(--color-medium)">You have a new message!</p>
  </div>
</div>`;
    const example2 = `<!-- Example 2: using Tini UI components -->
<tini-flex
  width="400px"
  display="inline-flex"
  gap="xl"
  alignItems="center"
  padding="md xl5 md xl"
  radius="lg"
  shadow="md"
>
  <tini-image
    width="96px"
    radius="full"
    src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&amp;w=250&amp;h=250&amp;auto=format&amp;fit=crop"
    alt="Jane Doe"
  ></tini-image>
  <tini-flex direction="column" wrap="nowrap">
    <tini-text size="lg" weight="bold">Jane Doe</tini-text>
    <tini-text color="medium" weight="medium">Software Engineer</tini-text>
    <tini-box marginTop="xs">
      <tini-button scheme="primary" size="xs">Message</tini-button>
    </tini-box>
  </tini-flex>
</tini-flex>`;
    const tiniCode = html`<tini-code
      language="javascript"
      content=${example1 + '\n\n' + example2}
    ></tini-code>`;
    const vueCode = tiniCode;
    const reactCode = html`<tini-code
      language="javascript"
      content=${`<!-- Example 1: using design tokens in inline styles -->
<div style={{
  width: '400px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-md)',
  padding: 'var(--space-lg) var(--space-xl)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
}}>
  <img
    style={{ width: 64px }}
    src="https://img.icons8.com/fluency/96/chat--v1.png"
    alt="ChitChat"
  />
  <div>
    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-medium)' }}>ChitChat</div>
    <p style={{ color: 'var(--color-medium)' }}>You have a new message!</p>
  </div>
</div>` +
      '\n\n' +
      example2
        .replace(/tini-box/g, 'TiniBox')
        .replace(/tini-flex/g, 'TiniFlex')
        .replace(/tini-text/g, 'TiniText')
        .replace(/tini-image/g, 'TiniImage')
        .replace(/tini-button/g, 'TiniButton')}
    ></tini-code>`;
    const angularCode = tiniCode;
    const svelteCode = tiniCode;
    const vanillaCode = tiniCode;
    return html`
      <app-component-usage
        .codes=${[
          {
            [UIConsumerTargets.Tini]: tiniCode,
            [UIConsumerTargets.Vue]: vueCode,
            [UIConsumerTargets.React]: reactCode,
            [UIConsumerTargets.Angular]: angularCode,
            [UIConsumerTargets.Svelte]: svelteCode,
            [UIConsumerTargets.Vanilla]: vanillaCode,
          },
        ]}
      >
        <div
          style="
            width: 400px;
            display: inline-flex;
            align-items: center;
            gap: var(--space-md);
            padding: var(--space-lg) var(--space-xl);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
          "
        >
          <img
            style="width: 64px"
            src="https://img.icons8.com/fluency/96/chat--v1.png"
            alt="ChitChat"
          />
          <div>
            <div
              style="
                font-size: var(--text-lg);
                font-weight: var(--weight-medium);
              "
            >
              ChitChat
            </div>
            <p style="color: var(--color-medium)">You have a new message!</p>
          </div>
        </div>

        <br />
        <br />

        <tini-flex
          width="400px"
          display="inline-flex"
          gap="xl"
          alignItems="center"
          padding="md xl5 md xl"
          radius="lg"
          shadow="md"
        >
          <tini-image
            width="96px"
            radius="full"
            src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&amp;w=250&amp;h=250&amp;auto=format&amp;fit=crop"
            alt="Jane Doe"
          ></tini-image>
          <tini-flex direction="column" wrap="nowrap">
            <tini-text size="lg" weight="bold">Jane Doe</tini-text>
            <tini-text color="medium" weight="medium"
              >Software Engineer</tini-text
            >
            <tini-box marginTop="xs">
              <tini-button scheme="primary" size="sm">Message</tini-button>
            </tini-box>
          </tini-flex>
        </tini-flex>
      </app-component-usage>
    `;
  }

  static styles = css``;
}
