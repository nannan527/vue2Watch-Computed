/*
 * @Author: Orlando
 * @Date: 2022-02-18 10:47:25
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 11:06:17
 * @Description:
 */
import initData from './initData.js';

export default function initState(vm) {
  let opt = vm.$options;

  if (opt.data) {
    initData(vm);
  }
  //渲染
  if (opt.render) {
    opt.render.call(vm);
  }
}
