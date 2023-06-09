import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import progressBar from "@/plugins/progress-bar";
import PrimeVue from "@/plugins/prime-vue";
import i18n from "@/i18n/i18n.js";

import "@/assets/scss/style.scss";
import "nprogress/nprogress.css";

progressBar(router);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(i18n);

app.mount("#app");
