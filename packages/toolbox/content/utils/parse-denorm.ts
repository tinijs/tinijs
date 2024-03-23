import {slugify} from './slugify.js';

export type ParseDenorm = typeof parseDenorm;

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

export default parseDenorm;
