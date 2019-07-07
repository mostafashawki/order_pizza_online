//if you want to use the test db
process.env.NODE_ENV = "test";

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

// Test edit /order route, and test validations if it works properly
describe("/put   /order", () => {
  it("Should get edited order", done => {
    chai
      .request(server)
      .put("/order")

      //////////////////////
      .send({
        currency: "EUR",
        customer: {
          _id: "5d1b6d43e0d2b078e254db2a"
        },
        status: "canceled",
        items: [
          {
            name: "pizza",
            type: "margarita",
            size: "S",
            price: 1,
            qty: 200000000000000000000 //invalid because qty not in range (1-99)
          },
          {
            name: "pizza",
            type: "marinara",
            size: "L",
            price: 4,
            qty: 1
          }
        ],
        urlId: "zMCiaRIjf"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property("currency");
        res.body.should.have.property("customer");
        res.body.should.have.property("items");
        res.body.should.have.property("urlId");
        done();
      });
  });
});
