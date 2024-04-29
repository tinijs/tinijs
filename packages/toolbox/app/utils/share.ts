import 'share-api-polyfill';

export async function share(data: ShareData) {
  if (!navigator.share) return;
  return navigator.share(data);
}

export default share;
export type ShareUtil = typeof share;
