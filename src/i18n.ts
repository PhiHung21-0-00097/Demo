import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import commonVI from "../public/locales/vi/common.json";
import commonEN from "../public/locales/en/common.json";

export enum LocaleEnum {
  VI = "vi",
  EN = "en",
}

i18next.use(initReactI18next).init({
  fallbackLng: LocaleEnum.VI,
  lng: LocaleEnum.VI, // mặc định
  interpolation: { escapeValue: false },
  resources: {
    vi: {
      common: commonVI,
    },
    en: {
      common: commonEN,
    },
  },
});

export default i18next;
