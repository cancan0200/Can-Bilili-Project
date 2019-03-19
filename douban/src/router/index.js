import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from 'components/Home/Home';
import OrderListComponent from 'components/OrderList/OrderList';
import ClassifyComponent from 'components/Classify/Classify';
import ShopCartComponent from 'components/ShopCart/ShopCart';
import SearchResultComponent from 'components/SearchResult/SearchResult';
import goodDetailComponent from 'base/goodDetail/goodDetail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home' // 设置默认指向的路径
    },
    {
      path: '/home',
      component: HomeComponent
    },
    {
      path: '/orderList',
      component: OrderListComponent
    },
    {
      path: '/classify',
      component: ClassifyComponent,
      children: [
        {
          path: ':mid',
          component: SearchResultComponent,
          children: [
            {
              path: ':itemId',
              component: goodDetailComponent
            }
          ]
        }
      ]
    },
    {
      path: '/shopcart',
      component: ShopCartComponent
    },
    {
      path: '/goodDetail/:itemId',
      component: goodDetailComponent
    }
  ]
})
