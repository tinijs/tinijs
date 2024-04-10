export function listify<Type>(itemOrItems: Type | Type[]) {
  return itemOrItems instanceof Array ? itemOrItems : [itemOrItems];
}
