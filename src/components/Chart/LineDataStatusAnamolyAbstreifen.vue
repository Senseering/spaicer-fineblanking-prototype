<template>
  <div style="position: relative; height:100%; width:100%">
    <canvas ref="canvas"></canvas>

    <v-overlay absolute v-if="loading">
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
    <v-overlay absolute v-if="notAvailable">{{notAvailableMessage}}</v-overlay>

    <v-row style="margin-left:5px" class="pt-9 status_details">
      <strong>Status :</strong>
      Leichter Verschleiß prognostiziert
    </v-row>

    <v-row style="margin-left:5px" class="pt-4 status_details">
      <strong>Lokale Verschleiß-Metrik :</strong>

      {{anamolyMetricValue}}
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js";

const dt = 1500;

let data = require("./DataStatusAnamolyAbstreifen.json");
const absolutLengthOfData = data.value.length;
const intervalLengthToDisplay = 17;
const predictionLength = 5;
let currentIndex = intervalLengthToDisplay;
for (let i = 0; i < intervalLengthToDisplay; i++) {
  data.label.push(Date.now() - (intervalLengthToDisplay - i) * dt);
}
for (let i = 0; i < predictionLength; i++) {
  data.label.push(Date.now() + i * dt);
}

export default {
  name: "LineChart",
  props: {},
  data() {
    return {
      config: {},
      query: {},
      chart: null,
      data: null,
      options: null,
      displayValues: {},
      transition: null,
      leftPosition: 100,
      loading: true,
      connection: null,
      connected: false,
      notAvailable: false,
      notAvailableMessage: "",
      timer: null,
      interval_1: null,
      anamolyDetectedMatrix: [
        0.46,
        0.42,
        0.31,
        0.34,
        0.45,
        0.48,
        0.33,
        0.49,
        0.4,
        0.3,
        0.33,
        0.3,
        0.42,
        0.41,
        0.44,
        0.32,
        0.47,
        0.35,
        0.32,
        0.4,
        0.49,
        0.46,
        0.38,
        0.43,
        0.49,
        0.47,
        0.44,
        0.3,
        0.5,
        0.35,
        0.48,
        0.44,
        0.48,
        0.31,
        0.38,
        0.45,
        0.4,
        0.34,
        0.42,
        0.48,
        0.45,
        0.41,
        0.39,
        0.49,
        0.48,
        0.48,
        0.3,
        0.3,
        0.45,
        0.39,
        0.32,
        0.5,
        0.45,
        0.5,
        0.48,
        0.37,
        0.48,
        0.48,
        0.34,
        0.4,
        0.38,
        0.5,
        0.47,
        0.48,
        0.38,
        0.39,
        0.49,
        0.44,
        0.42,
        0.5,
        0.3,
        0.3,
        0.32,
        0.4,
        0.32,
        0.44,
        0.3,
        0.4,
        0.43,
        0.35,
        0.35,
        0.46,
        0.45,
        0.48,
        0.47,
        0.49,
        0.44,
        0.36,
        0.31,
        0.44,
        0.36,
        0.31,
        0.34,
        0.47,
        0.36,
        0.44,
        0.42,
        0.48,
        0.48,
        0.39
      ],
      anamolyIndex: 0,
      anamolyMetricValue: 0.86
    };
  },
  async mounted() {
    this.init();
    await this.loadData();
    this.timer = setInterval(this.updateChart, dt);
    this.interval_1 = setInterval(this.timerAnamolyMatrix, 1000);
  },
  methods: {
    init() {
      this.$refs.canvas.style.height = `100%`;
      let data = {
        labels: [],
        datasets: []
      };
      let options = {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true
                //labelString: data.labelDescription
              },
              ticks: {
                beginAtZero: true,
                max: 15
                //maxRotation: 50,
                //minRotation: 50
              }
            }
          ]
        },
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },

        legend: {
          display: false
        },
        title: {
          display: false,
          text: data.chartName
        },
        tooltips: {
          mode: "x"
        },
        elements: {
          point: { radius: 1 },
          line: { tension: 0 }
        },
        responsive: true,
        maintainAspectRatio: false // Add to prevent default behaviour of full-width/height
      };
      options.scales.xAxes = [
        {
          type: "time",
          time: {
            tooltipFormat: " DD-MM-YYYY HH:mm:ss",
            displayFormats: {
              millisecond: "HH:mm:ss.SSS",
              second: "HH:mm:ss",
              minute: "HH:mm",
              hour: "D.M HH:00"
            }
          },
          distribution: "linear",
          ticks: {
            maxTicksLimit: 3
            //maxRotation: 50,
            //minRotation: 50
          }
        }
      ];

      let ctx = this.$refs.canvas.getContext("2d");
      this.chart = new Chart(ctx, { type: "line", data, options });
    },

    timerAnamolyMatrix() {
      if (this.anamolyIndex > this.anamolyDetectedMatrix.length - 1) {
        this.anamolyIndex = 1;
      }
      this.anamolyMetricValue = this.anamolyDetectedMatrix[this.anamolyIndex++];
    },

    loadData: async function() {
      this.notAvailable = false;
      this.chart.data.labels = data.label;

      this.chart.data.datasets.push({
        label: data.labelDescription,
        data: data.value.map(el => el[0]).slice(0, intervalLengthToDisplay), // Specify the data values array
        fill: true,
        //fillColor:"red",//this.$vuetify.theme.themes.light.error,
        borderColor: this.$vuetify.theme.themes.light.primary, // Add custom color border (Line)
        borderWidth: 0, // Specify bar border width
        showLines: false
      });

      let predictions = [];
      for (let j = 0; j < intervalLengthToDisplay; j++) {
        predictions.push(null);
      }
      for (let k = 0; k < predictionLength; k++) {
        predictions.push(data.value[intervalLengthToDisplay + k][1]);
      }

      this.chart.data.datasets.push({
        label: data.labelDescription,
        data: predictions, //data.value.map(el => el[1]).slice(0, absolutLengthOfData), // Specify the data values array
        fill: true,
        //fillColor: //this.$vuetify.theme.themes.light.error,
        borderColor: this.$vuetify.theme.themes.light.error, // Add custom color border (Line)
        borderWidth: 0, // Specify bar border width
        showLines: false
      });
      /*
      let upper = [];
      for (let j = 0; j < intervalLengthToDisplay; j++) {
        upper.push(null);
      }
      for (let k = 0; k < predictionLength; k++) {
        upper.push(data.value[intervalLengthToDisplay + k][2]);
      }
      this.chart.data.datasets.push({
        label: data.labelDescription,
        data: upper, // Specify the data values array
        fill: false,
        borderColor: "#000", // Add custom color border (Line)
        borderWidth: 0, // Specify bar border width
        showLines: false
      });

      let lower = [];
      for (let j = 0; j < intervalLengthToDisplay; j++) {
        lower.push(null);
      }
      for (let k = 0; k < predictionLength; k++) {
        lower.push(data.value[intervalLengthToDisplay + k][3]);
      }
      this.chart.data.datasets.push({
        label: data.labelDescription,
        data: lower, // Specify the data values array
        fill: false,
        borderColor: "#000", // Add custom color border (Line)
        borderWidth: 0, // Specify bar border width
        showLines: false
      });
      */
      this.chart.update();
      this.loading = false;
      return;
    },
    updateChart: async function() {
      if (currentIndex + predictionLength + 1 >= absolutLengthOfData) {
        currentIndex = 1;
        console.log("new");
      }
      //replace this
      this.chart.data.labels.push(Date.now() + predictionLength * dt);

      this.chart.data.datasets[0].data.push(data.value[currentIndex + 1][0]);
      this.chart.data.datasets[1].data.push(
        data.value[currentIndex + predictionLength + 1][1]
      );

      for (let i = 1; i < 2; i++) {
        this.chart.data.datasets[i].data[
          this.chart.data.datasets[i].data.length - predictionLength - 2
        ] = null;
      }

      /*if (newValue > 9) {
        this.$emit("red", newValue);
      } else if (newValue > 7) {
        this.$emit("yellow", newValue);
      } else {
        this.$emit("green", newValue);
      }
      this.chart.data.datasets[0].data.push(newValue);*/
      this.chart.data.labels.splice(0, 1);
      for (let i = 0; i < 2; i++) {
        this.chart.data.datasets[i].data.splice(0, 1);
      }

      currentIndex++;

      this.chart.update();
    }
  },
  watch: {},
  computed: {
    anomalyIndex() {
      if (this.chart && this.chart.data.datasets[0]) {
        return (
          Math.round(
            Math.abs(
              this.chart.data.datasets[0].data[
                this.chart.data.datasets[0].data.length - 1
              ]
            ) * 100000
          ) / 10000000
        );
      } else {
        return 0;
      }
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
</style>