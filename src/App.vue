<template>
  <!-- <HeaderVue /> -->
  <router-view />
  <FooterVue />
</template>

<style scoped>
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import { provide } from "vue";
import store from "./store";
// import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";

export default {
  components: {
    // HeaderVue,
    FooterVue,
  },
  setup() {
    provide("store", store);
  },
};
</script>
