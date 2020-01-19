import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { PlayApp } from "./PlayApp";
import { AADApp, AADAppParam, ResponseTypeEnum } from "@/aadApp/AadApp";

let apps = [];

const appListStr = localStorage.getItem("appList_v2");

if (appListStr) {
  apps = JSON.parse(appListStr);
}

const aadApp = new PlayApp(apps);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: { app: aadApp }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
