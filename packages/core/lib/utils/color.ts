export function mix(...params: string[]) {
  const method =
    params[0]?.substring(0, 3) !== 'in ' ? 'in oklab' : params.shift();
  return `color-mix(${method}, ${params.slice(0, 2).join(', ')})`;
}

export function darken(color: string, amount = 0.1) {
  return mix(color, `black ${amount * 100}%`);
}

export function brighten(color: string, amount = 0.1) {
  return mix(color, `white ${amount * 100}%`);
}

export function opacity(color: string, amount = 0.1) {
  return mix(color, `transparent ${(1 - amount) * 100}%`);
}
