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
  name: 'app-page-icons-ionic',
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
export class AppPageIconsIonic extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Ionic Icons"
        name="ionic"
        packageName="@tinijs/ionic-icons"
        homepage="https://ionic.io/ionicons"
      ></app-icon-page>
    `;
  }
}
