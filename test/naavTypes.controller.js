import chai from "chai";
import chaiHttp from "chai-http";

import server from "../server";

chai.use(chaiHttp);

describe("NaavTypes", () => {
  it("should register user, login user, check token and create a naavType", async () => {
    chai
      .request(server)
      .post("/api/v1/users/register")
      .send({
        title: "Test",
        phone: "123456789",
        email: "test@test.com",
      })
      .end(() => {
        chai
          .request(server)
          .post("/api/v1/users/login")
          .send({
            email: "test@test.com",
            password: "123456789",
          })
          .end((err, res) => {
            console.log("Test user logged in");
            res.body.should.have.property("accessToken");
            res.body.should.have.property("refreshToken");

            const token = res.body.accessToken;
            chai
              .request(server)
              .post("/api/v1/naavTypes")
              .set("Authorization", `Bearer ${token}`)
              .send({
                name: "Test",
                image: "Test",
                width: "Test",
                length: "Test",
                capacity: "Test",
              })
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("name");
                res.body.should.have.property("image");
                res.body.should.have.property("width");
                res.body.should.have.property("length");
                res.body.should.have.property("capacity");
              });
          });
      });
  });
});
