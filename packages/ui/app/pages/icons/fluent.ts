import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
} from '@tinijs/ui/bases';

import {AppIconPageComponent} from '../../components/icon-page';

@Page({
  name: 'app-page-icons-fluent',
  components: [AppIconPageComponent],
  theming: {
    styling: stylingWithBases([
      commonBases,
      headingsBases,
      linkBases,
      textBases,
    ]),
  },
})
export class AppPageIconsFluent extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Fluent Icons"
        name="fluent"
        packageName="@tinijs/fluent-icons"
        homepage="https://aka.ms/fluentui-system-icons"
      ></app-icon-page>
    `;
  }
}
