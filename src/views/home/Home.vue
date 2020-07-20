<template>
  <div id="Home">
    <div class="home-nav">
      <nav-bar>
        <div slot="center">购物街</div>
      </nav-bar>
    </div>
    <tab-control
      :tabControlTitle="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isShowTabControl"
      class="tab-control"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      @scroll="scrollShow"
      :probeType="3"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper ref="hSwiper" :banners="banner" @homeSwiperImgLoad="homeSwiperImgLoad"></home-swiper>
      <home-recommend :recommend="recommend" />
      <feature-view />
      <tab-control :tabControlTitle="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoodsList"></goods-list>
      <ul>
        <li>1111111111111</li>
        <li>22222222222222</li>
        <li>33333333333333333</li>
        <li>4444444444444444</li>
        <li>5555555555555555</li>
        <li>66666666666666</li>
        <li>77777777777777</li>
        <li>88888888888888</li>
        <li>9999999999999</li>
        <li>00000000000000000</li>
      </ul>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/content/navBar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import Scroll from "components/common/scroll/Scroll";

import HomeRecommend from "./childComps/HomeRecommendViews";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMutiData, getHomeGoods } from "network/home";
import { itemImgLintenner } from "common/mixin";
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      currentIndex: 0,
      isShowBackTop: false,
      tabControlOffset: 0,
      isShowTabControl: false,
      saveY: 0
    };
  },
  mixins: [itemImgLintenner],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },

  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {},
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //离开时保存
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    //离开时取消
    this.$bus.$off("imageLoad", this.itemImgLintener);
  },
  created() {
    // 1.请求轮播等数据
    this._getHomeMutiData();
    // 2.请求商品数据
    this._getHomeGoods("pop");
    this._getHomeGoods("sell");
    this._getHomeGoods("new");
  },
  mounted() {
    // 3.监听一些事件,图片加载监听第一种方式
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("imageLoad", () => {
    //   refresh();
    // });
    //第二种方式
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgLintener = () => {
    //   refresh();
    // };
    // this.$bus.$on("imageLoad", this.itemImgLintener);
  },
  methods: {
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    scrollShow(position) {
      //监听滚动判断是否显示backTop
      this.isShowBackTop = -position.y > 500;
      //监听滚动判断是否显示tabControl
      this.isShowTabControl = -position.y > this.tabControlOffset;
    },
    loadMore() {
      this._getHomeGoods(this.currentType);
    },
    homeSwiperImgLoad() {
      this.tabControlOffset = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求
    _getHomeMutiData() {
      getHomeMutiData()
        .then(res => {
          // console.log(res.data.banner.list);
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getHomeGoods(type) {
      const page = this.goods[type].page;
      getHomeGoods(type, page).then(res => {
        const newList = res[type].list;
        this.goods[type].list.push(...newList);
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style>
#Home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  height: 44px;
  line-height: 44px;
  color: #fff;
  text-align: center;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 99;
}
</style>
