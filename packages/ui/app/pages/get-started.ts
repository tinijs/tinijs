import {html} from 'lit';
import {Page, TiniComponent} from '@tinijs/core';

import {AppCodeComponent} from '../components/code.js';
import {AppSectionComponent} from '../components/section.js';

@Page({
  name: 'app-page-get-started',
  components: [AppCodeComponent, AppSectionComponent],
})
export class AppPageGetStarted extends TiniComponent {
  protected render() {
    return html`
      <h1>Get started</h1>

      <p>There are 3 ways of using Tini UI:</p>
      <ol>
        <li>
          Use the
          <a
            href="https://github.com/tinijs/tinijs/tree/main/packages/cli"
            target="_blank"
            rel="noopener"
            >@tinijs/cli</a
          >
          to create TiniJS applications and manage themes.
        </li>
        <li>Install the specific pre-built packages.</li>
        <li>Use the pre-built packages from a CDN.</li>
      </ol>
      <p>
        <strong>Quick note</strong>: A <strong>theme</strong> is a combination
        of a <code>soul</code> and a <code>skin</code>. You can have one or more
        themes both at the build time and the run time.
      </p>

      <app-section noCodeSample>
        <h2 slot="title">Install & Usage</h2>
        <div slot="content">
          <h3>Option 1 - Use the official CLI</h3>
          <p>
            The CLI is the <strong>recommended</strong> way of using Tini UI. It
            helps you to create new TiniJS projects quickly and manage themes
            easily by providing the <code>tini ui use</code> command.
          </p>
          <p>
            Github repo:
            <a
              href="https://github.com/tinijs/tinijs/tree/main/packages/cli"
              target="_blank"
              rel="noopener"
              >https://github.com/tinijs/tinijs/tree/main/packages/cli</a
            >
          </p>

          <h5>Create a new TiniJS project</h5>
          <p>To create a new TiniJS app, run:</p>
          <app-code
            language="bash"
            code="npx @tinijs/cli new my-app --latest"
          ></app-code>
          <p>
            The skeleton app comes with a default theme
            (<code>bootstrap/light</code>).
          </p>
          <p>To change themes of the app:</p>
          <app-code
            language="bash"
            code="npx tini ui use bootstrap/dark"
          ></app-code>

          <h5>Add Tini UI to an existing project</h5>
          <p>Install the CLI as a dev dependency:</p>
          <app-code language="bash" code="npm i -D @tinijs/cli"></app-code>
          <p>Then run <code>tini ui use</code>:</p>
          <app-code
            language="bash"
            code="npx tini ui use bootstrap/light,dark"
          ></app-code>

          <h5>Register and use components</h5>
          <p>
            To register a component with the
            <a href="https://tinijs.dev" target="_blank" rel="noopener"
              >TiniJS framework</a
            >:
          </p>
          <app-code
            code="import {TiniButtonComponent} from '@ui';

@Component({
  components: [TiniButtonComponent], // register the component
})
export class MyComponent extends TiniComponent {}"
          ></app-code>
          <p>
            To register a component with other frameworks (Vue, Angular, React,
            ...):
          </p>
          <app-code
            code="import {registerComponents} from '@tinijs/core';
import {TiniButtonComponent} from '@ui';

registerComponents([TiniButtonComponent]); // register components"
          ></app-code>
          <p>Finally, use the components:</p>
          <app-code
            code='&lt;tini-button scheme="primary"&gt;A button&lt;/tini-button&gt;'
          ></app-code>

          <h3>Option 2 - Use the pre-built packages</h3>
          <p>
            Pre-built packages are available on NPM. You can install them
            directly to your project. For the demonstration purpose, we will use
            the Bootstrap <code>light</code> skin and the
            <code>button</code> component in the step below.
          </p>
          <app-code
            language="bash"
            code="npm i @tinijs/ui-PACKAGE-ID
    
# For example:
npm i @tinijs/ui-bootstrap"
          ></app-code>
          <p>
            Import a skin or multiple skins (and skin utils) in a global CSS
            file:
          </p>
          <app-code
            code="@import '../node_modules/@tinijs/ui-bootstrap/styles/skins/light.css';
@import '../node_modules/@tinijs/ui-bootstrap/utilities.css';"
          ></app-code>
          <p>
            Set the default theme:
            <code>&lt;body data-theme=&quot;bootstrap/light&quot;&gt;</code>
          </p>
          <p>Import and register components:</p>
          <app-code
            code="import {registerComponents} from '@tinijs/core';
import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button';

registerComponents([TiniButtonComponent]); // register the component"
          ></app-code>
          <p>Finally, use the registered components:</p>
          <app-code
            code='&lt;tini-button scheme="primary"&gt;A button&lt;/tini-button&gt;'
          ></app-code>

          <h3>Option 3 - Pre-built from CDN</h3>
          <p>
            Use a pre-built package directly from a CDN without installation.
          </p>
          <p>
            Import a skin or multiple skins (and skin utils) in a global CSS
            file:
          </p>
          <app-code
            code="@import url('https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/styles/skins/light.css');
@import url('https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/utilities.css');"
          ></app-code>
          <p>
            Set the default theme:
            <code>&lt;body data-theme=&quot;bootstrap/light&quot;&gt;</code>
          </p>
          <p>Include the bundled script in HTML or use ES6 import in JS:</p>
          <app-code
            code='&lt;script src="https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/components/button.bundle.js&apos;;"&gt;&lt;/script&gt;'
          ></app-code>
          <app-code
            code="import 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/components/button.bundle.js';"
          ></app-code>
          <p>Finally, use the components:</p>
          <app-code
            code='&lt;tini-button scheme="primary"&gt;A button&lt;/tini-button&gt;'
          ></app-code>

          <p>For the list of official packages, please see below.</p>
        </div>
      </app-section>

      <app-section noCodeSample>
        <h2 slot="title">Examples</h2>
        <div slot="content">
          <p>
            Here are some examples of using Tini UI with different frameworks.
          </p>
          <ul>
            <li>
              <strong>Vue</strong>:
              <a
                href="https://github.com/tinijs/tinijs/tree/main/consumers/vue"
                target="_blank"
                rel="noopener"
                >https://github.com/tinijs/tinijs/tree/main/consumers/vue</a
              >
            </li>
            <li>
              <strong>Angular</strong>:
              <a
                href="https://github.com/tinijs/tinijs/tree/main/consumers/angular"
                target="_blank"
                rel="noopener"
                >https://github.com/tinijs/tinijs/tree/main/consumers/angular</a
              >
            </li>
            <li>
              <strong>React</strong>:
              <a
                href="https://github.com/tinijs/tinijs/tree/main/consumers/react"
                target="_blank"
                rel="noopener"
                >https://github.com/tinijs/tinijs/tree/main/consumers/react</a
              >
            </li>
            <li>
              <strong>Svelte</strong>:
              <a
                href="https://github.com/tinijs/tinijs/tree/main/consumers/svelte"
                target="_blank"
                rel="noopener"
                >https://github.com/tinijs/tinijs/tree/main/consumers/svelte</a
              >
            </li>
            <li>
              <strong>Tauri (no framework)</strong>:
              <a
                href="https://github.com/tinijs/tinijs/tree/main/consumers/tauri"
                target="_blank"
                rel="noopener"
                >https://github.com/tinijs/tinijs/tree/main/consumers/tauri</a
              >
            </li>
          </ul>
        </div>
      </app-section>

      <app-section noCodeSample>
        <h2 slot="title">Packages</h2>
        <div slot="content">
          <p>Tini UI provides some common packages out of the box.</p>

          <h3>1. Bootstrap</h3>
          <p>
            Reference source:
            <a href="https://getbootstrap.com" target="_blank" rel="noopener"
              >https://getbootstrap.com</a
            >
          </p>
          <p>
            Soul code:
            <a
              href="https://github.com/tinijs/tinijs/tree/main/styles/bootstrap"
              target="_blank"
              rel="noopener"
              >https://github.com/tinijs/tinijs/tree/main/styles/bootstrap</a
            >
          </p>
          <p>Install: <code>npm i @tinijs/ui-bootstrap</code></p>
          <p>
            CDN url:
            <code>https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap</code>
          </p>
          <p>Official skins:</p>
          <ul>
            <li>Light - <code>light</code></li>
            <li>Dark - <code>dark</code></li>
            <li>Retro Light - <code>retro-light</code></li>
            <li>Retro Dark - <code>retro-dark</code></li>
          </ul>

          <h3>And more</h3>
          <p><strong>TODO</strong>: add more souls and skins</p>
          <ul>
            <li>Material</li>
            <li>iOS</li>
            <li>Fluent</li>
            <li>Ant</li>
            <li>Spectrum</li>
            <li>Shoelace</li>
            <li>PrimeNG</li>
            <li>Element Plus</li>
            <li>...</li>
          </ul>
        </div>
      </app-section>
    `;
  }
}
