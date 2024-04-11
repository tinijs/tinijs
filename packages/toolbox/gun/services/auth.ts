import {sha256} from '../../crypto/utils/sha-256.js';
import {hmac} from '../../crypto/utils/hmac.js';
import {generateRSAKeys} from '../../crypto/utils/generate-rsa-keys.js';
import {encryptRSA} from '../../crypto/utils/encrypt-rsa.js';
import {decryptRSA} from '../../crypto/utils/decrypt-rsa.js';
import {createGunInstance} from '../utils/create-gun-instance.js';
import type {StreamCallback} from '../utils/create-stream.js';
import {emitStaticValue} from '../utils/emit-static-value.js';
import {setValue} from '../utils/set-value.js';
import {setValues} from '../utils/set-values.js';

import {UserService, type User, type EditableProfile} from './user.js';

export class AuthService {
  private readonly ERRORS = {
    NO_USER: new Error('Unauthenticated!'),
    NO_RSA: new Error('RSA key pair not loaded!'),
    NO_SECRET: new Error('Failed to generate secret!'),
    NO_ENCRYPTION_DATA: new Error('Empty data!'),
    ENCRYPT_FAILED: new Error('Failed to encrypt data!'),
    DECRYPT_FAILED: new Error('Failed to decrypt data!'),
    SIGNOUT_FAILED: new Error('Failed to sign out!'),
  };

  constructor(
    readonly userService: UserService,
    readonly gunInstance: ReturnType<typeof createGunInstance>
  ) {}

  get GUN() {
    return this.gunInstance.gun;
  }

  get GUN_USER() {
    return this.gunInstance.gunUser;
  }

  get SEA() {
    return this.gunInstance.sea;
  }

  get userChain() {
    return this.GUN_USER;
  }

  get currentUser() {
    const pair = (this.userChain._ as any)?.sea;
    const pairRSA = (this.userChain as any).rsa as {
      rpub: CryptoKey;
      rpriv: CryptoKey;
    };
    if (!pair) throw this.ERRORS.NO_USER;
    return {
      chain: this.userChain,
      id: `~${pair.pub}`,
      // original keys
      pair,
      pub: pair.pub,
      epub: pair.epub,
      // rsa keys
      pairRSA,
      rpub: pairRSA?.rpub,
    };
  }

  get userId() {
    return this.currentUser.id;
  }

  get userPair() {
    return this.currentUser.pair;
  }

  get userPairRSA() {
    const pair = this.currentUser.pairRSA;
    if (!pair) throw this.ERRORS.NO_RSA;
    return pair;
  }

  get userPub() {
    return this.currentUser.pub;
  }

  get userEpub() {
    return this.currentUser.epub;
  }

  get userRpub() {
    return this.userPairRSA.rpub;
  }

  async hashSecret(participantEpub: string, data: string) {
    const secret = await this.SEA.secret(participantEpub, this.userPair);
    if (!secret) throw this.ERRORS.NO_SECRET;
    return hmac(data, secret);
  }

  async encrypt(raw: string, receiverEpub?: string): Promise<string> {
    if (!raw) throw this.ERRORS.NO_ENCRYPTION_DATA;
    const secret = !receiverEpub
      ? this.userPair
      : await this.SEA.secret(receiverEpub, this.userPair);
    if (!secret) throw this.ERRORS.NO_SECRET;
    const result = await this.SEA.encrypt(raw, secret);
    if (!result || typeof result !== 'string') throw this.ERRORS.ENCRYPT_FAILED;
    return result;
  }

  async decrypt(cipherPlus: string, senderEpub?: string): Promise<string> {
    if (!cipherPlus) throw this.ERRORS.NO_ENCRYPTION_DATA;
    const secret = !senderEpub
      ? this.userPair
      : await this.SEA.secret(senderEpub, this.userPair);
    if (!secret) throw this.ERRORS.NO_SECRET;
    const result = await this.SEA.decrypt(cipherPlus, secret);
    if (!result || typeof result !== 'string') throw this.ERRORS.DECRYPT_FAILED;
    return result;
  }

  async encryptRSA(receiverRpub: CryptoKey, raw: string) {
    return encryptRSA(receiverRpub, raw);
  }

  async decryptRSA(cipherPlus: string) {
    return decryptRSA(this.userPairRSA.rpriv, cipherPlus);
  }

  async sign(data: any) {
    return this.SEA.sign(data, this.userPair);
  }

  async verify(message: string, senderEpub: string) {
    return this.SEA.verify(message, senderEpub);
  }

  async getProfile() {
    return this.userService.getById(this.userId);
  }

  async streamProfile(callback: StreamCallback<User | null>) {
    try {
      this.userService.streamById(this.userId, callback);
    } catch (error) {
      emitStaticValue(callback);
    }
  }

  async updateProfile(editableProfile: EditableProfile) {
    return setValues(this.userChain as any, editableProfile);
  }

  async createUser(
    alias: string,
    password: string,
    editableProfile: EditableProfile
  ) {
    return new Promise<true>((resolve, reject) =>
      this.userChain.create(alias, password, async (result: any) => {
        if (result.err) return reject(new Error(result.err));
        resolve(await this.initProfile(alias, password, editableProfile));
      })
    );
  }

  async signIn(alias: string, password: string) {
    return new Promise<true>((resolve, reject) =>
      this.userChain.auth(alias, password, (result: any) => {
        if (result.err) return reject(new Error(result.err));
        resolve(true);
      })
    );
  }

  signOut() {
    this.userChain.leave();
    delete (this.userChain as any).rsa;
    if ((this.userChain._ as any)?.sea) {
      throw this.ERRORS.SIGNOUT_FAILED;
    }
  }

  private async initProfile(
    alias: string,
    password: string,
    editableProfile: EditableProfile
  ) {
    return new Promise<true>((resolve, reject) =>
      this.userChain.auth(alias, password, async (result: any) => {
        if (result.err) return reject(new Error(result.err));
        // user profile
        const {publicKey, privateKey} = await generateRSAKeys();
        const rsaPriv = await this.encrypt(privateKey);
        await setValues(this.userChain as any, {
          ...editableProfile,
          createdAt: new Date().toISOString(),
          rsaPub: publicKey,
          rsaPriv,
        });
        // users index
        const userId = this.userId;
        const userIdHash = await sha256(userId);
        await setValue(this.userService.usersChain, userIdHash, userId);
        // result
        resolve(true);
      })
    );
  }
}

export default AuthService;
