import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "./styles/main.less";
import "./styles/rem.less";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;

import router from "./router/router";

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
