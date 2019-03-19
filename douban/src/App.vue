<template>
  <div id="app">
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import tab from 'components/Tab/Tab';

export default {
  components: {
    'v-tab': tab
  }
  // data () {
  //   return {
  //     tab: {
  //       fontColor: '#999',
  //       activeFontColor: "#ff5687",
  //       icon: [
  //         {
  //           router: '/home',
  //           iconClass: 'icon-home',
  //           activeClass: 'icon-home-active',
  //           text: '会员购'
  //         },
  //         {
  //           router: '/classify',
  //           iconClass: 'icon-classify',
  //           activeClass: 'icon-classify-active',
  //           text: '分类'
  //         },
  //         {
  //           router: '/shopcart',
  //           iconClass: 'icon-cart-tab',
  //           activeClass: 'icon-cart-tab-active',
  //           text: '购物车'
  //         },
  //         {
  //           router: '/orderList',
  //           iconClass: 'icon-my',
  //           activeClass: 'icon-my-active',
  //           text: '订单'
  //         }
  //       ]
  //     }
  //   };
  // }
}
</script>
<style lang="scss" scoped="" type="text/css">
</style>
