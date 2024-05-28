import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniTableComponent} from '../../ui/components/table.js';

@Component({
  components: [TiniTableComponent],
})
export class AppPageUIDevTableComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-table';

  protected render() {
    return html`
      <ui-dev-section titleText="Native">
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item 1</td>
              <td>Item 2</td>
              <td>Item 3</td>
            </tr>
            <tr>
              <td><strong>Item 1</strong></td>
              <td><mark>Item 2</mark></td>
              <td><span style="color: red">Item 3</span></td>
            </tr>
            <tr>
              <td>Item 1</td>
              <td>Item 2</td>
              <td>Item 3</td>
            </tr>
          </tbody>
        </table>
      </ui-dev-section>

      <ui-dev-section titleText="Default">
        <tini-table
          .items=${[
            ['Header 1', 'Header 2', 'Header 3'],
            ['Item 1', 'Item 2', 'Item 3'],
            [
              html`<strong>Item 1</strong>`,
              html`<mark>Item 2</mark>`,
              html`<span style="color: red">Item 3</span>`,
            ],
            ['Item 1', 'Item 2', 'Item 3'],
          ]}
        ></tini-table>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
