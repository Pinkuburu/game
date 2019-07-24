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

export function isMobile(mob: string): boolean {
  return matchWithRegExp(
    /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
    mob
  );
}

export function isPureNumber(number: string) {
  return matchWithRegExp(/^[0-9]*$/, number);
}

export function isSmsCode(code: string) {
  return code.length === 6 && isPureNumber(code);
}

export function isPassword(password: string) {
  const length = password.trim().length;
  return length >= 8 && length <= 16;
}

function matchWithRegExp(key: RegExp, value: string): boolean {
  return new RegExp(key).test(value);
}
