import Vue from "vue";
import App from "./App.vue";
import "./assets/scss/tailwind.css";
import "./assets/scss/index.css";

import {
  FormPlugin,
  FormSelectPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormFilePlugin,
  ButtonPlugin,
  CardPlugin,
} from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(FormPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormFilePlugin);
Vue.use(ButtonPlugin);
Vue.use(CardPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
