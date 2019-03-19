<template>
  <div ref='scrollWrapper' class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    // 上拉刷新标志位
    pullup: {
      type: Boolean,
      default: false
    },
    // 监听滚动事件
    listenScroll: {
      type: Boolean,
      default: true
    }
  },
  created () {
    // 确保Dom已经渲染了
    setTimeout(() => {
      this.$nextTick(() => {
        this._initScroll();
      });
    }, 40);
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh();
      }, 10);
    }
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scrollWrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: this.click
      });
      // 监听滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos); // 添加事件,以便外部监听scroll事件
        });
      }
    },
    refresh () {
      this.scroll && this.scroll.refresh();
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
</style>
