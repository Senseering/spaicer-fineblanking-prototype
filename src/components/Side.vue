<template>
  <v-card>
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
                  <div v-if="counter===0">
                    <span class="css-ampel ampelrot">
                      <span></span>
                    </span>
                  </div>
                  <div v-else-if="counter===1">
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
                  <div v-else>Alles gut</div>
                </v-col>
              </v-row>
            </v-card>
            <v-row>
              <v-col>Hier Erklärung einfügen für die Beschreibung einer relevanten KPI, welche eine Bewertung des Prozesses ermöglicht</v-col>
              <v-col>
                <v-card class="mt-3" max-height="300">
                  <v-card-text>
                    <v-sheet>
                      <v-sparkline
                        :value="value"
                        color="secondary"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                      >
                        <template v-slot:label="item">{{ item.value }}</template>
                      </v-sparkline>
                    </v-sheet>
                  </v-card-text>
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
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td v-if="item.category=== 1">
                      <v-icon color="yellow">warning</v-icon>
                    </td>
                    <td v-if="item.category=== 2">
                      <v-icon color="error">error</v-icon>
                    </td>
                    <td>
                      <v-btn text small @click="showAlert" color="primary">
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
              <v-row>
                <v-col>
                  <v-img
                    alt="Vuetify Logo"
                    class="shrink ma-2"
                    contain
                    src="@/assets/motor.png"
                    transition="scale-transition"
                    width="120"
                  />
                </v-col>
                <v-col>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis commodo metus. In in fringilla nisi. Suspendisse potenti. Quisque lobortis purus ac nisi eleifend, sit amet commodo nisi imperdiet. Suspendisse vitae ultricies nisl, nec porttitor tortor. Pellentesque consectetur varius augue ut feugiatuada libero eleifend ut. Suspendisse vol</v-col>
              </v-row>
              <v-row>
                <v-col>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis commodo metus. In in fringilla nisi. Suspendisse potenti. Quisque lobortis purus ac nisi eleifend, sit amet commodo nisi imperdiet. Suspendisse vitae ultricies nisl, nec porttitor tortor. Pellentesque consectetur varius augue ut feugiatuada libero eleifend ut. Suspendisse vol</v-col>
                <v-col>
                  <v-img
                    alt="Vuetify Logo"
                    class="shrink ma-2"
                    contain
                    src="@/assets/werkzeug.png"
                    transition="scale-transition"
                    width="100"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="i===3">
            <v-row>
              <v-col>
                <v-card class max-width="600" height="100%">
                  <v-card-text>
                    <v-sheet>
                      <v-sparkline
                        :value="value"
                        color="secondary"
                        height="200"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                      >
                        <template v-slot:label="item">{{ item.value }}</template>
                      </v-sparkline>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis commodo metus. In in fringilla nisi. Suspendisse potenti. Quisque lobortis purus ac nisi eleifend, sit amet commodo nisi imperdiet. Suspendisse vitae ultricies nisl, nec porttitor tortor. Pellentesque consectetur varius augue ut feugiat. Maecenas eget ultrices ante, tempor euismod nisi. Integer placerat efficitur orci, ac malesuada libero eleifend ut. Suspendisse volutpat sodales augue, sit amet commodo quam gravida nec. Integer bibendum tincidunt lacus, id molestie nulla suscipit ullamcorper. Vivamus accumsan, nisi eu sagittis interdum, elit eros cursus lorem, nec semper massa ante vel nunc. Donec rutrum diam orci, in dignissim nulla aliquam feugiat.</v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">Weitere Informationen</v-card-title>

        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

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
export default {
  data: () => ({
    dialog: false,
    panel: 0,
    counter: 1,
    interval: null,
    items: [
      { title: "Status" },
      { title: "Annomalien" },
      { title: "Handlungsempfehlungen" },
      { title: "Datenströme" }
    ],
    desserts: [
      {
        name: "Auswerfer Widerstand erhöht",
        category: 1
      },
      {
        name: "Werkzeug laut",
        category: 1
      },
      {
        name: "Motor X dreht zu schnell ",
        category: 2
      },
      {
        name: "Motor Y brennt",
        category: 2
      }
    ],
    value: [423, 446, 675, 510, 590, 610, 760,423, 446, 675, 510, 590, 610, 760],
    checking: false,
    heartbeats: []
  }),
  methods: {
    showAlert() {
      this.dialog = !this.dialog;
    },
    timer() {
     
      this.value.push(Math.floor(Math.random()*100 +400))
      this.value.splice(0,1)
      if(this.value[this.value.length-1]>480){
        this.counter = 2
      }else if(this.value[this.value.length-1]>450){
        this.counter = 1
      }else{
        this.counter = 0
      }

    }
  },

  mounted() {
    this.interval = setInterval(this.timer, 1000);
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
