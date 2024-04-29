import {binaryToBase64} from '../../common/utils/binary-to-base64.js';
import {textToBinary} from '../../common/utils/text-to-binary.js';
import {RSA_ALGORITHM} from './generate-rsa-keys.js';

export async function encryptRSA(publicKey: CryptoKey, raw: string) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const cipher = await crypto.subtle.encrypt(
    {
      name: RSA_ALGORITHM.name,
      iv,
    },
    publicKey,
    textToBinary(raw)
  );
  const vector = binaryToBase64(iv, true);
  return `RSA${JSON.stringify({
    ct: binaryToBase64(cipher, true),
    iv: vector,
  })}`;
}

export default encryptRSA;
export type EncryptRSAUtil = typeof encryptRSA;
