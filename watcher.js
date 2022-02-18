/*
 * @Author: Orlando
 * @Date: 2022-02-18 13:25:03
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 13:48:38
 * @Description:
 */

let wid = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    // vm挂到当前this上
    this.vm = vm;

    if (typeof exprOrFn === 'function') {
      // 把exprOrFn挂载到当前的this上，这里exprOrFn = vm.$options.render
      this.getter = exprOrFn;
    }

    this.cb = cb;
    this.options = options;
    this.id = wid++;
    this.value = this.get();
  }
  get() {
    let value = this.getter.call(this.vm);
    return value;
  }
}
