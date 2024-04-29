export function textToBinary(text: string) {
  return new TextEncoder().encode(text);
}

export default textToBinary;
export type TextToBinaryUtil = typeof textToBinary;
