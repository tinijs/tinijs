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
  name: 'app-page-icons-material-round',
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
export class AppPageIconsMaterialRound extends TiniComponent {
  protected render() {
    return html`
      <app-icon-page
        titleText="Material Round Icons"
        name="material-round"
        packageName="@tinijs/material-round-icons"
        homepage="https://material.io/resources/icons"
      ></app-icon-page>
    `;
  }
}
