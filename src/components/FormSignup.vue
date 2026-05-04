<template>
  <div class="col-md-12 home">
    <div class="row justify-content-end">
      <div class="col-md-6 col-lg-6 col-xl-5">
        <div class="card mt-4 shadow bg-white p-3 mb-5 rounded">
          <div class="card-body p-4">
            <div class="text-center mt-2">
              <h5 class="text-secondary">Selamat Datang !</h5>
              <p class="text-muted">
                Masukan
                <strong>Email dan Password</strong>
              </p>
            </div>
            <div class="p-2 mt-4">
              <form @submit.prevent="submitForm">
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Masukkan Tiket Anda"
                    v-model="nama"
                  />
                  <label class="form-label">Nama</label>
                </div>

                <div class="form-floating mb-2">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Masukkan Tiket Anda"
                    v-model="email"
                  />
                  <label class="form-label">Email</label>
                </div>

                <div class="form-floating mb-2 mt-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Masukkan Tiket Anda"
                    v-model="password"
                  />
                  <label class="form-label">Password</label>
                </div>

                <div class="mt-4">
                  <button class="btn btn-success w-100" type="submit">
                    Buat Akun
                  </button>
                </div>
              </form>

              <div class="mt-2 text-center">
                <p class="mb-0">
                  Sudah punya akun ?
                  <a
                    href="/tiket"
                    class="fw-semibold text-primary text-decoration-underline"
                  >
                    Login Sekarang</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  background: url("@/assets/5104326.jpg") no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: contain;
}

.card {
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
}

@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}

@keyframes mover {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "IndexView",
  data() {
    return {
      email: "",
      password: "",
      nama: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        axios
          .post(this.UrlApi + "regitered", {
            email: this.email,
            password: this.password,
            nama: this.nama,
            status: "CS",
          })
          .then((res) => {
            console.log(res.data.data);
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Daftar Berhasil, silahkan login",
              showConfirmButton: false,
              timer: 1500,
            });
            // sessionStorage.setItem("key", res.data.data);
            // localStorage.setItem("nama", res.data.nama);
            // localStorage.setItem("id", res.data.autono);
            // localStorage.setItem("email", res.data.email);
            // localStorage.setItem("level_name", res.data.level_name);
            // if (res.data.sn !== null) {
            //   localStorage.setItem("sn", res.data.sn);
            // }
            this.$router.push("/login");
          })
          .catch((err) => {
            if (err.response) {
              Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Password atau Email Salah",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log("error response");
            } else if (err.request) {
              console.log("error request");
              Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Request Gagal periksa server atau koneksi anda",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              console.log("error");
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
