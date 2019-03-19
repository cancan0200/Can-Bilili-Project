import axios from 'axios';
import jsonp from 'common/js/jsonp';
import {conParams, options} from './config';

export function getList () {
  const url = 'https://show.bilibili.com/api/ticket/project/listV2';
  const data = Object.assign({}, conParams, {
    version: '133',
    page: 1,
    pagesize: 16,
    area: 500100,
    platform: 'web',
    p_type: '全部类型',
    format: 'application/json'
  });
  return jsonp(url, data, options);
}

export function getClassify () {
  const url = '/api/getClassify';
  const data = Object.assign({}, conParams, {
    shopId: 2233
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getListV2 () {
  const url = '/api/getListV2';
  const data = Object.assign({}, conParams, {
    version: '133',
    page: 1,
    pagesize: 16,
    area: 500100,
    platform: 'web',
    p_type: '全部类型',
    format: 'application/json'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
