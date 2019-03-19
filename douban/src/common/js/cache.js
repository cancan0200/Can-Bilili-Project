// lochalstorage 相关方法，主要是购物车的操作
import storage from 'good-storage';

const SHOPCART_KEY = '__shopcart__';

export function setCartStorage (id) {
  // 设置购物车信息到lochalstorage
  let shopcarts = storage.get(SHOPCART_KEY, []);
  shopcarts.push(id);
  storage.set(SHOPCART_KEY, shopcarts);
  console.log(shopcarts);
  return shopcarts;
}

export function deleteCartStorage (itemid) {
  // 删除购物车的商品
  let shopcarts = storage.get(SHOPCART_KEY, []);
  delArr(shopcarts, (item) => {
    return item.itemId === itemid;
  });
  storage.set(SHOPCART_KEY, shopcarts);
  return shopcarts;
}

export function getCartStorage () {
  // 获取购物车的全部商品
  return storage.get(SHOPCART_KEY, []);
}

// function insertArr (arr, val, compare) {
//   let index = arr.findIndex(compare);
//   if (index >= 0) {
//     // 如果列表中已经存在，就增加数量
//     arr[index].num++;
//   } else {
//     // 如果不存在，就新增一条数据
//     arr.unshift(val);
//   }
// }

function delArr (arr, compare) {
  let index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
