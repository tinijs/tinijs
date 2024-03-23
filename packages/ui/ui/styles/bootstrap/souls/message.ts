import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateFontSizeVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --message-background: var(--color-medium);
    --message-text-color: var(--color-medium);
    --message-font-size: var(--size-text);
    --message-border: var(--size-border) solid var(--color-medium);
    --message-radius: var(--size-radius);
    --message-padding: var(--size-space);
    --message-margin: 0;
  }

  /*
   * Root
   */

  .root {
    width: 100%;
    background: color-mix(in oklab, var(--message-background), transparent 50%);
    color: color-mix(
      in oklab,
      var(--message-text-color),
      var(--color-foreground) 30%
    );
    font-size: var(--message-font-size);
    border: var(--message-border);
    border-radius: var(--message-radius);
    padding: var(--message-padding);
    margin: var(--message-margin);
  }

  /*
   * [fontSize]
   */

  ${generateFontSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --message-font-size: ${size} !important;
    }
  `
  )}

  /*
   * [scheme] & [color]
   */

  ${generateColorVaries(
    ({name, fullName, isContrast, isSubtle, color, baseColor}) => `
    .${fullName} {
      --message-background: ${color};
      --message-text-color: ${isContrast || isSubtle ? baseColor : color};
      border-color: ${color};
    }

    .${VaryGroups.Color}-${name} {
      --message-text-color: ${color} !important;
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
