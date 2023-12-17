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
        <h1>Reciveing</h1>
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

      <div
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
        }"
      >
        <!--<v-btn
          :disabled="!valid"
          color="#693c58"
          class="white--text ma-1"
          :loading="loading"
          @click="orderLogs()"
          rounded
        >
          Order Log
        </v-btn>-->

        <v-dialog v-model="dialog" persistent max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#693c58" dark v-bind="attrs" v-on="on" rounded>
              Add Stock
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add Stock</span>
            </v-card-title>

            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="items_product"
                      v-model="product_code"
                      label="Product Code"
                      outlined
                      clearable
                      rounded
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="stock_in"
                      label="Stock In"
                      outlined
                      clearable
                      rounded
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div
                  :style="{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }"
                >
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="addStockIn()"
                    :loading="loading"
                  >
                    Confirm
                  </v-btn>
                </div>
              </v-container>
            </v-form>
          </v-card>
        </v-dialog>
      </div>

      <v-card class="mx-auto mt-4" elevation="8">
        <div class="table-stlye th-first th-last">
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
import navber from "../../lavouts/navber.vue";

export default {
  components: {
    navber,
    //dialogEdit,
    //dialogAddStock,
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
          text: "Date",
          align: "center",
          sortable: false,
          value: "created_at",
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
          value: "product_name",
          class: "black--text",
        },
        {
          text: "Remaining Stock",
          align: "center",
          sortable: false,
          value: "remaining_stock",
          class: "black--text",
        },
        {
          text: "Stock In",
          align: "center",
          sortable: false,
          value: "stock_in",
          class: "black--text",
        },
        {
          text: "Remaining Today",
          align: "center",
          sortable: false,
          value: "remaining_today",
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

      items_product: [
        "free_gold",
        "Wellmed",
        "Medpresso",
        "MedivarPlus",
        "Meddilen",
        "Medaily_Pro_fiber",
      ],
      stock_in: "",
      product_code: "",
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
          `https://backend-medese-52b06b07483e.herokuapp.com/ware-house/api/v1/product/log-create-stock`,
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

    async addStockIn() {
      this.index = 0;
      this.loading = true;

      if (this.stock_in == "") {
        swal.fire({
          icon: "error",
          title: "invalid product and stock ",
          text: "",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const data = {
        product_code: this.product_code,
        stock: this.stock_in,
      };

      await axios
        .post(
          `https://backend-medese-52b06b07483e.herokuapp.com/ware-house/api/v1/product`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.rows = resp.data.data;
          this.loading = false;

          this.product_code = "";
          this.stock_in = "";

          if (resp.status == 200) {
            swal.fire({
              icon: "success",
              title: "Add Stock Success",
              text: "Your please wait...",
              showConfirmButton: false,
              timer: 1500,
            });
            this.dialog = false;
            this.getData();
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
  