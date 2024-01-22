import {PartAttrInfo} from './types';

export function partAttrMap(info: PartAttrInfo) {
  return Object.entries(info).reduce((result, [partAttr, truthy]) => {
    if (truthy) result += ` ${partAttr}`;
    return result;
  }, '');
}
