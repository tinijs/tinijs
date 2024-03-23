const debounceAwaiters: Record<string, any> = {};

export function debouncer(key: string, delay: number, callback: () => void) {
  clearTimeout(debounceAwaiters[key]);
  debounceAwaiters[key] = setTimeout(() => {
    debounceAwaiters[key] = null;
    callback();
  }, delay);
}
