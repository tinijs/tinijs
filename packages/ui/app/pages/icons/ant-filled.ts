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
  name: 'app-page-icons-ant-filled',
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
export class AppPageIconsAntFilled extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Ant Filled Icons"
        name="ant-filled"
        packageName="@tinijs/ant-filled-icons"
        homepage="https://ant.design/components/icon"
      ></app-icon-page>
    `;
  }
}
