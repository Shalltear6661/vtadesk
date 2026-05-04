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
                    Masuk
                  </button>
                </div>
              </form>

              <!-- <div class="mt-2 text-center">
                <p class="mb-0">
                  Belum punya akun ?
                  <a
                    href="/signup"
                    class="fw-semibold text-primary text-decoration-underline"
                  >
                    Daftar Sekarang</a
                  >
                </p>
              </div> -->
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
      sn: this.$route.query.sn,
    };
  },
  created() {
    // console.log(this.email);

    if (this.sn != null) {
      try {
        axios
          .post(this.UrlApi + "emailcustomer", {
            sn: this.$route.query.sn,
          })
          .then((res) => {
            this.email = res.data.data[0].email;
          })
          .catch((err) => {
            if (err.response) {
              console.log("error response");
            } else if (err.request) {
              console.log("error request");
            } else {
              console.log("error");
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        axios
          .post(this.UrlApi + "proslogin", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            // console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Anda Berhasil Login",
              showConfirmButton: false,
              timer: 1500,
            });
            sessionStorage.setItem("key", res.data.user);
            localStorage.setItem("nama", res.data.nama);
            localStorage.setItem("id", res.data.autono);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("level_name", res.data.level_name);
            localStorage.setItem("entitas", res.data.entitas);
            localStorage.setItem("autono", res.data.cust_id);
            if (res.data.sn !== null) {
              localStorage.setItem("sn", res.data.sn);
            }
            this.$router.push("/");
            this.storeFirebaseToken(res.data.cust_id);
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
    storeFirebaseToken(id) {
      try {
        axios
          .post(this.UrlApi + "storeusertoken", {
            id: id,
            token: localStorage.getItem("firebaseToken"),
          })
          .then(() => {
            console.log("success");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response);
            } else if (err.request) {
              console.log("error request");
            } else {
              console.log("error");
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
