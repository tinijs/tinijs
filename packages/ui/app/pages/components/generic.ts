import {html} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  codeBases,
} from '@tinijs/ui/bases';
import {TiniGenericComponent} from '@tinijs/ui/components/generic';
import {TiniGenericUnscopedComponent} from '@tinijs/ui/components/generic-unscoped';

import {renderSection, RenderSectionOptions} from '../../helpers/varies';
import {ConsumerPlatforms} from '../../consts/main';
import {CodeBuilder} from '../../helpers/code-builder';

import {AppComponentPageComponent} from '../../components/component-page';
import {AppSectionComponent} from '../../components/section';
import {AppCodeComponent} from '../../components/code';

@Page({
  name: 'app-page-components-generic',
  components: [
    TiniGenericComponent,
    TiniGenericUnscopedComponent,
    AppComponentPageComponent,
    AppSectionComponent,
    AppCodeComponent,
  ],
  theming: {
    styling: stylingWithBases([
      commonBases,
      headingsBases,
      linkBases,
      textBases,
      codeBases,
    ]),
  },
})
export class AppPageComponentsGeneric extends TiniComponent {
  private readonly PART_LIST = [['root', 'The root part']];

  private readonly PREPROCESS_CODE: CodeBuilder = builder => builder;

  private readonly CODE_BUILDERS: Record<string, CodeBuilder> = {
    [ConsumerPlatforms.React]: builder => builder,
  };

  private renderSectionOptions?: RenderSectionOptions;
  onChanges() {
    this.renderSectionOptions = {
      preprocessCode: this.PREPROCESS_CODE,
      codeBuilders: this.CODE_BUILDERS,
    };
  }

