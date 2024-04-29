import {base64ToBinary} from '../../common/utils/base64-to-binary.js';
import {binaryToText} from '../../common/utils/binary-to-text.js';
import {RSA_ALGORITHM} from './generate-rsa-keys.js';

export async function decryptRSA(privateKey: CryptoKey, cipherPlus: string) {
  if (!cipherPlus.startsWith('RSA')) throw new Error('Invalid cipher content!');
  const {ct: cipher, iv: vector} = JSON.parse(cipherPlus.slice(3)) as {
    ct: string;
    iv: string;
  };
  const rawData = await crypto.subtle.decrypt(
    {
      name: RSA_ALGORITHM.name,
      iv: base64ToBinary(vector),
    },
    privateKey,
    base64ToBinary(cipher)
  );
  return binaryToText(rawData);
}

export default decryptRSA;
export type DecryptRSAUtil = typeof decryptRSA;
