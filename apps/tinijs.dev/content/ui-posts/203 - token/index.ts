import {html, nothing} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';

import {
  Component,
  TiniComponent,
  Input,
  Colors,
  Gradients,
  FontTypes,
  Scales,
  Texts,
  Spaces,
  Radiuses,
  Borders,
  Rings,
  Lines,
  Letters,
  Wides,
  Shadows,
  type OnCreate,
} from '@tinijs/core';

const computedStyle = getComputedStyle(document.documentElement);

@Component()
export class ContentUIPostTokenComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'content-ui-post-token';

  @Input() block!: string;

  onCreate() {
    if (!this.block) throw new Error('block is required');
  }

  protected render() {
    switch (this.block) {
      case 'font':
        return this.renderFontBlock();
      case 'color':
        return this.renderColorBlock();
      case 'gradient':
        return this.renderGradientBlock();
      case 'scale':
        return this.renderScaleBlock();
      case 'text':
        return this.renderTextBlock();
      case 'space':
        return this.renderSpaceBlock();
      case 'radius':
        return this.renderRadiusBlock();
      case 'border':
        return this.renderBorderBlock();
      case 'ring':
        return this.renderRingBlock();
      case 'line':
        return this.renderLineBlock();
      case 'letter':
        return this.renderLetterBlock();
      case 'wide':
        return this.renderWideBlock();
      case 'shadow':
        return this.renderShadowBlock();
      default:
        return nothing;
    }
  }

  private renderFontBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(FontTypes).map(([name, value]) => {
          const varName = `--font-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span style=${styleMap({'font-family': `var(${varName})`})}
                  >This is a text</span
                >
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderColorBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th style="width: 220px">Preview</th>
        </tr>

        ${Object.entries(Colors).map(([name, value]) => {
          const varName = `--color-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                ${this.getColorOrGradientPreviewTemplate(varName)}
                ${['shade', 'tint', 'subtle', 'contrast'].map(variantName => {
                  const varName = `--color-${value}-${variantName}`;
                  return this.getColorOrGradientPreviewTemplate(varName);
                })}
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderGradientBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th style="width: 220px">Preview</th>
        </tr>

        ${Object.entries(Gradients).map(([name, value]) => {
          const varName = `--${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                ${this.getColorOrGradientPreviewTemplate(varName)}
                ${['shade', 'tint', 'subtle', 'contrast'].map(variantName => {
                  const varName = `--${value}-${variantName}`;
                  return this.getColorOrGradientPreviewTemplate(varName);
                })}
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderScaleBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Scales).map(([name, value]) => {
          const varName = `--scale-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span
                  style=${styleMap({
                    width: `var(${varName})`,
                    height: `var(${varName})`,
                    display: 'inline-block',
                    background: 'var(--color-blue)',
                  })}
                ></span>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderTextBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Texts).map(([name, value]) => {
          const varName = `--text-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span style=${styleMap({'font-size': `var(${varName})`})}
                  >A text</span
                >
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderSpaceBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Spaces).map(([name, value]) => {
          const varName = `--space-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span
                  style=${styleMap({
                    width: `var(${varName})`,
                    height: `var(${varName})`,
                    display: 'inline-block',
                    background: 'var(--color-blue)',
                  })}
                ></span>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderRadiusBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Radiuses).map(([name, value]) => {
          const varName = `--radius-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span
                  style=${styleMap({
                    'border-radius': `var(${varName})`,
                    width: '100px',
                    height: name === 'Pill' ? '35px' : '100px',
                    display: 'inline-block',
                    background: 'var(--color-blue)',
                  })}
                ></span>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderBorderBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Borders).map(([name, value]) => {
          const varName = `--border-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span
                  style=${styleMap({
                    border: `var(${varName}) solid var(--color-blue)`,
                    width: '100px',
                    height: '100px',
                    display: 'inline-block',
                  })}
                ></span>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderRingBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Rings).map(([name, value]) => {
          const varName = `--ring-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td style="padding: 0.25rem">
                <span
                  style=${styleMap({
                    outline: `var(${varName}) solid var(--color-blue)`,
                    'outline-offset': '3px',
                    display: 'inline-block',
                    background: 'var(--color-back-shade)',
                    width: '95px',
                    height: '95px',
                  })}
                ></span>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderLineBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Lines).map(([name, value]) => {
          const varName = `--line-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span
                  style=${styleMap({
                    'line-height': `var(${varName})`,
                    display: 'inline-block',
                    width: '50px',
                  })}
                  >This is a text</span
                >
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderLetterBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Letters).map(([name, value]) => {
          const varName = `--letter-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span style=${styleMap({'letter-spacing': `var(${varName})`})}
                  >This is a text</span
                >
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderWideBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
        </tr>

        ${Object.entries(Wides).map(([name, value]) => {
          const varName = `--wide-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderShadowBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th style="width: 350px">Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Shadows).map(([name, value]) => {
          const varName = `--shadow-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td style="padding: 1rem">
                <span
                  style=${styleMap({
                    'box-shadow': `var(${varName})`,
                    display: 'inline-block',
                    width: '100px',
                    height: '100px',
                  })}
                ></span>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private getColorOrGradientPreviewTemplate(varName: string) {
    return html`
      <span
        style=${styleMap({
          background: `var(${varName})`,
          display: 'inline-block',
          border: '1px solid var(--color-middle)',
          width: '35px',
          height: '35px',
        })}
      ></span>
    `;
  }
}
