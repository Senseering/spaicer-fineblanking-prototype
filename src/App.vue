<template>
  <v-app>
    <v-app-bar app color="white" class="elevation-1">
      <v-btn class="mx-0" text href="https://spaicer.de" target="_blank">
      <!--  <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/spaicer.png"
          transition="scale-transition"
          width="120"
        />-->
      </v-btn>
      <v-spacer></v-spacer>
      <div class="text-h5" v-if="!$vuetify.breakpoint.mobile">
        <strong>{{ $t('title') }}</strong>
      </div>
      <v-spacer></v-spacer>
      <!--<v-img
        alt="Vuetify Logo"
        class="shrink ma-2"
        contain
        src="@/assets/bmwi.png"
        transition="scale-transition"
        max-width="120"
      />-->
    </v-app-bar>
    <v-main>
      <v-container fluid justify="center">
        <v-row no-gutters justify="center">
          <v-col>
            <Left class="mx-auto" />
          </v-col>
          <v-col>
            <Right class="mx-auto" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-spacer />
     <!-- <v-btn text small href="https://www.wzl.rwth-aachen.de/go/id/sijq/?lidx=1" target="_blank">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="@/assets/WZL_Logo.png"
          transition="scale-transition"
          width="100"
        />
      </v-btn>
      <v-btn text small href="https://www.feintool.com/en/" target="_blank">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="@/assets/logo_feintool.png"
          transition="scale-transition"
          width="70"
        />
      </v-btn>
      <v-btn text small href="https://dfki.de" target="_blank">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="@/assets/logo_dfki.png"
          transition="scale-transition"
          width="70"
        />
      </v-btn>
      <v-btn text small href="https://senseering.de" target="_blank">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="@/assets/se_logo.png"
          transition="scale-transition"
          width="100"
        />
      </v-btn>-->
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed class="mr-auto" small v-bind="attrs" v-on="on">
            <v-icon class="mr-2" small>language</v-icon>
            <span v-if="!$vuetify.breakpoint.mobile">{{languages[selectedLanguage].title}}</span>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group v-model="selectedLanguage" color="primary">
            <v-list-item v-for="(language, id) in languages" :key="id">
              <v-list-item-title>{{ language.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
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

  mounted() {
    this.selectedLanguage = this.languages.findIndex(
      v => this.$root.$i18n.locale === v.id
    );
  },

  watch: {
    async selectedLanguage(val) {
      this.$root.$i18n.locale = this.languages[val].id;
      this.$vuetify.lang.current = this.$root.$i18n.locale;
      localStorage.setItem("locale", this.$root.$i18n.locale);
    }
  },

  data: () => ({
    selectedLanguage: "en",

    languages: [
      { id: "de", title: "Deutsch" },
      { id: "en", title: "English (US)" }
    ],
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ]
  })
};
</script>
