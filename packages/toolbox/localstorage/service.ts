import {createLocalForage} from './utils/create-local-forage.js';
import {keys} from './utils/keys.js';
import {get} from './utils/get.js';
import {getBulk} from './utils/get-bulk.js';
import {set} from './utils/set.js';
import {setBulk} from './utils/set-bulk.js';
import {increment} from './utils/increment.js';
import {iterate} from './utils/iterate.js';
import {iterateKeys} from './utils/iterate-keys.js';
import {remove} from './utils/remove.js';
import {removeBulk} from './utils/remove-bulk.js';
import {removeByPrefix} from './utils/remove-by-prefix.js';
import {removeBySuffix} from './utils/remove-by-suffix.js';
import {clear} from './utils/clear.js';

export class LocalstorageService {
  readonly localForage: LocalForage;

  constructor(
    readonly localForageOptions: Parameters<typeof createLocalForage>[0]
  ) {
    this.localForage = createLocalForage(localForageOptions);
  }

  keys() {
    return keys(this.localForage);
  }

  get<Data>(key: Parameters<typeof get>[1]) {
    return get<Data>(this.localForage, key);
  }

  getBulk<Result>(keys: Parameters<typeof getBulk>[1]) {
    return getBulk<Result>(this.localForage, keys);
  }

  set<Data>(key: Parameters<typeof set>[1], data: Data) {
    return set<Data>(this.localForage, key, data);
  }

  setBulk(input: Parameters<typeof setBulk>[1]) {
    return setBulk(this.localForage, input);
  }

  increment(
    key: Parameters<typeof increment>[1],
    by?: Parameters<typeof increment>[2]
  ) {
    return increment(this.localForage, key, by);
  }

  iterate<Data>(handler: Parameters<typeof iterate>[1]) {
    return iterate<Data>(this.localForage, handler);
  }

  iterateKeys(handler: Parameters<typeof iterateKeys>[1]) {
    return iterateKeys(this.localForage, handler);
  }

  remove(key: Parameters<typeof remove>[1]) {
    return remove(this.localForage, key);
  }

  removeBulk(keys: Parameters<typeof removeBulk>[1]) {
    return removeBulk(this.localForage, keys);
  }

  removeByPrefix(prefix: Parameters<typeof removeByPrefix>[1]) {
    return removeByPrefix(this.localForage, prefix);
  }

  removeBySuffix(suffix: Parameters<typeof removeBySuffix>[1]) {
    return removeBySuffix(this.localForage, suffix);
  }

  clear() {
    return clear(this.localForage);
  }
}

export default LocalstorageService;
