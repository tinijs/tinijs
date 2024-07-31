import {html, css} from 'lit';

import {AppThemeSelectorComponent} from '../../../app/components/theme-selector.js';
import {TiniBoxComponent} from '../../../app/ui/components/box.js';
import {TiniFlexComponent} from '../../../app/ui/components/flex.js';
import {TiniGridComponent} from '../../../app/ui/components/grid.js';
import {TiniContainerComponent} from '../../../app/ui/components/container.js';
import {TiniTextComponent} from '../../../app/ui/components/text.js';
import {TiniHeadingComponent} from '../../../app/ui/components/heading.js';
import {TiniLinkComponent} from '../../../app/ui/components/link.js';
import {TiniImageComponent} from '../../../app/ui/components/image.js';
import {TiniTableComponent} from '../../../app/ui/components/table.js';
import {TiniEmbedComponent} from '../../../app/ui/components/embed.js';
import {TiniCodeComponent} from '../../../app/ui/components/code.js';
import {TiniSkeletonComponent} from '../../../app/ui/components/skeleton.js';
import {TiniIconComponent} from '../../../app/ui/components/icon.js';
import {TiniBadgeComponent} from '../../../app/ui/components/badge.js';
import {TiniButtonComponent} from '../../../app/ui/components/button.js';

import {Component, TiniComponent} from '@tinijs/core';

const ICON_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314'/%3E%3C/svg%3E";

