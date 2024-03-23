import {ClassInfo} from 'lit/directives/class-map.js';

export type PartAttrInfo = ClassInfo;

export function partAttrMap(info: PartAttrInfo) {
  return Object.entries(info).reduce((result, [partAttr, truthy]) => {
    if (truthy) result += ` ${partAttr}`;
    return result;
  }, '');
}
