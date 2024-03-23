import transliterate_ from '@sindresorhus/transliterate';

export type Transliterate = typeof transliterate;

export function transliterate(
  input: string,
  options?: Parameters<typeof transliterate_>[1]
) {
  return transliterate_(input, options);
}

export default transliterate;
