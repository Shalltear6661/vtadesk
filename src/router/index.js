import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import TiketDetail from "../views/TiketDetailView.vue";
import MessageView from "../views/MessageView.vue";
import LogPerangkat from "../views/LogPerangkat.vue";
import LogPerangkatAll from "../views/LogPerangkatAll.vue";

const routes = [
  {
    path: "/",
    name: "detail",
    component: TiketDetail,
  },
  {
    path: "/tiket",
    name: "tiket",
    component: LoginView,
  },
  {
    path: "/create",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateTiketView.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: MessageView,
  },
  {
    path: "/log-perangkat",
    name: "log perangkat",
    component: LogPerangkat,
  },
  {
    path: "/log-perangkat-all",
    name: "log perangkat all",
    component: LogPerangkatAll,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
