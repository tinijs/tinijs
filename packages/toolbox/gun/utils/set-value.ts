import type {IGunChain} from 'gun';

export async function setValue(chain: IGunChain<any>, key: string, value: any) {
  return new Promise<true>((resolve, reject) =>
    chain.get(key).put(value, (result: any) => {
      if (result.err) return reject(new Error(result.err));
      resolve(true);
    })
  );
}

export default setValue;
export type SetValueUtil = typeof setValue;
