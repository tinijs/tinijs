export type Debounce = typeof debounce;

export function debounce(target: Function, timeout = 100) {
  let timer: any;
  return (...params: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => target.apply(target, params), timeout);
  };
}

export default debounce;
