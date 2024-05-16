export function listify<Type>(itemOrItems: Type | Type[] | undefined | null) {
  return itemOrItems === undefined || itemOrItems === null
    ? []
    : itemOrItems instanceof Array
      ? itemOrItems
      : [itemOrItems];
}
