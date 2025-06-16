import { isString } from "../validator";
import Polyglot from "node-polyglot";

export type I18NMessage = {
  phrase: string;
  data?: object;
};

export type Message = I18NMessage | string;

export interface Locale {
  lang: string;
  entries: object;
}

export class Translator {
  lang: string = "en";
  constructor(readonly locales: Map<string, Polyglot>) {}

  static of(...locales: Locale[]): Translator {
    const localeMap = new Map<string, Polyglot>();
    locales?.forEach(locale => localeMap.set(
      locale.lang, 
      new Polyglot({ 
        phrases: locale.entries, 
        locale: locale.lang
      })
    ));
    return new Translator(localeMap);
  }

  private getLocale(lang: string):Polyglot | undefined {
    const locale = this.locales.get(lang || this.lang);
    if(!locale && lang?.length > 2) {
      const replacement = this.getLocale(lang.substring(0,2));
      replacement && this.locales.set(lang, replacement);
    }
    return locale;
  }

  merge(...locales: Locale[]): Translator {
    locales?.forEach(locale => {
      const previousLocale = this.getLocale(locale.lang);
      if(previousLocale) {
        previousLocale.extend(locale.entries)
      } else {
        this.locales.set(
          locale.lang, 
          new Polyglot({ 
            phrases: locale.entries, 
            locale: locale.lang
          })
        );
      }
    });
    return this;
  }

  private geTranslation(lang: string):Polyglot | undefined {
    const translation = this.locales.get(lang || this.lang);
    if(!translation && lang?.length > 2) {
      const replacement = this.geTranslation(lang.substring(0,2));
      replacement && this.locales.set(lang, replacement);
    }
    return translation;
  }

  translate(message: Message, lang: string | null = null): string {
    const translator = this.geTranslation(lang || this.lang);
    const phrase =  (isString(message) ? message : (message as any)?.phrase) || "";
    const data =(message as I18NMessage)?.data;
    if (translator) 
      return translator.t(phrase, data);
    return phrase;
  }

  translateMany(messages: Message[], lang: string | null = null): string[] {
    return messages.map((message) =>
      this.translate(message, lang || this.lang)
    );
  }

  withLang(lang: string): Translator {
    this.lang = lang;
    return this;
  }
}
