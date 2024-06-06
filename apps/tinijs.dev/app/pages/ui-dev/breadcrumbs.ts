import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {
  TiniBreadcrumbsComponent,
  type BreadcrumbsItem,
} from '../../ui/components/breadcrumbs.js';

const ITEMS: BreadcrumbsItem[] = [
  {content: 'Home', href: '#home'},
  {content: 'Library', href: '#library'},
  {content: 'Data', href: '#data'},
];

@Component({
  components: [TiniBreadcrumbsComponent],
})
export class AppPageUIDevBreadcrumbsComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-breadcrumbs';

  protected render() {
    return html`
      <ui-dev-section titleText="Defaults">
        <tini-breadcrumbs .items=${[ITEMS[0]]}></tini-breadcrumbs>
        <tini-breadcrumbs .items=${[ITEMS[0], ITEMS[1]]}></tini-breadcrumbs>
        <tini-breadcrumbs .items=${ITEMS}></tini-breadcrumbs>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
