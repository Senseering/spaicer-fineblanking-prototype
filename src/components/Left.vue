<template>
  <v-card class="mx-1 mt-3" max-width="900">
    <v-row>
      <v-col class="mr-12">
        <v-img
          class="shrink"
          contain
          src="@/assets/Feintool.png"
          transition="scale-transition"
          max-height="400px"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ml-12">
        <div
          v-if="lightStatusSchneiden==='red'"
        >Anomalie prognostiziert, Werkzeugwartung erforderlich.</div>
        <div
          v-else-if="lightStatusSchneiden==='yellow'"
        >Anomalie prognostiziert, Werkzeugwartung möglicherweise bald erforderlich</div>
        <div v-else>Keine Handeln notwendig</div>
      </v-col>
      <v-col align="end">
        <div v-if="lightStatusSchneiden==='red'">
          <span class="css-ampel ampelrot">
            <span></span>
          </span>
        </div>
        <div v-else-if="lightStatusSchneiden==='yellow'">
          <span class="css-ampel ampelgelb">
            <span></span>
          </span>
        </div>
        <div v-else>
          <span class="css-ampel ampelgruen">
            <span></span>
          </span>
        </div>
      </v-col>
      <v-col>
        <div v-if="lightStatusAbstreifen==='red'">
          <span class="css-ampel ampelrot">
            <span></span>
          </span>
        </div>
        <div v-else-if="lightStatusAbstreifen==='yellow'">
          <span class="css-ampel ampelgelb">
            <span></span>
          </span>
        </div>
        <div v-else>
          <span class="css-ampel ampelgruen">
            <span></span>
          </span>
        </div>
      </v-col>
      <v-col class="mr-12">
        <div
          v-if="lightStatusAbstreifen==='red'"
        >Anomalie prognostiziert, Werkzeugwartung erforderlich.</div>
        <div
          v-else-if="lightStatusAbstreifen==='yellow'"
        >Anomalie prognostiziert, Werkzeugwartung möglicherweise bald erforderlich</div>
        <div v-else>Keine Handeln notwendig</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    lightStatusSchneiden: "green",
    lightStatusAbstreifen: "green"
  }),
  methods: {
    timer() {
      //this needs to be updated with real data
      let lightStatusSchneidenRandom = Math.random();
      if (lightStatusSchneidenRandom > 0.9) {
        this.lightStatusSchneiden = "rot";
      } else if (lightStatusSchneidenRandom > 0.75) {
        this.lightStatusSchneiden = "yellow";
      } else {
        this.lightStatusSchneiden = "green";
      }

      let lightStatusAbstreifenRandom = Math.random();
      if (lightStatusAbstreifenRandom > 0.9) {
        this.lightStatusAbstreifen = "rot";
      } else if (lightStatusAbstreifenRandom > 0.75) {
        this.lightStatusAbstreifen = "yellow";
      } else {
        this.lightStatusAbstreifen = "green";
      }
    }
  },
  mounted() {
    this.interval = setInterval(this.timer, 3000);
  }
};
</script>


<style scoped>
.css-ampel {
  display: inline-block;
  width: 30px;
  height: 90px;
  border-radius: 6px;
  position: relative;
  background-color: black;
  zoom: 1.7;
}

.css-ampel span,
.css-ampel:before,
.css-ampel:after {
  content: "";
  color: white;
  position: absolute;
  border-radius: 15px;
  width: 22px;
  height: 22px;
  left: 4px;
}

.css-ampel:before {
  top: 6px;
  background-color: red;
  background-color: dimgrey;
}

.css-ampel:after {
  top: 34px;
  background-color: yellow;
  background-color: dimgrey;
}

.css-ampel span {
  top: 62px;
  background-color: green;
  background-color: dimgrey;
}

.ampelrot:before {
  background-color: red;
  box-shadow: 0 0 20px red;
}

.ampelgelb:after {
  background-color: yellow;
  box-shadow: 0 0 20px yellow;
}

.ampelgruen span {
  background-color: limegreen;
  box-shadow: 0 0 20px limegreen;
}
</style>
