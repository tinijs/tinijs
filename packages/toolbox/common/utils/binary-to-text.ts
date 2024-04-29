export function binaryToText(binary: ArrayBuffer) {
  return new TextDecoder('utf-8').decode(binary);
}

export default binaryToText;
export type BinaryToTextUtil = typeof binaryToText;
