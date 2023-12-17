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
        <h1>Manual Order</h1>
      </div>
      <div
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
        }"
      >
        <v-dialog v-model="dialog" persistent max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#693c58" dark v-bind="attrs" v-on="on" rounded>
              Add Order Manual
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Created Order Manual</span>
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
                      v-model="order_amount"
                      label="Order Amount"
                      outlined
                      clearable
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-textarea
                      v-model="remark"
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Remark"
                      rounded
                      outlined
                    ></v-textarea>
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
                    @click="addOrderManual()"
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
          text: "Order Amount",
          align: "center",
          sortable: false,
          value: "order_amount",
          class: "black--text",
        },
        {
          text: "Remark",
          align: "center",
          sortable: false,
          value: "remark",
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
      order_amount: "",
      product_code: "",
      remark: "",
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
          `https://backend-medese-52b06b07483e.herokuapp.com/ware-house/api/v1/manual-order`,
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

    async addOrderManual() {
      this.index = 0;
      this.loading = true;

      if (this.order_amount == "") {
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
        order_amount: this.order_amount,
        remark: this.remark,
      };

      await axios
        .post(
          `https://backend-medese-52b06b07483e.herokuapp.com/ware-house/api/v1/manual-order`,
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
          this.order_amount = "";
          this.remark = "";

          if (resp.status == 200) {
            swal.fire({
              icon: "success",
              title: "Add Order Manual Success",
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
  