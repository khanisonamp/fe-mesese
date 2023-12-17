<!--<template>
  <div>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span class="mr-2">WARE HOUSE</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="$router.push('/dashboard')"
        text
      >
        <span class="mr-2">Dashboard</span>
      </v-btn>

      <v-btn
        @click="$router.push('/')"
        text
      >
        <span class="mr-2">Order In</span>
      </v-btn>

      <v-btn
        @click="$router.push('/about')"
        text
      >
        <span class="mr-2">Order Out</span>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

  </div>
</template>-->

<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src=""
        transition="scale-transition"
        width="100"
        @click="$router.push('/dashboard')"
        text
      />

      <!--<v-toolbar-title>Ware House</v-toolbar-title>-->

      <!--<v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="$router.push('/dashboard')">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-title text>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/order-report')">
            <v-list-item-icon>
              <v-icon>mdi-reorder-horizontal</v-icon>
            </v-list-item-icon>

            <v-list-item-title text>Order Report</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/create-stock')">
            <v-list-item-icon>
              <v-icon>mdi-crop-rotate</v-icon>
            </v-list-item-icon>

            <v-list-item-title text :disabled="true"
              >Receiving</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="$router.push('/manual-order')">
            <v-list-item-icon>
              <v-icon>mdi-transit-transfer</v-icon>
            </v-list-item-icon>

            <v-list-item-title text :disabled="true"
              >Manual Order</v-list-item-title
            >
          </v-list-item>
          <!--<v-list-item @click="$router.push('/reports')">
            <v-list-item-icon>
              <v-icon>mdi-newspaper</v-icon>
            </v-list-item-icon>

            <v-list-item-title text :disabled="true">Report</v-list-item-title>
          </v-list-item>-->

          <v-list-item @click="$router.push('/stock')">
            <v-list-item-icon>
              <v-icon>mdi-set-center</v-icon>
            </v-list-item-icon>

            <v-list-item-title text :disabled="true">Stock</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <div class="pa-2 mt-12">
          <v-btn block color="#8a2121" class="white--text" @click="logOut()">
            <v-icon>mdi-export</v-icon>
            Logout
          </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import swal from "sweetalert2";

export default {
  name: "NavBer",

  data: () => ({
    drawer: false,
    group: null,
  }),

  methods: {
    logOut() {
      swal
        .fire({
          title: "Are you sure?",
          text: "Do I have to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmed",
        })
        .then((result) => {
          if (result.isConfirmed) {
            swal.fire("Logout!", "Your please wait...", "success");
            localStorage.clear(), this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style scoped>
.btn-round {
  border-radius: 15px;
}
.v-app-bar {
  padding: 0 0px !important;
  background-color: #513b49 !important;
  color: rgb(255, 255, 255) !important;
}
</style>
