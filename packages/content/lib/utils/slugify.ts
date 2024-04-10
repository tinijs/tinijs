import slugify_ from '@sindresorhus/slugify';

export function slugify(
  input: string,
  options?: Parameters<typeof slugify_>[1]
) {
  return slugify_(input, options);
}
