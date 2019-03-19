// 导入各个js文件 Vuex的入口文件
import Vue from 'vue';
import Vuex from 'vuex';

import * as getter from './getter';
import * as actions from './actions';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getter
});
