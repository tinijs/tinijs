import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  TiniElement,
  partAttrMap,
  Colors,
  Scales,
  UnstableStates,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
    unstable: UnstableStates.Experimental,
  };

  /* eslint-disable prettier/prettier */
  @property({type: Object}) declare head: any[];
  @property({type: Object}) declare body: any[][];
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.head?.length)
      throw new Error('Property "head" must be an array.');
    if (!this.body?.length)
      throw new Error('Property "body" must be a 2-dimensional array.');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // root classes parts
    this.extendRootClasses({});
  }

  private parseCell(cell: any) {
    return cell instanceof Object ? cell : ({content: cell} as any);
  }

  protected render() {
    return html`
      <table
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        <thead>
          ${this.renderHeadRow()}
        </thead>
        <tbody>
          ${this.renderBodyRows()}
        </tbody>
      </table>
    `;
  }

  private renderHeadRow() {
    return html`
      <tr>
        ${this.head.map(cell => {
          const {colspan, content} = this.parseCell(cell);
          return html`<th colspan=${ifDefined(colspan)}>${content}</th>`;
        })}
      </tr>
    `;
  }

  private renderBodyRows() {
    return this.body.map(
      row => html`
        <tr>
          ${row.map(cell => {
            const {colspan, content} = this.parseCell(cell);
            return html`<td colspan=${ifDefined(colspan)}>${content}</td>`;
          })}
        </tr>
      `
    );
  }
}
