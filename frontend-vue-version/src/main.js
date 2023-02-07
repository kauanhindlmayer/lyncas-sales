import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./plugins/validation";
import progressBar from "./plugins/progress-bar";
import PrimeVue from "primevue/config";
import Paginator from "primevue/paginator";
import Column from "primevue/column";
import Button from "primevue/button";
import DataTable from "primevue/datatable";

import "./assets/css/main.css";
import "nprogress/nprogress.css";
// import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css ";

progressBar(router);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VeeValidatePlugin);
app.use(PrimeVue);

app.component("Paginator", Paginator);
app.component("Column", Column);
app.component("AppButton", Button);
app.component("DataTable", DataTable);

app.mount("#app");
