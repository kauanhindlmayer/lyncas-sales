import { createI18n } from "vue-i18n";
import en from "@/i18n/en.json";
import pt from "@/i18n/pt-br.json";

export default createI18n({
  locale: "en",
  fallbackLocale: "pt-BR",
  messages: {
    en,
    pt,
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    "pt-BR": {
      currency: {
        style: "currency",
        currency: "R$",
      },
    },
  },
});
