import {css} from 'lit';
import {generateColorVaries, generateBorderRadiusVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --skeleton-width: 100%;
    --skeleton-height: 1rem;
    --skeleton-speed: 3s;
    --skeleton-border-radius: var(--size-radius);
    --skeleton-background: var(--color-background);
  }

  /*
   * Root
   */

  .root {
    display: inline-block;
    width: var(--skeleton-width);
    height: var(--skeleton-height);
    position: relative;
    overflow: hidden;
    background: color-mix(in oklab, var(--skeleton-background), black 10%);
    border-radius: var(--skeleton-border-radius);
  }

  .root::after {
    --background: color-mix(in oklab, var(--skeleton-background), white 10%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      color-mix(in oklab, var(--background), transparent 100%) 0,
      color-mix(in oklab, var(--background), transparent 80%) 20%,
      color-mix(in oklab, var(--background), transparent 50%) 60%,
      color-mix(in oklab, var(--background), transparent 100%) 100%
    );
    animation: shimmer var(--skeleton-speed) infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      --skeleton-background: ${color};
    }
  `
  )}

  /*
   * [borderRadius]
   */

  ${generateBorderRadiusVaries(
    ({fullName, radius}) => `
    .${fullName} {
      --skeleton-border-radius: ${radius};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
