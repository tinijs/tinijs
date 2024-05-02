import {transform} from 'lightningcss';

export function minifyCSS(css: string) {
  const {code} = transform({
    filename: 'style.css',
    code: Buffer.from(css),
    minify: true,
  });
  return code.toString();
}
