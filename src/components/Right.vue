<template>
  <v-card class="mx-1" max-width="900">
    <v-expansion-panels v-model="panel">
      <v-expansion-panel v-for="(item,i) in items" :key="i">
        <v-expansion-panel-header style="background-color:lightgray">
          <strong>{{item.title}}</strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="margin-top:16px">
          <div v-if="i===0">
            <v-card flat>
              <v-row >
          
                <v-col md="11">
                  <div v-if="lightStatus === 'red'">
                        <v-card
      class="mx-auto"
     
    >
      <v-card-text>
        <p class="heading_div text--primary">
          Status Werkzeug
        </p>
        <v-container>
        
        <v-row>
        <v-col md="4">
        <span class="css-ampel ampelrot span_style">
            <span></span>
          </span>
        </v-col>
         <v-col md="8" >
                <v-row class="pt-7 status_details">
                  Aktueller Lauf:
                  <strong class="ml-3">OK</strong>
                </v-row>
                <v-row class="pt-7 status_details">
                  Status Vorhersage:
                  <strong class="ml-3">kritischer Verschleiß</strong>
                </v-row>
                               <v-row class="pt-7 ">
                  <strong class="action_status"> Handlung empfohlen:  </strong>
                </v-row><v-row class="pt-1 action_recommend"> Kritischer globaler Verschleiß prognostiziert. Werkzeugwartung notwendig
                       </v-row>

              </v-col>
            </v-row>
            </v-container>
      </v-card-text>
      
    </v-card>
      
                  </div>
                  <div v-else-if="lightStatus === 'yellow'">
                      <v-card
      class="mx-auto"
      
    >
      <v-card-text>
        <p class="heading_div text--primary">
          Status Werkzeug
        </p>
        <v-row>
          <v-col md="4">
        <span class="css-ampel ampelgelb span_style">
            <span></span>
          </span>
          </v-col>
                  <v-col md="8">
                <v-row class="pt-7 status_details">
                  Aktueller Lauf:
                  <strong class="ml-3">OK</strong>
                </v-row>
                <v-row class="pt-7 status_details">
                  Status Vorhersage:
                  <strong class="ml-3">Leichter Verschleiß</strong>
                </v-row>
                                <v-row class="pt-7 ">
                  <strong class="action_status"> Handlung empfohlen:  </strong>
                </v-row><v-row class="pt-1 action_recommend">  Leichter globaler Verschleiß prognostiziert. Werkzeugwartung möglicherweise bald erforderlich.
                       </v-row>

              </v-col>
         
        </v-row>
      </v-card-text>
      
    </v-card>
        
                  </div>
                  <div v-else>
                      <v-card
      class="mx-auto"

    >
      <v-card-text>
        <p class="heading_div text--primary">
          Status Werkzeug
        </p>
        <v-row>
          <v-col md="4">
        <span class="css-ampel ampelgruen span_style">
            <span></span>
          </span>
          </v-col>
        <v-col md="8">
                <v-row class="pt-7 status_details">
                  Aktueller Lauf:
                  <strong class="ml-3">OK</strong>
                </v-row>
                <br />
                <v-row class="pt-7 status_details">
                  Status Vorhersage:
                  <strong class="ml-3">OK</strong>
                </v-row>
                <v-row class="pt-7 ">
                  <strong class="action_status"> Handlung empfohlen:  </strong>
                </v-row><v-row class="pt-1 action_recommend">  Kein Handeln notwendig
                       </v-row>
              </v-col>
         </v-row>
      </v-card-text>
      
    </v-card>
        
                  </div>
                </v-col>
                
              </v-row>
            </v-card>
            <v-row class="pt-8">
              <!--<v-col>
                <v-card flat height="300" class="pb-3">
                  <LineDataStatus @red="red" @yellow="yellow" @green="green" />
                </v-card>
              </v-col>-->
            </v-row>
          </div>
          <div v-if="i===1">
            <v-row>
              <v-col md="6">
                <v-row style="margin-left:4px"><strong>Schneiden</strong></v-row>
                <v-row class="pt-6"></v-row>                
            <v-card flat height="300" class="pb-3">
                  <LineDataStatusAnamolySchneiden @red="red" @yellow="yellow" @green="green" />
                </v-card>
              </v-col>
              <v-col md="6">
                <v-row style="margin-left:4px"><strong>Abstreifen</strong></v-row>
                <v-row class="pt-6"></v-row>                
            <v-card flat height="300" class="pb-3">
                  <LineDataStatusAnamolyAbstreifen @red="red" @yellow="yellow" @green="green" />
                </v-card>
              </v-col>
              
            </v-row>
                <v-col height="50">
                </v-col>
                
                <v-col>
                <v-row class="pt-4 status_details">
                  &nbsp;
                </v-row>
                <v-row class="pt-4 status_details">
                  &nbsp;
                </v-row>

                <v-row class="pt-4 status_details">
                  &nbsp;
                </v-row>
                <v-row class="pt-8 ">
                  <strong class="action_status"> Handlung empfohlen:  </strong>
                </v-row><v-row class="pt-1 action_recommend"> Globaler Verschleiß prognostiziert, Werkzeugwartung erforderlich. 
                </v-row>
              </v-col>
            <!--<v-simple-table fixed-header>
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

            </v-simple-table>-->
          </div>
          <div v-if="i===2">
            <v-container justify="center" align="center">
              <v-card outlined>
                <v-card-title>Globaler Verschleiß prognostiziert</v-card-title>
                <v-card-text>
                  <strong>Prozess Schneiden:</strong>
                  <v-container class="mb-3">
                    <v-row
                      class="ml-3"
                    >Kritischer Verschleiß anhand des Körperschall-Signals prognostiziert</v-row>
                  </v-container>
                  <strong>Prozess Abstreifen:</strong>
                  <v-container class="mb-3">
                    <v-row
                      class="ml-3"
                    >Leichter lokaler Verschleiß anhand des Körperschall-Signals prognostiziert.</v-row>
                  </v-container>
                  <strong>Status Werkzeug:</strong>
                  <v-container class="mb-3">
                    <v-row
                      class="ml-3"
                    >Kritischer Zustand des Werkzeugs prognostiziert ( <strong> Wahrscheinlichkeit: 89%</strong>)</v-row>
                  </v-container>
                  
                  
                  
                  <strong>Notwendige Handlung:</strong>
                  <v-container class="mb-3">
                    <v-row
                      class="ml-3"
                    >Stop der Maschine und Werkzeugwechsel (Kosten: 8.000,00 EUR)</v-row>
                  </v-container>
                  <strong>Mögliche zukünftige Handlungen:</strong>

                  <v-container class="mb-3">
                    <v-row class="ml-3">Wechsel zu Ersatzwerkzeug (Kosten: 900,00 EUR)</v-row>
                    <v-row class="ml-3">
                      Wechsel zu einem alternativen Produkt
                      <v-container class="ml-7">
                        <v-row>Kosten Produkt B (Kosten: 4.500,00 EUR)</v-row>
                        <v-row>Kosten Produkt C (Kosten: 5.000,00 EUR)</v-row>
                        <v-row>Kosten Produkt D (Kosten: 7.500,00 EUR)</v-row>
                      </v-container>
                    </v-row>
                  </v-container>
                  <strong class="mt-3">Empfohlene Handlungen:</strong>
                  <v-container class="mb-3">
                    <v-row class="ml-3">Stoppen der Maschine und Wechsel auf das Ersatzwerkzeug</v-row>
                  </v-container>
                  <strong>Geschätzte Zeit und Kosten der Empfehlung:</strong>
                  <v-container class="mb-3">
                    <v-row class="ml-3">2h, 1.000,00 EUR</v-row>
                  </v-container>
                </v-card-text>
                
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
import LineDataStatusAnamolyAbstreifen from "./Chart/LineDataStatusAnamolyAbstreifen.vue";
import LineDataStatusAnamolySchneiden from "./Chart/LineDataStatusAnamolySchneiden.vue";
export default {
  components: {
    LineDataStatus,
    //DataStreams
    LineDataStatusAnamolyAbstreifen,
    LineDataStatusAnamolySchneiden,
  },
  data: () => ({
    dialog: false,
    panel: 0,
    counter: 2,
    anomalyInfoTo: null,
    lightStatus: "green",
    lightCounter:0,
    interval: null,
    interval_1 : null,
    combine_data : [1.76,	1.63,	1.6,	1.79,	1.72,	1.83,	1.67,	1.91,	2.03,	2.04,	2,	2.01,	2.03,	1.99,	1.63,	1.56,	1.89,	1.9,	1.92,	1.66,	1.74,	1.98,	1.9,	2.19,	2.57,	2.87,	4.19,	3.18,	4.65,	2.93,	2.09,	2.19,	2.64],
    curr_combine_val:0,
    anamolyDetectedMatrix : [0.86,	0.85,	0.79,	0.83,	0.98,	0.94,	0.8,	0.87,	0.83,	0.99,	0.83,	0.93,	0.95,	0.93,	0.93,0.89,	0.97,	0.91,	0.84,	0.94,	0.88,	0.81,	0.76,	0.87,	0.76,	0.86,	0.85,	0.79,	0.83,	0.98,	0.94,	0.8,	0.87,	0.83, 0.99,	0.83,	0.93,	0.95,	0.93,	0.93,	0.89,	0.97,	0.91,	0.84,	0.94,	0.88,	0.81,	0.76,	0.87,	0.76,	0.86,	0.85,	0.79,0.83,	0.98,	0.94,	0.8,	0.87,	0.83,	0.99,	0.83,	0.93,	0.95,	0.93,	0.93,	0.89,	0.97,	0.91,	0.84,	0.94,	0.88,	0.81,0.76,	0.87,	0.76,	0.86,	0.85,	0.79,	0.83,	0.98,	0.94,	0.8,0.87,	0.83,	0.99,	0.83,	0.93,	0.95,	0.93,	0.93,	0.89,0.97,	0.91,	0.84,	0.94,	0.88,	0.81,	0.76,	0.87,	0.76],
    anamolyIndex : 0,
    anamolyMetricValue:0.86,
    items: [
      { title: "Status Feinschneiden" },
      { title: "Verschleiß" },
      { title: "Handlungsempfehlungen" }
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
    },
    timerAnamolyMatrix() {
      if(this.anamolyIndex > this.anamolyDetectedMatrix.length-1){
        this.anamolyIndex = 1
      }
      this.anamolyMetricValue = this.anamolyDetectedMatrix[this.anamolyIndex++];
      
    },
    timer() { 
      this.curr_combine_val = this.combine_data[this.lightCounter];

      if(this.curr_combine_val<2.08){
        this.lightStatus = "green";
      }
      else if(this.curr_combine_val>2.08){
        this.lightStatus = "red";
      }

      else {
        this.lightStatus = "yellow";
      }
      
      this.lightCounter++;
      if(this.lightCounter>32){
        this.lightCounter = 0;
      }
    }
  },

  mounted() {
      this.interval = setInterval(this.timer, 1000);
      this.interval_1 = setInterval(this.timerAnamolyMatrix, 1000);
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

.span_style{
  margin-left:60px;
}
.status_details{
  font-size: 20px ;
  
}
.heading_div {
  font-size: 26px;
  font-weight:600;
}
.action_recommend{
  font-size:20px; 
}
.action_status{
  font-size:20px
}
</style>
