import type {IGunChain} from 'gun';

export async function putValue(chain: IGunChain<any>, value: any) {
  return new Promise<true>((resolve, reject) =>
    chain.put(value, (result: any) => {
      if (result.err) return reject(new Error(result.err));
      resolve(true);
    })
  );
}

export default putValue;
export type PutValueUtil = typeof putValue;
