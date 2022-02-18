/*
 * @Author: Orlando
 * @Date: 2022-02-18 14:14:08
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 17:03:39
 * @Description:
 */
import { Dep } from './dep.js';
import Watcher from './watcher.js';

export default function initComputed(vm) {
  // 拿到computed配置
  const computed = vm.$options.computed;
  // 给当前的vm挂载_computedWatchers属性，后面会用到
  const watchers = (vm._computedWatchers = Object.create(null));

  for (let key in computed) {
    let userDef = computed[key];
    // 判断是函数还是对象
    const getter = typeof userDef === 'function' ? userDef : userDef.get;
    // 给每一个computed创建一个computed watcher 注意{ lazy: true }
    // 然后挂载到vm._computedWatchers对象上
    watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true });
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed(vm, key, userDef) {
  let getter = null;
  //判断是函数还是对象；
  if (typeof userDef === 'function') {
    getter = createComputedGetter(key);
  } else {
    getter = userDef.get;
  }

  // 代理到 vm上
  Object.defineProperty(vm, key, {
    enumerable: true,
    configurable: true,
    get: getter,
    set: function () {},
  });
}

// 创建computed函数
function createComputedGetter(key) {
  return function computedGetter() {
    let watcher = this._computedWatchers[key];
    if (watcher) {
      //watcher.dirty = true 为 computed 属性 添加订阅 watchers
      if (watcher.dirty) {
        watcher.evaluate();
      }
      // 把渲染watcher 添加到属性的订阅里面去，这很关键
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
