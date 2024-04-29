import {base64ToBinary} from '../../common/utils/base64-to-binary.js';
import {RSA_ALGORITHM} from './generate-rsa-keys.js';

export async function importRSAPublicKey(base64: string) {
  const keyData = base64ToBinary(base64);
  return await crypto.subtle.importKey('spki', keyData, RSA_ALGORITHM, false, [
    'encrypt',
  ]);
}

export default importRSAPublicKey;
export type ImportRSAPublicKeyUtil = typeof importRSAPublicKey;
