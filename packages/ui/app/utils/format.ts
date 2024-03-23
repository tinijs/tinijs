import {format} from 'prettier';
import * as pluginHTML from 'prettier/plugins/html';
import * as pluginPostCSS from 'prettier/plugins/postcss';

export function formatHTML(code: string) {
  return format(code, {
    parser: 'html',
    plugins: [pluginHTML],
    htmlWhitespaceSensitivity: 'ignore',
  });
}

export function formatCSS(code: string) {
  return format(code, {
    parser: 'css',
    plugins: [pluginPostCSS],
  });
}
