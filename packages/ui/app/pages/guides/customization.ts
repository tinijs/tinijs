import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

import {AppCodeComponent} from '../../components/code.js';
import {AppSectionComponent} from '../../components/section.js';

@Page({
  name: 'app-page-guides-customization',
  components: [AppCodeComponent, AppSectionComponent],
})
export class AppPageGuidesCustomization extends TiniComponent {
  protected render() {
    return html`
      <h1>Customization</h1>
      <p>
        Use this guide to style your app or create your own souls and skins or
        customize Tini UI components.
      </p>

      <app-section noCodeSample>
        <h2 slot="title">Terminologies</h2>
        <div slot="content">
          <ul>
            <li>
              <strong>Soul</strong>: the feel of a component (design system).
            </li>
            <li><strong>Skin</strong>: the look of a component.</li>
            <li>
              <strong>Theme</strong>: a combination of a soul and a skin,
              format: <code>soul/skin</code>.
            </li>
          </ul>
        </div>
      </app-section>

      <app-section noCodeSample>
        <h2 slot="title">Build skins</h2>
        <div slot="content">
          <p>
            To create your own skins, you can copy the variables from one of the
            skin that belongs to a soul you want to associated, for example
            <a
              href="https://raw.githubusercontent.com/tinijs/ui/main/styles/bootstrap/skins/light.css"
              target="_blank"
              rel="noopener"
              >Bootstrap light skin</a
            >.
          </p>
          <p>
            Or, you can use the <strong>Skin Editor</strong> to have a quick
            start, then copy the code and fine tuned it futher.
          </p>
        </div>
      </app-section>

      <app-section noCodeSample>
        <h2 slot="title">Build souls</h2>
        <div slot="content">
          <p>
            You can create a public soul and share it with the community by
            contributing to the
            <a
              href="https://github.com/tinijs/tinijs"
              target="_blank"
              rel="noopener"
              >Tini UI repo</a
            >.
          </p>
          <p>
            Or, create a private soul by cloning the
            <a
              href="https://github.com/tinijs/tinijs/tree/main/starters/ui-skeleton"
              target="_blank"
              rel="noopener"
              >UI skeleton</a
            >.
          </p>
          <p>
            Please see
            <a
              href="https://github.com/tinijs/tinijs/tree/main/styles/bootstrap"
              target="_blank"
              rel="noopener"
              >the structure</a
            >
            of an official for more detail.
          </p>
        </div>
      </app-section>

      <app-section noCodeSample>
        <h2 slot="title">Customize a component</h2>
        <div slot="content">
          <p>
            To customize a component, you can edit its
            <strong>variables</strong>, provide custom styles targeted its
            <strong>parts</strong> or deep styling via the
            <strong>styleDeep</strong> attribute. Please see the list of
            <strong>variables, parts</strong> and internal
            <strong>classes</strong> at the bottom of a component detail page or
            in the soul source tab.
          </p>

          <p><strong>Using variables</strong></p>
          <p>
            If you app has multiple souls, please make sure to add customization
            for all of them.
          </p>
          <app-code
            .code=${'<tini-button style="--button-background: aqua;"></tini-button>'}
          ></app-code>

          <p><strong>Using parts</strong></p>
          <app-code
            language="css"
            .code=${'tini-button::part(root) {\n  background: aqua;\n}'}
          ></app-code>

          <p><strong>Via the styleDeep attribute</strong></p>
          <app-code
            .code=${'<tini-button styleDeep=".root { background: aqua }"></tini-button>'}
          ></app-code>

          <p><strong>Global options</strong></p>
          <p>Set global options in an TiniJS app.</p>
          <app-code
            .code=${`@App({
  uiOptions: {
    'bootstrap/dark': {
      referGradientScheme: true,
      componentSpecifics: {
        [TiniButtonComponent.componentName]: {
          referGradientSchemeOnHover: true
        }
      }
    }
  }
})
export class MyApp extends TiniComponent {}`}
          ></app-code>
          <p>Set global options in other apps.</p>
          <app-code
            .code=${`import {setUIOptions} from '@tinijs/core';

setUIOptions({
  'bootstrap/dark': {
    referGradientScheme: true,
    componentSpecifics: {
      [TiniButtonComponent.componentName]: {
        referGradientSchemeOnHover: true
      }
    }
  }
})`}
          ></app-code>
        </div>
      </app-section>

      <app-section noCodeSample>
        <h2 slot="title">Variable reference</h2>
        <div slot="content">
          <p>
            Please see the list of
            <a
              href="https://raw.githubusercontent.com/tinijs/ui/main/styles/bootstrap/skins/light.css"
              target="_blank"
              rel="noopener"
              >main CSS variables</a
            >
            and
            <a
              href="https://cdn.jsdelivr.net/npm/@tinijs/ui/utilities.css"
              target="_blank"
              rel="noopener"
              >skin utilities</a
            >.
          </p>
        </div>
      </app-section>
    `;
  }
}
