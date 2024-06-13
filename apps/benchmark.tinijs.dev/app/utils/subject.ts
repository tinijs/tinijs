export function info({
  title,
  path,
  docPath,
  variants,
  suggestedItems,
}: {
  title: string;
  path: string;
  docPath: string;
  variants: number;
  suggestedItems: number;
}) {
  const suggestedRepeats = Math.round(suggestedItems / variants);
  const suggestedLoadsText = `${suggestedItems.toLocaleString()} items (${suggestedRepeats.toLocaleString()} repeats)`;
  const url = path + (suggestedItems <= 1 ? '' : `?repeat=${suggestedRepeats}`);
  const docUrl = `https://tinijs.dev${docPath}`;
  const psiUrl =
    'https://pagespeed.web.dev/report?url=' +
    encodeURIComponent(`https://benchmark.tinijs.dev${url}`);
  return {
    title,
    path,
    docPath,
    variants,
    suggestedItems,
    suggestedRepeats,
    suggestedLoadsText,
    url,
    docUrl,
    psiUrl,
  };
}

export function repeat(
  count: number,
  callback: (no: number) => any,
  suggestedCount: number
) {
  count = Math.round(count);
  const maxCount = suggestedCount * 3;
  const length = Math.min(count, maxCount || count);
  return Array.from({length}, (_, i) => callback(i + 1));
}
