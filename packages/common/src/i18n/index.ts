import en from "./en";
import fr from "./fr";
import pt from "./pt";
import { Locale, Translator } from "./translator";

export { Translator, type Locale } from "./translator";

export const locales = [en, fr, pt];

export const translator = Translator.of(...locales);

export const getTranslator = (...locales: Locale[]) => translator.merge(...locales);