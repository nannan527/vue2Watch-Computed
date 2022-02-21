/*
 * @Author: Orlando
 * @Date: 2022-02-18 10:47:25
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-21 09:01:13
 * @Description:
 */
import initData from './initData.js';
import initComputed from './initComputed.js';
import initWatch from './initWatch.js';

export default function initState(vm) {
  let opt = vm.$options;
  //初始化 data
  if (opt.data) {
    initData(vm);
  }

  //初始化 computed
  if (opt.computed) {
    initComputed(vm);
  }

  // 初始化watch
  if (opt.watch) {
    initWatch(vm);
  }
}
