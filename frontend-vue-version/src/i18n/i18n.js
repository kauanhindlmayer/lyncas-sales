import { createI18n } from "vue-i18n";
import { en } from "@/i18n/en.js";
import { br } from "@/i18n/pt-br.js";

export default createI18n({
  locale: "en",
  fallbackLocale: "br",
  messages: {
    en,
    br,
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    br: {
      currency: {
        style: "currency",
        currency: "R$",
      },
    },
  },
});
