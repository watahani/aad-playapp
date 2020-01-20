import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { PlayApp } from "./PlayApp";
import {
  AADApp,
  AADAppParam,
  ResponseTypeEnum,
  CODE_CHALLENGE_METHOD
} from "@/aadApp/AadApp";

let apps = [];

const appListStr = localStorage.getItem("appList_v2");

if (appListStr) {
  try {
    apps = JSON.parse(appListStr);
  } catch (error) {
    console.error(error);
    let app = new AADApp({
      apiVersion: 2,
      client_id: "eff64ce9-b445-4657-ac0b-378544e9d0bd",
      appType: "tenantOnly",
      response_type: [ResponseTypeEnum.CODE],
      scope: ["openid"],
      code_verifier: "aaaaa",
      code_challenge_method: CODE_CHALLENGE_METHOD.S256,
      redirectUris: [
        {
          isDefault: true,
          uri: "https://watahani.github.io/aad-playapp/"
        }
      ],
      url_params: [],
      client_secret: "secret",
      tenant_id: "whdv.onmicrosoft.com",
      display_name: "App 1"
    });
    apps = [app];
  }
}

const aadApp = new PlayApp(apps);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: { app: apps[0] }
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
