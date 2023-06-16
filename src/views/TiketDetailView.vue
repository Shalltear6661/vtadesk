<template>
  <HeaderVue />
  <div class="page-content">
    <div class="container-fluid">
      <CountTiket />
      <LogPerangkat />
      <DataTiketDetail />
    </div>
  </div>
  <FooterVue />
</template>
<script>
import CountTiket from "@/components/CountTiket.vue";
import DataTiketDetail from "@/components/DataTiketDetail.vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import LogPerangkat from "@/components/LogPerangkat.vue";
export default {
  name: "PageComp",
  components: {
    HeaderVue,
    FooterVue,
    CountTiket,
    DataTiketDetail,
    LogPerangkat,
  },
};
</script>
