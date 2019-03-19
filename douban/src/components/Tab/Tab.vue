<template>
  <div class="tab">
    <ul class="tab-wrapper">
       <!-- <li class="tab-item" v-for='(item,index) in tabs.icon' :key='index'>
        <router-link class="tab-link" :to='item.router'>
          <span class="tab-icon" :class="item.iconClass"></span>
          <span class="text">{{item.text}}</span>
        </router-link>
      </li> -->
      <li class="tab-item">
        <router-link class="tab-link" to='/home'>
          <span class="tab-icon icon-home"></span>
          <span class="text">会员购</span>
        </router-link>
      </li>
      <li class="tab-item">
        <router-link class="tab-link" to='/classify'>
          <span class="tab-icon icon-classify"></span>
          <span class="text">分类</span>
        </router-link>
      </li>
      <li class="tab-item">
        <router-link class="tab-link" to='/shopcart'>
          <span class="tab-icon icon-cart-tab"></span>
          <span class="text">购物车</span>
        </router-link>
      </li>
      <li class="tab-item">
        <router-link class="tab-link" to='/orderList'>
          <span class="tab-icon icon-my"></span>
          <span class="text">订单</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // props: {
  //   tabs: {
  //     type: Object,
  //     default: () => {}
  //   }
  // }
}
</script>

<style lang='scss'>
.tab
{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  height: 50px;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid rgba(0,0,0,0.1);
  .tab-wrapper
  {
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .tab-item
    {
      flex: 1;
      height: 100%;
      text-align: center;
      .tab-link
      {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        color: #999;
        font-size: 12px;
        .text
        {
          margin-top: 5px;
        }
        &.router-link-active
        {
          color: #ff5687;
        }
      }
    }
  }
}
</style>
