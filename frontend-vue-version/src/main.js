import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import VeeValidatePlugin from "@/plugins/validation";
import progressBar from "@/plugins/progress-bar";
import PrimeVue from "@/plugins/prime-vue";

import "@/assets/css/main.css";
import "nprogress/nprogress.css";

progressBar(router);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VeeValidatePlugin);
app.use(PrimeVue);

app.mount("#app");
