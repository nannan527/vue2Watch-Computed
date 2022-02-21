/*
 * @Author: Orlando
 * @Date: 2022-02-18 16:47:11
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-21 14:50:16
 * @Description:
 */

import Watcher from './watcher.js';

export default function initWatch(vm) {
  let watch = vm.$options.watch;

  for (let key in watch) {
    let handler = watch[key];

    new Watcher(vm, key, handler, { user: true });
  }
}
