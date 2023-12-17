<template>
  <div>
    <navberFul />
    <v-container>
      <v-card class="mx-auto" elevation="8">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <div class="text-center">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date_txt"
                        label="วันที่ต้องการค้นหา"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        filled
                        outlined
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date_txt"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <!--<v-text-field
                    prepend-icon="mdi-text"
                    v-model="search"
                    :counter="30"
                    label="referance no"
                    filled
                    outlined
                    dense
                  ></v-text-field>-->
                  <v-select
                    label="Status"
                    v-model="status"
                    :items="['Pending', 'Success', 'Voided', 'Waiting']"
                    filled
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>

              <v-btn
                :disabled="!valid"
                color="#693c58"
                class="mr-4 mt-3 white--text"
                :loading="loading"
                @click="getFilter()"
              >
                Search
              </v-btn>

              <v-btn
                color="#8a2121"
                class="mr-4 mt-3 white--text"
                @click="reset"
              >
                Clear
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card>
      <v-card class="mx-auto mt-4" elevation="8">
        <div class="table-stlye th-first th-last">
          <v-data-table
            :headers="headers"
            :items="rows"
            hide-default-footer
            class="pa-5"
            @page-count="pageCount = $event"
            :page.sync="page"
            :items-per-page="itemsPerPage"
          >
            <template v-slot:[`item.agent_name`]="{ item }">
              {{ item.agent_name || "-" }}
            </template>
            <template v-slot:[`item.saleschannel`]="{ item }">
              {{ item.saleschannel || "-" }}
            </template>
          </v-data-table>
        </div>
        <v-pagination
          circle
          @input="changePage"
          v-model="page"
          :length="pageCount || 0"
        ></v-pagination>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import navberFul from "../../lavouts/navberFul.vue";

export default {
  components: {
    navberFul,
  },

  data() {
    return {
      itemsPerPage: 10,
      headers: [
        {
          text: "ลำดับ",
          align: "center",
          sortable: false,
          value: "index",
          class: "black--text",
        },
        {
          text: "วันที่",
          align: "center",
          sortable: false,
          value: "createdatetimeString",
          class: "black--text",
        },
        {
          text: "ชื่อลูกค้า",
          align: "center",
          sortable: false,
          value: "agent_name",
          class: "black--text",
        },
        {
          text: "ช่องทาง",
          align: "center",
          sortable: false,
          value: "saleschannel",
          class: "black--text",
        },
        {
          text: "วันส่งสินค้า",
          align: "center",
          sortable: false,
          value: "orderdateString",
          class: "black--text",
        },
        {
          text: "มูลค่า",
          align: "center",
          sortable: false,
          value: "amount",
          class: "black--text",
        },
        {
          text: "สถานะ",
          align: "center",
          sortable: false,
          value: "status",
          class: "black--text",
        },
        {
          text: "ชำระเงิน",
          align: "center",
          sortable: false,
          value: "paymentstatus",
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
      menu: false,

      index: 0,
      search: "",
      date_txt: "",
      status: "",
      page: 0,
      totalItem: 0,
      fname: "amp",
      lname: "na",
    };
  },

  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), 2000);
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
      await axios
        .get(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/zort-api/orders?date=`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.rows = resp.data.data;

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
          this.$router.push("/");
        });
    },

    async getFilter() {
      this.loading = true;
      this.rows = [];
      this.index = 0;

      if (this.status == "Pending") {
        this.status = 0;
      } else if (this.status == "Success") {
        this.status = 1;
      } else if (this.status == "Voided") {
        this.status = 2;
      } else if (this.status == "Waiting") {
        this.status = 3;
      } else {
        this.status = "";
      }

      await axios
        .get(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/zort-api/orders?date=${this.date_txt}&status=${this.status}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.loading = false;
          this.rows = resp.data.data;

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
          this.$router.push("/");
        });
    },

    reset() {
      this.$refs.form.reset();
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
