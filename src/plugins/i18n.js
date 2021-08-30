import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


const messages = {
    'de': {
        "title": "Verschleißprognose beim Feinschneiden"
    },
    'en': {
        'title': 'Wear prediction in fine blanking'
    },
};


export default new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'de', // set fallback locale
    messages, // set locale messages
});

