<template>
  <div class="shop-list">
    <scroll :data='list' class="scroll-wrapper">
      <ul class="goods-Wrapper" :class="{'show-one-item': showType === 1}">
        <li @click='selectGood(item)' class="good-item" v-for="(item,index) in list" :key='index'>
          <div class="img-container">
            <div class="box">
              <img src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=626071842,1243389150&fm=27&gp=0.jpg'>
            </div>
          </div>
          <div class="info-container">
            <div class="desc">{{item.name}}</div>
            <div class="tag-list">
              <span class="advance-sale" v-if='item.tag === "0_3"'>
                  预售
              </span>
              <span class="new-pro" v-if='item.itemsLabelVO && item.itemsLabelVO.recommendTagNames'>
                {{item.itemsLabelVO.recommendTagNames[0]}}
              </span>
            </div>
            <div class="bottom">
              <span class="price">
                ￥{{item.price}}
              </span>
              <span class="like">{{item.like}}想要</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll';

export default {
  props: {
    list: { // 外部传入的商品list
      type: Array,
      default: () => []
    },
    // 商品列表展示的方式 2一行两个， 1 为一行一个
    showType: {
      type: Number,
      default: 2
    }
  },
  components: {
    scroll
  },
  methods: {
    selectGood (item) {
      // 获取商品的详细信息, 派发一个事件到外部
      this.$emit('selectGood', item);
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/mixin.scss';
@import 'common/css/variable.scss';
.shop-list {
  background-color: #f4f5f7;
  position: absolute;
  top: 89px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  .scroll-wrapper {
    height: 100%;
    width: 100%;
  }
  .goods-Wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 0 10px;
    box-sizing: border-box;
    .good-item {
      flex: 0 0 45.9%;
      width: 45.9%;
      height: auto;
      margin: 2%;
      background-color: #fff;
      border-radius: 8px;
      .img-container{
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        box-sizing: border-box;
        position: relative;
        .box {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          img {
            width: 100%;
            height: 100%;
            }
        }
      }
      .info-container {
        padding: 0 6px 6px 6px;
        .desc {
          margin: 5px 0;
          height: 36px;
          font-size: 14px;
          line-height: 18px;
          @include line-2-ellipsis();
        }
        .tag-list {
          margin-bottom: 5px;
          .advance-sale,.new-pro {
            display: inline-block;
            box-sizing: border-box;
            border-radius: 3px;
            padding: 1px 3px;
            border: 1px solid $theme-color;
            color: $theme-color;
            font-size: $font-size-small;
          }
        }
        .bottom {
          position: relative;
          line-height: 18px;
          .price {
            color: $theme-color;
          }
          .like {
            position: absolute;
            top: 0;
            right: 0;
            color: $color-text-d;
            font-size: $font-size-small;
          }
        }
      }
    }
    &.show-one-item {
      .good-item {
        width: 100%;
        flex: 1;
        flex: 0 0 100%;
        margin: 5px 0;
      }
    }
  }
}
</style>
