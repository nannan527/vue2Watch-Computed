/*
 * @Author: Orlando
 * @Date: 2022-02-18 10:47:25
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 13:37:21
 * @Description:
 */
import initData from './initData.js';

export default function initState(vm) {
  let opt = vm.$options;

  if (opt.data) {
    initData(vm);
  }
}
