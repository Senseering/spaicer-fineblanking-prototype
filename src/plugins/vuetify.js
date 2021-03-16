import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#32aadc',
                secondary: '#6fcff7',
                accent: '#e61a73',
                error: '#b71c1c',
            },
        },
    },
});
