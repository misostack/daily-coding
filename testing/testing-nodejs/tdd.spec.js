import { assert } from "chai";
import { suite, test, setup, suiteSetup, suiteTeardown, teardown } from "mocha";

suite("Array", function () {
  suiteSetup(function () {
    console.log("Run once before all tests");
  });

  setup(function () {
    console.log("Run before each test");
  });

  test("should return -1 when value is not present", function () {
    const result = [1, 2, 3].indexOf(4);
    assert.equal(result, -1);
  });

  test("should return correct index", function () {
    const result = [1, 2, 3].indexOf(2);
    assert.equal(result, 1);
  });

  teardown(function () {
    console.log("Run after each test");
  });

  suiteTeardown(function () {
    console.log("Run once after all tests");
  });
});
