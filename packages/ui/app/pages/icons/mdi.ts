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
  name: 'app-page-icons-mdi',
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
export class AppPageIconsMDI extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="MDI Icons"
        name="mdi"
        packageName="@tinijs/mdi-icons"
        homepage="https://pictogrammers.com/library/mdi"
      ></app-icon-page>
    `;
  }
}
