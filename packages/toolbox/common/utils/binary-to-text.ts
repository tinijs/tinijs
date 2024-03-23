export type BinaryToText = typeof binaryToText;

export function binaryToText(binary: ArrayBuffer) {
  return new TextDecoder('utf-8').decode(binary);
}

export default binaryToText;
