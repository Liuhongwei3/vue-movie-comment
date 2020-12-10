import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueLazyLoad from "vue-lazyload";

import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";

import "./element";

Vue.use(VueLazyLoad, {
  preLoad: 1.2,
  attempt: 3,
  loading: require("@/assets/loading.gif"),
  error: require("@/assets/404.jpg"),
});

Vue.use(Viewer, {
  defaultOptions: { zIndex: 9999, title: false, movable: false },
});

Vue.config.devtools = true;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
