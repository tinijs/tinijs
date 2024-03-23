import {IGun, GunOptions} from 'gun';
import Gun from 'gun/gun.js';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/sea';

export type GunResult<Type> = Type | null | undefined;
export type GunLink = GunResult<{'#': string}>;

export type CreateGunInstance = typeof createGunInstance;

export function createGunInstance(root: string, options?: GunOptions) {
  const gun = (Gun as unknown as IGun)(
    options || {
      localStorage: false,
      peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        'https://peer.wallie.io/gun',
        'https://gundb-relay-mlccl.ondigitalocean.app/gun',
        'https://plankton-app-6qfp3.ondigitalocean.app',
      ],
    }
  );
  const gunUser = gun.user();
  const sea = (Gun as unknown as IGun).SEA;
  return {gun, gunUser, sea, root};
}

export default createGunInstance;
