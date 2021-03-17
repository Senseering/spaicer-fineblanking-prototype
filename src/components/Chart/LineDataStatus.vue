<template>
  <div style="position: relative; height:100%; width:100%">
    <canvas ref="canvas"></canvas>
    <v-overlay absolute v-if="loading">
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
    <v-overlay absolute v-if="notAvailable">{{notAvailableMessage}}</v-overlay>
  </div>
</template>

<script>
import Chart from "chart.js";

let data = require("./DataStatus.json");
data.label[0] = Date.now();

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
    this.timer = setInterval(this.updateChart, 500);
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
        data: data.value, // Specify the data values array
        fill: false,
        borderColor: this.$vuetify.theme.themes.light.primary, // Add custom color border (Line)
        borderWidth: 0, // Specify bar border width
        showLines: false
      });
      this.chart.update();
      this.loading = false;
      return;
    },
    updateChart: async function() {
      //replace this
      this.chart.data.labels.push(Date.now());
      let newValue =
        this.chart.data.datasets[0].data[
          this.chart.data.datasets[0].data.length - 1
        ] +
        Math.random() -
        0.5;
      if (newValue >= 10) {
        newValue = 10;
      }
      if (newValue < 0) {
        newValue = 0;
      }
      if (newValue > 9) {
        this.$emit("red", newValue);
      } else if (newValue > 7) {
        this.$emit("yellow", newValue);
      } else {
        this.$emit("green", newValue);
      }

      this.chart.data.datasets[0].data.push(newValue);
      if (this.chart.data.labels.length > 100) {
        this.chart.data.labels.splice(0, 1);
        this.chart.data.datasets[0].data.splice(0, 1);
      }
      this.chart.update();
    }
  },
  watch: {},
  computed: {},
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
</style>