import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniBoxComponent} from '../../ui/components/box.js';
import {TiniGridComponent} from '../../ui/components/grid.js';

@Component({
  components: [TiniBoxComponent, TiniGridComponent],
})
export class AppPageUIDevGridComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-grid';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-grid
          areas="'header header header' 'nav content side' 'footer footer footer'"
          columns="auto 1fr auto"
          rows="auto 1fr auto"
          gap="md"
          height="250px"
        >
          <tini-box
            gridArea="header"
            padding="md"
            height="64px"
            background="body-subtle"
            >Header area</tini-box
          >
          <tini-box
            gridArea="nav"
            padding="md"
            width="150px"
            background="body-subtle"
            >Nav area</tini-box
          >
          <tini-box gridArea="content" padding="md" background="body-subtle"
            >Content area</tini-box
          >
          <tini-box
            gridArea="side"
            padding="md"
            width="150px"
            background="body-subtle"
            >Side area</tini-box
          >
          <tini-box
            gridArea="footer"
            padding="md"
            height="64px"
            background="body-subtle"
            >Footer area</tini-box
          >
        </tini-grid>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
