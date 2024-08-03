import {html, css} from 'lit';

import {Component, TiniComponent, Shadows} from '@tinijs/core';

import {TiniImageComponent} from '../../ui/components/image.js';

const SRC =
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1024&q=80';

@Component({
  components: [TiniImageComponent],
})
export class AppPageUIDevImageComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-image';

  protected render() {
    return html`
      <ui-dev-section titleText="Natives">
        <img src=${SRC} />
      </ui-dev-section>

      <ui-dev-section titleText="Default">
        <tini-image src=${SRC}></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Ratio, Width, height, radius">
        <tini-image src=${SRC} ratio="16/9" width="250px"></tini-image>
        <tini-image src=${SRC} ratio="4/3" width="250px"></tini-image>
        <tini-image src=${SRC} ratio="1/1" width="250px"></tini-image>
        <br />
        <tini-image src=${SRC} width="250px" radius="zero"></tini-image>
        <br />
        <tini-image src=${SRC} width="250px"></tini-image>
        <br />
        <tini-image src=${SRC} radius="xl" width="250px"></tini-image>
        <br />
        <tini-image
          src=${SRC}
          width="250px"
          height="250px"
          radius="half"
        ></tini-image>
        <br />
        <tini-image
          src=${SRC}
          width="250px"
          height="100px"
          radius="full"
        ></tini-image>
        <br />
        <tini-image
          src="https://placehold.co/600x400?text=SVG"
          width="250px"
          height="200px"
          fit="cover"
          radius="xl"
        ></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Shadows">
        <div
          style="
            display: flex;
            flex-flow: row wrap;
            gap: 2rem;
          "
        >
          ${Object.values(Shadows).map(
            shadow => html`
              <tini-image
                src=${`https://placehold.co/350x250/F1F1F1/CCCCCC?text=${shadow}`}
                width="350px"
                shadow=${shadow}
              ></tini-image>
            `
          )}
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="Transforms">
        <tini-image
          src=${SRC}
          width="250px"
          transform="translate(50px, 0)"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="250px"
          transform="scale(0.5)"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="250px"
          transform="rotate(15deg)"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="250px"
          transform="translate(100px, -50px) rotate(15deg)"
        ></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Paddings, borders & outlines">
        <tini-image
          src=${SRC}
          width="150px"
          height="150px"
          border="md solid body-subtle"
          padding="xs"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="150px"
          height="150px"
          border="md solid warning-semi"
          padding="xs"
          radius="half"
          innerRadius="match"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="64px"
          height="64px"
          radius="half"
          border="lg solid danger"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="64px"
          height="64px"
          radius="half"
          innerRadius="match"
          border="lg solid success"
          padding="xs3"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="64px"
          height="64px"
          radius="half"
          innerRadius="match"
          border="2px solid magenta"
          padding="2px"
        ></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Filters & blends">
        <tini-image
          src=${SRC}
          width="500px"
          filter="grayscale(100%)"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="500px"
          background="linear-gradient(90deg, #f00, #0f0, #00f)"
          blend="hard-light"
        ></tini-image>
        <tini-image
          src=${SRC}
          width="500px"
          background="linear-gradient(90deg, red, blue)"
          innerOpacity="0.5"
          blend="multiply"
        ></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Shapes">
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="square"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="square"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-square"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-square"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="squircle"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="squircle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="circle"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="circle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="rectangle"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="rectangle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="vertical-rectangle"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="vertical-rectangle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-rectangle"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-rectangle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-vertical-rectangle"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-vertical-rectangle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="pill"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="pill"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="vertical-pill"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="vertical-pill"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="ellipse"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="ellipse"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="vertical-ellipse"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="vertical-ellipse"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="hexagon"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="hexagon"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-hexagon"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-hexagon"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image src=${SRC} width="250px" shape="triangle"></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="triangle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-triangle"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            shape="rounded-triangle"
            innerShape="match"
            padding="md"
            background="medium"
          ></tini-image>
        </div>
        <br />
        <tini-image
          src=${SRC}
          width="250px"
          shape="squircle"
          innerShape="hexagon"
          padding="xl"
          background="medium"
        ></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Clips & masks">
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            clip="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            background="medium"
            padding="xs"
            clip="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"
            innerClip="match"
          ></tini-image>
        </div>
        <br />
        <div style="display: flex; gap: 1rem">
          <tini-image
            src=${SRC}
            width="250px"
            height="250px"
            mask="radial-gradient(circle, black 0%, black 50%, transparent 70%)"
          ></tini-image>
          <tini-image
            src=${SRC}
            width="250px"
            height="250px"
            background="medium"
            padding="xl"
            mask="radial-gradient(circle, black 0%, black 50%, transparent 70%)"
            innerMask="match"
          ></tini-image>
        </div>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
