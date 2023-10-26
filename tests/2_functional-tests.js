const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert 10L (valid input)", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });

  test("Convert 32g (invalid input)", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });

  test("Convert 3/7.2/4kg (invalid input)", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        done();
      });
  });

  test("Convert 3/7.2/4g (invalid number and unit)", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4g" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });

  test("Convert kg (no number input)", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});
