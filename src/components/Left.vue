<template>
  <v-card class="mx-1 mt-3" max-width="900">
    <v-row>
      <v-col class="mr-12">
        <div  v-if="picture === 'de'">
        <v-img
          class="shrink"
          contain
          src="@/assets/Feintool_de.png"
          transition="scale-transition"
          max-height="400px"
        />
        </div>
        <div v-else>
                  <v-img
          class="shrink"
          contain
          src="@/assets/Feintool_en.png"
          transition="scale-transition"
          max-height="400px"
        />
        </div>

        
      </v-col>
    </v-row>
    <v-row style="margin-top:24px">
      <v-col align="end">
        <div class="css-align" v-if="lightStatusSchneiden==='red'">
          <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        
        <p class="heading_div text--primary">
          {{ $t('process1') }}
        </p>
        <span class="css-ampel ampelrot">
            <span></span>
          </span>
        <div class="suggestion_div"><strong>{{ $t('prediction') }}</strong>&nbsp; {{ $t('prediction_wear') }} </div>
      </v-card-text>
      
    </v-card>
          
        </div>
        <div class="css-align" v-else-if="lightStatusSchneiden==='yellow'">
          <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <p class="heading_div text--primary">
          {{ $t('process1') }}
        </p>
        <span class="css-ampel ampelgelb">
            <span></span>
          </span>
                     <div class="suggestion_div"><strong>{{ $t('prediction') }}</strong> &nbsp;{{ $t('prediction_wear') }}</div>
      </v-card-text>
      
    </v-card>
          
        </div>
        <div v-else class="css-align">
          <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <p class="heading_div text--primary">
          {{ $t('process1') }}
        </p>
        <span class="css-ampel ampelgruen">
            <span></span>
          </span>
        <div class="suggestion_div"><strong> {{ $t('prediction') }}</strong>&nbsp; OK </div>
      </v-card-text>
      
    </v-card>
          
        </div>
      </v-col>
      <v-col>
        
        <div class="css-align" v-if="lightStatusAbstreifen==='red'">
        <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <p class="heading_div text--primary">
          {{ $t('process2') }}
        </p>
        <span class="css-ampel ampelrot">
            <span></span>
          </span>
        <div class="suggestion_div"><strong>{{ $t('prediction') }}</strong> &nbsp;{{ $t('prediction_wear') }} </div>
      </v-card-text>
      
    </v-card>
        </div>
        <div class="css-align" v-else-if="lightStatusAbstreifen==='yellow'">
              <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <p class="heading_div text--primary">
          {{ $t('process2') }}
        </p>
        <span class="css-ampel ampelgelb">
            <span></span>
          </span>
                     <div class="suggestion_div"><strong>{{ $t('prediction') }} </strong> &nbsp;{{ $t('prediction_wear') }}</div>
      </v-card-text>
      </v-card>
        </div>
        <div class="css-align" v-else>
          <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <p class="heading_div text--primary">
          {{ $t('process2') }}
        </p>
        <span class="css-ampel ampelgruen">
            <span></span>
          </span>
        <div class="suggestion_div"><strong> {{ $t('prediction') }} </strong> &nbsp; OK </div>
      </v-card-text>
      
    </v-card>
        </div>
      </v-col>
      
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    lightStatusSchneiden: "green",
    lightStatusAbstreifen: "green",
    lightStatusCombined: "red",
    lightCounter :0,
    curr_abstreifen_val:0,
    curr_schneiden_val:0,
    abstreifen_data : [1.61,1.68,1.77,1.75,1.75,1.87,1.85,1.8,1.98,1.97,1.98,2.06,2.07,2.08,2.07,2.17,2.18,2.13,2.22,2.09,2.19,2.28,2.35,2.33,2.35,2.45,2.52,2.48,2.71,2.82,2.56,2.61,2.62,2.62],
    schneiden_data : [1.58,	1.65,	1.67,	1.67,	1.67,	1.78,	1.7,	1.64,	1.8,	1.73,	1.61,	1.76,	1.79,	1.78,	1.79,	1.9,	1.87,	1.8,	1.98,	1.95,	1.95,	2,	2.05,	2.05,	2.38,	2.85,	3.22,	4.33,	3.82,	5.38,	2.34,	2.41,	2.32,	2.26],
    picture: "de"
  }),
  methods: {
    timer() { 
      this.curr_abstreifen_val = this.abstreifen_data[this.lightCounter];
      this.curr_schneiden_val = this.schneiden_data[this.lightCounter];
      //curr_combine_val = this.combine_data[this.lightCounter];
      if(this.curr_abstreifen_val>2.53){
        this.lightStatusAbstreifen = "red";
      }
      else{
        this.lightStatusAbstreifen = "green";
      }

      if(this.curr_schneiden_val < 2){
        this.lightStatusSchneiden = "green";
      }
      else {
        this.lightStatusSchneiden = "red";
      }
      
      this.lightCounter++;
      if(this.lightCounter>32){
        this.lightCounter = 0;
      }
/*
      if(this.lightCounter==0) {
        this.lightStatusSchneiden = "green";
        this.lightStatusAbstreifen = "green";
        this.lightCounter++;
      } else if (this.lightCounter == 1) {
        this.lightStatusSchneiden = "red";
        this.lightStatusAbstreifen = "green";
        this.lightCounter++;
      }
      else if (this.lightCounter == 2) {
        this.lightStatusSchneiden = "red";
        this.lightStatusAbstreifen = "yellow";
        this.lightCounter++;
      } else {
        this.lightStatusSchneiden = "green";
        this.lightStatusAbstreifen = "green";
        this.lightCounter++;
      }
*/      
    }
  },
  mounted() {
    this.interval = setInterval(this.timer, 1000);
    if (localStorage.getItem("locale") === "en") {
      this.picture = 'en';
    }
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

.heading_div {
  font-size: 26px;
  font-weight:600;
}
.css-align {
  text-align: center;
}
.suggestion_div{
font-weight: 600;
    font-size: 16px;
}
</style>
