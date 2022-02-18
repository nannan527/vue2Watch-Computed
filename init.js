/*
 * @Author: Orlando
 * @Date: 2022-02-17 17:12:44
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 14:19:27
 * @Description:
 */

import initState from './initState.js';
import Watcher from './Watcher.js';

export default function Vue(options) {
  //初始化
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this;
  this.$options = options;

  initState(vm);

  //渲染
  if (options.el) {
    this.$mount(options.el);
  }
};

Vue.prototype.$mount = function (el) {
  const vm = this;

  new Watcher(vm, vm.$options.render, () => {}, true);
};
