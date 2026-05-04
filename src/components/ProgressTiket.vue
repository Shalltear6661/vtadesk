<!-- eslint-disable prettier/prettier -->
<template>
  <div class="chat-leftsidebar col-xxl-6 mx-3">
    <div class="px-4 pt-4 mb-4">
      <div class="d-flex align-items-start">
        <div class="flex-grow-1">
          <div class="col-12">
            <h4>Detail Tiket <a class="btn btn-danger btn-sm" href="/">Kembali</a></h4>
            <button type="button" class="btn btn-primary" @click.prevent="showChat" v-if="!showButton">
              Lihat Chat
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-room-list" data-simplebar>
      <div class="table-responsive table-card m-2">
        <table class="table table-bordered align-middle mb-0">
          <tbody>
            <tr>
              <td>Kode Tiket</td>
              <td>{{ datatiket.kodetiket }}</td>
            </tr>
            <tr>
              <td>Produk</td>
              <td>{{ datatiket.nm_produk }}</td>
            </tr>
            <tr>
              <td>Tanggal Buat</td>
              <td>{{ datatiket.tgl_dibuat }}</td>
            </tr>
            <tr>
              <td>Status Tiket</td>
              <td>{{ datatiket.stat_tiket }}</td>
            </tr>
            <tr>
              <td>Keluhan</td>
              <td>{{ datatiket.deskripsi.replace(/<br\s*[\/]?>/gi, '\n') }}</td>
            </tr>
            <tr v-if="datatiket.files != null">
              <td>Lampiran File</td>
              <td v-if="ambilExtension(datatiket.files) == 'pdf'">
                <a :href="'https://api.vitech.asia/storage/customer/' + datatiket.files" target="_blank"><img src="/images/pdf.png" alt=""></a>
              </td>
              <td v-else-if="ambilExtension(datatiket.files) == 'doc' || ambilExtension(datatiket.files) == 'docx'">
                <a :href="'https://api.vitech.asia/storage/customer/' + datatiket.files" target="_blank"><img src="/images/word.png" alt=""></a>
              </td>
              <td v-else-if="ambilExtension(datatiket.files) == 'xls' || ambilExtension(datatiket.files) == 'xlsx'">
                <a :href="'https://api.vitech.asia/storage/customer/' + datatiket.files" target="_blank"><img src="/images/xls.png" alt=""></a>
              </td>
              <td v-else-if="ambilExtension(datatiket.files) == 'jpg' || ambilExtension(datatiket.files) == 'jpeg' || ambilExtension(datatiket.files) == 'png' || ambilExtension(datatiket.files) == 'webp'">
                <img :src="'https://api.vitech.asia/storage/customer/' + datatiket.files" class="img-fluid img-thumbnail" alt="">
              </td>
              <td v-else-if="ambilExtension(datatiket.files) == 'mp4' || ambilExtension(datatiket.files) == 'oog' || ambilExtension(datatiket.files) == 'mov' || ambilExtension(datatiket.files) == 'webm'">
                <video width="320" height="240" controls>
                  <source :src="'https://api.vitech.asia/storage/customer/' + datatiket.files">
                </video>
              </td>
              <td v-else>
                <a :href="'https://api.vitech.asia/storage/customer/' + datatiket.files" target="_blank"><img src="/images/files.png" alt=""></a>
              </td>
            </tr>
            <tr v-else>
              <td>Lampiran File</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <h6 class="mt-4">Hasil Perbaikan</h6>
        <hr>
        <table class="table table-bordered align-middle mb-0">
          <tbody>
            <tr>
              <td>Status Perbaikan</td>
              <td class="text-center">{{ (datatiket.servis == 2) ? (datatiket.servis == 1) ? 'Proses' : 'Selesai' : '-' }}
              </td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td class="text-center">{{ datatiket.solusi ?? '-' }}</td>
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
        servis: "",
        stat_tiket: "",
        files: "",
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
    back() {
      this.$router.go(-1);
    },
    ambilExtension(string) {
      if (string !== null) {
        const resArr = string.split(".");
        return resArr[1];
      }
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
          // console.log(res.data.data);
          // console.log(res.data.data.proses_servis);
          this.datatiket.kodetiket = res.data.data.kodetiket;
          this.datatiket.deskripsi = res.data.data.deskripsi;
          this.datatiket.penerima = res.data.data.nm_kontak;
          this.datatiket.prioritas = res.data.data.prioritas;
          this.datatiket.tgl_dibuat = res.data.data.tgl_terima;
          this.datatiket.nm_produk = res.data.data.nama_produk;
          this.datatiket.solusi = res.data.data.solusi_teknis;
          this.datatiket.servis = res.data.data.proses_servis;
          this.datatiket.stat_tiket = res.data.data.stat_tiket;
          this.datatiket.files = res.data.data.nama_file;
          localStorage.setItem("tiket", res.data.data.kodetiket);

          if (localStorage.getItem("notif-key")) {
            let arrayData = JSON.parse(localStorage.getItem("notif-key"));

            let index = arrayData.indexOf(res.data.data.kodetiket);
            if (index !== -1) {
              arrayData.splice(index, 1);

              localStorage.setItem("notif-key", JSON.stringify(arrayData));
            }
          }
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
