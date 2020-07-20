<template>
  <div class="Detail">
    <detail-nav-bar
      :title="['商品','参数','评论','推荐']"
      class="detail-nav"
      @detailNavClick="detailNavClick"
      ref="detailNav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @pullingUp="loadMore"
      :pull-up-load="true"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :banner-list="bannerList" @detailImageLoad="detailImageLoad"></detail-swiper>
      <detail-base-info :goods="goods" ref="goodsInfo"></detail-base-info>
      <detail-param-info ref="paramInfo"></detail-param-info>
      <detail-commentaryInfo ref="commentaryInfo"></detail-commentaryInfo>
      <goods-list :goods="recommond" ref="recommondInfo"></goods-list>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentaryInfo from "./childComps/DetailCommentaryInfo";
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, goods } from "network/detail";
import { getHomeGoods } from "network/home";
import { itemImgLintenner } from "common/mixin";
import { debounce } from "common/utils";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      bannerList: [],
      goods: {},
      recommond: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  mixins: [itemImgLintenner],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentaryInfo,
    GoodsList
  },
  destroyed() {
    //离开时取消
    this.$bus.$off("imageLoad", this.detailImgLintener);
  },
  created() {
    // this.iid = this.$route.params.iid;
    this._getDetail();
    this._getHomeGoods("pop");
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      // console.log(this.themeTopY);
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopY.push(this.$refs.commentaryInfo.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommondInfo.$el.offsetTop);
    }, 100);
  },
  mounted() {
    //第一种方式
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("detailImageLoad", () => {
    //   refresh();
    // });
    //第二种方式
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgLintenner = () => {
    //   refresh();
    // };
    // this.$bus.$on("imageLoad", this.itemImgLintenner);
  },
  methods: {
    //页面滚动
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopY.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopY[i] &&
            positionY < this.themeTopY[i + 1]) ||
            (i === length - 1 && positionY > this.themeTopY[i]))
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }
    },
    //图片加载完成
    detailImageLoad() {
      this.refresh();
      //获取高度
      this.getThemeTopY();
    },
    //事件监听
    detailNavClick(index) {
      let y = this.themeTopY[index];
      this.$refs.scroll.scrollTo(0, -y);
    },
    //上拉加载更多
    loadMore() {
      this._getHomeGoods("pop");
    },
    //数据请求
    _getDetail() {
      return getDetail()
        .then(res => {
          let itemInfo = {
            title:
              "【仲陌美】2018春秋季新款原宿风长袖T恤，女bf潮学生韩版拼接白色复古港味宽松百搭上衣打底",
            desc: "",
            price: "￥38.50",
            discountDesc: "活动价",
            lowNowPrice: "￥69.00"
          };
          let columns = ["销量 1580", "收藏33人", "72小时发货"];
          let services = ["退货补运费", "全国包邮", "七天无理由退货"];
          this.goods = new goods(itemInfo, columns, services);
          this.bannerList = res.data.banner.list;
        })
        .catch(err => {});
    },
    _getHomeGoods(type) {
      getHomeGoods(type).then(res => {
        const newList = res[type].list;
        this.recommond.push(...newList);
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style>
.Detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 99;
}
.content {
  height: calc(100% - 44px);
}
</style>