import assert from "assert";
import { add, divide } from "./calculator.js";

describe("Calculator", function () {
  describe("add()", function () {
    it("should return the sum of two numbers", function () {
      const result = add(2, 3);
      assert.equal(result, 5);
    });

    it("should work with negative numbers", function () {
      const result = add(-2, -3);
      assert.equal(result, -5);
    });
  });

  describe("divide()", function () {
    it("should divide two numbers correctly", function () {
      const result = divide(10, 2);
      assert.equal(result, 5);
    });

    it("should throw error when dividing by zero", function () {
      assert.throws(() => divide(10, 0));
    });
  });
});
