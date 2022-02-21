/*
 * @Author: Orlando
 * @Date: 2022-02-18 13:25:03
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-21 15:08:49
 * @Description:
 */

import { pushTarget, popTarget } from './dep.js';

let wid = 0;

function parsePath(path) {
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    // vm挂到当前watcher实例上
    this.vm = vm;

    if (typeof exprOrFn === 'function') {
      // 把exprOrFn挂载到当前的this上，这里exprOrFn = vm.$options.render
      this.getter = exprOrFn;
    } else {
      this.getter = parsePath(exprOrFn); // user watcher () exprOrFn = 'name'
    }

    if (options) {
      this.lazy = !!options.lazy; // 为computed 设计的
      this.user = !!options.user; // 为user wather设计的
    } else {
      this.user = this.lazy = false;
    }

    this.dirty = this.lazy;

    this.cb = cb;
    this.options = options;

    this.id = wid++;
    this.depsId = new Set();
    this.deps = [];

    this.value = this.lazy ? undefined : this.get();
  }
  get() {
    const vm = this.vm;
    pushTarget(this);
    let value = this.getter.call(vm, vm);
    popTarget();
    return value;
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      this.run();
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
      // watcher里装入Dep
      this.depsId.add(id);
      this.deps.push(dep);
      //dep里装入watcher
      dep.addSub(this);
    }
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
  run() {
    const value = this.get();
    const oldValue = this.value;
    this.value = value;

    //执行cb
    if (this.user) {
      try {
        this.cb.call(this.vm, value, oldValue);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.cb && this.cb.call(this.vm, oldValue, value);
    }
  }
}
