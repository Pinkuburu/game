import { StorageKey } from './storageKeys';
import { isDevMode } from '../index';
export { StorageKey };
// TODO: 待完善
export const Storage = {
  save: (key: string, value: any, inSession: boolean = false) => {
    if (!value) {
      console.log(value, 'value为空');
      return;
    }
    if (isDevMode) {
      console.log(`存储了 key = ${key} value = ${value}`);
    }
    JSON.stringify(value);
    if (inSession) {
      sessionStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  },

  get: (key: string, inSession: boolean = false) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
};
