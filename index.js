/*
 * @Author: Orlando
 * @Date: 2022-02-17 17:04:27
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 11:47:28
 * @Description:
 */

import Vue from './init.js';

let vue = new Vue({
  data() {
    return {
      name: '测试测试888',
      age: '999',
    };
  },
  render() {
    document.querySelector('#root').innerHTML = `${this.name}今年${this.age}岁了`;
    setTimeout(() => {
      this.name = 'dasdsadas';
    }, 1000);
  },
});

console.log(vue);
