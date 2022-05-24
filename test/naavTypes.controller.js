import request from "supertest";
import chai from "chai";
import server from "../server";

const expect = chai.expect;

describe("NaavTypes", () => {
  it("should register user, login user, check token and create a naavType, check if its created , update and delete", async () => {
    request(server)
      .post("/api/v1/users/register")
      .send({
        title: "Test",
        phone: "123456789",
        email: "test@test.com",
        password: "123456789",
      })
      .expect(201)
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("User created successfully");
      })
      // .catch((err) => console.log(err))
      .end(() => {
        request(server)
          .post("/api/v1/users/login")
          .send({
            email: "test@test.com",
            password: "123456789",
          })
          .end((err, res) => {
            res.body.should.have.property("accessToken");
            res.body.should.have.property("refreshToken");

            const token = res.body.accessToken;

            request(server)
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

            request(server)
              .get("/api/v1/naavTypes")
              .set("Authorization", `Bearer ${token}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.eql(1);
              });

            request(server)
              .put("/api/v1/naavTypes/1")
              .set("Authorization", `Bearer ${token}`)
              .send({
                name: "Test updated",
                image: "Test updated",
                width: "Test updated",
                length: "Test updated",
                capacity: "Test updated",
              })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.name.should.equal("Test updated");
                res.body.image.should.equal("Test updated");
                res.body.width.should.equal("Test updated");
                res.body.length.should.equal("Test updated");
                res.body.capacity.should.equal("Test updated");
              });
          });
      });
  });
});
