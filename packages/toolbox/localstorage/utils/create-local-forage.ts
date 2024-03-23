/* eslint-disable @typescript-eslint/no-explicit-any */
import {createInstance} from 'localforage';

export type CreateLocalForage = typeof createLocalForage;

export function createLocalForage(localForageOptions: LocalForageOptions = {}) {
  return createInstance({
    name: 'TINI_APP_LOCAL_STORAGE',
    ...localForageOptions,
  });
}

export default createLocalForage;

/*
 * https://github.com/localForage/localForage/blob/master/typings/localforage.d.ts
 */

export interface LocalForageDbInstanceOptions {
  name?: string;
  storeName?: string;
}

export interface LocalForageOptions extends LocalForageDbInstanceOptions {
  driver?: string | string[];
  size?: number;
  version?: number;
  description?: string;
}

export interface LocalForageDbMethodsCore {
  getItem<T>(
    key: string,
    callback?: (err: any, value: T | null) => void
  ): Promise<T | null>;
  setItem<T>(
    key: string,
    value: T,
    callback?: (err: any, value: T) => void
  ): Promise<T>;
  removeItem(key: string, callback?: (err: any) => void): Promise<void>;
  clear(callback?: (err: any) => void): Promise<void>;
  length(callback?: (err: any, numberOfKeys: number) => void): Promise<number>;
  key(
    keyIndex: number,
    callback?: (err: any, key: string) => void
  ): Promise<string>;
  keys(callback?: (err: any, keys: string[]) => void): Promise<string[]>;
  iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U,
    callback?: (err: any, result: U) => void
  ): Promise<U>;
}

export interface LocalForageDropInstanceFn {
  (
    dbInstanceOptions?: LocalForageDbInstanceOptions,
    callback?: (err: any) => void
  ): Promise<void>;
}

export interface LocalForageDriverMethodsOptional {
  dropInstance?: LocalForageDropInstanceFn;
}

export interface LocalForageDbMethodsOptional {
  dropInstance: LocalForageDropInstanceFn;
}

export interface LocalForageDriverDbMethods
  extends LocalForageDbMethodsCore,
    LocalForageDriverMethodsOptional {}

export interface LocalForageDriverSupportFunc {
  (): Promise<boolean>;
}

export interface LocalForageDriver extends LocalForageDriverDbMethods {
  _driver: string;
  _initStorage(options: LocalForageOptions): void;
  _support?: boolean | LocalForageDriverSupportFunc;
}

export interface LocalForageSerializer {
  serialize<T>(
    value: T | ArrayBuffer | Blob,
    callback: (value: string, error: any) => void
  ): void;
  deserialize<T>(value: string): T | ArrayBuffer | Blob;
  stringToBuffer(serializedString: string): ArrayBuffer;
  bufferToString(buffer: ArrayBuffer): string;
}

export interface LocalForageDbMethods
  extends LocalForageDbMethodsCore,
    LocalForageDbMethodsOptional {}

export interface LocalForage extends LocalForageDbMethods {
  LOCALSTORAGE: string;
  WEBSQL: string;
  INDEXEDDB: string;
  config(options: LocalForageOptions): boolean;
  config(options: string): any;
  config(): LocalForageOptions;
  createInstance(options: LocalForageOptions): LocalForage;
  driver(): string;
  setDriver(
    driver: string | string[],
    callback?: () => void,
    errorCallback?: (error: any) => void
  ): Promise<void>;
  defineDriver(
    driver: LocalForageDriver,
    callback?: () => void,
    errorCallback?: (error: any) => void
  ): Promise<void>;
  getDriver(driver: string): Promise<LocalForageDriver>;
  getSerializer(
    callback?: (serializer: LocalForageSerializer) => void
  ): Promise<LocalForageSerializer>;
  supports(driverName: string): boolean;
  ready(callback?: (error: any) => void): Promise<void>;
}
