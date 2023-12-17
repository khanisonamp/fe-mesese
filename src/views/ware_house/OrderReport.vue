<template>
  <div>
    <navber />
    <v-container>
      <div class="mt-5">
        <div
          :style="{
            display: 'flex',
            justifyContent: 'flex-start',
            color: '#603b52',
          }"
        >
          <h1>Order Report</h1>
        </div>
        <div
          :style="{
            display: 'flex',
            justifyContent: 'center',
          }"
        >
          <v-card
            :style="{
              boxShadow: 'none',
              width: '650px',
              padding: '30px',
            }"
          >
            <v-row :style="{}">
              <v-text-field
                prepend-icon="mdi-calendar"
                v-model="start_date"
                class="v-input"
                dense
                @click="dialogOpenStart = true"
                label="Date Start"
                outlined
                rounded
                :style="{ width: '160px', margin: '3px' }"
              ></v-text-field>

              <v-dialog width="auto" v-model="dialogOpenStart">
                <v-card :style="{ padding: '10px', borderRadius: '20px' }">
                  <v-date-picker v-model="start_date"></v-date-picker>
                </v-card>
              </v-dialog>

              <v-text-field
                v-model="start_time"
                class="v-input"
                dense
                @click="dialogOpenStartTime = true"
                label="Time"
                outlined
                rounded
                :style="{ width: '60px', margin: '3px' }"
              ></v-text-field>

              <v-dialog width="auto" v-model="dialogOpenStartTime">
                <v-card :style="{ padding: '10px', borderRadius: '20px' }">
                  <v-time-picker
                    format="24hr"
                    v-model="start_time"
                  ></v-time-picker>
                </v-card>
              </v-dialog>

              <div
                :style="{
                  padding: '5px',
                  borderRadius: '20px',
                  marginTop: '4px',
                }"
              >
                <h4>To</h4>
              </div>

              <v-text-field
                v-model="end_date"
                class="v-input"
                dense
                @click="dialogOpenEnd = true"
                label="Date End"
                outlined
                rounded
                :style="{ width: '120px', margin: '3px' }"
              ></v-text-field>

              <v-dialog width="auto" v-model="dialogOpenEnd">
                <v-card :style="{ padding: '10px', borderRadius: '20px' }">
                  <v-date-picker v-model="end_date"></v-date-picker>
                </v-card>
              </v-dialog>

              <v-text-field
                v-model="end_time"
                class="v-input"
                dense
                @click="dialogOpenEndTime = true"
                label="Time"
                outlined
                rounded
                :style="{ width: '60px', margin: '3px' }"
              ></v-text-field>

              <v-dialog width="auto" v-model="dialogOpenEndTime">
                <v-card :style="{ padding: '10px', borderRadius: '20px' }">
                  <v-time-picker
                    format="24hr"
                    v-model="end_time"
                  ></v-time-picker>
                </v-card>
              </v-dialog>
            </v-row>

            <div
              :style="{
                display: 'flex',
                justifyContent: 'center',
              }"
            >
              <v-btn
                :disabled="!valid"
                color="#693c58"
                class="white--text ma-1"
                :loading="loading"
                rounded
                @click="getFilter()"
              >
                Search
              </v-btn>

              <v-btn
                rounded
                color="#8a2121"
                class="white--text ma-1"
                @click="reset"
              >
                Clear
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </v-container>
    <v-container>
      <v-card class="mx-auto mt-4" elevation="8">
        <div class="table-stlye th-first th-last">
          <!--<div class="table-stlye th-first th-last">
          <v-data-table
            :headers="headers"
            :items="rows"
            hide-default-footer
            class="pa-5"
            @page-count="pageCount = $event"
            :page.sync="page"
            :items-per-page="itemsPerPage"
          >
            <template v-slot:[`item.created_at`]="{ item }">
              {{ item.created_at || "-" }}
            </template>
          </v-data-table>
        </div>
        <v-pagination
          circle
          @input="changePage"
          v-model="page"
          :length="pageCount || 0"
        ></v-pagination>-->

          <v-data-table
            :headers="headers"
            :items="rows"
            :items-per-page="itemsPerPage"
            class="pa-5"
          >
            <template v-slot:[`item.created_at`]="{ item }">
              {{ item.created_at || "-" }}
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import navber from "../../lavouts/navber.vue";

