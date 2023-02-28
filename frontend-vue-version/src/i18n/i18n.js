import { createI18n } from "vue-i18n";
import { en } from "@/i18n/en.js";
import { br } from "@/i18n/pt-br.js";
import jwtService from "@/common/services/jwt.service";

export default createI18n({
  locale: jwtService.getLocale(),
  fallbackLocale: "br",
  messages: {
    en,
    br,
  },
});
