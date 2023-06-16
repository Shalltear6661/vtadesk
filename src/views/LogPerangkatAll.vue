<template>
  <HeaderVue />
  <div class="page-content">
    <div class="container-fluid">
      <data-log-perangkat-all></data-log-perangkat-all>
    </div>
  </div>
  <FooterVue />
</template>
<script>
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import DataLogPerangkatAll from "@/components/DataLogPerangkatAll.vue";
export default {
  components: {
    HeaderVue,
    FooterVue,
    DataLogPerangkatAll,
  },
};
</script>

<style scoped></style>