@Component({
  components: [
    AppThemeSelectorComponent,
    TiniBoxComponent,
    TiniFlexComponent,
    TiniGridComponent,
    TiniContainerComponent,
    TiniTextComponent,
    TiniHeadingComponent,
    TiniLinkComponent,
    TiniImageComponent,
    TiniTableComponent,
    TiniEmbedComponent,
    TiniCodeComponent,
    TiniSkeletonComponent,
    TiniIconComponent,
    TiniBadgeComponent,
    TiniButtonComponent,
  ],
})
export class ContentUIPostPlaygroundComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-playground';

  protected render() {
    return html`
      <article>
        <p>
          This playground serves a quick tour of how components look and behave
          in different variants and theme families.
        </p>
        <p>
          For interactive playgrounds using different frameworks, please check
          out these examples on Stackblitz:
        </p>
        <ul>
          <li>
            <a
              href="https://stackblitz.com/edit/tini-ui-vue-playground?file=src%2FApp.vue"
              target="_blank"
              >Vue Playground</a
            >
          </li>
          <li>
            <a
              href="https://stackblitz.com/edit/tini-ui-react-playground?file=src%2FApp.tsx"
              target="_blank"
              >React Playground</a
            >
          </li>
          <li>
            <a
              href="https://stackblitz.com/edit/tini-ui-angular-playground?file=src%2Fmain.html"
              target="_blank"
              >Angular Playground</a
            >
          </li>
          <li>
            <a
              href="https://stackblitz.com/edit/tini-ui-svelte-playground?file=src%2FApp.svelte"
              target="_blank"
              >Svelte Playground</a
            >
          </li>
          <li>
            <a
              href="https://stackblitz.com/edit/tini-ui-vanilla-playground?file=index.html"
              target="_blank"
              >Vanilla Playground</a
            >
          </li>
        </ul>
        <p>
          <em
            >Note: use the theme selector below or in the Skin Editor panel to
            see how components will works in their respective theme family.</em
          >
        </p>
      </article>

      <div class="head">
        <app-theme-selector
          styleDeep="tini-select::part(label) {display: none}"
        ></app-theme-selector>
        <a
          href="https://github.com/tinijs/tinijs/blob/main/apps/tinijs.dev/content/ui-posts/102%20-%20playground/index.ts"
          target="_blank"
          >View source code</a
        >
      </div>

      <section>
        <h3>
          <span>Layout</span>
          <a href="/ui/box">Detail</a>
        </h3>
        <div class="content">
          <tini-box padding="md" background="body-subtle" radius="md"
            >A box with padding, background and radius</tini-box
          >

          <p class="desc">Flex</p>
          <tini-flex gap="md">
            <tini-box padding="md" background="body-subtle" flex="1"
              >Flex item 1</tini-box
            >
            <tini-box padding="md" background="body-subtle" flex="1"
              >Flex item 2</tini-box
            >
          </tini-flex>

          <p class="desc">Grid</p>
          <tini-grid
            areas="'header header header' 'nav content side' 'footer footer footer'"
            columns="auto 1fr auto"
            rows="auto 1fr auto"
            gap="md"
            height="250px"
          >
            <tini-box
              gridArea="header"
              padding="md"
              height="64px"
              background="body-subtle"
              >Grid header area</tini-box
            >
            <tini-box
              gridArea="nav"
              padding="md"
              width="150px"
              background="body-subtle"
              >Grid nav area</tini-box
            >
            <tini-box gridArea="content" padding="md" background="body-subtle"
              >Grid content area</tini-box
            >
            <tini-box
              gridArea="side"
              padding="md"
              width="150px"
              background="body-subtle"
              >Grid side area</tini-box
            >
            <tini-box
              gridArea="footer"
              padding="md"
              height="64px"
              background="body-subtle"
              >Grid footer area</tini-box
            >
          </tini-grid>

          <p class="desc">Container</p>
          <tini-container size="sm" padding="md" background="body-subtle"
            >A small centered container</tini-container
          >
        </div>
      </section>

      <section>
        <h3>
          <span>Text</span>
          <a href="/ui/text">Detail</a>
        </h3>
        <div class="content">
          <tini-text>An utility for text</tini-text><br />
          <tini-text font="code">Text font</tini-text><br />
          <tini-text weight="900">Text weight</tini-text><br />
          <tini-text italic>Italic text</tini-text><br />
          <tini-text color="medium">Muted text</tini-text><br />
          <tini-text color="success">Color text</tini-text><br />
          <tini-text gradient="danger" size="xl">Big gradient text</tini-text
          ><br />
          <tini-text size="xs">Small text</tini-text><br />
          <tini-text align="right" max="180px">Aligned text</tini-text>
          <tini-text dir="rtl">הַלְלוּ־יָהּ (right to left)</tini-text><br />
          <tini-text overflow="ellipsis" max="165px"
            >Overflow (ellipsis) text</tini-text
          >
          <tini-text overflow="fade" max="140px"
            >Overflow (fade) text</tini-text
          >
          <tini-text writing="vertical-rl">ラーメン (vertical)</tini-text>
        </div>
      </section>

      <section>
        <h3>
          <span>Heading</span>
          <a href="/ui/heading">Detail</a>
        </h3>
        <div class="content">
          <tini-heading>Heading level 1</tini-heading>
          <tini-heading level="2">Heading level 2</tini-heading>
          <tini-heading level="3" color="success"
            >Color heading level 3</tini-heading
          >
          <tini-heading level="4" gradient="danger"
            >Gradient heading level 4</tini-heading
          >
        </div>
      </section>

      <section>
        <h3>
          <span>Link</span>
          <a href="/ui/link">Detail</a>
        </h3>
        <div class="content">
          <tini-link href="#">An utility for link</tini-link><br />
          <tini-link href="#" disabled>Disabled link</tini-link><br />
          <tini-link href="#" italic>Italic link</tini-link><br />
          <tini-link href="#" color="success">Color link</tini-link><br />
          <tini-link href="#" gradient="danger" size="xl"
            >Big gradient link</tini-link
          ><br />
          <tini-link href="#" size="xs">Small link</tini-link><br />
          <tini-link href="#" noUnderline>Force no underline</tini-link><br />
        </div>
      </section>

      <section>
        <h3>
          <span>Image</span>
          <a href="/ui/image">Detail</a>
        </h3>
        <div class="content">
          <tini-image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1000&q=80"
            alt="Placeholder"
          ></tini-image>

          <p class="desc">Width & height</p>
          <tini-image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=250&h=250&q=80"
            alt="Placeholder"
            width="250px"
            height="250px"
          ></tini-image>

          <p class="desc">Radius</p>
          <tini-image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=150&h=150&q=80"
            alt="Placeholder"
            width="150px"
            height="150px"
            radius="half"
          ></tini-image>
        </div>
      </section>

      <section>
        <h3>
          <span>Table</span>
          <a href="/ui/table">Detail</a>
        </h3>
        <div class="content">
          <tini-table
            .items=${[
              ['Header 1', 'Header 2', 'Header 3'],
              ['Item 1', 'Item 2', 'Item 3'],
              [
                html`<strong>Item 1</strong>`,
                html`<mark>Item 2</mark>`,
                html`<span style="color: red">Item 3</span>`,
              ],
              ['Item 1', 'Item 2', 'Item 3'],
            ]}
          ></tini-table>
        </div>
      </section>

      <section>
        <h3>
          <span>Embed</span>
          <a href="/ui/embed">Detail</a>
        </h3>
        <div class="content">
          <tini-embed>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/aqz-KE-bpKQ?si=pMUWQVk63DgVToPe"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </tini-embed>

          <p class="desc">9x16 ratio</p>
          <tini-embed ratio="9x16" style="width: 320px">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/1UJpFahphko?si=thUjX5G1SBRVgO4f"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </tini-embed>

          <p class="desc">4:3 ratio</p>
          <tini-embed ratio="4:3">
            <iframe
              src="https://stackblitz.com/edit/try-tinijs-todo-app?ctl=1&embed=1&file=app%2Fapp.ts"
              title="Try TiniJS - Example To Do App"
              frameborder="0"
            ></iframe>
          </tini-embed>

          <p class="desc">Custom ratio (7/3)</p>
          <tini-embed ratio="7/3">
            <iframe
              allowfullscreen=""
              frameborder="0"
              height="100%"
              src="https://giphy.com/embed/Ze44chcCSUpyVN1gmQ/video"
              style="left:0;position:absolute;top:0"
              width="100%"
            ></iframe>
          </tini-embed>
        </div>
      </section>

      <section>
        <h3>
          <span>Code</span>
          <a href="/ui/code">Detail</a>
        </h3>
        <div class="content">
          <tini-code
            language="javascript"
            content=${`// language="javascript"
const hello = 'Hello, World!';
function sayHello() {
  console.log(hello);
}
`}
          ></tini-code>
        </div>
      </section>

      <section>
        <h3>
          <span>Skeleton</span>
          <a href="/ui/skeleton">Detail</a>
        </h3>
        <div class="content">
          <tini-skeleton></tini-skeleton>

          <p class="desc">Width & height</p>
          <tini-skeleton width="250px" height="250px"></tini-skeleton>

          <p class="desc">Radius</p>
          <tini-skeleton
            width="150px"
            height="150px"
            radius="half"
          ></tini-skeleton>
        </div>
      </section>

      <section>
        <h3>
          <span>Icon</span>
          <a href="/ui/icon">Detail</a>
        </h3>
        <div class="content">
          <tini-icon src=${ICON_SRC} color="body-contrast"></tini-icon>
          <tini-icon
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Cg fill='none'%3E%3Cpath fill='%2300d26a' d='M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.763 1.763 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6'/%3E%3Cpath fill='%2314a085' d='M16 8.5v3.049c1.27-2.684 4.425-6.269 9.658-5.712c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.763 1.763 0 0 0 2.186.04c.254-.193.516-.4.785-.619c-2.854-2.142-6.86-5.518-9.035-7.462c-4.957-4.43-6.61-11.814 0-14.768a9.706 9.706 0 0 1 3.087-.827'/%3E%3Cellipse cx='23.477' cy='12.594' fill='%2300f397' rx='2.836' ry='4.781' transform='rotate(30 23.477 12.594)'/%3E%3C/g%3E%3C/svg%3E"
          ></tini-icon>
          <tini-icon
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='meteoconsUvIndex1Fill0' x1='150' x2='234' y1='119.2' y2='264.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fbbf24'/%3E%3Cstop offset='.5' stop-color='%23fbbf24'/%3E%3Cstop offset='1' stop-color='%23f59e0b'/%3E%3C/linearGradient%3E%3CclipPath id='meteoconsUvIndex1Fill1'%3E%3Cpath fill='none' d='M64 64h384v192H328a72 72 0 0 0-72 72v120H64Z'/%3E%3C/clipPath%3E%3Csymbol id='meteoconsUvIndex1Fill2' viewBox='0 0 384 384'%3E%3Ccircle cx='192' cy='192' r='84' fill='url(%23meteoconsUvIndex1Fill0)' stroke='%23f8af18' stroke-miterlimit='10' stroke-width='6'/%3E%3Cpath fill='none' stroke='%23fbbf24' stroke-linecap='round' stroke-miterlimit='10' stroke-width='24' d='M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7'%3E%3CanimateTransform additive='sum' attributeName='transform' dur='1s' repeatCount='indefinite' type='rotate' values='0 192 192; 45 192 192'/%3E%3C/path%3E%3C/symbol%3E%3C/defs%3E%3Cg clip-path='url(%23meteoconsUvIndex1Fill1)'%3E%3Cuse width='384' height='384' href='%23meteoconsUvIndex1Fill2' transform='translate(64 64)'/%3E%3Cpath fill='none' stroke='%23f8af18' stroke-miterlimit='10' stroke-width='6' d='M254 338v-10a74 74 0 0 1 74-74h10'/%3E%3C/g%3E%3Crect width='144' height='144' x='280' y='280' fill='%2391c700' rx='48'/%3E%3Cpath fill='%23fff' d='M366.4 388h-19v-45h-17.8v-12.6h3q7.8 0 12.4-3.4q4.2-3.1 5.5-10.2l.2-.8h15.6Z'/%3E%3C/svg%3E"
          ></tini-icon>

          <p class="desc">Color & gradient</p>
          <tini-icon src=${ICON_SRC} color="primary"></tini-icon>
          <tini-icon src=${ICON_SRC} color="success"></tini-icon>
          <tini-icon src=${ICON_SRC} color="danger"></tini-icon>
          <br />
          <tini-icon src=${ICON_SRC} color="primary-subtle"></tini-icon>
          <tini-icon src=${ICON_SRC} color="success-subtle"></tini-icon>
          <tini-icon src=${ICON_SRC} color="danger-subtle"></tini-icon>
          <br />
          <tini-icon src=${ICON_SRC} gradient="primary"></tini-icon>
          <tini-icon src=${ICON_SRC} gradient="success"></tini-icon>
          <tini-icon src=${ICON_SRC} gradient="danger"></tini-icon>

          <p class="desc">Sizes</p>
          <tini-icon src=${ICON_SRC} color="primary" size="xs"></tini-icon>
          <tini-icon src=${ICON_SRC} color="primary"></tini-icon>
          <tini-icon src=${ICON_SRC} color="primary" size="xl"></tini-icon>
        </div>
      </section>

      <section>
        <h3>
          <span>Badge</span>
          <a href="/ui/badge">Detail</a>
        </h3>
        <div class="content">
          <tini-badge>Badge</tini-badge>
          <tini-badge color="success">Badge</tini-badge>
          <tini-badge color="warning">Badge</tini-badge>
          <tini-badge color="danger">Badge</tini-badge>
          <br />
          <tini-badge color="primary-subtle">Subtle</tini-badge>
          <tini-badge color="success-subtle">Subtle</tini-badge>
          <tini-badge color="warning-subtle">Subtle</tini-badge>
          <tini-badge color="danger-subtle">Subtle</tini-badge>
          <br />
          <tini-badge gradient="primary">Gradient</tini-badge>
          <tini-badge gradient="success">Gradient</tini-badge>
          <tini-badge gradient="warning">Gradient</tini-badge>
          <tini-badge gradient="danger">Gradient</tini-badge>

          <p class="desc">Pill, circle & dot</p>
          <tini-badge shape="pill">Pill</tini-badge>
          <tini-badge shape="pill" color="success">Pill</tini-badge>
          <tini-badge shape="pill" color="warning">Pill</tini-badge>
          <tini-badge shape="pill" color="danger">Pill</tini-badge>
          <br />
          <tini-badge shape="circle">9</tini-badge>
          <tini-badge shape="circle" color="success">9</tini-badge>
          <tini-badge shape="circle" color="warning">9</tini-badge>
          <tini-badge shape="circle" color="danger">9</tini-badge>
          <br />
          <tini-badge shape="dot"></tini-badge>
          <tini-badge shape="dot" color="success"></tini-badge>
          <tini-badge shape="dot" color="warning"></tini-badge>
          <tini-badge shape="dot" color="danger"></tini-badge>

          <p class="desc">Sizes</p>
          <tini-badge size="xs">Badge</tini-badge>
          <tini-badge>Badge</tini-badge>
          <tini-badge size="xl">Badge</tini-badge>
        </div>
      </section>

      <section>
        <h3>
          <span>Button</span>
          <a href="/ui/button">Detail</a>
        </h3>
        <div class="content">
          <tini-button>Button</tini-button>
          <tini-button color="success">Button</tini-button>
          <tini-button color="warning">Button</tini-button>
          <tini-button color="danger">Button</tini-button>
          <br />
          <br />
          <tini-button color="primary-subtle">Subtle</tini-button>
          <tini-button color="success-subtle">Subtle</tini-button>
          <tini-button color="warning-subtle">Subtle</tini-button>
          <tini-button color="danger-subtle">Subtle</tini-button>
          <br />
          <br />
          <tini-button gradient="primary">Gradient</tini-button>
          <tini-button gradient="success">Gradient</tini-button>
          <tini-button gradient="warning">Gradient</tini-button>
          <tini-button gradient="danger">Gradient</tini-button>

          <p class="desc">Sizes</p>
          <tini-button size="xs">Button</tini-button>
          <tini-button>Button</tini-button>
          <tini-button size="xl">Button</tini-button>
        </div>
      </section>
    `;
  }

  static styles = css`
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    section {
      border: 1px solid var(--color-body-semi);
      margin-top: var(--space-xl);
    }

    section > h3 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-body-semi);
      padding: var(--space-xs) var(--space-md);
    }

    section > h3 a {
      font-size: var(--text-md);
    }

    section > .content {
      padding: var(--space-md);
      overflow: hidden;
    }

    section > .content .desc {
      width: calc(100% + (var(--space-md) * 2));
      padding: var(--space-xs2) var(--space-md);
      margin-top: var(--space-md);
      margin-bottom: var(--space-md);
      margin-left: calc(var(--space-md) * -1);
      border-top: 1px solid var(--color-body-semi);
      border-bottom: 1px solid var(--color-body-semi);
      font-size: var(--text-lg);
      font-weight: bold;
    }
  `;
}