export default {
  components: {
    navber,
  },

  data() {
    return {
      itemsPerPage: 10,
      headers: [
        {
          text: "ลำดับ",
          align: "center",
          sortable: false,
          value: "no",
          class: "black--text",
        },
        {
          text: "สินค้า",
          align: "center",
          sortable: false,
          value: "product_name",
          class: "black--text",
        },
        {
          text: "จำนวนสินค้า",
          align: "center",
          sortable: false,
          value: "quantity",
          class: "black--text",
        },
        {
          text: "ชื่อ-สกุล",
          align: "center",
          sortable: false,
          value: "des_name",
          class: "black--text",
        },
        {
          text: "เลขอ้างอิง",
          align: "center",
          sortable: false,
          value: "reference_no",
          class: "black--text",
        },
        {
          text: "รหัสติดตามสินค้า",
          align: "center",
          sortable: false,
          value: "tracking_code",
          class: "black--text",
        },
      ],

      rows: [],

      valid: true,
      name: "",
      //nameRules: [
      //  (v) => (v && v.length <= 30) || "รหัสติดตามสินค้าไม่เกิน 30 ตัวอักษร",
      //],

      loading: false,

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,

      index: 0,
      search: "",

      start_date: "",
      start_time: "",
      startDateTime: "",

      end_date: "",
      end_time: "",
      endDateTime: "",

      page: 0,
      totalItem: 0,
      fname: "amp",
      lname: "na",

      dialogOpenStart: false,
      dialogOpenStartTime: false,
      dialogOpenEnd: false,
      dialogOpenEndTime: false,
    };
  },

  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), 2000);
    },

    start_date(newValue, oldValue) {
      if (newValue != oldValue) {
        // Watch for changes in start_date
        console.log("Start date changed to:", newValue);
        this.dialogOpenStart = false; // Close the dialog when start_date changes
      }
    },
    end_date(newValue, oldValue) {
      if (newValue != oldValue) {
        this.dialogOpenEnd = false;
      }
    },
  },

  computed: {
    pageCount: {
      get() {
        const l = this.totalItem;
        const s = 10;
        return Math.ceil(l / s);
      },
      set(numPage) {
        return numPage; // จำนวนหน้า
      },
    },
    name_p: {
      get() {
        return this.fname + " " + this.lname;
      },
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      this.rows = [];
      const data = {
        start_date: this.startDateTime,
        end_date: this.endDateTime,
      };
      await axios
        .post(
          `https://backend-medese-52b06b07483e.herokuapp.com/ware-house/api/v1/order`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.rows = resp.data.data;
          //this.totalItem = resp.data.pagination.total_count;

          for (let i of this.rows) {
            console.log(i);
            this.index += 1;
            i.index = this.index;
          }

          if (resp.status == 401) {
            swal.fire({
              icon: "error",
              title: "invalid",
              text: "username and password !!!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "invalid",
            text: "",
            showConfirmButton: false,
            timer: 1500,
          });
          //this.$router.push("/");
        });
    },

    reset() {
      this.$refs.form.reset();
    },

    async getFilter() {
      this.loading = true;
      this.rows = [];
      this.index = 0;
      this.startDateTime = this.start_date + " " + this.start_time;
      this.endDateTime = this.end_date + " " + this.end_time;

      console.log(this.startDateTime);
      console.log(this.endDateTime);

      const data = {
        start_date: this.startDateTime,
        end_date: this.endDateTime,
      };
      await axios
        .post(
          `https://backend-medese-52b06b07483e.herokuapp.com/ware-house/api/v1/order`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.loading = false;
          this.rows = resp.data.data;
          //this.totalItem = resp.data.pagination.total_count;

          for (let i of this.rows) {
            console.log(i);
            this.index += 1;
            i.index = this.index;
          }

          if (resp.status == 401) {
            swal.fire({
              icon: "error",
              title: "invalid",
              text: "username and password !!!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "invalid",
            text: "username and password !!!",
            showConfirmButton: false,
            timer: 1500,
          });
          //this.$router.push("/");
        });
    },

    async changePage() {
      console.log(this.page);
      await axios
        .get(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/api/v1/order-in?limit=${this.itemsPerPage}&page=${this.page}&start_date=${this.startDateTime}&end_date=${this.endDateTime}&search=${this.search}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.rows = resp.data.data;
          this.totalItem = resp.data.pagination.total_count;

          this.index = this.page * this.itemsPerPage - this.itemsPerPage + 1;
          for (let i = 0; i < this.rows.length; i++) {
            this.rows[i].index = this.index + i;
          }

          if (resp.status == 401) {
            swal.fire({
              icon: "error",
              title: "invalid",
              text: "username and password !!!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "invalid",
            text: "",
            showConfirmButton: false,
            timer: 1500,
          });
          //this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
.btn-round {
  border-radius: 15px;
}
.table-stlye >>> .v-data-table th {
  padding: 0 0px !important;
  background-color: #d59cbf !important;
  color: #513b49 !important;
}
.th-stlye >>> th {
  border: 1px solid #8fb2ad;
  text-align: center !important;
  border-collapse: collapse !important;
  height: 40px !important;
}
</style>
