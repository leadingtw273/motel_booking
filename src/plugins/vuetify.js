import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader
import '@/assets/styles/app.styl';

Vue.use(Vuetify, {
    iconfont: 'md || fa',
    theme: {
        primary: colors.blueGrey.base,
        secondary: colors.blueGrey.lighten3,
        accent: colors.indigo.base,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
        black: colors.shades.black,
        grey: colors.grey.base
    }
});
