import * as types from './mutation-types';

const mutations = {
  [types.SET_SHOPCART_LIST] (state, list) {
    state.shopCartList = list;
  }
};

export default mutations;
