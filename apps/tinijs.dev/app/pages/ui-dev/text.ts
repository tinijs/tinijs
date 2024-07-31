import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Lines,
  Letters,
  Words,
} from '@tinijs/core';

import {TiniTextComponent} from '../../ui/components/text.js';

@Component({
  components: [TiniTextComponent],
})
export class AppPageUIDevTextComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-text';

  protected render() {
    return html`
      <ui-dev-section titleText="Natives">
        <span>Lorem ipsum (span)</span><br />
        <strong>Lorem ipsum (strong)</strong><br />
        <em>Lorem ipsum (em)</em><br />
        <p>Lorem ipsum (p)</p>
      </ui-dev-section>

      <ui-dev-section titleText="Defaults">
        <tini-text>Lorem ipsum (default)</tini-text><br />
        <tini-text weight="bold">Lorem ipsum (weight=bold)</tini-text><br />
        <tini-text italic>Lorem ipsum (italic)</tini-text><br />
        <tini-text block>Lorem ipsum (block)</tini-text>
      </ui-dev-section>

      <ui-dev-section titleText="Colors">
        ${Object.values(Colors).map(
          color => html`
            <tini-text color=${color}>Lorem ipsum (color=${color})</tini-text>
            <br />
          `
        )}
        <tini-text color="magenta">Lorem ipsum (custom)</tini-text>
        <br />
        ${Object.values(Gradients).map(
          gradient => html`
            <tini-text gradient=${gradient}
              >Lorem ipsum (gradient=${gradient})</tini-text
            >
            <br />
          `
        )}
        <tini-text gradient="linear-gradient(45deg, green, blue)"
          >Lorem ipsum (custom)</tini-text
        >
        <br />
      </ui-dev-section>

      <ui-dev-section titleText="Font types">
        ${Object.values(Fonts).map(
          font => html`
            <tini-text font=${font}>Lorem ipsum (font=${font})</tini-text>
            <br />
          `
        )}
        <tini-text font="'Comic Sans MS', sans-serif"
          >Lorem ipsum (custom)</tini-text
        >
        <br />
      </ui-dev-section>

      <ui-dev-section titleText="Font sizes">
        ${Object.values(Texts).map(
          size => html`
            <tini-text size=${size}>Lorem ipsum (size=${size})</tini-text>
            <br />
          `
        )}
        <tini-text size="5rem">Lorem ipsum (custom)</tini-text>
        <br />
      </ui-dev-section>

      <ui-dev-section titleText="Aligns">
        <tini-text block>Lorem ipsum (start)</tini-text>
        <tini-text align="center">Lorem ipsum (center)</tini-text>
        <tini-text align="end">Lorem ipsum (end)</tini-text>
      </ui-dev-section>

      <ui-dev-section titleText="Font weights">
        ${[100, 200, 300, 400, 500, 600, 700, 800, 900].map(
          weight => html`
            <tini-text weight=${weight}
              >Lorem ipsum (weight=${weight})</tini-text
            >
            <br />
          `
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Line heights">
        ${Object.values(Lines).map(
          line => html`
            <tini-text line=${line} max="150px"
              >The quick brown fox jumped over the lazy dog
              <strong>(line=${line})</strong></tini-text
            >
            <br />
          `
        )}
        <tini-text line="4" max="150px"
          >The quick brown fox jumped over the lazy dog
          <strong>(custom)</strong></tini-text
        >
      </ui-dev-section>

      <ui-dev-section titleText="Letter spacings">
        ${Object.values(Letters).map(
          letter => html`
            <tini-text letter=${letter}
              >The quick brown fox jumped over the lazy dog
              <strong>(letter=${letter})</strong></tini-text
            >
            <br />
          `
        )}
        <tini-text letter="0.5em"
          >The quick brown fox jumped over the lazy dog
          <strong>(letter=custom)</strong></tini-text
        >
      </ui-dev-section>

      <ui-dev-section titleText="Word spacings">
        ${Object.values(Words).map(
          word => html`
            <tini-text word=${word}
              >The quick brown fox jumped over the lazy dog
              <strong>(word=${word})</strong></tini-text
            >
            <br />
          `
        )}
        <tini-text word="2em"
          >The quick brown fox jumped over the lazy dog
          <strong>(word=custom)</strong></tini-text
        >
      </ui-dev-section>

      <ui-dev-section titleText="Italics">
        <tini-text italic>Lorem ipsum</tini-text><br />
        <tini-text italic color="primary"
          >Lorem ipsum (color=primary)</tini-text
        >
        <br />
        <tini-text italic gradient="primary"
          >Lorem ipsum (color=primary)</tini-text
        >
      </ui-dev-section>

      <ui-dev-section titleText="Decorators">
        ${[
          'underline',
          'underline dotted red',
          'green wavy underline',
          'underline overline #FF3028',
        ].map(
          decoration =>
            html`<tini-text decoration=${decoration}
                >Lorem ipsum (decoration=${decoration})</tini-text
              ><br />`
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Transforms">
        ${['lowercase', 'capitalize', 'uppercase'].map(
          transform =>
            html`<tini-text transform=${transform}
                >Lorem ipsum (transform=${transform})</tini-text
              ><br />`
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Shadows">
        <tini-text shadow="#FC0 1px 0 10px">Lorem ipsum</tini-text><br />
        <tini-text shadow="5px 5px #558ABB">Lorem ipsum</tini-text><br />
        <tini-text shadow="1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue"
          >Lorem ipsum</tini-text
        >
      </ui-dev-section>

      <ui-dev-section titleText="Direction & writing mode">
        <tini-text dir="rtl" max="500px">
          Use rtl for languages written from right to left (like Hebrew or
          Arabic), and ltr for those written from left to right (like English
          and most other languages).
        </tini-text>
        <br />
        <tini-text writing="vertical-rl" max="150px"
          >拉麺 or ラーメン or らーめん - rāmen!</tini-text
        >
      </ui-dev-section>

      <ui-dev-section titleText="Overflows">
        <tini-text overflow="clip" style="width: 235px"
          >Lorem ipsum (overflow=clip) more</tini-text
        >
        <tini-text overflow="clip" size="xs" max="175px"
          >Lorem ipsum (overflow=clip) more</tini-text
        >
        <div style="width: 350px">
          <tini-text overflow="clip" size="xl"
            >Lorem ipsum (overflow=clip) more</tini-text
          >
        </div>
        <tini-text overflow="clip" dir="rtl" max="235px"
          >erom (pilc=wolfrevo) muspi meroL</tini-text
        >
        <tini-text overflow="clip" max="120px" writing="vertical-rl"
          >ラーメン / らーめん</tini-text
        >

        <br />

        <tini-text overflow="ellipsis" style="width: 275px"
          >Lorem ipsum (overflow=ellipsis) more</tini-text
        >
        <tini-text overflow="ellipsis" size="xs" max="205px"
          >Lorem ipsum (overflow=ellipsis) more</tini-text
        >
        <div style="width: 410px">
          <tini-text overflow="ellipsis" size="xl"
            >Lorem ipsum (overflow=ellipsis) more</tini-text
          >
        </div>
        <tini-text dir="rtl" overflow="ellipsis" max="275px"
          >erom (sispille=wolfrevo) muspi meroL</tini-text
        >
        <tini-text overflow="ellipsis" max="130px" writing="vertical-rl"
          >ラーメン / らーめん</tini-text
        >

        <br />

        <tini-text overflow="fade" style="width: 250px"
          >Lorem ipsum (overflow=fade) more</tini-text
        >
        <tini-text overflow="fade" size="xs" max="185px"
          >Lorem ipsum (overflow=fade) more</tini-text
        >
        <div style="width: 375px">
          <tini-text overflow="fade" size="xl"
            >Lorem ipsum (overflow=fade) more</tini-text
          >
        </div>
        <tini-text dir="rtl" overflow="fade" max="250px"
          >erom (edaf=wolfrevo) muspi meroL</tini-text
        >
        <tini-text overflow="fade" max="125px" writing="vertical-rl"
          >ラーメン / らーめん</tini-text
        >
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
