// todo: num类型可能需要具体化
export function percent(num: any, fix = 0) {
  const n = parseFloat(num);
  if (!n) return 0;
  const tar = n * 100;
  return tar.toFixed(fix);
}

// 判断是否为开发环境
export function isDevMode(): boolean {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    isDevMode = () => true;
  } else {
    // eslint-disable-next-line
    isDevMode = () => false;
  }
  return isDevMode();
}
