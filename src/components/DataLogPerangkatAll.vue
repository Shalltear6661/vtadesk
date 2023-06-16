<template>
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
      >
        <h4 class="mb-sm-0">Semua Data Perangkat</h4>

        <!-- <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Tickets</a>
              </li>
              <li class="breadcrumb-item active">Tickets List</li>
            </ol>
          </div> -->
      </div>
    </div>
  </div>
  <div class="col">
    <div class="col-4 mb-2">
      <select class="form-select" v-model="selectedSN" @change="onChangeSN">
        <option disabled>Pilih Nomor SN</option>
        <option v-for="list in listSn" :key="list" :value="list.bios_sn">
          {{ list.bios_sn }} - Storage : {{ list.storage_percentage }} %
        </option>
      </select>
    </div>
    <div class="col-12 table-responsive table-bordered my-5">
      <table class="table">
        <tbody v-for="v in listLog" :key="v">
          <tr>
            <td>Nama Komputer</td>
            <td>{{ v.hostname }}</td>
          </tr>
          <tr>
            <td>Sistem Operasi</td>
            <td>{{ v.platform }} {{ v.system_type }} {{ v.rilis }}</td>
          </tr>
          <tr>
            <td>Sistem Model</td>
            <td>{{ v.model }}</td>
          </tr>
          <tr>
            <td>Prosesor</td>
            <td>{{ v.processor }}</td>
          </tr>
          <tr>
            <td>Nomor Serial Bios</td>
            <td>{{ v.bios_sn }}</td>
          </tr>
          <tr>
            <td>Nomor Serial OS</td>
            <td>{{ v.os_sn }}</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>{{ this.formatBytes(v.ram) }}</td>
          </tr>
          <tr>
            <td>Penyimpanan</td>
            <td>{{ this.formatBytes(v.storage) }}</td>
          </tr>
          <tr>
            <td>Model Penyimpanan</td>
            <td>{{ v.storage_model }}</td>
          </tr>
          <tr>
            <td>RAM Digunakan</td>
            <td v-if="v.ram_percentage > 80">
              <span class="badge bg-danger">{{ v.ram_percentage }} %</span>
            </td>
            <td v-else-if="v.ram_percentage > 50">
              <span class="badge bg-warning">{{ v.ram_percentage }} %</span>
            </td>
            <td v-else>
              <span class="badge bg-success">{{ v.ram_percentage }} %</span>
            </td>
          </tr>
          <tr>
            <td>CPU Digunakan</td>
            <td v-if="v.cpu_percentage > 80">
              <span class="badge bg-danger">{{ v.cpu_percentage }} %</span>
            </td>
            <td v-else-if="v.cpu_percentage > 50">
              <span class="badge bg-warning">{{ v.cpu_percentage }} %</span>
            </td>
            <td v-else>
              <span class="badge bg-success">{{ v.cpu_percentage }} %</span>
            </td>
          </tr>
          <tr>
            <td>Penyimpanan Digunakan</td>
            <td v-if="v.storage_percentage > 80">
              <span class="badge bg-danger">{{ v.storage_percentage }} %</span>
            </td>
            <td v-else-if="v.storage_percentage > 50">
              <span class="badge bg-warning">{{ v.storage_percentage }} %</span>
            </td>
            <td v-else>
              <span class="badge bg-success">{{ v.storage_percentage }} %</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <div class="table-responsive table-bordered">
    <table class="table">
      <tbody v-for="v in listLog" :key="v">
        <tr>
          <td>Nama Komputer</td>
          <td>{{ v.hostname }}</td>
        </tr>
        <tr>
          <td>Sistem Operasi</td>
          <td>{{ v.platform }} {{ v.system_type }} {{ v.rilis }}</td>
        </tr>
        <tr>
          <td>Sistem Model</td>
          <td>{{ v.model }}</td>
        </tr>
        <tr>
          <td>Prosesor</td>
          <td>{{ v.processor }}</td>
        </tr>
        <tr>
          <td>Nomor Serial Bios</td>
          <td>{{ v.bios_sn }}</td>
        </tr>
        <tr>
          <td>Nomor Serial OS</td>
          <td>{{ v.os_sn }}</td>
        </tr>
        <tr>
          <td>RAM</td>
          <td>{{ this.formatBytes(v.ram) }}</td>
        </tr>
        <tr>
          <td>Penyimpanan</td>
          <td>{{ this.formatBytes(v.storage) }}</td>
        </tr>
        <tr>
          <td>Model Penyimpanan</td>
          <td>{{ v.storage_model }}</td>
        </tr>
        <tr>
          <td>Persentase RAM</td>
          <td v-if="v.ram_percentage > 80">
            <span class="badge bg-danger">{{ v.ram_percentage }} %</span>
          </td>
          <td v-else-if="v.ram_percentage > 50">
            <span class="badge bg-warning">{{ v.ram_percentage }} %</span>
          </td>
          <td v-else>
            <span class="badge bg-success">{{ v.ram_percentage }} %</span>
          </td>
        </tr>
        <tr>
          <td>Persentase CPU</td>
          <td v-if="v.cpu_percentage > 80">
            <span class="badge bg-danger">{{ v.cpu_percentage }} %</span>
          </td>
          <td v-else-if="v.cpu_percentage > 50">
            <span class="badge bg-warning">{{ v.cpu_percentage }} %</span>
          </td>
          <td v-else>
            <span class="badge bg-success">{{ v.cpu_percentage }} %</span>
          </td>
        </tr>
        <tr>
          <td>Persentase Storage</td>
          <td v-if="v.storage_percentage > 80">
            <span class="badge bg-danger">{{ v.storage_percentage }} %</span>
          </td>
          <td v-else-if="v.storage_percentage > 50">
            <span class="badge bg-warning">{{ v.storage_percentage }} %</span>
          </td>
          <td v-else>
            <span class="badge bg-success">{{ v.storage_percentage }} %</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      listLog: [],
      units: ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      listSn: [],
      selectedSN: null,
    };
  },
  methods: {
    onChangeSN() {
      console.log(this.selectedSN);
      this.getLog();
    },
    getLog() {
      console.log(this.selectedSN);
      this.listLog = [];
      try {
        axios
          .post(this.UrlApi + "devicelog", {
            sn: this.selectedSN,
          })
          .then((res) => {
            if (res.data.success && res.data.success !== null) {
              this.listLog.push(res.data.data[0]);
            } else {
              console.log("gagal fetch data");
            }
          })
          .catch((err) => {
            if (err.response) {
              console.log("error response");
            } else if (err.request) {
              console.log("error request");
            } else {
              console.log(err);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    getAllSN() {
      try {
        axios
          .get(this.UrlApi + "listsn")
          .then((res) => {
            if (res.data.success && res.data.success !== null) {
              console.log(res.data.data);
              this.listSn = res.data.data;
              this.selectedSN = res.data.data[0].bios_sn;
              this.getLog();
            } else {
              console.log("gagal fetch data");
            }
          })
          .catch((err) => {
            if (err.response) {
              console.log("error response");
            } else if (err.request) {
              console.log("error request");
            } else {
              console.log(err);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    formatBytes(x) {
      let l = 0,
        n = parseInt(x, 10) || 0;

      while (n >= 1024 && ++l) {
        n = n / 1024;
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + this.units[l];
    },
  },
  created() {
    this.getAllSN();
  },
};
</script>

<style scoped></style>
