<template>
  <transition name='slide'>
    <div class="shop-modal" v-show="showFlag">
      <div class="good-container-wrapper">
        <div class="good-container">
            <div class="close" @click.stop="hide">
            <span class="icon-close"></span>
            </div>
            <div class="img-container">
            <img src='http://i0.hdslb.com/bfs/test/mall/1a/3e/1a3e91f2dac412de4e20ede87dfe2e7b.png@800w_800h.webp'>
            </div>
            <div class="price">
                ￥<span class="text">{{price}}</span>
            </div>
            <div class="opreate">
            <span class="text">数量确认</span>
            <div class="btn-group">
               <div class="decrease" :class="{gray: goodNumber === 1}" @click='derease'>-</div>
               <div class="total-number">{{goodNumber}}</div>
               <div class="increase" @click='increase'>+</div>
            </div>
            </div>
            <div class="add-cart-btn" @click='addCart'>加入购物车</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import numOpre from 'base/numOpre/numOpre';
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      goodNumber: 1,
      showFlag: false
    };
  },
  components: {
    numOpre
  },
  methods: {
    show () {
      this.showFlag = true;
    },
    hide () {
      this.showFlag = false;
    },
    addCart () {
      this.$emit('addCart', this.goodNumber);
      this.showFlag = false;
    },
    increase () {
      // 增加商品的数量
      this.goodNumber++;
    },
    derease (e) {
      // 减少商品的数量
      let number = this.goodNumber;
      if (number-- === 1) {
        // 按钮变灰
        return;
      }
      this.goodNumber--;
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.shop-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  background: rgba(0,0,0,.4);
  &.slide-enter-active{
    animation: slide .3s;
    .good-container-wrapper {
      animation: contentAnimation .3s;
    }
  }
  .good-container-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .good-container {
      position: relative;
      margin: 0 12px 12px 12px;
      background: #fff;
      border-radius: 5px;
      padding: 12px;
      .close {
        position: absolute;
        right: 10px;
        top: -20px;
        height: 40px;
        width: 40px;
        background: #f4f4f4;
        border-radius: 100%;
        box-shadow: 0 1px 5px 0 rgba(0,0,0,.3);
        line-height: 40px;
        text-align: center;
        color: $color-text-d;
      }
      .img-container {
        position: absolute;
        left: 12px;
        top: -31px;
        width: 100px;
        height: 100px;
        background: #fff;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.3);
        border-radius: 4px;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .price {
        height: 52px;
        margin-left: 126px;
        color: $theme-color;
        .text {
          font-size: 18px;
        }
      }
      .opreate {
        padding: 6px 0;
        margin-top: 25px;
        .text {
          line-height: 32px;
          font-size: $font-size-medium;
        }
        .btn-group {
          float: right;
          display: flex;
          line-height: 32px;
          height: 34px;
          overflow: hidden;
          .decrease, .increase {
            width: 32px;
            height: 32px;
            text-align: center;
            color: $theme-color;
            font-size: $font-size-medium-x;
            border: 1px solid $theme-color;
            border-radius: 50%;
            &.gray {
              color: #212121;
              border: 1px solid rgba(0, 0, 0, 0.3);
            }
          }
          .total-number {
            margin: 0 15px;
          }
        }
      }
      .add-cart-btn {
        height: 40px;
        width: 100%;
        margin-top: 15px;
        background: $theme-color;
        color: #fff;
        line-height: 40px;
        text-align: center;
        border-radius: 100px;
      }
    }
  }
}
@keyframes slide {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes contentAnimation {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
