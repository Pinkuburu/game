
export function percent(num, fix = 0) {
  const n = parseFloat(num);
  if (!n) return 0;
  const tar = n * 100;
  return tar.toFixed(fix);
}

