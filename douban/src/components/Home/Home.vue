<template>
  <div class="home">
   <div class="header">
     <h1>会员购</h1>
   </div>
   <div class="list-wrapper">
     <list-view :list='list'></list-view>
   </div>
  </div>
</template>

<script>
import {ERR_NO} from 'api/config';
import {getListV2} from 'api/home';
import listView from 'base/listView/listView';
export default {
  data () {
    return {
      list: []
    };
  },
  created () {
    this.$nextTick(() => {
      this._getList();
    });
  },
  components: {
    'list-view': listView
  },
  methods: {
    _getList () {
      getListV2().then((res) => {
        if (res.errno === ERR_NO) {
          this.list = res.data.result;
        }
      });
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
.home
{
  .header
  {
    height: 40px;
    line-height: 40px;
    width: 100%;
    background: $theme-color;
    color: #fff;
    text-align: center;
  }
}
</style>
