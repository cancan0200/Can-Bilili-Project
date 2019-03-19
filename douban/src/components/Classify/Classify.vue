<template>
  <div class="Classify">
    <div class="header">
      <SearchBox ref='searchBox' @back="back" placeholder='商品、品牌、作品名'></SearchBox>
    </div>
    <div class="classify-content" >
      <scroll :data='classify' ref='leftScroll' class="classify-left">
        <div>
          <ul>
            <li :class="{active: index === currentIndex}" class="list-item"
            @click='selectItem(index)'
            v-for='(item,index) in classify' :key='index'>
              <span class="icon"></span>
              <span class="text">{{item.typeName}}</span>
            </li>
          </ul>
        </div>
      </scroll>
      <scroll ref='rightScroll' :data='classify'
      @scroll='rightScroll' class="classify-right">
        <div>
          <ul ref="rightWrapper">
            <li class="right-item" v-for='(itemHeader,index) in classify' :key='index'>
              <h5 class="item-header">{{itemHeader.categorySecondLevels[0].title}}</h5>
              <ul class="categorySecond-list">
                <li @click='selectToQuery(item)' class="categorySecond-item" v-for='(item,index) in itemHeader.categorySecondLevels[0].categoryInfos' :key='index'>
                  <div class="img-container" >
                    <img src='http://i0.hdslb.com/bfs/mall/mall/ae/f4/aef45ae3786254186eba1fe06beddcdc.png@.jpg'/>
                  </div>
                  <!-- src='http://i0.hdslb.com/bfs/mall/mall/ae/f4/aef45ae3786254186eba1fe06beddcdc.png@.jpg' -->
                  <span class="text">{{item.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getClassify} from 'api/home';
import {ERR_NO} from 'api/config';
import Scroll from 'base/scroll/scroll';
import SearchBox from 'base/searchBox/searchBox';

export default {
  data () {
    return {
      classify: [],
      listHeight: [],
      scrollY: 0,
      currentIndex: 0 // 记录左边menu的索引
    };
  },
  components: {
    Scroll,
    SearchBox
  },
  created () {
    this.$nextTick(() => {
      this._getClassify();
    });
  },
  watch: {
    classify () {
      this.$nextTick(() => {
        this._calculateHeight();
      });
    },
    scrollY (scrollY) {
      var index = 0;
      for (var i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (height2 && (scrollY >= height1 && scrollY < height2)) {
          index = i;
        }
      }
      this.currentIndex = index;
    }
  },
  methods: {
    selectToQuery (item) {
      // 进行子路由的跳转
      this.$router.push({
        path: `/Classify/${item.id}`
      });
    },
    selectItem (index, event) {
      // console.log(-this.listHeight[index]);
      this.scrollY = this.listHeight[index];
      // 右边滚动到对应的item
      this.$refs.rightScroll.scrollTo(0, -this.listHeight[index], 300);
    },
    // 右边滚动的时候左边滚动到相应的菜单,通过记录scrollY计算currentIndex
    rightScroll (pos) {
      this.scrollY = Math.abs(Math.round(pos.y));
    },
    // 计算每个模块的高度，存入一个数组中
    _calculateHeight () {
      this.listHeight = [];
      let height = 0;
      this.listHeight.push(height);
      this.$nextTick(() => {
        var list = this.$refs.rightWrapper.getElementsByClassName('right-item');
        for (var i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        };
      });
    },
    _getClassify () {
      getClassify().then((res) => {
        if (res.code === ERR_NO) {
          this.classify = res.data.vo;
        }
      });
    },
    getSrc (url) {
      return `http:${url}@.jpg`;
    },
    back () {
      this.$router.back();
    }
  }
}
</script>

<style lang='scss'>
@import 'common/css/variable.scss';
.classify-content {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 51px;
  width: 100%;
  overflow: hidden;
  background: $color-background;
  font-size: 0;
  display: flex;
  .classify-left {
    flex: 0 0 92px;
    width: 92px;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-item{
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: #212121;
      &.active{
        background: #fff;
        color: $theme-color;
      }
      .text{
        margin: 0 2px 0 22px;
      }
    }
  }
  .classify-right{
    height: 100%;
    overflow: hidden;
    flex: 1;
    padding: 5px;
    box-sizing: border-box;
    height: 100%;
    background: #fff;
    color: $color-text-d;
    .right-item {
      padding: 0px 0 10px 0;
      width: 100%;
      box-sizing: border-box;
      .item-header {
        height: 20px;
        line-height: 20px;
        color:$color-text;
        font-size: $font-size-medium;
      }
      .categorySecond-list {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: left;
        flex-wrap: wrap;
        .categorySecond-item {
          flex: 0 30.33%;
          margin-top: 8%;
          margin-bottom: 3%;
          height: 100px;
          width: 30.33%;
          .img-container {
            width: 100%;
            height: 80%;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .text {
            display: block;
            width: 100%;
            margin: 5px 0;
            font-size: $font-size-small;
            text-align: center;
          }
        }
      }
    }
  }
}
// .search-result {
//   position: relative;
// }
</style>
