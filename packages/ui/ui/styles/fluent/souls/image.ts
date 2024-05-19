import {css} from 'lit';

export const styles = css`
  :host {
    --border: none;
    --border-radius: var(--radius-md);
    --box-shadow: none;
    display: inline;
  }

  .root,
  .root img {
    border: var(--border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .fluid,
  .fluid img {
    width: 100%;
  }
`;

export default {styles};
