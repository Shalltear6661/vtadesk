<template>
  <HeaderVue />
  <div class="page-content">
    <div class="container-fluid">
      <FormChangePassword />
    </div>
  </div>
  <FooterVue />
</template>
<script>
import FormChangePassword from "@/components/FormChangePassword.vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
export default {
  name: "PageComp",
  components: {
    HeaderVue,
    FooterVue,
    FormChangePassword,
  },
};
</script>
