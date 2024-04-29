import {textToBinary} from '../../common/utils/text-to-binary.js';
import {binaryToText} from '../../common/utils/binary-to-text.js';
import {binaryToHex} from '../../common/utils/binary-to-hex.js';
import {binaryToBase64} from '../../common/utils/binary-to-base64.js';
import {HashEncoding} from './sha-256.js';

export const HMAC_ALGORITHM: HmacKeyGenParams = {name: 'HMAC', hash: 'SHA-256'};

export async function hmac(
  input: string,
  secret: string,
  encode: HashEncoding = HashEncoding.Base64
) {
  const key = await crypto.subtle.importKey(
    'raw',
    textToBinary(secret),
    HMAC_ALGORITHM,
    false,
    ['sign', 'verify']
  );
  const signature = await crypto.subtle.sign(
    HMAC_ALGORITHM.name,
    key,
    textToBinary(input)
  );
  return encode === HashEncoding.Utf8
    ? binaryToText(signature)
    : encode === HashEncoding.Hex
      ? binaryToHex(signature)
      : binaryToBase64(signature);
}

export default hmac;
export type HmacUtil = typeof hmac;
