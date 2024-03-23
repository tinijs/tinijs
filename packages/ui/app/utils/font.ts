import {FONTS} from '../consts/theme';

const FONT_SUPPLIERS_RECORD = FONTS.reduce(
  (result, [font, webSafe]) => {
    result[font] = webSafe ? 'classic' : 'google';
    return result;
  },
  {} as Record<string, string>
);

export function buildGoogleFontUrl(
  fonts: Array<{font: string; weights?: string[]}>
) {
  const content = fonts
    .map(({font, weights = ['400', '700']}) => {
      const family = font.split(',')[0].replace(/'|"/g, '').replace(/ /g, '+');
      return `family=${family}:wght@${weights.join(';')}`;
    })
    .join('&');
  return `https://fonts.googleapis.com/css2?${content}&display=swap`;
}

export function isGoogleFont(font: string) {
  return FONT_SUPPLIERS_RECORD[font] === 'google';
}

export function loadGoogleFont(font: string, weights?: string[]) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = buildGoogleFontUrl([{font, weights}]);
    link.addEventListener('load', resolve);
    link.addEventListener('error', reject);
    document.head.appendChild(link);
  });
}
