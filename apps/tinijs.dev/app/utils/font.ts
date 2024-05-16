export const FONTS: Array<[string, true?]> = [
  // web safe fonts
  ["'Arial', sans-serif", true],
  ["'Verdana', sans-serif", true],
  ["'Tahoma', sans-serif", true],
  ["'Trebuchet MS', sans-serif", true],
  ["'Helvetica', sans-serif", true],
  ["'Times New Roman', serif", true],
  ["'Georgia', serif", true],
  ["'Garamond', serif", true],
  ["'Palatino', serif", true],
  ["'Baskerville', serif", true],
  ["'Brush Script MT', cursive", true],
  ["'Comic Sans MS', cursive", true],
  ["'Bradley Hand', cursive", true],
  ["'Courier', monospace", true],
  ["'Lucida', monospace", true],
  ["'Monaco', monospace", true],
  // Google fonts
  ["'Roboto', sans-serif"],
  ["'Open Sans', sans-serif"],
  ["'Montserrat', sans-serif"],
  ["'Poppins', sans-serif"],
  ["'Lato', sans-serif"],
  ["'Roboto Slab', serif"],
  ["'Playfair Display', serif"],
  ["'Merriweather', serif"],
  ["'Lora', serif"],
  ["'Noto Serif', serif"],
  ["'Dancing Script', cursive"],
  ["'Pacifico', cursive"],
  ["'Lobster', cursive"],
  ["'Caveat', cursive"],
  ["'Satisfy', cursive"],
  ["'Roboto Mono', monospace"],
  ["'Source Code Pro', monospace"],
  ["'Space Mono', monospace"],
  ["'IBM Plex Mono', monospace"],
  ["'Ubuntu Mono', monospace"],
];

const FONT_SUPPLIERS_RECORD = FONTS.reduce(
  (result, [font, webSafe]) => {
    result[font] = webSafe ? 'classic' : 'google';
    return result;
  },
  {} as Record<string, string>
);
export function isGoogleFont(font: string) {
  return FONT_SUPPLIERS_RECORD[font] === 'google';
}

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
