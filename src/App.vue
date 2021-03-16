<template>
  <v-app>
    <v-app-bar app color="transparent" class="elevation-1">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/spaicer.png"
          transition="scale-transition"
          width="120"
        />
      </div>
      <v-spacer></v-spacer>
      <div
        class="text-h5"
        v-if="!$vuetify.breakpoint.mobile"
      >Anomalie-Erkennung beim Feinschneiden zur Verschleißprognose</div>
      <v-spacer></v-spacer>
      <v-img
        alt="Vuetify Logo"
        class="shrink ma-2"
        contain
        src="@/assets/bmwi.png"
        transition="scale-transition"
        max-width="120"
      />
    </v-app-bar>
    <v-main>
      <v-container ill-height fluid>
        <v-row justify="center">
          <v-col>
            <v-spacer />
            <Left />
            <v-spacer />
          </v-col>
          <v-col>
            <v-spacer />
            <Right />
            <v-spacer />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-spacer />
      <v-btn depressed small href="https://spaicer.de" target="_blank">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/spaicer.png"
          transition="scale-transition"
          width="100"
        />
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import Left from "./components/Left.vue";
import Right from "./components/Right.vue";

export default {
  name: "App",

  components: {
    Left,
    Right
  },

  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ]
  })
};
</script>
