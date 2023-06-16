<template>
  <div class="auth-page-wrapper pt-2">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mt-xl-5">
            <div class="row justify-content-center">
              <div class="col-xl-10">
                <div class="card">
                  <div class="card-header">
                    <img
                      src="@/assets/vta_desk_black.png"
                      alt="logo-vtadesk"
                      height="25"
                    />
                  </div>
                  <div class="card-body">
                    <form-login />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 3%;
}
</style>
<script>
import FormLogin from "@/components/FormLogin.vue";
export default {
  components: { FormLogin },
};
</script>
