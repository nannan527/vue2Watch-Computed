/*
 * @Author: Orlando
 * @Date: 2022-02-17 17:12:44
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 08:43:50
 * @Description:
 */

export default function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this;
  this.$options = options;

  //initState(vm);
};
