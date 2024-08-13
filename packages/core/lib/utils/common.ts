export function isClass(input: unknown) {
  return (
    typeof input === 'function' &&
    /^class\s/.test(Function.prototype.toString.call(input))
  );
}

export function listify<Type>(itemOrItems: Type | Type[] | null | undefined) {
  return itemOrItems === undefined || itemOrItems === null
    ? []
    : itemOrItems instanceof Array
      ? itemOrItems
      : [itemOrItems];
}

export function isRTL() {
  return document.dir === 'rtl' || document.body.dir === 'rtl';
}

export function isImageURLOrURI(str: string) {
  return str.startsWith('http') || str.startsWith('data:image');
}
