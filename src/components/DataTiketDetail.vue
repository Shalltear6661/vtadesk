<!-- eslint-disable prettier/prettier -->
<template>
  <!-- <div class="row justify-content-center">
    <div class="col-12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0">Rekap Tiket</h4>
      </div>
    </div>
  </div> -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Timeline Tiket</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container py-5">
            <div class="d-flex justify-content-center" v-if="loadingApi == true">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="main-timeline-4 text-white" v-else>
              <div class="timeline-4 left-4">
                <div class="card">
                  <!-- <img class="card-img-top" :src="op.file" alt="Card image cap"> -->
                  <div class="card-body">
                    <h5>Tiket Dibuat</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <h6>Kode Tiket: {{ op.kodetiket }}</h6>
                    </li>
                    <li class="list-group-item">
                      <h6>Produk : {{ op.nama_produk }}</h6>
                    </li>
                    <li class="list-group-item">
                      <h6>Tanggal Buat : {{ op.tgl_buat }}</h6>
                    </li>
                  </ul>
                  <div class="card-body">
                    <h6>Deskripsi</h6>
                    <p class="text-dark">{{ op.deskripsi }}</p>
                    <h6>Lampiran : </h6>
                    <div class="row py-3" v-show="op.nama_file !== null">
                      <div class="col-6"
                        v-if="ambilExtension(op.nama_file) == 'jpg' || ambilExtension(op.nama_file) == 'jpeg' || ambilExtension(op.nama_file) == 'png' || ambilExtension(op.nama_file) == 'webp'">
                        <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + op.nama_file">
                          <img :src="'https://api.vitech.asia/storage/customer/' + op.nama_file" alt="Gallery image 1"
                            class="w-100" /></a>
                      </div>
                      <div class="col-12" v-else-if="ambilExtension(op.nama_file) == 'pdf'">
                        <div class="col-12">
                          <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + op.nama_file"><img
                              src="/images/pdf.png" alt=""></a>
                        </div>
                      </div>
                      <div class="col-12"
                        v-else-if="ambilExtension(op.nama_file) == 'doc' || ambilExtension(op.nama_file) == 'docx'">
                        <div class="col-12">
                          <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + op.nama_file"><img
                              src="/images/doc.png" alt=""></a>
                        </div>
                      </div>

                      <div class="col-12"
                        v-else-if="ambilExtension(op.nama_file) == 'xlsx' || ambilExtension(op.nama_file) == 'xls'">
                        <div class="col-12">
                          <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + op.nama_file"><img
                              src="/images/xls.png" alt=""></a>
                        </div>
                      </div>

                      <div class="row py-3" v-else>
                        <div class="col-6">
                          <video width="320" height="240" controls>
                            <source :src="'https://api.vitech.asia/storage/customer/' + op.nama_file">
                          </video>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-show="op.nama_file === null">
                      <div class="col-6"> - </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="timeline-4 right-4">
                  <div class="card">
                    <div class="card-body">
                      <h5>Penugasan Tim</h5>
                    </div>
                    <div class="card-body" v-for="assign in pm" :key="assign">
                      <div class="row uk-margin-remove-top">
                        <h6>Team</h6>
                        <p class="my-0"><i class="ri-user-3-line"></i> {{ assign.nm_pegawai }}</p>
                      </div>
                      <h6 class="my-2">Catatan</h6>
                      <p v-html="assign.catatan"></p>
                      <h6>Lampiran : </h6>
                      <div class="row py-3" v-show="pmFile !== null">
                        <div v-for="gmbr in splitStringFromArray(pmFile)" :key="gmbr">
                          <div class="row py-3"
                            v-if="ambilExtension(gmbr) == 'jpg' || ambilExtension(gmbr) == 'jpeg' || ambilExtension(gmbr) == 'png'">
                            <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                              <img :src="'https://api.vitech.asia/storage/customer/' + gmbr" alt="Gallery image 1"
                                class="w-100" /></a>
                          </div>
                          <div class="col-12" v-else-if="ambilExtension(gmbr) == 'pdf'">
                            <div class="col-12">
                              <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr"><img
                                  src="/images/pdf.png" alt=""></a>
                            </div>
                          </div>

                          <div class="col-12"
                            v-else-if="ambilExtension(gmbr) == 'doc' || ambilExtension(gmbr) == 'docx'">
                            <div class="col-12">
                              <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr"><img
                                  src="/images/doc.png" alt=""></a>
                            </div>
                          </div>

                          <div class="col-12"
                            v-else-if="ambilExtension(gmbr) == 'xlsx' || ambilExtension(gmbr) == 'xls'">
                            <div class="col-12">
                              <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr"><img
                                  src="/images/xls.png" alt=""></a>
                            </div>
                          </div>

                          <div class="col-12"
                            v-else-if="ambilExtension(gmbr) == 'mp4' || ambilExtension(gmbr) == 'mov'">
                            <div class="col-6">
                              <video width="320" height="240" controls>
                                <source :src="'https://api.vitech.asia/storage/customer/' + gmbr">
                              </video>
                            </div>
                          </div>

                          <div class="col-6" v-else>
                            <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                              <img src="/images/files.png" alt="">
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-show="pmFile === null">
                        <div class="col-6"> - </div>
                      </div>
                      <h6>Tanggal Penugasan : </h6>
                      <p><i class="ri-calendar-check-line"></i> {{ assign.tgl_penugasan_awal }} - {{
                        assign.tgl_penugasan_akhir }}</p>
                      <h6>Jam Penugasan : </h6>
                      <p><i class="ri-time-line"></i> {{ assign.jam_awal }} - {{ assign.jam_akhir }}</p>
                      <hr class="uk-margin-remove">
                    </div>

                  </div>
                  <!-- <div class="card" v-else>
                    <div class="card-body">
                      <h5><span class="badge bg-primary">Belum Ada Penugasan Tim</span></h5>
                    </div>
                  </div> -->
                </div>
                <div v-for="teknis in tek" :key="teknis">
                  <div class="timeline-4 left-4" v-show="teknis.status_pm == 2 || teknis.status_pm == 3">
                    <div class="card">
                      <div class="card-title">
                        <span class="badge bg-primary p-2 mx-2 my-2" v-show="teknis.status_pm == 0">MENUNGGU PEMILIHAN
                          TIM
                          TEKNIS</span>
                        <span class="badge bg-primary p-2 mx-2 my-2" v-show="teknis.status_pm == 1">DITERUSKAN KE TIM
                          TEKNIS</span>
                        <span class="badge bg-info p-2 mx-2 my-2" v-show="teknis.status_pm == 2">TIM TEKNIS PROSES
                          MENGERJAKAN</span>
                        <span class="badge bg-success p-2 mx-2 my-2" v-show="teknis.status_pm == 3">TIM TEKNIS SELESAI
                          MENGERJAKAN</span>
                      </div>
                      <div class="card-body">
                        <h6 class="my-0"><i class="ri-user-3-line"></i> {{ teknis.nm_pegawai }}</h6>
                      </div>
                      <div class="card-body">
                        <h6>Status</h6>
                        <p v-if="teknis.proses_servis == 1">Proses Perbaikan</p>
                        <p v-else-if="teknis.proses_servis == 2">Selesai Perbaikan</p>
                        <p v-else>-</p>
                        <h6>Keterangan</h6>
                        <p>{{ teknis.solusi ?? '-' }}</p>
                        <h6>Lampiran : </h6>
                        <div v-show="teknis.nama_file !== null">
                          <div v-for="gmbr in splitStringFromArray(teknis.nama_file)" :key="gmbr">
                            <div class="row py-3">
                              <div class="col-6"
                                v-if="ambilExtension(gmbr) == 'jpg' || ambilExtension(gmbr) == 'jpeg' || ambilExtension(gmbr) == 'png' || ambilExtension(gmbr) == 'webp'">
                                <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                                  <img
                                    :src="(gmbr != null) ? 'https://api.vitech.asia/storage/customer/' + gmbr : 'images/noimage.png'"
                                    alt="Gallery image 1" class="w-100" />
                                </a>
                              </div>
                              <div class="col-6" v-else-if="ambilExtension(gmbr) == 'pdf'">
                                <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                                  <img src="/images/pdf.png" alt="">
                                </a>
                              </div>
                              <div class="col-6"
                                v-else-if="ambilExtension(gmbr) == 'doc' || ambilExtension(gmbr) == 'docx'">
                                <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                                  <img src="/images/doc.png" alt="">
                                </a>
                              </div>
                              <div class="col-6"
                                v-else-if="ambilExtension(gmbr) == 'xls' || ambilExtension(gmbr) == 'xlsx'">
                                <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                                  <img src="/images/xls.png" alt="">
                                </a>
                              </div>
                              <div class="col-6"
                                v-else-if="ambilExtension(gmbr) == 'mp4' || ambilExtension(gmbr) == 'mov'">
                                <video width="320" height="240" controls>
                                  <source :src="'https://api.vitech.asia/storage/customer/' + gmbr">
                                </video>
                              </div>
                              <div class="col-6" v-else>
                                <a target="_blank" :href="'https://api.vitech.asia/storage/customer/' + gmbr">
                                  <img src="/images/files.png" alt="">
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row" v-show="teknis.nama_file === null">
                          <div class="col-6"> - </div>
                        </div>

                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <p><i class="ri-calendar-check-line"></i> Tanggal Pengerjaan: {{ teknis.tgl_perbaikan_awal }}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="op.status == 'closed'">
                <div class="timeline-4 left-4">
                  <div class="card">
                    <div class="card-title">
                      <span class="badge bg-danger p-2 mx-2 my-2">
                        <h6 style="color: white">Tiket ditutup pada {{ op.tgl_tutup }}</h6>
                      </span>
                    </div>
                    <div class="card-body">
                      <h6>Pertanyaan</h6>
                      <p>{{ op.pertanyaan }}</p>
                      <h6>Jawaban</h6>
                      <p>{{ op.jawaban }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-xl-3 col-sm-12 col-md-4" @click="showAll('all')">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h4 class="fw-medium text-muted mb-0">Semua Tiket</h4>
              <h2 class="mt-4 ff-secondary">
                <span class="counter-value badge bg-primary" data-target="547">{{
                  total_tiket
                }}</span>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-soft-info text-info rounded-circle fs-4">
                  <i class="ri-ticket-2-line"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
      <!-- end card-->
    </div>
    <!--end col-->
    <div class="col-xl-3 col-sm-12 col-md-4" @click="showAll('progress')">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h4 class="fw-medium text-muted mb-0">Tiket proses</h4>
              <h2 class="mt-4 ff-secondary">
                <span class="counter-value badge bg-warning" data-target="124">{{
                  pending_tiket
                }}</span>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-soft-info text-info rounded-circle fs-4">
                  <i class="mdi mdi-timer-sand"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
    </div>
    <!--end col-->
    <div class="col-xl-3 col-sm-12 col-md-4" @click="showAll('closed')">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h4 class="fw-medium text-muted mb-0">Tiket selesai</h4>
              <h2 class="mt-4 ff-secondary">
                <span class="counter-value badge bg-success" data-target="107">{{
                  closed_tiket
                }}</span>
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-soft-info text-info rounded-circle fs-4">
                  <i class="ri-check-double-line"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- end card body -->
      </div>
    </div>
    <!--end col-->
  </div>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0">Semua Tiket</h4>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card" id="ticketsList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">Tiket</h5>
            <div class="flex-shrink-0">
              <button class="btn btn-success add-btn mx-2" @click="exportToExcelAll">
                <i class="ri-file-excel-line align-bottom me-1"></i> Print All
              </button>
              <button class="btn btn-danger add-btn" data-bs-toggle="modal" data-bs-target="#showModal"
                v-show="level_name != 'ADMINISTRATOR'">
                <i class="ri-add-line align-bottom me-1"></i> Buat Tiket
              </button>
              <!-- <button @click="storeFile">Test upload</button> -->
            </div>
          </div>
        </div>
        <!--end card-body-->
        <div class="card-body">
          <div class="table-responsive table-card mb-4">
            <table class="table table-bordered  align-middle table-nowrap mb-0" id="ticketTable">
              <thead>
                <tr>
                  <!-- <th>No</th> -->
                  <th class="sort" data-sort="id">Kode Tiket</th>
                  <th class="sort" data-sort="nama" v-show="level_name == 'ADMINISTRATOR'">Nama User</th>
                  <!-- <th class="sort" data-sort="produk">Produk</th> -->
                  <th class="sort" data-sort="produk">Modul</th>
                  <th class="sort" data-sort="tasks_name">Keluhan</th>
                  <th class="sort" data-sort="tasks_name">Lokasi</th>
                  <th class="sort" data-sort="create_date">
                    Tanggal Buat Tiket
                  </th>
                  <th class="sort" data-sort="closed_date">
                    Tanggal Tutup Tiket
                  </th>
                  <th class="sort" data-sort="durasi">Durasi</th>
                  <th class="sort" data-sort="status">Status</th>
                  <th class="sort" data-sort="action">Chat</th>
                  <!-- <th class="sort" data-sort="action" v-show="level_name == 'ADMINISTRATOR'">Aksi</th> -->
                </tr>
              </thead>
              <tbody class="list form-check-all" v-for="item in paginatedData" :key="item"
                v-show="paginatedData.length > 0">
                <tr>
                  <!-- <td>{{ index + 1 }}</td> -->
                  <td class="id"><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"
                      @click="showTimeline(item.value.aut1)">{{ item.value.kodetiket
                      }}</a>
                  </td>
                  <td class="nama" v-show="level_name == 'ADMINISTRATOR'">
                    {{ item.value.nm_kontak }}
                  </td>
                  <!-- <td class="produk">
                    {{ item.value.nama_kategori }}
                  </td> -->
                  <td class="produk">
                    {{ item.value.nama_produk }}
                  </td>
                  <td class="tasks_name" style="width:70%">
                    {{ item.value.deskripsi.replace(/<br\s*\?>/gi, '') }}
                  </td>
                  <td class="tasks_name">
                    {{ item.value.lokasi }}
                  </td>
                  <td class="create_date">{{ item.value.tgl_terima }}</td>
                  <td class="closed_date">{{ item.value.tgl_tutup ?? '-' }}</td>
                  <td class="durasi">{{ hitungDurasi(item.value.tgl_terima, item.value.tgl_tutup, item.value.stat_tiket)
                  }}
                  </td>
                  <td class="status" v-if="item.value.stat_tiket == 'new'">
                    <span class="badge bg-warning text-uppercase">New</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'assign'">
                    <span class="badge bg-secondary text-uppercase">Assign</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'progress'">
                    <span class="badge bg-secondary text-uppercase">Progress</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'hold'">
                    <span class="badge bg-secondary text-uppercase">Hold</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'resolved'">
                    <span class="badge bg-secondary text-uppercase">Resolved</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'reopen'">
                    <span class="badge bg-secondary text-uppercase">Re-Open</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'retest'">
                    <span class="badge bg-secondary text-uppercase">Re-Test</span>
                  </td>
                  <td class="status" v-else-if="item.value.stat_tiket == 'cancelled'">
                    <span class="badge bg-danger text-uppercase">Cancelled</span>
                  </td>
                  <td class="status" v-else>
                    <span class="badge bg-success text-uppercase">Selesai</span>
                  </td>
                  <td>
                    <!-- <button class="btn btn-primary position-relative waves-effect waves-light" @click.prevent="
                      showMessage(
                        item.value.aut1,
                        item.value.stat_tiket,
                        item.value.email
                      )
                      ">
                      <i class="ri-chat-1-fill"></i>
                    </button> -->
                    <button type="button" class="btn btn-primary position-relative" @click.prevent="
                      showMessage(
                        item.value.aut1,
                        item.value.stat_tiket,
                        item.value.email
                      )">
                      <i class="ri-chat-1-fill"></i>
                      <span
                        class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                        v-if="isPresent(item.value.kodetiket)">
                        <span class="visually-hidden">New alerts</span>
                      </span>
                      <span v-else>

                      </span>
                    </button>
                  </td>
                  <!-- <td>
                    <button class="btn btn-danger waves-effect waves-light" @click.prevent="hapus(item.value.aut1)">
                      <i class="ri-delete-bin-5-line"></i>
                    </button>
                  </td> -->
                </tr>
              </tbody>
              <tbody v-show="paginatedData.length == 0">
                <tr>
                  <td colspan="8"><span>Tidak ada data</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end mt-2">
            <div class="pagination-wrap hstack gap-2">
              <button class="page-item pagination-prev" @click="onClickPreviousPage" :disabled="isInFirstPage">
                Previous
              </button>
              <ul class="pagination listjs-pagination mb-0">
                {{ currentPage }}
              </ul>
              <button class="page-item pagination-next" @click="onClickNextPage" :disabled="isInLastPage">
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
  <div class="modal fade zoomIn" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header p-3 bg-soft-info">
          <h5 class="modal-title" id="exampleModalLabel" v-show="level_name != 'ADMINISTRATOR'">Buat Tiket</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
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
              <div class="col-lg-12">
                <div>
                  <label class="form-label">Perusahaan</label>
                  <input type="text" class="form-control" v-model="company" readonly />
                </div>
              </div>
              <div class="col-lg-12">
                <div>
                  <label class="form-label">Lokasi</label>
                  <input type="text" class="form-control" v-model="lokasi" />
                </div>
              </div>

              <!-- <div class="col-lg-12">
                <div>
                  <label class="form-label">Produk</label>
                  <input type="text" class="form-control" v-model="produk" readonly/>
                </div>
              </div> -->
              <div class="col-lg-12">
                <div>
                  <label class="form-label">Produk</label>
                  <select class="form-control" v-model="selectedProduk" @change="produkChange($event)">
                    <option value="" selected disabled>Pilih Produk</option>
                    <option v-for="prod in listOfProduk" :key="prod.autono" :value="prod.id_produk"
                      :data-proyek="prod.id_proyek">
                      {{ prod.deskripsi }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-lg-12">
                <div>
                  <label class="form-label">Modul</label>
                  <input type="text" class="form-control" v-model="modul" />
                </div>
              </div>

              <div class="col-lg-12" v-show="selectedProduk == 'lainnya'">
                <div>
                  <label for="" class="form-label"> Nama Produk </label>
                  <input type="text" class="form-control" v-model="lainnya" />
                </div>
              </div>

              <div class="col-lg-12">
                <div>
                  <label for="tasksTitle-field" class="form-label">Deskripsi Keluhan</label>
                  <textarea class="form-control" v-model="keluhan"> </textarea>
                </div>
              </div>

              <div class="col-md-12">
                <label class="form-label">Lampiran File</label>
                <input type="file" class="form-control" ref="lampiran" @change="handleFileChange" />
                <code>Ukuran Maksimal <strong>100 Mb</strong></code>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="hstack gap-2 justify-content-end">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-success" id="add-btn" :disabled="loading">
                Buat Tiket
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
import * as XLSX from "xlsx";
import firebase from "@/services/firebaseInit";
import eventBus from "@/event-bus";
export default {
  data() {
    return {
      company: "",
      lokasi: "",
      modul: "",
      produk: "",
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
      lainnya: null,
      level_name: localStorage.getItem("level_name"),
      entitas: localStorage.getItem("entitas"),
      lampiran: null,
      total_tiket: 0,
      pending_tiket: 0,
      closed_tiket: 0,
      loading: false,
      pt: null,
      status_val: "all",
      op: {
        kodetiket: "",
        nama_produk: "",
        tgl_buat: "",
        deskripsi: "",
        note: "",
        file: "",
        nama_file: "",
        tgl_tutup: "",
        jawaban: "",
        pertanyaan: "",
        status: "",
      },
      pm: [],
      tek: [],
      loadingApi: false,
      tiketSeen: [],
      notif: localStorage.getItem("notif-key"),
      pmFile: null,
    };
  },
  methods: {
    isPresent(string) {
      if (this.notif != null) {
        let parsed = JSON.parse(this.notif);
        return parsed.includes(string);
      }
    },
    exportToExcelAll() {
      const dataAll = [
        [
          "Kode Tiket",
          "Nama User",
          "Produk",
          "Modul",
          "Keluhan",
          "Lokasi",
          "Tanggal Buat Tiket",
          "Tanggal Tutup Tiket",
          "Durasi",
          "Status",
        ],
      ];

      axios
        .post("https://api.vitech.asia/api/tiketstatusall", {
          id: localStorage.getItem("id"),
          level_name: this.level_name,
          entitas: this.entitas,
          status: this.status_val,
        })
        .then((res) => {
          res.data.data.forEach((element) => {
            let newArrs = [
              element.kodetiket,
              element.nm_kontak,
              element.nama_kategori,
              element.nama_produk,
              element.deskripsi.replace(/<br\s*\/?>/gi, ""),
              element.lokasi,
              element.tgl_terima,
              element.tgl_tutup,
              this.hitungDurasi(
                element.tgl_terima,
                element.tgl_tutup,
                element.stat_tiket
              ),
              element.stat_tiket,
            ];
            dataAll.push(newArrs);
          });

          const wsall = XLSX.utils.aoa_to_sheet(dataAll);
          const wball = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wball, wsall, "Sheet1");

          // Save the Excel file
          XLSX.writeFile(wball, "report_all.xlsx");
        });
    },
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
          .post("https://api.vitech.asia/api/customerproduk", {
            entitas: localStorage.getItem("entitas"),
          })
          .then((res) => {
            res.data.forEach((element) => {
              this.company = element.nama_instansi;
              this.produk = element.nama_kategori;
              this.pt = element.id_entitas;
              this.id_proyek = element.id_proyek;
            });
            this.listOfProduk = res.data;
            // this.company = res.data.instansi.nama_instansi;
            // this.pt = res.data.instansi.id_entitas;
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
          .post(
            "https://api.vitech.asia/api/tiketstatus?page=" + this.currentPage,
            {
              id: localStorage.getItem("id"),
              level_name: this.level_name,
              entitas: this.entitas,
              status: this.status_val,
            }
          )
          .then((res) => {
            // console.log(res);
            // this.totalPages = res.data.data.total;
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
        console.log(this.id_proyek);
        console.log(this.selectedProduk);
      }
    },
    submitForm() {
      this.loading = true;
      try {
        axios
          .post(
            "https://api.vitech.asia/api/customerstore",
            {
              id: localStorage.getItem("id"),
              id_proyek: this.id_proyek ?? "15",
              id_produk: this.selectedProduk,
              modul: this.modul,
              keluhan: this.keluhan,
              foto: this.lampiran,
              email: localStorage.getItem("email"),
              company: this.company,
              nama: localStorage.getItem("nama"),
              entitas: this.pt,
              lokasi: this.lokasi,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            this.loading = false;
            this.$refs.fTiket.reset();
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch((err) => {
            this.loading = false;
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: err.response.data.data ?? "size harus kurang dari 1 mb",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
    hitungDurasi(awal, akhir, status) {
      // Menghitung selisih dalam milidetik
      if (status == "closed" || status == "cancelled" || status == "hold") {
        let selisihMillis = new Date(akhir) - new Date(awal);

        const detik = Math.floor(selisihMillis / 1000);
        const menit = Math.floor(detik / 60);
        const jam = Math.floor(menit / 60);
        const hari = Math.floor(jam / 24);

        // Menghitung sisa jam, menit, dan detik setelah dihitung hari
        const sisaJam = jam % 24;
        const sisaMenit = menit % 60;
        const sisaDetik = detik % 60;

        if (hari > 0) {
          return `${hari} hari ${sisaJam} jam ${sisaMenit} menit`;
        } else if (jam > 0) {
          return `${sisaJam} jam ${sisaMenit} menit`;
        } else if (menit > 0) {
          return `${sisaMenit} menit ${sisaDetik} detik`;
        } else {
          return `${sisaDetik} detik`;
        }
      } else if (status == "progress" && akhir != null) {
        // let sum = new Date(awal) - new Date(akhir);
        // console.log(sum);
        let selisihMillis = new Date() - new Date(akhir);

        const detik = Math.floor(selisihMillis / 1000);
        const menit = Math.floor(detik / 60);
        const jam = Math.floor(menit / 60);
        const hari = Math.floor(jam / 24);

        // Menghitung sisa jam, menit, dan detik setelah dihitung hari
        const sisaJam = jam % 24;
        const sisaMenit = menit % 60;
        const sisaDetik = detik % 60;

        if (hari > 0) {
          return `${hari} hari ${sisaJam} jam ${sisaMenit} menit`;
        } else if (jam > 0) {
          return `${sisaJam} jam ${sisaMenit} menit`;
        } else if (menit > 0) {
          return `${sisaMenit} menit ${sisaDetik} detik`;
        } else {
          return `${sisaDetik} detik`;
        }
      } else {
        let selisihMillis = new Date() - new Date(awal);

        const detik = Math.floor(selisihMillis / 1000);
        const menit = Math.floor(detik / 60);
        const jam = Math.floor(menit / 60);
        const hari = Math.floor(jam / 24);

        // Menghitung sisa jam, menit, dan detik setelah dihitung hari
        const sisaJam = jam % 24;
        const sisaMenit = menit % 60;
        const sisaDetik = detik % 60;
        if (hari > 0) {
          return `${hari} hari ${sisaJam} jam ${sisaMenit} menit`;
        } else if (jam > 0) {
          return `${sisaJam} jam ${sisaMenit} menit`;
        } else if (menit > 0) {
          return `${sisaMenit} menit ${sisaDetik} detik`;
        } else {
          return `${sisaDetik} detik`;
        }
      }
    },
    onClickPage(page) {
      this.currentPage = page;
    },
    onClickNextPage() {
      console.log(this.currentPage, this.last_page);
      if (this.currentPage !== this.last_page) {
        this.currentPage += 1;
        try {
          axios
            .post(
              "https://api.vitech.asia/api/tiketstatus?page=" +
              this.currentPage,
              {
                id: localStorage.getItem("id"),
                level_name: this.level_name,
                entitas: this.entitas,
                status: this.status_val,
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
      this.datas = [];
      if (this.currentPage !== 1) {
        this.currentPage -= 1;
        try {
          axios
            .post(
              "https://api.vitech.asia/api/tiketstatus?page=" +
              this.currentPage,
              {
                id: localStorage.getItem("id"),
                level_name: this.level_name,
                entitas: this.entitas,
                status: this.status_val,
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
    isPageActive(page) {
      return this.currentPage === page;
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    showMessage(kdtiket, stt, email) {
      window.location.href =
        "/message?q=" +
        window.btoa(kdtiket) +
        "&status=" +
        window.btoa(stt) +
        "&email=" +
        window.btoa(email);
    },
    handleFileChange(event) {
      // Access the selected file from the event
      this.lampiran = event.target.files[0];
    },
    showAll(val) {
      this.status_val = val;
      this.currentPage = 1;
      this.datas = [];
      try {
        axios
          .post(
            "https://api.vitech.asia/api/tiketstatus?page=" + this.currentPage,
            {
              id: localStorage.getItem("id"),
              level_name: this.level_name,
              entitas: this.entitas,
              status: val,
            }
          )
          .then((res) => {
            this.last_page = res.data.data.last_page;
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
    },
    showTimeline(autono) {
      this.loadingApi = true;
      this.pm = [];
      this.tek = [];
      this.pmFile = "";
      try {
        axios
          .post("https://api.vitech.asia/api/showtimeline", {
            autono: autono,
          })
          .then((res) => {
            //console.log(res);
            //op
            this.op.nama_produk = res.data.op.nama_produk;
            this.op.tgl_buat = res.data.op.created_on;
            this.op.tgl_tutup = res.data.op.tgl_tutup;
            this.op.deskripsi = res.data.op.deskripsi.replace(
              /<br\s*\/?>/gi,
              "\n"
            );
            this.op.file = res.data.op.file;
            this.op.nama_file = res.data.op.nama_file;
            this.op.kodetiket = res.data.op.kodetiket;
            this.op.pertanyaan = res.data.op.pertanyaan;
            this.op.jawaban = res.data.op.jawaban;
            this.op.status = res.data.op.status;
            //pm
            // this.pm.tgl_penugasan_awal = res.data.pm.data.tgl_penugasan_awal;
            // this.pm.tgl_penugasan_akhir = res.data.pm.data.tgl_penugasan_akhir;
            // this.pm.catatan = res.data.pm.data.catatan;
            // let splited = res.data.pm.data.nm_pegawai.split(",", 2);
            // this.pm.nama = splited;
            res.data.pm.data.forEach((el) => {
              this.pm.push(el);
            });

            res.data.pm.file.forEach((el) => {
              this.pmFile = el.nama_file;
            });
            //tek
            res.data.tek.data.forEach((el) => {
              this.tek.push(el);
            });
            this.loadingApi = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    splitStringFromArray(string) {
      if (string !== null) {
        const resultArr = string.split(",");
        // const newArray = resultArr.map((element) => {
        //   // Menggunakan replace untuk menghapus underscore dari setiap elemen
        //   return element.replace(/_/g, " ");
        // });
        return resultArr;
      }
    },
    splitString(string) {
      if (string !== null) {
        return string.replace(/_/g, " ");
      }
    },
    ambilExtension(string) {
      if (string !== null) {
        const resArr = string.split(".");
        const extension = resArr[resArr.length - 1];
        return extension;
      }
    },
    getStatus() {
      try {
        axios
          .post("https://api.vitech.asia/api/getStatus", {
            id_kontak: localStorage.getItem("id"),
          })
          .then((res) => {
            res.data.data.forEach((el) => {
              this.tiketSeen.push(el.kodetiket);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    storeFile() { },
  },
  created() {
    this.getProduk();
    this.getTiket();
    this.getStatus();
    try {
      axios
        .post("https://api.vitech.asia/api/tiketcount", {
          id: localStorage.getItem("id"),
          level_name: this.level_name,
          entitas: localStorage.getItem("entitas"),
        })
        .then((res) => {
          this.total_tiket = res.data.data.total;
          this.pending_tiket = res.data.data.progres;
          this.closed_tiket = res.data.data.close;
        });
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    window.addEventListener("notif-change", (event) => {
      this.notif = event.detail.storage;
    });
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

#ticketTable th {
  text-align: center;
}

#ticketTable td {
  text-align: center;
}

/* The actual timeline (the vertical ruler) */
.main-timeline-4 {
  position: relative;
}

/* The actual timeline (the vertical ruler) */
.main-timeline-4::after {
  content: "";
  position: absolute;
  width: 3px;
  background-color: #bbb;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.timeline-4 {
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.timeline-4::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -11px;
  background-color: #bbb;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left-4 {
  padding: 0px 40px 20px 0px;
  left: 0;
  color: #000;
}

/* Place the container to the right */
.right-4 {
  padding: 0px 0px 20px 40px;
  left: 50%;
  color: #000;
}

/* Add arrows to the left container (pointing right) */
.left-4::before {
  content: " ";
  position: absolute;
  top: 18px;
  z-index: 1;
  right: 30px;
  border: medium solid rgba(37, 117, 252, 1);
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent rgba(37, 117, 252, 1);
}

/* Add arrows to the right container (pointing left) */
.right-4::before {
  content: " ";
  position: absolute;
  top: 18px;
  z-index: 1;
  left: 30px;
  border: medium solid rgba(245, 87, 108, 1);
  border-width: 10px 10px 10px 0;
  border-color: transparent rgba(245, 87, 108, 1) transparent transparent;
}

/* Fix the circle for containers on the right side */
.right-4::after {
  left: -14px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {

  /* Place the timelime to the left */
  .main-timeline-4::after {
    left: 31px;
  }

  /* Full-width containers */
  .timeline-4 {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .timeline-4::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left-4::after,
  .right-4::after {
    left: 18px;
  }

  .left-4::before {
    right: auto;
  }

  /* Make all right containers behave like the left ones */
  .right-4 {
    left: 0%;
  }

  .iconClass {
    position: relative;
  }

  .iconClass span {
    position: absolute;
    top: 0px;
    right: 0px;
    display: block;
  }
}
</style>
