import 'share-api-polyfill';

export type Share = typeof share;

export async function share(data: ShareData) {
  if (!navigator.share) return;
  return navigator.share(data);
}

export default share;
