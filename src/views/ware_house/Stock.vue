<template>
  <div>
    <navber />
    <v-container>
      <div
        :style="{
          display: 'flex',
          justifyContent: 'flex-start',
          color: '#603b52',
        }"
      >
        <h1>Stock</h1>
      </div>
      <!--<v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-dialog v-model="dialog" persistent width="1040">
            <v-toolbar dark color="#693c58">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <template v-slot:activator="{ props }">
              <v-btn
                class="white--text"
                color="#693c58"
                v-bind="props"
                @click="openDialog()"
              >
                Import Excel
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Upload File Excel </v-card-title>
              <v-card-text>
                <div class="text-center">
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="file"
                        show-size
                        label="File input"
                        :rules="[
                          (v) => !!v || 'กรุณาเลือกไฟล์',
                          (v) => (v && v.size > 0) || 'กรุณาเลือกไฟล์',
                        ]"
                        accept=".xlsx"
                      />
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid"
                      color="#693c58"
                      class="mr-4 mt-3 white--text"
                      :loading="loading"
                      @click="importFile()"
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-container>
      </v-form>-->
      <v-card class="mx-auto mt-4" elevation="8">
        <!--<v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  class="mt-4"
                  prepend-icon="mdi-text"
                  v-model="search"
                  :counter="30"
                  label="Search"
                  filled
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-btn
                :disabled="!valid"
                color="#693c58"
                class="mr-4 mt-7 white--text"
                :loading="loading"
                @click="getFilter()"
              >
                Search
              </v-btn>
            </v-row>
          </v-form>
        </v-container>-->
        <div class="table-stlye th-first th-last">
          <!--<v-data-table
            :headers="headers"
            :items="rows"
            hide-default-footer
            class="pa-5"
            @page-count="pageCount = $event"
            :page.sync="page"
            :items-per-page="itemsPerPage"
          >
            ``<template v-slot:[`item.product_dimensions_wxlxh`]="{ item }">
              {{ item.product_dimensions_wxlxh || "-" }}
            </template>
            <template v-slot:[`item.lot_no`]="{ item }">
              {{ item.lot_no || "-" }}
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
              {{ item.created_at || "-" }}
            </template>
            <template v-slot:[`item.receiving_date`]="{ item }">
              {{ item.receiving_date || "-" }}
            </template>
            <template v-slot:[`item.production_date`]="{ item }">
              {{ item.production_date || "-" }}
            </template>
            <template v-slot:[`item.expire_date`]="{ item }">
              {{ item.expire_date || "-" }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-layout row wrap justify-center align-center>
                <v-flex lg6>
                  <v-icon color="#693c58" @click="edit(item)">
                    mdi-file-document-edit-outline
                  </v-icon>
                </v-flex>
                <v-flex lg6>
                  <v-icon class="ma-1" color="#693c58" @click="addStock(item)">
                    mdi-cart-arrow-down
                  </v-icon>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>-->
          <v-data-table
            :headers="headers"
            :items="rows"
            :items-per-page="itemsPerPage"
            class="pa-5"
          >
            <template v-slot:[`item.created_at`]="{ item }">
              {{ item.created_at || "-" }}
            </template>
            <template v-slot:[`item.stock`]="{ item }">
              {{ item.stock || "-" }}
            </template>
          </v-data-table>
        </div>
        <!--<v-pagination
          circle
          @input="changePage"
          v-model="page"
          :length="pageCount || 0"
        ></v-pagination>-->
      </v-card>
    </v-container>

    <!--<dialogEdit
      :itemStock="itemStock"
      :dialogEdit="dialogEdit"
      @closeDialog="dialogEdit = false"
      @getData="getData()"
    />-->
    <!--<dialogAddStock
      :itemStock="itemStock"
      :dialogAddStock="dialogAddStock"
      @closeDialogAdd="dialogAddStock = false"
      @getData="getData()"
    />-->
  </div>
</template>
  
  <script>
import axios from "axios";
import swal from "sweetalert2";
import dialogAddStock from "../../components/DialogAddStock.vue";
import dialogEdit from "../../components/DialogEditStock.vue";
import navber from "../../lavouts/navber.vue";

export default {
  components: {
    navber,
    dialogEdit,
    dialogAddStock,
  },

  data() {
    return {
      itemsPerPage: 10,
      headers: [
        {
          text: "No",
          align: "center",
          sortable: false,
          value: "index",
          class: "black--text",
        },
        {
          text: "Product Code",
          align: "center",
          sortable: false,
          value: "product_code",
          class: "black--text",
        },
        {
          text: "Product Name",
          align: "center",
          sortable: false,
          value: "name",
          class: "black--text",
        },
        {
          text: "Stock Total",
          align: "center",
          sortable: false,
          value: "stock",
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
      page: 0,
      totalItem: 0,
      fname: "amp",
      lname: "na",
      file: [],
      dialog: false,
      dialogEdit: false,
      dialogAddStock: false,
      itemStock: {},
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
        const s = 50;
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
          `https://api-medese-6a500594070c.herokuapp.com/ware-house/api/v1/product`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp);
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
            //this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "invalid",
            text: "username and password!",
            showConfirmButton: false,
            timer: 1500,
          });
          //this.$router.push("/");
        });
    },

    reset() {
      this.$refs.form.reset();
    },
    openDialog() {
      this.dialog = true;
    },

    async importFile() {
      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.file);

      await axios
        .post(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/api/v1/stock/import-excel?skip=2`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          if (resp.status == 200) {
            this.reset();
            swal.fire({
              icon: "success",
              title: "Import File",
              showConfirmButton: false,
              timer: 1500,
            });
            this.dialog = false;
            this.loading = false;
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
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    async getFilter() {
      this.loading = true;
      this.rows = [];
      this.index = 0;
      await axios
        .get(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/api/v1/stock?limit=${this.itemsPerPage}&page=${this.page}&date_time=${this.date_txt}&search=${this.search}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.loading = false;
          this.rows = resp.data.data;
          this.totalItem = resp.data.pagination.total_count;

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

    async changePage() {
      console.log(this.page);
      await axios
        .get(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/api/v1/stock?limit=${this.itemsPerPage}&page=${this.page}&date_time=${this.date_txt}&search=${this.search}`,
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
            text: "username and password !!!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/");
        });
    },

    async edit(val) {
      if (val != null) {
        console.log(val);
        this.dialogEdit = true;
        this.itemStock = val;
      } else {
        console.log("error");
      }
    },

    async addStock(val) {
      if (val != null) {
        console.log(val);
        this.dialogAddStock = true;
        this.itemStock = val;
      } else {
        console.log("error");
      }
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
  