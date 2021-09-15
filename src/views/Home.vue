<template>
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
</template>

<script>
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";

export default {
  name: "App",

  components: {
    Left,
    Right
  },
  mounted() {
    if (!localStorage.getItem("locale")) {
      localStorage.setItem("locale", "en");
    }
    this.selectedLanguage = this.languages.findIndex(
      v => localStorage.getItem("locale") === v.id
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
