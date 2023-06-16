<template>
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
      >
        <h4 class="mb-sm-0">Semua Tiket</h4>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card" id="ticketsList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">Tiket</h5>
            <div class="flex-shrink-0" v-show="level_name != 'ADMINISTRATOR'">
              <button
                class="btn btn-danger add-btn"
                data-bs-toggle="modal"
                data-bs-target="#showModal"
              >
                <i class="ri-add-line align-bottom me-1"></i> Buat Tiket
              </button>
            </div>
          </div>
        </div>
        <!--end card-body-->
        <div class="card-body">
          <div class="table-responsive table-card mb-4">
            <table
              class="table align-middle table-nowrap mb-0"
              id="ticketTable"
            >
              <thead>
                <tr>
                  <th class="sort" data-sort="id">Kode Tiket</th>
                  <th class="sort" data-sort="tasks_name">Keluhan</th>
                  <th class="sort" data-sort="create_date">
                    Tanggal Buat Tiket
                  </th>
                  <th class="sort" data-sort="status">Status</th>
                  <!-- <th class="sort" data-sort="priority">Prioritas</th> -->
                  <th class="sort" data-sort="action">Chat</th>
                  <th
                    class="sort"
                    data-sort="action"
                    v-show="level_name != 'ADMINISTRATOR'"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody
                class="list form-check-all"
                v-for="item in paginatedData"
                :key="item"
              >
                <tr>
                  <td class="id">
                    {{ item.value.kodetiket }}
                  </td>
                  <td class="tasks_name">
                    {{ item.value.deskripsi }}
                  </td>
                  <td class="create_date">{{ item.value.tgl_terima }}</td>
                  <td class="status" v-if="item.value.stat_tiket == 'open'">
                    <span class="badge bg-warning text-uppercase"
                      >Dalam Proses</span
                    >
                  </td>
                  <td class="status" v-else>
                    <span class="badge bg-success text-uppercase">Selesai</span>
                  </td>
                  <!-- <td class="priority">
                    <span
                      class="badge bg-danger text-uppercase"
                      v-show="item.value.prioritas == 'tinggi'"
                      >Tinggi</span
                    >
                    <span
                      class="badge bg-warning text-uppercase"
                      v-show="item.value.prioritas == 'sedang'"
                      >Sedang</span
                    >
                    <span
                      class="badge bg-success text-uppercase"
                      v-show="item.value.prioritas == 'rendah'"
                      >Rendah</span
                    >
                  </td> -->
                  <td>
                    <button
                      class="btn btn-primary waves-effect waves-light"
                      @click.prevent="
                        showMessage(
                          item.value.aut1,
                          item.value.stat_tiket,
                          item.value.email
                        )
                      "
                    >
                      <i class="ri-chat-1-fill"></i>
                    </button>
                  </td>
                  <td v-show="level_name != 'ADMINISTRATOR'">
                    <button
                      class="btn btn-danger waves-effect waves-light"
                      @click.prevent="hapus(item.value.aut1)"
                    >
                      <i class="ri-delete-bin-5-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end mt-2">
            <div class="pagination-wrap hstack gap-2">
              <button
                class="page-item pagination-prev"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage"
              >
                Previous
              </button>
              <ul
                class="pagination listjs-pagination mb-0"
                v-for="page in pages"
                :key="page.name"
              >
                <button
                  @click="onClickPage(page.name)"
                  :class="{ active: isPageActive(page.name) }"
                  :disabled="page.isDisabled"
                >
                  {{ page.name }}
                </button>
              </ul>
              <button
                class="page-item pagination-next"
                @click="onClickNextPage"
                :disabled="isInLastPage"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <!--end card-body-->
      </div>
      <!--end card-->
    </div>
    <!--end col-->
  </div>
  <div
    class="modal fade zoomIn"
    id="showModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header p-3 bg-soft-info">
          <h5 class="modal-title" id="exampleModalLabel">Buat Tiket</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close-modal"
          ></button>
        </div>
        <form @submit.prevent="submitForm" ref="fTiket">
          <div class="modal-body">
            <div class="row g-3">
              <!-- <div class="col-lg-12">
                <div>
                  <label for="tasksTitle-field" class="form-label"
                    >Kategori</label
                  >
                  <select class="form-control" v-model="selectedKategori">
                    <option value="" selected disabled>Pilih Kategori</option>
                    <option value="1">Pertanyaan Umum</option>
                    <option value="2">Berhubungan dengan Proyek</option>
                  </select>
                </div>
              </div> -->
              <!-- <div class="col-lg-12">
                <div>
                  <label class="form-label">Nomor Tiket</label>
                  <input type="text" class="form-control" readonly />
                </div>
              </div> -->
              <div class="col-lg-12">
                <div>
                  <label class="form-label">Produk</label>
                  <select
                    class="form-control"
                    v-model="selectedProduk"
                    @change="produkChange($event)"
                  >
                    <option value="" selected disabled>Pilih Produk</option>
                    <option
                      v-for="prod in listOfProduk"
                      :key="prod.autono"
                      :value="prod.id_produk"
                      :data-proyek="prod.autprj"
                    >
                      {{ prod.nama_produk }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-lg-12">
                <div>
                  <label for="tasksTitle-field" class="form-label"
                    >Deskripsi</label
                  >
                  <textarea class="form-control" v-model="keluhan"> </textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="hstack gap-2 justify-content-end">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-success" id="add-btn">
                Tambah Tiket
              </button>
              <!-- <button type="button" class="btn btn-success" id="edit-btn">
                Update
              </button> -->
            </div>
          </div>
        </form>
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
      listOfProduk: [],
      selectedKategori: {},
      selectedProduk: {},
      id_proyek: "",
      keluhan: "",
      selectedPrioritas: "",
      maxVisibleButtons: 3,
      totalPages: "",
      perPage: 5,
      currentPage: 1,
      datas: [],
      last_page: "",
      level_name: localStorage.getItem("level_name"),
    };
  },
  methods: {
    hapus(autono) {
      try {
        axios
          .post("https://api.vitech.asia/api/hapustiket", {
            id: autono,
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getProduk() {
      try {
        axios
          .get("https://api.vitech.asia/api/customerproduk")
          .then((res) => {
            this.listOfProduk = res.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getTiket() {
      try {
        axios
          .post("https://api.vitech.asia/api/tiket?page=", {
            id: localStorage.getItem("id"),
            level_name: this.level_name,
          })
          .then((res) => {
            this.totalPages = res.data.data.total;
            this.last_page = res.data.data.last_page;
            this.datas = res.data.data.data.map((item) => {
              return { index: item, value: item };
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    produkChange(event) {
      var options = event.target.options;
      if (options.selectedIndex > -1) {
        var name = options[options.selectedIndex].getAttribute("data-proyek");
        this.id_proyek = name;
      }
    },
    submitForm() {
      try {
        axios
          .post("https://api.vitech.asia/api/customerstore", {
            id: localStorage.getItem("id"),
            id_proyek: this.id_proyek,
            id_produk: this.selectedProduk,
            keluhan: this.keluhan,
            prioritas: this.selectedPrioritas,
          })
          .then((res) => {
            console.log(res);
            this.$refs.fTiket.reset();
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    },
    onClickPage(page) {
      this.currentPage = page;
    },
    onClickNextPage() {
      if (this.currentPage !== Math.ceil(10 / this.perPage)) {
        this.currentPage += 1;
        try {
          axios
            .post(
              "https://api.vitech.asia/api/tiket?page=" + this.currentPage,
              {
                id: localStorage.getItem("id"),
                level_name: this.level_name,
              }
            )
            .then((res) => {
              // Array.prototype.push.apply(this.datas, res.data.data.data);
              var map = res.data.data.data.map((item) => {
                return { index: item, value: item };
              });
              Array.prototype.push.apply(this.datas, map);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    onClickPreviousPage() {
      if (this.currentPage !== 1) {
        this.currentPage -= 1;
      }
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
    },
    showMessage(kdtiket, stt, email) {
      // console.log(kdtiket, stt);
      window.location.href =
        "/message?q=" +
        window.btoa(kdtiket) +
        "&status=" +
        window.btoa(stt) +
        "&email=" +
        window.btoa(email);
    },
  },
  created() {
    this.getProduk();
    this.getTiket();
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.last_page;
    },
    paginatedData() {
      return this.datas.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
};
</script>
<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
