export type Retry = typeof retry;

export async function retry<Value>(
  handler: () => Promise<Value>,
  withTimeout: false | number = 0
) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<Value>(async resolve =>
    typeof withTimeout !== 'number' || withTimeout < 0
      ? resolve(await handler())
      : setTimeout(async () => resolve(await handler()), withTimeout)
  );
}

export default retry;
