import { debounce } from "./utils";
//混入
export const itemImgLintenner = {
  data() {
    return {
      itemImgLintenner: null,
      refresh: null
    };
  },
  mounted() {
    console.log("我是混入");
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgLintenner = () => {
      this.refresh();
    };
    this.$bus.$on("imageLoad", this.itemImgLintenner);
  }
};
