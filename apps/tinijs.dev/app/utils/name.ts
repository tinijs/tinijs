import slugify from '@sindresorhus/slugify';
import * as changeCase from 'change-case';

export interface Names {
  originalName: string;
  cleanName: string;
  noCase: string;
  kebabCase: string;
  camelCase: string;
  pascalCase: string;
  capitalCase: string;
  constantCase: string;
  snakeCase: string;
  varName: string;
  constName: string;
  className: string;
  tagName: string;
}

export function parseName(
  originalName: string,
  transfomer?: (names: Names) => Partial<Names>
) {
  const cleanName = slugify(originalName);
  // case
  const kebabCase = cleanName;
  const noCase = changeCase.noCase(cleanName);
  const camelCase = changeCase.camelCase(cleanName);
  const pascalCase = changeCase.pascalCase(cleanName);
  const capitalCase = changeCase.capitalCase(cleanName);
  const constantCase = changeCase.constantCase(cleanName);
  const snakeCase = changeCase.snakeCase(cleanName);
  // type
  const varName = camelCase;
  const constName = constantCase;
  const className = pascalCase;
  const tagName = kebabCase;
  // result
  const names: Names = {
    originalName,
    cleanName,
    noCase,
    kebabCase,
    camelCase,
    pascalCase,
    capitalCase,
    constantCase,
    snakeCase,
    varName,
    constName,
    className,
    tagName,
  };
  return !transfomer ? names : {...names, ...transfomer(names)};
}
