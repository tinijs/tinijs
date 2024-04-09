import {DenormList} from '../types/common.js';
import {slugify} from './slugify.js';

export function parseDenorm<Type = Record<string, unknown>>(
  input: string | Type,
  fieldName = 'title'
) {
  if (typeof input !== 'string') return input;
  const slugMatching = input.match(/<([\s\S]*?)>/);
  if (!slugMatching) {
    return {
      slug: slugify(input),
      [fieldName]: input,
    } as Type;
  } else {
    return {
      slug: slugMatching[1].trim(),
      [fieldName]: input.replace(slugMatching[0], '').trim(),
    } as Type;
  }
}

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
