/*
 * @Author: Orlando
 * @Date: 2022-02-18 13:03:57
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 13:21:18
 * @Description:dep函数  用于通知 watcher
 */

let depId = 0;

export class Dep {
  constructor() {
    // 每个dep的id都是独一无二的
    this.id = depId++;
    //用来存watcher
    this.subs = [];
  }

  depend() {
    if (Dep.target) {
      // 此时Dep.target指向的是某个Wacther，Wacther也要把此dep给收集起来
      Dep.target.addDep(this);
    }
  }

  notify() {
    const tempSubs = this.subs.slice();
    tempSubs.reverse().forEach((watcher) => watcher.update());
  }

  addSub(watcher) {
    // 将Watcher收进subs里
    this.subs.push(watcher);
  }
}

let stack = [];
export function pushTarget(watcher) {
  //改变target的指向
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() {
  Dep.target = stack[stack.length - 1];
  stack.pop();
}
