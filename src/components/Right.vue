<template>
  <v-card class="mx-1" max-width="900">
    <v-expansion-panels v-model="panel">
      <v-expansion-panel v-for="(item,i) in items" :key="i">
        <v-expansion-panel-header>
          <strong>{{item.title}}</strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="i===0">
            <v-card flat>
              <v-row justify="center">
                <v-col class="pa-3">
                  <div v-if="lightStatus === 'red'">
                    <span class="css-ampel ampelrot">
                      <span></span>
                    </span>
                  </div>
                  <div v-else-if="lightStatus === 'yellow'">
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
                <v-col class="pa-3">
                  <div v-if="counter===0">
                    Die Maschine ist nicht in Betrieb!
                    <br />
                    <strong>Bitte führen sie X durch</strong>
                  </div>
                  <div v-else-if="counter===1">
                    Es Zeichnet sich eine Anomalie
                    <strong>im Auswerfer</strong>
                    ab
                  </div>
                  <div v-else>
                    <strong>Keine Störung vorhanden oder prognostiziert</strong>
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-row>
              <v-col>
                <v-row class="pt-7">
                  Aktueller Lauf:
                  <strong class="ml-3">OK</strong>
                </v-row>
                <v-row>
                  Status Vorhersage
                  <strong class="ml-3">OK</strong>
                </v-row>
                <v-row>Kein Handeln notwendig</v-row>
              </v-col>
              <v-col>
                <v-card flat height="300" class="pb-3">
                  <LineDataStatus @red="red" @yellow="yellow" @green="green" />
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-if="i===1">
            <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Category</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in anomalieList" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td v-if="item.category=== 1">
                      <v-icon color="yellow">warning</v-icon>
                    </td>
                    <td v-if="item.category=== 2">
                      <v-icon color="error">error</v-icon>
                    </td>
                    <td>
                      <v-btn text small @click="showAlert(item)" color="primary">
                        <v-icon>help</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div v-if="i===2">
            <v-container justify="center" align="center">
              <v-card outlined>
                <v-card-title>Lokale Anomalie erkannt</v-card-title>
                <v-card-subtitle>
                  <strong>Wiederholende Anomalie wurde im Körperschall, während des Schneidprozesses erkannt.</strong>
                  Dies könnte mit einer hohen Wahrscheinlichkeit zu einem kritischen Zustand des Werkzeugs führen.
                  <strong>(89%)</strong>
                </v-card-subtitle>
                <v-card-text>
                  <strong>Notwendige Handlung:</strong>
                  <v-container class="mb-3">
                    <v-row
                      class="ml-3"
                    >Stop der Maschine und Werkzeugwechsel (Kosten: 8.000,00 EUR*)</v-row>
                  </v-container>
                  <strong>Mögliche zukünftige Handlungen:</strong>

                  <v-container class="mb-3">
                    <v-row class="ml-3">Wechsel zu Ersatzwerkzeug (Kosten: 900,00 EUR*)</v-row>
                    <v-row class="ml-3">
                      Wechsel zu einem alternativen Produkt
                      <v-container class="ml-7">
                        <v-row>Kosten Produkt B (Kosten: 4.500,00 EUR*)</v-row>
                        <v-row>Kosten Produkt C (Kosten: 5.000,00 EUR*)</v-row>
                        <v-row>Kosten Produkt D (Kosten: 7.500,00 EUR*)</v-row>
                      </v-container>
                    </v-row>
                  </v-container>
                  <strong class="mt-3">Empfohlene Handlungen:</strong>
                  <v-container class="mb-3">
                    <v-row class="ml-3">Stoppen der Maschine und Wechsel auf das Ersatzwerkzeug</v-row>
                  </v-container>
                  <strong>Geschätzte Zeit und Kosten der Empfehlung:</strong>
                  <v-container class="mb-3">
                    <v-row class="ml-3">2h, 1.000,00 EUR*</v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions class="text--caption">
                  <v-subheader>*Die hier angegebenen Kosten dienen lediglich als Platzhalter und berechnen sich im jeweiligen Einzelfall aus unternehmensinternen Daten.</v-subheader>
                </v-card-actions>
              </v-card>
            </v-container>
          </div>
          <div v-if="i===3">
            <v-row>
              <v-col>
                <v-card class="pb-7" max-width="600" height="500">
                  <LineDataStatus />
                </v-card>
              </v-col>
              <v-col>
                <v-row>
                  <strong>Produktionslinie:</strong>
                  <br />Qualität der aktuellen Vorhersage, basierend auf aktiven Sensoren: 0.85
                </v-row>

                <v-row>
                  Status Sensor (Schneiden):
                  <strong class="ml-3">OK</strong>
                </v-row>
                <v-row>
                  Status Sensor (Schneiden):
                  <strong class="ml-3">OK</strong>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Weitere Informationen</v-card-title>
        <v-card-text class="pa-3">
          Informationen zu:
          <strong>{{anomalyInfoTo? anomalyInfoTo.name:""}}</strong>
          {{anomalyInfoTo? anomalyInfoTo.description:""}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Alles klar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
//import DataStreams from "./Chart/DataStreams.vue";
import LineDataStatus from "./Chart/LineDataStatus.vue";

export default {
  components: {
    LineDataStatus
    //DataStreams
  },
  data: () => ({
    dialog: false,
    panel: 0,
    counter: 2,
    anomalyInfoTo: null,
    lightStatus: "green",
    interval: null,
    items: [
      { title: "Status" },
      { title: "Anomalien" },
      { title: "Handlungsempfehlungen" },
      { title: "Datenströme" }
    ],
    anomalieList: [
      {
        name: "Auswerfer Widerstand erhöht",
        category: 1,
        description: "Es scheint als wäre der Widerstand im Auswerfer erhöht."
      },
      {
        name: "Werkzeug laut",
        category: 1,
        description:
          "Es wurde eine erhöhte Lautstärke beim Abstreifprozess im Werkzeug festgestellt. "
      },
      {
        name: "Bandvorschub blockiert",
        category: 2,
        description: ""
      },
      {
        name: "Motor brennt",
        category: 2,
        description: "Hier könnte ihre beschreibung stehen 4"
      }
    ],
    value: [
      423,
      446,
      675,
      510,
      590,
      610,
      760,
      423,
      446,
      675,
      510,
      590,
      610,
      760
    ],
    checking: false,
    heartbeats: []
  }),
  methods: {
    red(val) {
      console.log("RED:", val);
      this.lightStatus = "red";
    },
    yellow(val) {
      console.log("YELLOW:", val);
      this.lightStatus = "yellow";
    },
    green(val) {
      console.log("GREEN:", val);
      this.lightStatus = "green";
    },
    showAlert(row) {
      this.dialog = !this.dialog;
      this.anomalyInfoTo = row;
    }
  },

  mounted() {}
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
