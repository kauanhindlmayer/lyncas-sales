import PrimeVue from "primevue/config";
import Paginator from "primevue/paginator";
import Column from "primevue/column";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css ";

export default {
  install(app) {
    app.use(PrimeVue);

    app.component("Paginator", Paginator);
    app.component("Column", Column);
    app.component("AppButton", Button);
    app.component("DataTable", DataTable);
    app.component("Password", Password);
    app.component("TheInputMask", InputMask);
    app.component("TheInputText", InputText);
    app.component("Dropdown", Dropdown);
  },
};
