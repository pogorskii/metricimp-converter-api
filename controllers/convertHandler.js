function ConvertHandler() {
  const unitNames = {
    mi: "miles",
    km: "kilometers",
    gal: "gallons",
    L: "liters",
    kg: "kilograms",
    lbs: "pounds",
  };
  const unitPairs = {
    mi: "km",
    km: "mi",
    gal: "L",
    L: "gal",
    kg: "lbs",
    lbs: "kg",
  };

  this.fractionHandler = (input) => {
    const tempValue = input.split("/");
    if (tempValue.length > 2) return undefined;
    return tempValue.reduce((acc, cur) => (acc /= Number(cur)));
  };

  this.getNum = (input) => {
    const unitStartIndex = input.search(/\d[a-z]+$/i) + 1;
    const parsedNum = input.slice(0, unitStartIndex);
    if (parsedNum.search(/[a-z]/i) !== -1) return false;
    if (parsedNum == "") return 1;
    if (parsedNum.indexOf("/") !== -1) return this.fractionHandler(parsedNum);
    return Number(parsedNum);
  };

  this.getUnit = (input) => {
    let unit = input.slice(input.search(/\d[a-z]+$/i) + 1).toLowerCase();
    if (unit === "l") unit = "L";
    if (
      unit !== "gal" &&
      unit !== "L" &&
      unit !== "lbs" &&
      unit !== "kg" &&
      unit !== "mi" &&
      unit !== "km"
    )
      return false;
    return unit;
  };

  this.getReturnUnit = (initUnit) => unitPairs[initUnit];

  this.spellOutUnit = (unit) => unitNames[unit];

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return (initNum * galToL).toFixed(5);
      case "L":
        return (initNum / galToL).toFixed(5);
      case "lbs":
        return (initNum * lbsToKg).toFixed(5);
      case "kg":
        return (initNum / lbsToKg).toFixed(5);
      case "mi":
        return (initNum * miToKm).toFixed(5);
      case "km":
        return (initNum / miToKm).toFixed(5);
      default:
        return "Not a valid unit";
    }
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) =>
    `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
}

module.exports = ConvertHandler;
