import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/firebase/';
import VueSVGIcon from 'vue-svgicon'

Vue.config.productionTip = false;
Vue.use(VueSVGIcon);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
