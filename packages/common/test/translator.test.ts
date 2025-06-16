import { Translator } from "../src";

describe("Test translation", () => {
  test("Test translation defaults", () => {
    const locale = { lang: "en", entries: { test: "This is a test" } };
    expect(Translator.of(locale).translate({ phrase: "test" })).toBe(
      locale.entries.test
    );
  });
  test("Test translation without arguments", () => {
    const locale = { lang: "en", entries: { test: "This is a test" } };
    expect(Translator.of(locale).translate({ phrase: "test" }, "en")).toBe(
      locale.entries.test
    );
  });
  test("Test translation of many", () => {
    const str = "This is a test";
    const name = "Acme";
    const locale = { lang: "en", entries: { test: `${str} %{name}` } };
    expect(
      Translator.of(locale).translate({ phrase: "test", data: { name } }, "en")
    ).toBe(`${str} ${name}`);
  });
  test("Test bulk translation", () => {
    const locale = { lang: "en", entries: { test: "This is a test" } };
    expect(
      Translator.of(locale).translateMany(
        [{ phrase: "test" }, { phrase: "test" }],
        "en"
      )
    ).toStrictEqual([locale.entries.test, locale.entries.test]);
  });
  test("Test literal", () => {
    const locale = { lang: "en", entries: { test: "This is a test" } };
    expect(Translator.of(locale).translate("test")).toStrictEqual(locale.entries.test);
  });
});
