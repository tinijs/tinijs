import {createGunInstance} from './utils/create-gun-instance.js';
import {initUserActions} from './utils/init-user-actions.js';
import {extractEntries} from './utils/extract-entries.js';
import {extractKeys} from './utils/extract-keys.js';
import {extractValues} from './utils/extract-values.js';
import {putValue} from './utils/put-value.js';
import {setValue} from './utils/set-value.js';
import {setValues} from './utils/set-values.js';
import {createStream} from './utils/create-stream.js';
import {promisifyStream} from './utils/promisify-stream.js';
import {emitStaticValue} from './utils/emit-static-value.js';
import {emitStreamValue} from './utils/emit-stream-value.js';

export class GunService {
  createGunInstance = createGunInstance;
  initUserActions = initUserActions;
  extractEntries = extractEntries;
  extractKeys = extractKeys;
  extractValues = extractValues;
  putValue = putValue;
  setValue = setValue;
  setValues = setValues;
  createStream = createStream;
  promisifyStream = promisifyStream;
  emitStaticValue = emitStaticValue;
  emitStreamValue = emitStreamValue;
}

export default GunService;
