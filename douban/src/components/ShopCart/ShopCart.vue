<template>
  <div class="shop-cart">
    <div class="shop-header">
      <div class="back" @click='back'>
        <i class="icon icon-left"></i>
      </div>
      <h2>会员购的购物车({{shopCartList.length}})</h2>
    </div>
    <scroll :data='shopCartList' class="shop-cart-wrapper">
      <div class="shop-wrapper">
        <ul>
          <li class="store-item">
            <div class="store-header">
              <i></i>
              <h5 class="store-name">昆山仑</h5>
            </div>
            <ul>
              <li v-for="(item, index) in shopCartList" :key="index"
              class="good-item"
              @click='goToGoodDetail(item.itemId)'>
                <div class="content">
                  <div class="choose" @click.stop='chooseToggle(index)'
                  :class="getRadioCls(index)">
                    <span class="radio">
                    </span>
                  </div>
                  <div class="img-box">
                    <img src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=626071842,1243389150&fm=27&gp=0.jpg'>
                  </div>
                  <div class="good-info">
                    <p class="name">{{item.name}}</p>
                    <p class="desc">{{item.desc}}</p>
                    <p class="price">￥{{item.price}}</p>
                    <div class="bottom">
                      <div class="decrease" @click.stop='decrease(index)'>-</div>
                      <div class="total-number">{{item.num}}</div>
                      <div class="increase" @click.stop='increase(index)'>+</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <div class="shop-footer">
      <div class="select-all" @click='selectAll'>
        <div class="choose" :class="selectAllFlag ? 'check' : 'uncheck'">
          <span class="radio"></span>
        </div>
        <span class="text">全选</span>
      </div>
      <div class="footer-info">
        <div class="price-box">
          合计:<span class="price">￥{{getTotalMoney()}}</span>
        </div>
        <p class="desc">不含运费</p>
      </div>
      <div class="to-pay" :class="getPayClass">
        <span>结算({{checkNum}})</span>
      </div>
    </div>
    <confirm ref='confirm' @confirm='deleteGood'></confirm>
  </div>
</template>

<script>
import {getCartStorage, deleteCartStorage} from 'common/js/cache';
import confirm from 'base/confirm/confirm';
import scroll from 'base/scroll/scroll';
import numOpre from 'base/numOpre/numOpre';
// import {mapGetters} from 'vuex';

