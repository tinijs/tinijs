import {base64ToBinary} from '../../common/utils/base64-to-binary.js';
import {RSA_ALGORITHM} from './generate-rsa-keys.js';

export async function importRSAPrivateKey(base64: string) {
  const keyData = base64ToBinary(base64);
  return await crypto.subtle.importKey('pkcs8', keyData, RSA_ALGORITHM, false, [
    'decrypt',
  ]);
}

export default importRSAPrivateKey;
export type ImportRSAPrivateKeyUtil = typeof importRSAPrivateKey;
