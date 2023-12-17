<template>
  <div>
    <v-dialog v-model="dialogAddStock" persistent width="900">
      <v-card>
        <v-toolbar dark color="#693c58">
          <v-container>
            <v-layout row wrap align-center>
              <v-flex lg1 class="text-center">
                <v-icon>mdi-playlist-plus</v-icon>
              </v-flex>
              <v-flex lg5 class="text-left">
                <h3>Add Stock WareHouse</h3>
              </v-flex>
              <v-flex lg6 class="text-right">
                <v-btn icon dark @click="closeDialog()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
        <v-divider />
        <v-divider />
        <v-card-text>
          <v-layout>
            <v-flex lg5>
              <v-text-field
                class="ma-2 mt-8"
                append-icon="mdi-text"
                v-model="add_balance"
                label="Balance"
                filled
                outlined
                dense
              ></v-text-field>
            </v-flex>
            <v-flex lg5>
              <v-text-field
                class="ma-2 mt-8"
                append-icon="mdi-text"
                v-model="product_dimensions_wxlxh"
                label="Dimension(W*l*h)=2x1x3 .cm"
                filled
                outlined
                dense
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex lg2>
              <v-text-field
                class="ma-2 mt-8"
                append-icon="mdi-text"
                v-model="lot_no"
                label="Lot No"
                filled
                outlined
                dense
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex lg4>
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
                    label="Receiving Date"
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
            <v-flex lg4>
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
                    label="Production Date"
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
            <v-flex lg4>
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
                    v-model="expire_date"
                    label="Expired Date"
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
                  v-model="expire_date"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-layout>
            <v-flex lgุ4 class="text-left">
              <v-text-field
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
              ></v-text-field>
            </v-flex>
            <v-flex lg4 class="text-right"> </v-flex>
            <v-flex lg4 class="text-right">
              <v-btn
                class="ma-2"
                color="#ABEBC6"
                @click="addStock()"
                :loading="loading"
              >
                CONFIRM
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import swal from "sweetalert2";

export default {
  props: ["itemStock", "dialogAddStock"],
  data() {
    return {
      loading: false,
      show3: false,
      password: "",
      menu1: false,
      menu2: false,
      menu3: false,

      add_balance: "",
      maxLength: 5,
      rules: {
        required: (value) => !!value || "required field",
      },
    };
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialogAdd"), (this.password = "");
      this.add_balance = "";
      this.receiving_date = "";
      this.production_date = "";
      this.expire_date = "";
      this.product_dimensions_wxlxh = "";
      this.lot_no = "";
    },
    async addStock() {
      console.log(this.balance);
      this.loading = true;
      var payload = {
        add_balance: this.add_balance,
        receiving_date: this.receiving_date,
        production_date: this.production_date,
        expire_date: this.expire_date,
        product_dimensions_wxlxh: this.product_dimensions_wxlxh,
        lot_no: this.lot_no,
        password: this.password,
      };

      await axios
        .put(
          `https://ware-house-rg-717e0dca3542.herokuapp.com/api/v1/stock/${this.itemStock.uid}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.code == "200") {
            swal.fire({
              icon: "success",
              title: "Update Stock",
              showConfirmButton: false,
              timer: 1500,
            });
            this.password = "";
            this.add_balance = "";
            this.loading = false;
            this.$emit("closeDialog");
          }
          if (resp.data.code == "404") {
            swal.fire({
              icon: "error",
              title: resp.data.message_en,
              showConfirmButton: false,
              timer: 1500,
            });
            this.password = "";
            this.add_balance = "";
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
            this.password = "";
            this.add_balance = "";
            this.loading = false;
            this.$emit("closeDialog");
          }
        })
        .catch((err) => {
          swal.fire({
            icon: "error",
            title: "invalid",
            showConfirmButton: false,
            timer: 1500,
          });
          this.password = "";
          this.add_balance = "";
          this.loading = false;
        });
      this.$emit("closeDialog");
      this.$emit("getData");
      console.log(payload);
    },
  },
};
</script>
