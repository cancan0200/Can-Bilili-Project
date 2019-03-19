<template>
  <div class="loading">
    <img class="img" src='loading.gif'>
    <p class="desc">{{desc}}</p>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: '正在加载....'
    }
  }
}
</script>

<style lang='scss'>
.loading {
   width: 100%;
   text-align: center;
   .desc {
     line-height: 20px;
     font-size: 14px;
     color: #333;
   }
}
</style>
