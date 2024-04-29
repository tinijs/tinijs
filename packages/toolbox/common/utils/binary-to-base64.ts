export function binaryToBase64(binary: ArrayBuffer, noPadding = false) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(binary)));
  return !noPadding ? base64 : base64.replace(/=+$/, '');
}

export default binaryToBase64;
export type BinaryToBase64Util = typeof binaryToBase64;
