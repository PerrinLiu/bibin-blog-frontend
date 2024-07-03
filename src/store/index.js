// store.js

import Vue from 'vue';
import Vuex from 'vuex';


import article from './modules/article'
import userData from './modules/userData'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    article,
    userData
  },
  getters,
  //插件,缓存数据
  plugins: [
    createPersistedState({
      key: 'allData',
      paths: ['article', 'userData'],
      storage: window.sessionStorage
    }),
  ]
});

export default store;
