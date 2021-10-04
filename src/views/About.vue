<template>
  <v-container fluid justify="center">
    <v-row no-gutters justify="center">
      <v-col>
        <v-container>
          Beschreibung des Problems:
          <v-combobox
            v-model="request"
            filled
            append-icon
            hide-details
            dense
            :label="$t('search.query')"
            @change="fetchRecommendations"
          >
          </v-combobox>
          <div v-if="request != null">
            <br />
            <strong class="ml-3">
              Beschreibungen aus dem Anlagetagebuch:</strong
            >

            <br />
            <ul>
              <li v-for="info in infos" :key="info._id">
                {{ info }}
              </li>
            </ul>
          </div>
        </v-container>
      </v-col>
      <v-col>
        <v-container>
          Betriebsanleitung:
          <v-select
            v-model="selectedMachine"
            :items="maschines"
            filled
            label="Maschine"
            dense
            hide-details
          ></v-select>
          <div v-if="selectedMachine === 'Feintool XFT2500speed'">
            <br />
            <iframe
              src="./XFT2500speed.pdf"
              style="width: 100%; height: 600px"
              frameborder="0"
            ></iframe>
          </div>
          <div v-if="selectedMachine === 'SecMatic-Kupplung Typ 587.xx'">
            <br />
            <iframe
              src="./BetAn_SecMatic-Kupplung.pdf"
              style="width: 100%; height: 600px"
              frameborder="0"
            ></iframe>
          </div>
          <div v-if="selectedMachine === 'HFA8800PLUS'">
            <br />
            <iframe
              src="./BetAn_HFA8800PLUS.pdf"
              style="width: 100%; height: 600px"
              frameborder="0"
            ></iframe>
          </div>
          <div v-if="selectedMachine === 'Ladedruckregelung'">
            <br />
            <iframe
              src="./Anleitung_Ladedruckregelung.pdf"
              style="width: 100%; height: 600px"
              frameborder="0"
            ></iframe>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import axios from "axios";

export default {
  name: "UC3",

  data: () => ({
    selectedMachine: null,
    request: null,
    infos: null,
    maschines: [
      "Feintool XFT2500speed",
      "HFA8800PLUS",
      "SecMatic-Kupplung Typ 587.xx",
      "Ladedruckregelung",
    ],
  }),

  mounted() {},
  methods: {
    async fetchRecommendations() {
      let response = await axios.post(
        "http://localhost:8080/get-recommendations",
        {
          data: this.request,
        }
      );
      this.infos = response.data.recommendations;
    },
  },
};
</script>
