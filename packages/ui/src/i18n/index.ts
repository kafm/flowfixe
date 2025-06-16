import en from "./en";
import fr from "./fr";
import pt from "./pt";
import { getTranslator as _getTranslator } from "@flowfixe/common";

const locales = [en, fr, pt];
const translator = _getTranslator().merge(...locales);

export const getLang = () => {
  let lang = undefined;
  try {
     lang = document.body.getAttribute("lang") || document.documentElement.getAttribute("lang") || navigator.language;
  } catch(e) {}
  return lang || "en";
}

export const setLang = (lang: string) => {
  translator.withLang(lang);
  document.body.setAttribute("lang", lang);
}

export const assertLang = () => setLang(getLang());

export const translate = (message: string, data?: any) =>
  translator.translate({ phrase: message, data }, getLang());

export { Translator, getTranslator , type Locale } from "@flowfixe/common";


