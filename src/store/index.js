import { reactive, readonly } from "vue";
// import Swal from "sweetalert2";
// import axios from "axios";
import router from "@/router";

const state = reactive({
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
});

const methods = {
  submitForm(tiket) {
    state.tiket = tiket;
    localStorage.setItem("tiketId", tiket);

    router.push({
      name: "detail",
    });
    // Swal.fire({
    //   title: "Mohon Tunggu... !",
    //   allowEscapeKey: false,
    //   allowOutsideClick: false,
    //   timer: 2000,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // }).then(() => {

    //   axios
    //     .post("https://api.vitech.asia/api/tiket", { kodetiket: tiket })
    //     .then((res) => {
    //       if (res.data.data != null) {
    //         state.tiket = res.data.data.kodetiket;
    //         state.klien = res.data.data.nama_instansi;
    //         state.proyek = res.data.data.nama_pekerjaan;
    //         state.prioritas = res.data.data.prioritas;
    //         state.tgl_dibuat = res.data.data.tgl_terima;
    //         state.tenggat_waktu = res.data.data.tgl_penugasan_akhir;
    //         state.deskripsi = res.data.data.deskripsi;
    //         state.solusi = res.data.data.solusi;
    //         state.stat_tiket = res.data.data.status_tiket;
    //         state.status = 1;

    //         // localStorage.setItem("local", JSON.stringify(state));
    //         router.push("/detail");
    //       } else {
    //         state.status = 0;

    //         // localStorage.setItem("local", JSON.stringify(state));
    //         router.push("/detail");
    //       }
    //     })
    //     .catch(function (error) {
    //       if (error.response) {
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //       } else if (error.request) {
    //         console.log(error.request);
    //       } else {
    //         console.log("Error", error.message);
    //       }
    //       console.log(error.config);
    //     });
    // });
  },
};

export default {
  state: readonly(state),
  methods,
};
