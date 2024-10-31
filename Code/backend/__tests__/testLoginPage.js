/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */
import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("Login API Tests", function () {

  // Login Tests
  describe("GET /login", function () {
    it("should log in successfully with correct credentials", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/login")
        .query({ userName: "Test", password: "admin" });

      expect(response.status).to.eql(200);
    });
    it("should fail to log in with nonexistent user", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/login")
        .query({ userName: "NotReal", password: "fake" });
      expect(response.status).to.eql(200);
      const resJSON = JSON.parse(response.text);
      expect(resJSON.success).false;
      expect(resJSON.user).undefined;
    });
    it("should fail to log in with incorrect password", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/login")
        .query({ userName: "Test", password: "fake" });
      expect(response.status).to.eql(200);
      const resJSON = JSON.parse(response.text);
      expect(resJSON.success).false;
      expect(resJSON.user).undefined;
    });
  });

  describe("GET /signup", function () {
    it("should not sign up for existing users", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).post(baseURL + "/signup")
        .query({ userName: "Test", password: "admin" });

      expect(response.status).not.to.eql(200);
    });
    it("should sign up for new users", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).post(baseURL + "/signup")
        .query({ userName: "Test2", password: "admin2" });

      expect(response.status).to.eql(200);
    });
    it("should not sign up for users without a password", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).post(baseURL + "/signup")
        .query({ userName: "Test3" });

      expect(response.status).not.to.eql(200);
    });
  });
});
