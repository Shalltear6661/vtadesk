<template>
  <div v-show="level_name === 'ADMINISTRATOR'">
    <div class="row">
      <div class="col-12">
        <div
          class="page-title-box d-sm-flex align-items-center justify-content-between"
        >
          <h4 class="mb-sm-0">Semua Log Perangkat</h4>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-sm-6">
      <div class="card card-animate bg-soft-secondary">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <p class="fw-medium text-dark mb-0">Total Perangkat</p>
              <h2 class="mt-4 ff-secondary">
                <a href="/log-perangkat-all">
                  <span class="badge bg-soft-light text-dark"
                    >{{ count }} <i class="ri-device-line"></i
                  ></span>
                </a>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-soft-light text-dark rounded-circle fs-4"
                >
                  <i class="ri-computer-line"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
      <!-- end card-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      count: null,
      level_name: localStorage.getItem("level_name"),
    };
  },
  created() {
    try {
      axios.get("https://api.vitech.asia/api/perangkatcount").then((res) => {
        this.count = res.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped></style>
