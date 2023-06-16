<template>
  <div v-if="detail.status === 1">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="card mx-n4 mb-n5">
            <div class="bg-soft-warning">
              <div class="card-body pb-4 mb-5">
                <div class="row">
                  <div class="col-md">
                    <div class="row align-items-center">
                      <div class="col-md">
                        <h4 class="fw-semibold" id="ticket-title">
                          {{ detail.tiket }} -
                          {{ detail.deskripsi }}
                        </h4>
                        <div class="hstack gap-3 flex-wrap">
                          <div class="text-muted">
                            <i class="ri-building-line align-bottom me-1"></i
                            ><span id="ticket-client">{{ detail.klien }}</span>
                          </div>
                          <div class="vr"></div>
                          <div class="text-muted">
                            Tanggal Dibuat :
                            <span class="fw-medium" id="create-date">{{
                              detail.tgl_dibuat
                            }}</span>
                          </div>
                          <div class="vr"></div>
                          <div class="text-muted">
                            Tenggat Waktu :
                            <span class="fw-medium" id="due-date">{{
                              detail.tenggat_waktu ?? "-"
                            }}</span>
                          </div>
                          <div class="vr"></div>
                          <div
                            class="badge rounded-pill bg-info fs-12"
                            id="ticket-status"
                          >
                            {{ detail.stat_tiket }}
                          </div>
                          <div
                            class="badge rounded-pill bg-danger fs-12"
                            id="ticket-priority"
                          >
                            {{ detail.prioritas }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xxl-9">
          <div class="card">
            <div class="card-body p-4">
              <h6 class="text-uppercase mb-3">Deskripsi Tiket</h6>
              <p class="text-muted">
                {{ detail.deskripsi }}
              </p>
              <p class="text-uppercase">Lampiran</p>
              <img :src="detail.img_cust" alt="error img" class="img-fluid" />
              <div class="mt-4">
                <h6 class="text-uppercase mb-3">Hasil perbaikan</h6>

                <div>
                  <pre
                    class="language-markup rounded-2"
                  ><code>{{ detail.solusi }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-3">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Detil Tiket</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive table-card">
                <table class="table table-borderless align-middle mb-0">
                  <tbody>
                    <tr>
                      <td class="fw-medium">Tiket</td>
                      <td>{{ detail.tiket }}</td>
                    </tr>
                    <tr>
                      <td class="fw-medium">Klien</td>
                      <td id="t-client">{{ detail.klien }}</td>
                    </tr>
                    <tr>
                      <td class="fw-medium">Proyek</td>
                      <td>{{ detail.proyek }}</td>
                    </tr>
                    <tr>
                      <td class="fw-medium">Prioritas</td>
                      <td>
                        <span class="badge bg-danger" id="t-priority">{{
                          detail.prioritas
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-medium">Tanggal Dibuat</td>
                      <td id="c-date">{{ detail.tgl_dibuat }}</td>
                    </tr>
                    <tr>
                      <td class="fw-medium">Tenggat Waktu</td>
                      <td id="d-date">
                        {{ detail.tenggat_waktu ?? "-" }}
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-medium">Penerima</td>
                      <td id="d-date">
                        <span class="badge bg-info">{{ detail.penerima }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <div class="card-header">
              <h6 class="card-title fw-semibold mb-0">Lampiran</h6>
            </div>
            <div class="card-body">
              <div v-for="lampirans in lampiran" :key="lampirans">
                <div
                  class="d-flex align-items-center border border-dashed p-2 rounded mt-2"
                >
                  <div class="flex-shrink-0 avatar-sm">
                    <div class="avatar-title bg-light rounded">
                      <i class="ri-file-zip-line fs-20 text-primary"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">
                      <a href="javascript:void(0);" class="text-body"
                        >Velzon-admin.zip</a
                      >
                    </h6>
                    <small class="text-muted">3.2 MB</small>
                  </div>
                  <div class="hstack gap-3 fs-16">
                    <a href="javascript:void(0);" class="text-muted"
                      ><i class="ri-download-2-line"></i
                    ></a>
                    <a href="javascript:void(0);" class="text-muted"
                      ><i class="ri-delete-bin-line"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="detail.status === 0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-8">
          <div class="text-center">
            <img :src="img" alt="error img" class="img-fluid" />
            <div class="mt-3">
              <h3 class="text-uppercase">Tiket tidak ditemukan</h3>
              <p class="text-muted mb-4">
                Mohon masukan kode tiket yang valid!
              </p>
              <a href="#" class="btn btn-success"
                ><i class="mdi mdi-home me-1"></i>Kembali ke pencarian</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="container">
      <div class="row justify-content-center">
        <section :class="[load]">Loading...</section>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import not_found from "@/assets/error400-cover.png";
import axios from "axios";
// import { useRoute } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "DetailTiket",
  setup() {
    let load = ref("d-none");

    const lampiran = ref([1, 2, 3, 4, 5]);

    // const router = useRoute();

    let img_cust = ref("");

    const detail = reactive({
      tiket: "",
      klien: "",
      proyek: "",
      prioritas: "",
      tgl_dibuat: "",
      tenggat_waktu: "",
      deskripsi: "",
      solusi: "",
      stat_tiket: "",
      status: "",
      img_cust: "",
      penerima: "",
    });

    onMounted(() => {
      var tiketId = localStorage.getItem("tiketId");
      console.log(tiketId);

      axios
        .post("https://api.vitech.asia/api/tiket", {
          kodetiket: tiketId,
        })
        .then((res) => {
          if (res.data.data.kodetiket != null) {
            detail.tiket = res.data.data.kodetiket;
            detail.klien = res.data.data.nama_instansi;
            detail.proyek = res.data.data.nama_pekerjaan;
            detail.prioritas = res.data.data.prioritas;
            detail.tgl_dibuat = res.data.data.tgl_terima;
            detail.tenggat_waktu = res.data.data.tgl_penugasan_akhir;
            detail.deskripsi = res.data.data.deskripsi;
            detail.solusi = res.data.data.solusi;
            detail.stat_tiket = res.data.data.status_tiket;
            detail.status = 1;
            detail.penerima = res.data.data.penerima;

            detail.img_cust =
              "https://api.vitech.asia/storage/customer/" +
              res.data.data.nama_file;
            console.log(img_cust);

            Swal.fire({
              title: "Berhasil... !",
              text: "Tiket berhasil ditemukan",
              allowEscapeKey: false,
              allowOutsideClick: false,
              timer: 2000,
              icon: "success",
              // didOpen: () => {
              //   Swal.showLoading();
              // },
            });
          } else {
            detail.status = 0;

            Swal.fire({
              title: "Gagal... !",
              text: "Tiket tidak berhasil ditemukan",
              allowEscapeKey: false,
              allowOutsideClick: false,
              timer: 2000,
              icon: "error",
              // didOpen: () => {
              //   Swal.showLoading();
              // },
            });
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    });

    const img = not_found;

    return {
      img,
      detail,
      load,
      lampiran,
      img_cust,
    };
  },
};
</script>
