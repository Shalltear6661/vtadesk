import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("key");
  console.log(!token, to.name);
  if (!token && to.name != "tiket") {
    next({ name: "tiket" });
  } else {
    next();
  }
});

const app = createApp(App);
// global variable
app.mixin({
  data() {
    return { UrlApi: "https://api.vitech.asia/api/", showModals: false };
    // return { UrlApi: "http://localhost:8000/api/" };
  },
});
app.use(router).mount("#app");
