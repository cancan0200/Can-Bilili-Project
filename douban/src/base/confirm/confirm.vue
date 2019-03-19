<template>
  <transition name='slide'>
    <div class="comfirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <p class="title">{{title}}</p>
        <div class="opreate">
          <div @click='confirm' class="btn confirm-btn">{{confirmText}}</div>
          <div @click='cancle' class="btn cancle-btn">{{cancleText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '确定删除吗?'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancleText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true;
    },
    confirm () {
      this.showFlag = false;
      this.$emit('confirm');
    },
    cancle () {
      this.showFlag = false;
      this.$emit('cancle');
    }
  }
}
</script>

<style lang='scss'>
.comfirm{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000002;
  background: rgba(0,0,0,.4);
  display: flex;
  align-items: center;
  &.slide-enter-active {
    animation: slide .3s;
    .confirm-wrapper {
      animation: scaleAnimation .3s;
    }
  }
  .confirm-wrapper {
    margin: 0 auto;
    max-width: 270px;
    border-radius: 13px;
    padding: 10px 10px;
    background: #fff;
    .title {
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      padding-bottom: 30px;
      padding-top: 20px;
      margin: 0;
    }
    .opreate {
      padding: 0 10px 15px;
      display: flex;
      .btn {
        flex: 1;
        height: 40px;
        width: 160px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
        line-height: 38px;
        color: #999;
        font-size: 15px;
        text-align: center;
        margin: 10px;
        &.cancle-btn {
          border: 1px solid rgba(255,97,92,.4);
          color: #ff5687;
        }
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
@keyframes scaleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
