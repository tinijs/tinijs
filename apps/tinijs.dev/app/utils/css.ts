export interface VariableDef {
  title: string;
  prefix: string;
  key: string;
  value: string;
  valueDirect: string;
  description: string;
  category?: string;
}

export function extractCSSVariables(
  code: string,
  scope?: [string, string]
): Map<string, VariableDef> {
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
