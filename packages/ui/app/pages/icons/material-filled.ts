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
  name: 'app-page-icons-material-filled',
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
export class AppPageIconsMaterialFilled extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Material Filled Icons"
        name="material-filled"
        packageName="@tinijs/material-filled-icons"
        homepage="https://material.io/resources/icons"
      ></app-icon-page>
    `;
  }
}
