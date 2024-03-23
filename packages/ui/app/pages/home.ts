import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
} from '@tinijs/ui/bases';

@Page({
  name: 'app-page-home',
  theming: {
    styling: stylingWithBases([
      commonBases,
      headingsBases,
      linkBases,
      textBases,
    ]),
  },
})
export class AppPageHome extends TiniComponent {
  protected render() {
    return html`
      <h1>Tini UI</h1>
      <p>
        The UI system of the TiniJS Framework, built using the
        <a href="https://lit.dev/" target="_blank" rel="noopener">Lit</a>
        library. All components can be used inside a TiniJS app or with other
        frameworks like Vue, React, Angular, Svelte, ... or without any
        framework at all.
      </p>

      <h2>Components</h2>
      <p>
        Tini UI components are web custom elements, each component is built with
        rich functionality and accessibility (todo). Please see detail page of
        each component for detail usage.
      </p>

      <h2>Styles</h2>
      <p>
        Tini UI supports many interface flavors (aka. souls): Bootstrap, ... and
        more to come (Material, iOS, Fluent, Ant, Spectrum, Shoelace, PrimeNG,
        Element Plus, ...). Each soul can be used with one or multiple skins.
        You can create your own skin using the <strong>Skin Editor</strong>.
      </p>

      <h2>Icons</h2>
      <p>
        There are over 25,000 icons to choose from, new packs will be added all
        the time. Your project can have one icon or thousands, the experience
        will remain the same, just install the package and use any icon you
        like.
      </p>
    `;
  }
}
