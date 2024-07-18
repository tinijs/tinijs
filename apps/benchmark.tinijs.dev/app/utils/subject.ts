export function info({
  title,
  desc,
  path,
  docPath,
  batches,
}: {
  title: string;
  desc: string;
  path: string;
  docPath: string;
  batches: number[];
}) {
  const variants = batches[0];
  const suggestedItems = batches[batches.length - 1] || variants;
  const suggestedLoadText = `${suggestedItems.toLocaleString()} items`;
  const url = path + (suggestedItems <= 1 ? '' : `?items=${suggestedItems}`);
  const docUrl = `https://tinijs.dev${docPath}`;
  const psiUrl =
    'https://pagespeed.web.dev/report?url=' +
    encodeURIComponent(`https://benchmark.tinijs.dev${url}`);
  return {
    title,
    desc,
    path,
    docPath,
    batches,
    variants,
    suggestedItems,
    suggestedLoadText,
    url,
    docUrl,
    psiUrl,
  };
}

export function repeat(
  items: number,
  callback: (no: number) => any,
  {variants, suggestedItems}: ReturnType<typeof info>
) {
  const repeats = Math.ceil(Math.max(items, variants) / variants);
  const maxRepeats = Math.ceil(suggestedItems / variants) * 3;
  const length = Math.min(repeats, maxRepeats || repeats);
  return Array.from({length}, (_, i) => callback(i + 1));
}
