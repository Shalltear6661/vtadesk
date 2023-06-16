<template>
  <HeaderVue />
  <div class="page-content">
    <div class="container-fluid">
      <log-perangkat-detail></log-perangkat-detail>
    </div>
  </div>
  <FooterVue />
</template>
<script>
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import LogPerangkatDetail from "@/components/LogPerangkatDetail.vue";
export default {
  components: {
    HeaderVue,
    FooterVue,
    LogPerangkatDetail,
  },
};
</script>

<style scoped></style>
