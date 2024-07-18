import {html, css, nothing} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';

import {
  Component,
  TiniComponent,
  Input,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Weights,
  Sizes,
  Spaces,
  Radiuses,
  Borders,
  Outlines,
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
      case 'color':
        return this.renderColorBlock();
      case 'gradient':
        return this.renderGradientBlock();
      case 'font':
        return this.renderFontBlock();
      case 'text':
        return this.renderTextBlock();
      case 'weight':
        return this.renderWeightBlock();
      case 'line':
        return this.renderLineBlock();
      case 'letter':
        return this.renderLetterBlock();
      case 'size':
        return this.renderSizeBlock();
      case 'space':
        return this.renderSpaceBlock();
      case 'radius':
        return this.renderRadiusBlock();
      case 'border':
        return this.renderBorderBlock();
      case 'outline':
        return this.renderOutlineBlock();
      case 'shadow':
        return this.renderShadowBlock();
      case 'wide':
        return this.renderWideBlock();
      case 'breakpoint':
        return this.renderBreakpointBlock();
      default:
        return nothing;
    }
  }

  private renderColorBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Base key</th>
          <th style="width: 60%">Preview</th>
        </tr>

        ${Object.entries(Colors).map(([name, value]) => {
          const varName = `--color-${value}`;
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td>
                <div class="color-preview-container">
                  ${[
                    'hard',
                    '',
                    'soft',
                    'semi',
                    'subtle',
                    'dull',
                    'contrast',
                  ].map(variantName => {
                    const finalName = !variantName
                      ? varName
                      : `--color-${value}-${variantName}`;
                    return this.getColorOrGradientPreviewTemplate(
                      finalName,
                      variantName
                    );
                  })}
                </div>
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
          <th>Base key</th>
          <th style="width: 60%">Preview</th>
        </tr>

        ${Object.entries(Gradients).map(([name, value]) => {
          const varName = `--${value}`;
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td>
                <div class="color-preview-container">
                  ${[
                    'hard',
                    '',
                    'soft',
                    'semi',
                    'subtle',
                    'dull',
                    'contrast',
                  ].map(variantName => {
                    const finalName = !variantName
                      ? varName
                      : `--${value}-${variantName}`;
                    return this.getColorOrGradientPreviewTemplate(
                      finalName,
                      variantName
                    );
                  })}
                </div>
              </td>
            </tr>
          `;
        })}
      </table>
    `;
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

        ${Object.entries(Fonts).map(([name, value]) => {
          const varName = `--font-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span style=${styleMap({'font-family': `var(${varName})`})}
                  >The quick brown fox jumped over the lazy dog.</span
                >
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
                  >Aa</span
                >
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderWeightBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Weights).map(([name, value]) => {
          const varName = `--weight-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td>
                <span style=${styleMap({'font-weight': `var(${varName})`})}
                  >The quick brown fox jumped over the lazy dog.</span
                >
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
                    width: '100px',
                  })}
                  >The quick brown fox jumped over the lazy dog.</span
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
                  >The quick brown fox jumped over the lazy dog.</span
                >
              </td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private renderSizeBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
        </tr>

        ${Object.entries(Sizes).map(([name, value]) => {
          const varName = `--size-${value}`;
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
                    background: '#3b82f6',
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
                <div class="radius-preview">
                  <span
                    style=${styleMap({'border-radius': `var(${varName})`})}
                  ></span>
                  <span
                    style=${styleMap({'border-radius': `var(${varName})`})}
                  ></span>
                </div>
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
                    border: `var(${varName}) solid #3b82f6`,
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

  private renderOutlineBlock() {
    return html`
      <table>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>

        ${Object.entries(Outlines).map(([name, value]) => {
          const varName = `--outline-${value}`;
          const varValue = computedStyle.getPropertyValue(varName);
          return html`
            <tr>
              <td><strong>${name}</strong></td>
              <td><code>${varName}</code></td>
              <td><code>${varValue}</code></td>
              <td style="padding: 0.25rem">
                <span
                  style=${styleMap({
                    outline: `var(${varName}) solid #3b82f6`,
                    'outline-offset': '3px',
                    display: 'inline-block',
                    background: '#ccc',
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

  private renderBreakpointBlock() {
    return html`
      <table>
        <tr>
          <th>Viewport</th>
          <th>Key</th>
          <th>Media query</th>
        </tr>

        ${[
          [
            'X-Small devices (portrait phones)',
            null,
            'default, no media query',
          ],
          ['Small devices (landscape phones)', 'xs', '(min-width: 576px)'],
          ['Medium devices (tablets)', 'sm', '(min-width: 768px)'],
          ['Large devices (desktops)', 'md', '(min-width: 1024px)'],
          ['X-Large devices (large desktops)', 'lg', '(min-width: 1280px)'],
          ['XX-Large devices (larger desktops)', 'xl', '(min-width: 1640px)'],
        ].map(([viewport, key, query]) => {
          return html`
            <tr>
              <td><strong>${viewport}</strong></td>
              <td>${!key ? nothing : html`<code>${key}</code>`}</td>
              <td><code>${query}</code></td>
            </tr>
          `;
        })}
      </table>
    `;
  }

  private getColorOrGradientPreviewTemplate(
    varName: string,
    variantName: string
  ) {
    return html`
      <div
        class=${classMap({
          'color-preview': true,
          schemable: !~['hard', 'soft', 'semi', 'dull'].indexOf(variantName),
        })}
      >
        <span style=${styleMap({background: `var(${varName})`})}></span>
        <strong>${!variantName ? '(base)' : variantName}</strong>
      </div>
    `;
  }

  static styles = css`
    .color-preview-container {
      display: flex;
    }
    .color-preview {
      display: flex;
      flex-direction: column;
      width: calc(100% / 6);
      gap: 3px;
    }
    .color-preview::before {
      display: inline-block;
      content: '-';
      width: 100%;
      text-align: center;
      font-size: 10px;
      visibility: hidden;
      color: var(--color-medium);
    }
    .color-preview.schemable::before {
      visibility: visible;
      content: 'schemable';
    }
    .color-preview span {
      display: inline-block;
      border: 1px solid var(--color-body-soft);
      width: 100%;
      height: 35px;
    }
    .color-preview strong {
      width: 100%;
      text-align: center;
      font-size: 12px;
    }

    .radius-preview {
      display: flex;
      gap: 1rem;
    }
    .radius-preview span:first-child {
      width: 80px;
      height: 80px;
    }
    .radius-preview span:last-child {
      width: 160px;
      height: 80px;
    }
    .radius-preview span {
      background: #3b82f6;
    }
  `;
}
