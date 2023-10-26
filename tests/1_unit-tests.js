const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", (done) => {
      assert.equal(convertHandler.getNum("42L"), 42);
      done();
    });

    test("Decimal number input", (done) => {
      assert.equal(convertHandler.getNum("4.2L"), 4.2);
      done();
    });

    test("Fractional number input", (done) => {
      assert.equal(convertHandler.getNum("4/2L"), 4 / 2);
      done();
    });

    test("Fractional decimal number input", (done) => {
      assert.equal(convertHandler.getNum("4/2.5L"), 4 / 2.5);
      done();
    });

    test("Number with double fraction input", (done) => {
      assert.equal(convertHandler.getNum("4/2/2L"), undefined);
      done();
    });

    test("Default to 1 without input number", (done) => {
      assert.equal(convertHandler.getNum("L"), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", () => {
    test("Read each valid input unit", (done) => {
      const input = ["mi", "km", "gal", "L", "lbs", "kg"];
      input.forEach((entry) =>
        assert.equal(convertHandler.getUnit(entry), entry)
      );
      done();
    });

    test("Error on invalid input unit", (done) => {
      assert.equal(convertHandler.getUnit("42Lalala"), false);
      done();
    });

    test("Correct return unit for each valid unit input", (done) => {
      const input = ["mi", "km", "gal", "L", "lbs", "kg"];
      const result = ["km", "mi", "L", "gal", "kg", "lbs"];
      input.forEach((entry, i) =>
        assert.equal(convertHandler.getReturnUnit(entry), result[i])
      );
      done();
    });

    test("Correct spelled-out string unit for each valid input unit", (done) => {
      const input = ["mi", "km", "gal", "L", "lbs", "kg"];
      const result = [
        "miles",
        "kilometers",
        "gallons",
        "liters",
        "pounds",
        "kilograms",
      ];
      input.forEach((entry, i) =>
        assert.equal(convertHandler.spellOutUnit(entry), result[i])
      );
      done();
    });
  });

  suite("Function convertHandler.convert(initNum, initUnit)", () => {
    test("Convert gal to L", (done) => {
      let input = ["42", "gal"];
      assert.equal(convertHandler.convert(input[0], input[1]), 158.98722);
      done();
    });

    test("Convert L to gal", (done) => {
      let input = ["42", "L"];
      assert.equal(convertHandler.convert(input[0], input[1]), 11.09523);
      done();
    });

    test("Convert mi to km", (done) => {
      let input = ["42", "mi"];
      assert.equal(convertHandler.convert(input[0], input[1]), 67.59228);
      done();
    });

    test("Convert km to mi", (done) => {
      let input = ["42", "km"];
      assert.equal(convertHandler.convert(input[0], input[1]), 26.09765);
      done();
    });

    test("Convert lbs to kg", (done) => {
      let input = ["42", "lbs"];
      assert.equal(convertHandler.convert(input[0], input[1]), 19.05086);
      done();
    });

    test("Convert kg to lbs", (done) => {
      let input = ["42", "kg"];
      assert.equal(convertHandler.convert(input[0], input[1]), 92.59423);
      done();
    });
  });
});
