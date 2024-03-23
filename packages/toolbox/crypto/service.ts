import {sha256} from './utils/sha-256.js';
import {hmac} from './utils/hmac.js';
import {generateRSAKeys} from './utils/generate-rsa-keys.js';
import {importRSAPublicKey} from './utils/import-rsa-public-key.js';
import {importRSAPrivateKey} from './utils/import-rsa-private-key.js';
import {encryptRSA} from './utils/encrypt-rsa.js';
import {decryptRSA} from './utils/decrypt-rsa.js';

export class CryptoService {
  sha256 = sha256;
  hmac = hmac;
  generateRSAKeys = generateRSAKeys;
  importRSAPublicKey = importRSAPublicKey;
  importRSAPrivateKey = importRSAPrivateKey;
  encryptRSA = encryptRSA;
  decryptRSA = decryptRSA;
}

export default CryptoService;
