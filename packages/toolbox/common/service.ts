import {binaryToHex} from './utils/binary-to-hex.js';
import {hexToBinary} from './utils/hex-to-binary.js';
import {binaryToText} from './utils/binary-to-text.js';
import {textToBinary} from './utils/text-to-binary.js';
import {binaryToBase64} from './utils/binary-to-base64.js';
import {base64ToBinary} from './utils/base64-to-binary.js';
import {retry} from './utils/retry.js';
import {slugify} from './utils/slugify.js';
import {debounce} from './utils/debounce.js';
import {once} from './utils/once.js';
import {deduplicateCallback} from './utils/deduplicate-callback.js';
import {transliterate} from './utils/transliterate.js';

export class CommonService {
  binaryToHex = binaryToHex;
  hexToBinary = hexToBinary;
  binaryToText = binaryToText;
  textToBinary = textToBinary;
  binaryToBase64 = binaryToBase64;
  base64ToBinary = base64ToBinary;
  retry = retry;
  slugify = slugify;
  debounce = debounce;
  once = once;
  deduplicateCallback = deduplicateCallback;
  transliterate = transliterate;
}

export default CommonService;
