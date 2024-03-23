export type Base64ToBinary = typeof base64ToBinary;

export function base64ToBinary(base64: string) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export default base64ToBinary;
