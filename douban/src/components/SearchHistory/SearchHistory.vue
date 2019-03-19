<template>
  <div class="search-history">
    <div class="goods-Wrapper">
    </div>
  </div>
</template>

<script>
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
  methods: {
  }
}
</script>

<style lang='scss'>
</style>
