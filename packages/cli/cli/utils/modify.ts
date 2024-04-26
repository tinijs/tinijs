import {resolve} from 'pathe';
import {readFile} from 'node:fs/promises';
import {outputFile, readJSON, writeJSON} from 'fs-extra/esm';
import {
  load,
  type CheerioAPI,
  type Cheerio,
  type Element as CheerioElement,
} from 'cheerio';
import type {Options as PrettierOptions} from 'prettier';
import type {Promisable} from 'type-fest';

import {formatHTML, formatTS} from './format.js';

export interface ModifyHTMLParams {
  $: CheerioAPI;
  $head: Cheerio<CheerioElement>;
  $body: Cheerio<CheerioElement>;
}

export async function modifyTextFile(
  filePath: string,
  modifier: (content: string) => Promisable<string>
) {
  filePath = resolve(filePath);
  const content = await readFile(filePath, 'utf8');
  return outputFile(filePath, await modifier(content));
}

export async function modifyJSONFile<Type>(
  filePath: string,
  modifier: (content: Type) => Promisable<Type>,
  formatOptions?: Parameters<typeof writeJSON>[2]
) {
  filePath = resolve(filePath);
  const data = (await readJSON(filePath)) as Type;
  return writeJSON(filePath, await modifier(data), formatOptions);
}

export async function modifyHTMLFile(
  filePath: string,
  modifier: (params: ModifyHTMLParams) => Promisable<void>,
  formatOptions?: PrettierOptions
) {
  filePath = resolve(filePath);
  const $ = load(await readFile(filePath, 'utf-8'));
  const $head = $('head');
  const $body = $('body');
  await modifier({$, $head, $body});
  return outputFile(filePath, await formatHTML($.html(), formatOptions));
}

export class ModifyComponentAlike {
  private identifierMatching!: RegExpMatchArray;

  constructor(
    private filePath: string,
    private content: string,
    private className: string
  ) {
    this.loadIdentifierMatching();
  }

  getResult() {
    return this.content;
  }

  direct(modifier: (content: string) => string) {
    this.content = modifier(this.content);
    return this as ModifyComponentAlike;
  }

  addImport(statement: string, afterPackage?: string) {
    const afterPackageEnding = !afterPackage ? null : `from '${afterPackage}';`;
    if (!afterPackageEnding || !this.content.includes(afterPackageEnding)) {
      this.content = `${afterPackageEnding}\n${this.content}`;
    } else {
      this.content = this.content.replace(
        afterPackageEnding,
        `${afterPackageEnding}\n${statement}`
      );
    }
    return this as ModifyComponentAlike;
  }

  addImplements(names: string) {
    const matchingContent = this.identifierMatching[0];
    this.content = this.content.replace(
      matchingContent,
      matchingContent.replace(
        '{',
        matchingContent.includes('implements')
          ? `, ${names} {`
          : ` implements ${names} {`
      )
    );
    this.loadIdentifierMatching();
    return this as ModifyComponentAlike;
  }

  addProperty(code: string) {
    const matchingContent = this.identifierMatching[0];
    this.content = this.content.replace(
      matchingContent,
      matchingContent + `\n  ${code}`
    );
    return this as ModifyComponentAlike;
  }

  addMethod(code: string) {
    const renderMatching = this.content.match(
      / (protected )?render\(([\s\S]*?) \{/
    );
    if (!renderMatching) {
      throw new Error(`Cannot find render method in ${this.filePath}`);
    } else {
      const matchingContent = renderMatching[0];
      this.content = this.content.replace(
        matchingContent,
        matchingContent + `\n  ${code}`
      );
    }
  }

  private loadIdentifierMatching() {
    const identifierMatching = this.content.match(
      new RegExp(`export class ${this.className}([\\s\\S]*?)\\{`)
    );
    if (!identifierMatching) {
      throw new Error(
        `Cannot find class ${this.className} in ${this.filePath}`
      );
    }
    return (this.identifierMatching = identifierMatching);
  }
}
export async function modifyComponentAlikeFile(
  filePath: string,
  className: string,
  modifier: (
    modify: ModifyComponentAlike
  ) => Promisable<void | ModifyComponentAlike>,
  formatOptions?: PrettierOptions
) {
  filePath = resolve(filePath);
  const content = await readFile(filePath, 'utf8');
  const modify = new ModifyComponentAlike(filePath, content, className);
  await modifier(modify);
  return outputFile(
    filePath,
    await formatTS(modify.getResult(), formatOptions)
  );
}

export class ModifyConfigAlike {
  private identifierMatching!: RegExpMatchArray;
  constructor(
    private filePath: string,
    private content: string
  ) {
    this.loadIdentifierMatching();
  }

  getResult() {
    return this.content;
  }

  direct(modifier: (content: string) => string) {
    this.content = modifier(this.content);
    return this as ModifyConfigAlike;
  }

  addOption(code: string) {
    const matchingContent = this.identifierMatching[0];
    this.content = this.content.replace(
      matchingContent,
      matchingContent + `\n  ${code}`
    );
    return this as ModifyConfigAlike;
  }

  addObjectEntry(optionKey: string, value: string) {
    const optionKeyMatching = `${optionKey}: {`;
    if (!this.content.includes(optionKeyMatching)) {
      return this.addOption(`${optionKey}: {${value}},`);
    } else {
      this.content = this.content.replace(
        optionKeyMatching,
        `${optionKeyMatching} ${value},`
      );
    }
    return this as ModifyConfigAlike;
  }

  addArrayItem(optionKey: string, value: string) {
    const optionKeyMatching = `${optionKey}: [`;
    if (!this.content.includes(optionKeyMatching)) {
      return this.addOption(`${optionKey}: [${value}],`);
    } else {
      this.content = this.content.replace(
        optionKeyMatching,
        `${optionKeyMatching} ${value},`
      );
    }
    return this as ModifyConfigAlike;
  }

  private loadIdentifierMatching() {
    const identifierMatching = this.content.match(
      /export default (defineTiniConfig\()?\{([\s\S]*?)/
    );
    if (!identifierMatching) {
      throw new Error(`Invalid config-alike file ${this.filePath}`);
    }
    return (this.identifierMatching = identifierMatching);
  }
}
export async function modifyConfigAlikeFile(
  filePath: string,
  modifier: (modify: ModifyConfigAlike) => Promisable<void | ModifyConfigAlike>,
  formatOptions?: PrettierOptions
) {
  filePath = resolve(filePath);
  const content = await readFile(filePath, 'utf8');
  const modify = new ModifyConfigAlike(filePath, content);
  await modifier(modify);
  return outputFile(
    filePath,
    await formatTS(modify.getResult(), formatOptions)
  );
}
