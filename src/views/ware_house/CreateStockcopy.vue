<template>
  <div>
    <navber />
    <v-container>
      <v-card class="mx-auto table-stlye" elevation="8">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <h1 class="text-center" style="color: #513b49">Created Stock</h1>
            <v-card-actions>
              <v-layout>
                <v-flex lgุ4 class="">
                  <span>Ware House :</span>
                  <v-select
                    class="ma-2"
                    v-model="ware_house"
                    :items="warehouse"
                    label="คลังสินค้า"
                    filled
                    outlined
                    dense
                  ></v-select>
                </v-flex>
                <v-flex lg4 class="">
                  <span>Product Name :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="product_name"
                    label="ชื่อสินค้า"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lgุ2 class="">
                  <span>Sku :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="sku"
                    label="รหัสสิค้า"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lg2 class="">
                  <span>QTY :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="balance"
                    label="จำนวนสินค้า"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-actions>
            <v-card-actions>
              <v-layout>
                <v-flex lg4 class="mt-n3">
                  <span>Supplier Name :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="supplier_name"
                    label="ชื่อผู้ผลิต"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 class="mt-n3">
                  <span>Special Name :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="special_name"
                    label="ชื่อพิเศษ"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lgุ4 class="mt-n3">
                  <span>Vendor Name :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="vendor_name"
                    label="ชื่อผู้ขาย"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-actions>
            <v-card-actions>
              <v-layout>
                <v-flex lgุ4 class="mt-n3">
                  <span>Document No :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="document_no"
                    label="เลขที่เอกสาร"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 class="mt-n3">
                  <span>Contact :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="contact"
                    label="ติดต่อ"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 class="mt-n3">
                  <span>Address :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="Address"
                    label="ที่อยู่"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-actions>
            <v-card-actions>
              <v-layout>
                <v-flex lg4 class="mt-n3">
                  <span>Dimension(W*l*h)=2x1x3 .cm :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="product_dimensions_wxlxh"
                    label="ขนาดของสินค้า"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 class="mt-n3">
                  <span>Product Weight :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="product_weight"
                    label="น้ำหนักสินค้า"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 class="mt-n3">
                  <span>Location :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="location"
                    label="ที่ตั้ง"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-actions>
            <v-card-actions>
              <v-layout>
                <v-flex lg3 class="mt-n3">
                  <span>Lot No :</span>
                  <v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="lot_no"
                    label="เลขที่ล็อต"
                    filled
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex lgุ3 class="mt-n3">
                  <span>Receiving Date :</span>
                  <!--<v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="receiving_date"
                    label="Receiving Date"
                    filled
                    outlined
                    dense
                  ></v-text-field>-->
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="ma-2"
                        v-model="receiving_date"
                        label="วันที่รับ"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        filled
                        outlined
                        dense
                        :rules="[(v) => !!v || 'You must agree to continue!']"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="receiving_date"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex lg3 class="mt-n3">
                  <span>Production Date :</span>
                  <!--<v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="production_date"
                    label="Production Date"
                    filled
                    outlined
                    dense
                  ></v-text-field>-->
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="ma-2"
                        v-model="production_date"
                        label="วันผลิต"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        filled
                        outlined
                        dense
                        :rules="[(v) => !!v || 'You must agree to continue!']"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="production_date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex lgุ3 class="mt-n3">
                  <span>Expired Date :</span>
                  <!--<v-text-field
                    class="ma-2"
                    append-icon="mdi-text"
                    v-model="expired_date"
                    label="Expired Date"
                    filled
                    outlined
                    dense
                  ></v-text-field>-->
                  <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="ma-2"
                        v-model="expired_date"
                        label="วันหมดอายุ"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        filled
                        outlined
                        dense
                        :rules="[(v) => !!v || 'You must agree to continue!']"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="expired_date"
                      @input="menu3 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-card-actions>
            <v-divider />
            <v-card-actions>
              <v-layout>
                <v-flex lgุ4 class="text-left">
                  <!--<v-text-field
                    class="ma-2"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
                    v-model="password"
                    label="Enter your password."
                    filled
                    outlined
                    dense
                    clearable
                  ></v-text-field>-->
                </v-flex>
                <v-flex lg4 class="text-right"> </v-flex>
                <v-flex lg4 class="text-right">
                  <v-btn
                    color="#8a2121"
                    class="ma-2 white--text"
                    @click="reset"
                  >
                    Clear
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    color="#ABEBC6"
                    @click="createStock()"
                    :loading="loading"
                  >
                    SAVE
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
  
  <script>
import swal from "sweetalert2";
import navber from "../../lavouts/navber.vue";

export default {
  components: {
    navber,
  },

  data() {
    return {
      warehouse: ['Medese'],
      valid: true,
      show3: false,
      loading: false,
      menu1: false,
      menu2: false,
      menu3: false,

      ware_house: "",
      product_name: "",
      sku: "",
      supplier_name: "",
      special_name: "",
      vendor_name: "",
      contact: "",
      Address: "",
      document_no: "",
      balance: "",
      product_dimensions_wxlxh: "",
      product_weight: "",
      receiving_date: "",
      production_date: "",
      lot_no: "",
      expired_date: "",
      location: "",
      width_cm: "",
      length_cm: "",
      height_cm: "",
      cubic_cm: "",
      cubic_m: "",
      password: "",
    };
  },

  watch: {},

  computed: {},

  mounted() {},

  methods: {
    reset() {
      this.$refs.form.reset();
    },

    async createStock() {
      this.loading = true;
      var payload = {
        ware_house: this.ware_house,
        product_name: this.product_name,
        sku: this.sku,
        supplier_name: this.supplier_name,
        special_name: this.special_name,
        vendor_name: this.vendor_name,
        contact: this.contact,
        Address: this.Address,
        document_no: this.document_no,
        balance: this.balance,
        product_dimensions_wxlxh: this.product_dimensions_wxlxh,
        product_weight: this.product_weight,
        receiving_date: this.receiving_date,
        production_date: this.production_date,
        expire_date: this.expired_date,
        lot_no: this.lot_no,
        location: this.location,
        password: this.password,
      };

      await axios
        .post(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/api/v1/stock`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          this.reset();
          if (resp.data.code == "200") {
            swal.fire({
              icon: "success",
              title: "Create Stock",
              showConfirmButton: false,
              timer: 1500,
            });
            (this.password = ""), (this.loading = false);
          }
          if (resp.data.code == "404") {
            swal.fire({
              icon: "error",
              title: resp.data.message_en,
              showConfirmButton: false,
              timer: 1500,
            });
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
            (this.loading = false), this.$router.push("/");
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
          (this.password = ""), (this.loading = false);
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
 