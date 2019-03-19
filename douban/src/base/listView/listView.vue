<template>
  <scroll class="listview" :data='list'>
    <div class="list-content" >
      <ul>
        <li class="list-item" v-for='(item, index) in list' :key='index'>
            <!-- <div class="list-header">
              <span class="icon"></span>
              <span class="text">{{item.promo[0].type_name}}</span>
            </div> -->
            <div class="img-container">
              <div class="img-box">
                <img src='../../common/images/listDefault.jpg'/>
              </div>
            </div>
            <p class="project-name">{{item.project_name}}</p>
            <p class="time-address">
                <span>{{item.start_time}}-</span>
                <span>{{item.end_time}}</span>
                <span>{{item.city_name}}</span>
                <span>{{item.venue_name}}</span>
            </p>
            <p class="price-container" v-if='item.is_price'><span class="price">￥{{item.price_low / 100}}</span>起</p>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import scroll from 'base/scroll/scroll';
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  },
  components: {
    scroll
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.listview {
  position: fixed;
  top: 40px;
  bottom: 51px;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: $color-background;
  .list-content {
    height: auto;
    padding: 0 12px;
    box-sizing: border-box;
    margin: auto;
    .list-item {
      background: #fff;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
      border-radius: 8px;
      padding: 0 8px;
      box-sizing: border-box;
      width: 100%;
      margin: 10px 0;
      line-height: 1.5em;
      color: $color-text-d;
      .img-container {
        margin-top: 10px;
        width: 100%;
        height: 0;
        padding-top: 62%;
        box-sizing: border-box;
        position: relative;
        .img-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
        }
      }
      .project-name {
        @include no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
        margin: 3px 0;
      }
      .time-address {
        font-size: $font-size-small;
      }
      .price-container {
        font-size: 10px;
        margin-bottom: 8px;
        .price {
          font-size: 18px;
          color: $theme-color;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
