import { Just, Nothing, Writer, toOption, Left, Right } from "../src";

describe("Functional Programming Monads Tests", () => {
  test("Option: Just Test", () => {
    expect(
      Just.of(10).caseOf(
        () => null,
        (val) => val + 2
      )
    ).toBe(12);
  });

  test("Option: Nothing Test", () => {
    expect(
      Nothing.get().caseOf(
        () => true,
        (_) => false
      )
    ).toBe(true);
  });

  test("Option: To Option", () => {
    expect(toOption(10).value).toBe(10);
  });

  test("Either: Right Test", () => {
    expect(Right.of(10).map((val) => val + 2).value).toBe(12);
  });

  test("Either: Left Test", () => {
    const error = Error("Left error");
    expect(Left.of(error).bind((val) => Right.of(val)).value).toBe(error);
  });

  test("Writer: Test", () => {
    const w = new Writer<number, number>(1, [1]).map((x) => x+1)
                .bind((x) => new Writer(2, [2]))
    expect(w.collected()[0] + w.collected()[1]).toBe(3);
  })


});
