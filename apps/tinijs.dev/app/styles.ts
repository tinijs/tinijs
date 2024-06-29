import {generateGradientTokens} from '@tinijs/core';

export const globalStyles = [
  generateGradientTokens({
    'kale-salad': {
      start: ['#00C9FF', '#323232'],
      end: ['#92FE9D', '#000000'],
    },
    'disco-club': {
      start: ['#fc466b', '#ffffff'],
      end: ['#3f5efb', '#e1e1e1'],
    },
    'mello-yellow': {
      start: ['#f8ff00', '#323232'],
      end: ['#3ad59f', '#000000'],
    },
    'bloody-mimosa': {
      start: ['#d53369', '#ffffff'],
      end: ['#daae51', '#e1e1e1'],
    },
    'shady-lane': {
      start: ['#3F2B96', '#ffffff'],
      end: ['#A8C0FF', '#e1e1e1'],
    },
  }),
];