  protected render() {
    return html`
      <app-component-page
        titleText="Generic"
        name="generic"
        path="components/generic"
        .partList=${this.PART_LIST}
      >
        <div slot="description">
          Use <code>tini-generic</code> and
          <code>tini-generic-unscoped</code> to build custom components.
        </div>

        <!-- overview -->
        <app-section noCodeSample>
          <h2 slot="title">Overview</h2>
          <div slot="content" class="overview">
            <p>Use <code>tini-generic</code> to create any custom component.</p>
            <p>
              Default is a scoped component, choose a different native root tag
              via <code>tag</code> attribute, passing attributes using
              <code>-attr</code> suffixed attributes.
            </p>
            <p>
              Style a component by providing
              <strong>CSS key-value pairs</strong> as attributes or
              <strong>inline styles</strong>. There are some utils if needed
              (import from the <code>tinijs</code> package):
            </p>
            <ul>
              <li><strong>mix</strong>('red', 'blue'): Mix 2 colors</li>
              <li>
                <strong>darken</strong>('var(--color-primary)', 0.3): Darken a
                color by 30%
              </li>
              <li>
                <strong>brighten</strong>('#0000ff', 0.3): Brighten a color by
                30%
              </li>
              <li>
                <strong>opacity</strong>('var(--color-background)', 0.5): Add
                50% opacity
              </li>
            </ul>
            <p>
              Advanced style via the <code>styleDeep</code> attribute is used to
              style pseudo-classes, pseudo-elements, media queries, ... Use
              <code>.root</code> (or shorthand <code>&amp;</code>) as the main
              selector.
            </p>
            <p>
              Theme-based styling can be provided via
              <code>theming</code> property.
            </p>
          </div>
        </app-section>

        <!-- usage -->
        ${renderSection(
          'usage',
          'Usage',
          html`
            <p>Provide any CSS key-value pairs as attributes.</p>
            <p>
              IMPORTANT! Please <strong>DON'T use user input</strong> for
              neither the keys nor the values to avoid XSS attacks.
            </p>
          `,
          html`
            <tini-generic
              display="flex"
              align-items="center"
              justify-content="space-between"
              padding="1rem"
              border="2px solid blue"
              border-radius="0.5rem"
              background="#ccc"
            >
              <p>Left</p>
              <p>Right</p>
            </tini-generic>
          `,
          this.renderSectionOptions
        )}

        <!-- custom tag & attributes -->
        ${renderSection(
          'tag-attributes',
          'Tag & attributes',
          html`
            <p>
              Choose a different native root tag via <code>tag</code> attribute,
              passing attributes using <code>-attr</code> suffixed attributes.
            </p>
            <p>
              Use the <code>events</code> attribute/property to forward events
              to the host.
            </p>
            <p>
              IMPORTANT! Please <strong>DON'T use user input</strong> for
              neither the <code>-attr</code> suffixed keys nor the values to
              avoid XSS attacks.
            </p>
          `,
          html`
            <tini-generic
              tag="input"
              type-attr="email"
              placeholder-attr="Enter your email"
              events="input,change,focus,blur:customName"
              @input=${(e: CustomEvent<InputEvent>) =>
                console.log('Input "input" event: ', e.detail)}
              @change=${(e: CustomEvent<InputEvent>) =>
                console.log('Input "change" event: ', e.detail)}
              @focus=${(e: CustomEvent<InputEvent>) =>
                console.log('Input "focus" event: ', e.detail)}
              @customName=${(e: CustomEvent<InputEvent>) =>
                console.log(
                  'Input "blur" (renamed to "customName") event: ',
                  e.detail
                )}
            ></tini-generic>
          `,
          this.renderSectionOptions
        )}

        <!-- unscoped  -->
        ${renderSection(
          'unscoped',
          'Unscoped',
          html`
            <p>
              To create an unscoped element (flat structure, it is useful when
              requires an access to the outside context), import and use the
              <code>tini-generic-unscoped</code> instead, it can be styled using
              the same methods as scoped components and/or using the the inline
              <code>style</code> attribute (please note that the inline styles
              have the highest specificity over CSS key-value pairs,
              <code>styleDeep</code> attribute and
              <code>theming</code> property).
            </p>
            <p>
              IMPORTANT! Please <strong>DON'T use user input</strong> for
              attribute styles neither the keys nor the values to avoid XSS
              attacks.
            </p>
          `,
          html`
            <tini-generic-unscoped
              name="my-component"
              display="block"
              padding="1rem"
              style="
    background: #ccc;
    border: 2px solid blue;
    border-radius: 0.5rem;
  "
              >Unscoped element</tini-generic-unscoped
            >
          `,
          this.renderSectionOptions
        )}

        <!-- advanced -->
        ${renderSection(
          'advanced',
          'Advanced',
          html`
            <p>
              Using the <code>styleDeep</code> attribute to style
              pseudo-classes, pseudo-elements, media queries, ...
            </p>
            <p>
              IMPORTANT! Please <strong>DON'T use user input</strong> for the
              <code>styleDeep</code> attribute to avoid XSS attacks.
            </p>
          `,
          html`
            <tini-generic
              margin-top="1rem"
              display="flex"
              justify-content="center"
              padding="1rem"
              background="#ccc"
              border="2px solid green"
              border-radius="0.5rem"
              styleDeep="
    .root:hover {
      background: #a69836;
    }
    .root::before {
      content: '::before';
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      background: #333;
      color: #fff;
      border-radius: 50%;
    }
    @media (min-width: md) {
      .root {
        border-color: blue;
      }
    }
  "
            ></tini-generic>
          `,
          this.renderSectionOptions
        )}

        <!-- theming -->
        ${renderSection(
          'theming',
          'Theming',
          html`
            <p>
              Theme-based styling using the <code>theming</code> property,
              styles can be be provided in parts for overriding any attribute
              styles or in whole. Key syntax:
            </p>
            <ul>
              <li>
                <code>bootstrap</code>: soul id only, applied to all themes in
                the same family
              </li>
              <li>
                <code>bootstrap/light</code>: applied to the specific theme
              </li>
            </ul>
            <p>
              Change theme to <strong>Bootstrap Dark</strong> and
              <strong>Bootstrap Retro Light</strong> to see the defferent.
            </p>
            <p>
              IMPORTANT! Please <strong>DON'T use user input</strong> for the
              style content to avoid XSS attacks.
            </p>
          `,
          html`
            <p><strong>Override attribute styles</strong></p>
            <tini-generic
              display="block"
              padding="1rem"
              border="2px solid blue"
              border-radius="0.5rem"
              background="#ccc"
              .theming=${{
                styling: {
                  'bootstrap/dark': '.root { background: #a69836 }',
                  'bootstrap/retro-light': '.root { background: aquamarine }',
                },
              }}
              >Default (background = #ccc) / Bootstrap Dark (background =
              #a69836) / Bootstrap Retro Light (background =
              aquamarine)</tini-generic
            >
            <p>
              <strong>Use <code>theming</code> exclusively</strong>
            </p>
            <tini-generic
              .theming=${{
                styling: {
                  bootstrap: `
                    .root {
                      display: block;
                      padding: 1rem;
                      border: 2px solid blue;
                      border-radius: 0.5rem;
                      background: #ccc;
                    }
                  `,
                  'bootstrap/dark': `
                    .root {
                      display: block;
                      padding: 1rem;
                      border: 2px solid red;
                      border-radius: 2rem;
                      background: pink;
                    }
                  `,
                  'bootstrap/retro-light': `
                    .root {
                      display: block;
                      padding: 1rem;
                      border: 2px solid green;
                      background: tomato;
                      transform: skewX(-15deg);
                    }
                  `,
                },
              }}
              >Styles are provided exclusively via the
              <code>theme</code> property.</tini-generic
            >
          `,
          this.renderSectionOptions
        )}

        <!-- which-to-choose -->
        <app-section noCodeSample>
          <h2 slot="title">Which to choose?</h2>
          <div slot="content" class="which-to-choose">
            <p><strong>Inline vs attributes?</strong></p>
            <p>Use <em>inline styles</em> first in anywhere posible.</p>
            <p>
              Use <em>attribute styles</em> (with <code>tini-generic</code> or
              <code>tini-generic-unscoped</code>) for complex and reusable
              elements.
            </p>
            <p><strong>Scoped vs unscoped?</strong></p>
            <p>
              Use <em>scoped</em> (<code>tini-generic</code>) first for any
              component posible.
            </p>
            <p>
              Use <em>unscoped</em> (<code>tini-generic-unscoped</code>) if you
              need a flat DOM structure, for example, when it is required to
              access the ascendants.
            </p>
            <p>
              Please keep in mind that the inline <code>style</code> attribute
              behaves differently between scoped and unscoped components. For
              scoped components, the styles are applied to the host, not the
              main node (root) of the shadow tree. For unscoped components,
              there is no shadow tree, the styles are applied to the same tag.
            </p>
          </div>
        </app-section>

        <!-- tailwind-comparison -->
        ${renderSection(
          'tailwind-comparison',
          'Tailwind comparison',
          html`
            <p>
              Here are 2 examples inspired by Tailwind if you like to compare
              <code>tini-generic</code> to
              <a href="https://tailwindcss.com/" target="_blank" rel="noopener"
                >Tailwind CSS</a
              >.
            </p>
            <ol>
              <li>
                Traditional CSS vs Utility classes:
                <a
                  href="https://tailwindcss.com/docs/utility-first"
                  target="_blank"
                  rel="noopener"
                  >https://tailwindcss.com/docs/utility-first</a
                >
              </li>
              <li>
                Why not inline styles?:
                <a
                  href="https://tailwindcss.com/docs/utility-first#why-not-just-use-inline-styles"
                  target="_blank"
                  rel="noopener"
                  >https://tailwindcss.com/docs/utility-first#why-not-just-use-inline-styles</a
                >
              </li>
            </ol>
            <p>
              In conclusion, <code>tini-generic</code> doesn't require a build
              step, but the size of code is bigger than Tailwind about
              <strong>20%</strong> on average. It's recommended to extract
              repeatitive code intro reusable components, please see below for
              more detail.
            </p>
          `,
          html`
            <tini-generic
              display="flex"
              align-items="center"
              gap="1rem"
              width="var(--wide-ss)"
              padding="1.5rem"
              background="#fff"
              border-radius=".75rem"
              box-shadow="rgba(0, 0, 0, 0.2) 0px 5px 15px"
            >
              <div>
                <img
                  width="64px"
                  height="64px"
                  src="https://img.icons8.com/fluency/96/chat--v1.png"
                  alt="ChitChat Logo"
                />
              </div>
              <div>
                <tini-generic
                  color="black"
                  font-size="1.25rem"
                  font-weight="500"
                  >ChitChat</tini-generic
                >
                <p style="margin: 0; color: #64748b">You have a new message!</p>
              </div>
            </tini-generic>

            <tini-generic
              margin-top="2rem"
              display="flex"
              align-items="center"
              gap="1.5rem"
              width="var(--wide-ss)"
              padding="1rem 1.5rem"
              background="#fff"
              border-radius=".75rem"
              box-shadow="rgba(0, 0, 0, 0.2) 0px 5px 15px"
            >
              <img
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=250&h=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Erin Lindford"
                style="
      width: 100px;
      height: 100px;
      border-radius: 50%;
    "
              />
              <div>
                <tini-generic
                  color="black"
                  font-size="1.25rem"
                  font-weight="500"
                  >Erin Lindford</tini-generic
                >
                <p style="margin: 0; color: #64748b">Product Engineer</p>
                <tini-generic
                  tag="button"
                  background="none"
                  margin-top=".5rem"
                  padding=".25rem 1rem"
                  font-size=".875rem"
                  font-weight="600"
                  line-height="1.25rem"
                  color="#9333ea"
                  border="1px solid #e9d5ff"
                  border-radius="9999px"
                  cursor="pointer"
                  styleDeep="
        .root:hover {
          background: #9333ea;
          color: #fff;
        }
        .root:focus {
          outline: 2px solid #9333ea;
          outline-offset: 2px;
        }
      "
                  >Message</tini-generic
                >
              </div>
            </tini-generic>
          `,
          this.renderSectionOptions
        )}

        <!-- reusable-with-frameworks -->
        <app-section noCodeSample>
          <h2 slot="title">Reusable with JS frameworks</h2>
          <div slot="content" class="reusable-with-frameworks">
            <p>
              Using Tini UI with your framework of choice, you can register
              <code>tini-generic</code> locally in a component or globally in an
              app, then create components those can be reused across the app.
            </p>

            <p>For example, create a Vue component:</p>
            <app-code .code=${this.vueCode}></app-code>
          </div>
        </app-section>

        <!-- reusable-without-frameworks -->
        ${renderSection(
          'reusable-without-frameworks',
          'Reusable without frameworks',
          html`
            <p>
              Use the <code>precomputed</code> attribute to create reusable
              components in plain HTML. First, you define components at the very
              <strong>TOP</strong> of the app with
              <strong>unique names</strong>. Later, use them without re-define
              the styles. You can also extend a previously defined component to
              create a different component.
            </p>
            <p>
              Please note that, the name (the
              <code>precomputed</code> attribute) of a component
              <strong>must be UNIQUE</strong> across the app, not just the
              current page.
            </p>
          `,
          html`
            <div title="Define reusable components" style="display: none;">
              <tini-generic
                precomputed="component-1"
                display="block"
                padding="1rem"
                background="#ccc"
                border="2px solid blue"
                border-radius="0.5rem"
              ></tini-generic>

              <tini-generic
                precomputed="component-1/component-2"
                border="4px solid green"
                font-size="1.5rem"
              ></tini-generic>
            </div>

            <main
              title="Use the defined components"
              style="display: flex; flex-flow: column; gap: 1rem;"
            >
              <tini-generic precomputed="component-1">Component 1</tini-generic>
              <tini-generic precomputed="component-1" tag="div"
                >Also component 1</tini-generic
              >

              <tini-generic precomputed="component-1/component-2"
                >Component 2 (extended from the component 1)</tini-generic
              >
              <tini-generic precomputed="component-1/component-2" tag="div"
                >Also component 2</tini-generic
              >
            </main>
          `,
          this.renderSectionOptions
        )}
      </app-component-page>
    `;
  }

  private get vueCode() {
    return `<template>
  <tini-generic
    :precomputed="componentName"
    display="flex"
    align-items="center"
    .theming="{
      styling: {
        'soul-id': \`...\`,
        'soul-id/skin-id': \`...\`,
      }
    }"
  ></tini-generic>
</template>

<script lang="ts" setup>
  // optional 'precomputed' attribute (for caching purpose)
  const componentName = 'my-component';
</script>`;
  }
}
