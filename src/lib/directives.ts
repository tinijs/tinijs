import {PartInfo} from './types';

export function partMap(info: PartInfo) {
  return Object.entries(info).reduce((result, [part, truthy]) => {
    if (truthy) result += ` ${part}`;
    return result;
  }, '');
}
