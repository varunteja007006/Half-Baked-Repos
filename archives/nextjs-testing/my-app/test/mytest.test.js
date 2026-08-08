import { add } from "@/utils/utils";

describe("Basic Math Operations", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});

describe("Invalid Input Handling", () => {
  test("should throw error when adding string and number", () => {
    expect(() => add("a", 2)).toThrow("Both arguments must be numbers");
  });

  test("should throw error when adding undefined values", () => {
    expect(() => add(undefined, 2)).toThrow("Both arguments must be numbers");
  });

  test("should throw error when adding null values", () => {
    expect(() => add(null, 2)).toThrow("Both arguments must be numbers");
  });
});
