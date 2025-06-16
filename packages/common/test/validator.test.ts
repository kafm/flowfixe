import {
  StringField,
  IntegerField,
  NumberField,
  BooleanField,
  DateField,
  EmailField,
  validateObject,
} from "../src/validator";

describe("Field validation Tests", () => {
  test("Validate required", () => {
    expect(
      validateObject(
        StringField.of("string").value("test").required(),
        EmailField.of("email").value("test@test.com").required(),
        BooleanField.of("bool").value("true").required(),
        BooleanField.of("bool").value("false").required(),
        BooleanField.of("bool2").value(false).required(),
        BooleanField.of("bool3").value(true).required(),
        IntegerField.of("int").value("2").required(),
        IntegerField.of("int1").value(2).required(),
        NumberField.of("number").value("0.2").required(),
        NumberField.of("number1").value(0.2).required(),
        DateField.of("date").value("2023-07-27").required(),
        DateField.of("date1").value(new Date()).required(),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate match regex", () => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    expect(
      validateObject(
        StringField.of("string").value("test@test.com").match(reg),
        StringField.of("string").match(reg),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate min length", () => {
    expect(
      validateObject(
        StringField.of("string").value("test").minLength(4),
        EmailField.of("email").value("test@test.com").minLength(12),
        StringField.of("string1").minLength(4),
        EmailField.of("email1").minLength(12),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate max length", () => {
    expect(
      validateObject(
        StringField.of("string").value("test").maxLength(4),
        EmailField.of("email").value("test@test.com").maxLength(13),
        StringField.of("string1").maxLength(4),
        EmailField.of("email1").maxLength(12),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate min value", () => {
    expect(
      validateObject(
        IntegerField.of("int").value(4).min(4),
        NumberField.of("number").value(0.5).min(.5),
        IntegerField.of("int1").min(3),
        NumberField.of("number").min(12),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate max value", () => {
    expect(
      validateObject(
        IntegerField.of("int").value(4).min(4),
        NumberField.of("number").value(0.5).min(.5),
        IntegerField.of("int1").min(3),
        NumberField.of("number").min(12),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate min date", () => {
    const date = new Date()
    expect(
      validateObject(
        DateField.of("date").value(date).min(date),
        DateField.of("date1").min(date),
      ).isLeft()
    ).toBe(false);
  });

  test("Validate max date", () => {
    const date = new Date()
    expect(
      validateObject(
        DateField.of("date").value(date).max(date),
        DateField.of("date1").max(date),
      ).isLeft()
    ).toBe(false);
  });

});
