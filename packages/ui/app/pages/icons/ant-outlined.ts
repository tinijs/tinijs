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
  name: 'app-page-icons-ant-outlined',
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
export class AppPageIconsAntOutlined extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Ant Outlined Icons"
        name="ant-outlined"
        packageName="@tinijs/ant-outlined-icons"
        homepage="https://ant.design/components/icon"
      ></app-icon-page>
    `;
  }
}
