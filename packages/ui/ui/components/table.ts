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
    return this.renderPart(
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
      <thead>
        <tr>
          ${this.items[0].map(item => {
            const {content, colspan} = this.processCell(item);
            return html`<th colspan=${ifDefined(colspan)}>${content}</th>`;
          })}
        </tr>
      </thead>
    `;
  }

  private renderTBody() {
    return html`
      <tbody>
        ${this.items.slice(1).map(
          row => html`
            <tr>
              ${row.map(item => {
                const {content, colspan, rowspan} = this.processCell(item);
                return html`<td
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
