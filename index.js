/*
 * @Author: Orlando
 * @Date: 2022-02-17 17:04:27
 * @LastEditors: Orlando
 * @LastEditTime: 2022-02-18 14:12:56
 * @Description:
 */

import Vue from './init.js';

let vue = new Vue({
  el: '#root',
  data() {
    return {
      name: '测试测试888',
      age: '999',
    };
  },
  computed: {
    // 新增
    info() {
      return this.name + this.age;
    },
  },
  render() {
    document.querySelector('#root').innerHTML = `${this.name}今年${this.age}岁了 ------ ${this.info}`;
  },
});

document.getElementById('btn1').onclick = () => {
  vue.name = 'Orlando';
};

document.getElementById('btn2').onclick = () => {
  vue.age = '1000';
};

console.log(vue);
