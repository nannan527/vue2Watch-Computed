/*
 * @Author: Orlando
 * @Date: 2022-02-17 17:12:44
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 11:03:07
 * @Description:
 */

import initState from './initState.js';

export default function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this;
  this.$options = options;

  initState(vm);
};
