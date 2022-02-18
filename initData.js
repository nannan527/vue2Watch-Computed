/*
 * @Author: Orlando
 * @Date: 2022-02-18 10:47:25
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 16:42:03
 * @Description:data 加上响应式
 */

import { Dep } from './dep.js';

export default function initData(vm) {
  let data = vm.$options.data;

  //data 为 函数 or 对象
  data = typeof data === 'function' ? data.call(vm) : data || {};

  // 挂到 vm 实例上
  vm._data = data;

  for (let key in data) {
    proxy(vm, '_data', key);
  }

  observe(data);
}

// 把 this._data.key 代理成 this.key;
function proxy(target, source, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[source][key];
    },
    set(newVal) {
      return (target[source][key] = newVal);
    },
  });
}

//设置数据响应式
class Observer {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false, //不可被枚举
      writable: true, //可用赋值运算符改写__ob__
      configurable: true, // 可改写可删除
    });

    if (Array.isArray(data)) {
      // data.__proto__ = xxxx; 改写数组方法
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  //对象处理
  walk(object) {
    let keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let val = object[key];

      defineReactive(object, key, val);
    }
  }

  //数组处理
  observeArray(array) {
    for (let i = 0; i < array.length; i++) {
      observe(array[i]);
    }
  }
}

function observe(data) {
  if (Object.prototype.toString.call(data) === '[object Object]' || Array.isArray(data)) {
    return new Observer(data);
  }
}

function defineReactive(target, key, val) {
  //递归一下，对象中可能还有下一级
  observe(val);

  //每个对象有一个自己的dep
  const dep = new Dep();
  console.log(dep);
  //设置响应
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        // 如果Dep.target指向某个Watcher，则把此Watcher收入此dep的队列里
        // Wacther 收集 dep 进 Wacther.deps; 收集 dep.id 进 Wacther.depsId;
        // dep 收集 wacther 进 dep.subs
        dep.depend();
      }

      return val;
    },
    set(newVal) {
      if (val === newVal) return;
      val = newVal;
      // 新设置的值也需要响应式判断处理
      observe(newVal);
      // 通知dep里的所有Wacther进行传达更新
      dep.notify();
    },
  });
}
