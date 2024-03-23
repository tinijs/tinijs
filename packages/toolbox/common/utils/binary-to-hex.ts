export type BinaryToHex = typeof binaryToHex;

export function binaryToHex(binary: ArrayBuffer) {
  return Array.from(new Uint8Array(binary))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default binaryToHex;
