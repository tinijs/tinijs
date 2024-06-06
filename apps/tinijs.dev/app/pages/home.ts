import {html, css} from 'lit';

import {Page, TiniComponent, Colors, Gradients} from '@tinijs/core';
import {UseRouter, Router} from '@tinijs/router';
import {TiniTextComponent} from '../ui/components/text.js';
import {TiniButtonComponent} from '../ui/components/button.js';
import {TiniEmbedComponent} from '../ui/components/embed.js';

import {IconHeartComponent} from '../icons/heart.js';

import {LOGO_URL} from '../consts/common.js';

@Page({
  name: 'app-page-home',
  components: [
    TiniTextComponent,
    TiniButtonComponent,
    TiniEmbedComponent,
    IconHeartComponent,
  ],
})
export class AppPageHome extends TiniComponent {
  @UseRouter() router!: Router;

  protected render() {
    return html`
      <section class="featured">
        <div class="logo">
          <img src=${LOGO_URL} alt="TiniJS Logo" />
        </div>

        <div class="headline">
          <h2 style="margin-bottom: 0">
            <tini-text size="xl-3" weight="bold" color=${Gradients.Primary}
              >Tini</tini-text
            ><br />A Javascript framework
          </h2>
          <p>
            A small, fast and interoperable framework for building
            <strong>Landing Page</strong>, <strong>SPA</strong>,
            <strong>PWA</strong>, <strong>Desktop</strong> and
            <strong>Mobile</strong> apps.
          </p>
          <div class="actions">
            <tini-button
              scheme=${Colors.Primary}
              @click=${() => this.router.go('/framework')}
              >Get started</tini-button
            >
            <tini-button
              scheme=${Colors.Medium}
              @click=${() =>
                open('https://github.com/tinijs/tinijs', '_blank')?.focus()}
              >View on Github</tini-button
            >
          </div>
        </div>
      </section>

      <section class="members">
        <ul>
          <li @click=${() => this.router.go('/framework')}>
            <div class="icon">🏗️</div>
            <h3>Framework</h3>
            <p>
              A conventional structure with router, state management, extendable
              modules and more.
            </p>
          </li>

          <li @click=${() => this.router.go('/ui')}>
            <div class="icon">🎨</div>
            <h3>UI</h3>
            <p>
              A collection of reusable components, blocks, layouts, pages, ...
              with many design flavors.
            </p>
          </li>

          <li @click=${() => this.router.go('/module')}>
            <div class="icon">📦</div>
            <h3>Modules</h3>
            <p>
              Installable modules for adding more features to your app, such as
              Content, PWA and more.
            </p>
          </li>

          <li @click=${() => this.router.go('/toolbox')}>
            <div class="icon">🧰</div>
            <h3>Toolbox</h3>
            <p>
              A unified place for commonly used tools from a wide range of
              category.
            </p>
          </li>

          <li @click=${() => this.router.go('/module/content')}>
            <div class="icon">📝</div>
            <h3>Content</h3>
            <p>
              File-based content management system without a need of server and
              database.
            </p>
          </li>

          <li @click=${() => this.router.go('/module/server')}>
            <div class="icon">🎛️</div>
            <h3>Server</h3>
            <p>
              An optional web server for server/API routes and other server side
              stuffs.
            </p>
          </li>

          <li @click=${() => this.router.go('/cli')}>
            <div class="icon">⌨️</div>
            <h3>CLI</h3>
            <p>
              An unified CLI tool for working with TiniJS apps and expandable to
              support other automation tasks.
            </p>
          </li>
        </ul>
      </section>

      <section class="try">
        <div class="title">
          <h2>Try it out!</h2>
          <p>
            Here is <strong>An Example Photo Gallery App</strong> to demonstrate
            some aspects of an TiniJS app, such as:
            <strong>The structure, Router, State Management</strong> and
            <strong>the UI system</strong>.
          </p>
        </div>

        <tini-embed ratio="4:3">
          <iframe
            src="https://stackblitz.com/edit/try-tinijs?ctl=1&embed=1&file=app%2Fapp.ts"
            title="Try TiniJS"
            frameborder="0"
          ></iframe>
        </tini-embed>

        <p>
          For more detail, please see the <a href="/framework">Get Started</a>.
        </p>
      </section>

      <section class="sponsors">
        <div class="foreword">
          <icon-heart></icon-heart>
          <p>
            The <strong>Tini Project</strong> is free and open source. It's
            currently at the very early stage, please consider sponsor me if you
            see it's useful.
          </p>
        </div>

        <div class="special-sponsors">
          <div class="title">Special Sponsors</div>
          <ul>
            <li class="item-1"><a href="javascript:void(0)">Your Logo</a></li>
            <li class="item-2"><a href="javascript:void(0)">Your Logo</a></li>
            <li class="item-3"><a href="javascript:void(0)">Your Logo</a></li>
          </ul>
        </div>

        <div class="actions">
          <tini-button
            scheme=${Gradients.Primary}
            @click=${() =>
              open(
                'mailto:hello@tinijs.dev?subject=Sponsor Tini&body=I want to sponsor the TiniJS project.',
                '_blank'
              )?.focus()}
            >Sponsor Tini</tini-button
          >
        </div>
      </section>
    `;
  }

