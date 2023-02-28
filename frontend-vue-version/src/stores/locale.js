import { defineStore } from "pinia";
import jwtService from "@/common/services/jwt.service";
import i18n from "@/i18n/i18n";

const locale = defineStore("locale", {
  state: () => ({
    locale: jwtService.getLocale() ?? "br",
  }),
  getters: {
    currentLocale: (state) => state.locale,
  },
  actions: {
    changeLocale() {
      this.locale = this.locale === "br" ? "en" : "br";
      jwtService.setLocale(this.locale);
      i18n.global.locale = this.locale;
    },
  },
});

export default locale;
