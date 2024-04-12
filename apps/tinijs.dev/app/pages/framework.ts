import {html, css} from 'lit';

import {Page, TiniComponent, Colors, Scales} from '@tinijs/core';

import {TiniMessageComponent} from '@tinijs/ui-bootstrap/components/message.js';
import {TiniCodeComponent} from '@tinijs/ui-bootstrap/components/code.js';
import {TiniImageComponent} from '@tinijs/ui-bootstrap/components/image.js';
import {TiniFigureComponent} from '@tinijs/ui-bootstrap/components/figure.js';

@Page({
  name: 'app-page-framework',
  components: [
    TiniMessageComponent,
    TiniCodeComponent,
    TiniImageComponent,
    TiniFigureComponent,
  ],
})
export class AppPageFramework extends TiniComponent {
  protected render() {
    return html`
      <div
        style="
          margin: auto;
          width: 100vw;
          max-width: var(--wide-md);
          padding: var(--size-space-2x);
        "
      >
        <h2 style="margin-top: 0">The TiniJS framework</h2>

        <p>
          <strong>Status note</strong>: Currently, I'm working on the foundation
          of the project as a whole. For the <em>source code</em> and the
          <em>roadmap</em>, please see at
          <a
            href="https://github.com/tinijs/tinijs?tab=readme-ov-file#version-10"
            target="_blank"
            >https://github.com/tinijs/tinijs</a
          >.
        </p>
        <p>
          If you want to use the experimental version still, please use the
          version <code>0.16.0</code> at
          <a href="https://github.com/tinijs/core" target="_blank"
            >https://github.com/tinijs/core</a
          >.
        </p>

        <h3>The story</h3>
        <p>
          When talking about another Javascript framework, you may laugh and
          think that there are tons of proven options out there why bother
          creating another one? 🤷‍♂️
        </p>
        <p>Let me share with you my personal story.</p>
        <tini-figure>
          <tini-image
            fluid
            src=${new URL(
              '../assets/framework/javascript-frameworks-meme.jpeg',
              import.meta.url
            ).href}
          ></tini-image>
          <span slot="caption-bottom"
            >Source:
            <a
              href="https://devs.lol/meme/every-day-there-is-a-new-javascript-framework-86"
              target="_blank"
              >devs.lol</a
            ></span
          >
        </tini-figure>
        <p>
          Joke aside, I'm not an expert in Javascript, but for a little bit
          about my background so you may know my anoyance story regarding
          front-end web development. I used to be an Angular developer back in
          the version 1 of it and currently working mainly with Vue and
          accasionally jQuery. I had these <strong>3 PITA</strong> (Pain In The
          *beep*) experience which motivated me to experiment with the TiniJS
          framework.
        </p>
        <p>
          <strong
            >PITA #1 - BUILDING A GOOD UI/UX IS HARD, IT IS TEDIOUS AND TIME
            CONSUMING!</strong
          >
        </p>
        <p>
          Back in around 2010, there are two distint kinds of websites: the one
          with a ton of <strong>texts, links, barely some images</strong> here
          and there; and the others are with overwhelmed graphical elements such
          as
          <strong>GIF images, Flash background, rainbown cursors,</strong> ...
        </p>
        <p>
          People tend to have the stereo type that back-end is hard and
          front-end is easy. It's kinda true, but not entirely, I mean, who am I
          to blame, right? Because with a little bit knowledge of HTML and CSS,
          you can pretty much build a static website very easily. But, in order
          to build a good UI/UX, there is much more to be considered. You have
          to be a master of many more things, and they are not easy at all!
        </p>
        <tini-figure>
          <tini-image
            fluid
            src=${new URL(
              '../assets/framework/frontend-is-not-easy.png',
              import.meta.url
            ).href}
          ></tini-image>
          <span slot="caption-bottom">Front-end development is not easy!</span>
        </tini-figure>
        <p>
          <strong
            >PITA #2 - CSS FRAMEWORKS ARE LACK OF FUNCTIONALITIES AND
            CUSTOMIZING THEM IS NOT VERY EFFICIENT!</strong
          >
        </p>
        <p>
          People realized the difficulty of front-end development and started to
          build CSS frameworks to help with the problem. Bootstrap is one of the
          pioneers of this trend, other popular ones are: Foundation, Semantic
          UI, Bulma, Skeleton, Pure CSS, ... Those CSS frameworks are great, no
          doubt about that, they help us to build a good UI/UX faster, but they
          also have their own limitations.
        </p>
        <p>
          First, despite the fact that all the frameworks provide certain ways
          to customize the style, but overall, I feel that it is not very easy
          and reusable to me.
        </p>
        <tini-figure>
          <tini-image
            fluid
            src=${new URL(
              '../assets/framework/customize-ui-library.webp',
              import.meta.url
            ).href}
          ></tini-image>
          <span slot="caption-bottom"
            >Source:
            <a
              href="https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268"
              target="_blank"
              >Nir Ben-Yair</a
            ></span
          >
        </tini-figure>
        <p>
          Second, is the lack of functionalities. I mean, they are mainly CSS,
          they provide some functions, usually as plugins to JQuery. Most of the
          cases you have to write your own Javascript to make a feature works.
        </p>
        <p>
          <strong
            >PITA #3 - JAVASCRIPT FRAMEWORKS ARE OVERWHELMING AND SOMEWHAT
            REDUNDANT!</strong
          >
        </p>
        <p>
          Enter the modern era of web development, Javascript frameworks are the
          new trend. But the problem is that we have so many choices, it is both
          a blessing and a curse. They provide great functions but not very
          interoperable, you can't just take a piece of code from one framework
          and use it in another. Especially, creating a UI system with separated
          packages for specific frameworks is a very daunting task.
        </p>
        <tini-figure>
          <tini-image
            fluid
            src=${new URL(
              '../assets/framework/new-javascript-framework.png',
              import.meta.url
            ).href}
          ></tini-image>
          <span slot="caption-bottom"
            >Source:
            <a href="https://tsh.io/blog/svelte-framework/" target="_blank"
              >tsh.io</a
            ></span
          >
        </tini-figure>
        <p>
          Every time I start a project or do some kind of front-end work, the
          fragmentation of front-end web is somewhat painful to me. That seems
          to be the way of life, there is no avoid, isn't it? Please don't get
          me wrong, I'm not against any framework, I tend to choose solutions
          and not technologies, so if it works for you, just go with it. But I
          wonder to myself is there any way to somehow unify or lessen the gap
          in front-end development experience? 🤔
        </p>
        <p><strong>INTRODUCING THE TINIJS FRAMEWORK!</strong></p>
        <p>
          That is the reason why I experiment with the TiniJS framework for a
          while. It is a collection of tools for developing web/desktop/mobile
          apps using the native Web Component technology, based on the
          <a href="https://lit.dev/" target="_blank">Lit</a> library. Thank you
          the <a href="https://lit.dev/" target="_blank">Lit</a> team for
          creating a great tool assists us working with standard Web Component
          easier.
        </p>
        <p>
          It is aimed to be as much standard, small and versatile as possible.
          Not really comparable to other frameworks and meta-frameworks, but
          overall it has similar capabilities and also in the other hand, key
          differences. It is both a replacement choice and a complement to other
          frameworks. You may use TiniJS to build a various type of apps:
          landing pages, SPAs, PWAs, desktop apps, mobile apps, ...
          Feature-wise, anything works in Javascript should work fine in a
          TiniJS app.
        </p>
        <p>OK, enough talking, show me some actions! 👌</p>

        <h3>Get started</h3>
        <p>
          <strong>Tini</strong> (or "<a
            href="https://translate.google.com/?sl=vi&tl=en&text=t%C3%AD%20n%E1%BB%8B&op=translate"
            target="_blank"
            >Tí nị</a
          >" in Vietnamese - meaning something very small in an adorable way).
        </p>
        <p>
          To quickly create a TiniJS project, you can use the
          <a href="/cli">CLI</a> to initialize a template.
        </p>
        <tini-code
          language="bash"
          content="npx @tinijs/cli new my-app -l"
        ></tini-code>
        <p>
          <tini-message scheme=${Colors.TertiarySubtle}
            >Default to the
            <a href="https://github.com/tinijs/bare-starter" target="_blank"
              >Bare</a
            >
            template, flag <code>-l</code> mean using the latest released
            tag.</tini-message
          >
        </p>
        <p>
          In the future, I would like to provide several starter templates. You
          can also create your own templates and share them with the community
          or for your own private use. Currently, these templates available:
        </p>
        <ol>
          <li>
            <a href="https://github.com/tinijs/bare-starter" target="_blank"
              >Bare</a
            >
            (default) - minimum structure of a TiniJS app.
          </li>
          <li>
            <a href="https://github.com/tinijs/blank-starter" target="_blank"
              >Blank</a
            >
            (flag <code>-t blank</code>) - includes router, state management,
            meta tags management and the
            <a href="/ui">Bootstrap theme family</a>.
          </li>
        </ol>
        <p>
          Now, inside the project you can run <code>npm run dev</code> to start
          the development server. You may start development by edit the file
          <code>./app/app.ts</code> which is the root component of the app. For
          how to work with custom elements using Lit please visit
          <a href="https://lit.dev/docs/components/overview/" target="_blank"
            >Lit component</a
          >, there are some differents between <code>LitElement</code> and
          <code>TiniComponent</code>, but for now you can modify
          <code>static styles</code> and <code>render()</code> as you would
          normally do.
        </p>
        <p>
          To build the distribution, run <code>npm run build</code> and
          optionally run <code>npm run preview</code> to preview the production
          build. You can now deply the <code>.output</code> folder to any static
          host.
        </p>
        <p>
          You may want to check these examples to see more detail how a TiniJS
          app works.
        </p>
        <ul>
          <li>
            Homepage -
            <a
              href="https://github.com/tinijs/tinijs/tree/main/apps/tinijs.dev"
              target="_blank"
              >https://github.com/tinijs/tinijs/tree/main/apps/tinijs.dev</a
            >
          </li>
          <li>
            To Do App -
            <a
              href="https://github.com/tinijs/tinijs/tree/main/examples/todo"
              target="_blank"
              >https://github.com/tinijs/tinijs/tree/main/examples/todo</a
            >
          </li>
        </ul>

        <h3>Project structure</h3>
        <p>
          A TiniJS project uses an universal folder structure to accomodate a
          full-stack workflow and interoprable with other frameworks and
          libraries. The main home of the app is inside the
          <code>app</code> folder (the folder is configurable).
        </p>
        <p>
          Inside the <code>app</code> folder, files are organize based its type
          and similar characteristic. Below is the suggested chart:
        </p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">Mandatory files, folders</td>
            </tr>
            <tr>
              <td><code>tini.config.ts</code></td>
              <td>The main configuration of a Tini project</td>
            </tr>
            <tr>
              <td><code>app/index.html</code></td>
              <td>The app entry</td>
            </tr>
            <tr>
              <td><code>app/app.ts</code></td>
              <td>The <code>app-root</code> component</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td colspan="2">Optional files, folders</td>
            </tr>
            <tr>
              <td><code>app/routes.ts</code></td>
              <td>Define routes for the Router</td>
            </tr>
            <tr>
              <td><code>app/providers.ts</code></td>
              <td>Define providers for later injection</td>
            </tr>
            <tr>
              <td><code>app/assets</code></td>
              <td>The assets folder</td>
            </tr>
            <tr>
              <td><code>app/public</code></td>
              <td>The public folder (copied as is)</td>
            </tr>
            <tr>
              <td><code>app/types</code></td>
              <td>Type definitions</td>
            </tr>
            <tr>
              <td><code>app/configs</code></td>
              <td>Client app configuration based on environments</td>
            </tr>
            <tr>
              <td><code>app/components</code></td>
              <td>Re-usable components</td>
            </tr>
            <tr>
              <td><code>app/pages</code></td>
              <td>Pages for routing purpose</td>
            </tr>
            <tr>
              <td><code>app/layouts</code></td>
              <td>Layouts for pages</td>
            </tr>
            <tr>
              <td><code>app/utils</code></td>
              <td>Importable/injectable utility functions</td>
            </tr>
            <tr>
              <td><code>app/services</code></td>
              <td>Importable/injectable services</td>
            </tr>
            <tr>
              <td><code>app/consts</code></td>
              <td>Any constants</td>
            </tr>
            <tr>
              <td><code>app/classes</code></td>
              <td>Constructable classes</td>
            </tr>
            <tr>
              <td><code>app/partials</code></td>
              <td>Re-usable <code>html\`\`</code> partials</td>
            </tr>
            <tr>
              <td><code>app/stores</code></td>
              <td>State management stores</td>
            </tr>
          </tbody>
        </table>

        <h3>Add components</h3>
        <p>
          To create re-usable components, run the <code>generate</code> command.
        </p>
        <tini-code
          language="bash"
          content="npx tini generate component <name>"
        ></tini-code>
        <p>
          A component in TiniJS apps looks like below, very similar to a Lit
          component.
        </p>
        <tini-code
          language="typescript"
          content=${`import {html, css} from 'lit';
import {Component, TiniComponent} from '@tinijs/core';

@Component()
export class AppXXXComponent extends TiniComponent {
  static readonly defaultTagName = 'app-xxx';

  static styles = css\`\`;

  protected render() {
    return html\`\`;
  }
}`}
        ></tini-code>
        <p>
          To make components available, you must register them either globally
          via the <code>@App()</code> decorator or locally via
          <code>@Component()</code> or <code>@Page()</code> or
          <code>@Layout()</code> decorators.
        </p>
        <tini-code
          language="typescript"
          content=${` // to register components globally in app/app.ts
import {AppXXXComponent} from './components/xxx.js';

@App({
  components: [AppXXXComponent]
})
export class AppRoot extends TiniComponent {}`}
        ></tini-code>
        <p>Or</p>
        <tini-code
          language="typescript"
          content=${` // to register components locally
import {AppXXXComponent} from '../components/xxx.js';

@Component|Page|Layout({
  components: [AppXXXComponent]
})
export class ComponentOrPageOrLayout extends TiniComponent {}`}
        ></tini-code>
        <p>
          After register, you can use the tag
          <code>&lt;app-xxx&gt;&lt;/app-xxx&gt;</code> as it is a native HTML
          tag.
        </p>
        <p>
          Components usually has <strong>properties</strong>,
          <strong>events</strong> and <strong>internal states</strong>, use the
          below decorators for such purposes.
        </p>
        <tini-code
          language="typescript"
          content=${`import {Reactive, Input, Output, EventEmitter} from '@tinijs/core';

@Component()
export class AppXXXComponent extends TiniComponent {

  @Reactive() state?: string; // same as @state()

  @Input() property?: string; // same as @property()

  @Output() customEvent!: EventEmitter<string>;

  protected render() {
    return html\`<button @click=\${() => this.customEvent.emit('a custom payload')}></button>\`;
  }

}`}
        ></tini-code>

        <h3>Provide and inject</h3>
        <p>
          Dependencies are functions or services or constants which is used in
          components or pages. You can either
          <strong>import them directly</strong> or
          <strong>lazy-load them</strong> via the lazy-DI mechanism.
        </p>
        <p>
          You may quickly generate utils or services or constants using the
          <code>generate</code> command.
        </p>
        <tini-code
          language="bash"
          content="npx tini generate service|util|const <name>"
        ></tini-code>
        <p>
          Beside import dependencies directly, you can also provide them at the
          app level.
        </p>
        <tini-code
          language="typescript"
          content=${`@App({
  providers: {
    myService: () => import('./services/my-service.js'), // default export
    yourService: () => import('./services/your-service.js').then(m => m.YourService), // named export
    theirService: {
      provider: () => import('./services/their-service.js'),
      deps: ['myService', () => 'a value'] // with dependencies
    }
  }
})
export class AppRoot extends TiniComponent {}`}
        ></tini-code>
        <p>
          And inject them into components or pages. Please not that injected
          dependencies started to available from <code>onInit()</code> lifecycle
          hook.
        </p>
        <tini-code
          language="typescript"
          content=${`import {Inject} from '@tinijs/core';

import {MyService} from '../services/my-service.js';

@Page({
  name: 'app-page-xxx',
})
export class AppPageXXX extends TiniComponent {
  @Inject() myService!: MyService;

  async onInit() {
    await this.myService.doSomething();
  }
}`}
        ></tini-code>

        <h3>Add Router</h3>
        <tini-message scheme=${Colors.TertiarySubtle}
          >Router is available with the
          <a href="https://github.com/tinijs/blank-starter" target="_blank"
            >Blank</a
          >
          template. For the purpose of introduction, I will set it up
          manually.</tini-message
        >
        <p><strong>Step 1</strong>: Install the package</p>
        <tini-code language="bash" content="npm i @tinijs/router"></tini-code>
        <p><strong>Step 2</strong>: Define routes</p>
        <tini-code
          language="typescript"
          content=${`import type {Route} from '@tinijs/router';

export const routes: Route[] = [
  {
    path: '',
    component: 'app-page-home'
  },
  // lazy load
  {
    path: 'contact',
    component: 'app-page-contact',
    action: () => import('./pages/contact.js')
  },
  // nested & layout
  {
    path: 'admin',
    component: 'app-layout-admin',
    children: [
      {
        path: '',
        component: 'app-page-admin',
        action: () => import('./pages/admin.js')
      }
    ]
  }
];`}
        ></tini-code>
        <p><strong>Step 3</strong>: Init the Router and register routes</p>
        <tini-code
          language="typescript"
          content=${`import {createRouter} from '@tinijs/router';

import {routes} from './routes.js';

@App({})
export class AppRoot extends TiniComponent {
  readonly router = createRouter(routes, {linkTrigger: true});

  protected render() {
    return html\`<router-outlet .router=$\{this.router}></router-outlet>\`;
  }
}`}
        ></tini-code>
        <p>
          To navigate between pages, just use the <code>a</code> tag, for
          example
          <code
            >&lt;a href=&quot;/contact&quot;&gt;To the contact
            page&lt;/a&gt;</code
          >.
        </p>

        <h3>Add State management</h3>
        <tini-message scheme=${Colors.TertiarySubtle}
          >State management is available with the
          <a href="https://github.com/tinijs/blank-starter" target="_blank"
            >Blank</a
          >
          template. For the purpose of introduction, I will set it up
          manually.</tini-message
        >
        <p><strong>Step 1</strong>: Install the package</p>
        <tini-code language="bash" content="npm i @tinijs/store"></tini-code>
        <p><strong>Step 2</strong>: Create a store</p>
        <tini-code
          language="typescript"
          content=${`import {createStore} from '@tinijs/store';

export const mainStore = createStore({
  foo: 'bar'
});`}
        ></tini-code>
        <p><strong>Step 3</strong>: Access, subscribe and mutate states</p>
        <p>Access a state:</p>
        <tini-code
          language="typescript"
          content=${`import {mainStore} from './stores/main.js';

const foo = mainStore.foo;`}
        ></tini-code>
        <p>Subscribe to a state:</p>
        <tini-code
          language="typescript"
          content=${`import {Subscribe} from '@tinijs/store';

import {mainStore} from './stores/main.js';

@Component()
export class AppXXXComponent extends TiniComponent {

  // 'this.foo' will be updated when 'mainStore.foo' changes
  // it is reactive by default
  @Subscribe(mainStore) foo = mainStore.foo;

  // use a different variable name
  @Subscribe(mainStore, 'foo') xyz = mainStore.foo;

  // to turn of reactive
  // set the third argument to false
  @Subscribe(mainStore, null, false) foo = mainStore.foo;

  // or subscribe manually
  // NOTE: remember to unsubscribe when the component is destroyed
  onInit() {
    this.unsubscribeFoo = mainStore.subscribe('foo', value => {
      // do something
    });
  }
  onDestroy() {
    this.unsubscribeFoo();
  }

}`}
        ></tini-code>
        <p>Mutate a state:</p>
        <tini-code
          language="typescript"
          content=${`import {mainStore} from './stores/main.js';

// assign a new value
mainStore.foo = 'bar2';

// or, using the 'commit' method
mainStore.commit('foo', 'bar3');`}
        ></tini-code>

        <h3>Add UI</h3>
        <tini-message scheme=${Colors.TertiarySubtle}
          >UI is available with the
          <a href="https://github.com/tinijs/blank-starter" target="_blank"
            >Blank</a
          >
          template. For the purpose of introduction, I will set it up
          manually.</tini-message
        >
        <p><strong>Step 1</strong>: Install the package</p>
        <tini-code
          language="bash"
          content="npm i @tinijs/ui-bootstrap"
        ></tini-code>
        <p><strong>Step 2</strong>: Init UI (select one or more skins)</p>
        <tini-code
          language="typescript"
          content=${`import {setupUI, bootstrapLightSkin} from '@tinijs/ui-bootstrap';

@App({})
export class AppRoot extends TiniComponent {
  readonly ui = setupUI({
    skins: {
      'bootstrap/light': bootstrapLightSkin
    },
  });
}`}
        ></tini-code>
        <p><strong>Step 3</strong>: Use components, icons, ...</p>
        <tini-code
          language="typescript"
          content=${`import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button.js';

@Page({
  components: [TiniButtonComponent]
})
export class AppPageXXX extends TiniComponent {
  protected render() {
    return html\`<tini-button scheme="primary">Click me</tini-button>\`;
  }
}`}
        ></tini-code>

        <h3>Create PWA apps</h3>
        <p>
          <strong>COMING SOON</strong>: I'm working on migrating the
          <code>@tinijs/pwa</code> package, turn a TiniJS app into a PWA with
          one command.
        </p>

        <h3>Create Desktop and Mobile apps</h3>
        <p>
          <strong>TODO</strong>: write the recipe for adding
          <a
            href="https://beta.tauri.app/blog/tauri-2-0-0-beta/"
            target="_blank"
            >Tauri 2.0</a
          >
          to turn a TiniJS app into a desktop or/and mobile app.
        </p>

        <h3>Backend and Modules</h3>
        <p>
          <strong>TODO</strong>: implement the
          <code>@tinijs/content</code> module, a file-based content management
          system.
        </p>
        <p>
          <strong>TODO</strong>: implement the
          <code>@tinijs/server</code> module, for server routes and API routes
          and semi-SSR.
        </p>
        <p>
          <strong>TODO</strong>: write recipes for adding backend solutions,
          such as: Firebase, Supabase, Strapi, tRPC, Nest, Axum, ...
        </p>
      </div>
    `;
  }

  static styles = css`
    tini-message::part(root) {
      font-size: var(--size-text-0_8x);
      padding: var(--size-space-0_5x);
    }

    tini-figure::part(caption-bottom) {
      color: var(--color-medium);
      font-size: var(--size-text-0_8x);
    }

    table {
      border-collapse: collapse;
      width: 100%;
      text-align: left;
      background: var(--color-background);
      color: var(--color-foreground);
    }
    table tr {
      margin: 0;
      padding: 0;
    }
    table th {
      font-weight: 700;
    }
    table th,
    table td {
      padding: var(--size-space-0_5x);
      border-bottom: var(--size-border) solid var(--color-background-shade);
    }
  `;
}
