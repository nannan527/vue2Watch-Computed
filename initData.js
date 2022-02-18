/*
 * @Author: Orlando
 * @Date: 2022-02-18 10:47:25
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 11:48:34
 * @Description:
 */

export default function initData(vm) {
  let data = vm.$options.data;

  data = typeof data === 'function' ? data.call(vm) : data || {};

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

  //设置响应
  Object.defineProperty(target, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val === newVal) return;
      val = newVal;
    },
  });
}
