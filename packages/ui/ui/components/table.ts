import {
  html,
  css,
  type PropertyValues,
  type TemplateResult,
  type CSSResult,
} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  TiniElement,
  partAttrMap,
  ElementParts,
  createStyleBuilder,
} from '@tinijs/core';

export enum TableParts {
  Main = ElementParts.Main,
  THead = 'thead',
  TBody = 'tbody',
  TR = 'tr',
  TH = 'th',
  TD = 'td',
}

export type TableItem = string | TemplateResult | TableCell;

export interface TableCell {
  content: string | TemplateResult;
  colspan?: number;
  rowspan?: number;
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Array}) items!: TableItem[][];
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.items?.length)
      throw new Error('Property "items" must be a 2-dimensional array.');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // main classes parts
    this.extendMainClasses({});
  }

  private processCell(item: TableItem) {
    return (
      typeof item === 'string' || !(item as any).content
        ? {content: item}
        : item
    ) as TableCell;
  }

  protected render() {
    return this.partRender(
      TableParts.Main,
      mainChildren => html`
        <table
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${this.renderTHead()} ${this.renderTBody()} ${mainChildren()}
        </table>
      `
    );
  }

  private renderTHead() {
    return html`
      <thead class=${TableParts.THead} part=${TableParts.THead}>
        <tr class=${TableParts.TR} part=${TableParts.TR}>
          ${this.items[0].map(item => {
            const {content, colspan} = this.processCell(item);
            return html`<th
              class=${TableParts.TH}
              part=${TableParts.TH}
              colspan=${ifDefined(colspan)}
            >
              ${content}
            </th>`;
          })}
        </tr>
      </thead>
    `;
  }

  private renderTBody() {
    return html`
      <tbody class=${TableParts.TBody} part=${TableParts.TBody}>
        ${this.items.slice(1).map(
          row => html`
            <tr class=${TableParts.TR} part=${TableParts.TR}>
              ${row.map(item => {
                const {content, colspan, rowspan} = this.processCell(item);
                return html`<td
                  class=${TableParts.TD}
                  part=${TableParts.TD}
                  colspan=${ifDefined(colspan)}
                  rowspan=${ifDefined(rowspan)}
                >
                  ${content}
                </td>`;
              })}
            </tr>
          `
        )}
      </tbody>
    `;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [css``, outputs.statics]);
