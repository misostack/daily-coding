import { expect } from "chai";
import { helloWorld } from "./main.js";

describe("main", function () {
  describe("#helloWorld", function () {
    it("should return 'Hello, World!'", function () {
      expect(helloWorld("World")).to.equal("Hello, World!");
    });
  });
});
