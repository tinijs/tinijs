import {IGunChain, IGunOnEvent} from 'gun';

import {retry} from '../../common/utils/retry.js';
import {deduplicateCallback} from '../../common/utils/deduplicate-callback.js';
import {importRSAPublicKey} from '../../crypto/utils/import-rsa-public-key.js';
import {
  GunResult,
  GunLink,
  createGunInstance,
} from '../utils/create-gun-instance.js';
import {extractKeys} from '../utils/extract-keys.js';
import {
  StreamContextEntry,
  StreamContext,
  StreamCallback,
  StreamOptions,
  createStream,
  Stream,
} from '../utils/create-stream.js';

export interface UserNode {
  alias: string;
  pub: string;
  epub: string;
  avatar: string;
  createdAt: string;
  rsaPub: string;
  rsaPriv: string;
}

export type User = Pick<
  UserNode,
  'alias' | 'pub' | 'epub' | 'avatar' | 'createdAt'
> & {
  id: string;
  name: string;
  rpub: CryptoKey;
};

export type EditableProfile = Partial<Pick<User, 'avatar'>>;

export class UserService {
  readonly TOP_NODE_NAME = '#users';

  constructor(readonly gunInstance: ReturnType<typeof createGunInstance>) {}

  get GUN() {
    return this.gunInstance.gun;
  }

  get usersChain() {
    return this.GUN.get(this.TOP_NODE_NAME);
  }

  getChainById(id: string) {
    return this.GUN.user(id.replace('~', '')) as unknown as IGunChain<any>;
  }

  getChainByAlias(alias: string) {
    return this.GUN.user(`@${alias}`) as unknown as IGunChain<any>;
  }

  async extractNodeData(
    userNode: GunResult<UserNode>,
    key: string,
    retries = 7
  ): Promise<User | null> {
    if (!userNode) return null;
    const {alias, pub, epub, avatar, createdAt, rsaPub} = userNode;
    if (!pub || !epub || !rsaPub) return null;
    try {
      const rpub = await importRSAPublicKey(rsaPub);
      if (!rpub) throw null;
      const user: User = {
        id: key,
        pub,
        epub,
        rpub,
        alias,
        name: alias,
        avatar,
        createdAt,
      };
      return user;
    } catch (error) {
      if (retries <= 0) return null;
      return await retry(() => this.extractNodeData(userNode, key, --retries));
    }
  }

  async getById(id: string) {
    const chain = this.getChainById(id);
    return new Promise<User | null>(resolve =>
      chain.once(async (userNode: UserNode, key: string) => {
        const user = await this.extractNodeData(userNode, key);
        resolve(user);
      })
    );
  }

  streamById(
    id: string,
    callback: StreamCallback<User | null>,
    options?: StreamOptions
  ) {
    const stream = createStream(callback, options);
    const chain = this.getChainById(id);
    // create handlers
    const userHandler = this.createUserStreamHandler(stream);
    // start stream
    chain.on(userHandler);
  }

  async getByAlias(alias: string) {
    const chain = this.getChainByAlias(alias);
    return new Promise<User | null>(resolve =>
      chain.once(async (record: GunResult<Record<string, GunLink>>) => {
        const [userId] = extractKeys(record || {});
        if (!userId) return resolve(null);
        resolve(await this.getById(userId));
      })
    );
  }

  streamByAlias(
    alias: string,
    callback: StreamCallback<User | null>,
    options?: StreamOptions
  ) {
    const stream = createStream(callback, options);
    const chain = this.getChainByAlias(alias);
    // create handlers
    const aliasHandler = this.createAliasStreamHandler(chain, stream);
    // start stream
    chain.on(aliasHandler);
  }

  private createUserStreamHandler(stream: Stream<User | null>) {
    const handler = deduplicateCallback(
      async (
        userNode: GunResult<UserNode>,
        key: string,
        message: any,
        event: IGunOnEvent,
        context?: StreamContext
      ) => {
        (context ||= new Map<string, StreamContextEntry>()).set(key, {
          raw: userNode,
          message,
          event,
        });
        // process user node
        const user = !userNode
          ? null
          : await this.extractNodeData(userNode, key);
        // result
        return stream.emitValue(user, context);
      }
    );
    return handler;
  }

  private createAliasStreamHandler(
    chain: IGunChain<any>,
    stream: Stream<User | null>
  ) {
    const handler = deduplicateCallback(
      async (
        record: GunResult<Record<string, GunLink>>,
        key: string,
        message: any,
        event: IGunOnEvent,
        context?: StreamContext
      ) => {
        (context ||= new Map<string, StreamContextEntry>()).set(key, {
          raw: record,
          message,
          event,
        });
        // get user id
        const [userId] = extractKeys(record || {});
        if (!userId) return stream.emitValue(null, context, false);
        // create handlers
        const userHandler = this.createUserStreamHandler(stream);
        // start stream
        return chain
          .get(userId)
          .on((...params) => userHandler(...params, context));
      }
    );
    return handler;
  }
}

export default UserService;
