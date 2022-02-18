/*
 * @Author: Orlando
 * @Date: 2022-02-18 13:03:57
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 16:39:24
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
  //Wacther 收集 dep
  depend() {
    if (Dep.target) {
      //   this.depsId.add(id);
      //   this.deps.push(dep);
      //   dep.addSub(this);

      // 此时Dep.target指向的是某个Wacther
      // Wacther 收集 dep 进 Wacther.deps; 收集 dep.id 进 Wacther.depsId;
      // dep 收集 wacther 进 dep.subs
      Dep.target.addDep(this);
    }
  }

  addSub(watcher) {
    // 将Watcher收进subs里
    this.subs.push(watcher);
  }

  notify() {
    const tempSubs = this.subs.slice();
    tempSubs.reverse().forEach((watcher) => watcher.update());
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
