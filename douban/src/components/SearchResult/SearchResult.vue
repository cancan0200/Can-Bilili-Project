<template>
 <transition name='slide'>
  <div class="search-result">
    <div class="header">
      <SearchBox @back='searchBack' :query='keyWord' ref='searchBox' placeholder='商品、品牌、作品名'></SearchBox>
    </div>
    <div class="sort-order-wrapper">
       <ul ref='sortWrapper' class="sort-wrapper">
        <li class="sort-item active">综合</li>
        <li class="sort-item" :class="{active: sortSale}" @click='sortByVolume'>销量</li>
        <li class="sort-item" :class="{active: sortPrice}" @click="sortByPrice">价格</li>
        <li class="sort-item">现货</li>
        <li class="sort-item">筛选</li>
      </ul>
    </div>
    <div class="list-Wrapper">
      <shopList @selectGood='selectGood' :list='searchResultList'></shopList>
    </div>
    <div class="loading-container" v-show="searchResultList.length != 0">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
 </transition>
</template>

<script>
import SearchBox from 'base/searchBox/searchBox';
import shopList from 'base/shopList/shopList';
// import SortOrder from 'base/SortOrder/SortOrder';
import loading from 'base/loading/loading';

import {search} from 'api/search';
import {ERR_NO} from 'api/config';

export default {
  components: {
    SearchBox,
    shopList,
    loading
  },
  data () {
    return {
      keyWord: '',
      searchResultList: [],
      sortPrice: false,
      sortSale: false
    };
  },
  created () {
    this.keyWord = this.$route.params.mid;
    this._searchQuery(this.keyWord);
  },
  methods: {
    _searchQuery (query) {
      search(query, 1).then((res) => {
        if (res.code === ERR_NO) {
          this.searchResultList = res.data.list;
        }
      });
    },
    searchBack () {
      this.$router.back();
    },
    selectGood (item) {
      // 跳转路由
      this.$router.push({
        path: `/classify/${this.keyWord}/${item.itemsId}`
      });
    },
    // 根据销量进行排序
    sortByVolume () {
      let list = this.searchResultList;
      list.sort((b, a) => {
        if (this.sortSale) {
          // 从大到小的顺序
          return b.like - a.like;
        } else {
          return a.like - b.like;
        }
      });
      this.sortSale = !this.sortSale;
      this.searchResultList = list;
    },
    // 根据价格排序
    sortByPrice () {
      let list = this.searchResultList;
      list.sort((b, a) => {
        if (this.sortPrice) {
          // 从大到小的顺序
          return b.price - a.price;
        } else {
          return a.price - b.price;
        }
      });
      this.sortPrice = !this.sortPrice;
      this.searchResultList = list;
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.search-result {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 102;
  background: #fff;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.4s ease;
  }
  &.slide-enter,&.slide-leave-to{
    transform: translate3d(-100%,0,0);
  }
  .sort-order-wrapper {
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
}
</style>
