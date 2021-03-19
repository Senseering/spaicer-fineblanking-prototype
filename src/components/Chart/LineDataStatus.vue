<template>
  <div style="position: relative; height:100%; width:100%">
    <div class="ml-7">Anomaly index {{anomalyIndex}}</div>
    <canvas ref="canvas"></canvas>

    <v-overlay absolute v-if="loading">
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
    <v-overlay absolute v-if="notAvailable">{{notAvailableMessage}}</v-overlay>
  </div>
</template>

<script>
import Chart from "chart.js";

const dt = 50;

let data = require("./DataStatus.json");
const absolutLengthOfData = data.value.length;
const intervalLengthToDisplay = 300;
const predictionLength = 50;
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
      timer: null
    };
  },
  async mounted() {
    this.init();
    await this.loadData();
    this.timer = setInterval(this.updateChart, dt);
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
                maxRotation: 50,
                minRotation: 50
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
          point: { radius: 0 },
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
            maxTicksLimit: 10,
            maxRotation: 50,
            minRotation: 50
          }
        }
      ];

      let ctx = this.$refs.canvas.getContext("2d");
      this.chart = new Chart(ctx, { type: "line", data, options });
    },

    loadData: async function() {
      this.notAvailable = false;
      this.chart.data.labels = data.label;

      this.chart.data.datasets.push({
        label: data.labelDescription,
        data: data.value.map(el => el[0]).slice(0, intervalLengthToDisplay), // Specify the data values array
        fill: false,
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
        fill: false,
        borderColor: this.$vuetify.theme.themes.light.error, // Add custom color border (Line)
        borderWidth: 0, // Specify bar border width
        showLines: false
      });

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

      this.chart.update();
      this.loading = false;
      return;
    },
    updateChart: async function() {
      if (currentIndex + predictionLength >= absolutLengthOfData) {
        currentIndex = 300;
      }
      //replace this
      this.chart.data.labels.push(Date.now() + predictionLength * dt);

      this.chart.data.datasets[0].data.push(data.value[currentIndex + 1][0]);
      this.chart.data.datasets[1].data.push(
        data.value[currentIndex + predictionLength + 1][1]
      );
      this.chart.data.datasets[2].data.push(
        data.value[currentIndex + predictionLength + 1][2]
      );
      this.chart.data.datasets[3].data.push(
        data.value[currentIndex + predictionLength + 1][3]
      );

      for (let i = 1; i < 4; i++) {
        this.chart.data.datasets[i].data[
          this.chart.data.datasets[i].data.length - predictionLength
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
      for (let i = 0; i < 4; i++) {
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
              ] -
                this.chart.data.datasets[1].data[
                  this.chart.data.datasets[0].data.length - 1
                ]
            ) * 100000
          ) / 10000
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