import Vue from "vue";
import VueRouter from "vue-router";
const Cart = () => import("views/Cart");
const Category = () => import("views/Category");
const Home = () => import("views/Home");
const Profile = () => import("views/Profile");
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/cart",
    components: Cart
  },
  {
    path: "/category",
    components: Category
  },
  {
    path: "/home",
    components: Home
  },
  {
    path: "/profile",
    components: Profile
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
