<template>
  <div class="home">
    <FormLogin />
  </div>
</template>

<script>
// @ is an alias to /src
import FormLogin from "@/components/FormLogin.vue";

export default {
  name: "HomeView",
  components: {
    FormLogin,
  },
};
</script>
