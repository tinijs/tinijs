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
  name: 'app-page-icons-ant-twotone',
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
export class AppPageIconsAntTwotone extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        noVariants
        titleText="Ant Twotone Icons"
        name="ant-twotone"
        packageName="@tinijs/ant-twotone-icons"
        homepage="https://ant.design/components/icon"
      ></app-icon-page>
    `;
  }
}
