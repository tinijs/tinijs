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
  name: 'app-page-icons-bootstrap',
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
export class AppPageIconsBootstrap extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Bootstrap Icons"
        name="bootstrap"
        packageName="@tinijs/bootstrap-icons"
        homepage="https://icons.getbootstrap.com/"
      ></app-icon-page>
    `;
  }
}
