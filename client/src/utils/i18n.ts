import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      News: "News",
      Profile: "Profile",
      en: "Eng",
      ua: "Ua",
      NewsSite: "News site",
      Login: "Login",
      Logout: "Logout",
    },
  },
  ua: {
    translation: {
      News: "Новини",
      Profile: "Профайл",
      en: "Англ",
      ua: "Укр",
      NewsSite: "Сайт новин",
      Login: "Логін",
      Logout: "Вийти",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
