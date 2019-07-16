// TODO: 待完善
export default {
  localSave: (key: string, value: any, inSession: boolean = false) => {
    if (!value) {
      console.log('value不能为空');
      return;
    }
    JSON.stringify(value);
    if (inSession) {
      sessionStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  },

  localGet: (key: string, inSession: boolean = false) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
};
