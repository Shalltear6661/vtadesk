<template>
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
      >
        <h4 class="mb-sm-0">Rekap Tiket</h4>

        <!-- <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <a href="javascript: void(0);">Tickets</a>
            </li>
            <li class="breadcrumb-item active">Tickets List</li>
          </ol>
        </div> -->
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xxl-4 col-sm-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <p class="fw-medium text-muted mb-0">Semua Tiket</p>
              <h2 class="mt-4 ff-secondary">
                <span class="counter-value" data-target="547">{{
                  total_tiket
                }}</span>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-soft-info text-info rounded-circle fs-4"
                >
                  <i class="ri-ticket-2-line"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
      <!-- end card-->
    </div>
    <!--end col-->
    <div class="col-xxl-4 col-sm-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <p class="fw-medium text-muted mb-0">Tiket dalam proses</p>
              <h2 class="mt-4 ff-secondary">
                <span class="counter-value" data-target="124">{{
                  pending_tiket
                }}</span>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-soft-info text-info rounded-circle fs-4"
                >
                  <i class="mdi mdi-timer-sand"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
    </div>
    <!--end col-->
    <div class="col-xxl-4 col-sm-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <p class="fw-medium text-muted mb-0">Tiket selesai</p>
              <h2 class="mt-4 ff-secondary">
                <span class="counter-value" data-target="107">{{
                  closed_tiket
                }}</span>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-soft-info text-info rounded-circle fs-4"
                >
                  <i class="ri-shopping-bag-line"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
    </div>
    <!--end col-->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      total_tiket: 0,
      pending_tiket: 0,
      closed_tiket: 0,
      level_name: localStorage.getItem("level_name"),
    };
  },
  created() {
    try {
      axios
        .post("https://api.vitech.asia/api/tiketcount", {
          id: localStorage.getItem("id"),
          level_name: this.level_name,
        })
        .then((res) => {
          this.total_tiket = res.data.data.total;
          this.pending_tiket = res.data.data.progres;
          this.closed_tiket = res.data.data.close;
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
