import {css} from 'lit';
import {generateColorVaries, generateGradientVaries} from '@tinijs/core';

const styles = css`
  :host {
    --background: none;
    --color: var(--color-front);
    --border: none;
    --border-radius: var(--radius-md);
    --padding: var(--space-md);
    --margin: 0;
    --box-shadow: none;
  }

  .root {
    width: 100%;
    background: var(--background);
    color: var(--color);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: var(--padding);
    margin: var(--margin);
    box-shadow: var(--box-shadow);
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
