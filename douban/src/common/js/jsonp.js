import orginJsonp from 'jsonp';
export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    orginJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function param (data) {
  let url = '';
  for (var item in data) {
    let value = data[item] !== undefined ? data[item] : '';
    url += `&${item}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}