export default {
  data () {
    return {
      shopCartList: [],
      isCheck: [], // 判断商品是否选中
      checkNum: 0,
      selectAllFlag: false,
      deleteId: ''
    };
  },
  components: {
    confirm,
    scroll,
    numOpre
  },
  computed: {
    getPayClass () {
      if (this.checkNum !== 0) {
        return 'check';
      } else {
        return 'noCheck';
      }
    }
    // },
    // ...mapGetters([
    //   'shopCartList'
    // ])
  },
  created () {
    this._getCartStorage();
    console.log(this.shopCartList);
  },
  methods: {
    // 获取radio按钮的class,以表示不同的状态
    getRadioCls (index) {
      let cls = ''
      if (!this.isCheck[index]) {
        cls = 'uncheck';
      } else {
        cls = 'check';
      }
      return cls;
    },
    // 获取选择的商品的总价
    getTotalMoney () {
      // 商品的价格*数量
      let num = 0;
      this.isCheck.forEach((item, index) => {
        if (item === true) {
          num += this.shopCartList[index].price * this.shopCartList[index].num;
        }
      });
      return num;
    },
    // 增加
    increase (index) {
      this.shopCartList[index].num++;
      if (this.isCheck[index]) {
        this.checkNum++;
      }
    },
    // 减少
    decrease (index) {
      let num = this.shopCartList[index].num;
      if (num > 1) {
        num--;
      } else if (num === 1) {
        // 当商品的数量为1，则不能再减少,同时减少按钮不能被点击
        num = 1;
        this.deleteId = this.shopCartList[index].itemId;
        this.$refs.confirm.show();
      }
      this.shopCartList[index].num = num;
      if (this.isCheck[index] === true) {
        let check = this.checkNum - 1;
        if (check >= 0) {
          this.checkNum--;
        }
      }
    },
    deleteGood () {
      // 删除购物车里面的一个商品
      this.shopCartList = deleteCartStorage(this.deleteId);
    },
    _getCartStorage () {
      this.shopCartList = getCartStorage();
      this.shopCartList.forEach(() => {
        this.isCheck.push(false);
      });
    },
    // 选中商品,切换按钮的样式，同时计算选中的商品的数量
    chooseToggle (index) {
      if (!this.isCheck[index]) {
        // 已经被选中
        this.checkNum += this.shopCartList[index].num;
      } else {
        if (this.checkNum !== 0) {
          this.checkNum = this.checkNum - this.shopCartList[index].num;
        }
      }
      this.isCheck[index] = !this.isCheck[index];
    },
    // 全选
    selectAll () {
      if (this.selectAllFlag === false) {
        // 计算商品数量 和所有商品的总价
        this.checkNum = 0;
        this.totalMoney = 0;
        this.shopCartList.forEach((item) => {
          this.checkNum += item.num;
          this.totalMoney = item.price * item.num;
        });
        // 切换所有按钮的状态为选择
        for (var i = 0; i < this.isCheck.length; i++) {
          this.isCheck[i] = true;
        }
      } else {
        // 切换所有按钮的状态为未选中
        for (var j = 0; j < this.isCheck.length; j++) {
          this.isCheck[j] = false;
        }
        this.checkNum = 0;
      }
      this.selectAllFlag = !this.selectAllFlag;
    },
    goToGoodDetail (id) {
      // 跳转到商品详情页面
      this.$router.push({
        path: `/goodDetail/${id}`
      });
    },
    back () {
      this.$router.back();
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';

.shop-cart {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 51px;
  overflow: hidden;
  background: #f4f4f4;
  .shop-header {
    position: relative;
    margin-bottom: 10px;
    height: 44px;
    line-height: 44px;
    color: $color-text;
    text-align: center;
    background: #fff;
    box-shadow: inset 0 -1px 0 0 #e7e7e7;
    .back {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 24px;
      height: 24px;
      .icon{
        display: block;
        width: 100%;
        height: 100%;
        font-size: 24px;
        @include extend-click();
      }
    }
  }
  .shop-cart-wrapper {
    background: #f4f4f4;
    padding-top: 12px;
    box-sizing: border-box;
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 60px;
    width: 100%;
    overflow: hidden;
    .shop-wrapper {
      margin-bottom: 12px;
    }
    .store-header{
      background: #fff;
      height: 36px;
      line-height: 36px;
      padding-left: 15px;
      width: 100%;
      box-shadow: inset 0 -1px 0 0 #e7e7e7;
    }
    .good-item{
      background: #fff;
      box-shadow: inset 0 -1px 0 0 #e7e7e7;
      width: 100%;
      .content {
        display: flex;
        padding: 10px 0;
        box-sizing: border-box;
        .choose{
          flex: 0 0 40px;
          width: 40px;
          position: relative;
          .radio {
            position: absolute;
            top: 41px;
            left: 11px;
          }
        }
        .img-box {
          flex: 0 0 80px;
          width: 80px;
          height: 80px;
          margin-right: 10px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .good-info {
          flex: 1;
          font-size: $font-size-small;
          line-height: 12px;
          position: relative;
          height: 119px;
          .name {
            @include line-2-ellipsis();
            margin-bottom: 10px;
            line-height: 12px;
            max-height: 24px;
          }
          .desc {
            color: $color-text-d;
          }
          .price {
            color: $theme-color;
            font-weight: 600;
            position: absolute;
            bottom: 40px;
          }
          .bottom {
            display: flex;
            line-height: 32px;
            height: 34px;
            position: absolute;
            bottom: 0;
            left: 0;
            .decrease, .increase {
              width: 32px;
              height: 32px;
              text-align: center;
              color: $theme-color;
              font-size: $font-size-medium-x;
              border: 1px solid $theme-color;
              border-radius: 50%;
            }
            .total-number {
              margin: 0 15px;
            }
          }
        }
      }
    }
  }
  .shop-footer {
    height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 -1px 0 0 #e7e7e7;
    font-size: $font-size-medium;
    .select-all {
      position: absolute;
      left: 11px;
      top: 20px;
      height: 19px;
      font-size: 0;
      .choose, .text{
        display: inline-block;
        vertical-align: middle;
      }
      .text {
        margin-left: 10px;
        line-height: 18px;
        font-size: $font-size-medium;
      }
    }
    .footer-info {
      position: absolute;
      top: 10px;
      right: 120px;
      color: $color-text;
      .desc {
        color: $color-text-d;
        text-align: right;
        font-size: $font-size-small;
        line-height: 16px;
        margin-top: 8px;
      }
      .price {
        color: $theme-color;
      }
    }
    .to-pay {
      width: 92px;
      height: 40px;
      position: absolute;
      right: 12px;
      top: 10px;
      line-height: 40px;
      text-align: center;
      border-radius: 100px;
      &.noCheck {
        background: #e7e7e7;
        color: $color-text-d;
      }
      &.check {
        background: $theme-color;
        color: #fff;
        box-shadow: 0 2px 5px 0 $theme-color;
      }
    }
  }
  .uncheck {
    position: relative;
    .radio {
      display: block;
      width: 18px;
      height: 18px;
      border: 1px solid #e2e2e2;
      border-radius: 50%;
    }
  }
  .check{
    position: relative;
    .radio {
      display: block;
      width: 18px;
      height: 18px;
      border: 1px solid #e2e2e2;
      border-radius: 50%;
      color: #fff;
      background: url(../../common/images/choose.png) no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
}
</style>
