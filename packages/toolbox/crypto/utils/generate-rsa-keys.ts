import {binaryToBase64} from '../../common/utils/binary-to-base64.js';

export const RSA_ALGORITHM: RsaHashedKeyGenParams = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256',
};

export type GenerateRSAKeys = typeof generateRSAKeys;

export async function generateRSAKeys(modulusLength?: number) {
  const pair = await globalThis.crypto.subtle.generateKey(
    {
      ...RSA_ALGORITHM,
      modulusLength: modulusLength || RSA_ALGORITHM.modulusLength,
    },
    true,
    ['encrypt', 'decrypt']
  );
  return {
    publicKey: binaryToBase64(
      await globalThis.crypto.subtle.exportKey('spki', pair.publicKey),
      true
    ),
    privateKey: binaryToBase64(
      await globalThis.crypto.subtle.exportKey('pkcs8', pair.privateKey),
      true
    ),
  };
}

export default generateRSAKeys;
