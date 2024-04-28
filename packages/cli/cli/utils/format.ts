import {format, type Options} from 'prettier';

export async function formatHTML(content: string, options?: Options) {
  return format(content, {parser: 'html', ...options});
}

export async function formatTS(content: string, options?: Options) {
  return format(content, {
    parser: 'typescript',
    singleQuote: true,
    bracketSpacing: false,
    ...options,
  });
}
