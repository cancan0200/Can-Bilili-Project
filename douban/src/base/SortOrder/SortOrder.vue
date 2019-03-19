<template>
  <div class="sort-order">
    <ul ref='sortWrapper' class="sort-wrapper" @click.stop='sort'>
      <li class="sort-item active">综合</li>
      <li class="sort-item">销量</li>
      <li class="sort-item">价格</li>
      <li class="sort-item">现货</li>
      <li class="sort-item">筛选</li>
    </ul>
    <!-- 点击筛选，右边弹出层部分 -->
    <div class="sort-modal"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sortType: [false, false, false, false, false],
      currentType: 1
    };
  },
  methods: {
    sort (index) {
      // 排序
      this.$emit('sort', type);
      this.currentType = index;
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.sort-order {
  .sort-wrapper {
    display: flex;
    width: 100%;
    height: 44px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,.1);
    .sort-item {
      flex: 1;
      text-align: center;
      line-height: 44px;
      color: $color-text-d;
      font-size: $font-size-medium;
      &.active {
        color: $theme-color;
      }
    }
  }
}
</style>