  static styles = css`
    section {
      margin: auto;
      max-width: var(--wide-lg);
    }

    .featured {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-xl) var(--space-md);

      .logo img {
        width: 150px;
      }

      .headline {
        text-align: center;

        h2 {
          padding-bottom: 1rem;
          border-bottom: none;
        }

        .actions {
          display: flex;
          gap: var(--space-md);
          margin-top: var(--space-md);
          justify-content: center;
        }
      }
    }

    .members {
      padding: var(--space-xl);

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--space-md);

        li {
          padding: var(--space-md);
          border-radius: var(--radius-md);
          background: var(--color-body-less);
          border: 1px solid var(--color-body-semi);
          transition:
            box-shadow 0.3s,
            border-color 0.3s;

          &:hover {
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            border-color: var(--color-body-subtle);
          }

          .icon {
            font-size: 2rem;
            padding: var(--space-sm);
            background: var(--color-body-subtle);
            width: 55px;
            height: 50px;
            line-height: 25px;
            border-radius: var(--radius-md);
          }

          h3 {
            margin: var(--space-md) 0;
            font-size: 1.5rem;
          }

          p {
            margin: 0;
            color: var(--color-medium);
          }
        }
      }
    }

    .try {
      padding: var(--space-xl);

      .title {
        h2 {
          border-bottom: none;
          padding-bottom: 1rem;
        }

        p {
          margin-bottom: var(--space-xl);
        }
      }

      p {
        margin-top: var(--space-md);
      }
    }

    .sponsors {
      padding: var(--space-xl);
      margin: var(--space-xl) auto;

      .foreword {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .special-sponsors {
        .title {
          background: var(--color-body-less);
          margin-bottom: var(--space-xs);
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          text-align: center;
          font-weight: 700;
          color: var(--color-medium);
          font-size: 0.9rem;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: var(--space-xs);

          li {
            background: var(--color-body-less);

            a {
              display: block;
              color: var(--color-medium);
              text-decoration: none;
              font-size: 1.5rem;
              padding: var(--space-xl);
              width: 100%;
              text-align: center;
            }
          }
        }
      }

      .actions {
        display: flex;
        gap: var(--space-md);
        margin-top: var(--space-xl);
        justify-content: center;
      }
    }

    @media (min-width: 768px) {
      .featured {
        padding: var(--space-xl-3) var(--space-xl);
        flex-direction: row;

        .logo {
          display: flex;
          width: 40%;
          justify-content: flex-end;

          img {
            width: 200px;
          }
        }

        .headline {
          order: -1;
          text-align: left;

          h2 {
            font-size: 2.5rem;
            margin-top: 0;
          }

          .actions {
            justify-content: flex-start;
          }
        }
      }

      .sponsors .special-sponsors ul {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `;
}
