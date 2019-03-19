<template>
 <transition name='slide'>
  <div class="good-detail">
    <div class="back" @click='back'>
      <i class="icon icon-left"></i>
    </div>
    <div class="header" ref="header">
      <h4 class="title">商品详情</h4>
    </div>
    <scroll @scroll='scroll' :data='goodDetail.attrList'>
      <div class="content-wrapper">
        <div class="img-box">
          <div class="img">
            <img src='http://i0.hdslb.com/bfs/test/mall/1a/3e/1a3e91f2dac412de4e20ede87dfe2e7b.png@800w_800h.webp'/>
          </div>
        </div>
        <div class="panel-price">
          <div class="main-title">{{goodDetail.name}}</div>
          <div class="simple-desc">{{goodDetail.brief}}</div>
          <div class="price">￥
            <span class="text">{{goodDetail.price}}</span>
          </div>
        </div>
        <div class="ip-brand"></div>
        <div class="notice">
          <ul>
            <li class="notice-item"></li>
            <li class="notice-item"></li>
            <li class="notice-item">
              <div class="notice-header"></div>
              <p>1、会员购承诺提供7天无理由退换货服务。自用户收到商品之日起计算，
                在保证商品完好且不影响二次销售的前提下，会员购支持7天无理由退换货
                （特殊商品及类目除外）。</p>
              <p>2、手办模玩类商品均不支持7天无理由退换货（手办为手工制品，难免会
                有瑕疵点，敬请谅解）。</p>
              <p>3、用户收到的商品如有损坏、少件或遗失，在提供有效凭证，证明
                签收货物时商品即存在损坏、少件和包裹遗失，会员购提供退换货服务。
                提醒：请您在打开外包装后，透过内部透明包装/吸塑式包装/透明包装袋
                检查商品是否完整完好。若您发现有任何断件或缺件问题，请勿再打开内
                包装，并第一时间联络客服。</p>
              <p>4、对于需要退换货的商品，若因产品质量问题退换货，来回运费均由
                平台承担。若用户以无理由形式退换货，运费由用户承担。</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="bottom">
      <div class="c-service">
        <i class="icon icon-cart-tab"></i>
      </div>
      <div class="cart" @click='toCart'>
        <i class="icon icon-cart-tab"></i>
      </div>
      <div class="add-to-cart" @click='ShowModal'>加购物车</div>
      <div class="buy">立即购买</div>
    </div>
    <shopModal ref='modal' @addCart='addCart'></shopModal>
  </div>
 </transition>
</template>

<script>
import {getGoodDetail} from 'api/search';
import {ERR_NO} from 'api/config';
import {setCartStorage} from 'common/js/cache';
import ShopGood from 'common/js/ShopGood';

import shopInfoModal from 'base/ShopInfoModal/ShopInfoModal';
import scroll from 'base/scroll/scroll';

export default {
  data () {
    return {
      goodDetail: {},
      goodId: ''
    };
  },
  components: {
    scroll,
    'shopModal': shopInfoModal
  },
  created () {
    this.goodId = this.$route.params.itemId;
    this._getGoodDetail(this.goodId);
  },
  methods: {
    back () {
      this.$router.back();
    },
    toCart () {
      // 跳转到购物车页面
      this.$router.push({
        path: '/shopcart'
      });
    },
    derease () {},
    ShowModal () {
      this.$refs.modal.show();
    },
    addCart (number) {
      console.log(number);
      let good = new ShopGood({
        itemId: this.goodId,
        num: number,
        imgUrl: "http://i0.hdslb.com/bfs/test/mall/1a/3e/1a3e91f2dac412de4e20ede87dfe2e7b.png@800w_800h.webp",
        name: this.goodDetail.name,
        desc: this.goodDetail.brief,
        price: this.goodDetail.price,
        store: this.goodDetail.shopVO.shopName
      });
      setCartStorage(good);
    },
    scroll () {
      // 当页面滚动的时候显示标题
      this.$refs.header.style.display = 'block';
    },
    _getGoodDetail (id) {
      // 获取商品的详细信息
      getGoodDetail(id).then((res) => {
        if (res.code === ERR_NO) {
          this.goodDetail = res.data;
        }
      });
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.good-detail {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 999;
  &.slide-enter-active,&.slide-leave-active {
    transition: all 0.3s ease;
  }
  &.slide-enter,&.slide-leave-to {
    transform: translate3d(-100%,0, 0);
  }
  .back {
    position: absolute;
    top: 10px;
    left: 8px;
    z-index: 3;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: #7c7c7c;
    text-align: center;
    line-height: 30px;
    font-size: 30px;
  }
  .header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 44px;
    width: 100%;
    line-height: 44px;
    text-align: center;
    background: rgba(255,255,255,0.8);
  }
  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 60px;
    overflow: hidden;
    background: #f4f4f4;
    .img-box {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      .img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        img{
          height: 100%;
          width: 100%;
        }
      }
    }
    .panel-price {
      background: #fff;
      padding: 10px 20px;
      .main-title {
        margin: 0;
        font-size: 16px;
        color: #212121;
        letter-spacing: .53px;
        line-height: 22px;
        @include line-2-ellipsis();
      }
      .simple-desc {
        margin-top: 6px;
        font-size: $font-size-small;
        color: $color-text-d;
        letter-spacing: 0;
        line-height: 16px;
      }
      .price {
        margin-top: 5px;
        color: $theme-color;
        font-size: $font-size-small;
        line-height: 24px;
        .text {
          font-size: $font-size-large;
          margin-left: 2px;
        }
      }
    }
    .notice {
      color: $color-text-d;
      .notice-item {
        background: #fff;
        padding: 10px 20px 20px;
        text-align: left;
        font-size: $font-size-small;
        line-height: 20px;
        letter-spacing: 0;
        border-top: 1px dashed #e7e7e7;
        border-bottom: 1px dashed #e7e7e7;
      }
    }
  }
  .bottom {
    height: 60px;
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    box-shadow: 0 -1px 0 0 #e7e7e7;
    .c-service, .cart {
      flex: 0 0 54px;
      width: 54px;
      text-align: center;
      font-size: 22px;
      color: $color-text-d;
    }
    .add-to-cart, .buy {
      flex: 1;
      padding: 10px 5px;
      margin: 0 5px;
      text-align: center;
      border-radius: 100px;
    }
    .add-to-cart {
      border: 1px solid rgba(255,97,92,.4);
      color: $theme-color;
    }
    .buy{
      color: #fff;
      background: $theme-color;
      box-shadow: 0 0 5px $theme-color;
    }
  }
}

</style>
