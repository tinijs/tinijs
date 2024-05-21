import {css} from 'lit';

const styles = css`
  .root {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .item {
    color: var(--color-middle);
  }

  .item::before {
    content: '/';
    margin: 0 var(--space-xs);
    color: var(--color-middle);
  }

  .item:first-child::before {
    display: none;
  }
`;

export default {styles};
