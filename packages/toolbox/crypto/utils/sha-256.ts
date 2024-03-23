import {textToBinary} from '../../common/utils/text-to-binary.js';
import {binaryToText} from '../../common/utils/binary-to-text.js';
import {binaryToHex} from '../../common/utils/binary-to-hex.js';
import {binaryToBase64} from '../../common/utils/binary-to-base64.js';

export enum HashEncoding {
  Base64 = 'base64',
  Hex = 'hex',
  Utf8 = 'utf8',
}

export type Sha256 = typeof sha256;

export async function sha256(
  input: string,
  encode: HashEncoding = HashEncoding.Base64
) {
  const hash = await crypto.subtle.digest('SHA-256', textToBinary(input));
  return encode === HashEncoding.Utf8
    ? binaryToText(hash)
    : encode === HashEncoding.Hex
      ? binaryToHex(hash)
      : binaryToBase64(hash);
}

export default sha256;
