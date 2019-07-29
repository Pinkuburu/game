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
    const jsonValue = JSON.stringify(value);
    if (inSession) {
      sessionStorage.setItem(key, jsonValue);
    } else {
      localStorage.setItem(key, jsonValue);
    }
  },

  get: (key: string, inSession: boolean = false) => {
    let item = null;
    if (inSession) {
      item = sessionStorage.getItem(key);
    } else {
      item = localStorage.getItem(key);
    }
    if (item) {
      return JSON.parse(item);
    }
    return null;
  },

  remove: (key: string, inSession: boolean = false) => {
    if (inSession) {
      sessionStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  }
};
