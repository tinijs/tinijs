import {css} from 'lit';

import {generateGradientTokens} from '@tinijs/core';

export const globalStyles = css`
  /* no-sass */
  ${generateGradientTokens({
    'kale-salad': {
      start: ['#00C9FF', '#323232'],
      end: ['#92FE9D', '#000000'],
    },
    'disco-club': {
      start: ['#fc466b', '#ffffff'],
      end: ['#3f5efb', '#e1e1e1'],
    },
  })}
`;
