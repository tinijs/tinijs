import {getText} from './http';

export interface VariableDef {
  title: string;
  prefix: string;
  key: string;
  value: string;
  valueDirect: string;
  description: string;
  category?: string;
}

export interface ComponentProperty {
  name: string;
  type: string;
  isOptional: boolean;
  defaultValue?: string;
}

export async function extractCSSVariables(
  src: string,
  scope?: [string, string]
): Promise<Map<string, VariableDef>> {
  const code = await getText<string>(src);
  const processedCode = !scope
    ? ['', code]
    : code.match(new RegExp(`${scope[0]}([\\s\\S]*?)${scope[1]}`));
  if (!processedCode) return new Map();
  const variableMatchingArr = processedCode[1]
    .replace(/(?:\r\n|\r|\n)/g, '\n')
    .match(/--([\s\S]*?);/g);
  // extract data
  const itemsRecord = Array.from(variableMatchingArr || []).reduce(
    (result, line) => {
      const [key, value, description] = line
        .replace(/\n/g, '')
        .replace(/(;$)|(\*\/)/g, '')
        .replace('/*', ':')
        .split(':')
        .map(item => item.trim());
      const [category] = description?.match(/\[[a-zA-Z0-9_]+\]/) || [];
      const keyArr = key.split('-').filter(item => item);
      const prefix = keyArr.shift() as string;
      const title = !keyArr.length
        ? '-'
        : keyArr.map(item => item[0].toUpperCase() + item.slice(1)).join(' ');
      result[key] = {
        key,
        value,
        valueDirect: value, // process later
        prefix,
        title,
        description: (
          (!category ? description : description?.replace(category, '')) || ''
        ).trim(),
        category: category?.replace(/\[|\]/g, ''),
      } as VariableDef;
      return result;
    },
    {} as Record<string, VariableDef>
  );
  // process direct values
  const mapItems = Object.entries(itemsRecord).map(([key, item]) => {
    // replace direct values
    const varMatchingArr = item.value.match(/var\(([\s\S]*?)\)/g);
    varMatchingArr?.forEach(varMatching => {
      const varKey = varMatching.replace(/var\(|\)/g, '');
      const varDef = itemsRecord[varKey];
      item.valueDirect = item.valueDirect.replace(
        varMatching,
        !varDef?.valueDirect || ~varDef.valueDirect.indexOf('var(')
          ? 'transparent'
          : varDef.valueDirect
      );
    });
    // map item
    return [key, item];
  }) as Array<[string, VariableDef]>;
  // result
  return new Map(mapItems);
}

export async function extractComponentProperties(src: string) {
  const code = await getText<string>(src);
  const propsMatchingArr = code.match(/@property\(([\s\S]*?);/g);
  if (!propsMatchingArr) return [];
  return propsMatchingArr.map(item => {
    const [, mainContent] = item.split(' declare ');
    const [rawName, ...rest] = mainContent
      .replace(/readonly|private|public|protected|(;$)/g, '')
      .split(':');
    const isOptional = !!~rawName.indexOf('?');
    const name = (!isOptional ? rawName : rawName.replace(/\?/g, '')).trim();
    const defaultAssignMatching = code.match(
      new RegExp(`this.${name} = ([\\s\\S]*?);`)
    );
    const defaultValue = !defaultAssignMatching
      ? 'undefined'
      : defaultAssignMatching[1];
    return {
      name,
      type: rest.join('').trim(),
      isOptional,
      defaultValue,
    };
  });
}
