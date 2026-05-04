<template>
  <div>
    <div class="col-lg-6 py-5 px-2">
      <div class="card mt-n4 mx-n4 mb-n5">
        <div class="card-body pb-4 mb-5">
          <h5 class="card-title">Ubah Password</h5>
          <hr />
          <div class="col-md-6 mb-2">
            <label for="fullnameInput" class="form-label">Old Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password_old"
              placeholder="Old Password"
            />
          </div>
          <div class="col-md-6 mb-2">
            <label for="fullnameInput" class="form-label">New Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password_new"
              placeholder="New Password"
            />
          </div>
          <div class="col-md-6 mb-5">
            <label for="fullnameInput" class="form-label"
              >Confirm New Password</label
            >
            <input
              type="password"
              class="form-control"
              v-model="cpassword"
              placeholder="Confirm Password"
            />
          </div>
          <div class="col-12">
            <div class="text-start">
              <button
                type="submit"
                class="btn btn-primary"
                @click="submitStore"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      password_old: null,
      password_new: null,
      cpassword: null,
    };
  },
  methods: {
    submitStore() {
      let key = sessionStorage.getItem("key");
      try {
        axios
          .post("https://api.vitech.asia/api/change-password", {
            verified: key,
            password_old: this.password_old,
            password_new: this.password_new,
            c_password: this.cpassword,
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.clear();
            this.$router.push({ path: "/tiket" });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: error.response.data.data,
              showConfirmButton: false,
              timer: 1500,
            });
            // console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
