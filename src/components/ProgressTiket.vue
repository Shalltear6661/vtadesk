<template>
  <div class="chat-leftsidebar col-xxl-3 mx-3">
    <div class="px-4 pt-4 mb-4">
      <div class="d-flex align-items-start">
        <div class="flex-grow-1">
          <div class="col-12">
            <h5 class="mb-4">Progress Tiket</h5>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="showChat"
              v-if="!showButton"
            >
              Lihat Chat
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div class="chat-room-list" data-simplebar>
      <div class="table-responsive table-card m-2">
        <table class="table table-borderless align-middle mb-0">
          <tbody>
            <tr>
              <td class="fw-medium">Kode Tiket</td>
              <td>
                <span id="t-no">{{ datatiket.kodetiket }}</span>
              </td>
            </tr>
            <tr>
              <td class="fw-medium">Produk</td>
              <td>{{ datatiket.nm_produk }}</td>
            </tr>
            <tr>
              <td>Deskripsi</td>
              <td>{{ datatiket.deskripsi }}</td>
            </tr>
            <!-- <tr>
              <td class="fw-medium">Status:</td>
            </tr> -->
            <!-- <tr>
              <td class="fw-medium">Prioritas</td>
              <td>
                <span
                  class="badge bg-danger"
                  v-show="datatiket.prioritas == 'tinggi'"
                  >{{ datatiket.prioritas }}</span
                >
                <span
                  class="badge bg-warning"
                  v-show="datatiket.prioritas == 'sedang'"
                  >{{ datatiket.prioritas }}</span
                >
                <span
                  class="badge bg-success"
                  v-show="datatiket.prioritas == 'rendah'"
                  >{{ datatiket.prioritas }}</span
                >
              </td>
            </tr> -->
            <tr>
              <td class="fw-medium">Tanggal Buat</td>
              <td id="c-date">{{ datatiket.tgl_dibuat }}</td>
            </tr>
            <tr>
              <td>Tanggal Perbaikan</td>
              <td>
                {{ datatiket.tgl_perbaikan ? kodetiket.tgl_perbaikan : "-" }}
              </td>
            </tr>
            <tr>
              <td>Solusi</td>
              <td>
                {{ datatiket.solusi ? datatiket.solusi : "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["autono", "show"],
  data() {
    return {
      datatiket: {
        kodetiket: "",
        deskripsi: "",
        prioritas: "",
        tgl_dibuat: "",
        nm_produk: "",
        penerima: "",
        solusi: "",
        tgl_perbaikan: "",
      },
      currentWidth: null,
      showButton: false,
    };
  },
  methods: {
    showChat() {
      this.$emit("show-class", "true");
    },
    myEventHandler() {
      this.currentWidth = window.innerWidth;
    },
  },
  mounted() {
    if (window.innerWidth >= 1000) {
      this.showButton = true;
    }
    window.addEventListener("resize", this.myEventHandler);
    try {
      axios
        .post("https://api.vitech.asia/api/tiketdetail", {
          id: this.autono,
        })
        .then((res) => {
          this.datatiket.kodetiket = res.data.data.kodetiket;
          this.datatiket.deskripsi = res.data.data.deskripsi;
          this.datatiket.penerima = res.data.data.nm_kontak;
          this.datatiket.prioritas = res.data.data.prioritas;
          this.datatiket.tgl_dibuat = res.data.data.tgl_terima;
          this.datatiket.nm_produk = res.data.data.nama_produk;
          this.datatiket.solusi = res.data.data.solusi_teknis;
          this.datatiket.tgl_perbaikan = res.data.data.tgl_perbaikan_awal;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    currentWidth(v) {
      if (v) {
        if (v <= 1000) {
          this.showButton = false;
        } else {
          this.showButton = true;
        }
      }
    },
  },
};
</script>
<!-- var userChatElement = document.getElementsByClassName("user-chat"); 
document.querySelectorAll(".chat-user-list li a").forEach(function (e) { 
  e.addEventListener("click", function (e) { 
    userChatElement.forEach(function (e) { 
      e.classList.add("user-chat-show") }); 
  var t = document.querySelector(".chat-user-list li.active"); t && t.classList.remove("active"), this.parentNode.classList.add("active") }) }), 
  document.querySelectorAll(".user-chat-remove").forEach(function (e) { 
    e.addEventListener("click", function (e) { 
      userChatElement.forEach(function (e) { e.classList.remove("user-chat-show") }) }) }); -->
