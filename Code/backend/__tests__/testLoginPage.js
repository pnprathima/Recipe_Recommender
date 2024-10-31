/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */
import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("Recipes API Tests", function () {

  // Login Tests
  describe("GET /login", function () {
    it("should log in successfully with correct credentials", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/login")
        .query({ userName: "Test", password: "admin" });

      expect(response.status).to.eql(200);
    });
  });

  describe("GET /signup", function () {
    it("should not sign up for existing users", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/signup")
        .query({ userName: "Test", password: "admin" });

      expect(response.status).not.to.eql(200);
    });
  });
});
