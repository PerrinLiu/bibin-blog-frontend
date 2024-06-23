// store.js

import Vue from 'vue';
import Vuex from 'vuex';


import article from './modules/article'
import userData from './modules/userData'
import getters from './getters'
import createPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    article,
    userData
  },
  getters,
  //插件,缓存数据
  plugins: [
    createPersistedstate({
      key: 'allData',
      paths: ['user', 'caseData'],
      storage: window.sessionStorage
    })
  ]
});

export default store;
