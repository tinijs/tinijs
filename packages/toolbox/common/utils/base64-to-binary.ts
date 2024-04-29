export function base64ToBinary(base64: string) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export default base64ToBinary;
export type Base64ToBinaryUtil = typeof base64ToBinary;
