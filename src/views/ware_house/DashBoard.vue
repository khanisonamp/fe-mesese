<template>
  <div>
    <navber />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <div class="mt-5">
          <div
            :style="{
              display: 'flex',
              justifyContent: 'flex-start',
              color: '#603b52',
            }"
          >
            <h1>Dashboard</h1>
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
                  @click="confirm()"
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
    </v-form>
    <v-container>
      <div
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
        }"
      >
        <v-btn
          :disabled="!valid"
          color="#693c58"
          class="white--text ma-1"
          :loading="loading"
          @click="orderLogs()"
          rounded
        >
          Order Log
        </v-btn>
      </div>
      <apexChart
        type="bar"
        height="350"
        :options="options"
        :series="series"
      ></apexChart>

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
      itemsPerPage: 1000,
      headers: [
        {
          text: "No",
          align: "center",
          sortable: false,
          value: "no",
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
          text: "Quantity Total",
          align: "center",
          sortable: false,
          value: "quantity",
          class: "black--text",
        },
        {
          text: "Remaining Total",
          align: "center",
          sortable: false,
          value: "stock_total",
          class: "black--text",
        },
      ],

      labels: ["MKLot1", "MKLot1", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],

      start_date: "",
      start_time: "",
      startDateTime: "",

      end_date: "",
      end_time: "",
      endDateTime: "",

      val: [],

      value: [],

      labelSize: 5,
      rows: [],

      valid: true,
      name: "",
      nameRules: [
        (v) => (v && v.length <= 12) || "รหัสติดตามสินค้าไม่เกิน 12 ตัวอักษร",
      ],

      loading: false,

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,

      options: {},
      series: [
        {
          name: "rose gold ",
          data: [],
        },
      ],

      dialogOpenStart: false,
      dialogOpenStartTime: false,
      dialogOpenEnd: false,
      dialogOpenEndTime: false,
    };
  },

  methods: {
    getData() {
      const data = {
        start_date: this.startDateTime,
        end_date: this.endDateTime,
      };
      axios
        .post(
          "https://api-medese-6a500594070c.herokuapp.com/ware-house/api/v1/order-product/dashboard",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_member")}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          this.rows = resp.data.data;
          for (const item of this.rows) {
            this.val.push(item.product_code);
            this.value.push(item.quantity);
          }
          this.setData();
          console.log(this.val);

          if (resp.status != 200) {
            //swal.fire({
            //  icon: "error",
            //  title: "invalid",
            //  text: "username and password !!!",
            //  showConfirmButton: false,
            //  timer: 1500,
            //});
            //this.$router.push("/");
          }
        })
        .catch((err) => {
          //swal.fire({
          //  icon: "error",
          //  title: "invalid",
          //  text: "username and password !!!",
          //  showConfirmButton: false,
          //  timer: 1500,
          //});
          //this.$router.push("/");
        });
    },

    async confirm() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.val = [];
        this.value = [];
        this.rows = [];

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
            `https://api-medese-6a500594070c.herokuapp.com/ware-house/api/v1/order-product/dashboard`,
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token_member")}`,
              },
            }
          )
          .then((resp) => {
            console.log(resp);
            this.loading = false;
            this.rows = resp.data.data;
            for (const item of this.rows) {
              this.val.push(item.product_code);
              this.value.push(item.quantity);
            }
            this.setData();

            console.log(this.val);
            if (resp.status != 200) {
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
            swal.fire({
              icon: "error",
              title: "invalid",
              text: "",
              showConfirmButton: false,
              timer: 1500,
            });
            //this.$router.push("/");
          });
      }
    },

    setData() {
      this.series = [
        {
          name: "rose gold ",
          data: this.value,
        },
      ];
      this.options = {
        chart: {
          toolbar: {
            show: false,
          },
          fontFamily: "Sarabun, Arial, sans-serif",
          id: "vuechart-example",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 700,
            animateGradually: {
              enabled: true,
              delay: 100,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 700,
            },
          },
        },
        yaxis: {
          forceNiceScale: true,
          labels: {
            show: true,
            rotateAlways: false,
            style: {
              fontSize: "12px",
              fontFamily: "Sarabun",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: function (value) {
              return Number(value).toLocaleString();
            },
          },
        },
        xaxis: {
          forceNiceScale: true,
          categories: this.val, // ใช้จาก API ได้เลย
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            style: {
              colors: [],
              fontSize: "10px",
              fontFamily: "Sarabun",
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            distributed: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          position: "top",
          offsetY: -25,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
          formatter: function (value) {
            return Number(value).toLocaleString();
          },
        },
        legend: {
          show: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        tooltip: {
          enabled: true,
          custom({ series, seriesIndex, dataPointIndex, w }) {
            return (
              "<div style='background-color: #c7dbe0;padding:5px;'><span>" +
              w.globals.labels[dataPointIndex] +
              "</span></div>" +
              "<div style='padding: 10px;'><b>จำนวนสินค้า : " +
              series[seriesIndex][dataPointIndex] +
              "</b></div>"
            );
          },
        },
      };
    },

    reset() {
      this.$refs.form.reset();
    },

    async updateOrder() {
      this.loading = true;
      var payload = {
        start_date: "",
        end_date: "",
      };

      await axios
        .post(
          `https://api-medese-6a500594070c.herokuapp.com/ware-house/api/v1/order-product`,
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
            this.loading = false;
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
          this.loading = false;
        });
    },

    orderLogs() {
      this.$router.push("/order-logs");
    },
  },

  mounted() {
    this.getData();
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
.v-sheet--offset {
  top: -24px;
  position: relative;
}

.custom-timepicker .v2t-labels .timepicker-label {
  border: 1px solid red;
}
</style>
