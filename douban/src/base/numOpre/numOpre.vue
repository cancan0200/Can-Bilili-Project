<template>
  <div class="num-opre" @click.stop>
    <div class="decrease" @click='derease'>-</div>
    <div class="total-number">{{number}}</div>
    <div class="increase" @click='increase'>+</div>
  </div>
</template>

<script>
export default {
  props: {
    goodNumber: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.goodNumber
    };
  },
  methods: {
    increase () {
      // 增加商品的数量
      this.number++;
      this.$emit('increase', this.number);
    },
    derease () {
      // 减少商品的数量
      let number = this.number;
      if (number-- === 1) {
        this.$emit('derease', number);
        return;
      }
      this.number--;
      this.$emit('derease', this.number);
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'common/css/variable.scss';
.num-opre {
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
  }
  .total-number {
    margin: 0 15px;
  }
}
</style>
