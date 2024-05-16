import {css} from 'lit';
import {generateColorVaries, generateGradientVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --background: none;
    --border: none;
    --border-radius: var(--size-radius);
    --padding: 0;
    --margin: 0;
    --box-shadow: var(--shadow-main);
  }

  .root {
    width: 100%;
    background: var(--background);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: var(--padding);
    margin: var(--margin);
    box-shadow: var(--box-shadow);
  }

  .caption-top,
  .caption-bottom {
    display: none;
  }

  .caption-top-populated,
  .caption-bottom-populated {
    display: block;
  }

  ${generateColorVaries(
    ({fullName, color, contrast}) => `
    .${fullName} {
      --background: ${color};
      --color: ${contrast};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, contrast}) => `
    .${fullName} {
      --background: ${gradient};
      --color: ${contrast};
    }
  `
  )}
`;

export default {styles};
