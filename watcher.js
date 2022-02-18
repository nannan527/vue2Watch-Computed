/*
 * @Author: Orlando
 * @Date: 2022-02-18 13:25:03
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 17:02:38
 * @Description:
 */

import { pushTarget, popTarget } from './dep.js';

let wid = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    // vm挂到当前watcher实例上
    this.vm = vm;

    if (typeof exprOrFn === 'function') {
      // 把exprOrFn挂载到当前的this上，这里exprOrFn = vm.$options.render
      this.getter = exprOrFn;
    }

    this.cb = cb;
    this.options = options;

    // lazy 为 true 为计算属性
    this.lazy = options && options.lazy ? options.lazy : false;
    this.dirty = this.lazy;

    this.id = wid++;
    this.depsId = new Set();
    this.deps = [];

    this.value = this.lazy ? undefined : this.get();
  }
  get() {
    const vm = this.vm;
    pushTarget(this);
    let value = this.getter.call(vm);
    popTarget();
    return value;
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      this.get();
    }
  }
  // lazy 是 true 的情况重新计算
  // 执行get，并且 this.dirty = false
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}
