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
  name: 'app-page-icons-fontawesome-regular',
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
export class AppPageIconsFontawesomeRegular extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Font Awesome Regular Icons"
        name="fontawesome-regular"
        packageName="@tinijs/fontawesome-regular-icons"
        homepage="https://fontawesome.com/icons"
      ></app-icon-page>
    `;
  }
}
