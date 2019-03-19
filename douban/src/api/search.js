import axios from 'axios';
import {conParams} from './config';
// import jsonp from 'common/js/jsonp';

// 获取搜索结果
export function search (query, pageIndex) {
  const url = '/api/getQueryResult';
  const data = Object.assign({}, conParams, {
    keyword: query,
    pageIndex,
    sortType: 'totalrank',
    filters: '',
    priceFlow: '',
    priceCeil: '',
    sortOrder: '',
    userId: '',
    state: ''
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

// 获取商品的详细信息
export function getGoodDetail (itemsId) {
  const url = '/api/getGoodDetail';
  const data = Object.assign({}, conParams, {
    itemsId,
    shopId: '',
    itemsVersion: '',
    v: 1545790897826
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
