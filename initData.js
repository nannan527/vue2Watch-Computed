/*
 * @Author: Orlando
 * @Date: 2022-02-18 10:47:25
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 11:01:51
 * @Description:
 */

export default function initData(vm) {
  let data = vm.$options.data;

  data = typeof data === 'function' ? data.call(vm) : data || {};

  vm._data = data;

  for (let key in data) {
    proxy(vm, '_data', key);
  }

  // observer(data);
}

// 把 this._data.key 代理成 this.key;
function proxy(target, source, key) {
  Object.defineProperty(target, key, {
    set() {
      return target[source][key];
    },
    get() {
      return target[source][key];
    },
  });
}
