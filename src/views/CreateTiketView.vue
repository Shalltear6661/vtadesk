<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mt-n4 mx-n4 mb-n5">
          <div class="bg-soft-warning">
            <div class="card-body pb-4 mb-5">
              <form class="row g-3">
                <div class="col-md-4">
                  <label for="fullnameInput" class="form-label">Nama</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tiket.nama"
                    placeholder="Nama"
                  />
                </div>
                <div class="col-md-4">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="tiket.email"
                    placeholder="Email"
                  />
                </div>
                <div class="col-md-4">
                  <label for="fullnameInput" class="form-label"
                    >Nomor Telepon</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="tiket.nomor"
                    placeholder="Nomor Telepon"
                  />
                </div>
                <div class="col-md-4">
                  <label for="fullnameInput" class="form-label"
                    >Hardware/Software</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="tiket.perangkat"
                    placeholder="Hardware/Software yang anda keluhkan..."
                  />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Prioritas</label>
                  <select v-model="tiket.prioritas" class="form-select">
                    <option selected>Pilih Prioritas...</option>
                    <option value="tinggi">Tinggi</option>
                    <option value="sedang">Sedang</option>
                    <option value="rendah">Rendah</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label"
                    >File Pundukung
                    <small class="text-muted">Jika Ada</small></label
                  >
                  <input type="file" class="form-control" ref="file" />
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label"
                    >Deskripsi Keluhan</label
                  >
                  <textarea
                    rows="5"
                    class="form-control"
                    v-model="tiket.keluhan"
                    placeholder="1234 Main St"
                  ></textarea>
                </div>
                <div class="col-12">
                  <div class="text-end">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click="submitStore"
                    >
                      Buat Tiket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import Swal from "sweetalert2";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();

    const tiket = reactive({
      nama: "",
      email: "",
      nomor: "",
      perangkat: "",
      prioritas: "",
      keluhan: "",
      file: "",
    });

    const file = ref(null);

    function submitStore() {
      var save = {
        nama: tiket.nama,
        email: tiket.email,
        nomor: tiket.nomor,
        perangkat: tiket.perangkat,
        prioritas: tiket.prioritas,
        keluhan: tiket.keluhan,
        file: file.value.files[0],
      };

      Swal.fire({
        title: "Kirim Data",
        text: "Apakah data yang anda isi sudah benar! ?",
        icon: "warning",
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sudah!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("https://api.vitech.asia/api/customer", save)
            .then((res) => {
              console.log(res.data["Tiket"]);
              Swal.fire({
                title: "Ingat Tiket Anda!",
                html:
                  "Tiket Anda <b>" +
                  res.data["Tiket"] +
                  "</b>, Gunakan untuk mengecek balasan dari operator",
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok!",
              });

              router.push({
                name: "home",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }

    return {
      submitStore,
      tiket,
      file,
    };
  },
};
</script>

<style>
.bg-soft-warning {
  background: bisque;
}
</style>
