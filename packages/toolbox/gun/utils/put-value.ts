import {IGunChain} from 'gun';

export type PutValue = typeof putValue;

export async function putValue(chain: IGunChain<any>, value: any) {
  return new Promise<true>((resolve, reject) =>
    chain.put(value, (result: any) => {
      if (result.err) return reject(new Error(result.err));
      resolve(true);
    })
  );
}

export default putValue;
