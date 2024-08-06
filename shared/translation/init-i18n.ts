import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "@/shared/translation/en";

i18next.use(initReactI18next).init({
  // debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  ns: [],
  resources: {
    en,
  },
});

export default i18next;
