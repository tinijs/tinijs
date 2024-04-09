import slugify_ from '@sindresorhus/slugify';

export type Slugify = typeof slugify;

export function slugify(
  input: string,
  options?: Parameters<typeof slugify_>[1]
) {
  return slugify_(input, options);
}

export default slugify;
