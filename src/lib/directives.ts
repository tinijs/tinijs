import {PartInfo} from './types';

export function partMap(info: PartInfo) {
  return Object.keys(info).reduce((result, part) => {
    if (info[part]) result += ` ${part}`;
    return result;
  }, '');
}
