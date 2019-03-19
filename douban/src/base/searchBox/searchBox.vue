<template>
  <div class="search-box">
    <div v-if="!isFocus" class="back" @click='back'>
      <i class="icon icon-left"></i>
    </div>
    <div class="input-box">
       <input class="input-query" @click="focus" ref='query' v-model="query" :placeholder="placeholder"/>
       <div v-show="query" @click='clear' class="clear">
         <span class="text">X</span>
       </div>
    </div>
    <div @click='cancle' class="cancle" v-if="isFocus">
      <span>取消</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isFocus: false
    };
  },
  watch: {
    query (text) {
      this.$emit('query', text)
    }
  },
  methods: {
    clear () {
      this.query = '';
    },
    blur () {
      // 让输入框失去焦点
      this.$refs.query.blur();
    },
    focus () {
      this.$emit('focus');
      this.isFocus = true;
    },
    cancle () {
      this.isFocus = false;
    },
    back () {
      // 返回按钮
      // this.$router.back();
      this.$emit('back');
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.search-box {
  width: 100%;
  display: flex;
  height: 44px;
  position: relative;
  padding: 6px ;
  box-sizing: border-box;
  background: $theme-color;
  .back {
    flex: 0 0 35px;
    width: 35px;
    height: 22px;
    color: #fff;
    font-size: 29px;
    .icon{
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      @include extend-click();
    }
  }
  .input-box {
    flex: 1;
    height: 30px;
    position: relative;
    .input-query {
      height: 30px;
      width: 100%;
      padding-left: 12px;
      box-sizing: border-box;
      border-radius: 20px;
      &::placeholder {
        color: $color-text-d;
      }
    }
    .clear {
     position: absolute;
     top: 10px;
     right: 10px;
     width: 10px;
     height: 10px;
     background-color: #999;
     border-radius: 50%;
     color: #fff;
     font-size: 6px;
     text-align: center;
     @include extend-click();
    }
  }
  .cancle {
    flex: 0 0 50px;
    width: 50px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>
