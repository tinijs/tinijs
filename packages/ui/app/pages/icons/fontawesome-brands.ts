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
  name: 'app-page-icons-fontawesome-brands',
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
export class AppPageIconsFontawesomeBrands extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Font Awesome Brands Icons"
        name="fontawesome-brands"
        packageName="@tinijs/fontawesome-brands-icons"
        homepage="https://fontawesome.com/icons"
      ></app-icon-page>
    `;
  }
}
