/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

const request = require("supertest")("http://localhost:5000/api/v1/recipes");
const expect = require("chai").expect;

describe("Recipes API Tests", function () {

  // Login Tests
  describe("GET /login", function () {
    it("should log in successfully with correct credentials", async function () {
      const response = await request.get("/login")
        .query({ userName: "Test", password: "admin" });

      expect(response.status).to.eql(200);
    });
  });

  describe("GET /signup", function () {
    it("should not sign up for existing users", async function () {
      const response = await request.get("/signup")
        .query({ userName: "Test", password: "admin" });

      expect(response.status).not.to.eql(200);
    });
  });
});
