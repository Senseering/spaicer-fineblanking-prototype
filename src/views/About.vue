<template>
  <v-container fluid justify="center">
    <v-row no-gutters justify="center">
      <v-col>
        <v-container>
          Gib des Problems:
          <v-combobox
            v-model="request"
            filled
            append-icon
            hide-details
            dense
            :label="$t('search.query')"
          >
          </v-combobox>
          <div v-if="request != null">
            <br />
            <strong class="ml-3">
              Beschreibungen aus dem Anlagetagebuch:</strong
            >

            <br />
            <ul>
              <li v-for="product in products" :key="product._id">
                {{ product }}
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
            <iframe
              src="@assets/XFT2500speed.pdf"
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
export default {
  name: "UC3",

  data: () => ({
    selectedMachine: null,
    request: null,
    maschines: ["Feintool XFT2500speed"],
    products: [
      "Eine zulockere Trocknerkette",
      "Kette wieder drauf gefädelt und gespannt ",
      "Lüfter von Trockner macht sehr starke Geräusche",
    ],
  }),
};
</script>
