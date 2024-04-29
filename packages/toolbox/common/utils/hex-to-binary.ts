export function hexToBinary(hex: string) {
  return Uint8Array.from(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

export default hexToBinary;
export type HexToBinaryUtil = typeof hexToBinary;
