import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css ";

export default {
  install(app) {
    app.use(PrimeVue);

    app.component("DataTable", DataTable);
    app.component("Column", Column);
    app.component("Paginator", Paginator);
  },
};
