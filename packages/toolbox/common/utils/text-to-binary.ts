export type TextToBinary = typeof textToBinary;

export function textToBinary(text: string) {
  return new TextEncoder().encode(text);
}

export default textToBinary;
