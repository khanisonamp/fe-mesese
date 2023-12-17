<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-container>
      <v-card
        class="mx-auto"
        elevation="8"
        height="530"
        width="500"
        color="#F9EBEA"
        rounded
      >
        <!--<v-sheet width="350" class="mx-auto">-->
        <v-container>
          <v-img
            alt="Vuetify Logo"
            class="pa-15 ma-2 mx-auto"
            contain
            src=""
            transition="scale-transition"
            width="200"
            cover
          />
          <v-form fast-fail @submit.prevent="login">
            <v-text-field
              label="Username"
              filled
              outlined
              v-model="username"
              rounded
            ></v-text-field>

            <v-text-field
              :counter="12"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show3 ? 'text' : 'password'"
              name="input-10-2"
              hint="At least 8 characters"
              value="wqfasds"
              class="input-group--focused white--text"
              @click:append="show3 = !show3"
              label="Password"
              filled
              outlined
              v-model="password"
              rounded
            ></v-text-field>
            <v-select
              label="Select System"
              v-model="role"
              :items="['WareHouse', 'Fulfillment']"
              rounded
            ></v-select>
            <v-btn
              :disabled="!valid"
              color="#FADBD8"
              class="mt-5 mr-4"
              block
              :loading="loading"
              @click="login()"
              rounded
              :style="{
                boxShadow: 'none',
                width: '50px',
                padding: '20px',
              }"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-container>
        <!--</v-sheet>-->
      </v-card>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      valid: true,
      loading: false,

      //username: "",
      //password: "",
      username: "medese@admin",
      password: "jq50@IQpN@",
      role: "",

      show3: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    async login() {
      console.log(this.role);
      this.loading = true;
      if (this.role == "") {
        this.loading = false;
        swal.fire({
          icon: "error",
          title: "invalid",
          text: "invalid select system !!!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      // Your login logic here
      const data = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post(
          "https://api-medese-6a500594070c.herokuapp.com/ware-house/api/v1/login",
          data
        )
        .then((resp) => {
          if (resp.status == 200) {
            localStorage.setItem("token_member", resp.data.data.token);
            this.loading = false;
            swal.fire({
              icon: "success",
              title: "Success",
              text: "Your please wait...",
              showConfirmButton: false,
              timer: 1500,
            });
            if (this.role == "WareHouse") {
              this.$router.push("/dashboard");
            } else {
              this.$router.push("/transaction-order");
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          swal.fire({
            icon: "error",
            title: "invalid",
            text: "username and password !!!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>
