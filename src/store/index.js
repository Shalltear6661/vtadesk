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
  },
};

export default {
  state: readonly(state),
  methods,
};
