import {DenormList} from '../../schema/common.js';
import {parseDenorm} from './parse-denorm.js';

export type ParseDenormList = typeof parseDenormList;

export function parseDenormList<Type = Record<string, unknown>>(
  list: DenormList<Type>,
  fieldName = 'title'
) {
  const result = [] as Type[];
  if (list instanceof Array) {
    list.forEach(item => result.push(parseDenorm(item, fieldName)));
  } else {
    Object.entries(list).forEach(([key, value]) =>
      result.push(
        parseDenorm(
          value instanceof Object
            ? (value as Type)
            : `${value === true ? key : value} <${key}>`,
          fieldName
        )
      )
    );
  }
  return result;
}

export default parseDenormList;
