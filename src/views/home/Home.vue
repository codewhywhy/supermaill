<template>
  <div id="Home">
    <div class="home-nav">
      <nav-bar>
        <div slot="center">购物街</div>
      </nav-bar>
    </div>
    <home-swiper ref="hSwiper" :banners="banner"></home-swiper>
  </div>
</template>
<script>
import NavBar from "components/content/navBar/NavBar";
import { getHomeMutiData } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper";
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      dKeyword: [],
      keywords: [],
      recommend: [],
      isLoaded: false
    };
  },
  components: {
    NavBar,
    HomeSwiper
  },
  created() {
    getHomeMutiData()
      .then(res => {
        console.log(res.data.banner.list);
        this.banner = res.data.banner.list;
        this.dKeyword = res.data.dKeyword;
        this.keywords = res.data.keywords;
        this.recommend = res.data.recommend;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {}
};
</script>
<style>
.home-nav {
  background-color: var(--color-tint);
  height: 44px;
  line-height: 44px;
  color: #fff;
  text-align: center;
}
</style>
