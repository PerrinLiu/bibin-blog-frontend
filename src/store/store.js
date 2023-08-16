// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null, // 这里存储用户信息
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // 这里修改用户信息的方法
    },
    setToken(state, token) {
      state.token = token; // 这里修改用户信息的方法
    },
    clearUser(state) {
      state.user = null; 
    },
    clearToken(state) {
      state.token = null; // 这里清除用户信息的方法
    },
  },
  actions: {
    // 这里可以添加处理异步操作的方法
  },
  getters: {
    // 这里可以添加从状态中派生出的计算属性
  },
});

export default store;
